class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){

    }

    create(){
        //this.add.image('placeholder1', './assets/starfield.png');

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        /*add a background image for the menu*/
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ENDLESS RUNNER', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & SPACE to jump', menuConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    


    update(){
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('playScene');
        }
    }
}
