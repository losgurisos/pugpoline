
function render() { 

	if(DEBUG_MODE)
        for(var i = 0; i < trampolinesGroup.length; i++){
            game.debug.body(trampolinesGroup.trampolines[i].sprite);
        }

        for(var i = 0; i < goalsGroup.length; i++){
            game.debug.body(goalsGroup.goals[i].sprite);
        }
        game.debug.body(rightWall);
}