var PhaserFactory = function() {
  this.createRectangularStaticSprite = function(options){
    options = ObjectHelper.merge({
      sprite: null,
      width: 50,
      height: 50,
      x: 0,
      y: 0,
      sensor: false
    }, options)
    var s = game.add.sprite(options.x+ options.width/2, options.y + options.height/2, options.sprite);
    game.physics.box2d.enable(s)
    s.body.static = true;
    s.body.setRectangle(options.width, options.height, 0, 0).SetSensor(options.sensor);
    return s;
  }
  this.createEmitter = function(options){
    var options = ObjectHelper.merge({
      gravity: 50,
      alphaMin: 0.5,
      alphaMax: 1,
      scaleWidth: 1,
      scaleHeight: 1,
      blendMode: "NORMAL",
      sprite: null
    }, options)

    traceParticleEmitter = game.add.emitter(0, 0, 100);
  	traceParticleEmitter.makeParticles(options.sprite);
    traceParticleEmitter.gravity = options.gravity;
  	traceParticleEmitter.setAlpha(options.alphaMin, options.alphaMax);
  	traceParticleEmitter.setScale(options.scaleWidth, options.scaleHeight);
  	traceParticleEmitter.blendMode = Phaser.blendModes[options.blendMode];
    traceParticleEmitter.traceParticleBurst = function(pointer) {
        //  Position the emitter where the mouse/touch event was
        traceParticleEmitter.x = pointer.x;
        traceParticleEmitter.y = pointer.y;
        //  The first parameter sets the effect to "explode" which means all particles are emitted at once
        //  The second gives each particle a 2000ms lifespan
        //  The third is ignored when using burst/explode mode
        //  The final parameter (10) is how many particles will be emitted in this single burst
        traceParticleEmitter.start(true, 500, null, 3);
    }
    return traceParticleEmitter;
  }
  this.createCircularSprite = function(options){
    options = ObjectHelper.merge({
      sprite: null,
      radius: 10,
      x: -15,
      y: -15,
      sensor: false,
      visible: true
    }, options)
    var s = game.add.sprite(0, 0, options.sprite);
    game.physics.box2d.enable(s);
    s.body.x = options.x;
    s.body.y = options.y;
    s.body.setCircle(options.radius);
    s.visible = options.visible;
    return s;
  }
}
