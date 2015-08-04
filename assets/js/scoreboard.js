!function(Phaser, $, _, undefined){

  window.scoreboard = function(){
    var scores, labelScores;

    var init = function(playerCount, game) {
      scores = Array.apply(null, Array(playerCount)).map(function() { return 0 });
      labelScores = [];
      for(var i= 0, scoreLen = scores.length; i < scoreLen; i++){
        labelScores.push(
          game.add.text((120 * i) + 120, 50, "0", { font: "30px Arial", fill: "#ffffff" })
        )
      }
    };

    var addPoint = function(index) {
      scores[index] = scores[index] + 1;
      labelScores[index].text = scores[index]
    };

    var winner = function(){
      var windex = scores.length-1;
      for(var i = windex; i--;){
        if(scores[i] > scores[windex]){
          windex = i;
        }
      }
      return windex;
    };

    return {
      init: init,
      addPoint: addPoint,
      winner: winner
    }
  }();

}(Phaser, jQuery, _)
