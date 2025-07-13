// Tick System - Core game timing and logic
class TickSystem {
    constructor(scene) {
        this.scene = scene;
        this.tickCount = 0;
        this.isRunning = false;
        this.lastTickTime = 0;
        
        // Visual elements
        this.tickDisplay = null;
        this.randomDisplay = null;
        this.actionsDisplay = null;
        this.timerDisplay = null;
        this.progressBar = null;
        this.offlineSummary = null;
        
        // Random action tracking
        this.randomActions = [];
        
        // Initialize systems
        this.resourceManager = null;
        this.stoneMiningSystem = null;
        
        this.setupVisualDisplay();
        this.setupSystems();
        this.loadGameOrStart();
    }
    
    setupSystems() {
        // Initialize resource manager
        this.resourceManager = new ResourceManager(this.scene);
        
        // Initialize stone mining system
        this.stoneMiningSystem = new StoneMiningSystem(this.scene, this, this.resourceManager);
    }
    
    setupVisualDisplay() {
        // Tick counter display
        this.tickDisplay = this.scene.add.text(20, 20, 'Tick: 0', GameConfig.STYLES.TICK_DISPLAY);
        
        // Random value display
        this.randomDisplay = this.scene.add.text(20, 60, 'Random: --', GameConfig.STYLES.RANDOM_DISPLAY);
        
        // Actions display
        this.actionsDisplay = this.scene.add.text(20, 100, 'Recent Actions:', GameConfig.STYLES.ACTIONS_DISPLAY);
        
        // Timer display
        this.timerDisplay = this.scene.add.text(20, 200, 'Next tick in: 1.25s', GameConfig.STYLES.TIMER_DISPLAY);
        
        // Progress bar for offline processing
        this.progressBar = new ProgressBar(this.scene, 400, 300, 400, 30);
    }
    
    loadGameOrStart() {
        const saveData = SaveManager.load();
        
        if (saveData && SaveManager.validateSaveData(saveData)) {
            const offlineTime = SaveManager.getOfflineTime(saveData);
            const offlineTimeFormatted = SaveManager.formatOfflineTime(offlineTime);
            
            console.log(`Welcome back! You were offline for ${offlineTimeFormatted}`);
            
            if (offlineTime > GameConfig.TICK.INTERVAL) {
                this.processOfflineTime(saveData, offlineTime);
            } else {
                this.loadSaveData(saveData);
                this.start();
            }
        } else {
            console.log('Starting new game');
            this.start();
        }
    }
    
    loadSaveData(saveData) {
        this.tickCount = saveData.tickCount || 0;
        this.randomActions = saveData.randomActions || [];
        
        // Load systems data
        if (saveData.resources) {
            this.resourceManager.loadSaveData(saveData.resources);
        }
        
        if (saveData.stoneMining) {
            this.stoneMiningSystem.loadSaveData(saveData.stoneMining);
        }
    }
    
    processOfflineTime(saveData, offlineTime) {
        this.loadSaveData(saveData);
        
        const missedTicks = SaveManager.calculateMissedTicks(offlineTime);
        console.log(`Processing ${missedTicks} missed ticks...`);
        
        if (missedTicks <= 0) {
            this.start();
            return;
        }
        
        this.progressBar.show(`Processing ${missedTicks} offline ticks...`);
        
        // Process ticks in batches
        let processedTicks = 0;
        const batchSize = Math.max(
            GameConfig.OFFLINE.MIN_BATCH_SIZE, 
            Math.floor(missedTicks / GameConfig.OFFLINE.BATCH_SIZE_DIVISOR)
        );
        
        const processBatch = () => {
            const ticksToProcess = Math.min(batchSize, missedTicks - processedTicks);
            
            for (let i = 0; i < ticksToProcess; i++) {
                this.simulateOfflineTick();
                processedTicks++;
            }
            
            const progress = processedTicks / missedTicks;
            this.progressBar.updateProgress(progress, `Processed ${processedTicks}/${missedTicks} ticks`);
            
            if (processedTicks >= missedTicks) {
                // Finished processing
                setTimeout(() => {
                    this.progressBar.hide();
                    this.showOfflineSummary(missedTicks, offlineTime);
                    this.start();
                }, 500);
            } else {
                // Continue processing
                setTimeout(processBatch, 1);
            }
        };
        
        processBatch();
    }
    
    simulateOfflineTick() {
        this.tickCount++;
        const randomValue = Math.random();
        this.processRandomActions(randomValue);
        
        // Simulate mining if active
        if (this.stoneMiningSystem && this.stoneMiningSystem.isActive) {
            this.stoneMiningSystem.simulateMiningTick(randomValue, this.tickCount);
        }
    }
    
