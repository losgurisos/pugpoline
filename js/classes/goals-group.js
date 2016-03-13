
// Goals group Class.
function GoalsGroup (goalsQty) {

    // Goal objects.
    this.goals = [];

    // Initialize goals sprites
    for(var i = 0; i < goalsQty; i++){
        this.goals.push(new Goal(GAME_WIDTH-50, GAME_HEIGHT/goalsQty*i + GAME_HEIGHT/goalsQty/2 ,null));
    }

    this.length = (function(){
        return this.goals.length;
    }).apply(this)
}