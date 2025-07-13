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
    
    // Mining system configuration
    MINING: {
        MILESTONE_INTERVAL: 10, // Every 10th tick gets milestone bonus
        EFFECT_DURATION: 300,   // Mining effect glow duration in ms
        MESSAGE_FADE_DURATION: 2000, // Mining message fade time
        
        // Stone visual colors
        STONE_COLORS: {
            BASE: 0x808080,      // Gray
            SHADOW: 0x707070,    // Darker gray
            HIGHLIGHT: 0x909090, // Lighter gray
            DARK: 0x606060,      // Dark gray
            SPOT: 0x404040       // Very dark gray
        },
        
        // Stone glow colors
        GLOW_COLORS: {
            ACTIVE: 0x00ffff,    // Cyan when mining
            INACTIVE: 0x666666   // Dim gray when not mining
        },
        
        // Mining effect colors by rarity
        EFFECT_COLORS: {
            RARE: 0xff00ff,      // Magenta
            UNCOMMON: 0xffff00,  // Yellow
            COMMON: 0x00ffff,    // Cyan
            NORMAL: 0x00ff00     // Green
        },
        
        // Resource rewards per tick
        REWARDS: {
            BASE_STONE: 1,
            COMMON_STONE: 2,
            UNCOMMON_STONE: 3,
            RARE_STONE: 5,
            UNCOMMON_IRON: 1,
            RARE_IRON: 3,
            MILESTONE_STONE: 2,
            MILESTONE_IRON: 1
        }
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
        },
        RESOURCE_DISPLAY: {
            fontSize: '16px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        },
        MINING_STATUS: {
            fontSize: '14px',
            fill: '#cccccc',
            align: 'center'
        },
        MINING_MESSAGE: {
            fontSize: '12px',
            fill: '#ffff00',
            align: 'center'
        }
    }
};