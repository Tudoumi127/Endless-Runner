class Platform extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this, false);
        this.moveSpeed = 3;
        scene.add.existing(this);
        this.setImmovable(true);
        
        this.child = false;
        this.isFather = false;
        this.destroyed = false;
    }

    update(){
        this.x -= this.moveSpeed;

        if (this.x <= game.config.width/2){
            console.log("p");
            this.child = true;
        }

    }

    reset(){
        this.x = game.config.width;
    }
}