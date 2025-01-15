# Control System Wiring Scheme

## CAT5 Cable Pin Assignments

### Push Engine Cable

1. Orange/White: Heater Relay Control
2. Orange: Heater Status
3. Green/White: Humidifier Relay Control
4. Blue: Humidifier Status
5. Blue/White: Fan Control
6. Green: Common Ground
7. Brown/White: 5V Power
8. Brown: Not Used (spare)

### Pull Engine Cable

1. Orange/White: Fan Control
2. Orange: Fan Status
3. Green/White: VOC Sensor
4. Blue: DHT22 Data
5. Blue/White: Not Used
6. Green: Common Ground
7. Brown/White: 5V Power
8. Brown: Not Used (spare)

## Relay Module Connections

- Channel 1: Heater (120V AC)
- Channel 2: Humidifier (120V AC)
- Channel 3: Push Fan (12V DC)
- Channel 4: Pull Fan (12V DC)

## Power Supply

- 12V 2A power adapter for fans and Arduino
- Relays control main AC devices directly
- All high voltage connections in push engine box
- Control box runs on safe low voltage only

## Arduino Pins

- D2: Heater Relay
- D3: Humidifier Relay
- D4: Push Fan Relay
- D5: Pull Fan Relay
- D6: DHT22 Data
- A0: MQ135 VOC Sensor
- A4: LCD I2C SDA
- A5: LCD I2C SCL

## Safety Features

- Optical isolation on relay module
- All AC connections in separate compartment
- Fused power inputs
- Status monitoring on all outputs

## Assembly Notes

1. Use RJ45 connectors with strain relief
2. Heat shrink all solder joints
3. Cable length limit: 50ft (15m)
4. Label all connections clearly
5. Use cable ties for strain relief
6. Keep AC and DC wiring separate

## Cost Breakdown

- RJ45 Jacks: $0.50 each
- CAT5 Cable: ~$0.30/ft
- Connectors: $0.25 each
- Power Supply: $5
- Wire/Hardware: $2

Total Wiring Cost: ~$10