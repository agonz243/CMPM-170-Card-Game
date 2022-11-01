class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('cardface', './assets/cardFace.png');
        this.load.image('spaceship', './assets/spaceship.png');
    }

    create() {

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // Text config
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }

        // Create align grid for placing cards in play area
        this.aGrid = new AlignGrid({scene: this, rows: 10, cols: 9});
        this.aGrid.showNumbers(); // FIXME

        // Instantiate deck as array and the player's three cards
        this.deck = [];
        this.card1;
        this.card2;
        this.card3;

        this.hand1 = this.add.rectangle(0, 0, 1, 1);
        this.hand2 = this.add.rectangle(0, 0, 1, 1);
        this.hand3 = this.add.rectangle(0, 0, 1, 1);

        // Instantiate array of card names
        this.cardNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

        // Populate deck
        this.populateDeck();

        // Draw three cards and set hand positions
        this.drawThree();
        this.setHandPos();



        // Add cards to scene
        this.add.existing(this.card1);
        this.add.existing(this.card2);
        this.add.existing(this.card3);

        // TESTSTETETTET Print names of cards
        console.log(this.card1.cardName);
        console.log(this.card2.cardName);
        console.log(this.card3.cardName);
    }

    update() {

    }

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
}