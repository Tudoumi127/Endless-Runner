class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload() {
        this.load.path = './assets/'

        this.load.image('placeholder', 'starfield.png');
        this.load.image('background', 'backgroundER.png');
        this.load.image('menubg', 'MenuBG.png');
        this.load.image('logo', 'logo.png');
        this.load.image('rocket', 'rocket.png');
        this.load.image('rocks', 'rocks.png');
        this.load.image('upperrocks', 'upperrocks.png');
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

        this.scene.start('menuScene')
    }
}