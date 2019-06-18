import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import skyImg from './assets/sky.png';
import starImg from './assets/star.png';
import groundImg from './assets/platform.png';
import dudeSprite from './assets/char.png';
import bombImg from './assets/bomb.png'
import bulletImg from './assets/bullet.png';

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
let stars;
let score = 0;
let scoreText;
let bombs;
let bullets;
let lastFired = 0;




// loads assest we need with var name then location
function preload() {
  this.load.image('sky', skyImg);
  this.load.image('ground', groundImg);
  this.load.image('star', starImg);
  this.load.image('bomb', bombImg);
  this.load.image('bullet', bulletImg);
  this.load.spritesheet('dude', 
      dudeSprite,
      { frameWidth: 118, frameHeight: 150 }
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



  // has dynamic properties physics
  player = this.physics.add.sprite(0, 0, 'dude');
  player.setScale(0.5)
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);


  var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

        this.speed = Phaser.Math.GetSpeed(300, 1);
    },

    fire: function (x, y)
    {
        this.setPosition(x + 1, y - 50);
       
        this.setActive(true);
        this.setVisible(true);
    },

    update: function (time, delta)
    {
        this.x -= this.speed * delta;

        if (this.x < -50)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});

bullets = this.add.group({
    classType: Bullet,
    maxSize: 5,
    runChildUpdate: true
});
  
 
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    // tells animation to loop
    repeat: -1
});


this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 0 } ],
    frameRate: 20
});



this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 6 }),
    frameRate: 10,
    repeat: -1
});



this.physics.add.collider(player, platforms);
this.physics.add.collider(bullets, platforms);
// cursor inputs like event listeners
cursors = this.input.keyboard.createCursorKeys();
// isSpaceDown = cursors.space.isDown;

// creates 12 stars with a random bounce between 0.4 and 0.8
stars = this.physics.add.group({
  key: 'star',
  repeat: 11,
  setXY: { x: 12, y: 0, stepX: 70 }
});

stars.children.iterate(function (child) {

  child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

});
this.physics.add.collider(stars, platforms);


// this.physics.add.collider(bullet, platforms);


// star disappears when player overlaps and updates score
this.physics.add.overlap(player, stars, collectStar, null, this);

// bombs spawn
function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}

// score appears top left
scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });


// bomb dynamic group
bombs = this.physics.add.group();

this.physics.add.collider(bombs, platforms);

// if collides with player hitBomb function will happen
this.physics.add.collider(player, bombs, hitBomb, null, this);

// gameover if bomb hits player
function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
}


function update (time, delta)
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


// sprite.rotation = game.physics.arcade.angleToPointer(sprite);

if (cursors.space.isDown && time > lastFired)
{
    var bullet = bullets.get();

    if (bullet)
    {
        bullet.fire(player.x, player.y + 65);
       
        lastFired = time + 1; 
    }
}

    }
