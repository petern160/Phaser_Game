import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import skyImg from './assets/sky.png';
import starImg from './assets/star.png';
import groundImg from './assets/platform.png';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug:false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);


// loads assest we need with var name then location
function preload() {
  this.load.image('sky', skyImg);
  this.load.image('ground', groundImg);
  // this.load.image('star', starImg);
  // this.load.image('bomb', 'assets/bomb.png');
  // this.load.spritesheet('dude', 
  //     'assets/dude.png',
  //     { frameWidth: 32, frameHeight: 48 }
  // );
}

// order matters for the spirtes need to put background first then elements after
function create() {
  // new image game object adding it to current scenese display list
  this.add.image(400, 300, 'sky');
  // this.add.image(400, 300, 'star');
  let platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  //lower right
  platforms.create(600, 400, 'ground');
  // middle left
  platforms.create(50, 250, 'ground');
  // highest right
  platforms.create(750, 220, 'ground');
}

function update ()
    {
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