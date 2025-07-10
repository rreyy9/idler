// Game Configuration Constants
const GameConfig = {
    // Phaser configuration
    GAME: {
        WIDTH: 800,
        HEIGHT: 600,
        BACKGROUND_COLOR: '#2c3e50'
    },
    
    // Tick system configuration
    TICK: {
        INTERVAL: 1250, // 1.25 seconds in milliseconds
        SAVE_INTERVAL: 5, // Save every 5 ticks
        MAX_DISPLAY_ACTIONS: 5
    },
    
    // Save system configuration
    SAVE: {
        KEY: 'phaserGameSave',
        VERSION: '1.0.0'
    },
    
    // Offline processing configuration
    OFFLINE: {
        BATCH_SIZE_DIVISOR: 100, // Process in batches (total_ticks / 100)
        MIN_BATCH_SIZE: 1,
        SUMMARY_DISPLAY_TIME: 3000 // 3 seconds
    },
    
    // Random event probabilities
    EVENTS: {
        RARE_THRESHOLD: 0.1,    // < 10%
        UNCOMMON_THRESHOLD: 0.3, // < 30%
        COMMON_THRESHOLD: 0.6    // < 60%
    },
    
    // UI Colors
    COLORS: {
        DEFAULT: '#00ff00',
        RARE: '#ff00ff',
        UNCOMMON: '#ffff00',
        COMMON: '#00ffff',
        TIMER: {
            NORMAL: '#ff9900',
            WARNING: '#ffff00',
            CRITICAL: '#ff0000'
        }
    },
    
    // UI Styles
    STYLES: {
        TICK_DISPLAY: {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        },
        RANDOM_DISPLAY: {
            fontSize: '18px',
            fill: '#00ff00',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        },
        ACTIONS_DISPLAY: {
            fontSize: '16px',
            fill: '#ffff00',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        },
        TIMER_DISPLAY: {
            fontSize: '14px',
            fill: '#ff9900',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        },
        PROGRESS_TEXT: {
            fontSize: '16px',
            fill: '#ffffff'
        },
        SUMMARY_TEXT: {
            fontSize: '18px',
            fill: '#ffff00',
            backgroundColor: '#000000',
            padding: { x: 15, y: 10 },
            align: 'center'
        }
    }
};