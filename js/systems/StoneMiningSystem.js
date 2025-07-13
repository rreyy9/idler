// Stone Mining System - Handles stone mining mechanics and visual feedback
class StoneMiningSystem {
    constructor(scene, tickSystem, resourceManager) {
        this.scene = scene;
        this.tickSystem = tickSystem;
        this.resourceManager = resourceManager;
        
        this.isActive = false;
        this.stoneIcon = null;
        this.statusText = null;
        
        this.createStoneIcon();
        this.setupTickListener();
    }
    
    createStoneIcon() {
        // Create a simple button as temporary solution
        // Stone button background
        const buttonBg = this.scene.add.rectangle(600, 200, 100, 50, 0x555555);
        buttonBg.setStrokeStyle(2, 0x888888);
        
        // Stone button text
        const buttonText = this.scene.add.text(600, 200, '🪨 MINE', {
            fontSize: '16px',
            fill: '#ffffff'
        }).setOrigin(0.5);
        
        // Make the button interactive - Fix the binding issue
        buttonBg.setInteractive({ useHandCursor: true });
        buttonBg.on('pointerdown', () => {
            this.toggleMining();
        });
        
        // Store references
        this.stoneIcon = buttonBg;
        this.buttonText = buttonText;
        
        // Status text below the button
        this.statusText = this.scene.add.text(600, 250, 'Click to start mining', GameConfig.STYLES.MINING_STATUS)
            .setOrigin(0.5);
        
        // Set initial appearance
        this.updateStoneAppearance();
    }
    
    toggleMining() {
        this.isActive = !this.isActive;
        this.updateStoneAppearance();
        
        if (this.isActive) {
            console.log('Stone mining activated!');
        } else {
            console.log('Stone mining deactivated.');
        }
    }
    
    updateStoneAppearance() {
        if (this.isActive) {
            // Active state - glowing cyan
            this.stoneIcon.setStrokeStyle(3, 0x00ffff);
            this.stoneIcon.setFillStyle(0x006666);
            this.buttonText.setFill('#00ffff');
            this.statusText.setText('Mining active!\nWait for ticks...');
            this.statusText.setFill('#00ffff');
        } else {
            // Inactive state - dim gray
            this.stoneIcon.setStrokeStyle(2, 0x888888);
            this.stoneIcon.setFillStyle(0x555555);
            this.buttonText.setFill('#ffffff');
            this.statusText.setText('Click to start mining');
            this.statusText.setFill('#cccccc');
        }
    }
    
    setupTickListener() {
        // We'll hook into the tick system by modifying the processTick method
        // This is a simple way to integrate without major refactoring
        const originalProcessTick = this.tickSystem.processTick.bind(this.tickSystem);
        
        this.tickSystem.processTick = () => {
            // Call original tick processing
            originalProcessTick();
            
            // Then handle our mining
            if (this.isActive) {
                this.processMiningTick(this.tickSystem.tickCount);
            }
        };
    }
    
    processMiningTick(tickCount) {
        // Base stone amount per tick
        let stoneGained = GameConfig.MINING.REWARDS.BASE_STONE;
        
        // Get the random value from the current tick for rarity calculation
        const randomValue = Math.random();
        let ironGained = 0;
        let miningMessage = '';
        
        // Mining rewards based on tick rarity (same thresholds as tick system)
        if (randomValue < GameConfig.EVENTS.RARE_THRESHOLD) {
            // Rare tick - bonus rewards
            stoneGained = GameConfig.MINING.REWARDS.RARE_STONE;
            ironGained = GameConfig.MINING.REWARDS.RARE_IRON;
            miningMessage = '🎲 Rare mining strike! Found iron vein!';
            this.showMiningEffect('rare');
        } else if (randomValue < GameConfig.EVENTS.UNCOMMON_THRESHOLD) {
            // Uncommon tick - moderate bonus
            stoneGained = GameConfig.MINING.REWARDS.UNCOMMON_STONE;
            ironGained = GameConfig.MINING.REWARDS.UNCOMMON_IRON;
            miningMessage = '⭐ Good mining strike! Found some iron!';
            this.showMiningEffect('uncommon');
        } else if (randomValue < GameConfig.EVENTS.COMMON_THRESHOLD) {
            // Common tick - small bonus
            stoneGained = GameConfig.MINING.REWARDS.COMMON_STONE;
            miningMessage = '✨ Decent mining strike!';
            this.showMiningEffect('common');
        } else {
            // Normal tick
            miningMessage = '⛏️ Mining steadily...';
            this.showMiningEffect('normal');
        }
        
        // Special milestone bonuses
        if (tickCount % GameConfig.MINING.MILESTONE_INTERVAL === 0) {
            stoneGained += GameConfig.MINING.REWARDS.MILESTONE_STONE;
            ironGained += GameConfig.MINING.REWARDS.MILESTONE_IRON;
            miningMessage += ' (Milestone bonus!)';
        }
        
        // Add resources
        this.resourceManager.addResource('stone', stoneGained);
        if (ironGained > 0) {
            this.resourceManager.addResource('iron', ironGained);
        }
        
        console.log(`Tick ${tickCount} Mining: ${stoneGained} stone, ${ironGained} iron - ${miningMessage}`);
        
        // Update mining status
        this.updateMiningStatus(stoneGained, ironGained, miningMessage);
    }
    
