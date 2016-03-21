
function create() {

	// Start BOX2D physics.
	game.physics.startSystem(Phaser.Physics.BOX2D);

	// Set stage background color.
	game.stage.backgroundColor = BACKGROUND_COLOR;

	// Set config gravity.
	game.physics.box2d.gravity.y = GAME_GRAVITY;

	// Set config friction.
	game.physics.box2d.friction = GAME_FRICTION;

	// Get TrampolinesGroup instance.
	trampolinesGroup = new TrampolinesGroup(MAX_TRAMPOLINE_QTY, MAX_PUGS_QTY);

	console.log(trampolinesGroup);

	// Get GoalsGroup instance.
	goalsGroup = new GoalsGroup(GOALS_QTY);

	console.log(goalsGroup);

	rightWall = game.add.sprite(GAME_WIDTH-SCREEN_OFFSET_RIGHT, SCREEN_OFFSET_UP ,null )
	game.physics.box2d.enable(rightWall)
	rightWall.body.static = true;
	console.log(rightWall.body.setRectangle(30,GAME_HEIGHT,0,GAME_HEIGHT/2,0))
	//rightWall.body.sprite.scale.setTo(1,GAME_HEIGHT /  rightWall.height) ;


	// Pugs

	for(var i = 0; i < MAX_PUGS_QTY; i++) {

		// Get the sprite.
		var _pug = game.add.sprite(80, 0, 'pug');

		// Enable pug BOX2D physics.
		game.physics.box2d.enable(_pug);

		// Starts circle body.
		_pug.body.setCircle(PUGS_CIRCLE_BODY_SIZE);

		// Set pug restitution.
		_pug.body.restitution = PUGS_RESTITUTION;

		// set pug-trampoline collision callbacks
		for(var j = 0; j < trampolinesGroup.length; j++){
			var _trampoline = trampolinesGroup.trampolines[j];
			_pug.body.setBodyContactCallback(_trampoline.sprite, _trampoline.pugTrampolineContactCallback, _trampoline);
		}

		for(var j = 0; j < goalsGroup.length; j++) {
			var goal = goalsGroup.goals[j];
			_pug.body.setBodyContactCallback(goal.sprite, goal.pugGoalContactCallback, goal);

		}

		// Add it to pugs array (group).
		pugsGroup.push(_pug);

	}


	// Create the trampoline life timer object with autodestroy = false.
	trampolineLifeTimer = game.time.create(false)

}