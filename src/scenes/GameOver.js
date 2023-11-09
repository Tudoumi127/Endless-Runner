class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene")
    }

    create(){
        console.log("its joever");
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        let gameOverConfig = {
            fontFamily: 'Helvetica',
            fontSize: '28px',
            backgroundColor: '#006666',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'GAME OVER', gameOverConfig).setOrigin(0.5);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            //console.log("bruh")
            this.scene.start('playScene')
        }
    }
}