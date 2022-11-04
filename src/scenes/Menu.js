class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
      // Preload assets for menu
      this.load.image('title', './assets/titlescreen.png');
      this.load.audio('ambience', './assets/ambience.wav');
    }

    create() {
        // display score
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.image(game.config.width / 2, game.config.height / 2, 'title');

        // Define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Set game settings
        game.settings = {
          cardCount: 12
        }

        // Play ambience
        let ambience = this.sound.add('ambience');
        ambience.loop = true;
        ambience.play();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.scene.start('playScene');    
        }
    }
}