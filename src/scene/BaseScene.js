import Phaser from "phaser";

class BaseScene extends Phaser.Scene {

    constructor(sceneName, config) {
        super(sceneName);

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
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
    }

    /**
     * Handle screen updates
     */
    update() {
    }

}

export default BaseScene;