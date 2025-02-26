class FunctorError extends STError {
  constructor(
    message: string, 
    functorContext: {
      path: string;            // Current functor's path
      basedFrom: string;       // Original functor path it was derived from
      targetContext?: string;  // Path of supplied context if different
    },
    extInfo?: unknown
  ) {
    // Combine context and additional info
    const errorInfo = {
      ...functorContext,
      details: extInfo
    };
    
    super(message, errorInfo);
  }
}

// Usage examples:

// Context mismatch error
throw new FunctorError(
  "Invalid context for functor operation",
  {
    path: "universalFunctor/quantum/entangled",
    basedFrom: "universalFunctor/quantum",
    targetContext: "universalFunctor/ethical"  // Different branch
  },
  {
    operation: "extend",
    reason: "Cross-branch operation not allowed"
  }
);

// Path validation error
throw new FunctorError(
  "Cannot install functor above its origin",
  {
    path: "universalFunctor/quantum/entangled",
    basedFrom: "universalFunctor/quantum",
    targetContext: "universalFunctor"  // Trying to install above origin
  },
  {
    operation: "install",
    reason: "Target is ancestor of origin"
  }
);

// Branch creation error
throw new FunctorError(
  "Invalid branch source",
  {
    path: "universalFunctor/gravitational",
    basedFrom: "universalFunctor",
    targetContext: "universalFunctor/ethical/branch-A"  // Unrelated branch
  },
  {
    operation: "branch",
    reason: "Source and target branches not related"
  }
);