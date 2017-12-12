/**
 * Created by Andres on 07/04/2016.
 */

function PugsGroup (pugsQty){
    this.spritePugsGroup = [];

    for(var i = 0; i < pugsQty; i++)
        this.spritePugsGroup.push(new Pug())
}

var method = PugsGroup.prototype;

method.getPugs = function(){
    return this.spritePugsGroup.map(function(pug) {return pug.spritePug;});
};

method.length = function(){
  return this.spritePugsGroup.length;
};

method.setCollisionCallbacks = function(group, callbackName){
    this.spritePugsGroup.forEach(function(pug){
        pug.setCollisionCallbacks(group, callbackName);
    })
};

method.forEach = function(cb){
  this.spritePugsGroup.forEach(function(pug){
    cb(pug)
  })
}

method.onUpdate = function(){
  pugsGroup.forEach(function(pug){
    pug.onUpdate();
    var pugBody = pug.getBody();
    if (pugBody.y > 630){
      pug.changeState(Pug.STATES.WALKING)
      pugBody.x = 15;//Math.random() * 800 - SCREEN_OFFSET_RIGHT - 50;
      pugBody.y = STARTING_PLATFORM_VERTICAL_POSITION;
      pugBody.setZeroVelocity();
      pugBody.velocity.x = 300 * Math.random() + 100;
    }
  })
};
