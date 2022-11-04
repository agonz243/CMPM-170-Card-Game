class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
      // Preload assets for menu
      this.load.image('title', './assets/titlescreen.png');
<<<<<<< Updated upstream
=======
      this.load.audio('ambience', './assets/ambience.wav');
      this.load.audio('titlebgm', './assets/TitleTheme.mp3');
>>>>>>> Stashed changes
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
        let TT = this.sound.add('titlebgm',{volume: 0.5});
        TT.loop = true;
        
        TT.play();

        // Define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Set game settings
        game.settings = {
          cardCount: 12
        }
<<<<<<< Updated upstream
=======

        
>>>>>>> Stashed changes
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.sound.get('titlebgm').stop();
          this.scene.start('playScene');    
        }
    }
}