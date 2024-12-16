# project-structure-setup.chat.001.info.001.md

## Purpose
Establish core project structure and documentation patterns for SpiceTime Assistant, focusing on efficient context transfer between chats and projects while maintaining clear separation between design in mySpiceTime/claude and implementation in spicetime-architecture.

## Key Decisions
1. File Organization
   - Immutable chat/artifact timeline in mySpiceTime/claude
   - Implementation code in spicetime-architecture
   - Cross-reference via symlinks
   - No strict schema validation for now

2. Documentation Structure
   - Split core documentation into focused artifacts
   - Clear separation of concerns between artifacts
   - Emphasis on practical usage and examples

3. Context Management
   - Project and chat info files as primary context carriers
   - Explicit artifact references and versioning
   - Roadmap propagation from chats to projects to root

## Created Artifacts
1. claude-assistant-instructions.artifact.001.md
   - Core structure and protocols
   - Project commands
   - Best practices
   - Resource management

2. claude-dev-workflow.artifact.001.md
   - Development phases
   - Context management
   - Common workflows
   - Project loading procedures

3. claude-naming-templates.artifact.001.md
   - Component and file templates
   - Structure examples
   - Naming patterns

4. spicetime-assistant.project.info.md
   - Project overview and current state
   - Key artifacts and decisions
   - Development focus
   - Context integration guides

## Dependencies
- None (initial setup chat)

## Next Steps
1. Create initial implementation tasks for:
   - GQL gateway integration
   - Claude service core
   - WebStorm assistant client
   - Agent platform core

2. Initialize corresponding project structures in:
   - mySpiceTime/claude
   - spicetime-architecture

3. Set up symlink patterns between repositories