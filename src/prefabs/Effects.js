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

    if (!cardToFlip.isProtected) {
       cardToFlip.isUpsideDown = !cardToFlip.isUpsideDown; 
    }
    
}

let azathothEffect = function(scene, card) {
    if (card.isUpsideDown && !card.isProtected) {
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

    if (nextCard.isUpsideDown && !nextCard.isProtected && nextCard.cardSuit == "Old One") {
        nextCard.isUpsideDown = false;
    }

    if (prevCard.isUpsideDown && !nextCard.isProtected && prevCard.cardSuit == "Old One") {
        prevCard.isUpsideDown = false;
    }
}

let lilithEffect = function(scene, card) {
        // Get card to the left
        let currIndex = scene.slots.indexOf(card);
        let prevIndex = currIndex - 1;

        if (prevIndex < 0) { prevIndex = 2; }

        let prevCard = scene.slots[prevIndex];

        prevCard.isProtected = true;
}


let madmanEffect = function(scene, card) {
    // Get cards to the left and right
    let currIndex = scene.slots.indexOf(card);
    let nextIndex = currIndex + 1;
    let prevIndex = currIndex - 1;

    if (nextIndex > 2) { nextIndex = 0; }
    if (prevIndex < 0) { prevIndex = 2; }

    let nextCard = scene.slots[nextIndex];
    let prevCard = scene.slots[prevIndex];

    if (card.isUpsideDown) {
        if (!prevCard.isProtected) {
            prevCard.isUpsideDown = !prevCard.isUpsideDown;
        }

        if (!nextCard.isProtected) {
            nextCard.isUpsideDown = !nextCard.isUpsideDown;
        }
    }
}

let scholarEffect = function(scene, card) {
    // Get card to the left
    let currIndex = scene.slots.indexOf(card);
    let prevIndex = currIndex - 1;

    if (prevIndex < 0) { prevIndex = 2; }

    let prevCard = scene.slots[prevIndex];

    prevCard.isUpsideDown = card.isUpsideDown;
}

//Gleeth Functional
//Moves all cards Left
let gleethEffect = function (scene) {
    let tempArr = [null, null, null];

    // Flip all cards
    for (let i = 2; i > -1; i--) {
        console.log(i);
        let currCard = scene.slots[i];
        let nextCard;
        let nextIndex;
        if (i == 0) {
            nextCard = scene.slots[2];
            nextIndex = 2;
        } else {
            nextCard = scene.slots[i - 1];
            nextIndex = i - 1;
        }

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

//Inpesca Functional
//Can flip any card on the field randomly
let inpescaEffect = function (scene) {
    let tempArr = [null, null, null];
    //var SwapNum = Phaser.Math.Between(0, 5);
    var FlipNum = Phaser.Math.Between(0,5);
    console.log(FlipNum);
    // Flip all cards
    for (let i = 0; i < FlipNum; i++) {
        let currCard = scene.slots[i%3];
        let nextCard;
        let nextIndex;
        if (i%3 == 2) {
            nextCard = scene.slots[0];
            nextIndex = 0;
        } else {
            nextCard = scene.slots[i%3 + 1];
            nextIndex = i%3 + 1;
        }
        if (!cardToFlip.isProtected) {
            cardToFlip.isUpsideDown = !cardToFlip.isUpsideDown; 
            scene.tweens.add({
                targets: currCard,
                x: currCard.currSlot.x - 10,
                y: currCard.currSlot.y + 10,
                scale: 0.21,
                duration: 2000,
                ease: 'Power2',
                yoyo: true,
                completeDelay: 3000
            });
        }
        
    }

}

//MotherStar: Functioning
//Makes all cards upright
let msEffect = function (scene, card) {
    console.log("Cards are in play");
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
        if(currCard.isUpsideDown == true){
            currCard.isUpsideDown = false;
        }
        scene.tweens.add({
            targets: currCard,
            x: currCard.currSlot.x - 10,
            y: currCard.currSlot.y + 10,
            scale: 0.21,
            duration: 2000,
            ease: 'Power2',
            yoyo: true,
            completeDelay: 3000
        });
        
    }
}


//Yog-Sothoth Effect Functional
//Swaps the cards on the right and left
let yogEffect = function (scene, card) {
    let tempArr = [scene.slots[2], scene.slots[1], scene.slots[0]];
    console.log("Testing Swap");
    console.log(tempArr[0],tempArr[1],tempArr[2]);
    console.log(scene.slots[0],scene.slots[1],scene.slots[2]);

    let rightCard = scene.slots[2];
    let leftCard = scene.slots[0];

    if(rightCard){
        scene.tweens.add({
            targets: rightCard,
            x: leftCard.currSlot.x,
            y: leftCard.currSlot.y,
            duration: 2000,
            ease: 'Power2',
            completeDelay: 3000
        });
    }
    if(leftCard){
        scene.tweens.add({
            targets: leftCard,
            x: rightCard.currSlot.x,
            y: rightCard.currSlot.y,
            duration: 2000,
            ease: 'Power2',
            completeDelay: 3000
        });
    }
   

    // Move cards to their new positions
    for (let i = 0; i < 3; i++) {
        tempArr[i].currSlot = scene.slots[i].currSlot;
        scene.slots[i] = tempArr[i];
    }
}

//Wilbur Whatley Effect Functional
//Flips any cultist Suit cards
let wwEffect = function (scene, card) {
    console.log("Wibur Whatley Effect");
    let currIndex = scene.slots.indexOf(card)
    let prevIndex = currIndex - 1;
    if(prevIndex < 0){prevIndex = 2};
    
    let nextIndex = currIndex + 1;
    if(nextIndex > 2){nextIndex = 0};
    
    //Get the 2 cards that are not Wilbur Whatley
    let prevCard = scene.slots[prevIndex];
    let nextCard = scene.slots[nextIndex];
    //Check to see if Card on Right is protected and is a Cultist
    if (!nextCard.isProtected && nextCard.cardSuit == "Cultist") {
        if(nextCard.isUpsideDown == true){
            nextCard.isUpsideDown = false;
        }
        else if(nextCard.isUpsideDown == false){
            nextCard.isUpsideDown = true;
        }
    }
    //Check to see if Card on Left is protected and is a Cultist
    if (!prevCard.isProtected && prevCard.cardSuit == "Cultist") {
        if(prevCard.isUpsideDown == true){
            prevCard.isUpsideDown = false;
        }
        else if(prevCard.isUpsideDown == false){
            prevCard.isUpsideDown = true;
        }
    }
}

effects.push(cthulhuEffect);
effects.push(azathothEffect);
effects.push(hydraEffect);
effects.push(lilithEffect);
effects.push(madmanEffect);
effects.push(scholarEffect);
effects.push(gleethEffect);
effects.push(inpescaEffect);
effects.push(msEffect);
effects.push(yogEffect);
effects.push(nyaEffect);
effects.push(wwEffect);
