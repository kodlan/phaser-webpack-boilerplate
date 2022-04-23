
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

const Scenes = [ PreloadScene, MenuScene, GameScene ];
const createScene = (Scene) => new Scene(SCENE_CONFIG);
const initScenes = () => Scenes.map(createScene);

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
  scene: initScenes()
};

new Phaser.Game(config);