    showOfflineSummary(missedTicks, offlineTime) {
        const timeFormatted = SaveManager.formatOfflineTime(offlineTime);
        const summaryText = `Welcome back!\nOffline for: ${timeFormatted}\nTicks processed: ${missedTicks}`;
        
        this.offlineSummary = this.scene.add.text(400, 200, summaryText, GameConfig.STYLES.SUMMARY_TEXT)
            .setOrigin(0.5);
        
        // Remove summary after configured time
        setTimeout(() => {
            if (this.offlineSummary) {
                this.offlineSummary.destroy();
                this.offlineSummary = null;
            }
        }, GameConfig.OFFLINE.SUMMARY_DISPLAY_TIME);
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.lastTickTime = Date.now();
        this.scheduleNextTick();
        
        // Update timer display
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
            delay: GameConfig.TICK.INTERVAL,
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
        
        // Process random actions
        this.processRandomActions(randomValue);
        
        // Update displays
        this.updateVisualDisplay(randomValue);
        
        // Auto-save
        if (this.tickCount % GameConfig.TICK.SAVE_INTERVAL === 0) {
            this.saveGame();
        }
        
        // Schedule next tick
        this.scheduleNextTick();
        
        console.log(`Tick ${this.tickCount}: Random value ${randomValue.toFixed(4)}`);
    }
    
    processRandomActions(randomValue) {
        const actions = [];
        
        // Probability-based events
        if (randomValue < GameConfig.EVENTS.RARE_THRESHOLD) {
            actions.push("🎲 Rare event occurred!");
        } else if (randomValue < GameConfig.EVENTS.UNCOMMON_THRESHOLD) {
            actions.push("⭐ Uncommon event!");
        } else if (randomValue < GameConfig.EVENTS.COMMON_THRESHOLD) {
            actions.push("✨ Common event");
        }
        
        // Milestone events
        if (this.tickCount % 5 === 0) {
            actions.push("🔔 Every 5th tick special!");
        }
        
        if (this.tickCount % 10 === 0) {
            actions.push("🎉 10th tick milestone!");
        }
        
        // Add actions to history
        actions.forEach(action => {
            this.randomActions.unshift(`T${this.tickCount}: ${action}`);
        });
        
        // Keep only recent actions
        if (this.randomActions.length > GameConfig.TICK.MAX_DISPLAY_ACTIONS) {
            this.randomActions = this.randomActions.slice(0, GameConfig.TICK.MAX_DISPLAY_ACTIONS);
        }
    }
    
    updateVisualDisplay(randomValue) {
        // Update tick counter
        this.tickDisplay.setText(`Tick: ${this.tickCount}`);
        
        // Update random value with color coding
        const randomText = `Random: ${randomValue.toFixed(4)}`;
        let color = GameConfig.COLORS.DEFAULT;
        
        if (randomValue < GameConfig.EVENTS.RARE_THRESHOLD) {
            color = GameConfig.COLORS.RARE;
        } else if (randomValue < GameConfig.EVENTS.UNCOMMON_THRESHOLD) {
            color = GameConfig.COLORS.UNCOMMON;
        } else if (randomValue < GameConfig.EVENTS.COMMON_THRESHOLD) {
            color = GameConfig.COLORS.COMMON;
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
        const remaining = Math.max(0, GameConfig.TICK.INTERVAL - elapsed);
        const seconds = (remaining / 1000).toFixed(2);
        
        this.timerDisplay.setText(`Next tick in: ${seconds}s`);
        
        // Color based on time remaining
        if (remaining < 300) {
            this.timerDisplay.setFill(GameConfig.COLORS.TIMER.CRITICAL);
        } else if (remaining < 600) {
            this.timerDisplay.setFill(GameConfig.COLORS.TIMER.WARNING);
        } else {
            this.timerDisplay.setFill(GameConfig.COLORS.TIMER.NORMAL);
        }
    }
    
    saveGame() {
        const gameState = {
            tickCount: this.tickCount,
            randomActions: this.randomActions,
            lastTickTime: this.lastTickTime,
            resources: this.resourceManager.getSaveData(),
            stoneMining: this.stoneMiningSystem.getSaveData()
        };
        SaveManager.save(gameState);
    }
    
    // Utility methods
    getCurrentTick() {
        return this.tickCount;
    }
    
    isTickMultiple(multiple) {
        return this.tickCount % multiple === 0;
    }
}