// Prefab for the cards

class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, name, suit, texture ) {
      super(scene, name, suit, texture);

      // Set attributes
      this.cardName = name;
      this.cardSuit = suit;
      this.isUpsideDown = false;
      this.interpretationUp = "";
      this.interpretationDown = "";
      this.effect;
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