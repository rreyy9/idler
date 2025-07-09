# Phaser Game Project Setup Guide

This guide walks you through setting up a basic Phaser 3 game project with npm and live-server.

## Prerequisites

- Node.js and npm installed on your system
- Basic knowledge of HTML, CSS, and JavaScript

## Project Setup

### 1. Create Project Directory

```bash
mkdir my-phaser-game
cd my-phaser-game
```

### 2. Initialize npm Project

```bash
npm init -y
```

### 3. Install Dependencies

```bash
npm install phaser
npm install --save-dev live-server
```

### 4. Update package.json Scripts

Add the start script to your `package.json`:

```json
{
  "scripts": {
    "start": "live-server --port=8080"
  }
}
```

## Project Files

### index.html

Create the main HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Phaser Game</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #2c3e50;
        }
    </style>
</head>
<body>
    <script src="node_modules/phaser/dist/phaser.min.js"></script>
    <script src="game.js"></script>
</body>
</html>
```

### game.js

Create the main game file:

```javascript
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
```

### .gitignore

Create a `.gitignore` file to exclude unnecessary files from version control:

```gitignore
# Node.js dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build output
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
*.log
logs/

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Game specific files (add as needed)
# assets/temp/
# saves/
# screenshots/
```

## Final Project Structure

```
my-phaser-game/
├── index.html
├── game.js
├── package.json
├── package-lock.json
├── .gitignore
└── node_modules/
```

## Running the Project

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:8080
```

3. You should see:
   - Yellow "Hello Phaser!" text
   - Green rectangle below it
   - Dark blue-gray background

## What's Included

- **Phaser 3**: The latest version of the Phaser game framework
- **Live-server**: Automatically refreshes the browser when files change
- **Basic game setup**: Simple scene with text and shapes to confirm everything works

## Next Steps

Now that your basic setup is working, you can:

1. Add game assets (images, sounds) to an `assets/` folder
2. Create multiple scenes (menu, game, game over)
3. Add player movement and controls
4. Implement game physics
5. Add sprites and animations
6. Create game mechanics

## Troubleshooting

**Game not loading?**
- Check browser console for errors (F12)
- Ensure `game.js` is included in `index.html`
- Verify live-server is running on the correct port

**Assets not loading?**
- Make sure asset paths are correct
- Use relative paths from the project root
- Check that files exist in the specified locations

## Resources

- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Phaser 3 Examples](https://phaser.io/examples)
- [Phaser 3 Tutorials](https://phaser.io/tutorials)

Happy game development! 🎮