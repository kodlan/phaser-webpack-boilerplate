import BaseScene from "./BaseScene";

class MenuScene extends BaseScene {

    constructor(config) {
        super("MenuScene", config);
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
        this.scene.start("GameScene");
    }

    /**
     * Handle screen updates
     */
    update() {
    }

}

export default MenuScene;