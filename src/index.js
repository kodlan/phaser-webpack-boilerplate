
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

new Phaser.Game(config);

function preload () {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}

const VELOCITY = 300;
const GRAVITY = 400;
const INITIAL_X = config.width / 10;
const INITIAL_Y = config.height / 2;
const PIPE_VERTICAL_DISTANCE_RANGE = [150, 250];
const PIPE_VERTICAL_POSITION_RANGE = [20, 580];
const PIPE_TO_RENDER = 4;
const PIPE_HORIZONTAL_DISTANCE = 400;

let bird = null;
let pipes = null;

/**
 * Create scene
 */
function create () {
  this.add.image(400, 300, 'sky');

  bird = this.physics.add.sprite(INITIAL_X, INITIAL_Y, "bird").setOrigin(0, 0);
  bird.body.gravity.y = GRAVITY;

  // create pipes
  pipes = this.physics.add.group();
  createPipes(pipes);
  
  // set input handlers
  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

function createPipes(group) {
  for (var i = 0; i < PIPE_TO_RENDER; i ++) {
    let pipePair = generatePipes(group);
    positionPipes(...pipePair);
  }

  pipes.setVelocityX(-200);
}

function generatePipes(group) {
  let pipeTop = group.create(-200, -200, 'pipe').setOrigin(0, 1);
  let pipeBottom = group.create(-200, -200, 'pipe').setOrigin(0, 0);

  return [pipeTop, pipeBottom];
}

function positionPipes(pipeTop, pipeBottom) {
  let verticalGap = Phaser.Math.Between(...PIPE_VERTICAL_DISTANCE_RANGE);

  // gap center coordinates
  let x = getRightMostPipe() + PIPE_HORIZONTAL_DISTANCE;
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

function getRightMostPipe() {
  let rightMostX = 0;

  pipes.getChildren().forEach(function (pipe) {
    rightMostX = Math.max(pipe.x, rightMostX);
  });

  return rightMostX;
}

/**
 * Handle update
 */
function update() {
  if (bird.y > config.height || bird.y < 0) {
    resetBirdPosition();
  }

  recyclePipes();
}

function resetBirdPosition() {
  bird.x = INITIAL_X;
  bird.y = INITIAL_Y;
  bird.body.velocity.y = 0;
}
    
function flap() {
  bird.body.velocity.y = -VELOCITY;
}

function recyclePipes() {

  const tempPipes = [];

  pipes.getChildren().forEach(pipe => {
    if (pipe.getBounds().right <= 0) {
      // recycle the pipe
      tempPipes.push(pipe);
      if (tempPipes.length === 2) {
        console.log("recycling");
        positionPipes(...tempPipes);
      }
    }
  })

}
