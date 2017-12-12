/**
 * Created by Andres on 07/04/2016.
 */

function Pug (){

    this.spritePug = game.add.sprite(15, 53, 'pug');

    this.state = Pug.STATES.IDLE;

    // Enable pug BOX2D physics.
    game.physics.box2d.enable(this.spritePug);

    // Starts circle body.
    this.spritePug.body.setCircle(PUGS_CIRCLE_BODY_SIZE);
    //this.getBody().setRectangle(30, 20)

    // Start without restitution
    this.spritePug.body.restitution = 0;

    // set pug-trampoline collision callbacks
    for(var j = 0; j < trampolinesGroup.length; j++){
        var _trampoline = trampolinesGroup.trampolines[j];
        this.spritePug.body.setBodyContactCallback(_trampoline.sprite, _trampoline.pugTrampolineContactCallback, _trampoline);
    }

    for(var j = 0; j < goalsGroup.length; j++) {
        var goal = goalsGroup.goals[j];
        this.spritePug.body.setBodyContactCallback(goal.spriteGoal, goal.pugGoalContactCallback);
    }

    this.getBody().setBodyContactCallback(startingPugFallZone, this.changeState.bind(this, Pug.STATES.FALLING));

    // starts walking
    this.changeState(Pug.STATES.WALKING)
}

var method = Pug.prototype;

Pug.method("changeState", function(newState){
  this.state = newState;
  switch (newState) {
    case Pug.STATES.IDLE:
      this.getBody().velocity.x = 0;
      this.getBody().velocity.y = 0;
      this.getBody().restitution = 0;
      break;
    case Pug.STATES.WALKING:
      this.getBody().velocity.x = PUGS_STARTING_WALKING_SPEED;
      this.getBody().restitution = 0;
      this.getBody().rotation = 0;
      break;
    case Pug.STATES.FALLING:
      this.getBody().restitution = PUGS_RESTITUTION;
      break;
    case Pug.STATES.SWIMMING:
      // TODO
      this.getBody().velocity.x = PUGS_STARTING_WALKING_SPEED;
      this.getBody().restitution = 0;
  }
})

Pug.method("isWalking", function(){
  return this.getState() == Pug.STATES.WALKING;
})

Pug.method("getState", function(){
  return this.state;
})

Pug.method("getBody", function(){
    return this.getSprite().body || false;
})

Pug.method("getSprite", function(){
    return this.spritePug || false;
})

Pug.STATES = {
  IDLE: 0,
  WALKING: 1,
  FALLING: 2,
  SWIMMING: 3
}

method.onUpdate = function(){
  if(this.isWalking()){
    this.getBody().rotation = 0; // avoid rolling
    this.getBody().velocity.x = PUGS_STARTING_WALKING_SPEED; // keep moving right
  }
}

method.setCollisionCallbacks = function(group, callbackName){

};
