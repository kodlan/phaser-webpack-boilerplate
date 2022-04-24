import BaseScene from "./BaseScene";

class PauseScene extends BaseScene {

    constructor(config) {
        super("PauseScene", config);

        this.menu = [
            { scene: 'GameScene', text: 'Continue' },
            { scene: 'MenuScene', text: 'Exit' },
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
            if (menuItem.scene && menuItem.text === 'Continue') {
                // shutting down the pause screen and resuming game scene
                this.scene.stop();
                this.scene.resume(menuItem.scene);
            } else {
                // shutting down game scene, pause scene and running menu
                this.scene.stop('GameScene');
                this.scene.start(menuItem.scene);
            }
        });
    }

}

export default PauseScene;