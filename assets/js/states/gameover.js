!function(Phaser, $, _, states, undefined){
states.gameover= {
  preload: function(){
    game.stage.backgroundColor = '#FFA500';

  },
  create: function(){
    this.game.add.text(480, 350, "GAME OVER", { font: "60px Arial", fill: "#ffffff" }),
    this.game.add.text(480, 550, "Press Space to Start", { font: "30px Arial", fill: "#ffffff" }),
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.add(function(){
        game.state.start('main')
      }, this); 
  }, 
  render : $.noop,update: $.noop
}
}(Phaser, jQuery, _,
  window.states || (window.states = {})
)
