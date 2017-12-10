
function create() {

	if(DISABLE_LOGS) {
		// Deactivate logs.
		console.log = function(){}
	}

	// Start BOX2D physics.
	game.physics.startSystem(Phaser.Physics.BOX2D);

	// Set stage background color.
	game.stage.backgroundColor = BACKGROUND_COLOR;

	// Set config gravity.
	game.physics.box2d.gravity.y = GAME_STARTING_GRAVITY;

	// Set config friction.
	game.physics.box2d.friction = GAME_FRICTION;

	// Get TrampolinesGroup instance.
	trampolinesGroup = new TrampolinesGroup(MAX_TRAMPOLINE_QTY, MAX_PUGS_QTY);

	// Score
	score = new Score();
	var gravityFactor = NeverEnding.getNeverEndingFactor(GAME_STARTING_GRAVITY, GAME_ENDING_GRAVITY, GAME_GRAVITY_ACELERATION);
	score.onScore(function(newScore){
		var newGravity = gravityFactor.getValueFor(newScore)
			if(DEBUG_MODE) console.log("new gravity:", newGravity)
			game.physics.box2d.gravity.y = newGravity;
	})
	// Get GoalsGroup instance.
	goalsGroup = new GoalsGroup(GOALS_QTY, score);

	for(var i = 0; i < GOALS_QTY + 1; i++) {
		//var rightWall = game.add.sprite(GAME_WIDTH-SCREEN_OFFSET_RIGHT, SCREEN_OFFSET_UP + i* GAME_HEIGHT/GOALS_QTY ,null )
		var rightWall = game.add.sprite(0, 0, null)
		game.physics.box2d.enable(rightWall)
		rightWall.body.static = true;
		rightWall.body.setRectangle(
				RIGHT_WALL_WIDTH, 										// Width
				GAME_HEIGHT / GOALS_QTY - GOALS_HEIGHT,					// Height
				GAME_WIDTH - SCREEN_OFFSET_RIGHT,							// Position X
				SCREEN_OFFSET_UP + i * GAME_HEIGHT / GOALS_QTY 			// Position Y
		);
		rightWalls.push(rightWall);
	}

	// Pugs
	pugsGroup = new PugsGroup(MAX_PUGS_QTY);

	// Create the trampoline life timer object with autodestroy = false.
	trampolineLifeTimer = game.time.create(false)

	traceParticleEmitter = game.add.emitter(0, 0, 100);
	traceParticleEmitter.makeParticles('traceParticle');
  traceParticleEmitter.gravity = 50;
	traceParticleEmitter.setAlpha(0.3, 0.3);
	traceParticleEmitter.setScale(0.00001,0.00001);
	traceParticleEmitter.blendMode = Phaser.blendModes.NORMAL

}
