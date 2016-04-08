/**
 * Created by Andres on 06/04/2016.
 */

function Score () {
    this.score = 0;
}

var method = Score.prototype;

method.AddScore = function(score) {
    if(typeof score !== 'number')
        score = 1;
    this.score += score;
};
