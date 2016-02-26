
/** GAME CLASSES */

// Trampoline group Class.
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

// Trampoline Class.
function Trampoline (maxPosibleHits) {

	var _this = this;

	// Bounce animations pool.
	this.bounceAnimations = [];

	// Down anims dimension.
	this.bounceAnimationWidth;
	this.bounceAnimationHeight;

	// The trampoline trace starts from the right to the left (Boolean).
	this.rightToLeft;

	// Trampoline's sprite phaser instance (Phaser.Sprite).
	this.sprite;

	// Trampolines start as enable
	this.enabledToUseIt = true;

	// The lefter point of the trampoline (Phaser.Point).
	this.leftPoint;
	// The righter point of the trampoline (Phaser.Point).
	this.rightPoint;




	/* Init data. */

	// Init bounce anims pool with empty data.
	for (var i = 0; i < maxPosibleHits; i++) {
		this.bounceAnimations.push({});
	}

	// Create downAnimations - trampoline - upAnimations
	// In this order to bring up anims to front, and down anims to the back.

	createDownAnimations();

	createTrampolineSprite();

	createUpAnimations();


	// Hide trampoline from screen and make it usable again.
	this.remove = function() {
	
		// remove body from game.	
		this.sprite.body.removeFromWorld();

		// make sprite not visible.
		this.sprite.visible = false;

		// make it enabled to use it again.
		this.enabledToUseIt = true;

		// Hide all animations playing.
		hideAnimations();


	}

	// Hide all trampoline animations.
	function hideAnimations() {

		var _bounceAnimations = _this.bounceAnimations

		for(var i = 0; i < _bounceAnimations.length; i++){

			_bounceAnimations[i].down.visible = false;
			_bounceAnimations[i].up.visible = false;

		}

	}


	// Set trampoline position with the user inputs.
	this.setPosition = function (beginningTracePoint, endingTracePoint) {

		// Horizontal and Vertical trampoline adjusting.
		var horizontalAdjust = (endingTracePoint.x - beginningTracePoint.x) /2;
		var verticalAdjust = (endingTracePoint.y - beginningTracePoint.y) /2;

		this.sprite.body.x = beginningTracePoint.x + horizontalAdjust;
		this.sprite.body.y = beginningTracePoint.y + verticalAdjust;


		// Save locally, left and right ends.
		if( beginningTracePoint.x < endingTracePoint.x) {
			this.leftPoint = beginningTracePoint;
			this.rightPoint = endingTracePoint;
		} else {
			this.leftPoint = endingTracePoint;
			this.rightPoint = beginningTracePoint;
		}

	
	}

	// Start the bounce animation.
	this.startBounceAnimation = function (collisionPoint) {

		// Get anims from anims pool.
		var anims = getAvailableBounceAnims();

		// Set down anim position.
		anims.down.x = collisionPoint.x;
		anims.down.y = collisionPoint.y;
		
		// Set down anim angle.
		anims.down.angle = this.rightToLeft ? (this.sprite.angle) + 180  : this.sprite.angle;

		// Make it visible.
		anims.down.visible = true;

		// Play down anim.
		anims.down.play('show');
		
	}


	// Pug-trampoline collision callback
	this.pugTrampolineContactCallback = function (pug, trampoline, fixture1, fixture2, begin, contact) {
			

		// If  the collision is ending we dont need to start the animation again.
		if(!begin) return;

		if(pug.velocity.y < 0) return;




		var _horizontalAnimAdjusting = this.bounceAnimationWidth/2;
		var _verticalAnimAdjusting = this.bounceAnimationHeight/2;
		

		// this.leftPoint.y - Math.tan((angle + 180) * Math.PI / 180) * (pug.x - this.leftPoint.x) - this.bounceAnimations[0].down.height/2 ;
		

		// -- Getting pug's collision point with trampoline body. --

		// Getting vertical difference between left point and pug-trampoline's body collision (Thales) and subsctracted from trampoline leftPoint.y.
		var _y = this.leftPoint.y - (pug.x - this.leftPoint.x) * (this.leftPoint.y - this.rightPoint.y) / (this.rightPoint.x - this.leftPoint.x);
		// The horizontal collision is getted from the pug.
		var _x = pug.x;


		// Start bounce animation from the collision point.
		this.startBounceAnimation(new Phaser.Point( _x , _y ));

	}

	// Callback after down anim is complete.
	function onCompleteDownAnimationCallback (downAnim, anim) {


		/* Start the up anim */

		// Get index from this.
		var index = this;

		// Hide down animation.
		downAnim.visible = false;

		// Get Up Animation.
		upAnim = _this.bounceAnimations[index].up;

		// Set up anim position.
		upAnim.x = downAnim.x;
		upAnim.y = downAnim.y;

		// Set up anim angle (invert it if is right to left trace)
		upAnim.angle = _this.rightToLeft ? _this.sprite.angle + 180  :_this.sprite.angle ;

		// Make it visible.
		upAnim.visible = true;

		// Play up anim.
		upAnim.play('show');

	}

	// Callback after up anim is complete.
	function onCompleteUpAnimationCallback (upAnim) {
		upAnim.visible = false 
	}

	// Get the first available pair of anims from the bounce anims custom pool.
	function getAvailableBounceAnims () {

		var bounceAnimations = _this.bounceAnimations;

		for(var i = 0; i < bounceAnimations.length ; i++) {

			// If the two, up and down anim are finished.
			if(bounceAnimations[i].up.animations._anims.show.isFinished === true 
				&& bounceAnimations[i].down.animations._anims.show.isFinished === true)
					return bounceAnimations[i];
			
			
		}
		// For the doubts..
		return bounceAnimations[0];
	}


	// Create trampoline sprite.
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

	// Create down anims.
	function createDownAnimations() {

		// Create down bounce animations.
		for(var i = 0; i < maxPosibleHits; i++) {

			// Create sprite.
			var animDownSprite = game.add.sprite(150, 0, 'tramp_down');

			// Add show anim.
			animDownSprite.animations.add('show', [1,2,3,4,5,6]);

			// Starts as finished (available).
			animDownSprite.animations._anims.show.isFinished = true;

			// Set callback
			animDownSprite.animations._anims.show.onComplete.add(onCompleteDownAnimationCallback, i);

			// Starts invisible.
			animDownSprite.visible = false;

			// Set custom anchor.
			animDownSprite.anchor.x = 0.5;
			animDownSprite.anchor.y = 0.2;

			// Add it to custom anims pool.
			_this.bounceAnimations[i].down = animDownSprite;
		}

		// Get the down anims dimensions locally.
		_this.bounceAnimationWidth = _this.bounceAnimations[0].down.width;
		_this.bounceAnimationHeight = _this.bounceAnimations[0].down.height;


	}

	// Create up anims.
	function createUpAnimations() {

		var _upAnimations = [];

		// Create up bounce animations.
		for(var i = 0; i < maxPosibleHits; i++) {
			
			// Create sprite.
			var animUpSprite = game.add.sprite(150, 0, 'tramp_up');

			// Add show anim.
			animUpSprite.animations.add('show', [1,2,3,4,5,6]);

			// Starts as finished (available).
			animUpSprite.animations._anims.show.isFinished = true;

			// Set callback
			animUpSprite.animations._anims.show.onComplete.add(onCompleteUpAnimationCallback, i);

			// Starts invisible.
			animUpSprite.visible = false;

			// Set custom anchor.
			animUpSprite.anchor.x = 0.5;
			animUpSprite.anchor.y = 0.8;

			// Add it to custom anims pool.
			_this.bounceAnimations[i].up = animUpSprite;
		}

	}


}

