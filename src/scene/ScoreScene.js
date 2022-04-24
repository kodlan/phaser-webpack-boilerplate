import BaseScene from "./BaseScene";

class ScoreScene extends BaseScene {

    constructor(config) {
        super("ScoreScene", {...config, canGoBack: true});

        this.screenCenter = [this.config.width / 2, this.config.height / 2];
        this.fontOptions = { fontSize: '32px', fill: '#fff' };
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
        this.createScore();
    }

    /**
     * Handle screen updates
     */
    update() {
    }

    createScore(){
        const bestScore = localStorage.getItem("bestScore");
        this.add.text(...this.screenCenter, `Best score ${bestScore}`, this.fontOptions).setOrigin(0.5, 1);
    }
}

export default ScoreScene;