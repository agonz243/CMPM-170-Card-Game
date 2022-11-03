let effects = [];

let testEffect = function (scene) {
    console.log(scene.card1.cardName);
}

effects.push(testEffect);

let nyaEffect = function (scene) {
    let tempArr = [null, null, null];

    // Flip all cards
    for (let i = 0; i < 3; i++) {
        let currCard = scene.slots[i];
        let nextCard;
        let nextIndex;
        if (i == 2) {
            nextCard = scene.slots[0];
            nextIndex = 0;
        } else {
            nextCard = scene.slots[i + 1];
            nextIndex = i + 1;
        }

        currCard.isUpsideDown = !currCard.isUpsideDown;
        // Shift cards in slots array over by one
        scene.tweens.add({
            targets: currCard,
            x: nextCard.currSlot.x,
            y: nextCard.currSlot.y,
            duration: 3000,
            ease: 'Power2',
            completeDelay: 3000
        });

        // Populate new array with updated positions
        tempArr[nextIndex] = currCard;
    }

    // Move cards to their new positions
    for (let i = 0; i < 3; i++) {
        scene.slots[i] = tempArr[i];
    }
}

effects.push(nyaEffect);
