didj/
├── src/
│   ├── core/
│   │   ├── buffer.js
│   │   ├── timeStretch.js
│   │   └── phaseAlign.js
│   ├── platform/
│   │   ├── jacktrip.js
│   │   ├── jamulus.js
│   │   └── bridge.js
│   └── network/
│       ├── stream.js
│       └── monitor.js
├── test/
│   ├── performance/
│   │   ├── buffer.test.js
│   │   └── latency.test.js
│   └── integration/
│       └── platforms.test.js
├── smart-contracts/
│   ├── contracts/
│   │   ├── DiDJDev.sol
│   │   ├── DiDJCommunity.sol
│   │   ├── DiDJToken.sol
│   │   └── DiDJMetrics.sol
│   ├── migrations/
│   │   └── 1_initial_migration.js
│   ├── test/
│   │   └── token_test.js
│   └── truffle-config.js
├── docs/
│   ├── ARCHITECTURE.md
│   ├── PERFORMANCE.md
│   └── API.md
├── scripts/
│   ├── deploy.js
│   └── test-performance.js
└── package.json