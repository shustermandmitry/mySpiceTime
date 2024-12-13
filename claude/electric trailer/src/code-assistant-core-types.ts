// packages/internal/code-assistant-core/src/types/codeAnalysis.ts

/**
 * Represents the context of a code analysis request.
 * Includes file content, cursor position, and project metadata.
 * 
 * @category Models
 */
export interface CodeContext {
  /** The content of the file being analyzed */
  fileContent: string;
  
  /** Current cursor position in the file */
  cursorPosition: Position;
  
  /** Absolute path to the file */
  filePath: string;
  
  /** Project-level context information */
  projectContext: ProjectContext;
}

/**
 * Represents a position in a text document.
 * Uses zero-based line and character numbers.
 * 
 * @category Models
 */
export interface Position {
  /** Zero-based line number */
  line: number;
  
  /** Zero-based character offset on the line */
  character: number;
}

/**
 * Project-level context information used for code analysis.
 * 
 * @category Models
 */
export interface ProjectContext {
  /** List of project dependencies from package.json */
  dependencies: string[];
  
  /** Content of tsconfig.json if available */
  tsConfig?: string;
  
  /** Type of project being analyzed */
  projectType: ProjectType;
}

/**
 * Supported project types for code analysis.
 * 
 * @category Models
 */
export enum ProjectType {
  /** React frontend project */
  REACT = 'REACT',
  
  /** Node.js backend project */
  NODE = 'NODE',
  
  /** GraphQL API project */
  GRAPHQL = 'GRAPHQL',
  
  /** Full-stack application */
  FULLSTACK = 'FULLSTACK'
}

// packages/internal/code-assistant-core/src/services/codeAnalyzer.ts

/**
 * Core service for analyzing code and providing suggestions.
 * 
 * @remarks
 * This service implements the main code analysis logic that can be shared
 * across different IDE integrations. It handles parsing, analysis, and
 * suggestion generation.
 * 
 * @example
 * ```typescript
 * const analyzer = new CodeAnalyzer();
 * const result = await analyzer.analyzeCode({
 *   fileContent: 'const x = 1;',
 *   cursorPosition: { line: 0, character: 0 },
 *   filePath: '/path/to/file.ts',
 *   projectContext: {
 *     dependencies: ['react'],
 *     projectType: ProjectType.REACT
 *   }
 * });
 * ```
 * 
 * @category Services
 */
export class CodeAnalyzer {
  /**
   * Analyzes code and provides suggestions based on the given context.
   * 
   * @param context - The context for code analysis
   * @returns A Promise resolving to code analysis results
   * @throws {AnalysisError} When analysis fails
   * 
   * @beta This API is still in development and may change
   */
  public async analyzeCode(context: CodeContext): Promise<CodeAnalysis> {
    // Implementation details
    throw new Error('Not implemented');
  }

  /**
   * Calculates complexity metrics for the given code.
   * 
   * @param code - Source code to analyze
   * @returns Complexity analysis results
   * @internal This method is for internal use only
   */
  private calculateComplexity(code: string): ComplexityAnalysis {
    // Implementation details
    throw new Error('Not implemented');
  }
}

/**
 * Result of code analysis including issues and suggestions.
 * 
 * @category Models
 */
export interface CodeAnalysis {
  /** List of identified code issues */
  issues: CodeIssue[];
  
  /** Generated code suggestions */
  suggestions: CodeSuggestion[];
  
  /** Code complexity metrics */
  complexity: ComplexityAnalysis;
}

/**
 * Represents an issue found during code analysis.
 * 
 * @category Models
 */
export interface CodeIssue {
  /** Severity level of the issue */
  severity: IssueSeverity;
  
  /** Description of the issue */
  message: string;
  
  /** Issue location - line number */
  line: number;
  
  /** Issue location - character offset */
  character: number;
}

/**
 * Severity levels for code issues.
 * 
 * @category Models
 */
export enum IssueSeverity {
  /** Critical issues that must be fixed */
  ERROR = 'ERROR',
  
  /** Potential problems that should be reviewed */
  WARNING = 'WARNING',
  
  /** Informational notes about the code */
  INFO = 'INFO'
}

/**
 * Configuration options for the code analyzer.
 * 
 * @category Configuration
 */
export interface CodeAnalyzerConfig {
  /** Maximum depth for AST traversal */
  maxAnalysisDepth?: number;
  
  /** List of rules to apply during analysis */
  rules?: string[];
  
  /** Custom analyzers to use */
  customAnalyzers?: CodeAnalyzer[];
  
  /**
   * @deprecated Use `rules` instead
   * @internal
   */
  ruleSet?: string[];
}

/**
 * Error thrown during code analysis.
 * 
 * @category Errors
 */
export class AnalysisError extends Error {
  /**
   * Creates a new AnalysisError.
   * 
   * @param message - Error message
   * @param code - Error code
   */
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'AnalysisError';
  }
}

// packages/internal/code-assistant-core/src/services/suggestionEngine.ts

/**
 * Generates and manages code suggestions based on analysis results.
 * 
 * @remarks
 * This service handles the generation of code suggestions using
 * various strategies including pattern matching and machine learning.
 * 
 * @category Services
 */
export class SuggestionEngine {
  /**
   * Generates code suggestions based on analysis results.
   * 
   * @param analysis - Results from code analysis
   * @param context - Original code context
   * @returns Generated code suggestions
   * 
   * @throws {SuggestionError} When suggestion generation fails
   */
  public async generateSuggestions(
    analysis: CodeAnalysis,
    context: CodeContext
  ): Promise<CodeSuggestion[]> {
    // Implementation details
    throw new Error('Not implemented');
  }

  /**
   * Ranks suggestions by relevance to the current context.
   * 
   * @param suggestions - Unranked suggestions
   * @param context - Current code context
   * @returns Ranked suggestions
   * @internal
   */
  private rankSuggestions(
    suggestions: CodeSuggestion[],
    context: CodeContext
  ): CodeSuggestion[] {
    // Implementation details
    throw new Error('Not implemented');
  }
}
