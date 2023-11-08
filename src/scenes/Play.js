class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('placeholder', './assets/starfield.png');
        /*this.load.spritesheet('character', './assets/player.png',{
            frameWidth: 32,
            frameHeight: 32,
        })*/
    }

    create(){
        this.gameOver = false;
        this.isCollided = false;
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.hurt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)

        //keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.placeholder = this.add.tileSprite(0, 0, 720, 480, 'placeholder').setOrigin(0,0);

        this.player = new Player(this, game.config.width/4, game.config.height - 500, 'character', 0).setOrigin(0,0).setScale(1.5);
        this.player.body.setSize(28,32).setOffset(2, 0);
        this.player.body.setCollideWorldBounds(true);
        this.world = this.player.body.touching;

        const newPlatform = new Platform(this, game.config.width + borderUISize*3, borderUISize*5+borderPadding*2, '').setOrigin(0,0);
        this.platforms = this.physics.add.group(config = {
            immovable: true,
        })
        this.platforms.add(newPlatform);

        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00F00).setOrigin(0,0);
        this.ground = this.add.tileSprite(0, game.config.height - 42, game.config.width, game.config.height/6, '').setOrigin(0,0);
        this.physics.add.existing(this.ground, true);

        this.physics.add.collider(this.ground, this.player, () =>{
            this.gameOver = true;
        });
        this.physics.add.collider(this.player, this.platforms, () => {
            this.isCollided = true;
        });
    }

    update(){
        this.placeholder.tilePositionX += 4;
        this.player.update();
        //this.platform1.update();

        this.player.FSM.step();

        this.platforms.getChildren().forEach((platform) => {
            platform.update();

            if(platform.destroyed) {
                platform.destroy();
                this.platforms.remove(platform, true, true);
            }

            if(platform.child && !platform.isFather){
                platform.child = false;
                const newPlatform = new Platform(this, game.config.width + borderUISize*3, Phaser.Math.Between(50, 800), '').setOrigin(0,0);
                this.platforms.add(newPlatform);
                platform.isFather = true;
            }
        })

        if(this.player.x <= 0){
            this.gameOver = true;
        }
    }
}