class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload() {
        this.load.path = './assets/'

        this.load.audio('loopmusic', 'loopmusic.mp3')
        this.load.audio('button', 'button.mp3')
        this.load.audio('jump', 'jump.mp3')
        this.load.audio('thud', 'thud.mp3')
        this.load.audio('pop', 'pop.mp3')

        this.load.image('placeholder', 'starfield.png');
        this.load.image('background', 'backgroundER.png');
        this.load.image('midground', 'midground.png');
        this.load.image('menubg', 'MenuBG.png');
        this.load.image('logo', 'logo.png');
        this.load.image('rocket', 'rocket.png');
        this.load.image('rocks', 'rocks.png');
        this.load.image('upperrocks', 'upperrocks.png');
        this.load.spritesheet('bubble', 'bubble.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet('turtle', 'turtle.png', {
            frameWidth: 50,
            frameHeight: 32,
        })
        this.load.spritesheet('character', 'player.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        
    }

    create() {
        this.anims.create({
            key: 'idle',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 0, 
                end: 1
            })
        })

        this.anims.create({
            key: 'jump',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('character', {
                frames: [ 2, 3, 3, 3, 3]
            })
        })

        this.anims.create({
            key: 'hurt',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('character', {
                frames: [4, 4, 4]
            })
        })

        this.anims.create({
            key: 'turtleIdle',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('turtle', {
                frames: [0, 1, 2]
            })
        })

        this.anims.create({
            key: 'bubbleIdle',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bubble', {
                frames: [0, 1]
            })
        })

        this.anims.create({
            key: 'bubblePop',
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('bubble', {
                frames: [2, 3, 4]
            })
        })

        this.scene.start('menuScene')
    }
}