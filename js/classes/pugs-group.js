/**
 * Created by Andres on 07/04/2016.
 */

function PugsGroup (pugsQty){
    this._phaserEntityGroup = [];

    for(var i = 0; i < pugsQty; i++)
        this._phaserEntityGroup.push(new Pug())
    
}

var method = PugsGroup.prototype;

method.getPugs = function(){
    return this._phaserEntityGroup.map(function(pug) {return pug._phaserEntity;});
};

method.length = function(){
  return this._phaserEntityGroup.length;
};

method.setCollisionCallbacks = function(group, callbackName){
    this._phaserEntityGroup.forEach(function(pug){
        pug.setCollisionCallbacks(group, callbackName);
    })
};
/*
 for(var j = 0; j < trampolinesGroup.length; j++){
 var _trampoline = trampolinesGroup.trampolines[j];
 this._phaserEntity.body.setBodyContactCallback(_trampoline.sprite, _trampoline.pugTrampolineContactCallback, _trampoline);
 }
 */