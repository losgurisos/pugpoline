
// Goals group Class.
function GoalsGroup (goalsQty, score) {

    // Goal objects.
    this.goals = [];

    function onScore () {
      score.addScore()
    }

    // Initialize goals sprites
    for(var i = 0; i < goalsQty; i++){
        this.goals.push(new Goal(GAME_WIDTH - SCREEN_OFFSET_RIGHT, GAME_HEIGHT/goalsQty*i + GAME_HEIGHT/goalsQty/2 ,"platform", "goal", onScore));
    }

    this.length = this.goals.length;
}

var method = GoalsGroup.prototype;

method.forEach = function (cb) {
	this.goals.forEach(function(goal){cb(goal)})
}
