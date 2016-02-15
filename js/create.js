
function create() { 

	// start BOX2D physics.
	game.physics.startSystem(Phaser.Physics.BOX2D);

	// set game gravity.
	game.physics.box2d.gravity.y = GAME_GRAVITY;

	// set game friction.
	game.physics.box2d.friction = GAME_FRICTION;

	// create game trampolines 
	for(var i = 0; i < MAX_TRAMPOLINE_QTY; i++) {

		// Add the sprite.
		var _trampoline = game.add.sprite(0,-100, 'trampoline');

		// Trampolines start as enable
		_trampoline.enabledToUseIt = true;

		// Enable trampoline BOX2D physics.
		game.physics.box2d.enable(_trampoline);

		// Set body as static.
		_trampoline.body.static = true;

		// Starts without body.
		_trampoline.body.removeFromWorld();

		// Starts invisible.
		_trampoline.visible = false;
		
		// Add it to trampoline array (group).
		trampolineGroup.push(_trampoline);
	}

	console.log(trampolineGroup);
	

	// Create the trampoline life timer object with autodestroy = false.
	trampolineLifeTimer = game.time.create(false)
   
}