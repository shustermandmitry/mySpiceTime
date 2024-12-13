// scripts/sync-versioned-docs.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = 'spicetime-architecture';
const DOCS_DIR = path.join(ROOT_DIR, 'docs');

// Version categorization
const VERSIONS = {
  current: {
    latest: 'latest',    // Current stable release
    next: 'next'         // Current pre-release
  },
  archived: {            // Previous versions
    pattern: /^v\d+\.\d+\.\d+$/,
    directory: 'archived'
  },
  development: {         // Development branches
    prerelease: 'alpha', // Pre-release branch documentation
    milestone: 'beta',   // Milestone branch documentation
    directory: 'development'
  }
};

// Documentation source mappings remain the same...
const DOC_MAPPINGS = [/* ... */];

function getBranchType(branch) {
  if (branch === 'master') return 'master';
  if (branch.startsWith('release/')) return 'release';
  if (branch.startsWith('feature/')) return 'feature';
  if (branch === 'develop') return 'develop';
  return 'other';
}

function shouldUpdateDocs(branch) {
  const branchType = getBranchType(branch);
  
  // Always update on master
  if (branchType === 'master') return true;
  
  // Update on release branches
  if (branchType === 'release') return true;
  
  // Update on develop branch
  if (branchType === 'develop') return true;
  
  // Feature branches only on milestone commits
  if (branchType === 'feature') {
    const lastCommitMsg = execSync('git log -1 --pretty=%B').toString().trim();
    return lastCommitMsg.includes('[milestone]');
  }
  
  return false;
}

function getVersionCategory(version, branch) {
  if (branch === 'master' && !version.includes('-')) {
    return 'current.latest';
  }
  
  if (branch === 'develop' || version.includes('-beta')) {
    return 'current.next';
  }
  
  if (version.includes('-alpha')) {
    return 'development.prerelease';
  }
  
  if (VERSIONS.archived.pattern.test(version)) {
    return 'archived';
  }
  
  return null;
}

function copyVersionedDocs(sourcePath, targetPath, version, category) {
  // Copy logic remains similar but organizes into category structure...
  const categoryPath = category.includes('.') 
    ? category.split('.').reduce((p, c) => path.join(p, c), targetPath)
    : path.join(targetPath, category);
    
  const versionedPath = path.join(categoryPath, version);
  fs.mkdirSync(versionedPath, { recursive: true });
  // ... copying logic
}

function generateVersionNavigation() {
  return `
const versions = {
  current: {
    latest: '${VERSIONS.current.latest}',
    next: '${VERSIONS.current.next}'
  },
  development: {
    prerelease: '${VERSIONS.development.prerelease}',
    milestone: '${VERSIONS.development.milestone}'
  },
  archived: ${JSON.stringify(getArchivedVersions(), null, 2)}
};

export function VersionSelector() {
  // React component for version selection
  // Shows current versions prominently
  // Archived versions in dropdown
  // Development versions with warning banner
}`;
}

function generateArchiveMetadata(version) {
  return {
    version,
    date: getVersionDate(version),
    changes: getVersionChangelog(version),
    breaking: hasBreakingChanges(version)
  };
}

function syncDocsForBranch(branch) {
  if (!shouldUpdateDocs(branch)) {
    console.log(`Skipping documentation update for branch: ${branch}`);
    return;
  }

  const version = getPackageVersion();
  const category = getVersionCategory(version, branch);
  
  if (!category) {
    console.log(`Skipping documentation for unrecognized version pattern: ${version}`);
    return;
  }

  DOC_MAPPINGS.forEach(mapping => {
    const sourcePath = path.join(ROOT_DIR, mapping.source);
    const targetPath = path.join(DOCS_DIR, mapping.target);
    copyVersionedDocs(sourcePath, targetPath, version, category);
  });

  // Generate version navigation
  const versionNav = generateVersionNavigation();
  fs.writeFileSync(
    path.join(DOCS_DIR, 'version-nav.js'),
    versionNav
  );

  // For archived versions, generate metadata
  if (category === 'archived') {
    const metadata = generateArchiveMetadata(version);
    fs.writeFileSync(
      path.join(DOCS_DIR, 'archived', version, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );
  }
}

// Main sync function
function syncDocs() {
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  syncDocsForBranch(currentBranch);
}

// CLI handling remains the same...

module.exports = {
  syncDocs,
  shouldUpdateDocs,
  getVersionCategory
};
