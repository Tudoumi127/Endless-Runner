class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //this.load.image('placeholder', './assets/starfield.png');
    }

    create(){
        this.gameOver = false;
        this.score = 0;
        this.isCollided = false;
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.hurt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)

        //tilesprite that will be moved later
        this.placeholder = this.add.tileSprite(0, 0, 720, 480, 'placeholder').setOrigin(0,0);

        //make the player
        this.player = new Player(this, game.config.width/4, game.config.height - 500, 'character', 0).setOrigin(0,0).setScale(1.5);
        this.player.body.setSize(28,32).setOffset(2, 0);
        this.player.body.setCollideWorldBounds(true);
        this.world = this.player.body.touching;

        //makes new platforms at random
        const newPlatform = new Platform(this, game.config.width + borderUISize*3, borderUISize*5+borderPadding*2, '').setOrigin(0,0);
        this.platforms = this.physics.add.group(config = {
            immovable: true,
        })
        this.platforms.add(newPlatform);

        //ground, physics and colliders
        this.ground = this.add.tileSprite(0, game.config.height - 42, game.config.width, game.config.height/6, '').setOrigin(0,0);
        this.physics.add.existing(this.ground, true);

        this.physics.add.collider(this.ground, this.player, () =>{
            this.gameOver = true;
        });
        this.physics.add.collider(this.player, this.platforms, () => {
            this.isCollided = true;
        });

        //score tracker
        //this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding/2)
        /*this.DistanceTraveled = this.time.addEvent({
            delay: 500,
            callback: () => {
                let distance = Math.ceil(this.score/10);
                this.scoreLeft.text = distance;
            },
            callbackScope: this,
            loop: true
        })*/

    }

    update(){
        this.placeholder.tilePositionX += 4;
        this.player.update();

        //increment fsm
        this.player.FSM.step();

        //function for making new platforms randomly
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
                this.platforms.add(newPlatform);
                this.platforms.add(newPlatform);
                platform.isFather = true;
            }
        })

        //if player hits the left world bound its game over
        if(this.player.x <= 0){
            this.gameOver = true;
        }

        if(this.gameOver == true){
            this.scene.start('gameOverScene');
        }
    }
}