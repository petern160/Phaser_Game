import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import skyImg from './assets/sky.png';
import starImg from './assets/star.png';
import groundImg from './assets/platform.png';
import dudeSprite from './assets/dude.png';

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

let platforms;
let player;
let cursors;

// loads assest we need with var name then location
function preload() {
  this.load.image('sky', skyImg);
  this.load.image('ground', groundImg);
  // this.load.image('star', starImg);
  // this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude', 
      dudeSprite,
      { frameWidth: 32, frameHeight: 48 }
  );
}

// order matters for the spirtes need to put background first then elements after
function create() {
  // new image game object adding it to current scenese display list
  this.add.image(400, 300, 'sky');
  // this.add.image(400, 300, 'star');
  // creates local static platform variable that is not touched by physics
  // has position and size only
   platforms = this.physics.add.staticGroup();
  // scale it by x2 so players do not drop off sides refresh body for static physics
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  //lower right
  platforms.create(600, 400, 'ground');
  // middle left
  platforms.create(50, 250, 'ground');
  // highest right
  platforms.create(750, 220, 'ground');

  // has dynamic properties
  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    // tells animation to loop
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});

this.physics.add.collider(player, platforms);
// cursor inputs like event listeners
cursors = this.input.keyboard.createCursorKeys();
}


function update ()
    {
      if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
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