import BaseScene from "./BaseScene";

class PreloadScene extends BaseScene {

    constructor(config) {
        super("PreloadScene", config);
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