class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('placeholder', './assets/starfield.png');
        this.load.spritesheet('character', './assets/CHaracter_002.png',{
            frameWidth: 48,
            frameHeight: 48,
        })
    }

    create(){
        this.keys = this.input.keyboard.createCursorKeys();
        //keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.placeholder = this.add.tileSprite(0, 0, 720, 480, 'placeholder').setOrigin(0,0);

        this.player = new Player(this, game.config.width/4, game.config.height - 100, 'character', 1).setOrigin(0,0);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(30,38).setOffset(9, 10);

        const newPlatform = new Platform(this, game.config.width + borderUISize*3, borderUISize*5+borderPadding*2, '').setOrigin(0,0);
        //this.platform1 = new Platform(this, game.config.width + borderUISize*3, borderUISize*5+borderPadding*2, '').setOrigin(0,0);
        this.platforms = this.physics.add.group(config = {
            immovable: true,
        })
        this.platforms.add(newPlatform);

        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00F00).setOrigin(0,0);
        this.ground = this.add.tileSprite(0, game.config.height - 42, game.config.width, game.config.height/6, '').setOrigin(0,0);
        this.physics.add.existing(this.ground, true);
        //this.physics.add.existing(this.player, true);

        this.physics.add.collider(this.ground, this.player);
        this.physics.add.collider(this.player, this.platforms, () => {
            //this.player.setVelocityX(-400);
        });
    }

    update(){
        //console.log(this.player.body.touching)
        this.placeholder.tilePositionX += 4;
        this.player.update();
        //this.platform1.update();

        this.player.FSM.step();

        this.platforms.getChildren().forEach((platform) => {
            //console.log(platform.child, platform.isFather);
            platform.update();

            if(platform.destroyed) {
                platform.destroy();
                this.platforms.remove(platform, true, true);
            }

            if(platform.child && !platform.isFather){
                platform.child = false;
                //console.log("im gonna make a new platform");
                const newPlatform = new Platform(this, game.config.width + borderUISize*3, Phaser.Math.Between(50, 800), '').setOrigin(0,0);
                this.platforms.add(newPlatform);
                platform.isFather = true;
            }
        })
    }
}