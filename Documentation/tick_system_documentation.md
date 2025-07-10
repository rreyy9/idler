# Tick System Development Documentation

## Overview

We developed a basic tick-based system for a Phaser 3 game that operates on 1.25-second intervals. The system generates randomness for game actions and provides visual feedback in the browser.

## Project Structure

```
my-phaser-game/
├── index.html              # Main HTML file with Phaser setup
├── game.js                 # Game logic with tick system
├── package.json            # NPM dependencies and scripts
├── package-lock.json       # Dependency lock file
├── .gitignore             # Git ignore rules
└── node_modules/          # Dependencies (Phaser, live-server)
```

## Dependencies

- **Phaser 3.90.0**: Game framework
- **live-server 1.2.2**: Development server with auto-reload

## Tick System Architecture

### Core Class: `TickSystem`

The tick system is implemented as a single class that handles timing, randomness generation, and visual display.

#### Key Properties

```javascript
{
    tickCount: 0,           // Current tick number
    tickInterval: 1250,     // 1.25 seconds in milliseconds
    isRunning: false,       // System state
    lastTickTime: 0,        // Timestamp of last tick
    randomActions: [],      // Recent action history
    maxDisplayActions: 5    // Max actions to display
}
```

#### Visual Components

- **Tick Display**: Shows current tick count
- **Random Display**: Shows current random value with color coding
- **Actions Display**: Shows recent random events
- **Timer Display**: Countdown to next tick

### Timing System

- **Interval**: 1.25 seconds (1250ms) per tick
- **Implementation**: Uses Phaser's `time.addEvent()` for precise timing
- **Recursive Scheduling**: Each tick schedules the next one
- **Real-time Updates**: Timer display updates 20 times per second

### Random Action System

#### Event Types & Probabilities

| Event Type | Probability | Color | Description |
|------------|-------------|-------|-------------|
| Rare | < 10% | Magenta | 🎲 Rare event occurred! |
| Uncommon | < 30% | Yellow | ⭐ Uncommon event! |
| Common | < 60% | Cyan | ✨ Common event |
| 5th Tick Special | Every 5 ticks | Default | 🔔 Every 5th tick special! |
| 10th Tick Milestone | Every 10 ticks | Default | 🎉 10th tick milestone! |

#### Action Processing Flow

```
Generate Random Value (0-1)
    ↓
Check Probability Thresholds
    ↓
Generate Appropriate Actions
    ↓
Add to Action History
    ↓
Update Visual Display
```

## Visual Feedback System

### Color Coding

- **Green**: Default random values
- **Magenta**: Rare events (< 10%)
- **Yellow**: Uncommon events (< 30%)
- **Cyan**: Common events (< 60%)

### Timer Display Colors

- **Orange**: > 0.6 seconds remaining
- **Yellow**: 0.3-0.6 seconds remaining
- **Red**: < 0.3 seconds remaining

## Implementation Details

### Starting the System

```javascript
// Initialize in Phaser create function
tickSystem = new TickSystem(this);
```

### Key Methods

#### `processTick()`
- Increments tick counter
- Generates random value
- Processes random actions
- Updates visual display
- Schedules next tick

#### `processRandomActions(randomValue)`
- Evaluates probability thresholds
- Generates appropriate events
- Manages action history

#### `updateVisualDisplay(randomValue)`
- Updates all visual elements
- Applies color coding
- Formats display text

#### `updateTimerDisplay()`
- Calculates time remaining
- Updates countdown display
- Changes colors based on time

## Usage Example

```javascript
function create() {
    // Initialize the tick system
    tickSystem = new TickSystem(this);
    
    // System automatically starts and handles everything
}
```

## Console Output

The system logs each tick to the console:

```
Tick 1: Random value 0.7234
Tick 2: Random value 0.1847
Tick 3: Random value 0.0923
```

## Future Expansion Possibilities

### Infrastructure Extensions

1. **Entity Integration**
   - Register game entities to receive tick updates
   - Priority-based execution order
   - Entity-specific tick intervals

2. **Action Scheduling**
   - Schedule actions for future ticks
   - Delayed event system
   - Conditional triggers

3. **State Management**
   - Game state persistence across ticks
   - Save/load functionality
   - State rollback capabilities

### Game Mechanics

1. **Resource Generation**
   - Currency/points per tick
   - Resource decay over time
   - Random bonus multipliers

2. **Event System**
   - Story events triggered by ticks
   - Random encounters
   - Seasonal/timed content

3. **Player Progression**
   - Experience gain over time
   - Skill improvements
   - Achievement tracking

## Technical Considerations

### Performance
- Lightweight implementation using Phaser's built-in timing
- Minimal memory footprint
- Efficient random number generation

### Reliability
- Error isolation (failed actions don't break the system)
- Graceful handling of timing variations
- Pausable/resumable system

### Extensibility
- Modular design for easy feature addition
- Event-driven architecture potential
- Configurable timing and probabilities

## Running the Project

1. **Install dependencies**: `npm install`
2. **Start development server**: `npm start`
3. **Open browser**: Navigate to `http://localhost:8080`
4. **Observe tick system**: Watch the top-left corner for real-time updates

## Current Limitations

- Single random generator (could be expanded to multiple types)
- Simple probability system (could support more complex distributions)
- Basic visual feedback (could include animations, sounds)
- No persistence (ticks reset on page reload)
- No configuration UI (all settings hardcoded)

## Conclusion

This basic tick system provides a solid foundation for time-based game mechanics. The 1.25-second interval creates an engaging rhythm that's not perfectly predictable, while the visual feedback system makes the underlying mechanics transparent and debuggable.

The modular design allows for easy expansion into more complex game systems while maintaining the core timing and randomness functionality.