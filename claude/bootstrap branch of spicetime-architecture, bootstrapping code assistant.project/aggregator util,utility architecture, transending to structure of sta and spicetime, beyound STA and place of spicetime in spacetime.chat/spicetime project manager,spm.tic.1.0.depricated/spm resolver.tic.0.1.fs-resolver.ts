/**
 * File system based package resolver that uses version manifests
 */
interface VersionManifest {
    version: number;
    packages: {
        [packagePath: string]: {
            version: number;
            physicalPath: string;
            dependencies?: string[];
        }
    }
}

class FSPackageResolver {
    private manifests: Map<number, VersionManifest> = new Map();
    private manifestPath: string;

    constructor(manifestPath: string) {
        this.manifestPath = manifestPath;
    }

    async loadManifests() {
        // Each version has its own manifest file
        const manifests = await glob(`${this.manifestPath}/v*.manifest.json`);

        for (const path of manifests) {
            const content = await fs.readFile(path, 'utf-8');
            const manifest: VersionManifest = JSON.parse(content);
            this.manifests.set(manifest.version, manifest);
        }
    }

    resolvePackage(packagePath: string, targetVersion: number) {
        // Find highest suitable version
        let bestMatch: VersionManifest | null = null;

        for (const [version, manifest] of this.manifests) {
            if (version <= targetVersion &&
                (!bestMatch || version > bestMatch.version)) {
                bestMatch = manifest;
            }
        }

        if (!bestMatch || !bestMatch.packages[packagePath]) {
            throw new Error(`No suitable version found for ${packagePath}@${targetVersion}`);
        }

        return bestMatch.packages[packagePath];
    }
}