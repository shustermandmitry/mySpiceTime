// src/server/index.ts
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {WebSocketServer} from 'ws';
import {useServer} from 'graphql-ws/lib/use/ws';
import express from 'express';
import http from 'http';
import cors from 'cors';
import {PubSub} from 'graphql-subscriptions';
import {DeviceManager} from '../managers/DeviceManager';
import {typeDefs} from './schema';

export class MaltingGraphQLServer {
    private pubsub: PubSub;
    private deviceManager: DeviceManager;
    private server: ApolloServer;
    private httpServer: http.Server;
    private wsServer: WebSocketServer;

    constructor(deviceManager: DeviceManager) {
        this.pubsub = new PubSub();
        this.deviceManager = deviceManager;
    }

    async start(port: number = 4000, standalone: boolean = false) {
        const app = express();
        this.httpServer = http.createServer(app);

        // Create WebSocket server for subscriptions
        this.wsServer = new WebSocketServer({
            server: this.httpServer,
            path: '/graphql',
        });

        const schema = makeExecutableSchema({
            typeDefs,
            resolvers: this.createResolvers(),
        });

        // Set up WebSocket server
        const serverCleanup = useServer(
            {
                schema,
                context: this.createContext
            },
            this.wsServer
        );

        this.server = new ApolloServer({
            schema,
            plugins: [
                ApolloServerPluginDrainHttpServer({httpServer: this.httpServer}),
                {
                    async serverWillStart() {
                        return {
                            async drainServer() {
                                await serverCleanup.dispose();
                            },
                        };
                    },
                },
            ],
        });

        await this.server.start();

        app.use(
            '/graphql',
            cors<cors.CorsRequest>(),
            express.json(),
            expressMiddleware(this.server, {
                context: this.createContext,
            })
        );

        if (standalone) {
            // In standalone mode, serve the PWA
            app.use(express.static('public'));
        }

        await new Promise<void>((resolve) =>
            this.httpServer.listen({port}, resolve)
        );

        console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
    }

    async stop() {
        await this.server.stop();
        await new Promise<void>((resolve) =>
            this.httpServer.close(() => resolve())
        );
        this.wsServer.close();
    }

    private createContext = async ({req, res}) => {
        return {
            deviceManager: this.deviceManager,
            pubsub: this.pubsub,
        };
    };

    private createResolvers() {
        return {
            Query: {
                devices: (_, __, {deviceManager}) => {
                    return deviceManager.getAllDevices();
                },
                device: (_, {id}, {deviceManager}) => {
                    return deviceManager.getDevice(id);
                },
                deviceStatus: (_, {id}, {deviceManager}) => {
                    const device = deviceManager.getDevice(id);
                    return device?.getStatus();
                },
                deviceAlerts: (_, {id, severity}, {deviceManager}) => {
                    const device = deviceManager.getDevice(id);
                    return device?.getAlerts(severity);
                },
            },

            Mutation: {
                setDeviceControl: async (_, {id, control}, {deviceManager, pubsub}) => {
                    const device = deviceManager.getDevice(id);
                    const result = await device.setControl(control);
                    pubsub.publish(`DEVICE_UPDATED_${id}`, {
                        deviceUpdated: device.getState(),
                    });
                    return result;
                },

                updateDeviceConfig: async (_, {id, config}, {deviceManager, pubsub}) => {
                    const device = deviceManager.getDevice(id);
                    const result = await device.updateConfig(config);
                    pubsub.publish(`DEVICE_UPDATED_${id}`, {
                        deviceUpdated: device.getState(),
                    });
                    return result;
                },

                startMaltingProcess: async (_, {deviceId, recipe}, {deviceManager}) => {
                    const device = deviceManager.getDevice(deviceId);
                    return device.startMalting(recipe);
                },

                stopMaltingProcess: async (_, {deviceId}, {deviceManager}) => {
                    const device = deviceManager.getDevice(deviceId);
                    return device.stopMalting();
                },
            },

            Subscription: {
                deviceUpdated: {
                    subscribe: (_, {id}, {pubsub}) =>
                        pubsub.asyncIterator([`DEVICE_UPDATED_${id}`]),
                },

                deviceAlert: {
                    subscribe: (_, {id, severity}, {pubsub}) =>
                        pubsub.asyncIterator([`DEVICE_ALERT_${id}`]),
                },

                sensorReadings: {
                    subscribe: (_, {id}, {pubsub}) =>
                        pubsub.asyncIterator([`SENSOR_READINGS_${id}`]),
                },
            },
        };
    }
}