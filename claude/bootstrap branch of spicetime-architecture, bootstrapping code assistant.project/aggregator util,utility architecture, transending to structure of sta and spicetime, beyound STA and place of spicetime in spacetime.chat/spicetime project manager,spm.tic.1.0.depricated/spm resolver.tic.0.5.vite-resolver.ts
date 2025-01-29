import type {Plugin} from 'vite';
import {resolvePackageVersion} from './smp-resolver.tic.0.2.graph-resolver';

interface VirtualPackageOptions {
    graphdbUrl: string;
    resolverOptions?: {
        maxDepth?: number;
        cacheTimeout?: number;
    };
}

export function virtualPackageResolver(options: VirtualPackageOptions): Plugin {
    const versionCache = new Map();

    return {
        name: 'virtual-package-resolver',

        async resolveId(id: string) {
            // Check if this is a versioned package import
            const match = id.match(/^@spicetime\/([^@]+)@(\d+)/);
            if (!match) return null;

            const [, packagePath, version] = match;

            // Check cache first
            const cacheKey = `${packagePath}@${version}`;
            if (versionCache.has(cacheKey)) {
                return versionCache.get(cacheKey);
            }

            try {
                // Query GraphDB to resolve the actual package version
                const resolvedPackage = await resolvePackageVersion({
                    path: packagePath,
                    targetVersion: parseInt(version),
                    graphdbUrl: options.graphdbUrl,
                    options: options.resolverOptions
                });

                // Cache the result
                versionCache.set(cacheKey, resolvedPackage.path);

                return resolvedPackage.path;
            } catch (error) {
                console.error(`Failed to resolve virtual package ${id}:`, error);
                return null;
            }
        }
    };
}