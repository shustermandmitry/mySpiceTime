// Define core types for resource flow simulation
type Position = [number, number, number];  // 3D position in policy space
type ResourceFlow = number;

interface Entity {
    id: string;
    position: Position;     // Position in value space
    resources: number;      // Current resource level
    ethics: number;        // Ethical alignment score
}

interface Transaction {
    from: string;
    to: string;
    amount: number;
    type: 'commerce' | 'welfare' | 'investment' | 'infrastructure';
}

interface TaxPolicy {
    // Tax rates for different purposes
    welfare: number;       // Direct support for needy
    ethical: number;       // Support for aligned enterprises
    infrastructure: number;// Community infrastructure

    // Policy position in 3D space
    position: Position;    // [welfare_weight, ethical_weight, infra_weight]
}

class CommunitySimulator {
    private entities: Map<string, Entity> = new Map();
    private transactions: Transaction[] = [];
    private policy: TaxPolicy;
    private time: number = 0;

    constructor(policy: TaxPolicy) {
        this.policy = policy;
    }

    // Add entity to simulation
    addEntity(entity: Entity) {
        this.entities.set(entity.id, entity);
    }

    // Process a transaction with tax effects
    processTransaction(tx: Transaction) {
        const from = this.entities.get(tx.from);
        const to = this.entities.get(tx.to);

        if (!from || !to) return;

        // Calculate tax based on policy and positions
        const taxRate = this.calculateTaxRate(from, to);
        const taxAmount = tx.amount * taxRate;
        const netAmount = tx.amount - taxAmount;

        // Transfer resources
        from.resources -= tx.amount;
        to.resources += netAmount;

        // Distribute tax according to policy
        this.distributeTax(taxAmount);

        // Record transaction
        this.transactions.push(tx);
    }

    // Run simulation for specified time steps
    simulate(steps: number) {
        for (let i = 0; i < steps; i++) {
            this.time++;
            this.generateRandomTransactions();
            this.updateEntityPositions();
            this.analyzeState();
        }
    }

    // Calculate tax rate based on policy and entity positions
    private calculateTaxRate(from: Entity, to: Entity): number {
        // Base tax rate
        let rate = 0.1;

        // Adjust based on ethical alignment
        const ethicalDistance = this.calculateDistance(from.position, this.policy.position);
        rate += ethicalDistance * 0.1;

        // Adjust based on transaction size and entity resources
        rate *= Math.log(from.resources / 1000 + 1);

        return Math.min(Math.max(rate, 0), 0.5); // Cap between 0-50%
    }

    // Distribute collected tax according to policy
    private distributeTax(amount: number) {
        // Distribute to welfare
        const welfareAmount = amount * this.policy.welfare;
        this.distributeWelfare(welfareAmount);

        // Support ethical enterprises
        const ethicalAmount = amount * this.policy.ethical;
        this.supportEthicalEnterprises(ethicalAmount);

        // Invest in infrastructure
        const infraAmount = amount * this.policy.infrastructure;
        this.investInInfrastructure(infraAmount);
    }

    // Helper methods for tax distribution
    private distributeWelfare(amount: number) {
        // Find entities with lowest resources
        const sortedEntities = Array.from(this.entities.values())
            .sort((a, b) => a.resources - b.resources);

        // Distribute to bottom 20%
        const recipients = sortedEntities.slice(0, Math.ceil(sortedEntities.length * 0.2));
        const perRecipient = amount / recipients.length;

        recipients.forEach(entity => {
            entity.resources += perRecipient;
        });
    }

    private supportEthicalEnterprises(amount: number) {
        // Support entities closest to policy position
        const sortedByAlignment = Array.from(this.entities.values())
            .sort((a, b) =>
                this.calculateDistance(a.position, this.policy.position) -
                this.calculateDistance(b.position, this.policy.position)
            );

        // Distribute to top 30% most aligned
        const recipients = sortedByAlignment.slice(0, Math.ceil(sortedByAlignment.length * 0.3));
        const perRecipient = amount / recipients.length;

        recipients.forEach(entity => {
            entity.resources += perRecipient;
        });
    }

    private investInInfrastructure(amount: number) {
        // Simulate infrastructure investment by boosting all entities
        const boost = amount / this.entities.size;
        this.entities.forEach(entity => {
            entity.resources += boost * 0.5;  // Infrastructure has 50% efficiency
        });
    }

