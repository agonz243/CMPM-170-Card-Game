let effects = [];


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
        tempArr[i].currSlot = scene.slots[i].currSlot;
        scene.slots[i] = tempArr[i];
    }
}

let cthulhuEffect = function(scene, card) {
    // Flip the card to the right of cthulhu
    let currIndex = scene.slots.indexOf(card);
    let nextIndex = currIndex + 1;

    if (nextIndex > 2) { nextIndex = 0; }

    let cardToFlip = scene.slots[nextIndex];
    cardToFlip.isUpsideDown = !cardToFlip.isUpsideDown;
}

let azathothEffect = function(scene, card) {
    if (card.isUpsideDown) {
        card.isUpsideDown = !card.isUpsideDown;
    }
}

let hydraEffect = function(scene, card) {
    // Get cards to the left and right
    let currIndex = scene.slots.indexOf(card);
    let nextIndex = currIndex + 1;
    let prevIndex = currIndex - 1;

    if (nextIndex > 2) { nextIndex = 0; }
    if (prevIndex < 0) { prevIndex = 2; }

    let nextCard = scene.slots[nextIndex];
    let prevCard = scene.slots[prevIndex];

    if (nextCard.isUpsideDown && nextCard.cardSuit == "Old One") {
        nextCard.isUpsideDown = false;
    }

    if (prevCard.isUpsideDown && prevCard.cardSuit == "Old One") {
        prevCard.isUpsideDown = false;
    }
}

effects.push(hydraEffect);
