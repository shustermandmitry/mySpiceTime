# Shmalter Detailed Design Specifications

## Common Systems (Both Versions)

### 1. Shmalt Engines

Both versions use identical engine modules:

Push Engine:

- Size: 36"W × 24"D × 8"H
- Construction: Foam frame with birch panels
- Components:
    * 120mm PC fan: $5
    * Filter frame holder: window screen mesh
    * Dust pre-filter pad: $2
    * HEPA filter pad: $3
    * Space for user's heater
    * Space for user's humidifier
- Access: Side panel on Velcro

Pull Engine:

- Same dimensions
- Components:
    * 120mm PC fan: $5
    * Filter frame holder
    * Dust pre-filter pad: $2
    * Carbon filter pad: $3
    * Sensor mounts

### 2. Control System

Single control box for either version:

- Arduino Nano: $3
- 4ch Relay Module: $2
- LCD 16x2 with I2C: $3
- DHT22 sensor: $2
- MQ-135 sensor: $2
- Project box: $2
- Power supply: $5
- Connectors/wiring: $5
  Total Control: ~$24

## Skinny Shmalter Design

### Structure Per Module

1. Dimensions:

- Width: 36" (34" internal)
- Depth: 24" (22" internal)
- Height: 8" total
- Air channels: 2" on each long side

2. Air Management:

- Holes in foam sides
- Progressive sizing: 4mm to 4.6mm
- Channel created by foam spacers
- Birch panel seals outside

3. Grain Bed Configuration:

- Two trays per module
- Each tray: 16" × 22"
- Grain depth: 2"
- Capacity: ~6.5lbs per tray

4. Module Connections:

- Foam-to-foam interface
- Velcro strip sealing
- Optional flex duct ports
- Self-aligning corners

### Module Stack

1. Typical Configuration:

- 2-4 modules high
- Engines on top/side
- Total height: 24"-40"
- Capacity: 26-52lbs

2. Access:

- Lift-off module sections
- Front-access trays
- Side panels removable
- Top engine access

## Fat Shmalter Design

### Main Structure

1. Dimensions:

- Width: 36"
- Depth: 24"
- Height: 48"
- Standard metro rack size

2. Air Management:

- Same side channel concept
- Continuous air paths
- Foam creates sealed space
- Shared plenum design

3. Grain Bed Configuration:

- Eight trays total
- Same tray size as Skinny
- Two trays per level
- Four levels total

4. Construction:

- Metro rack core
- Foam panel enclosure
- Birch exterior
- Velcro panel attachment

### Integration

1. Engine Mounting:

- Top or side mounting
- Shared air channels
- Easy maintenance access
- Quick-connect options

2. Access:

- Front panel removal
- Slide-out trays
- Top engine access
- Filter access panels

## Construction Details

### Skinny Version

1. Frame:

- Foam cutouts for channels
- Corner alignment guides
- Spacer strips for air gap
- Birch facing over foam

2. Tray Design:

- Simple frame (user builds)
- Window screen bottom
- Full width handles
- Easy lift design

### Fat Version

1. Frame:

- Metro rack base
- Foam panel inserts
- Vertical air channels
- Full height panels

2. Tray Design:

- Identical to Skinny
- Rests on rack shelves
- Front access
- Multiple per level

## Air Management

### Skinny Version

1. Vertical Flow:

- Module-to-module sealing
- Progressive hole sizing
- Even distribution
- Adjustable paths

2. Monitoring:

- Per stack sensors
- Individual level control
- Stack effect usage
- Pressure balancing

### Fat Version

1. Vertical Flow:

- Continuous channels
- Full height distribution
- Common plenum
- Even pressure

2. Monitoring:

- Multi-level sensing
- Zone control
- Complete circulation
- Balance dampers

## Common Features

1. Filter Access:

- Side panel removal
- Slide-out frames
- Easy pad replacement
- Quick maintenance

2. Control Interface:

- Standard connections
- Modular wiring
- Central monitoring
- Common protocols

3. Environmental:

- Same temp range
- Same humidity control
- Unified monitoring
- Identical safety

## Cost Optimization

1. Electronics:

- Single control system
- Shared components
- Standard parts
- Budget sensors

2. Construction:

- User-sourced materials
- Simple tools
- Basic assembly
- Local supplies

## Optional Upgrades

1. Fan Options:

- Higher CFM fans
- Speed control
- Better filtration
- Monitoring

2. Control Options:

- WiFi monitoring
- Data logging
- Remote alerts
- Automation

Total Electronics Package (either version):
Core system: ~$50
User-supplied appliances: $25-55
Optional upgrades: Based on needs