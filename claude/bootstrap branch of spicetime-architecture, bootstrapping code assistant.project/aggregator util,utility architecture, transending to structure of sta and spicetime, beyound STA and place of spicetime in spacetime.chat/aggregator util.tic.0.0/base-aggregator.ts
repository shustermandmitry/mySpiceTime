/**
 * @module utils/aggregator
 * @category Utils
 * @subcategory Aggregation
 */

/**
 * Configuration options for the Aggregator
 * @interface AggregatorConfig
 */
export interface AggregatorConfig {
    /** Base paths to start aggregation from */
    includePaths: string[];
    /** File extensions to include */
    extensions: string[];
    /** Patterns to exclude */
    excludePatterns?: string[];
    /** Maximum directory depth to traverse */
    maxDepth?: number;
}

/**
 * Result of an aggregation operation
 * @interface AggregateResult
 */
export interface AggregateResult {
    /** Combined content from all processed files */
    content: string;
    /** List of processed file paths */
    files: string[];
    /** Any errors encountered during aggregation */
    errors: Array<{
        path: string;
        message: string;
    }>;
    /** Aggregation statistics */
    stats: {
        totalFiles: number;
        totalSize: number;
        skippedFiles: number;
    };
}

/**
 * Base aggregator class that provides core content aggregation functionality.
 * This is the lowest-level utility in the aggregator family hierarchy.
 *
 * @class Aggregator
 */
export class Aggregator {
    protected config: AggregatorConfig;

    /**
     * Creates an instance of Aggregator.
     * @param {AggregatorConfig} config - Configuration options
     */
    constructor(config: AggregatorConfig) {
        this.config = {
            ...config,
            excludePatterns: config.excludePatterns || ['**/node_modules/**', '**/dist/**'],
            maxDepth: config.maxDepth || Infinity
        };
    }

    /**
     * Aggregates content from files according to configuration.
     * This is the primary method that other utilities in the family will build upon.
     *
     * @returns {Promise<AggregateResult>} Aggregation result
     */
    async aggregate(): Promise<AggregateResult> {
        const result: AggregateResult = {
            content: '',
            files: [],
            errors: [],
            stats: {
                totalFiles: 0,
                totalSize: 0,
                skippedFiles: 0
            }
        };

        try {
            // Basic implementation - to be enhanced based on needs
            // This serves as the foundation for more specialized aggregators
            await this.validateConfig();
            await this.collectFiles(result);
            await this.processFiles(result);
        } catch (error) {
            result.errors.push({
                path: 'general',
                message: error instanceof Error ? error.message : 'Unknown error occurred'
            });
        }

        return result;
    }

    /**
     * Validates the current configuration.
     * @protected
     */
    protected async validateConfig(): Promise<void> {
        if (!this.config.includePaths?.length) {
            throw new Error('No include paths specified');
        }
        if (!this.config.extensions?.length) {
            throw new Error('No file extensions specified');
        }
    }

    /**
     * Collects files based on configuration.
     * @protected
     * @param {AggregateResult} result - Aggregation result to update
     */
    protected async collectFiles(result: AggregateResult): Promise<void> {
        // To be implemented based on specific needs
        // This is where specialized aggregators will add their logic
    }

    /**
     * Processes collected files.
     * @protected
     * @param {AggregateResult} result - Aggregation result to update
     */
    protected async processFiles(result: AggregateResult): Promise<void> {
        // To be implemented based on specific needs
        // This is where specialized aggregators will add their logic
    }
}
