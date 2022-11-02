class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('cardface', './assets/cardFace.png');
        this.load.image('bg', './assets/background.png');
    }

    create() {

        // Add background
        this.add.image(game.config.width / 2, game.config.height / 2, 'bg');

        // Create align grid for placing cards in play area
        this.aGrid = new AlignGrid({scene: this, rows: 10, cols: 9});
        //this.aGrid.showNumbers(); // FIXME

        // Instantiate deck as array and the player's three cards
        this.deck = [];
        this.card1;
        this.card2;
        this.card3;

        this.hand1 = this.add.rectangle(0, 0, 1, 1); // Anchor locations for cards in hand
        this.hand2 = this.add.rectangle(0, 0, 1, 1);
        this.hand3 = this.add.rectangle(0, 0, 1, 1);

        this.slots = [] // Array representing slots in play area
        this.selectedSlot = null; // Currently selected slot for placing a card

        // Instantiate array of card names
        this.cardNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

        // Populate deck
        this.populateDeck();

        // Draw three cards and set hand/play positions
        this.drawThree();
        this.setHandPos();
        this.setPlayPos(this);



        // Add cards to scene
        this.add.existing(this.card1);
        this.add.existing(this.card2);
        this.add.existing(this.card3);

        // Handle animation when hovering over cards in hand
        this.handleHover(this);

        // Handle selection of card slot
        this.handlePlayPos(this);
        this.slotCard(this);
    }

    update() {

    }

/*------------------------------------------------------------------------------------------*/
    // FUNCTION: Populates the deck with card objects with their corresponding attributes
    populateDeck() {
        // Add cards to deck
        for (let i = 0; i < game.settings.cardCount; i++) {
            // Create card instance with corresponding attributes
            let card = new Card(this, this.cardNames[i], 'Dummy Suit', 'cardface'); // FIXME
            Align.scaleToGameW(card, .1);

            card.isUpsideDown = false; // Set orientation FIXME
            card.interpretationUp = ""; // Rightside up interpretation FIXME
            card.interpretationDown = ""; // Upside down interpretation FIXME
            this.deck.push(card); // Add card to deck
        }
    }

    // FUNCTION: Draws three random cards from the deck
    drawThree() {
        // Shuffle deck
        Phaser.Utils.Array.Shuffle(this.deck);

        // Draw three cards
        this.card1 = Phaser.Utils.Array.Remove(this.deck, this.deck[0]);
        this.card2 = Phaser.Utils.Array.Remove(this.deck, this.deck[1]);
        this.card3 = Phaser.Utils.Array.Remove(this.deck, this.deck[2]);

        // Place cards at respective positions FIXME
        this.aGrid.placeAtIndex(52, this.card1);
        this.aGrid.placeAtIndex(52, this.card2);
        this.aGrid.placeAtIndex(52, this.card3);
    }

    // FUNCTION: Sets the positions for the three cards in the player's hand
    setHandPos() {
        // Place cards at respective positions
        this.aGrid.placeAtIndex(75, this.hand1);
        this.aGrid.placeAtIndex(76, this.hand2);
        this.aGrid.placeAtIndex(77, this.hand3);

        // Move cards to hand positions
        this.tweens.add({
            targets: this.card1,
            x: this.hand1.x,
            y: this.hand1.y,
            duration: 3000,
            ease: 'Power2',
            completeDelay: 3000
        });

        this.tweens.add({
            targets: this.card2,
            x: this.hand2.x,
            y: this.hand2.y,
            duration: 3500,
            ease: 'Power2',
            completeDelay: 3000
        });

        this.tweens.add({
            targets: this.card3,
            x: this.hand3.x,
            y: this.hand3.y,
            duration: 4000,
            ease: 'Power2',
            completeDelay: 3000
        });
    }

    // FUNCTION: Handles animation for hovering over cards in hand
    handleHover(scene) {
        // Handle hovering over cards
        scene.input.on('gameobjectover', function (pointer, gameObject) {
            if (gameObject.cardName) { // if object has a name, it is a card
                scene.tweens.add({
                    targets: gameObject,
                    y: {from:gameObject.y, to:this.hand1.y - hoverOffset},
                    duration: 100
                });
            }
        }, scene);

        scene.input.on('gameobjectout', function (pointer, gameObject) {
            if (gameObject.cardName) { // If object has a name, it is a card
                scene.tweens.add({
                    targets: gameObject,
                    y: {from:gameObject.y, to:this.hand1.y},
                    duration: 100
                });
            }
        }, scene);
    }

    // FUNCTION: Sets the play positions for the three cards
    setPlayPos(scene) {
        // Position 1
        scene.playPos1 = scene.add.rectangle(0, 0, 120, 200);
        scene.aGrid.placeAtIndex(38, scene.playPos1);
        scene.playPos1.setStrokeStyle(2, 0xffffff);
        scene.playPos1.setInteractive();

        // Position 2
        scene.playPos2 = scene.add.rectangle(0, 0, 120, 200);
        scene.aGrid.placeAtIndex(40, scene.playPos2);
        scene.playPos2.setStrokeStyle(2, 0xffffff);
        scene.playPos2.setInteractive();

        // Position 3
        scene.playPos3 = scene.add.rectangle(0, 0, 120, 200);
        scene.aGrid.placeAtIndex(42, scene.playPos3);
        scene.playPos3.setStrokeStyle(2, 0xffffff);
        scene.playPos3.setInteractive();
    }

    // FUNCTION: Handle selection of card slot
    handlePlayPos(scene) {
        // Handle position 1
        scene.playPos1.on('pointerdown', function (pointer) {
            // Highlight slot
            this.isFilled = true;
            scene.playPos2.isFilled = false;
            scene.playPos3.isFilled = false;

            // Select slot
            scene.selectedSlot = scene.playPos1;
        });

        // Handle position 2
        scene.playPos2.on('pointerdown', function (pointer) {
            // Highlight slot
            this.isFilled = true;
            scene.playPos1.isFilled = false;
            scene.playPos3.isFilled = false;

            // Select slot
            scene.selectedSlot = scene.playPos2;
        });

        // Handle position 3
        scene.playPos3.on('pointerdown', function (pointer) {
            // Highlight slot
            this.isFilled = true;
            scene.playPos1.isFilled = false;
            scene.playPos2.isFilled = false;

            // Select slot
            scene.selectedSlot = scene.playPos3;
        });
    }

    // FUNCTION: Adds a card in hand to the currently selected slot
    slotCard(scene) {
        scene.card1.on('pointerdown', function (pointer) {
            // Move card to slot
            if (scene.selectedSlot != null) {
                // Move card to slot
                scene.tweens.add({
                    targets: this,
                    x: scene.selectedSlot.x,
                    y: scene.selectedSlot.y,
                    duration: 3000,
                    ease: 'Power2',
                    completeDelay: 3000
                });

                // Lock in card
                this.disableInteractive();
                scene.selectedSlot.disableInteractive();
                scene.selectedSlot.isFilled = false;
            }
        });
    }
}