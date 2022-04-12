
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
let pipeTop = null;
let pipeBottom = null;
let pipes = null;

function create () {
  this.add.image(400, 300, 'sky');

  bird = this.physics.add.sprite(INITIAL_X, INITIAL_Y, "bird").setOrigin(0, 0);
  bird.body.gravity.y = GRAVITY;

  // create pipes
  pipes = this.physics.add.group();
  createPipes(this, pipes);
  pipes.setVelocityX(-200);

  // set input handlers
  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

function createPipes(thiz, group) {
  let x = PIPE_HORIZONTAL_DISTANCE;
  for (var i = 0; i < PIPE_TO_RENDER; i ++) {
    createPipePair(thiz, x, group);
    x += PIPE_HORIZONTAL_DISTANCE;
  }
}

function createPipePair(thiz, x, group) {
  let verticalGap = Phaser.Math.Between(...PIPE_VERTICAL_DISTANCE_RANGE);

  // gap center coordinates
  // let x = config.width / 2;
  let y = Phaser.Math.Between(PIPE_VERTICAL_POSITION_RANGE[0] + verticalGap / 2, PIPE_VERTICAL_POSITION_RANGE[1] - verticalGap / 2)

  // top - y coordinate of gap top
  // bottom - y coordinate of gap bottom
  let top = y - verticalGap / 2;
  let bottom = y + verticalGap / 2;

  pipeTop = thiz.physics.add.sprite(x, top, 'pipe').setOrigin(0, 1);
  pipeBottom = thiz.physics.add.sprite(x, bottom, 'pipe').setOrigin(0, 0);

  pipeTop.body.velocity.x = -200;
  pipeBottom.body.velocity.x = -200;
}

function update() {
  if (bird.y > config.height || bird.y < 0) {
    resetBirdPosition();
  }
}

function resetBirdPosition() {
  bird.x = INITIAL_X;
  bird.y = INITIAL_Y;
  bird.body.velocity.y = 0;
}
    
function flap() {
  bird.body.velocity.y = -VELOCITY;
}
