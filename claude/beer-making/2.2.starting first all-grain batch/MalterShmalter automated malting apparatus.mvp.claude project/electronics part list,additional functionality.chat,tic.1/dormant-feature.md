# Automated Malting System - Dormant State Feature

## Overview

The Dormant State is a safety feature that allows the malting process to safely pause when grain stirring is required
but no operator is available. This feature uses existing sensors to detect the need for stirring, maintains minimal
environmental conditions during the wait, and ensures process integrity until human intervention occurs.

## Detection System

### Visual Detection (ESP32-CAM)

- Monitors grain bed surface texture
- Detection parameters:
    * Surface uniformity changes
    * Grain clumping patterns
    * Root mat formation
    * Moisture distribution (via color/brightness)
- Image analysis frequency: Every 30 minutes
- Trigger conditions:
    * > 20% surface non-uniformity
    * Visible mat formation
    * Clear moisture gradients

### Metabolic Detection (MH-Z19B CO2 Sensor)

- Monitors CO2 distribution
- Detection parameters:
    * Local CO2 concentration
    * Distribution patterns
    * Rate of change
    * Airflow impedance
- Sampling frequency: Every 5 minutes
- Trigger conditions:
    * > 15% CO2 variation across bed
    * Sustained high spots
    * Airflow reduction >25%

### Spectral Detection (AS7341)

- Monitors biochemical changes
- Detection parameters:
    * Moisture distribution
    * Growth rate variations
    * Modification uniformity
- Sampling frequency: Every 15 minutes
- Trigger conditions:
    * > 10% variation in moisture
    * Uneven growth patterns
    * Modification discrepancies

## Dormant State Operation

### Entry Conditions

1. Any of the following triggers:
    - Visual detection threshold exceeded
    - CO2 distribution threshold exceeded
    - Spectral analysis threshold exceeded
    - Time since last stir >12 hours

2. No operator response within 30 minutes of initial alert

### Environmental Control

1. Temperature Management
    - Maintain base temperature range (15-21°C)
    - Reduce heating/cooling cycles
    - Monitor for extremes

2. Humidity Control
    - Reduce target to 70-85%
    - Minimize humidifier operation
    - Prevent condensation

3. Air Movement
    - Fans at 50% normal speed
    - Maintain minimal air exchange
    - Prevent stagnation

### Monitoring During Dormancy

1. Core Parameters
    - Temperature (every 1 minute)
    - Humidity (every 1 minute)
    - CO2 levels (every 5 minutes)
    - Air quality (every 5 minutes)

2. Grain State
    - Visual checks (every 30 minutes)
    - Spectral analysis (every 15 minutes)
    - Growth indicators (hourly)

3. System Status
    - Equipment operation
    - Sensor health
    - Network connectivity
    - Power status

### Data Management

1. Logging
    - Entry/exit timestamps
    - Environmental conditions
    - Grain state metrics
    - Equipment status
    - Total dormant time

2. Notifications
    - Initial alert
    - Hourly status updates
    - Condition changes
    - System warnings

## Recovery Process

### Operator Requirements

1. Physical Tasks
    - Visual inspection
    - Grain stirring
    - Equipment check
    - Sensor cleaning if needed

2. System Tasks
    - Acknowledge alert
    - Confirm stirring completed
    - Reset dormant timer
    - Verify sensor readings

### System Response

1. Immediate Actions
    - Verify operator input
    - Resume normal fan speed
    - Restore humidity targets
    - Reset monitoring baselines

2. Process Adjustments
    - Update total process time
    - Adjust remaining schedules
    - Recalibrate sensor baselines
    - Reset monitoring thresholds

### Documentation

1. Event Recording
    - Total dormant time
    - Environmental conditions
    - Operator actions
    - System responses

2. Process Impact
    - Timeline adjustments
    - Quality metrics
    - Resource usage
    - Recovery effectiveness

## Safety Features

### Time Limits

- Maximum continuous dormant time: 24 hours
- Maximum cumulative dormant time: 72 hours
- Minimum time between dormant states: 4 hours

### Environmental Limits

- Temperature: Never exceed 22°C
- Humidity: Never below 65%
- CO2: Maximum 5000ppm
- Air flow: Minimum 25% normal

### Emergency Protocols

1. Extended Dormancy
    - Additional alerts after 12 hours
    - Escalating notifications
    - Reduced temperature targets
    - Increased monitoring frequency

2. Condition Violations
    - Emergency notifications
    - Backup systems activation
    - Critical data logging
    - Recovery mode activation

## Integration Points

### Hardware Interface

- Uses existing sensor array
- No additional components needed
- Standard control outputs
- Normal communication protocols

### Software Requirements

1. Control System
    - State machine modification
    - Sensor fusion algorithms
    - Decision logic
    - Safety monitoring

2. Communication
    - HTTP endpoints
    - MQTT topics
    - WebSocket updates
    - Alert mechanisms

3. Data Storage
    - Time series data
    - Event logs
    - State transitions
    - Operator actions

### External Systems

1. Monitoring Interface
    - Real-time status display
    - Historical data access
    - Control functions
    - Alert management

2. Notification Systems
    - Email alerts
    - MQTT messages
    - HTTP webhooks
    - Local indicators