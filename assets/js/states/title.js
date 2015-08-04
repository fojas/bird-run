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

    this.startText = this.game.add.text(480, 550, "", { font: "30px Arial", fill: "#ffffff" }),
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.add(function(){
        this.checkStart();
      }, this); 

    controllerSetup.init(this.game, this.drawStartText.bind(this), this.checkStart.bind(this));
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
}
}(Phaser, jQuery, _,
  window.states || (window.states = {})
)
