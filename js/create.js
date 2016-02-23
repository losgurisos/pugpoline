
function create() { 

	// Start BOX2D physics.
	game.physics.startSystem(Phaser.Physics.BOX2D);

	// Set config gravity.
	game.physics.box2d.gravity.y = GAME_GRAVITY;

	// Set config friction.
	game.physics.box2d.friction = GAME_FRICTION;

	// Set Trampolines 
	trampolinesGroup = new TrampolinesGroup(MAX_TRAMPOLINE_QTY, MAX_PUGS_QTY);

	console.log(trampolinesGroup);


	// Pugs

	for(var i = 0; i < MAX_PUGS_QTY; i++) {

		// Get the sprite.
		var _pug = game.add.sprite(i*30, 0, 'pug');

		// Enable pug BOX2D physics.
		game.physics.box2d.enable(_pug);

		// Starts circle body.
		_pug.body.setCircle(PUGS_CIRCLE_BODY_SIZE);

		// Set pug restitution.
		_pug.body.restitution = PUGS_RESTITUTION;

		// Starts invisible.
		//_pug.visible = false;

		// set pug-trampoline collision callbacks
		for(var j = 0; j < trampolinesGroup.trampolines.length; j++){
			var _trampoline = trampolinesGroup.trampolines[j];
			_pug.body.setBodyContactCallback(_trampoline.sprite, _trampoline.pugTrampolineContactCallback, _trampoline);
		}
		
		// Add it to pugs array (group).
		pugsGroup.push(_pug);

	}


	// Create the trampoline life timer object with autodestroy = false.
	trampolineLifeTimer = game.time.create(false)
   
}