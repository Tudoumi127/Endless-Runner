class Platform extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, movespeed){
        super(scene, x, y, texture, frame, movespeed);

        scene.physics.add.existing(this, false);
        this.moveSpeed = movespeed;
        scene.add.existing(this);
        this.setImmovable(true);
        
        this.child = false;
        this.isFather = false;
        this.destroyed = false;
    }


    update(){
        this.x -= this.moveSpeed;

        if (this.x <= game.config.width/2){
            this.child = true;
        }

    }

    reset(){
        this.x = game.config.width;
    }
}