class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){

    }

    create(){
        //this.add.image('placeholder1', './assets/starfield.png');

        let menuConfig = {
            fontFamily: 'Palatino',
            fontSize: '28px',
            backgroundColor: '#ADD2E8',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let startConfig = {
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

        /*add a background image for the menu*/
        this.bgimage = this.add.image(0, 0, 'menubg').setOrigin(0,0);
        this.logo = this.add.image(0, 0, 'logo').setOrigin(0,0);
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'SEA STRIDER', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 150, 'Use SPACE to jump and collect bubbles', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 180 , "Don't fall to the bottom", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 220, 'Press SPACE to start', startConfig).setOrigin(0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        let music = this.sound.add('loopmusic')
        music.loop = true
        music.play()
    }

    


    update(){
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.sound.play('button')
            this.scene.start('playScene');
        }
    }
}
