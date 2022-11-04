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

<<<<<<< Updated upstream
        // Instantiate array of card names
        this.cardNames = ["Madman", "Scholar", "Wilbur Whateley", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
=======
        // Instantiate array of card names and suits
        this.cardNames = ["Madman", "Scholar", "Wilbur Whateley", "Cthulhu", "Hydra", "Lilith", "Gleeth", "Inpesca", "Azathoth", "StarMother", "Yog-Sothoth", "Nyarlathotep"]
        this.suits = ["Cultist", "Old One", "Outer God"];
        this.cardintUp = ["Hysteria","Unity", "Hatred", "Honor", "Eternal Creation", "Charm", "Motivation", "Mystery", "Control over change", "Willpower", "Pursuit", "Discord"]
        this.cardintReverse = ["Harmony","Conflict", "Rapid Growth", "Dishonor", "Limited Power", "Over-Confidence", "Amotivation", "Mystery", "Blindness", "Stationary", "Manipulation", "Charisma"]

        this.ReadingUp = [
        "You are having moments of uncontrollable outbreaks that will scare, confuse or hurt others",
        "You are great at conflict resolution, and you will bring those close to you more together than ever.", 
        "You are filled with hatred and rage towards something important and it will consume you.", 
        "You are revered and honored.", 
        "You are able to come up with unique ideas that will gather other people’s support.", 
        "Your inner radiance will show in your actions, and your confidence will make you shine.", 
        "You are in a stage of movement and progress. Let this energy push you forward.", 
        "You are Keeping your plans hidden and allow only those you really trust into your mind.", 
        "You are able to notice changes to yourself, surroundings and life, and will be able to control them.", 
        "The strength you seek is with you.", 
        "You are finding the answers you search for with your insight and knowledge of the world.", 
        "You are in a time where everything is changing and nothing feels stable, and your behavior is mirroring it to others in your life."]
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
=======
        this.cardsActivated = false; // A boolean that tracks if card effects are resolved
        
        // Play ambience
        let ambience = this.sound.add('ambience',{volume: 0.5});
        ambience.loop = true;
        ambience.play();
>>>>>>> Stashed changes
    }

    update() {
        // Update cards
        this.card1.update();
        this.card2.update();
        this.card3.update();

<<<<<<< Updated upstream
        // Check if slots are full
        if (!this.slots.includes(null)) {
            console.log("Slots full");
        }

        // A way to test card effects FIXME
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.card1.effect(this, this.card1);   
=======
        // Check if slots are full and activate cards if so
        if (!this.slots.includes(null) && !this.cardsActivated) {
            this.cardsActivated = true;
            let gong = this.sound.add('gong');
            gong.play(); // Spooky gong 0_0

            // First card effect
            this.time.delayedCall(2000, ()=> {
                this.card1.effect(this, this.card1);
            });

            // Second card effect
            this.time.delayedCall(4000, ()=> {
                this.card2.effect(this, this.card2);
            });

            // Third card effect
            this.time.delayedCall(6000, ()=> {
                this.card3.effect(this, this.card3);
            });

            // Display cards 
            this.time.delayedCall(9000, () => {
                this.tweens.add({
                    targets: [this.card1, this.card2, this.card3],
                    scale: 0.21,
                    duration: 3000,
                    ease: 'Power2',
                    yoyo: false,
                    completeDelay: 3000
                });
            });

            //Intrepretation For Present
            if(this.slots[1].isUpsideDown == false){
                console.log(this.slots[1].cardName + " means " + this.slots[1].interpretationUp);
                console.log(this.ReadingUp[this.slots[0].sentence]);
            }
            
            console.log(this.slots[1].cardName + " means " + this.slots[1].interpretationUp);
            console.log(this.slots[2].cardName + " means " + this.slots[2].interpretationUp);
>>>>>>> Stashed changes
        }
    }

/*------------------------------------------------------------------------------------------*/
    // FUNCTION: Populates the deck with card objects with their corresponding attributes
    populateDeck() {
        // Add cards to deck
        for (let i = 0; i < game.settings.cardCount; i++) {
            // Create card instance with corresponding attributes
<<<<<<< Updated upstream
            let card = new Card(this, this.cardNames[i], 'Dummy Suit', this.cardNames[0]); // FIXME
=======
            let card = new Card(this, this.cardNames[i], this.suits[suitIndex], this.cardNames[i], this.cardintUp[i], this.cardintReverse[i],i);
>>>>>>> Stashed changes
            Align.scaleToGameW(card, .1);

            card.isUpsideDown = (Math.random() < 0.5); // Set orientation
           //card.interpretationUp = ""; // Rightside up interpretation FIXME
           //card.interpretationDown = ""; // Upside down interpretation FIXME
            this.deck.push(card); // Add card to deck

            // Assign card effect from Effects.js
            card.effect = effects[0] // FIXME
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