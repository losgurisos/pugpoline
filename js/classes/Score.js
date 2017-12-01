/**
 * Created by Andres on 06/04/2016.
 */

function Score () {
    this.score = 0;
}

var method = Score.prototype;

method.addScore = function(score) {
    if(typeof score !== 'number')
        score = 1;
    this.score += score;

    this._onScoreCb && this._onScoreCb.call && this._onScoreCb(this.score)
};

method.onScore = function(cb){
  this._onScoreCb = cb;
}
