# Hybrid Development Environment: Hardhat + OpenZeppelin with Foundry Testing

## Project Setup

### 1. Initialize Project Structure

```bash
# Create project
mkdir diai-protocol
cd diai-protocol

# Initialize npm
npm init -y

# Install Hardhat & OpenZeppelin
npm install --save-dev hardhat @openzeppelin/contracts-upgradeable
npm install --save-dev @openzeppelin/hardhat-upgrades
npm install --save-dev @nomiclabs/hardhat-ethers ethers

# Initialize Hardhat
npx hardhat init

# Initialize Foundry inside the same directory
forge init --no-commit
```

### 2. Project Structure

```
diai-protocol/
├── contracts/                 # Shared contracts directory
├── test/                     # Hardhat tests (JS/TS)
├── forge-test/               # Foundry tests (Solidity)
├── scripts/                  # Deployment scripts
├── hardhat.config.js         # Hardhat configuration
├── foundry.toml              # Foundry configuration
└── remappings.txt           # Foundry remappings
```

### 3. Configuration Files

hardhat.config.js:

```javascript
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
```

foundry.toml:

```toml
[profile.default]
src = 'contracts'
test = 'forge-test'
out = 'forge-artifacts'
libs = ['node_modules']
remappings = [
    '@openzeppelin/=node_modules/@openzeppelin/',
    '@rocketpool/=node_modules/@rocketpool/'
]
```

remappings.txt:

```
@openzeppelin/=node_modules/@openzeppelin/
@rocketpool/=node_modules/@rocketpool/
```

## Development Workflow

### 1. Contract Development (Hardhat + OpenZeppelin)

```solidity
// contracts/DiAICore.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract DiAICore is UUPSUpgradeable, AccessControlUpgradeable {
    function initialize() initializer public {
        __AccessControl_init();
        __UUPSUpgradeable_init();
    }
    
    function _authorizeUpgrade(address) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}
}
```

### 2. Testing Setup

Hardhat Tests (JS/TS for integration):

```javascript
// test/DiAICore.test.js
const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("DiAICore Integration", function () {
  it("should integrate with RocketPool", async function () {
    const DiAICore = await ethers.getContractFactory("DiAICore");
    const core = await upgrades.deployProxy(DiAICore);
    
    // Integration tests
  });
});
```

Foundry Tests (Solidity for unit/property):

```solidity
// forge-test/DiAICore.t.sol
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../contracts/DiAICore.sol";

contract DiAICoreTest is Test {
    DiAICore core;
    
    function setUp() public {
        core = new DiAICore();
        core.initialize();
    }
    
    function testFuzz_ResourceAllocation(uint256 amount) public {
        vm.assume(amount > 0 && amount < type(uint256).max);
        core.allocateResources(amount);
        assertEq(core.getResources(), amount);
    }
}
```

### 3. Testing Commands

```bash
# Run all tests
npm run test        # Runs both Hardhat and Foundry tests

# Run specific tests
npx hardhat test   # Integration tests
forge test         # Unit/property tests
forge test --mt testFuzz  # Run only fuzz tests
```

### 4. Development Scripts

package.json:

```json
{
  "scripts": {
    "compile": "hardhat compile",
    "test": "hardhat test && forge test",
    "test:integration": "hardhat test",
    "test:unit": "forge test",
    "deploy": "hardhat run scripts/deploy.js",
    "verify": "hardhat verify"
  }
}
```

## Protocol Integration Examples

### 1. RocketPool Integration

```solidity
// contracts/integrations/RocketPoolNode.sol
import "@rocketpool/contracts/interface/RocketStorageInterface.sol";

contract RocketPoolNode {
    RocketStorageInterface rocketStorage;
    
    constructor(address _rocketStorage) {
        rocketStorage = RocketStorageInterface(_rocketStorage);
    }
}
```

### 2. Foundry Test with Protocol Fork

```solidity
// forge-test/Integration.t.sol
contract IntegrationTest is Test {
    function setUp() public {
        // Fork mainnet
        vm.createSelectFork(vm.rpcUrl("mainnet"));
    }
    
    function testRocketPoolIntegration() public {
        // Test with real protocol state
    }
}
```

## Deployment Process

```javascript
// scripts/deploy.js
async function main() {
    const DiAICore = await ethers.getContractFactory("DiAICore");
    console.log("Deploying DiAICore...");
    
    const core = await upgrades.deployProxy(DiAICore);
    await core.deployed();
    
    console.log("DiAICore deployed to:", core.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
```

## CI/CD Setup

.github/workflows/test.yml:

```yaml
name: Tests
on: [push]

jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install Foundry
        uses: foundry-rs/foundry-toolchain@v1
      
      - name: Install Node
        uses: actions/setup-node@v2
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Run Hardhat Tests
        run: npx hardhat test
      
      - name: Run Foundry Tests
        run: forge test
```

## Additional Tools Integration

### 1. Gas Reporting

```javascript
require("hardhat-gas-reporter");

module.exports = {
  gasReporter: {
    enabled: true,
    currency: 'USD',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY
  }
};
```

### 2. Code Coverage

```bash
# Hardhat coverage
npx hardhat coverage

# Foundry coverage
forge coverage
```

## Conclusion

This hybrid setup combines:

- Hardhat's excellent development experience
- OpenZeppelin's secure contract templates
- Foundry's powerful testing capabilities

The result is a robust development environment that leverages the best tools for each aspect of the development process.

## References

1. Hardhat Documentation
2. Foundry Book
3. OpenZeppelin Documentation
4. Protocol Integration Guides