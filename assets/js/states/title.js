!function(Phaser, $, _, states, undefined){
states.title = {
  preload: function(){
    game.stage.backgroundColor = '#FFA500';
    game.load.image('title', 'assets/images/title.png');
    global.cursors = [];
  },
  create: function(){
    var gameTitle = this.add.image(240,30,"title");
    gameTitle.angle = (2+Math.random()*5)*(Math.random()>0.5?1:-1);
    var titleTween = this.add.tween(gameTitle);
    titleTween.to({
      angle: -gameTitle.angle
    },500+Math.random()*500,Phaser.Easing.Linear.None,true,0,1000,true);

    var keyControl = false
    var wasdControl = false

    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.add(function(){
        if(!keyControl) {
          global.cursors.push( game.input.keyboard.createCursorKeys() )
          this.checkStart();
        }
        keyControl = true
      }, this); 

    this.game.input.keyboard.addKey(Phaser.Keyboard.A)
      .onDown.add(function(){
        if(!wasdControl) {
          global.cursors.push( 
           game.input.keyboard.addKeys({
              up: Phaser.Keyboard.W,
              down: Phaser.Keyboard.S,
              left: Phaser.Keyboard.A,
              right: Phaser.Keyboard.D,
            })
         )
          this.checkStart();
        }
        wasdControl = true
      }, this); 

    if( game.input.gamepad.supported) {
      game.input.gamepad.start();
      var pad = game.input.gamepad.pad1;
      pad.addCallbacks(this, { onConnect: function(){
        var buttonA = pad.getButton(Phaser.Gamepad.XBOX360_A)
        var pad1Control = false;
        buttonA.onUp.add(function(){
          if(!pad1Control) {
            window.global.cursors.push({
              left: pad.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT),
              right: pad.getButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT),
              up:  pad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP),
              down: pad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN)
            });
            this.checkStart();
          }
          pad1Control = true;
        }.bind(this), this);
      }.bind(this) } );
    }

  }, 
  checkStart : function(){
    if(global.cursors.length == 2) {
      game.state.start('main');
    }
  },
  render : $.noop,update: $.noop
}
}(Phaser, jQuery, _,
  window.states || (window.states = {})
)
