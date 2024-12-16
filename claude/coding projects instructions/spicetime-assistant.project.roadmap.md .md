# spicetime-assistant.project.roadmap.md

## Core Infrastructure

### gql-gateway-integration
Abstract: GraphQL gateway implementation for Claude assistant services, providing a unified interface for various clients and services. Handles routing, authentication, and context management through existing server infrastructure.

Status: Planned
Dependencies: None

### claude-service-core
Abstract: Core services for Claude interaction including headless browser and console interface implementations. Exposes GraphQL endpoints for client consumption, handling context preservation and command processing.

Status: Planned
Dependencies: 
- gql-gateway-integration

## Clients and Agents

### webstorm-assistant-client
Abstract: WebStorm plugin implementing code assistant features, consuming Claude services through GQL gateway. Includes context window, file system integration, and IDE-specific command handling.

Status: Planned
Dependencies:
- gql-gateway-integration

### agent-platform-core
Abstract: Base platform for building various AI agents (coding, telegram, etc.) as GQL clients. Provides common agent behaviors, context management, and plugin architecture for platform-specific implementations.

Status: Planned
Dependencies:
- gql-gateway-integration

## Development Order
1. gql-gateway-integration
2. claude-service-core
3. webstorm-assistant-client (can be developed in parallel with agent-platform-core)
4. agent-platform-core (can be developed in parallel with webstorm-assistant-client)
