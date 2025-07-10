// Progress Bar Component - Reusable progress display
class ProgressBar {
    constructor(scene, x, y, width, height) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.createElements();
        this.hide();
    }
    
    createElements() {
        // Background
        this.background = this.scene.add.rectangle(
            this.x, this.y, this.width, this.height, 0x333333
        );
        
        // Progress fill
        this.progressFill = this.scene.add.rectangle(
            this.x - this.width / 2, this.y, 0, this.height, 0x00ff00
        );
        
        // Text overlay
        this.text = this.scene.add.text(this.x, this.y, '', GameConfig.STYLES.PROGRESS_TEXT)
            .setOrigin(0.5);
    }
    
    show(initialText = 'Processing...') {
        this.background.setVisible(true);
        this.progressFill.setVisible(true);
        this.text.setVisible(true);
        this.text.setText(initialText);
    }
    
    hide() {
        this.background.setVisible(false);
        this.progressFill.setVisible(false);
        this.text.setVisible(false);
    }
    
    updateProgress(progress, text) {
        // Clamp progress between 0 and 1
        progress = Math.max(0, Math.min(1, progress));
        
        // Update progress fill
        const fillWidth = this.width * progress;
        this.progressFill.setSize(fillWidth, this.height);
        this.progressFill.x = this.x - this.width / 2 + fillWidth / 2;
        
        // Update text
        if (text) {
            this.text.setText(text);
        }
        
        // Change color based on progress
        if (progress < 0.3) {
            this.progressFill.setFillStyle(0xff0000); // Red
        } else if (progress < 0.7) {
            this.progressFill.setFillStyle(0xffff00); // Yellow
        } else {
            this.progressFill.setFillStyle(0x00ff00); // Green
        }
    }
    
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.background.setPosition(x, y);
        this.progressFill.setPosition(x - this.width / 2, y);
        this.text.setPosition(x, y);
    }
    
    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.background.setSize(width, height);
        this.progressFill.setSize(0, height);
        this.progressFill.x = this.x - width / 2;
    }
    
    destroy() {
        this.background.destroy();
        this.progressFill.destroy();
        this.text.destroy();
    }
    
    setVisible(visible) {
        this.background.setVisible(visible);
        this.progressFill.setVisible(visible);
        this.text.setVisible(visible);
    }
}