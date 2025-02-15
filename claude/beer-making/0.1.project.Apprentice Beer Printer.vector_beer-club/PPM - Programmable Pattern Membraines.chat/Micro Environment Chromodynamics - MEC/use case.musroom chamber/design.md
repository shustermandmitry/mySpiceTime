# PPM Mushroom Chamber: Complete Build Specification

## 1. Chamber Overview

### 1.1 Basic Specifications

```
Dimensions:
- Width: 24" (60cm)
- Depth: 16" (40cm)
- Height: 32" (80cm)

Materials:
- Frame: 1" aluminum extrusion
- Walls: Clear acrylic 1/4"
- Base: HDPE or acrylic
- Membranes: 1/16" clear acrylic
```

### 1.2 Environmental Targets

```
Operating Parameters:
- Temperature: 18-24°C (65-75°F)
- Humidity: 85-95%
- Air Exchange: 4-6 times per hour
- Pressure: Slight positive
```

## 2. Membrane System

### 2.1 Primary Membrane (Temperature/Flow)

```
Specifications:
- Material: 1/16" clear acrylic
- Size: 22" x 14"
- Active Area: 20" x 12"
- Hole Pattern:
  * Primary holes: 2mm diameter
  * Grid spacing: 8mm
  * Gradient density: 40% to 20%
- Nitinol Actuation:
  * Wire length: 24"
  * Mounting points: 2
  * Travel: 0.75"
```

### 2.2 Secondary Membrane (Humidity)

```
Specifications:
- Material: 1/16" clear acrylic
- Size: 22" x 14"
- Active Area: 20" x 12"
- Hole Pattern:
  * Primary holes: 0.8mm diameter
  * Grid spacing: 4mm
  * Uniform density: 30%
- Nitinol Actuation:
  * Wire length: 24"
  * Mounting points: 2
  * Travel: 0.5"
```

## 3. Construction Details

### 3.1 Frame Assembly

```
Components:
- 8x 1" aluminum extrusion (4 verticals, 4 horizontals)
- 8x corner brackets
- 16x T-nuts and bolts
- 4x leveling feet

Assembly:
1. Build basic frame
2. Install membrane guides
3. Mount wall panels
4. Add door frame
```

### 3.2 Membrane Integration

```
Mounting System:
- PTFE guide rails
- Spring tensioners
- Alignment pins
- Edge seals

Installation Order:
1. Install guide rails
2. Mount primary membrane
3. Set spacing (0.5")
4. Mount secondary membrane
5. Install actuators
```

## 4. Control System

### 4.1 Hardware

```
Components:
- Arduino Nano
- 2x MOSFET drivers
- Power supply (12V, 2A)
- 2x temperature sensors
- 1x humidity sensor
- Basic LCD display

Wiring:
- Nitinol: 12V through MOSFET
- Sensors: 3.3V direct
- Display: I2C connection
```

### 4.2 Software Control

```cpp
// Basic control logic
void checkConditions() {
  float temp = readTemperature();
  float humidity = readHumidity();
  
  // Primary membrane control
  if (temp > TARGET_TEMP) {
    activateMembrane(1, OPEN_PATTERN);
  }
  
  // Secondary membrane control
  if (humidity < TARGET_HUMIDITY) {
    activateMembrane(2, CONSERVE_PATTERN);
  }
}
```

## 5. Growing Setup

### 5.1 Internal Configuration

```
Layout:
- 3 shelves (removable)
- 12" spacing between shelves
- LED strip lighting
- Removable drip tray

Capacity:
- 6-8 medium blocks
- Or 12-15 small blocks
```

### 5.2 Operating Procedure

```
Daily Cycle:
1. Morning pattern (increased exchange)
2. Day pattern (maintain conditions)
3. Evening pattern (reduced exchange)
4. Night pattern (minimal operation)
```

## 6. Construction Guide

### 6.1 Tools Required

```
Basic Tools:
- Drill with bits
- Screwdrivers
- Allen wrenches
- Level
- Measuring tape
- Soldering iron

Special Tools:
- Acrylic cutting tools
- Small files
- PTFE tape
```

### 6.2 Assembly Steps

```
Build Sequence:
1. Frame assembly (2 hours)
2. Wall mounting (1 hour)
3. Membrane preparation (2 hours)
4. Control system (1 hour)
5. Testing and calibration (2 hours)
```

## 7. Pattern Templates

### 7.1 Primary Membrane Pattern

[Detailed pattern specification to be added]

### 7.2 Secondary Membrane Pattern

[Detailed pattern specification to be added]

## 8. Operation Guide

### 8.1 Startup Procedure

```
1. Power up system
2. Run membrane test
3. Check sensor readings
4. Load growing blocks
5. Monitor for 24 hours
```

### 8.2 Maintenance

```
Weekly Tasks:
1. Clean membrane surfaces
2. Check humidity levels
3. Verify membrane movement
4. Clean drip tray

Monthly Tasks:
1. Deep clean
2. System check
3. Pattern verification
4. Sensor calibration
```

## 9. Parts List and Budget

### 9.1 Core Components

```
Structure:
- Aluminum extrusion: $40
- Acrylic sheets: $60
- Hardware: $30
- Membranes: $20

Control:
- Arduino + components: $25
- Sensors: $15
- Power supply: $20
- Nitinol wire: $10

Total Base Cost: ~$220
```

### 9.2 Optional Upgrades

```
Possible Additions:
- Better sensors: +$30
- RGB lighting: +$25
- WiFi control: +$15
- Extra shelving: +$20
```

## 10. Performance Metrics

### 10.1 Expected Results

```
Environmental:
- Temp control: ±1°C
- Humidity control: ±5%
- Air exchange: Every 10-15 minutes
- Energy use: ~30W average
```

This design provides a complete, buildable specification for a PPM-based mushroom growing chamber suitable for studio
use. Would you like to explore any particular aspect in more detail?