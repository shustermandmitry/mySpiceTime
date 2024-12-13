// scripts/create-utils-structure.js
const fs = require('fs');
const path = require('path');

// Define base directories
const ROOT_DIR = 'spicetime-architecture';
const PACKAGES_DIR = path.join(ROOT_DIR, 'packages/utils');
const INTERNAL_DIR = path.join(ROOT_DIR, 'internal/utils');

// Utility function to create directory recursively
function createDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Utility function to write file if it doesn't exist
function writeFileIfNotExists(filePath, content) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
    }
}

// Create directory structure
function createDirectoryStructure() {
    // Public utils directories
    [
        path.join(PACKAGES_DIR, 'src/formatting'),
        path.join(PACKAGES_DIR, 'src/validation'),
        path.join(PACKAGES_DIR, 'src/common'),
        path.join(PACKAGES_DIR, '__tests__'),
    ].forEach(createDir);

    // Internal utils directories
    [
        path.join(INTERNAL_DIR, 'src/security'),
        path.join(INTERNAL_DIR, 'src/runtime'),
        path.join(INTERNAL_DIR, 'src/testing'),
        path.join(INTERNAL_DIR, '__tests__'),
    ].forEach(createDir);
}

// Create package.json files
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
            "test:watch": "vitest",
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
            "test:watch": "vitest",
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

    writeFileIfNotExists(
        path.join(PACKAGES_DIR, 'package.json'),
        JSON.stringify(publicPackageJson, null, 2)
    );

    writeFileIfNotExists(
        path.join(INTERNAL_DIR, 'package.json'),
        JSON.stringify(internalPackageJson, null, 2)
    );
}

// Create TypeScript configuration files
function createTsConfig() {
    const tsConfig = {
        "extends": "../../tsconfig.base.json",
        "compilerOptions": {
            "outDir": "./dist",
            "rootDir": "./src"
        },
        "include": ["src/**/*"]
    };

    writeFileIfNotExists(
        path.join(PACKAGES_DIR, 'tsconfig.json'),
        JSON.stringify(tsConfig, null, 2)
    );

    writeFileIfNotExists(
        path.join(INTERNAL_DIR, 'tsconfig.json'),
        JSON.stringify(tsConfig, null, 2)
    );
}

// Create initial TypeScript files
function createTypeScriptFiles() {
    // Public utils exports
    const publicIndexContent = `export * from './formatting';\nexport * from './validation';\nexport * from './common';\n`;
    writeFileIfNotExists(path.join(PACKAGES_DIR, 'src/index.ts'), publicIndexContent);
    writeFileIfNotExists(path.join(PACKAGES_DIR, 'src/formatting/index.ts'), 'export {};\n');
    writeFileIfNotExists(path.join(PACKAGES_DIR, 'src/validation/index.ts'), 'export {};\n');
    writeFileIfNotExists(path.join(PACKAGES_DIR, 'src/common/index.ts'), 'export {};\n');

    // Internal utils exports
    const internalIndexContent = `export * from './security';\nexport * from './runtime';\nexport * from './testing';\n`;
    writeFileIfNotExists(path.join(INTERNAL_DIR, 'src/index.ts'), internalIndexContent);
    writeFileIfNotExists(path.join(INTERNAL_DIR, 'src/security/index.ts'), 'export {};\n');
    writeFileIfNotExists(path.join(INTERNAL_DIR, 'src/runtime/index.ts'), 'export {};\n');
    writeFileIfNotExists(path.join(INTERNAL_DIR, 'src/testing/index.ts'), 'export {};\n');
}

// Main execution
function main() {
    try {
        createDirectoryStructure();
        createPackageFiles();
        createTsConfig();
        createTypeScriptFiles();
        console.log('✨ Utils packages structure created successfully!');
    } catch (error) {
        console.error('Error creating utils structure:', error);
        process.exit(1);
    }
}

main();
