utils folder structure

````
utils
  package.json
  tsconfig.js
  core
    sta-error 
    sta-scripts
    sta-package-builder
    aggregator
    patcher
    
  
````

utils/tsconfig.json

````json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "noEmit": true,
    // We're not using TS for compilation yet
    "allowJs": true,
    // Allow JavaScript files
    "checkJs": false,
    // Don't type check JavaScript files
    "noImplicitAny": false,
    // Don't complain about implicit any
    "skipLibCheck": true,
    // Don't check types in node_modules
    "esModuleInterop": true,
    // Easier imports
    "isolatedModules": true,
    // Each file is its own module
    "strict": false
    // Turn off strict mode for now
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}
````

utils/package.json

````json
{
  "version": "0.0.0"
}
````