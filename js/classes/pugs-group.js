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
    cb(pug.spritePug)
  })
}
