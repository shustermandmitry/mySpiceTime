# Brew Apprentice Specification Update

## Core Features (All Models)

1. Data Logging & Connectivity

- Complete brew session recording
- Temperature tracking
- Recipe storage and sharing
- Club integration
- Phone app with full features
- Cloud backup
- Community recipe access
- Troubleshooting data

2. Basic Hardware

- Temperature monitoring
- Basic hop dispensing
- Arduino control
- Wired sensors
- Standard mounting

## Premium "Wireless Pro" Upgrade

1. Advanced Sensor Package

## Wireless Sensor System & Direct Phone Connectivity

### New Sensor Components

1. Weight Measurement System

- Sugar Dispenser Load Cell:
    * HX711 amplifier ($2)
    * Small load cell ($3-4)
    * Integrated in dispenser assembly
    * Auto-calibration capability
    * Precision: ±0.1g

- Bucket Weight Platform:
    * 4x 50kg load cells ($10 total)
    * HX711 board integrated
    * Platform assembly design
    * Accuracy: ±50g
    * Battery powered

2. Fermentation Monitoring

- PPM/TDS Sensor:
    * Non-contact through bucket wall
    * Fermentation progress tracking
    * Contamination detection
    * Cost: $2-3

- CO2 Sensor in Airlock:
    * MH-Z19 or MQ135 ($3-15)
    * Direct fermentation monitoring
    * Completion detection
    * Battery powered

### Wireless Architecture

1. Primary Communication Path

- Sensors → Arduino → Phone
- Real-time data aggregation
- System coordination
- Recipe execution

2. Direct Sensor-to-Phone Backup

- BLE connectivity
- ESP32 in each sensor ($5)
- Direct readings capability
- Manual control options

3. Communication Protocol

- BLE for all wireless
- Local data buffering
- Error detection
- Battery status reporting

### Hardware Requirements

1. Each Sensor Module

- ESP32 with BLE
- Battery power system
- Local storage
- Status LED
- Reset button

2. Power Management

- Sleep modes
- Battery monitoring
- Low power alerts
- Expected 2-3 week battery life

3. Enclosure Requirements

- Waterproof (IP65)
- Battery accessible
- Clean-friendly surface
- LED visible

### Software Integration

1. Arduino System

- Sensor data aggregation
- Primary control logic
- Recipe execution
- Error handling

2. Phone App Extensions

- Direct sensor discovery
- Manual control interface
- Diagnostic tools
- Sensor configuration

3. Operational Modes

- Normal (Arduino primary)
- Direct (Phone primary)
- Mixed (Both active)
- Emergency (Manual)

### Data Management

1. Local Storage

- Sensor readings buffer
- Critical event log
- Battery status history
- Error conditions

2. Synchronization

- Arduino → Phone sync
- Direct sensor data
- Configuration updates
- Recipe modifications

### Error Handling

1. Communication Failures

- Auto-switch to backup mode
- User notification
- Data buffering
- Recovery procedure

2. Sensor Failures

- Isolation of failed unit
- Continued operation
- Diagnostic data
- Replacement procedure

### Cost Impact

1. Additional Components (per unit):

- Load cells and amplifiers: $15-20
- ESP32 modules: $25-30
- Other sensors: $5-20
- Batteries and management: $10
- Enclosures: $10-15

Total additional cost: $65-95 per unit

2. Optional Components:

- Premium sensors: +$30-50
- Extended battery life: +$15
- Enhanced enclosures: +$20

### Implementation Phases

1. Phase 1: Basic Wireless

- Weight sensors
- Battery power
- Arduino control
- Basic app interface

2. Phase 2: Direct Connect

- BLE implementation
- Sensor independence
- Manual controls
- Diagnostic tools

3. Phase 3: Advanced Features

- Sensor mesh network
- Data analytics
- Predictive maintenance
- Remote monitoring

### Manufacturing Impact

1. Assembly Changes

- Wireless module integration
- Battery compartments
- Sensor calibration
- Testing procedures

2. Quality Control

- Wireless connectivity testing
- Battery life verification
- Sensor accuracy checks
- Environmental testing

### Documentation Updates

1. User Manual Additions

- Battery replacement
- Direct connection setup
- Manual control instructions
- Troubleshooting guide

2. Technical Documentation

- Wireless protocols
- Sensor specifications
- Calibration procedures
- Maintenance schedules

This update significantly enhances the system's reliability and useability while maintaining reasonable cost structure.
The wireless capabilities and direct phone connection provide important redundancy and control options.
