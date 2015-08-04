!function(Phaser, $, _, undefined){

  window.controllerSetup = function(){
    return {
      init: function(game, playerAddedCallback, startCallback) {
        global.cursors = [];
        this.playerAddedCallback = playerAddedCallback || $.noop;
        this.startCallback = startCallback || $.noop;
        var keyControl = false;
        game.input.keyboard.addKey(Phaser.Keyboard.UP)
          .onDown.add(function(){
            if(!keyControl) {
              global.cursors.push( game.input.keyboard.createCursorKeys() )
              playerAddedCallback(global.cursors.length -1)
            }
            keyControl = true
          }, this); 
        [
          {
            trigger: Phaser.Keyboard.W,
            keys: {
              up: Phaser.Keyboard.W, down: Phaser.Keyboard.S,
              left: Phaser.Keyboard.A, right: Phaser.Keyboard.D
            }
          },
          {
            trigger: Phaser.Keyboard.I,
            keys: {
              up: Phaser.Keyboard.I, down: Phaser.Keyboard.K,
              left: Phaser.Keyboard.J, right: Phaser.Keyboard.L
            }
          },
          {
            trigger: Phaser.Keyboard.NUMPAD_8,
            keys: {
              up: Phaser.Keyboard.NUMPAD_8, down: Phaser.Keyboard.NUMPAD_5,
              left: Phaser.Keyboard.NUMPAD_4, right: Phaser.Keyboard.NUMPAD_6
            }
          }
        ].forEach(function(keyset){
          var keysetControl = false;
          game.input.keyboard.addKey(keyset.trigger)
            .onDown.add(function(){
              if(!keysetControl) {
                global.cursors.push(game.input.keyboard.addKeys(keyset.keys))
                playerAddedCallback(global.cursors.length -1)
              }
              keysetControl = true;
            }, this); 

        }.bind(this))
        this.padControl = [0,0,0,0];
        if( game.input.gamepad.supported) {
          this.gamepadsInitialized  = true;
          game.input.gamepad.start();
          ['pad1', 'pad2', 'pad3', 'pad4'].forEach(function(index){ 
            var pad = game.input.gamepad[index];
            pad.addCallbacks(this, { onConnect:function(){
              this.gamepadSetup.call(this, index);
            }.bind(this)}, this);
          }.bind(this));
        }
      },
      gamepadSetup: function(index){
        var pad = game.input.gamepad[index];
        if(!pad.connected) { return; }
        pad.getButton(Phaser.Gamepad.XBOX360_START).onUp.add(function(){
          this.startCallback();
        }.bind(this));
        var buttonA = pad.getButton(Phaser.Gamepad.XBOX360_A)
        buttonA.onUp.add(function(){
          if(!this.padControl[index]) {
            window.global.cursors.push({
              left: pad.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT),
              right: pad.getButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT),
              up:  pad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP),
              down: pad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN),
              pad: pad
            });
            this.playerAddedCallback(global.cursors.length -1)
          }
          this.padControl[index] = true;
        }.bind(this))
      }
    }
  }();
}(Phaser, jQuery, _)
