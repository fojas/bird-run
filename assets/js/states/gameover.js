!function(Phaser, $, _, states, undefined){
states.gameover= _.extend({}, states.title, {
  preload: function(){
    game.stage.backgroundColor = '#FFA500';
    game.load.image('penguin', 'assets/images/penguin.png');
    game.load.image('bluejay', 'assets/images/bluejay.png');
    game.load.image('flamingo', 'assets/images/flamingo.png');
    game.load.image('woodpecker', 'assets/images/woodpecker.png');
  },
  create: function(){
    this.game.add.text(480, 450, global.winner.toUpperCase() + " WINS!", { font: "60px Arial", fill: "#ffffff" })
    states.title.create.call(this);
  }, 
  drawStartText : function(){
    if(global.cursors.length >= 2) {
      this.startText.text = "Press Start or Space to Start";
    } else {
      this.startText.text = "";
    }
  },
  checkStart : function(){
    if(global.cursors.length >= 2) {
      game.state.start('main');
    }
  },
  render : $.noop,update: $.noop
})
}(Phaser, jQuery, _,
  window.states || (window.states = {})
)
