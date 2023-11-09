/* 

Lily Chen 

Game Name: Sea Strider

Hours: A lot. Probably 30

Technically interesting: I implemented two different types of objects, the bubbles
that the player should aim to pop and the turtles that push the player backwards.
The challenge of the game is to maneuver around the turtles so they don't push you
off screen into game over while also not letting yourself hit the rocks at the bottom
and trying to pop as many bubbles as you can. Both the bubbles and the turtles spawn
at random Y locations

Visual Style: I refused to shill 20 bucks for Aseprite so I've been suffering with
browser programs like Piskel and mouse art but even so I tried to make the game look cute specifically
with the animated sprites. The idea is that the game's visuals should communicate to
the player that its a laid back game with a simple premise- the "enemy obstacles" are
also just sea turtles minding their own business

Other notes: The game's difficulty increases every 15 seconds, this is when all obstacles
start to move faster. The score is incremented in the top left corner- it counts how many
bubbles you've popped

All sound effects are royalty free and were taken from Pixabay.com: https://pixabay.com/

*/
let config = {
    type: Phaser.CANVAS,
    //width: 640,
    width: 720,
    height: 480,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade:{
            debug: false
        }
    },
    scene: [ Load, Menu, Play, GameOver ]
}

let game = new Phaser.Game(config);
/*let keyF;
let keyR;
let keyLEFT;
let keyRIGHT;*/
let keyR;
let keySPACE;

//reserve keyboard vars

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;