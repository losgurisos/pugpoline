
function create() { 

	// Start BOX2D physics.
	game.physics.startSystem(Phaser.Physics.BOX2D);

	// Set config gravity.
	game.physics.box2d.gravity.y = GAME_GRAVITY;

	// Set config friction.
	game.physics.box2d.friction = GAME_FRICTION;

	console.log(new TrampolinesGroup(MAX_TRAMPOLINE_QTY, MAX_PUGS_QTY ));

	// Trampolines 

	for(var i = 0; i < MAX_TRAMPOLINE_QTY; i++) {

		// Get the sprite.
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


	// Pugs

	for(var i = 0; i < MAX_PUGS_QTY; i++) {

		// Get the sprite.
		var _pug = game.add.sprite(150, 0, 'pug');

		// Enable pug BOX2D physics.
		game.physics.box2d.enable(_pug);

		// Starts circle body.
		_pug.body.setCircle(PUGS_CIRCLE_BODY_SIZE);

		// Set pug restitution.
		_pug.body.restitution = PUGS_RESTITUTION;

		// Starts invisible.
		//_pug.visible = false;

		// set pug-trampoline collision callbacks
		for(var j = 0; j < trampolineGroup.length; j++){
			console.log(_pug.body.setBodyContactCallback);
			_pug.body.setBodyContactCallback(trampolineGroup[j], pugTrampolineContactCallback, this);
		}
		
		// Add it to pugs array (group).
		pugsGroup.push(_pug);

	}


	var _start = function () {
		console.log('hola');
		return this;
	}

	var _getAnimation = function() {
		return this[0].animations.down;
	}

	

	// Trampolines bounce animations.

	for(var i = 0; i < MAX_PUGS_QTY; i++) {

		var _trampBounceAnimDown = game.add.sprite(150, 0, 'tramp_down');
		_trampBounceAnimDown.animations.add('show', [1,2,3,4,5,6]);
		_trampBounceAnimDown.visible = false;

		var _trampBounceAnimUp = game.add.sprite(150, 0, 'tramp_up');
		_trampBounceAnimUp.animations.add('show', [1,2,3,4,5,6]);
		_trampBounceAnimUp.visible = false;

		

		trampolinesBounce.push({
			animations: {
				up : _trampBounceAnimUp,
				down: _trampBounceAnimDown
			},
			start: _start,
			getAnimation: _getAnimation

			
		});
	}

	
	


	
	

	// Create the trampoline life timer object with autodestroy = false.
	trampolineLifeTimer = game.time.create(false)
   
}