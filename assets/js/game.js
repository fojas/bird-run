!function(Phaser, $, _, undefined){
var game = new Phaser.Game(1300, 600, Phaser.AUTO, 'game');

main = {
  preload: function () {
    game.load.tilemap('map', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground_1x1', 'assets/images/ground_1x1.png');
    game.load.image('phaser', 'assets/images/bird.png');
    game.load.spritesheet('coin', 'assets/images/coin.png', 32, 32);
  },

  create : function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.map = game.add.tilemap('map');
    this.map.addTilesetImage('ground_1x1');
    this.map.addTilesetImage('coin');
    this.map.setCollisionBetween(1, 12);

    //  This will set Tile ID 26 (the coin) to call the hitCoin function when collided with
    this.map.setTileIndexCallback(26, this.hitCoin, this);

    //  This will set the map location 2, 0 to call the function
    this.map.setTileLocationCallback(2, 0, 1, 1, this.hitCoin, this);

    // game.device.canvasBitBltShift = false;

    this.layer = this.map.createLayer('Tile Layer 1');

    this.layer.resizeWorld();
    this.sprites = []
    this.addSprite(160,120,'phaser')
    this.addSprite(260,120,'phaser')

    this.cursors = [
      game.input.keyboard.createCursorKeys(),
      game.input.keyboard.addKeys({
        up: Phaser.Keyboard.W,
        down: Phaser.Keyboard.S,
        left: Phaser.Keyboard.A,
        right: Phaser.Keyboard.D,
      })
    ];

    this.scores = [0,0];
    this.labelScores = [
      this.game.add.text(120, 50, "0", { font: "30px Arial", fill: "#ffffff" }),
      this.game.add.text(1000, 50, "0", { font: "30px Arial", fill: "#ffffff" })
    ]

  },
  addSprite : function(x,y,name){
    var sprite = game.add.sprite(x,y, name);
    sprite.anchor.set(0.5);
    sprite.scale.setTo(.5, .5)
    game.physics.enable(sprite);

    game.physics.arcade.gravity.y = 100;

    sprite.body.bounce.y = 0.2;
    sprite.body.linearDamping = 1;
    sprite.body.collideWorldBounds = true;
    sprite.index = this.sprites.length;
    this.sprites.push(sprite);
  },
  hitCoin: function(sprite, tile) {
      tile.alpha = 0.2;
      if(!tile.collected) this.addPoint(sprite.index);
      tile.collected = true
      this.layer.dirty = true;
      return false;
  },
  addPoint : function(index) {
    this.scores[index] = this.scores[index] + 1;
    this.labelScores[index].text = this.scores[index]
  },

  update: function () {
    this.sprites.forEach(function(sprite,index) {
      game.physics.arcade.collide(sprite, this.layer);
      sprite.body.velocity.x = 0;
      if (this.cursors[index].up.isDown) {
        if (sprite.body.onFloor()) {
          sprite.body.velocity.y = -200;
        }
      }

      if (this.cursors[index].left.isDown) {
        sprite.body.velocity.x = -150;
      }
      else if (this.cursors[index].right.isDown) {
        sprite.body.velocity.x = 150;
      }
    }.bind(this));
  },

  render: function () {
  }
}
// Add and start the 'main' state to start the game
game.state.add('main', main);  
game.state.start('main'); 

}(Phaser, jQuery, _)
