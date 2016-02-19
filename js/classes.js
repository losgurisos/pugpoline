
/** GAME CLASSES */

function TrampolinesGroup (trampolineQty, maxPugsQty) {

	this.trampolines = [];

	
	// Create trampolines sprite instance.
	for(var i = 0; i < trampolineQty; i++)
		this.trampolines.push(new Trampoline(maxPugsQty));
	

}

function Trampoline (maxPosibleHits) {


	var _this = this;

	this.bounceAnimations = [];
	this.trampoline;



	for (var i = 0; i < maxPosibleHits; i++) {
		this.bounceAnimations.push({});
	}


	
	createDownAnimations();

	createTrampolineSprite();

	createUpAnimations();



	function createTrampolineSprite() {

		// Get the sprite.
		_this.trampoline = game.add.sprite(0,-100, 'trampoline');

		// Trampolines start as enable
		_this.trampoline.enabledToUseIt = true;

		// Enable trampoline BOX2D physics.
		game.physics.box2d.enable(_this.trampoline);

		// Set body as static.
		_this.trampoline.body.static = true;

		// Starts without body.
		_this.trampoline.body.removeFromWorld();

		// Starts invisible.
		_this.trampoline.visible = false;

	}

	function createDownAnimations() {

		// Create down bounce animations.
		for(var i = 0; i < maxPosibleHits; i++) {

			var animDownSprite = game.add.sprite(150, 0, 'tramp_down');
			animDownSprite.animations.add('show', [1,2,3,4,5,6]);
			animDownSprite.visible = false;

			_this.bounceAnimations[i].down = animDownSprite;
		}

	}

	function createUpAnimations() {

		var _upAnimations = [];

		// Create up bounce animations.
		for(var i = 0; i < maxPosibleHits; i++) {
			
			var animUpSprite = game.add.sprite(150, 0, 'tramp_up');
			animUpSprite.animations.add('show', [1,2,3,4,5,6]);
			animUpSprite.visible = false;

			_this.bounceAnimations[i].up = animUpSprite;
		}

	}

}

