//part 543289402 of my games suffering because I refuse to pay for aseprite
//#justice for browser pixel programs 2023

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
            debug: true
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