import {STLInterpreter} from './interpreter';

// Example of using STL to model market dynamics
const stl = new STLInterpreter();

// Define the STL program
const program = `
// Market space definition
space Market {
    supply: 0..∞
    demand: 0..∞
    price: 0..∞
    symmetry Scale
}

// Social space definition
space Social {
    trust: 0..1
    cooperation: 0..1
    influence: 0..1
    symmetry SU3
}

// Define market tension field
field market_tension on Market {
    gradient(price) + curl(supply, demand)
}

// Define market to social transformation
transform market_to_social: Market -> Social {
    trust => normalize(price / mean(price))
    cooperation => min(supply, demand) / max(supply, demand)
    influence => market_share(supply)
}

// Define measurement
measure efficiency on Market {
    |market_tension|^2
}

// Define control flow
flow market_adjustment {
    observe @ Market(supply, demand, price)
    when efficiency > 0.5
    adjust price by -0.1 * gradient(efficiency)
}
`;

// Parse and execute
stl.parse(program);

// Example: Evaluate market state
const marketState = [100, 120, 1.5]; // supply, demand, price
const tension = stl.evaluateField('market_tension', marketState);
console.log('Market tension:', tension);

// Example: Transform to social space
const socialState = stl.applyTransform('market_to_social', marketState);
console.log('Social state:', socialState);

// Example: Calculate market metric
const metric = stl.calculateMetricTensor('Market', marketState);
console.log('Market metric tensor:', metric);

// Example: Run control flow
function simulateMarket() {
    let state = marketState;
    for (let t = 0; t < 10; t++) {
        const efficiency = stl.evaluateField('efficiency', state);
        if (efficiency > 0.5) {
            // Apply control adjustment
            const gradient = stl.evaluateGradient('efficiency', state);
            state[2] -= 0.1 * gradient; // Adjust price
        }
        console.log(`t=${t}, state=`, state);
    }
}

simulateMarket();