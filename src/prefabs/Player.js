class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.velocity = -500;
        scene.physics.add.existing(this, false);
        this.body.setGravityY(800);
    
        this.FSM = new StateMachine('idle', {
            idle: new IdleState(),
            //move: new MoveState(),
            jump: new JumpState(),
            //swing: new SwingState(),
            //dash: new DashState(),
            //hurt: new HurtState(),
        }, [scene, this])
    }

}

// hero-specific state classes
class IdleState extends State {
    enter(scene, player) {
        //player.setVelocity(0)
        //hero.anims.play(`walk-${hero.direction}`)
        //hero.anims.stop()
    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const { space } = scene.keys
        //const HKey = scene.keys.HKey

        // transition to jump if pressing space
        //if(Phaser.Input.Keyboard.JustDown(space)) {

        if(Phaser.Input.Keyboard.JustDown(space)){
            console.log('in the if statement');
            this.stateMachine.transition('jump')
            return
        }
    }
}

class JumpState extends State {
    enter(scene, player) {
        console.log('in jump state');
        player.setVelocityY(player.velocity);
        //hero.anims.play(`swing-${hero.direction}`)
        /*hero.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })*/
        this.stateMachine.transition('idle')
    }
}
