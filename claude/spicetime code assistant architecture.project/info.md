# SpiceTime Code Assistant Project

## Project Context
- Type: Core Infrastructure Service
- Status: Initial Development
- Parent: spicetime-architecture
- Dependencies: NextCloud, Claude API

## Test Standards
1. Unit Tests
   - All business logic must be unit tested
   - Mock external dependencies
   - Test edge cases and error conditions
   - Use descriptive test names

2. Integration Tests
   - Test service boundaries
   - Verify GraphQL schema
   - Test authentication flows
   - Validate context persistence

3. End-to-End Tests
   - Test complete user workflows
   - Verify IDE integration
   - Test offline capabilities
   - Validate data persistence

## Current State
- Initial architecture defined
- Core components identified
- Test infrastructure planned
- Development protocol established

## Key Decisions
1. Architecture
   - GraphQL-based service communication
   - Modular service design
   - Local-first implementation
   - NextCloud integration

2. Development
   - Test-driven development
   - Context-aware documentation
   - Privacy-first design
   - Bootstrap process approach

## Implementation Requirements
1. Core Gateway
   - Authentication service
   - Service registration
   - Request routing
   - Context management

2. AI Service
   - Claude API integration
   - Context preparation
   - Response processing
   - Error handling

3. Knowledge Service
   - Project context tracking
   - Privacy boundaries
   - Perspective management
   - Evolution tracking

## Test Coverage Requirements
- Unit Test Coverage: 90%+
- Integration Test Coverage: 80%+
- E2E Test Coverage: Critical paths
- Performance Test Coverage: Key operations

## Quality Standards
1. Code
   - TypeScript strict mode
   - ESLint compliance
   - Error handling
   - Performance optimization

2. Documentation
   - API documentation
   - Implementation notes
   - Test coverage reports
   - Context evolution tracking

3. Testing
   - Automated test suite
   - Performance benchmarks
   - Security testing
   - Integration verification