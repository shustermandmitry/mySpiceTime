# ECD Sensor Suite Specification

## Common Components (Engine Level)

### Core Control System

1. Main Controller
    - Arduino Nano ($4)
    - Power supply unit ($12)
    - RGB mixer control board ($5)
    - Basic wiring/connectors ($5)
      Total: $26

### Link Sensor Box (Common)

1. Environmental Basics
    - BME280 (temp/humidity/pressure): $8
    - MQ135 (CO2): $3
    - Basic light sensor: $2
      Total: $13

2. System Monitoring
    - Flow sensor ($8)
    - Water level ($3)
    - Door position ($2)
      Total: $13

3. Enclosure & Integration
    - Box and mounts ($5)
    - Connectors ($4)
    - Common bus interface ($3)
      Total: $12

Total Common Components: $64

## Mushroom-Specific Components

### Additional Sensors

1. Substrate Monitoring
    - Secondary temp probe (direct contact): $4
    - Moisture content sensor: $5
    - Weight sensor (optional): $8
      Total: $17

2. Air Quality
    - VOC sensor (contaminant detection): $6
    - Additional air flow sensor: $4
      Total: $10

3. Chamber-Specific
    - UV intensity sensor (maintenance): $5
    - Condensation detector: $3
      Total: $8

### Integration Hardware

1. Chamber Mounts
    - Sensor mounting brackets: $4
    - Cable management: $3
    - Quick-disconnect ports: $5
      Total: $12

Total Mushroom-Specific: $47

## Interface Specifications

### Common Bus System

1. Physical Layer
    - 4-wire interface (power, ground, data, clock)
    - Standard RJ12 connectors
    - Hot-pluggable design
    - Auto-detection capability

2. Protocol
    - I2C primary bus
    - One-wire secondary
    - Simple address scheme
    - Error detection

### Data Integration

1. Common Readings (1/minute)
    - Temperature (±0.5°C)
    - Humidity (±3% RH)
    - CO2 (±100ppm)
    - Air flow status
    - Door position

2. Mushroom-Specific (5/minute)
    - Substrate temperature
    - Moisture content
    - VOC levels
    - Condensation status
    - UV exposure (during maintenance)

## Calibration Requirements

### Common Sensors

1. Periodic (Monthly)
    - Temperature verification
    - Humidity reference check
    - CO2 baseline calibration

2. As-Needed
    - Flow sensor cleaning
    - Water level validation
    - Light sensor cleaning

### Mushroom-Specific

1. Weekly
    - VOC sensor baseline
    - Moisture sensor check
    - Weight calibration

2. Per Cycle
    - UV sensor verification
    - Condensation detector test
    - Substrate probe check

## Error Handling

### Common System

1. Basic Checks
    - Sensor presence
    - Reading validity
    - Communication errors
    - Power status

2. Fault Response
    - Sensor redundancy
    - Failover modes
    - Alert system
    - Safe state defaults

### Mushroom-Specific

1. Critical Monitoring
    - Contamination detection
    - Moisture extremes
    - Temperature deviation
    - Air quality alerts

2. Response Actions
    - Automatic ventilation
    - UV sterilization
    - Alert escalation
    - Process suspension

This split architecture allows for cost-effective scaling while maintaining essential monitoring capabilities. Common
components provide core environmental control, while mushroom-specific additions enable specialized cultivation
monitoring.