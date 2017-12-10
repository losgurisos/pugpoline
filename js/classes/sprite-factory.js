var SpriteFactory = function() {
  this.createRectangularStaticSprite = function(spriteImg, width, height, x, y){
    var s = game.add.sprite(0, 0, spriteImg);
    game.physics.box2d.enable(s)
    s.body.static = true;
    s.body.setRectangle(width, height, x+width/2, y+height/2);
    return s;
  }
}
