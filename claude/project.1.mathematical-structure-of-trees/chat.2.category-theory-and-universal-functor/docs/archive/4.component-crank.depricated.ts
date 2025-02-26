// Core component types
interface BaseComponent {
  type: string;
  props: Record<string, any>;
  children: BaseComponent[];
}

interface DomainComponent extends BaseComponent {
  domain: string;
  context: Record<string, any>;
}

interface RuntimeComponent extends BaseComponent {
  state: Record<string, any>;
  handlers: Record<string, Function>;
}

// Crank mechanism specialized for components
class ComponentCrank {
  constructor(
    private readonly transforms: {
      // Base -> Domain (adds domain-specific context)
      toDomain: (base: BaseComponent) => DomainComponent;
      
      // Domain -> Runtime (adds state and handlers)
      toRuntime: (domain: DomainComponent) => RuntimeComponent;
      
      // Runtime -> Base (extracts new base structure)
      toBase: (runtime: RuntimeComponent) => BaseComponent;
    }
  ) {}

  // Generate a component through one complete rotation
  turn(initial: BaseComponent): {
    base: BaseComponent;
    domain: DomainComponent;
    runtime: RuntimeComponent;
  } {
    // Step 1: Transform to domain component
    const domain = this.transforms.toDomain(initial);
    
    // Step 2: Transform to runtime component
    const runtime = this.transforms.toRuntime(domain);
    
    // Step 3: Extract new base component
    const newBase = this.transforms.toBase(runtime);

    return { base: newBase, domain, runtime };
  }

  // Generate through multiple domains
  turnThroughDomains(
    initial: BaseComponent,
    domains: string[]
  ): Record<string, DomainComponent> {
    const results: Record<string, DomainComponent> = {};
    
    let current = initial;
    for (const domain of domains) {
      const turned = this.turn(current);
      results[domain] = {
        ...turned.domain,
        domain
      };
      current = turned.base;
    }
    
    return results;
  }
}

// Example usage for web components
const webComponentCrank = new ComponentCrank({
  // Base -> Domain: Add web-specific context
  toDomain: (base) => ({
    ...base,
    domain: 'web',
    context: {
      styling: {
        className: `${base.type}-component`,
        theme: 'light'
      },
      accessibility: {
        role: base.type,
        ariaLabel: base.props.label || base.type
      }
    }
  }),

  // Domain -> Runtime: Add web handlers and state
  toRuntime: (domain) => ({
    ...domain,
    state: {
      isVisible: true,
      isEnabled: true,
      ...domain.props.initialState
    },
    handlers: {
      onClick: () => console.log(`${domain.type} clicked`),
      onMount: () => console.log(`${domain.type} mounted`),
      onUnmount: () => console.log(`${domain.type} unmounted`)
    }
  }),

  // Runtime -> Base: Extract new structure
  toBase: (runtime) => ({
    type: runtime.type,
    props: {
      ...runtime.props,
      isVisible: runtime.state.isVisible,
      isEnabled: runtime.state.isEnabled
    },
    children: runtime.children
  })
});

// Create multiple domain-specific versions
const initialButton: BaseComponent = {
  type: 'button',
  props: {
    label: 'Click me'
  },
  children: []
};

// Generate button components for different domains
const buttonVersions = webComponentCrank.turnThroughDomains(
  initialButton,
  ['web', 'mobile', 'desktop']
);

// Example of a more complex component hierarchy
const form: BaseComponent = {
  type: 'form',
  props: {
    name: 'signup',
    initialValues: {}
  },
  children: [
    {
      type: 'input',
      props: { type: 'text', name: 'username' },
      children: []
    },
    {
      type: 'input',
      props: { type: 'password', name: 'password' },
      children: []
    },
    {
      type: 'button',
      props: { type: 'submit', label: 'Sign up' },
      children: []
    }
  ]
};

// Transform through domains recursively
function transformComponentTree(
  crank: ComponentCrank,
  component: BaseComponent,
  domain: string
): DomainComponent {
  const { domain: domainVersion } = crank.turn(component);
  
  return {
    ...domainVersion,
    domain,
    children: component.children.map(child => 
      transformComponentTree(crank, child, domain)
    )
  };
}

// Generate domain-specific versions of the entire form
const webForm = transformComponentTree(webComponentCrank, form, 'web');
