// Save Manager Class - Handles all save/load operations
class SaveManager {
    static save(gameState) {
        const saveData = {
            ...gameState,
            lastSaveTime: Date.now(),
            gameVersion: GameConfig.SAVE.VERSION
        };
        
        try {
            localStorage.setItem(GameConfig.SAVE.KEY, JSON.stringify(saveData));
            console.log('Game saved at tick', gameState.tickCount);
            return true;
        } catch (error) {
            console.error('Failed to save game:', error);
            return false;
        }
    }
    
    static load() {
        const saveData = localStorage.getItem(GameConfig.SAVE.KEY);
        if (saveData) {
            try {
                const parsed = JSON.parse(saveData);
                console.log('Save data loaded from tick', parsed.tickCount);
                return parsed;
            } catch (error) {
                console.error('Failed to load save data:', error);
                return null;
            }
        }
        return null;
    }
    
    static getOfflineTime(saveData) {
        if (!saveData || !saveData.lastSaveTime) return 0;
        return Date.now() - saveData.lastSaveTime;
    }
    
    static calculateMissedTicks(offlineTime) {
        return Math.floor(offlineTime / GameConfig.TICK.INTERVAL);
    }
    
    static formatOfflineTime(offlineTime) {
        const hours = Math.floor(offlineTime / (1000 * 60 * 60));
        const minutes = Math.floor((offlineTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((offlineTime % (1000 * 60)) / 1000);
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    }
    
    static deleteSave() {
        try {
            localStorage.removeItem(GameConfig.SAVE.KEY);
            console.log('Save data deleted');
            return true;
        } catch (error) {
            console.error('Failed to delete save data:', error);
            return false;
        }
    }
    
    static hasSaveData() {
        return localStorage.getItem(GameConfig.SAVE.KEY) !== null;
    }
    
    static validateSaveData(saveData) {
        if (!saveData) return false;
        
        // Check required fields
        const requiredFields = ['tickCount', 'lastSaveTime', 'gameVersion'];
        for (const field of requiredFields) {
            if (saveData[field] === undefined) {
                console.warn(`Save data missing required field: ${field}`);
                return false;
            }
        }
        
        // Check version compatibility
        if (saveData.gameVersion !== GameConfig.SAVE.VERSION) {
            console.warn(`Save data version mismatch: ${saveData.gameVersion} vs ${GameConfig.SAVE.VERSION}`);
            // Could implement version migration here
        }
        
        return true;
    }
}