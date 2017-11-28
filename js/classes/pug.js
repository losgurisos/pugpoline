/**
 * Created by Andres on 07/04/2016.
 */

function Pug (){

    this._phaserEntity = game.add.sprite(0, -30, 'pug');

    // Enable pug BOX2D physics.
    game.physics.box2d.enable(this._phaserEntity);

    // Starts circle body.
    this._phaserEntity.body.setCircle(PUGS_CIRCLE_BODY_SIZE);

    // Set pug restitution.
    this._phaserEntity.body.restitution = PUGS_RESTITUTION;

    // set pug-trampoline collision callbacks
    for(var j = 0; j < trampolinesGroup.length; j++){
        var _trampoline = trampolinesGroup.trampolines[j];
        this._phaserEntity.body.setBodyContactCallback(_trampoline.sprite, _trampoline.pugTrampolineContactCallback, _trampoline);
    }

    for(var j = 0; j < goalsGroup.length; j++) {
        var goal = goalsGroup.goals[j];
        this._phaserEntity.body.setBodyContactCallback(goal.sprite, goal.pugGoalContactCallback, goal);

    }
}

var method = Pug.prototype;

method.setCollisionCallbacks = function(group, callbackName){

};