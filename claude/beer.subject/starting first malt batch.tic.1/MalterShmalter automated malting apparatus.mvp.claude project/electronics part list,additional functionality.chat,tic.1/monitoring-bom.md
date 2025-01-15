# Grain State Monitoring - Bill of Materials

## A. Visual Monitoring System

### 1. Camera Module

- ESP32-CAM AI-THINKER: ~$5
    * Resolution: 2MP
    * Night vision capable
    * Built-in WiFi
    * MicroSD slot
    * Flash LED included

### 2. Lighting

- IR LED Strip (2x): ~$2 total
    * 850nm wavelength
    * USB powered
    * 30cm length each
    * Waterproof coating

### 3. Optics

- Wide Angle Lens: ~$3
    * 120° field of view
    * M12 mount
    * For ESP32-CAM

- Acrylic Window: ~$2
    * 4" × 4" clear acrylic
    * 3mm thickness
    * Anti-fog coating

## B. Metabolic Activity Monitoring

### 1. CO2 Sensor

- MH-Z19B Sensor: ~$8
    * Range: 0-5000ppm
    * UART interface
    * Auto-calibration
    * Built-in temperature compensation

### 2. Mounting

- 3D Printed Mount: ~$1
    * PLA material
    * Moisture resistant
    * Includes airflow channels
    * Snap-fit design

## C. Spectral Analysis

### 1. Primary Sensor

- AS7341 Spectral Sensor: ~$6
    * 11-channel spectrometer
    * I2C interface
    * Visible + NIR detection
    * Built-in LED driver

### 2. Light Source

- White LED Module: ~$1
    * Color temp: 6500K
    * Constant current driver
    * 120° beam angle
    * Moisture resistant

### 3. Optics

- Optical Window: ~$2
    * Borosilicate glass
    * Anti-fog coating
    * 25mm diameter
    * IP67 sealed

## D. Integration Components

### 1. Wiring

- Signal Cable Bundle: ~$3
    * 4-core shielded
    * 24AWG
    * 5m total length
    * Silicon jacket

### 2. Connectors

- JST Connector Kit: ~$2
    * 2/3/4 pin sets
    * Waterproof option
    * Including crimping

### 3. Protection

- Sensor Covers: ~$2
    * 3D printed PLA
    * Snap-fit design
    * Ventilated
    * Water resistant

## E. Optional Upgrades

### 1. Enhanced Vision

- Better Camera Module: ~$12
    * 5MP resolution
    * Metal housing
    * Better low-light
    * Adjustable focus

### 2. Additional Sensors

- Extra AS7341 Units: ~$6 each
    * One per level
    * Including mounts
    * Pre-calibrated
    * With cables

### 3. Local Display

- OLED Display: ~$5
    * 128×64 I2C
    * For status display
    * Yellow/blue
    * With housing

### 4. Storage

- MicroSD Card: ~$3
    * 32GB Class 10
    * Industrial grade
    * With adapter
    * Pre-formatted

## Total Costs

### Base System

- Visual System: $12
- CO2 Monitoring: $9
- Spectral Analysis: $9
- Integration Parts: $7
  Total: ~$37

### With Upgrades

- Base System: $37
- Enhanced Camera: +$12
- Extra Spectral: +$18
- Display & Storage: +$8
  Total: ~$75

## Sourcing Notes

1. Primary Sources

- All main components available on TEMU
- Secondary option: AliExpress
- Backup: Amazon (higher cost)

2. Bulk Ordering

- Order 120% of needed parts
- Common spares (connectors, cables)
- Consider humidity exposure
- Long shipping times

3. Quality Checks

- Test each sensor before install
- Check connectors fit
- Verify voltages
- Document failures

4. Alternative Parts

- ESP32-S2 + OV2640 (camera alternative)
- SCD30 (CO2 alternative)
- TCS34725 (basic color sensing)