
import Phaser from "phaser";
import GameScene from "./scene/GameScene";
import PreloadScene from "./scene/PreloadScene";
import MenuScene from "./scene/MenuScene";

const WIDTH = 800;
const HEIGHT = 600;

const SCENE_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: { x: WIDTH / 10, y: HEIGHT / 2 },
  velocity: 300,
  gravity: 600
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
  scene: [ new PreloadScene(SCENE_CONFIG), new MenuScene(SCENE_CONFIG), new GameScene(SCENE_CONFIG),  ]
};

new Phaser.Game(config);
