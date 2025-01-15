# Fat Shmalter Automation Addendum

## Control System Integration

### Control Box Mounting

- Location: Right side panel, upper third
- Dimensions: 200mm × 150mm × 75mm
- Mounting: Velcro strips for easy removal
- Access: External door cut in foam/birch panel
- Power entry: Bottom of box, strain relief grommet

### Sensor Network Infrastructure

#### RJ45 Junction Points

1. Primary Hub (Control Box)

- 4× RJ45 jacks mounted on bottom edge
- Standardized pinout:
    * 1-2: Power (12V)
    * 3-4: One-wire bus
    * 5-6: I2C
    * 7-8: Ground

2. Secondary Hubs

- One per grain level (4 total)
- 2× RJ45 jacks each
- Daisy-chain configuration
- Mounted in right air channel

### Sensor Placement

#### Temperature/Humidity (DHT22)

1. Primary Sensor

- Location: Push engine inlet
- Mounting: 3D printed bracket
- Purpose: Primary environmental control

2. Secondary Sensor

- Location: Pull engine outlet
- Mounting: 3D printed bracket
- Purpose: Verification and delta-T monitoring

#### Grain Bed Sensors (DS18B20)

- One probe per level (4 total)
- Probe length: 100mm
- Entry point: Right air channel
- Penetration: 50mm into grain bed
- Mounting: Compression gland fitting
- Wire routing: Through air channel to RJ45 hub

#### Moisture Sensors

- One per level (4 total)
- Type: Capacitive moisture sensor
- Location: Center of each grain bed
- Wire routing: Through small grommets in tray bottom
- Connection: To level's RJ45 hub

#### Air Quality (MQ-135)

- Location: Pull engine inlet
- Mounting: 3D printed bracket
- Purpose: VOC/contamination monitoring

### Fan Control Integration

#### Push Fan

- Original location maintained
- Added: PWM control wire
- Added: Tachometer feedback
- Connector: 4-pin PC fan standard

#### Pull Fan

- Original location maintained
- Added: PWM control wire
- Added: Tachometer feedback
- Connector: 4-pin PC fan standard

### Heater Integration

- Location: Original push engine position
- Added: Relay control for AC power
- Added: Thermal cutoff switch
- Safety: Isolated high-voltage wiring

### Humidifier Integration

- Location: Original push engine position
- Added: Relay control for AC power
- Added: Water level sensor input
- Safety: Drip loop on power cord

## Construction Modifications

### Air Channel Modifications

1. Sensor Ports

- 20mm diameter holes for sensor mounting
- Reinforced with 3D printed mounts
- Sealed with foam gaskets
- Locations marked on plans

2. Wire Routing

- 10mm cable channels cut in foam
- Covered by birch panel
- Main trunk: Right side vertical
- Branches: Horizontal to each level

### Tray Modifications

1. Moisture Sensor Integration

- 8mm hole in center of each tray
- Grommet for wire protection
- Strain relief for sensor wire
- Maintain screen integrity

2. Temperature Probe Access

- 8mm holes in right side
- Compression fitting mount
- Angled entry for proper placement
- Sealed against air leakage

## Assembly Notes

### Wiring Harness

1. Main Trunk

- 25-pin D-sub connector at control box
- Split to RJ45 distribution
- Power/signal separation
- Strain relief at all endpoints

2. Level Connections

- Standard Cat5e patch cables
- Custom length per level
- Strain relief loops
- Labeled both ends

### Sensor Installation

1. Order of Assembly

- Install RJ45 hubs first
- Route main wiring trunk
- Mount control box
- Install sensors level by level
- Connect and test each level

2. Calibration Points

- Mark sensor insertion depth
- Note probe orientation
- Document sensor positions
- Label all connections

## Maintenance Access

### Control Systems

- Hinged access panel
- Quick-disconnect connectors
- Labeled test points
- Spare fuse storage

### Sensor Maintenance

- Access ports labeled
- Cleaning procedure notes
- Calibration reference points
- Replacement procedure guide

## Safety Features

### Electrical

- All 120V isolated
- GFCI protection
- Fused outputs
- Emergency stop button

### Environmental

- High temp cutoff
- Water leak detection
- Air quality alerts
- Fan failure detection

## Testing Protocol

### Sensor Verification

1. Temperature

- Ice point calibration
- Boiling point check
- Cross-reference readings
- Response time test

2. Humidity

- Dry test (silica gel)
- Wet test (saturated air)
- Transit time measurement
- Stability check

3. Moisture

- Dry grain calibration
- Wet grain calibration
- Response curve check
- Interference test

### System Integration

- Power-on self test
- Network connectivity check
- Sensor polling verification
- Actuator response test