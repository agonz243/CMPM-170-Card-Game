let config = {
    type: Phaser.CANVAS,
    width: 1000,
    height: 800,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keySPACE;

// Define global variables
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let hoverOffset = 10;
let cardSFX;