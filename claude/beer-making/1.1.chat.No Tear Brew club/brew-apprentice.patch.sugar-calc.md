# Priming Sugar Calculator and Weight Monitor Module

## Core Functionality

### Stage Detection System

1. Brewing Stage Awareness:

- Monitors process stage from sensors
- Adjusts calculations per stage
- Context-aware alerts

```javascript
const STAGES = {
  INITIAL: 'measuring_ingredients',
  MASH: 'mashing',
  BOIL: 'boiling',
  COOL: 'cooling',
  FERMENT: 'fermenting',
  PRIME: 'priming',
  BOTTLE: 'bottling'
};
```

### Priming Sugar Calculator

```javascript
class PrimingSugarCalculator {
  constructor() {
    this.beerTemp = 0;
    this.batchVolume = 0;
    this.finalGravity = 0;
    this.desiredCO2 = 0;
    this.stylePreset = null;
  }

  // CO2 solubility based on temp
  getCO2Solubility(tempF) {
    return 3.0378 - 0.050062 * tempF + 0.00026555 * tempF * tempF;
  }

  // Calculate required sugar
  calculateSugar(params) {
    const { 
      temperature,
      volume,
      style,
      gravityReading
    } = params;

    // Residual CO2 from fermentation
    const dissolvedCO2 = this.getCO2Solubility(temperature);
    
    // Target CO2 by style
    const targetCO2 = this.getStyleCO2Target(style);
    
    // Calculate required sugar weight
    const sugarWeight = this.computeSugarWeight(
      volume,
      dissolvedCO2,
      targetCO2
    );

    return {
      sugarGrams: sugarWeight,
      dissolvedCO2,
      targetCO2,
      warnings: this.getWarnings(gravityReading)
    };
  }
}
```

### Weight Monitoring System

```javascript
class WeightMonitor {
  constructor() {
    this.currentStage = STAGES.INITIAL;
    this.expectedWeights = new Map();
    this.tolerances = new Map();
  }

  // Update stage and adjust monitoring
  setStage(newStage) {
    this.currentStage = newStage;
    this.updateTolerances();
  }

  // Get context-aware tolerances
  updateTolerances() {
    switch(this.currentStage) {
      case STAGES.PRIME:
        this.tolerances.set('sugar', 0.1); // ±0.1g
        break;
      case STAGES.FERMENT:
        this.tolerances.set('gravity', 0.001); // ±0.001 SG
        break;
      // other stages...
    }
  }

  // Check measurement against expected
  checkWeight(reading, type) {
    const expected = this.expectedWeights.get(type);
    const tolerance = this.tolerances.get(type);
    
    if (!expected || !tolerance) return true;
    
    const diff = Math.abs(reading - expected);
    return diff <= tolerance;
  }
}
```

### Alert System

```javascript
class BrewingAlerts {
  constructor() {
    this.activeAlerts = new Set();
    this.alertHistory = [];
  }

  // Stage-specific alerts
  addAlert(stage, type, message) {
    const alert = {
      stage,
      type,
      message,
      timestamp: Date.now()
    };
    
    this.activeAlerts.add(alert);
    this.alertHistory.push(alert);
    this.notifyUser(alert);
  }

  // Check for conditions requiring alerts
  checkConditions(weightMonitor, sugarCalc) {
    const stage = weightMonitor.currentStage;
    
    switch(stage) {
      case STAGES.PRIME:
        this.checkPrimingConditions(sugarCalc);
        break;
      case STAGES.FERMENT:
        this.checkFermentationComplete();
        break;
      // other stages...
    }
  }

  checkPrimingConditions(sugarCalc) {
    const result = sugarCalc.getLatestCalculation();
    
    if (result.warnings.length > 0) {
      this.addAlert(
        STAGES.PRIME,
        'warning',
        result.warnings.join(', ')
      );
    }
  }
}
```

## Integration Points

### Data Collection

```javascript
class DataCollector {
  constructor() {
    this.weightMonitor = new WeightMonitor();
    this.sugarCalc = new PrimingSugarCalculator();
    this.alerts = new BrewingAlerts();
  }

  // Process new sensor reading
  processSensorData(reading) {
    const stage = this.weightMonitor.currentStage;
    
    // Update calculations
    if (stage === STAGES.PRIME) {
      this.sugarCalc.updateReading(reading);
    }
    
    // Check weights
    if (!this.weightMonitor.checkWeight(reading.value, reading.type)) {
      this.alerts.addAlert(
        stage,
        'warning',
        `Unexpected ${reading.type} reading: ${reading.value}`
      );
    }
  }
}
```

### Recipe Integration

```javascript
class RecipeManager {
  constructor() {
    this.currentRecipe = null;
    this.dataCollector = new DataCollector();
  }

  // Load recipe and set expectations
  loadRecipe(recipe) {
    this.currentRecipe = recipe;
    
    // Set expected weights
    this.dataCollector.weightMonitor.expectedWeights = 
      this.extractWeights(recipe);
      
    // Set style for priming
    this.dataCollector.sugarCalc.stylePreset = 
      recipe.carbonation.style;
  }

  // Extract expected weights from recipe
  extractWeights(recipe) {
    const weights = new Map();
    
    // Add grain weights
    recipe.grainBill.forEach(grain => {
      weights.set(grain.type, grain.weight);
    });
    
    // Add hop weights
    recipe.hops.forEach(hop => {
      weights.set(`hop_${hop.timing}`, hop.weight);
    });
    
    return weights;
  }
}
```

## User Interface Integration

### Display Components

```javascript
// Sugar calculation display
const PrimingDisplay = () => {
  const [calcResult, setCalcResult] = useState(null);
  
  // Display sugar weight and warnings
  return (
    <div className="p-4 border rounded">
      <h3>Priming Sugar</h3>
      {calcResult && (
        <>
          <div>{calcResult.sugarGrams}g required</div>
          {calcResult.warnings.map(warning => (
            <Alert key={warning} type="warning">
              {warning}
            </Alert>
          ))}
        </>
      )}
    </div>
  );
};

// Weight monitoring display
const WeightMonitor = () => {
  const [readings, setReadings] = useState([]);
  
  return (
    <div className="p-4 border rounded">
      <h3>Weight Monitoring</h3>
      {readings.map(reading => (
        <div key={reading.timestamp}>
          {reading.type}: {reading.value}
          {reading.alert && (
            <Alert type="error">{reading.alert}</Alert>
          )}
        </div>
      ))}
    </div>
  );
};
```

## Configuration

### Default Style Presets

```javascript
const STYLE_PRESETS = {
  'american_ale': {
    co2_volumes: 2.5,
    temp_range: {
      min: 68,
      max: 72
    }
  },
  'english_ale': {
    co2_volumes: 2.0,
    temp_range: {
      min: 65,
      max: 68
    }
  },
  // other styles...
};
```

### Alert Thresholds

```javascript
const ALERT_THRESHOLDS = {
  sugar_variance: 0.1,  // grams
  temp_variance: 2,     // degrees F
  weight_variance: {
    grain: 0.1,         // pounds
    hops: 0.05,         // ounces
    sugar: 0.05         // ounces
  }
};
```

This module provides comprehensive sugar calculations and weight monitoring with context-aware alerts throughout the
brewing process. All calculations and monitoring adapt to the current stage of brewing and specific recipe requirements.
