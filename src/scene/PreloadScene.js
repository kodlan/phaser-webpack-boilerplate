import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {

    constructor(config) {
        super("PreloadScene");
    }

    /**
     * Preload resources
     */
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/pipe.png');
        this.load.image('pause', 'assets/pause.png');
    }

    /**
     * Create resources
     */
    create() {
        this.scene.start("MenuScene");
    }

    /**
     * Handle screen updates
     */
    update() {
    }

}

export default PreloadScene;