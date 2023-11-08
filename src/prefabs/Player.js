class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.velocity = -500;
        this.hurtTimer = 200;
        this.body.setGravityY(800);
    
        this.FSM = new StateMachine('idle', {
            idle: new IdleState(),
            //move: new MoveState(),
            jump: new JumpState(),
            //swing: new SwingState(),
            //dash: new DashState(),
            hurt: new HurtState(),
        }, [scene, this])
    }

}

// hero-specific state classes
class IdleState extends State {
    enter(scene, player) {
        //player.setVelocity(0)
        player.anims.play(`idle`)
        //hero.anims.stop()
    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const { space } = scene.keys
        //const HKey = scene.keys.HKey

        const hurt = scene.keys.hurt
        const jump = scene.keys.space

        // transition to jump if pressing space
        //if(Phaser.Input.Keyboard.JustDown(space)) {

        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('jump')
            return
        }
        if(scene.isCollided == true){
            this.stateMachine.transition('hurt')
            return
        }
    }
}

class JumpState extends State {
    enter(scene, player) {
        player.setVelocityY(player.velocity);
        player.anims.play(`jump`)
        player.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
        //this.stateMachine.transition('idle')
    }

    execute(scene, player) {
        if(scene.isCollided == true){
            this.stateMachine.transition('hurt')
            return
        }
    }
}

class HurtState extends State {
    enter(scene, player) {
        player.setVelocityY(0)
        scene.isCollided = false
        player.setTint(0xFF0000) //turn red
        //player.anims.stop()
        player.anims.play(`hurt`)

        player.setVelocityX(player.velocity/2)
        scene.time.delayedCall(player.hurtTimer, ()=>{
            player.setVelocityX(0)
            player.clearTint()
            this.stateMachine.transition('idle')
        })
    }
}
