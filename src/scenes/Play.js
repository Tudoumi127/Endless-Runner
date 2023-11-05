class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('placeholder', './assets/starfield.png');
    }

    create(){
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.placeholder = this.add.tileSprite(0, 0, 720, 480, 'placeholder').setOrigin(0,0);

        this.player = new Player(this, game.config.width/4, game.config.height - 100, '').setOrigin(0,0);
        this.platform1 = new Platform(this, game.config.width + borderUISize*3, borderUISize*5+borderPadding*2, '').setOrigin(0,0);

        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00F00).setOrigin(0,0);
        this.ground = this.add.tileSprite(0, game.config.height - 42, game.config.width, game.config.height/6, '').setOrigin(0,0);
        this.physics.add.existing(this.ground, true);
        //this.physics.add.existing(this.player, true);

        this.physics.add.collider(this.ground, this.player);
        this.physics.add.collider(this.player, this.platform1);
    }

    update(){
        this.placeholder.tilePositionX += 4;
        this.player.update();
        this.platform1.update();
    }
}