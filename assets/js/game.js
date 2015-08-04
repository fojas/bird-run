!function(Phaser, $, _, undefined){
window.game = new Phaser.Game(1300, 600, Phaser.AUTO, 'game');
window.global = { }

// Add and start the 'main' state to start the game
game.state.add('main', states.main);  
game.state.add('title', states.title);  
game.state.add('gameover', states.gameover);  
game.state.start('title'); 

}(Phaser, jQuery, _)
