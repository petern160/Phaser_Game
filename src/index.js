import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import skyImg from './assets/sky.png';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);


// loads assest we need with var name then location
function preload() {
  this.load.image('sky', skyImg);
  // this.load.image('ground', 'assets/platform.png');
  // this.load.image('star', 'assets/star.png');
  // this.load.image('bomb', 'assets/bomb.png');
  // this.load.spritesheet('dude', 
  //     'assets/dude.png',
  //     { frameWidth: 32, frameHeight: 48 }
  // );
}

// order matters for the spirtes need to put background first then elements after
function create() {
  this.add.image(400, 300, 'sky');
}


// this.load.image("logo", logoImg);

// const logo = this.add.image(400, 150, "logo");

// this.tweens.add({
//   targets: logo,
//   y: 450,
//   duration: 2000,
//   ease: "Power2",
//   yoyo: true,
//   loop: -1
// });