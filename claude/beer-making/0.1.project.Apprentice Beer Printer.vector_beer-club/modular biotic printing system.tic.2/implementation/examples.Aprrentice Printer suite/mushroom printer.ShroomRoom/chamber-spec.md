# Mushroom Growing Chamber - ECD Implementation

## Core Environmental Requirements

### Stage 1: Colonization

1. Environmental Profile
    - Temperature: 21-24°C (70-75°F)
    - Humidity: 65-75% RH
    - CO2: Standard atmospheric
    - Light: None required

2. RGB Mix Requirements
    - RED: Low (20-30% capacity) for gentle heating
    - GREEN: Moderate (40-50%) for baseline humidity
    - BLUE: On-demand for temperature control
    - Target Mix Ratio: 2R:4G:1B

### Stage 2: Fruiting

1. Environmental Profile
    - Temperature: 18-21°C (65-70°F)
    - Humidity: 85-95% RH
    - CO2: <1000ppm
    - Light: Indirect 12/12 cycle

2. RGB Mix Requirements
    - RED: Minimal (10-20%)
    - GREEN: High (80-90%)
    - BLUE: Moderate (30-40%)
    - Target Mix Ratio: 1R:8G:3B

## Hardware Specifications

### Chamber Construction

1. Basic Structure
    - Size: 24" x 24" x 36" (WxDxH)
    - Material: Food-grade HDPE or polypropylene
    - Insulation: 2" closed-cell foam
    - Access: Front-loading door with magnetic seal

2. Air Management
    - Primary inlet: Bottom rear
    - Exhaust: Top front
    - HEPA filtration on inlet
    - Activated carbon on exhaust
    - Internal circulation fan

### RGB Mixing System

1. Heat (RED)
    - 100W heating element
    - PWM controlled
    - Safety thermal cutoff
    - Distributed air heating

2. Humidity (GREEN)
    - Ultrasonic mister
    - 3L reservoir
    - Auto water level control
    - Mist distribution system

3. Cooling (BLUE)
    - 120W Peltier assembly
    - Heat sink and fan
    - Condensate management
    - Temperature monitoring

## Sensor Package

1. Core Measurements
    - Temperature: BME280 (±0.5°C)
    - Humidity: BME280 (±3% RH)
    - CO2: MH-Z19B
    - Air pressure: BME280

2. Additional Monitoring
    - Light level sensor
    - Air flow sensor
    - Water level
    - Door position

## Control System

### Software Implementation

1. Stage Management
   ```javascript
   const STAGES = {
     COLONIZATION: {
       temp: { min: 21, max: 24 },
       humidity: { min: 65, max: 75 },
       light: false,
       co2_limit: 2000
     },
     FRUITING: {
       temp: { min: 18, max: 21 },
       humidity: { min: 85, max: 95 },
       light: true,
       co2_limit: 1000
     }
   };
   ```

2. RGB Control Logic
   ```javascript
   class MushroomChamberController {
     constructor() {
       this.currentStage = 'COLONIZATION';
       this.rgbMixer = new RGBMixer();
       this.sensors = new SensorArray();
     }
     
     adjustEnvironment() {
       const target = STAGES[this.currentStage];
       const current = this.sensors.getCurrentReadings();
       
       // Calculate RGB mix based on current vs target
       const mix = this.calculateRGBMix(current, target);
       this.rgbMixer.setMix(mix.red, mix.green, mix.blue);
     }
   }
   ```

## Operating Modes

### 1. Colonization Mode

- Steady temperature priority
- Moderate humidity
- Minimal air exchange
- No light requirement

### 2. Fruiting Mode

- High humidity priority
- Increased air exchange
- Light cycle management
- CO2 monitoring and control

### 3. Maintenance Mode

- UV sterilization cycle
- Full air exchange
- Condensate removal
- Sensor verification

## Integration Points

1. Physical Integration
    - Standard RGB mixer connections
    - Universal sensor interface
    - Common power supply
    - Network connectivity

2. Software Integration
    - ECD system compatible
    - Standard data format
    - Remote monitoring
    - Alert system

## Safety Features

1. Environmental Safety
    - Temperature limits
    - Humidity limits
    - Air quality monitoring
    - Contamination detection

2. Equipment Safety
    - Water level monitoring
    - Power monitoring
    - Component temperature
    - Fault detection

## Maintenance Requirements

1. Regular Tasks
    - HEPA filter check (monthly)
    - Carbon filter replacement (3 months)
    - Sensor calibration (6 months)
    - Water system cleaning (monthly)

2. Periodic Inspection
    - Seal integrity
    - Fan operation
    - Condensate system
    - Electrical connections

This specification integrates fully with the existing ECD framework while providing specialized features for mycological
applications. All components use standard interfaces for compatibility with other ECD modules.
