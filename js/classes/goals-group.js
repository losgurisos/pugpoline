
// Goals group Class.
function GoalsGroup (goalsQty, score) {

    // Goal objects.
    this.goals = [];

    function onScore () {
      score.addScore()
    }

    // Initialize goals sprites
    for(var i = 0; i < goalsQty; i++){
        this.goals.push(new Goal(GAME_WIDTH - SCREEN_OFFSET_RIGHT, GAME_HEIGHT/goalsQty*i + GAME_HEIGHT/goalsQty/2 ,null, onScore));
    }



    this.length = (function(){
        return this.goals.length;
    }).apply(this)
}
