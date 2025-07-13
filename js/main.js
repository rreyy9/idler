// Main Game Initialization with Stone Mining
const config = {
    type: Phaser.AUTO,
    width: GameConfig.GAME.WIDTH,
    height: GameConfig.GAME.HEIGHT,
    backgroundColor: GameConfig.GAME.BACKGROUND_COLOR,
    scene: {
        create: create
    }
};

let tickSystem;

function create() {
    // Original demo elements (positioned to not interfere with mining system)
    this.add.text(400, 350, 'Hello Phaser!', {
        fontSize: '32px',
        fill: '#ffff00',
        stroke: '#000000',
        strokeThickness: 2
    }).setOrigin(0.5);
    
    this.add.rectangle(400, 450, 200, 50, 0x00ff00);
    
    // Initialize the tick system (now includes mining systems)
    tickSystem = new TickSystem(this);
    
    // Updated instructions for the player
    this.add.text(400, 550, 
        'Stone Mining Game!\n' +
        'Watch tick system (top-left) • Resources (middle-left) • Click stone to mine (top-right)\n' +
        'Rare ticks give bonus stone & iron • Game auto-saves every 5 ticks • Works offline!',
        {
            fontSize: '11px',
            fill: '#cccccc',
            align: 'center'
        }
    ).setOrigin(0.5);
}

// Handle page unload to save game
window.addEventListener('beforeunload', () => {
    if (tickSystem) {
        tickSystem.saveGame();
    }
});

// Initialize the game
const game = new Phaser.Game(config);