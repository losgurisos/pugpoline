
function render() {

    if(DEBUG_MODE){
      game.debug.text( "SCORE: " + score.shownScore , 100, 30 );
      for(var i = 0; i < goalsGroup.length; i++){

          game.debug.body(rightWalls[i]);
      }
      game.debug.body(leftWall);
      game.debug.body(startingPlatform);
      game.debug.body(deathline);
      pugsGroup.forEach(function(pug){
          game.debug.body(pug.getSprite())
      })
      goalsGroup.forEach(function(goal){
          game.debug.body(goal.getSprite());
          game.debug.body(goal.getSpritePlatform());
      })
    }
}
