// Prefab for the cards

class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, name, suit, texture, interUp, interReverse, readingNum) {
      super(scene, name, suit, texture);

      // Set attributes
      this.cardName = name;
      this.cardSuit = suit;
      this.isUpsideDown = false;
      this.interpretationUp = interUp;
      this.interpretationDown = interReverse;
      this.effect;
      this.sentence = readingNum;
      this.currSlot = null;
      this.isProtected = false;

      this.x = game.config.width / 2;
      this.y = game.config.height / 2;

      // Set as interactive
      this.setInteractive();
    }

    update() {
      if (this.isUpsideDown) { 
        this.flipY = true; 
      } else {
        this.flipY = false;
      }
    }
}