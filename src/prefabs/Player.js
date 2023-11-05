class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.velocity = -200;
        scene.physics.add.existing(this, false);
        this.body.setGravityY(800);
    }

    FSM = new StateMachine('idle', {
        idle: new IdleState(),
        //move: new MoveState(),
        jump: new JumpState(),
        //swing: new SwingState(),
        //dash: new DashState(),
        //hurt: new HurtState(),
    }, [this, this.hero])

    update(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.setVelocityY(this.velocity);
        }
    }
}

// hero-specific state classes
class IdleState extends State {
    enter(scene, player) {
        hero.setVelocity(0)
        //hero.anims.play(`walk-${hero.direction}`)
        //hero.anims.stop()
    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const { space } = scene.keys
        //const HKey = scene.keys.HKey

        // transition to jump if pressing space
        //if(Phaser.Input.Keyboard.JustDown(space)) {

        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.stateMachine.transition('jump')
            return
        }
    }
}

class JumpState extends State {
    enter(scene, player) {
        this.setVelocityY(this.velocity);
        //hero.anims.play(`swing-${hero.direction}`)
        hero.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }
}
