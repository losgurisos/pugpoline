
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

	// Right wall
	for(var i = 0; i < GOALS_QTY + 1; i++) {
		var rightWall = phaserFactory.createRectangularStaticSprite({ width: RIGHT_WALL_WIDTH, height: GAME_HEIGHT / GOALS_QTY - GOALS_HEIGHT, x: GAME_WIDTH - SCREEN_OFFSET_RIGHT, y: SCREEN_OFFSET_UP + i * GAME_HEIGHT / GOALS_QTY })
		rightWalls.push(rightWall);
	}
	// Left wall
	leftWall = phaserFactory.createRectangularStaticSprite({width: LEFT_WALL_WIDTH, height: GAME_HEIGHT, x: -1, y: 0 })

	// Starting platform
	startingPlatform = phaserFactory.createRectangularStaticSprite({width: STARTING_PLATFORM_WIDTH, height: STARTING_PLATFORM_HEIGHT, y: STARTING_PLATFORM_VERTICAL_POSITION})
	startingPugFallZone = phaserFactory.createRectangularStaticSprite({sensor: true, width: 30, height: 30, x: STARTING_PLATFORM_WIDTH + PUGS_CIRCLE_BODY_SIZE * 2 - 15, y: STARTING_PLATFORM_VERTICAL_POSITION - STARTING_PLATFORM_HEIGHT})

	// Pugs
	pugsGroup = new PugsGroup(MAX_PUGS_QTY);

	// Create the trampoline life timer object with autodestroy = false.
	trampolineLifeTimer = game.time.create(false)
	// Create trampoline trace particle emitter
	traceParticleEmitter = phaserFactory.createEmitter({sprite: 'traceParticle', minAlpha: 0.3, maxAlpha: 0.3, scaleWidth: 0.00001, scaleHeight: 0.00001});
}
