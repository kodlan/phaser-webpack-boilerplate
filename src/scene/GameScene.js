import BaseScene from "./BaseScene";

const PIPE_TO_RENDER = 4;
const PIPE_VERTICAL_DISTANCE_RANGE = [150, 250];
const PIPE_VERTICAL_POSITION_RANGE = [20, 580];
const PIPE_HORIZONTAL_DISTANCE = 400;
const VELOCITY = 300;

class GameScene extends BaseScene {

    constructor(config) {
        super("GameScene", config);

        this.bird = null;
        this.pipes = null;
        this.pauseButton = null;
        this.isPaused = false;

        this.score = 0;
        this.scoreText = null;
        this.bestScoreText = null;
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
        this.createBird();
        this.createPipesGroup();
        this.createColliders();
        this.createScore();
        this.createPause();
        this.initControls();
        this.initEvents();

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('bird', { start: 9, end: 15 }),
            frameRate: 8,
            repeat: -1
        });

        this.bird.play('fly');
    }

    /**
     * Handle screen updates
     */
    update() {
        this.checkGameStatus();
        this.recyclePipes();
    }

    createBird() {
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, "bird")
                .setFlipX(true)
                .setScale(3)
                .setOrigin(0, 0);
        this.bird.setBodySize(this.bird.width, this.bird.height - 8);
        this.bird.body.gravity.y = this.config.gravity;
        this.bird.setCollideWorldBounds(true);
    }

    createPipesGroup() {
        this.pipes = this.physics.add.group();
        this.createPipes();
    }

    initControls() {
        this.input.on('pointerdown', this.flap, this);
        this.input.keyboard.on('keydown_SPACE', this.flap, this);
    }

    createPipes() {
        for (var i = 0; i < PIPE_TO_RENDER; i ++) {
          let pipePair = this.generatePipes();
          this.positionPipes(...pipePair);
        }
        this.pipes.setVelocityX(-200);
    }

    createColliders() {
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
    }

    createScore() {
        this.score = 0;
        this.scoreText = this.add.text(16, 16, `Score: ${0}`, {fontSize: '32px', fill: "#000"});
        
        const bestScore = localStorage.getItem("bestScore");
        this.bestScoreText = this.add.text(16, 50, `Best score ${bestScore || 0}`, { fontSize: '18px', fill: "#000" });
    }

    createPause() {
        this.isPaused = false;
        this.pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, "pause")
                .setInteractive()
                .setScale(3)
                .setOrigin(1, 1);

        this.pauseButton.on("pointerdown", () => {
            this.isPaused = true;
            this.physics.pause();
            this.scene.pause();
            this.scene.launch("PauseScene");
        });
    }

    generatePipes() {
        let pipeTop = this.pipes.create(-200, -200, 'pipe')
                            .setImmovable(true)
                            .setOrigin(0, 1);
        let pipeBottom = this.pipes.create(-200, -200, 'pipe')
                            .setImmovable(true)
                            .setOrigin(0, 0);
        return [pipeTop, pipeBottom];
    }

    positionPipes(pipeTop, pipeBottom) {
        let verticalGap = Phaser.Math.Between(...PIPE_VERTICAL_DISTANCE_RANGE);
      
        // gap center coordinates
        let x = this.getRightMostPipe() + PIPE_HORIZONTAL_DISTANCE;
        let y = Phaser.Math.Between(PIPE_VERTICAL_POSITION_RANGE[0] + verticalGap / 2, PIPE_VERTICAL_POSITION_RANGE[1] - verticalGap / 2)
      
        // top - y coordinate of gap top
        // bottom - y coordinate of gap bottom
        let top = y - verticalGap / 2;
        let bottom = y + verticalGap / 2;
      
        pipeTop.x = x;
        pipeTop.y = top;
      
        pipeBottom.x = x;
        pipeBottom.y = bottom;
    }
      
    getRightMostPipe() {
        let rightMostX = 0;
      
        this.pipes.getChildren().forEach(function (pipe) {
            rightMostX = Math.max(pipe.x, rightMostX);
        });
      
        return rightMostX;
    }

    resetBirdPosition() {
        this.bird.x = this.config.startPosition.x;
        this.bird.y = this.config.startPosition.y;
        this.bird.body.velocity.y = 0;
    }

    flap() {
        if (!this.isPaused) {
            this.bird.body.velocity.y = -VELOCITY;
        }
    }
      
    recyclePipes() {
        const tempPipes = [];
      
        this.pipes.getChildren().forEach(pipe => {
            if (pipe.getBounds().right <= 0) {
                // recycle the pipe
                tempPipes.push(pipe);
                if (tempPipes.length === 2) {
                    this.positionPipes(...tempPipes);
                    this.incScrore();
                }
            }
        })
    }

    checkGameStatus() {
        if (this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0) {
            this.gameOver();
        }
    }

    gameOver() {
        this.physics.pause();
        this.bird.setTint(0xff0000);

        

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.restart();
            },
            loop: false
        });
    }

    incScrore() {
        this.score ++;
        this.scoreText.setText(`Score: ${this.score}`);

        this.saveScore();
    }

    saveScore() {
        const bestStoredScoreText = localStorage.getItem("bestScore");
        const bestStoredScore = bestStoredScoreText && parseInt(bestStoredScoreText, 10);

        if (!bestStoredScore || this.score > bestStoredScore) {
            console.log("saving score - " + this.score);
            localStorage.setItem("bestScore", this.score);
        }
    }

    initEvents() {
        if (this.pauseEvent) {
            return;
        }

        this.pauseEvent = this.events.on("resume", () => {
            this.initTime = 3;
            this.countDownText = this.add.text(...this.screenCenter, 'Fly in: ' + this.initTime, this.fontOptions).setOrigin(0.5);
            this.timedEvent = this.time.addEvent({
                delay: 1000,
                callback: this.countdown,
                callbackScope: this,
                loop: true
            })
        });
    }

    countdown() {
        this.initTime --;
        this.countDownText.setText('Fly in: ' + this.initTime);
        
        if (this.initTime <= 0) {
            this.isPaused = false;
            this.countDownText.setText('');
            this.physics.resume();
            this.timedEvent.remove();
        }
    }
}

export default GameScene;