    showMiningEffect(rarity) {
        // Visual effect on the button based on mining result
        let effectColor;
        switch(rarity) {
            case 'rare': effectColor = 0xff00ff; break;      // Magenta
            case 'uncommon': effectColor = 0xffff00; break;  // Yellow
            case 'common': effectColor = 0x00ffff; break;    // Cyan
            default: effectColor = 0x00ff00; break;          // Green
        }
        
        // Temporarily change button glow
        this.stoneIcon.setStrokeStyle(5, effectColor);
        this.stoneIcon.setFillStyle(effectColor & 0x333333); // Darker version
        
        // Reset to normal appearance after effect
        setTimeout(() => {
            this.updateStoneAppearance();
        }, 300);
    }
    
    updateMiningStatus(stoneGained, ironGained, message) {
        let statusText = 'Mining active!\n';
        statusText += `+${stoneGained} stone`;
        if (ironGained > 0) {
            statusText += `, +${ironGained} iron`;
        }
        
        this.statusText.setText(statusText);
        
        // Show brief message effect
        const messageText = this.scene.add.text(600, 270, message, GameConfig.STYLES.MINING_MESSAGE)
            .setOrigin(0.5);
        
        // Fade out the message
        this.scene.tweens.add({
            targets: messageText,
            alpha: 0,
            y: 290,
            duration: GameConfig.MINING.MESSAGE_FADE_DURATION,
            ease: 'Power2',
            onComplete: () => messageText.destroy()
        });
    }
    
    // Process offline mining tick
    simulateMiningTick(randomValue, tickCount) {
        let stoneGained = GameConfig.MINING.REWARDS.BASE_STONE;
        let ironGained = 0;
        
        // Same mining logic as online
        if (randomValue < GameConfig.EVENTS.RARE_THRESHOLD) {
            stoneGained = GameConfig.MINING.REWARDS.RARE_STONE;
            ironGained = GameConfig.MINING.REWARDS.RARE_IRON;
        } else if (randomValue < GameConfig.EVENTS.UNCOMMON_THRESHOLD) {
            stoneGained = GameConfig.MINING.REWARDS.UNCOMMON_STONE;
            ironGained = GameConfig.MINING.REWARDS.UNCOMMON_IRON;
        } else if (randomValue < GameConfig.EVENTS.COMMON_THRESHOLD) {
            stoneGained = GameConfig.MINING.REWARDS.COMMON_STONE;
        }
        
        if (tickCount % GameConfig.MINING.MILESTONE_INTERVAL === 0) {
            stoneGained += GameConfig.MINING.REWARDS.MILESTONE_STONE;
            ironGained += GameConfig.MINING.REWARDS.MILESTONE_IRON;
        }
        
        this.resourceManager.addResource('stone', stoneGained);
        if (ironGained > 0) {
            this.resourceManager.addResource('iron', ironGained);
        }
    }
    
    // Save/load methods for integration
    getSaveData() {
        return {
            isActive: this.isActive
        };
    }
    
    loadSaveData(data) {
        if (data && data.isActive !== undefined) {
            this.isActive = data.isActive;
            this.updateStoneAppearance();
        }
    }
}