# spicetime-assistant.project.info.002.md

## Project Overview
SpiceTime Assistant implements tooling for automated interaction with Claude and integration of Claude's capabilities into development workflow. The project focuses on context management and efficient knowledge transfer between conversations and projects.

## Current State
- Core structure and workflows defined
- Initial roadmap established
- File naming conventions and templates finalized
- Project organization protocols established

## Key Artifacts
1. claude-assistant-instructions.artifact.001.md
   - Core project structure
   - Context protocols
   - Command specifications
   - Best practices

2. claude-dev-workflow.artifact.001.md
   - Development phases
   - Context management
   - Common workflows
   - Project loading procedures

3. claude-naming-templates.artifact.001.md
   - Component templates
   - File naming conventions
   - Structure examples

4. spicetime-assistant.project.roadmap.md
   - Infrastructure components
   - Client implementations
   - Development sequence

## Key Decisions
1. Separation of Design and Implementation
   - Design/architecture in mySpiceTime/claude
   - Implementation in spicetime-architecture
   - Connection via symlinks

2. Project Structure
   - Timeline-based immutable chat history
   - Symlink-based organization
   - Strict naming conventions
   - Context transfer protocols

3. Repository Organization
   - mySpiceTime/claude for Claude interaction archive
   - spicetime-architecture for tooling implementation
   - Symlink-based cross-references

## Dependencies
- None (root project)

## Development Focus
Current:
- Core infrastructure implementation
- GQL gateway integration
- Claude service core development

Next:
- WebStorm assistant client
- Agent platform core

## Child Projects
Can be created from:
- Individual infrastructure components
- Specific client implementations
- Platform extensions

## Context Integration
1. Loading Instructions
   - Use core instruction artifacts
   - Follow loading protocols
   - Maintain version references

2. Sharing Resources
   - Via symlinks
   - With explicit version tags
   - Following naming conventions

3. Implementation References
   - Connect to spicetime-architecture
   - Use symlinks for specific versions
   - Follow context protocols