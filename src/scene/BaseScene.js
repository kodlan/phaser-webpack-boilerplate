import Phaser from "phaser";

class BaseScene extends Phaser.Scene {

    constructor(sceneName, config) {
        super(sceneName);

        this.config = config;

        this.screenCenter = [this.config.width / 2, this.config.height / 2];

        this.lineHeight = 42;
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
        this.add.image(0, 0, 'sky').setOrigin(0, 0);

        if (this.config.canGoBack) {
            this.createBack();
        }
    }

    /**
     * Handle screen updates
     */
    update() {
    }

    createMenu(menu, setupMenuEvents) {
        let lastMenuPositionY = 0;

        menu.forEach(menuItem => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
            menuItem.textGameObject = this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5, 1);
            lastMenuPositionY += this.lineHeight;
            setupMenuEvents(menuItem);
        })
    }

    createBack() {
        const backButton = this.add.image(this.config.width - 10, this.config.height - 10, "back")
                .setInteractive()
                .setScale(2)
                .setOrigin(1, 1);

        backButton.on("pointerdown", () => {
            this.scene.start("MenuScene");
        });
    }

}

export default BaseScene;