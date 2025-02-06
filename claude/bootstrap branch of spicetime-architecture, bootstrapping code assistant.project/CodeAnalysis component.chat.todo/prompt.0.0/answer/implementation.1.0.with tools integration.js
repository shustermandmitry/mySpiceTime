import * as ts from 'typescript';
import madge from 'madge';
import {Project} from 'typedoc';

interface
AnalysisConfig
{
    number;
    boolean;
    boolean;
    boolean;
}

interface
AnalysisResult
{
    number;
    {
        number;
        number;
        number;
    }

    Record < string, any >;
    errors ? : string[];
}

class CodebaseAnalyzer {
    private readonly
    project: Project;
    private analysisCache: Map<number, AnalysisResult>;

    constructor(tsconfigPath: string) {
        // Initialize TypeDoc project
        this.project = new Project({
            tsconfig: tsconfigPath,
            entryPoints: ['./src'],
        });
        this.analysisCache = new Map();
    }

    async analyzeLayer(depth: number): Promise<AnalysisResult> {
        // Check cache first
        if (this.analysisCache.has(depth)) {
            return this.analysisCache.get(depth)
            !;
        }

        let result: AnalysisResult;

        switch (depth) {
            case 0:
                result = await this.analyzeProjectStructure();
                break;
            case 1:
                result = await this.analyzeDependencies();
                break;
            case 2:
                result = await this.analyzeCodeStructure();
                break;
            case 3:
                result = await this.analyzeDetails();
                break;
            default:
                throw new Error('Invalid analysis depth');
        }

        // Cache the result
        this.analysisCache.set(depth, result);
        return result;
    }

    private async analyzeProjectStructure(): Promise<AnalysisResult> {
        // Use TypeDoc for high-level structure
        const reflection = this.project.convert();

        // Use madge for dependency overview
        const dependencyGraph = await madge('./src', {
            includeNpm: false,
            fileExtensions: ['ts', 'tsx']
        });

        const structure = {
            modules: reflection ? reflection.getChildrenByKind(0) : [],
            dependencies: dependencyGraph.obj()
        };

        return {
            level: 0,
            summary: {
                files: Object.keys(structure.dependencies).length,
                modules: structure.modules.length,
                dependencies: Object.values(structure.dependencies)
                    .reduce((acc: number, deps: string[]) => acc + deps.length, 0)
            },
            details: structure
        };
    }

    private async analyzeDependencies(): Promise<AnalysisResult> {
        // Detailed dependency analysis
        const depGraph = await madge('./src', {
            includeNpm: true,
            detectiveOptions: {
                ts: {
                    skipTypeImports: false
                }
            }
        });

        const analysis = {
            circular: depGraph.circular(),
            orphans: depGraph.orphans(),
            depends: depGraph.depends(),
            graph: depGraph.dot()
        };

        return {
            level: 1,
            summary: {
                files: Object.keys(analysis.depends).length,
                modules: analysis.orphans.length,
                dependencies: analysis.circular.length
            },
            details: analysis
        };
    }

    private async analyzeCodeStructure(): Promise<AnalysisResult> {
        // Use TypeScript Compiler API for detailed analysis
        const program = ts.createProgram(['./src'], {});
        const checker = program.getTypeChecker();

        const sourceFiles = program.getSourceFiles()
            .filter(file => !file.fileName.includes('node_modules'));

        const analysis = sourceFiles.map(file =>
            this.analyzeSourceFile(file, checker));

        return {
            level: 2,
            summary: {
                files: sourceFiles.length,
                modules: analysis.length,
                dependencies: analysis.reduce((acc, file) =>
                    acc + file.imports.length, 0)
            },
            details: {files: analysis}
        };
    }

    private analyzeSourceFile(sourceFile: ts.SourceFile, checker: ts.TypeChecker) {
        const analysis = {
            fileName: sourceFile.fileName,
            imports: [] as string[],
            exports: [] as string[],
            declarations: [] as {
                name: string;
                kind: string;
                location: ts.LineAndCharacter;
            }[]
        };

        // Visit and analyze nodes
        const visit = (node: ts.Node) => {
            if (ts.isImportDeclaration(node)) {
                analysis.imports.push(node.moduleSpecifier.getText());
            }
            if (ts.isExportDeclaration(node)) {
                if (node.moduleSpecifier) {
                    analysis.exports.push(node.moduleSpecifier.getText());
                }
            }
            if (ts.isInterfaceDeclaration(node) ||
                ts.isClassDeclaration(node) ||
                ts.isFunctionDeclaration(node)) {
                const symbol = checker.getSymbolAtLocation(node.name
                !
            )

                if (symbol) {
                    analysis.declarations.push({
                        name: symbol.getName(),
                        kind: ts.SyntaxKind[node.kind],
                        location: sourceFile.getLineAndCharacterOfPosition(node.getStart())
                    });
                }
            }
            ts.forEachChild(node, visit);
        };

        visit(sourceFile);
        return analysis;
    }

    private async analyzeDetails(): Promise<AnalysisResult> {
        // This layer combines results from previous layers
        // and adds additional metrics
        const prevResults = await Promise.all([
            this.analyzeLayer(0),
            this.analyzeLayer(1),
            this.analyzeLayer(2)
        ]);

        // Combine and enhance previous analyses
        const combined = {
            structure: prevResults[0].details,
            dependencies: prevResults[1].details,
            code: prevResults[2].details,
            metrics: {
                totalFiles: prevResults[0].summary.files,
                totalModules: prevResults[0].summary.modules,
                circularDeps: prevResults[1].details.circular.length,
                orphanModules: prevResults[1].details.orphans.length,
                totalDeclarations: prevResults[2].details.files.reduce(
                    (acc, file) => acc + file.declarations.length, 0
                )
            }
        };

        return {
            level: 3,
            summary: {
                files: combined.metrics.totalFiles,
                modules: combined.metrics.totalModules,
                dependencies: combined.metrics.circularDeps
            },
            details: combined
        };
    }

    // Helper to visualize current analysis state
    async visualizeAnalysis(depth: number): Promise<string> {
        const result = await this.analyzeLayer(depth);

        return `
Analysis Level ${depth}:
Files: ${result.summary.files}
Modules: ${result.summary.modules}
Dependencies: ${result.summary.dependencies}

Details available in result.details
    `;
    }
}

// Usage example:
/*
const analyzer = new CodebaseAnalyzer('./tsconfig.json');

// Analyze incrementally
for (let depth = 0; depth <= 3; depth++) {
  console.log(await analyzer.visualizeAnalysis(depth));
}
*/