    // Utility method to calculate distance in policy space
    private calculateDistance(pos1: Position, pos2: Position): number {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) +
            Math.pow(pos1[1] - pos2[1], 2) +
            Math.pow(pos1[2] - pos2[2], 2)
        );
    }

    // Generate random transactions between entities
    private generateRandomTransactions() {
        const entities = Array.from(this.entities.values());
        const numTransactions = Math.floor(entities.length * 0.1); // 10% of entities transact

        for (let i = 0; i < numTransactions; i++) {
            const from = entities[Math.floor(Math.random() * entities.length)];
            const to = entities[Math.floor(Math.random() * entities.length)];

            if (from.id !== to.id && from.resources > 0) {
                this.processTransaction({
                    from: from.id,
                    to: to.id,
                    amount: Math.min(from.resources * 0.1, Math.random() * 100),
                    type: 'commerce'
                });
            }
        }
    }

    // Update entity positions based on interactions and incentives
    private updateEntityPositions() {
        this.entities.forEach(entity => {
            // Entities slowly move toward profitable positions
            const profitable = this.findProfitableDirection(entity);
            entity.position = [
                entity.position[0] + profitable[0] * 0.01,
                entity.position[1] + profitable[1] * 0.01,
                entity.position[2] + profitable[2] * 0.01
            ];
        });
    }

    // Find direction of maximum profit for an entity
    private findProfitableDirection(entity: Entity): Position {
        // Simple gradient descent
        const delta = 0.01;
        const originalPosition = [...entity.position];
        const gradient: Position = [0, 0, 0];

        // Test each direction
        for (let dim = 0; dim < 3; dim++) {
            entity.position[dim] += delta;
            const profitPlus = this.calculatePotentialProfit(entity);

            entity.position[dim] -= 2 * delta;
            const profitMinus = this.calculatePotentialProfit(entity);

            gradient[dim] = (profitPlus - profitMinus) / (2 * delta);
            entity.position[dim] = originalPosition[dim];
        }

        return gradient;
    }

    // Calculate potential profit at current position
    private calculatePotentialProfit(entity: Entity): number {
        // Simplified profit calculation
        const taxRate = this.calculateTaxRate(entity, entity);
        return (1 - taxRate) * 100; // Base profit of 100
    }

    // Analyze current state of the system
    private analyzeState() {
        const totalResources = Array.from(this.entities.values())
            .reduce((sum, e) => sum + e.resources, 0);

        const gini = this.calculateGini();
        const avgEthicalAlignment = this.calculateAverageAlignment();

        console.log(`Time ${this.time}:`);
        console.log(`Total Resources: ${totalResources}`);
        console.log(`Gini Coefficient: ${gini}`);
        console.log(`Avg Ethical Alignment: ${avgEthicalAlignment}`);
    }

    // Calculate Gini coefficient of resource distribution
    private calculateGini(): number {
        const sorted = Array.from(this.entities.values())
            .map(e => e.resources)
            .sort((a, b) => a - b);

        let sumCumulative = 0;
        const total = sorted.reduce((a, b) => a + b, 0);

        for (let i = 0; i < sorted.length; i++) {
            sumCumulative += sorted[i] * (sorted.length - i);
        }

        const gini = (sorted.length + 1 - 2 * sumCumulative / total) / sorted.length;
        return gini;
    }

    // Calculate average ethical alignment
    private calculateAverageAlignment(): number {
        return Array.from(this.entities.values())
            .reduce((sum, e) =>
                sum + this.calculateDistance(e.position, this.policy.position), 0
            ) / this.entities.size;
    }
}

// Example usage
const policy: TaxPolicy = {
    welfare: 0.4,      // 40% to welfare
    ethical: 0.3,      // 30% to ethical enterprises
    infrastructure: 0.3,// 30% to infrastructure
    position: [0.4, 0.3, 0.3]
};

const simulator = new CommunitySimulator(policy);

// Add some test entities
for (let i = 0; i < 100; i++) {
    simulator.addEntity({
        id: `entity${i}`,
        position: [Math.random(), Math.random(), Math.random()],
        resources: 1000 * Math.random(),
        ethics: Math.random()
    });
}

// Run simulation
simulator.simulate(100);