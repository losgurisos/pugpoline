/**
 * Created by Andres on 07/04/2016.
 */

function Pug (){

    this.sprites = {};
    this.initializeSprite();
    this.initializeAnimations();

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
    this.getBody().setBodyContactCallback(deathline, this.changeState.bind(this, Pug.STATES.SWIMMING));

    // starts walking
    this.changeState(Pug.STATES.WALKING)
}

var method = Pug.prototype;

method.initializeSprite = function(){
  this.spritePug = phaserFactory.createCircularSprite({sprite: "pug_walk", radius: PUGS_CIRCLE_BODY_SIZE, x: 15, y: STARTING_PLATFORM_VERTICAL_POSITION});
}

method.initializeAnimations = function(){
  this.getSprite().animations.add('walk');
  this.getSprite().animations.add('swim');
  console.log()
}

method.changeState = function(newState){
  this.state = newState;
  this.onUpdateForState = function(){};
  switch (newState) {
    case Pug.STATES.IDLE:
      this.getBody().velocity.x = 0;
      this.getBody().velocity.y = 0;
      this.getBody().restitution = 0;
      break;
    case Pug.STATES.WALKING:
      this.getSprite().loadTexture('pug_walk', 0, false);
      this.getSprite().animations.play('walk', 20, true);
      this.getBody().velocity.x = PUGS_STARTING_WALKING_SPEED;
      this.getBody().restitution = 0;
      this.getBody().rotation = 0;
      this.onUpdateForState = function(){
        this.getBody().rotation = 0; // avoid rolling
        this.getBody().velocity.x = PUGS_STARTING_WALKING_SPEED; // keep moving right
      }
      break;
    case Pug.STATES.FALLING:
      this.getBody().restitution = PUGS_RESTITUTION;
      break;
    case Pug.STATES.SWIMMING:
      this.getSprite().loadTexture('pug_swim', 0, false);
      this.getSprite().animations.play('swim', 20, true);
      this.getBody().velocity.x = PUGS_STARTING_WALKING_SPEED;
      this.getBody().velocity.y = 0;
      this.getBody().restitution = 0;
      this.getBody().rotation = 0;
      // get random direction
      var toTheRight = Math.random() >= 0.5? 1: 1;;
      // Invert scale.x to flip left/right
      this.getSprite().scale.x *= toTheRight;
      // Invert scale.y to flip up/down
      //this.getSprite().scale.y *= toTheRight;
      this.onUpdateForState = function(){
        this.getBody().rotation = 0; // avoid rolling
        this.getBody().velocity.x = toTheRight * PUGS_STARTING_WALKING_SPEED; // keep moving right
      }
  }
}
method.isWalking = function(){
  return this.getState() == Pug.STATES.WALKING;
}

method.getState = function(){
  return this.state;
}

method.getBody = function(){
  return this.getSprite().body || false;
}

method.getSprite = function(){
  return this.spritePug || false;
}

Pug.STATES = {
  IDLE: 0,
  WALKING: 1,
  FALLING: 2,
  SWIMMING: 3
}

method.onUpdate = function(){
  this.onUpdateForState();
}

method.setCollisionCallbacks = function(group, callbackName){

};
