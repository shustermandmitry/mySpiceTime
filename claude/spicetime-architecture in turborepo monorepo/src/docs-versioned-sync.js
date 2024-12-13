// scripts/sync-versioned-docs.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = 'spicetime-architecture';
const DOCS_DIR = path.join(ROOT_DIR, 'docs');

// Structure for version tracking
const VERSIONS = {
  latest: 'latest', // Latest stable release
  prerelease: 'next'  // Pre-release version
};

const DOC_MAPPINGS = [
  {
    source: 'packages/services/api/docs',
    target: 'docs/services/api',
    title: 'API Service'
  },
  // ... other mappings remain the same
];

function getPackageVersion(packagePath) {
  const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, packagePath, 'package.json'), 'utf8'));
  return packageJson.version;
}

function isPrerelease(version) {
  return version.includes('alpha') || version.includes('beta') || version.includes('rc');
}

function copyDocsWithVersion(sourcePath, targetPath, version) {
  if (!fs.existsSync(sourcePath)) {
    console.warn(`Warning: Source path does not exist: ${sourcePath}`);
    return;
  }

  const versionedPath = path.join(targetPath, version);
  fs.mkdirSync(versionedPath, { recursive: true });

  const files = fs.readdirSync(sourcePath);
  files.forEach(file => {
    const sourceFile = path.join(sourcePath, file);
    const targetFile = path.join(versionedPath, file);

    if (fs.statSync(sourceFile).isDirectory()) {
      copyDocsWithVersion(sourceFile, targetFile, version);
    } else {
      fs.copyFileSync(sourceFile, targetFile);
    }
  });
}

function generateVersionedSidebar() {
  const sidebar = {
    latest: [],
    next: []
  };

  DOC_MAPPINGS.forEach(mapping => {
    Object.values(VERSIONS).forEach(version => {
      sidebar[version].push({
        title: `${mapping.title} (${version})`,
        path: `${mapping.target.replace('docs/', '')}/${version}`,
        children: []
      });
    });
  });

  fs.writeFileSync(
    path.join(DOCS_DIR, 'sidebar.json'),
    JSON.stringify(sidebar, null, 2)
  );
}

function generateVersionedIndex() {
  const index = `# SpiceTime Documentation

## Versions

### Latest Release
${DOC_MAPPINGS.map(mapping => `
- [${mapping.title}](/${mapping.target.replace('docs/', '')}/latest)`).join('\n')}

### Pre-release (Next)
${DOC_MAPPINGS.map(mapping => `
- [${mapping.title}](/${mapping.target.replace('docs/', '')}/next)`).join('\n')}
`;

  fs.writeFileSync(path.join(DOCS_DIR, 'index.md'), index);
}

function syncVersionedDocs() {
  try {
    fs.mkdirSync(DOCS_DIR, { recursive: true });

    // Clear existing versioned docs
    Object.values(VERSIONS).forEach(version => {
      DOC_MAPPINGS.forEach(mapping => {
        const versionedPath = path.join(ROOT_DIR, mapping.target, version);
        if (fs.existsSync(versionedPath)) {
          fs.rmSync(versionedPath, { recursive: true });
        }
      });
    });

    // Copy docs for each version
    DOC_MAPPINGS.forEach(mapping => {
      const sourcePath = path.join(ROOT_DIR, mapping.source);
      const targetBasePath = path.join(ROOT_DIR, mapping.target);
      const packageVersion = getPackageVersion(path.dirname(mapping.source));

      if (isPrerelease(packageVersion)) {
        // Pre-release version goes to 'next'
        copyDocsWithVersion(sourcePath, targetBasePath, VERSIONS.prerelease);
      } else {
        // Stable version goes to 'latest'
        copyDocsWithVersion(sourcePath, targetBasePath, VERSIONS.latest);
      }
    });

    generateVersionedSidebar();
    generateVersionedIndex();

    console.log('✨ Versioned documentation synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing versioned documentation:', error);
    process.exit(1);
  }
}

// Sync on git pre-push
function syncOnPush() {
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  
  if (currentBranch === 'master') {
    console.log('Syncing documentation for master branch push...');
    syncVersionedDocs();
  }
}

// Sync on package publish
function syncOnPublish() {
  console.log('Syncing documentation for package publish...');
  syncVersionedDocs();
}

// CLI handling
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--push')) {
    syncOnPush();
  } else if (args.includes('--publish')) {
    syncOnPublish();
  } else {
    syncVersionedDocs();
  }
}

module.exports = {
  syncVersionedDocs,
  syncOnPush,
  syncOnPublish
};
