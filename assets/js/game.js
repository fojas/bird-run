!function(Phaser, $, _, undefined){
var game = new Phaser.Game(1300, 600, Phaser.AUTO, 'game');

main = {
  preload: function () {
    game.stage.backgroundColor = '#87CEEB';
    game.load.tilemap('map', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground_1x1', 'assets/images/ground_1x1.png');
    game.load.image('phaser', 'assets/images/bird.png');
    game.load.image('penguin', 'assets/images/penguin.png');
    game.load.image('woodpecker', 'assets/images/woodpecker.png');
    game.load.spritesheet('mouse', 'assets/images/mouse.png', 32, 32);
  },

  findTilesByIndex: function(value, layer) {
    var result = [];
    layer.layer.data.forEach(function (v) {
      v.forEach(function (tile) {
        if(tile.index  === value) {
          result.push(tile);
        }
      });
    });

    return result;
  },
  create : function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.map = game.add.tilemap('map');
    this.map.addTilesetImage('ground_1x1');
    this.map.addTilesetImage('mouse');
    this.map.setCollisionBetween(1, 12);

    //  This will set Tile ID 26 (the coin) to call the hitCoin function when collided with
    this.map.setTileIndexCallback(26, this.hitCoin, this);

    //  This will set the map location 2, 0 to call the function
    this.map.setTileLocationCallback(2, 0, 1, 1, this.hitCoin, this);

    // game.device.canvasBitBltShift = false;

    this.layer = this.map.createLayer('Tile Layer 1');

    this.coinCount = this.findTilesByIndex(26, this.layer).length
    this.layer.resizeWorld();
    this.sprites = []
    this.addSprite(160,120,'penguin')
    this.addSprite(1120,120,'woodpecker')

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
    sprite.scale.setTo(.75, .75)
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
      if(!tile.collected) {
        this.addPoint(sprite.index);
        if(0 == --this.coinCount) {
          game.state.start('title'); 
        }
      }
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
        sprite.body.velocity.y = -200;
      }
      else if (this.cursors[index].down.isDown) {
        sprite.body.velocity.y = 150;
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

var title = {
  preload: function(){
    game.stage.backgroundColor = '#FFA500';
    game.load.image('title', 'assets/images/title.png');

  },
  create: function(){
    var gameTitle = this.add.image(240,30,"title");
    gameTitle.angle = (2+Math.random()*5)*(Math.random()>0.5?1:-1);
    var titleTween = this.add.tween(gameTitle);
    titleTween.to({
      angle: -gameTitle.angle
    },500+Math.random()*500,Phaser.Easing.Linear.None,true,0,1000,true);
    this.game.add.text(480, 550, "Press Space to Start", { font: "30px Arial", fill: "#ffffff" }),
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.add(function(){
        game.state.start('main')
      }, this); 

  }, 
  render : $.noop,update: $.noop
}
// Add and start the 'main' state to start the game
game.state.add('main', main);  
game.state.add('title', title);  
game.state.start('title'); 

}(Phaser, jQuery, _)
