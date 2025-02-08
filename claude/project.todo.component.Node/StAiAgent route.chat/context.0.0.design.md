# StAiAgent Route Specification

---

## Overview

The `StAiAgent` is a route within the `STNode` router that provides a **GraphQL-powered AI agent interface**. Its
primary purpose is to connect with AI services such as language models, procedural generators, and other AI-powered
systems, making them accessible within the framework.

### Key Features

1. **GraphQL Service**:
    - Provides a schema to query and interact with AI capabilities via a consistent API.
    - Enables clients to access, utilize, and manage AI-powered procedural components.

2. **Generative Interface**:
    - Facilitates specific tasks such as text generation, coding assistance, and design assistance.
    - Tailored for different domains with modular, reusable components.

3. **Context Awareness**:
    - Operates with knowledge of the **local spicetime graph** managed by **TreeRPC**.
    - Organized by **Deep** to provide structured, personalized perspectives.
    - Offers AI services that are contextually relevant to the user's current state or historical needs.

4. **Many Faces (Virtual Client) / Procedural Domains**:
    - Supports multiple procedural "avatar" faces for domain specialization:
        - AI Coding Assistant
        - AI Content Generator (e.g., for documents, stories).
        - Design Assistant
        - Tools for visualization and generative power tailored to other domains.

---

## Functional Specifications

### Endpoints

1. **GraphQL Service Endpoint**:
    - The `StAiAgent` route exposes a GraphQL API capable of querying:
        - Available AI services.
        - Task-specific queries such as programmatic code generation or content generation.

   Example:
   ```graphql
   query {
     aiAgent {
       availableDomains {
         id
         name
         description
       }
       generateText(input: "Describe Spicetime") {
         result
       }
       generateCode(input: "React component for a button") {
         result
       }
     }
   }
   ```

   Schema Overview:
    - **Query:**
        - `availableDomains`: Lists all supported AI domains.
        - `generateText(input: String): TextResult`: Generates text to fulfill input prompt.
        - `generateCode(input: String): CodeResult`: Generates code based on the provided specification.
    - **Mutations (if needed):**
        - Initiates specific tasks (e.g., executing a design flow or scheduling content generation).

---

### Components

1. **GraphQL Endpoint Component**
    - Responsible for exposing the AI services through a GraphQL schema.
    - Adapter layer to abstract calls to external AI services based on chosen implementation.
    - Ensures asynchronous behavior and reliable connection to local or global spicetime graphs.

2. **Interface Components**
    - Modular React components that map to specific procedural domains:
        - **AIProceduralFace**:
            - Flexible interface able to handle any procedural domain.
            - Custom rendering logic based on tasks (e.g., "CodingFace", "StoryFace").
        - **Responsive UI Adapter**:
            - Manage UI state and validation for AI-based user workflows.

3. **AI Connection Logic**
    - Abstraction layer to handle connections to:
        - Local AI environments (e.g., fine-tuned local LLMs).
        - Public AI APIs (e.g., OpenAI GPT models, Stable Diffusion for image generation).

### Design Sketch of Components

#### Example StAiAgent React Component

```tsx
import React from "react";
import {useQuery, gql} from "@apollo/client";

const FETCH_DOMAINS = gql`
  query {
    aiAgent {
      availableDomains {
        id
        name
        description
      }
    }
  }
`;

const StAiAgent: React.FC = () => {
    const {loading, error, data} = useQuery(FETCH_DOMAINS);

    if (loading) return <p>Loading AI domains...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const domains = data?.aiAgent?.availableDomains;

    return (
        <div>
            <h1>StAiAgent</h1>
            <p>Choose an AI agent for your task:</p>
            <ul>
                {domains.map((domain: { id: string; name: string; description: string }) => (
                    <li key={domain.id}>
                        <strong>{domain.name}:</strong> {domain.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StAiAgent;
```

---

### Procedural Domains (`faces`) to Implement

1. **AI Coding Assistant**:
    - A procedural interface designed for code generation.
    - Integrated locally with TreeRPC’s spicetime graph to understand context (e.g., code files under `perspectives`).

   Example Features:
    - Generate boilerplate React components.
    - Suggest edits/refactors based on local code context.

2. **Content Generator**:
    - Creates narrative, documents, or templates based on input queries.

   Example Features:
    - Generate meeting minutes, blog posts, or descriptive reports.
    - Content personalization based on user state/context.

3. **Design Assistant (future)**:
    - Procedural helper for generative graphic or design tasks.
    - Integration with tools like Stable Diffusion for image creation.

---

## Roles & Responsibilities of Team Members

### AI Collaboration (Backend Developer)

- **Build the GraphQL Service**:
    - Define schema for AI-based queries and mutations.
    - Implement resolvers that connect to AI models (e.g., OpenAI, local models).
    - Ensure support for TreeRPC and Deep context awareness.
- **Service Integration**:
    - Abstract calls to multiple AI backends or APIs.

---

### Frontend Collaboration (Frontend Developer)

- **AI Agent UI Components**:
    - Develop modular React components (e.g., `AIProceduralFace`).
    - Create components like "AI Coding Assistant" with structured workflows.
- **State Management for Generative Flows**:
    - Ensure smooth integration of prompts and data between UI and service responses.

---

### System Integration (Integrators/Architects)

- **SpiceTime Graph Awareness**:
    - Ensure `StAiAgent` works in alignment with TreeRPC and Deep for contextual spicetime.
    - Ensure that global and personal context is accessible for AI agents.

---

### Example Workflow: StAiAgent in Action

1. User opens the **StAiAgent route** in the `STNode` interface.
2. They see a list of AI agents (`faces`) categorized into procedural domains:
    - Choose "AI Coding Assistant".
    - Provide input: "Create a button React component."
3. **GraphQL Service** sends a query to the backend AI service.
    - Forwards the request, adds personalized context (from TreeRPC/Deep).
4. Service returns generated content with explanations, visible to the user.

---

### Future Enhancements

1. **Real-Time Collaboration**:
    - Extend `StAiAgent` so users can collaboratively refine outputs with live updates.
2. **Domain-Specific AI Fine-Tuning**:
    - Introduce hooks for local fine-tuned AI models for domain-specific tasks.
3. **Generative Vision Integration**:
    - Integrate Stable Diffusion or similar tools to expand procedural services (e.g., design).

---

### Deliverables

1. GraphQL service backend for the `StAiAgent`.
2. Frontend UI for presenting and interacting with procedural domains.
3. Modular React components for domains like **AI Coding Assistant**.

---

Let me know if you'd like to refine this spec further or begin coding one of the components!