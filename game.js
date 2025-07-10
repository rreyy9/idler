// Basic Tick System
class TickSystem {
    constructor(scene) {
        this.scene = scene;
        this.tickCount = 0;
        this.tickInterval = 1250; // 1.25 seconds in milliseconds
        this.isRunning = false;
        this.lastTickTime = 0;
        
        // Visual elements
        this.tickDisplay = null;
        this.randomDisplay = null;
        this.actionsDisplay = null;
        
        // Random action tracking
        this.randomActions = [];
        this.maxDisplayActions = 5;
        
        this.setupVisualDisplay();
        this.start();
    }
    
    setupVisualDisplay() {
        // Tick counter display
        this.tickDisplay = this.scene.add.text(20, 20, 'Tick: 0', {
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        });
        
        // Random value display
        this.randomDisplay = this.scene.add.text(20, 60, 'Random: --', {
            fontSize: '18px',
            fill: '#00ff00',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        });
        
        // Actions display
        this.actionsDisplay = this.scene.add.text(20, 100, 'Recent Actions:', {
            fontSize: '16px',
            fill: '#ffff00',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        });
        
        // Timer display (shows countdown to next tick)
        this.timerDisplay = this.scene.add.text(20, 200, 'Next tick in: 1.25s', {
            fontSize: '14px',
            fill: '#ff9900',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        });
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.lastTickTime = Date.now();
        this.scheduleNextTick();
        
        // Update timer display every frame
        this.scene.time.addEvent({
            delay: 50, // Update 20 times per second
            callback: this.updateTimerDisplay,
            callbackScope: this,
            loop: true
        });
    }
    
    stop() {
        this.isRunning = false;
    }
    
    scheduleNextTick() {
        if (!this.isRunning) return;
        
        this.scene.time.addEvent({
            delay: this.tickInterval,
            callback: this.processTick,
            callbackScope: this
        });
    }
    
    processTick() {
        if (!this.isRunning) return;
        
        this.tickCount++;
        this.lastTickTime = Date.now();
        
        // Generate random value for this tick
        const randomValue = Math.random();
        
        // Process random actions based on the random value
        this.processRandomActions(randomValue);
        
        // Update displays
        this.updateVisualDisplay(randomValue);
        
        // Schedule next tick
        this.scheduleNextTick();
        
        console.log(`Tick ${this.tickCount}: Random value ${randomValue.toFixed(4)}`);
    }
    
    processRandomActions(randomValue) {
        const actions = [];
        
        // Example random actions based on probability thresholds
        if (randomValue < 0.1) {
            actions.push("🎲 Rare event occurred!");
        } else if (randomValue < 0.3) {
            actions.push("⭐ Uncommon event!");
        } else if (randomValue < 0.6) {
            actions.push("✨ Common event");
        }
        
        // Special actions based on tick count
        if (this.tickCount % 5 === 0) {
            actions.push("🔔 Every 5th tick special!");
        }
        
        if (this.tickCount % 10 === 0) {
            actions.push("🎉 10th tick milestone!");
        }
        
        // Add actions to recent actions list
        actions.forEach(action => {
            this.randomActions.unshift(`T${this.tickCount}: ${action}`);
        });
        
        // Keep only the most recent actions
        if (this.randomActions.length > this.maxDisplayActions) {
            this.randomActions = this.randomActions.slice(0, this.maxDisplayActions);
        }
    }
    
    updateVisualDisplay(randomValue) {
        // Update tick counter
        this.tickDisplay.setText(`Tick: ${this.tickCount}`);
        
        // Update random value with color coding
        const randomText = `Random: ${randomValue.toFixed(4)}`;
        let color = '#00ff00'; // Default green
        
        if (randomValue < 0.1) {
            color = '#ff00ff'; // Magenta for rare
        } else if (randomValue < 0.3) {
            color = '#ffff00'; // Yellow for uncommon
        } else if (randomValue < 0.6) {
            color = '#00ffff'; // Cyan for common
        }
        
        this.randomDisplay.setText(randomText);
        this.randomDisplay.setFill(color);
        
        // Update actions display
        const actionsText = 'Recent Actions:\n' + this.randomActions.join('\n');
        this.actionsDisplay.setText(actionsText);
    }
    
    updateTimerDisplay() {
        if (!this.isRunning) return;
        
        const now = Date.now();
        const elapsed = now - this.lastTickTime;
        const remaining = Math.max(0, this.tickInterval - elapsed);
        const seconds = (remaining / 1000).toFixed(2);
        
        this.timerDisplay.setText(`Next tick in: ${seconds}s`);
        
        // Change color as we get closer to next tick
        if (remaining < 300) {
            this.timerDisplay.setFill('#ff0000'); // Red
        } else if (remaining < 600) {
            this.timerDisplay.setFill('#ffff00'); // Yellow
        } else {
            this.timerDisplay.setFill('#ff9900'); // Orange
        }
    }
    
    // Utility method to get current tick
    getCurrentTick() {
        return this.tickCount;
    }
    
    // Utility method to check if specific tick
    isTickMultiple(multiple) {
        return this.tickCount % multiple === 0;
    }
}

// Update the game configuration to include the tick system
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2c3e50',
    scene: {
        create: create
    }
};

let tickSystem;

function create() {
    // Keep original elements but move them to not interfere
    this.add.text(400, 300, 'Hello Phaser!', {
        fontSize: '32px',
        fill: '#ffff00',
        stroke: '#000000',
        strokeThickness: 2
    }).setOrigin(0.5);
    
    this.add.rectangle(400, 400, 200, 50, 0x00ff00);
    
    // Initialize the tick system
    tickSystem = new TickSystem(this);
    
    // Add some instructions
    this.add.text(400, 500, 'Tick System Running!\nWatch the top-left for tick updates\nRare events < 10%, Uncommon < 30%, Common < 60%', {
        fontSize: '14px',
        fill: '#cccccc',
        align: 'center'
    }).setOrigin(0.5);
}

const game = new Phaser.Game(config);