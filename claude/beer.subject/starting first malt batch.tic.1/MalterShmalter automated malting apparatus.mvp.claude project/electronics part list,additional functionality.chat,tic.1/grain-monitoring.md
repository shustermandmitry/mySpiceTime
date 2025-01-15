# Grain State Monitoring System

## Visual Monitoring Module

### Hardware

- ESP32-CAM module
- 2× IR LED strips (night vision)
- Wide angle lens (120°)
- Clear acrylic window mount

### Mounting

- Location: Top engine, center
- Height: 24" above top grain bed
- Viewing angle: 45° from vertical
- IR illumination: Both sides

### Image Analysis

- Capture interval: 30 minutes
- Metrics tracked:
    * Root emergence (white pixel detection)
    * Acrospire length (growth tracking)
    * Color uniformity (modification)
    * Surface moisture (gloss detection)
- Storage: Rolling 7-day images
- Analysis: Local edge processing

## Metabolic Activity Monitoring

### CO2 Sensor

- Model: MH-Z19B
- Range: 0-5000ppm
- Location: Pull engine inlet
- Mounting: Isolated from moisture
- Calibration: Auto-zero daily

### Data Analysis

- Baseline: Initial 24hr average
- Activity indicators:
    * Rising CO2 = Active germination
    * Plateau = Complete modification
    * Sharp drop = Ready for kilning
- Sampling: Every 5 minutes
- Rolling average: 1 hour window

## Spectral Analysis

### Hardware

- AS7341 spectral sensor
- LED illumination source
- Filtered optical window
- Temperature compensated

### Mounting

- One per grain level
- Distance: 6" above grain
- Coverage: 12" diameter spot
- Protected from moisture

### Measurements

- Chlorophyll fluorescence
- Visible spectrum changes
- NIR reflection
- Sample rate: 15 minutes

## Integration

### Data Collection

- Unified timestamping
- Local preprocessing
- JSON format output
- Event-based triggers

### State Detection

1. Need Turning When:

- Visual: Uneven surface detected
- CO2: Local concentration peaks
- Time window: 8-12 hours elapsed

2. Ready for Kilning When:

- Visual: 75%+ acrospire length
- CO2: Activity plateau reached
- Spectral: Chlorophyll peak detected
- Time: 4-5 days germination

3. Kilning Complete When:

- Visual: Color change complete
- Spectral: Moisture content <5%
- Temperature: Target achieved
- Time: Full heat schedule complete

## Cost Breakdown

### Required Components

- ESP32-CAM: $5
- IR LEDs: $2
- MH-Z19B CO2: $8
- AS7341 Sensor: $6
- Mounting materials: $4
  Total: ~$25

### Optional Enhancements

- Additional spectral sensors: $6 each
- Better camera module: $10-15
- Local display: $5
- SD card storage: $3

## Implementation Notes

### Assembly

1. Camera module:
    - Protect lens from moisture
    - Ensure stable mount
    - Align IR illumination
    - Test viewing angle

2. CO2 sensor:
    - Mount away from direct moisture
    - Ensure good airflow
    - Protect wiring connections
    - Allow for calibration access

3. Spectral sensor:
    - Clean optical path
    - Stable LED reference
    - Protection from dust
    - Easy access for cleaning

### Calibration

1. Visual System:
    - White balance setting
    - Distance calibration
    - IR light balance
    - Color reference card

2. CO2 Sensor:
    - Fresh air zero
    - Known source span
    - Temperature compensation
    - Humidity correction

3. Spectral Analysis:
    - White reference
    - Dark current
    - LED intensity
    - Temperature offset

### Maintenance

Weekly:

- Clean optical windows
- Check sensor readings
- Verify calibration
- Update baseline values

Monthly:

- Deep clean all sensors
- Recalibrate if needed
- Check all connections
- Update software if available