// scripts/setup-utils.js
const fs = require('fs');
const path = require('path');

// Use correct paths inside monorepo directory
const PACKAGES_DIR = 'monorepo/packages/utils';
const INTERNAL_DIR = 'monorepo/internal/utils';

// Utility function to create directory
function createDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Utility function to write file
function writeFile(filePath, content) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
}

// Create directory structure
function createDirectoryStructure() {
    [
        path.join(PACKAGES_DIR, 'src'),
        path.join(PACKAGES_DIR, '__tests__'),
        path.join(INTERNAL_DIR, 'src'),
        path.join(INTERNAL_DIR, '__tests__')
    ].forEach(createDir);
}

// Create package files
function createPackageFiles() {
    const publicPackageJson = {
        "name": "@spicetime/utils",
        "version": "0.1.0",
        "main": "dist/index.js",
        "module": "dist/index.mjs",
        "types": "dist/index.d.ts",
        "sideEffects": false,
        "publishConfig": {
            "access": "public"
        },
        "scripts": {
            "build": "tsup src/index.ts --format esm,cjs --dts",
            "dev": "tsup src/index.ts --format esm,cjs --watch --dts",
            "lint": "eslint src/",
            "clean": "rimraf dist",
            "test": "vitest run",
            "typecheck": "tsc --noEmit"
        },
        "dependencies": {
            "date-fns": "^2.30.0",
            "zod": "^3.22.4"
        },
        "devDependencies": {
            "@types/node": "^20.8.0",
            "tsup": "^7.2.0",
            "typescript": "^5.2.2",
            "vitest": "^0.34.6"
        },
        "files": [
            "dist"
        ]
    };

    const internalPackageJson = {
        "name": "@spicetime/internal-utils",
        "version": "0.1.0",
        "private": true,
        "main": "dist/index.js",
        "module": "dist/index.mjs",
        "types": "dist/index.d.ts",
        "sideEffects": false,
        "scripts": {
            "build": "tsup src/index.ts --format esm,cjs --dts",
            "dev": "tsup src/index.ts --format esm,cjs --watch --dts",
            "lint": "eslint src/",
            "clean": "rimraf dist",
            "test": "vitest run",
            "typecheck": "tsc --noEmit"
        },
        "dependencies": {
            "@spicetime/utils": "workspace:*",
            "jose": "^4.15.4",
            "node-crypto-js": "^1.0.3"
        },
        "devDependencies": {
            "@types/node": "^20.8.0",
            "tsup": "^7.2.0",
            "typescript": "^5.2.2",
            "vitest": "^0.34.6"
        }
    };

    writeFile(
        path.join(PACKAGES_DIR, 'package.json'),
        JSON.stringify(publicPackageJson, null, 2)
    );

    writeFile(
        path.join(INTERNAL_DIR, 'package.json'),
        JSON.stringify(internalPackageJson, null, 2)
    );
}

// Create TypeScript configuration
function createTsConfigs() {
    const tsConfig = {
        "extends": "../../../tsconfig.0.base.json",
        "compilerOptions": {
            "outDir": "./dist",
            "rootDir": "./src"
        },
        "include": ["src/**/*"]
    };

    writeFile(
        path.join(PACKAGES_DIR, 'tsconfig.json'),
        JSON.stringify(tsConfig, null, 2)
    );

    writeFile(
        path.join(INTERNAL_DIR, 'tsconfig.json'),
        JSON.stringify(tsConfig, null, 2)
    );
}

// Create initial source files
function createSourceFiles() {
    writeFile(
        path.join(PACKAGES_DIR, 'src/index.ts'),
        'export {};\n'
    );

    writeFile(
        path.join(INTERNAL_DIR, 'src/index.ts'),
        'export {};\n'
    );
}

// Main execution
function main() {
    try {
        createDirectoryStructure();
        createPackageFiles();
        createTsConfigs();
        createSourceFiles();
        console.log('✨ Utils packages structure created successfully!');
    } catch (error) {
        console.error('Error creating utils structure:', error);
        process.exit(1);
    }
}

main();
