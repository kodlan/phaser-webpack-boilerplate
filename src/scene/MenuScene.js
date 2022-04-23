import Phaser from "phaser";

class MenuScene extends Phaser.Scene {

    constructor(config) {
        super("MenuScene");

        this.config = config;
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
        this.add.image(0, 0, 'sky').setOrigin(0);
        this.scene.start("GameScene");
    }

    /**
     * Handle screen updates
     */
    update() {
    }

}

export default MenuScene;