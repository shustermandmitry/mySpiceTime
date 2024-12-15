# AI Assistant Instructions for Code Projects

## Environment Structure
```
[repo-name]/
├── docs/
├── claude/
│   ├── [repo-name].workspace.info.md
│   └── [claude-project-name].project/
│       ├── [claude-project-name].project.info.md
│       └── [chat-name].chat.[seq].[desc]/
│           ├── [chat-name].chat.info.md
│           └── [artifact-name].artifact.md
└── packages/
```

## Info File Templates

### 1. [repo-name].workspace.info.md
```md
# [repo-name] Workspace
Updated: [ISO timestamp]

## Structure
[repo-name]/
├── [key folders and files]
└── [config placeholders]

## Development State
Current Focus: [area]
Stage: [phase]

## History
- [date]: [major milestone]
- [date]: [key decision]

## Projects
- [claude-project-name]: [purpose]
```

### 2. [project-name].project.info.md
```md
# [project-name] Project
Updated: [ISO timestamp]
Parent: [repo-name]

## Scope
Purpose: [brief]
State: [current state]

## Knowledge Base
- [topic]: [key points]
- [topic]: [key points]

## History
- [date]: [development]
- [date]: [decision]

## Chats
- [chat-name].[seq]: [purpose]
```

### 3. [chat-name].chat.info.md
```md
# [chat-name] Chat [seq]
Updated: [ISO timestamp]
Project: [project-name]

## Purpose
[brief description]

## Artifacts
- [path/to/artifact]: [purpose]
- [path/to/artifact]: [purpose]

## Contributions
- [knowledge added]
- [decisions made]

## Dependencies
Requires: [context files needed]
```

## Context Protocol
1. Request workspace info before project start
2. Load project info for each session
3. Reference chat info for continuity
4. Request source files as needed

## Source Code Protocol
1. Request existing files before modifications
2. Reference paths relative to repo root
3. Implement changes via setup.js files:
   - Interactive confirmation
   - Path verification
   - Self-deletion after execution
   - Error handling

## Chat End Protocol
1. Update info files:
   - [chat-name].chat.info.md
   - [project-name].project.info.md
2. Single end command per chat
3. For updates:
   - Start new chat
   - Reference previous chat context
   - Update project info incrementally

## Error Handling
- Request missing context files
- Verify file paths before operations
- Handle setup.js failures
- Report missing dependencies