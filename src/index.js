
import Phaser from "phaser";
import GameScene from "./scene/GameScene";

const WIDTH = 800;
const HEIGHT = 600;

const SCENE_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: { x: WIDTH / 10, y: HEIGHT / 2 },
  velocity: 300,
  gravity: 400
}

const config = {
  type: Phaser.AUTO,  
  width: WIDTH,
  height: HEIGHT,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: [ new GameScene(SCENE_CONFIG) ]
};

new Phaser.Game(config);
