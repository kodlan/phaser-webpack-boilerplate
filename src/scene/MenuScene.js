import BaseScene from "./BaseScene";

class MenuScene extends BaseScene {

    constructor(config) {
        super("MenuScene", config);

        this.menu = [
            { scene: 'GameScene', text: 'Play' },
            { scene: 'ScoreScene', text: 'Score' },
            { scene: null, text: 'Exit' }
        ]
    }

    /**
     * Preload resources
     */
    preload() {
    }

    /**
     * Create resources
     */
    create() {
        super.create();

        this.createMenu(this.menu, (menuItem) => this.setupMenuEvents(menuItem));
    }

    /**
     * Handle screen updates
     */
    update() {
    }

    setupMenuEvents(menuItem) {
        const textGameObject = menuItem.textGameObject;
        textGameObject.setInteractive();
        
        textGameObject.on('pointerover', () => {
            textGameObject.setStyle( {fill: '#ff0'} );
        });

        textGameObject.on('pointerout', () => {
            textGameObject.setStyle( {fill: '#fff'} );
        })

        textGameObject.on('pointerup', () => {
            menuItem.scene && this.scene.start(menuItem.scene);

            if (menuItem.text === 'Exit') {
                this.game.destroy(true);
            }
        });
    }

}

export default MenuScene;