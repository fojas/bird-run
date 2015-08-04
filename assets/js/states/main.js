!function(Phaser, $, _, states, undefined){
states.main = {
  preload: function () {
    game.stage.backgroundColor = '#87CEEB';
    game.load.tilemap('map', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground_1x1', 'assets/images/ground_1x1.png');
    game.load.image('phaser', 'assets/images/bird.png');
    game.load.image('penguin', 'assets/images/penguin.png');
    game.load.image('bluejay', 'assets/images/bluejay.png');
    game.load.image('flamingo', 'assets/images/flamingo.png');
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

    // game.device.canvasBitBltShift = false;

    this.layer = this.map.createLayer('Tile Layer 1');

    this.coinCount = this.findTilesByIndex(26, this.layer).length
    this.layer.resizeWorld();
    this.sprites = []
    var chars = ['penguin', 'woodpecker', 'bluejay', 'flamingo'];
    for(var i = global.cursors.length; i--;) {
      this.addSprite((i * 160) + 160,120, chars[i % chars.length])
    }

    scoreboard.init(global.cursors.length, this.game);

  },
  addSprite : function(x,y,name){
    var sprite = game.add.sprite(x,y, name);
    sprite.charName = name;
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
        scoreboard.addPoint(sprite.index);
        console.log(scoreboard.winner())
        if(0 == --this.coinCount) {
          global.winner = this.sprites[scoreboard.winner()].charName;
          game.state.start('gameover'); 
        }
      }
      tile.collected = true
      this.layer.dirty = true;
      return false;
  },

  update: function () {
    game.physics.arcade.collide(this.sprites,this.sprites);
    global.cursors.forEach(function(cursor,index) {
      var sprite = this.sprites[index];
      game.physics.arcade.collide(sprite, this.layer);
      sprite.body.velocity.x = 0;
      if (global.cursors[index].up.isDown ||
        (global.cursors[index].pad && global.cursors[index].pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)
      ) {
        sprite.body.velocity.y = -200;
      }
      else if (global.cursors[index].down.isDown ||
        (global.cursors[index].pad && global.cursors[index].pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
      ) {
        sprite.body.velocity.y = 150;
      }

      if (global.cursors[index].left.isDown || 
        (global.cursors[index].pad && global.cursors[index].pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
      ) {
        sprite.body.velocity.x = -150;
      }
      else if (global.cursors[index].right.isDown ||
        (global.cursors[index].pad && global.cursors[index].pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
      ) {
        sprite.body.velocity.x = 150;
      }
    }.bind(this));
  },

  render: function () {
  }
}

}(Phaser, jQuery, _,
  window.states || (window.states = {})
)
