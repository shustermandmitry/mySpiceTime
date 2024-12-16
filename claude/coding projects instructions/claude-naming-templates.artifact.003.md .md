# claude-naming-templates.artifact.003.md

## Component Templates

```
// Basic components
[chat-name]    : lowercase-with-hyphens
[project-name] : lowercase-with-hyphens
[artifact-name]: lowercase-with-hyphens
[resource-name]: lowercase-with-hyphens
[seq]         : 3-digit-number (001-999)

// Examples
chat-name    : initial-setup, api-design, code-review
project-name : auth-service, data-pipeline, user-management
artifact-name: validation-rules, api-spec, db-schema
resource-name: swagger-spec, env-config, test-data
seq         : 001, 002, 042, 999
```

## File Name Templates

```
// Standard files
Chat folder     : [chat-name].chat.[seq]/
Project folder  : [project-name].project.[seq]/
Info file      : info.md
Roadmap file   : roadmap.md
Artifact file  : [artifact-name].artifact.[seq].md
Shared artifact: [artifact-name].artifact.[seq].from.project.[seq].from.chat.[seq].md
Resource file  : [resource-name].resource.[ext]

// Examples
Chat folder     : api-design.chat.001/
Project folder  : auth-service.project.002/
Artifact file  : validation-rules.artifact.003.md
Shared artifact: api-spec.artifact.001.from.project.002.from.chat.003.md
Resource file  : swagger-spec.resource.yaml
```

## Structure Examples

### Simple Chat
```
api-design.chat.001/
├── info.md
├── roadmap.md
├── api-spec.artifact.001.md
└── validation-rules.artifact.002.md
```

### Basic Project
```
auth-service.project.001/
├── info.md
├── roadmap.md
├── init.chat.001/
│   ├── info.md
│   ├── roadmap.md
│   └── auth-flow.artifact.001.md
└── swagger-spec.resource.yaml
```

### Shared Resources
```
gateway.project.002/
├── info.md
├── roadmap.md
├── api-spec.artifact.001.from.project.001.from.chat.002.md
└── auth-flow.artifact.001.from.project.001.from.chat.001.md
```