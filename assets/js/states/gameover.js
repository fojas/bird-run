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
    var sprite = game.add.sprite(580,250, global.winner);
    sprite.anchor.set(0.5);
    sprite.scale.setTo(3, 3)
    this.game.add.text(480, 450, global.winner.toUpperCase() + " WINS!", { font: "60px Arial", fill: "#ffffff" })
    this.addControls(this);
  }, 
  render : $.noop,update: $.noop
})
}(Phaser, jQuery, _,
  window.states || (window.states = {})
)
