class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('cardface', './assets/cardFace.png');
        this.load.image('bg', './assets/background.png');
        this.load.audio('placecard', './assets/cardflip.wav');

        // Load card faces
        this.load.image('Madman', './assets/cards/madman_card.png');
        this.load.image('Scholar', './assets/cards/scholar_card.png');
        this.load.image('Wilbur Whateley', './assets/cards/wilbur_card.png');
        this.load.image('Cthulhu', './assets/cards/cthulhu_card.png');
        this.load.image('Hydra', './assets/cards/hydra_card.png');
        this.load.image('Lilith', './assets/cards/lilith_card.png');
        this.load.image('Gleeth', './assets/cards/gleeth_card.png');
        this.load.image('Inpesca', './assets/cards/inpesca_card.png');
        this.load.image('Azathoth', './assets/cards/azathoth_card.png');
        this.load.image('StarMother', './assets/cards/starmother_card.png');
        this.load.image('Yog-Sothoth', './assets/cards/yog_card.png');
        this.load.image('Nyarlathotep', './assets/cards/nya_card.png');
    }

    create() {

        // Add background and sounds
        this.add.image(game.config.width / 2, game.config.height / 2, 'bg');
        cardSFX = this.sound.add('placecard');

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

        this.slots = [null, null, null] // Array representing slots in play area
        this.selectedSlot = null; // Currently selected slot for placing a card

        // Instantiate array of card names
        this.cardNames = ["Madman", "Scholar", "Wilbur Whateley", "Cthulhu", "Hydra", "Lilith", "Gleeth", "Inpesca", "Azathoth", "StarMother", "Yog-Sothoth", "Nyarlathotep"]

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

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Update cards
        this.card1.update();
        this.card2.update();
        this.card3.update();

        // Check if slots are full
        if (!this.slots.includes(null)) {
            console.log("Slots full");
        }

        // A way to test card effects FIXME
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.card1.effect(this, this.card1);   
        }
    }

/*------------------------------------------------------------------------------------------*/
    // FUNCTION: Populates the deck with card objects with their corresponding attributes
    populateDeck() {
        // Add cards to deck
        for (let i = 0; i < game.settings.cardCount; i++) {
            // Create card instance with corresponding attributes
            let card = new Card(this, this.cardNames[i], 'Dummy Suit', this.cardNames[i]); // FIXME
            Align.scaleToGameW(card, .1);

            card.isUpsideDown = (Math.random() < 0.5); // Set orientation
            card.interpretationUp = ""; // Rightside up interpretation FIXME
            card.interpretationDown = ""; // Upside down interpretation FIXME
            this.deck.push(card); // Add card to deck

            // Assign card effect from Effects.js
            card.effect = effects[i]
            card.disableInteractive();
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

        // Set as interactive
        this.card1.setInteractive();
        this.card2.setInteractive();
        this.card3.setInteractive();
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

                // Enlarge card art
                enlargedArt = this.add.image(gameObject.x, gameObject.y - 20, gameObject.texture.key);
                enlargedArt.setScale(0.2);
            }
        }, scene);

        scene.input.on('gameobjectout', function (pointer, gameObject) {
            if (gameObject.cardName) { // If object has a name, it is a card
                scene.tweens.add({
                    targets: gameObject,
                    y: {from:gameObject.y, to:this.hand1.y},
                    duration: 100
                });

                // Remove enlarged art
                enlargedArt.destroy();
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

    // FUNCTION: Moves a card in hand to the currently selected slot
    slotCard(scene) {
        
        scene.input.on('gameobjectdown', function (pointer, gameObject) {
            if (gameObject.cardName) { // if object has a name, it is a card
                if (scene.selectedSlot != null) {
                    // Play sfx
                    cardSFX.play();

                    // Move card to slot
                    scene.tweens.add({
                        targets: gameObject,
                        x: scene.selectedSlot.x,
                        y: scene.selectedSlot.y,
                        duration: 3000,
                        ease: 'Power2',
                        completeDelay: 3000
                    });

                    gameObject.currSlot = scene.selectedSlot;
    
                    // Lock in card so it can no longer be moved
                    gameObject.disableInteractive();
                    scene.selectedSlot.disableInteractive();
                    scene.selectedSlot.isFilled = false;

                    // Add card to slot array
                    scene.addToSlotArr(scene, gameObject, scene.selectedSlot);
                    scene.selectedSlot = null;
                }
            }
        }, scene);
    }

    // FUNCTION: Adds a card to the array representing card slots
    addToSlotArr(scene, card, slot) {
        // Start in first slot by default
        let slotIndex = 0;

        // Check if slot is first or second
        if (slot == scene.playPos2) {
            slotIndex = 1;
        } else if (slot == scene.playPos3) {
            slotIndex = 2
        }

        // Add card at desired slot
        scene.slots[slotIndex] = card;
    }
}