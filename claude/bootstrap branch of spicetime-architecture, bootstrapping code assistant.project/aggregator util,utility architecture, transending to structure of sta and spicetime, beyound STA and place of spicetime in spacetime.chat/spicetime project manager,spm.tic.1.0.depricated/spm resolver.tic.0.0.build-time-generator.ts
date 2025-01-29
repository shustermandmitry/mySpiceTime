/**
 * Generates virtual package folders at build time
 */
interface PackageConfig {
    name: string;
    version: number;
    source: string;  // Physical package location
    virtualPath: string;  // Where to generate virtual package
}

class VirtualPackageGenerator {
    private outputRoot: string;
    private packages: PackageConfig[];

    constructor(outputRoot: string, packages: PackageConfig[]) {
        this.outputRoot = outputRoot;
        this.packages = packages;
    }

    async generate() {
        // For each package version requested
        for (const pkg of this.packages) {
            const targetDir = path.join(this.outputRoot, pkg.virtualPath);

            // Copy physical package
            await fs.copy(pkg.source, targetDir);

            // Update package.json
            const pkgJson = path.join(targetDir, 'package.json');
            const content = await fs.readJson(pkgJson);
            content.version = pkg.version;
            await fs.writeJson(pkgJson, content, {spaces: 2});
        }
    }

    // Generate virtual package index
    async generateIndex() {
        const index = this.packages.reduce((acc, pkg) => {
            acc[`${pkg.name}@${pkg.version}`] = pkg.virtualPath;
            return acc;
        }, {});

        await fs.writeJson(
            path.join(this.outputRoot, 'virtual-packages.json'),
            index,
            {spaces: 2}
        );
    }
}