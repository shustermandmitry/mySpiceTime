# Shmalter Functional Design Specification

## 1. Air Flow Management

### Purpose

- Maintain even airflow through grain beds
- Support proper grain germination
- Prevent moisture buildup
- Enable temperature control

### Implementation

- Two 120mm PC fans ($5 each)
- Push-pull configuration
- Side channel design in foam walls
- Progressive hole sizing for even distribution
- Can upgrade fans if needed for larger stacks

### Components

- 2× 120mm PC fans: $10 total
- Basic wiring for fans: $1
- Optional fan speed control via PWM

## 2. Air Filtration

### Purpose

- Remove dust and particles
- Filter VOCs and odors
- Maintain clean environment
- Easy maintenance access

### Implementation

- Slide-in filter frames in both engines
- Cut-to-fit filter pads
- Side panel access for changes
- Mesh screen sandwich design

### Components

Push Engine:

- Dust pre-filter pad: $2
- HEPA-grade filter pad: $3
- Mesh screen holders

Pull Engine:

- Dust pre-filter pad: $2
- Activated carbon pad: $3
- Mesh screen holders

## 3. Environmental Control

### Purpose

- Maintain optimal temperature (15-21°C)
- Control humidity (85-95%)
- Monitor conditions
- Prevent mold growth

### Implementation

- User-supplied space heater controlled via relay
- User-supplied humidifier controlled via relay
- Sensor-based feedback control
- Real-time monitoring

### Components

- DHT22 temp/humidity sensor: $2
- MQ-135 VOC sensor: $2
- Optional user-supplied:
    * Space heater (~$15-30)
    * Ultrasonic humidifier (~$10-25)

## 4. Control System

### Purpose

- Monitor all conditions
- Control all actuators
- User interface
- Safety monitoring

### Implementation

- Central control box
- Arduino-based system
- LCD interface
- Remote sensors
- Relay control

### Components

- Arduino Nano: $3
- 4ch Relay Module: $2
- LCD 16x2 with I2C: $3
- Project box: $2
- Power supply 12V 2A: $5
- Basic wiring/connectors: $2

## 5. Connectivity

### Purpose

- Connect engines to control
- Reliable signal transmission
- Easy maintenance
- Simple assembly

### Implementation

- CAT5 cable system
- RJ45 connectors
- Standardized pinout
- Quick disconnect

### Components

- RJ45 jacks (4×): $2
- CAT5 cable (25ft): $3
- RJ45 connectors (4×): $1
- Heat shrink/misc: $1

## 6. Grain Management

### Purpose

- Hold grain at proper depth
- Allow air penetration
- Easy cleaning
- Simple construction

### Implementation

- Simple framed trays
- Window screen mesh bottom
- Two trays per module
- Easy lift-out design

### Components

User sources locally:

- Basic lumber for frames
- Window screen mesh
- Staples/fasteners

## 7. Module Structure

### Purpose

- Insulate environment
- Channel airflow
- Easy assembly
- Cost effective
- Cleanable surfaces

### Implementation

- Rigid foam construction
- Birch veneer exterior
- Velcro panel attachment
- Stackable design

### Components

User sources locally:

- Rigid foam insulation
- Birch plywood
- Velcro strips
- Basic fasteners

## Total Electronics Cost

Core system (required):

- All sensors and control: $23
- Fans and filters: $20
- Connectivity: $7
  Total: ~$50

Optional components sourced by user:

- Heater: $15-30
- Humidifier: $10-25
- Construction materials (locally sourced)

## Assembly Notes

1. Control box can be assembled independently
2. Engines assembled as standalone units
3. Modules built to user's space requirements
4. All high-voltage components isolated
5. Filter access planned for easy maintenance

## Maintenance Schedule

1. Weekly:
    - Check filter condition
    - Clean sensors if needed

2. Monthly:
    - Replace filter pads if needed
    - Check all connections
    - Clean fan blades

3. Annual:
    - Deep clean all components
    - Check/replace sensors if needed
    - Verify calibration