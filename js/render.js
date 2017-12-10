
function render() {

    if(DEBUG_MODE){
      game.debug.text( "SCORE: " + score.shownScore , 100, 30 );
      for(var i = 0; i < goalsGroup.length + 1; i++){

          game.debug.body(rightWalls[i]);
      }
      game.debug.body(leftWall)
      for(var i = 0; i < goalsGroup.length; i++){
          game.debug.body(goalsGroup.goals[i].spriteGoal);
          game.debug.body(goalsGroup.goals[i].spritePlatform);
      }
    }
}
