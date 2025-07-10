// Main Game Initialization
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
    // Original demo elements (positioned to not interfere with tick system)
    this.add.text(400, 300, 'Hello Phaser!', {
        fontSize: '32px',
        fill: '#ffff00',
        stroke: '#000000',
        strokeThickness: 2
    }).setOrigin(0.5);
    
    this.add.rectangle(400, 400, 200, 50, 0x00ff00);
    
    // Initialize the tick system
    tickSystem = new TickSystem(this);
    
    // Instructions for the player
    this.add.text(400, 500, 
        'Tick System Running!\n' +
        'Watch the top-left for tick updates\n' +
        'Rare events < 10%, Uncommon < 30%, Common < 60%\n' +
        'Game auto-saves every 5 ticks',
        {
            fontSize: '14px',
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