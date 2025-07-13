// Resource Manager Class - Handles stone and iron collection
class ResourceManager {
    constructor(scene) {
        this.scene = scene;
        this.resources = {
            stone: 0,
            iron: 0
        };
        
        this.setupResourceDisplay();
    }
    
    setupResourceDisplay() {
        // Resource display panel
        this.resourceDisplay = this.scene.add.text(20, 250, this.getResourceText(), GameConfig.STYLES.RESOURCE_DISPLAY);
    }
    
    addResource(type, amount) {
        if (this.resources.hasOwnProperty(type)) {
            this.resources[type] += amount;
            this.updateDisplay();
            console.log(`Gained ${amount} ${type}. Total: ${this.resources[type]}`);
        }
    }
    
    getResource(type) {
        return this.resources[type] || 0;
    }
    
    updateDisplay() {
        this.resourceDisplay.setText(this.getResourceText());
    }
    
    getResourceText() {
        return `Resources:\n🪨 Stone: ${this.resources.stone}\n⚡ Iron: ${this.resources.iron}`;
    }
    
    // Save/load methods for integration with save system
    getSaveData() {
        return { ...this.resources };
    }
    
    loadSaveData(data) {
        if (data) {
            this.resources = { ...this.resources, ...data };
            this.updateDisplay();
        }
    }
}