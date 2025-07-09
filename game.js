const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2c3e50',
    scene: {
        create: create
    }
};

function create() {
    // Add a bright yellow text that should be clearly visible
    this.add.text(400, 300, 'Hello Phaser!', {
        fontSize: '32px',
        fill: '#ffff00',
        stroke: '#000000',
        strokeThickness: 2
    }).setOrigin(0.5);
    
    // Add a simple rectangle to confirm Phaser is working
    this.add.rectangle(400, 400, 200, 50, 0x00ff00);
}

const game = new Phaser.Game(config);