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
        this.speed = 3;
        this.isCollided = false;
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.hurt = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)

        this.difficulty = this.time.addEvent({
            delay: 15000,
            callback: () => {
                this.speed += 3
            },
            callbackScope: this,
            loop: true
        })

        let scoreConfig = {
            fontFamily: 'Palatino',
            fontSize: '20px',
            backgroundColor: '#ADD2E8',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        //tilesprite that will be moved later
        this.placeholder = this.add.tileSprite(0, 0, 720, 480, 'background').setOrigin(0,0);

        //make the player
        this.player = new Player(this, game.config.width/4, game.config.height - 500, 'character', 0).setOrigin(0,0).setScale(1.5);
        this.player.body.setSize(28,32).setOffset(2, 0);
        this.player.body.setCollideWorldBounds(true);
        this.world = this.player.body.touching;

        //bubbles
        const newBubble = new Bubble(this, game.config.width + borderUISize*8, borderUISize*2+borderPadding*5, 'rocket', 0, this.speed).setOrigin(0,0);
        this.bubbles = this.physics.add.group(config = {
            immovable: true,
        })
        this.bubbles.add(newBubble);

        //makes new platforms at random
        const newPlatform = new Platform(this, game.config.width + borderUISize*3, borderUISize*5+borderPadding*2, '', 0, this.speed).setOrigin(0,0);
        this.platforms = this.physics.add.group(config = {
            immovable: true,
        })
        this.platforms.add(newPlatform);

        //ground, physics and colliders
        this.ground = this.add.tileSprite(0, game.config.height - 42, game.config.width, game.config.height/6, '').setOrigin(0,0);
        this.physics.add.existing(this.ground, true);
        this.rocks = this.add.tileSprite(0, 20, 720, 480, 'rocks').setOrigin(0,0);
        this.upperrocks = this.add.tileSprite(0, 0, 720, 480, 'upperrocks').setOrigin(0,0);

        this.physics.add.collider(this.ground, this.player, () =>{
            this.gameOver = true;
        });
        this.physics.add.collider(this.player, this.platforms, () => {
            this.isCollided = true;
        });

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.score, scoreConfig);

        this.physics.add.collider(this.player, this.bubbles, (player, bubble) => {
            bubble.destroy();
            this.score += 1
            for (let i = 0; i<= 5; i++){
                this.bubbles.add(newBubble);
                i+=1
            }
            //bubble.bubIsFather = true;
        })


        this.scoreTracker = this.time.addEvent({
            delay: 50,
            callback: () => {
                this.scoreLeft.text = this.score;
            },
            callbackScope: this,
            loop: true
        })

    }

    update(){
        this.rocks.tilePositionX += 4;
        this.upperrocks.tilePositionX += 4
        this.placeholder.tilePositionX += 2;
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
                const newPlatform = new Platform(this, game.config.width + borderUISize*3, Phaser.Math.Between(50, 300), '', 0, this.speed).setOrigin(0,0);
                this.platforms.add(newPlatform);
                this.platforms.add(newPlatform);
                this.platforms.add(newPlatform);
                platform.isFather = true;
            }
        })

        this.bubbles.getChildren().forEach((bubble) => {
            bubble.update();

            if(bubble.bubDestroyed) {
                this.bubbles.remove(bubble, true, true);
            }
            if(bubble.bubChild && !bubble.bubIsFather){
                bubble.bubChild = false;
                const newBubble = new Bubble(this, game.config.width + borderUISize*6, Phaser.Math.Between(50, 300), 'rocket', 0, this.speed).setOrigin(0,0);
                for (let i = 0; i<= 5; i++){
                    this.bubbles.add(newBubble);
                    i+=1
                }
                bubble.bubIsFather = true;
            }
        })

        //if player hits the left world bound its game over
        if(this.player.x <= 0){
            this.gameOver = true;
        }

        if(this.gameOver == true){
            this.score = 0;
            this.scene.start('gameOverScene');
        }
    }
}