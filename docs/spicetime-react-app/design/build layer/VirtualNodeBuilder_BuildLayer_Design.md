# Build Layer Design for `VirtualNodeBuilder`

This document outlines the **design of the Build Layer** for the `VirtualNodeBuilder` component. The Build Layer is part
of a layered architecture that runs across **multiple life stages**, **hierarchies**, and orchestrates through a *
*global state (spacetime)**. This document focuses exclusively on the Build Layer.

---

## **Table of Contents**

1. [Conceptual Design](#conceptual-design)
    - [Purpose of the Build Layer](#purpose-of-the-build-layer)
    - [Scope of the Build Layer](#scope-of-the-build-layer)
    - [Key Characteristics](#key-characteristics)
2. [Component Hierarchy](#component-hierarchy)
    - [Hierarchy Structure](#hierarchy-structure)
    - [Orchestration](#orchestration)
    - [Example Overlaps With Other Layers](#example-overlaps-with-other-layers)
3. [Detailed Design](#detailed-design)
    - [Top-Level Component: `VirtualNodeBuilder`](#top-level-component-virtualnodebuilder)
    - [Downstream Component: `VirtualNode`](#downstream-component-virtualnode)
    - [React Context API](#react-context-api)
4. [GraphQL Schema](#graphql-schema)
    - [Queries](#queries)
    - [Mutations](#mutations)
5. [Hooks](#hooks)
    - [Custom Hooks in the Build Layer](#custom-hooks-in-the-build-layer)

---

## **1. Conceptual Design**

### **Purpose of the Build Layer**

The Build Layer is responsible for:

- Allowing users to **configure and assemble** virtual nodes into a component hierarchy.
- Providing dynamic support for **user inputs** (e.g., selecting clients, services, and their configurations).
- Validating and persisting a `VirtualNode` configuration before progressing to the **Runtime Layer**.
- Acting as the **entry point** into the layered component lifecycle, while being composable with other layers (e.g.,
  Validation, Runtime).

### **Scope of the Build Layer**

- Operates during the **design stage** of a `VirtualNode`.
- Establishes the **initial state** of the component hierarchy using global spacetime state.
- Completes its lifecycle by transitioning the configuration into downstream layers or runtime processes.

### **Key Characteristics**

1. **Modular and Composable**: Child components (clients, services, etc.) can be dynamically included/excluded.
2. **Declarative API**: Ensures configurations are expressive and prepare the node for higher layers.
3. **Context Integration**: Supports dynamic contexts via React Context and global state.
4. **Validatable and Observable**: Maintains validation and hookable states for each stage.

---

## **2. Component Hierarchy**

### **Hierarchy Structure**

- VirtualNodeBuilder (Build Layer Root)
    - VirtualNode
        - VirtualNodeClient(s)
            - Variants
                - Low-End Android
                - High-End Android
            - Context-Dependent Configurations
        - VirtualNodeService(s)
            - Variants
                - GraphDB Low
                - GraphDB High
            - Context-Dependent Configurations
        - Plumbing Layer
            - Validation Nodes
    - User Interaction Subcomponents
        - Context Detection Layer
        - Inputs/User Configuration UI
        - Build Summary/Validation Outputs

### **Orchestration**

In the Build Layer:

- Each child node (`VirtualNodeClient`, `VirtualNodeService`) registers itself with the `VirtualNodeBuilder` using hooks
  like `useRegisterNode`.
- Children nodes dynamically update their configurations via `BuilderContext` and emit changes upstream to the Builder.

### **Example Overlaps With Other Layers**

Components like `VirtualNodeService` may:

1. Be part of the **Build Layer** (assembly stage).
2. Transition into the **Runtime Layer** (execution stage).
3. Belong to **multiple hierarchies** (e.g., associated with the client and the backend service hierarchies).

The design isolates these stages using contexts to coordinate behavior across **spacetime layers**.

---

## **3. Detailed Design**

### **Top-Level Component: `VirtualNodeBuilder`**

#### **Purpose**

The `VirtualNodeBuilder` orchestrates the Build Layer, handling global state, validation, and dynamic updating of child
components.

#### **Responsibilities**

- Actively manage the component hierarchy during construction.
- Expose APIs for other stages/layers to query and observe Build Layer outputs.
- Emit events like "onBuildComplete" when ready for Transition.

#### **API Surface**

- **Props**:
    - `globalContext`: Reference to spacetime (global state).
    - `onBuildComplete(buildState: any): void`: Triggered when node construction is complete.
- **React Contexts**:
    - **`BuilderContext`**:
        - `registerNode(id: string, data: any): void`
        - `deregisterNode(id: string): void`
    - **`ValidationContext`**:
        - `validate(): ValidationResult`
        - `onValidationError(callback): void`.

#### **Input/Output Example**

```tsx
<VirtualNodeBuilder>
    <VirtualNode>
        <VirtualNodeClient hardwareProfile="low-end"/>
        <VirtualNodeService resourceTier="high-performance"/>
    </VirtualNode>
</VirtualNodeBuilder>
```

---

### **Downstream Component: `VirtualNode`**

#### **Purpose**

- Renders child nodes dynamically (`VirtualNodeClient`, `VirtualNodeService`).
- Tracks configuration updates and propagates changes upstream.

#### **API Surface**

- Dynamically consumes props passed by `VirtualNodeBuilder`.
- Emits configuration changes upstream via hooks such as `useBuilderState`.

---

### **React Context API**

#### **`BuilderContext`**

- Exposes API for dynamic node registry at the Build Layer:
    - `registerNode(id: string, data: any): void`: Register a node.
    - `deregisterNode(id: string): void`: Remove a registered node.

#### **`ValidationContext`**

- Provides mechanisms for Build Layer validation and feedback:
    - `validate(): ValidationResult`: Runs internal validations.
    - `onValidationError(callback): void`: Attach a callback to listen for validation errors.

---

## **4. GraphQL Schema**

The Build Layer interacts with a GraphQL API to manage draft virtual node configurations and fetch component data.

### **Queries**

- **Fetch Available Node Types**
  ```graphql
  query GetNodeOptions {
    nodeOptions {
      id
      name
      supportedVariants
    }
  }
  ```

- **Fetch Existing Configurations**
  ```graphql
  query GetDraftConfiguration($id: ID!) {
    draftConfiguration(id: $id) {
      id
      name
      clients {
        id
        type
        config
      }
      services {
        id
        type
        config
      }
    }
  }
  ```

### **Mutations**

- **Save Draft Configuration**
  ```graphql
  mutation SaveVirtualNode($input: VirtualNodeInput!) {
    saveVirtualNode(input: $input) {
      id
      message
    }
  }
  ```

---

## **5. Hooks**

### **Custom Hooks in the Build Layer**

#### **`useRegisterNode`**

- Purpose: Allow children of `VirtualNodeBuilder` to register themselves dynamically.
- API Surface:
  ```ts
  const { registerNode, deregisterNode } = useRegisterNode();
  ```

#### **`useBuilderValidation`**

- Purpose: Expose validation feedback to the Build Layer.
- API Surface:
  ```ts
  const { validate, onValidationError } = useBuilderValidation();
  ```

---

## **Next Steps**

1. Define detailed API specifications for `BuilderContext` and `ValidationContext`.
2. Implement the React Context providers for dynamic node registration and validation.
3. Define stubs for GraphQL integration using the proposed schema.

Would you like to begin with any of these steps? Let me know!