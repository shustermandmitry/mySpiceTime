interface Domain {
    id: string;
    name: string;
    type: 'root' | 'category' | 'project';
    position: number[];           // Position in domain's value space
    target: number[];            // Target position in value space
    budget: number;              // Current allocated budget
    children: Domain[];          // Child domains
    metrics: MetricCollector;    // Performance metrics
}

interface MetricCollector {
    efficiency: number;          // Resource usage efficiency
    alignment: number;          // Alignment with parent goals
    impact: number;             // Measured impact
    collectMetrics(): void;
}

class HierarchicalBudgetSystem {
    private root: Domain;
    private errorSignal: Map<string, number[]> = new Map();

    constructor(rootDomain: Domain) {
        this.root = rootDomain;
    }

    // Propagate error signal down through domain hierarchy
    propagateError() {
        this.calculateDomainError(this.root);
    }

    // Adjust budgets based on error signals
    adjustBudgets() {
        this.adjustDomainBudget(this.root);
    }

    // Monitor and optimize system
    optimize(iterations: number) {
        for (let i = 0; i < iterations; i++) {
            // Collect metrics from all domains
            this.collectMetrics(this.root);

            // Propagate error signals
            this.propagateError();

            // Adjust budgets
            this.adjustBudgets();

            // Update domain positions based on activities
            this.updatePositions(this.root);

            // Log system state
            this.logSystemState(i);
        }
    }

    private calculateDomainError(domain: Domain): number[] {
        // Calculate error in current domain's value space
        const localError = domain.target.map((t, i) => t - domain.position[i]);
        this.errorSignal.set(domain.id, localError);

        // Propagate to children with appropriate transformations
        domain.children.forEach(child => {
            // Transform error signal to child's value space
            const transformedError = this.transformError(localError, domain.type, child.type);

            // Recursively calculate child errors
            const childError = this.calculateDomainError(child);

            // Combine transformed parent error with child error
            const combinedError = this.combineErrors(transformedError, childError);
            this.errorSignal.set(child.id, combinedError);
        });

        return localError;
    }

    private adjustDomainBudget(domain: Domain) {
        const error = this.errorSignal.get(domain.id) || [];

        // Calculate budget adjustment based on error magnitude
        const errorMagnitude = Math.sqrt(error.reduce((sum, e) => sum + e * e, 0));
        const adjustment = this.calculateBudgetAdjustment(domain, errorMagnitude);

        // Apply adjustment
        domain.budget += adjustment;

        // Distribute remaining budget to children based on their errors
        if (domain.children.length > 0) {
            const childrenBudget = domain.budget * 0.8; // Reserve 20% for domain operations
            this.distributeBudgetToChildren(domain, childrenBudget);
        }

        // Recursively adjust children's budgets
        domain.children.forEach(child => this.adjustDomainBudget(child));
    }

    private distributeBudgetToChildren(domain: Domain, totalBudget: number) {
        // Calculate relative weights based on error signals and impact
        const weights = domain.children.map(child => {
            const error = this.errorSignal.get(child.id) || [];
            const errorMagnitude = Math.sqrt(error.reduce((sum, e) => sum + e * e, 0));
            return {
                domain: child,
                weight: errorMagnitude * child.metrics.impact
            };
        });

        // Normalize weights
        const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);

        // Distribute budget proportionally
        weights.forEach(({domain: child, weight}) => {
            child.budget = totalBudget * (weight / totalWeight);
        });
    }

    private collectMetrics(domain: Domain) {
        domain.metrics.collectMetrics();
        domain.children.forEach(child => this.collectMetrics(child));
    }

    private updatePositions(domain: Domain) {
        // Update position based on budget utilization and metrics
        domain.position = domain.position.map((p, i) => {
            return p +
                (domain.metrics.efficiency * 0.1) +
                (domain.metrics.alignment * 0.1) *
                (domain.target[i] - p);
        });

        // Recursively update children
        domain.children.forEach(child => this.updatePositions(child));
    }

    // Helper methods
    private transformError(error: number[], fromType: string, toType: string): number[] {
        // Transform error signal between different domain value spaces
        // This would implement specific transformations based on domain types
        return error.map(e => e * 0.8); // Simplified transformation
    }

    private combineErrors(parentError: number[], childError: number[]): number[] {
        // Combine error signals with appropriate weights
        return parentError.map((pe, i) => 0.7 * pe + 0.3 * (childError[i] || 0));
    }

    private calculateBudgetAdjustment(domain: Domain, errorMagnitude: number): number {
        // Calculate budget adjustment based on error and current metrics
        const baseAdjustment = errorMagnitude * domain.budget * 0.1;
        return baseAdjustment * domain.metrics.efficiency;
    }

    private logSystemState(iteration: number) {
        console.log(`Iteration ${iteration}:`);
        this.logDomain(this.root, 0);
    }

    private logDomain(domain: Domain, depth: number) {
        const indent = '  '.repeat(depth);
        console.log(`${indent}Domain: ${domain.name}`);
        console.log(`${indent}Budget: ${domain.budget}`);
        console.log(`${indent}Error: ${this.errorSignal.get(domain.id)}`);
        console.log(`${indent}Metrics:`, domain.metrics);

        domain.children.forEach(child => this.logDomain(child, depth + 1));
    }
}

// Example usage
const rootDomain: Domain = {
    id: 'root',
    name: 'Community Development',
    type: 'root',
    position: [0.5, 0.5, 0.5],
    target: [0.8, 0.7, 0.6],
    budget: 1000000,
    children: [
        {
            id: 'welfare',
            name: 'Social Welfare',
            type: 'category',
            position: [0.4, 0.4, 0.4],
            target: [0.7, 0.6, 0.5],
            budget: 400000,
            children: [
                // Specific welfare projects
            ],
            metrics: {
                efficiency: 0.8,
                alignment: 0.7,
                impact: 0.9,
                collectMetrics: () => {
                }
            }
        },
        // Add commerce and investment domains
    ],
    metrics: {
        efficiency: 0.85,
        alignment: 1.0, // Root is always perfectly aligned
        impact: 1.0,
        collectMetrics: () => {
        }
    }
};

const budgetSystem = new HierarchicalBudgetSystem(rootDomain);
budgetSystem.optimize(10);