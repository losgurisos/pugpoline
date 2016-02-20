
/** GAME CLASSES */

function TrampolinesGroup (trampolineQty, maxPugsQty) {

	this.trampolines = [];

	
	// Create trampolines sprite instance.
	for(var i = 0; i < trampolineQty; i++)
		this.trampolines.push(new Trampoline(maxPugsQty));

	// Get the first trampoline in trampoline group enabled to use it.
	this.getFirstEnabledTrampoline = function () {

		for (var index in this.trampolines){
			if(this.trampolines[index].enabledToUseIt === true) {
				return this.trampolines[index]; 
			}
		}

		// All trampoline are already in the screen.
		return null;
	
	}

}

function Trampoline (maxPosibleHits) {


	var _this = this;

	// group of animations when a pug hit this trampoline.
	this.bounceAnimations = [];

	// Trampoline's sprite phaser instance.
	this.sprite;

	// Trampolines start as enable
	this.enabledToUseIt = true;


	// Init data.

	for (var i = 0; i < maxPosibleHits; i++) {
		this.bounceAnimations.push({});
	}

	
	createDownAnimations();

	createTrampolineSprite();

	createUpAnimations();

	this.remove = function() {
	
		// remove body from game.	
		this.sprite.body.removeFromWorld();

		// make sprite not visible.
		this.sprite.visible = false;

		// make it enabled to use it again.
		this.enabledToUseIt = true;


	}

	var currentPlayingAnimation = 0;

	this.startBounceAnimation = function (collissionPoint) {

		var _available = getAvailableBounceAnims();

		anims = _available.anims;
		anims.down.x = collissionPoint.x;
		anims.down.y = collissionPoint.y;
		anims.down.visible = true;
		anims.down.play('show');
		currentPlayingAnimation = _available.index;
		

		/*trampolineBounceAnimations.down.x = _collissionPoint.x;
		trampolineBounceAnimations.down.y = _collissionPoint.y;
		trampolineBounceAnimations.down.visible = true;
		trampolineBounceAnimations.down.play('show');
		trampolineBounceAnimations.down.animations.currentAnim.onComplete.add(function() {
			trampolineBounceAnimations.down.visible = false;
			trampolineBounceAnimations.up.x = _collissionPoint.x;
			trampolineBounceAnimations.up.y = _collissionPoint.y;
			trampolineBounceAnimations.up.visible = true;
			trampolineBounceAnimations.up.play('show');
			trampolineBounceAnimations.up.animations.currentAnim.onComplete.add(function() {
				trampolineBounceAnimations.up.visible = false;
			}, this);
		}, this);*/
	}

	// Pug-trampoline collision callback
	this.pugTrampolineContactCallback = function (body1, body2, fixture1, fixture2, begin, contact) {

		console.log('hola');

		// Get collision Point.
		var collissionPoint = new Phaser.Point(body1.x - this.bounceAnimations[0].down.width/2, body1.y);

		// Start bounce animation.
		this.startBounceAnimation(collissionPoint)
	}

	function startUpAnimation (downAnim, anim) {
		downAnim.visible = false;

		upAnim = _this.bounceAnimations[currentPlayingAnimation].up;

		upAnim.x = downAnim.x;
		upAnim.y = downAnim.y;
		upAnim.visible = true;
		upAnim.play('show');

		upAnim.animations._anims.show.onComplete.add(function(){
			upAnim.visible = false 
		})

	}

	function getAvailableBounceAnims () {
		var bounceAnimations = _this.bounceAnimations;

		for(var i = 0; i < bounceAnimations.length ; i++) {
			if(bounceAnimations[i].up.animations._anims.show.isFinished === true){
				return { anims: bounceAnimations[i], index: i};
			}
		}
	}




	function createTrampolineSprite() {

		// Get the sprite.
		_this.sprite = game.add.sprite(0,-100, 'trampoline');

		// Enable trampoline BOX2D physics.
		game.physics.box2d.enable(_this.sprite);

		// Set body as static.
		_this.sprite.body.static = true;

		// Starts without body.
		_this.sprite.body.removeFromWorld();

		// Starts invisible.
		_this.sprite.visible = false;

	}

	function createDownAnimations() {

		// Create down bounce animations.
		for(var i = 0; i < maxPosibleHits; i++) {

			var animDownSprite = game.add.sprite(150, 0, 'tramp_down');
			animDownSprite.animations.add('show', [1,2,3,4,5,6]);

			console.log(animDownSprite.animations._anims.show.onComplete.add)
			animDownSprite.animations._anims.show.isFinished = true;
			animDownSprite.animations._anims.show.onComplete.add(startUpAnimation, 'asd');
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
			animUpSprite.animations._anims.show.isFinished = true;
			animUpSprite.visible = false;

			_this.bounceAnimations[i].up = animUpSprite;
		}

	}


}

