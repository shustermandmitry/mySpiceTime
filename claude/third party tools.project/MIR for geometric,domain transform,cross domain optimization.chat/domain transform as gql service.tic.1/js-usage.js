// Normal JavaScript code that uses the Wasm module
class EthicalSpace {
    constructor(dimensions) {
        this.dimensions = dimensions;
        // Create typed arrays for Wasm
        this.metricBuffer = new Float64Array(dimensions * dimensions);
    }

    calculateMetric(point) {
        // Point is a normal JS array, convert to typed array for Wasm
        const pointBuffer = new Float64Array(point);
        // Call Wasm function
        const resultPtr = Module._calculate_metric(pointBuffer.buffer, this.dimensions);
        // Convert result back to JS
        return new Float64Array(resultPtr);
    }

    fieldGradient(point) {
        const pointBuffer = new Float64Array(point);
        return Module._calculate_field_gradient(pointBuffer.buffer, this.dimensions);
    }
}

// Use it like normal JS
const space = new EthicalSpace(['openness', 'accountability', 'respect']);
const point = [0.5, 0.7, 0.3];
const metric = space.calculateMetric(point);
const gradient = space.fieldGradient(point);

// Can also use with modern JS features
async function optimizePosition(startPoint) {
    const trajectory = [];
    let currentPoint = startPoint;

    while (!isOptimal(currentPoint)) {
        const grad = space.fieldGradient(currentPoint);
        currentPoint = currentPoint.map((x, i) => x - 0.1 * grad[i]);
        trajectory.push(currentPoint);
    }

    return trajectory;
}