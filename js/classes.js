
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

	this.bounceAnimationWidth;
	this.bounceAnimationHeight;

	// The trampoline trace starts from the right to the left.
	this.rightToLeft;

	// Trampoline's sprite phaser instance.
	this.sprite;

	// Trampolines start as enable
	this.enabledToUseIt = true;


	this.leftPoint;
	this.rightPoint;


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

	this.setPosition = function (beginningTracePoint, endingTracePoint) {

		// Horizontal and Vertical trampoline adjusting.
		var horizontalAdjust = (endingTracePoint.x - beginningTracePoint.x) /2;
		var verticalAdjust = (endingTracePoint.y - beginningTracePoint.y) /2;

		this.sprite.body.x = beginningTracePoint.x + horizontalAdjust;
		this.sprite.body.y = beginningTracePoint.y + verticalAdjust;

		if( beginningTracePoint.x < endingTracePoint.x) {
			this.leftPoint = beginningTracePoint;
			this.rightPoint = endingTracePoint;
		} else {
			this.leftPoint = endingTracePoint;
			this.rightPoint = beginningTracePoint;
		}

	
	}


	this.startBounceAnimation = function (collissionPoint) {

		var anims = getAvailableBounceAnims();

		anims.down.x = collissionPoint.x;
		anims.down.y = collissionPoint.y;
		
		anims.down.angle = this.rightToLeft ? (this.sprite.angle) + 180  : this.sprite.angle;
		anims.down.visible = true;
		anims.down.play('show');
		
	}

	// Pug-trampoline collision callback
	this.pugTrampolineContactCallback = function (pug, trampoline, fixture1, fixture2, begin, contact) {

		var _horizontalAnimAdjusting = this.bounceAnimationWidth/2;
		var _verticalAnimAdjusting = this.bounceAnimationHeight/2;
		

		// this.leftPoint.y - Math.tan((angle + 180) * Math.PI / 180) * (pug.x - this.leftPoint.x) - this.bounceAnimations[0].down.height/2 ;
		

		// -- Getting pug's collision point with trampoline body. --

		// Getting vertical difference between left point and pug-trampoline's body colission (Thales) and subsctracted from trampoline leftPoint.y.
		var _y = this.leftPoint.y - (pug.x - this.leftPoint.x) * (this.leftPoint.y - this.rightPoint.y) / (this.rightPoint.x - this.leftPoint.x);
		// The horizontal collision is getted from the pug.
		var _x = pug.x;


		// Start bounce animation.
		this.startBounceAnimation(new Phaser.Point( _x , _y ));

	}

	function onCompleteDownAnimationCallback (downAnim, anim) {

		// Get index from this.
		var index = this;

		// Hide down animation.
		downAnim.animations._anims.show.isFinished = true;
		downAnim.visible = false;

		// Get Up Animation.
		upAnim = _this.bounceAnimations[index].up;


		upAnim.x = downAnim.x;
		upAnim.y = downAnim.y;
		upAnim.angle = _this.rightToLeft ? _this.sprite.angle + 180  :_this.sprite.angle ;
		upAnim.visible = true;
		upAnim.play('show');

	}

	function onCompleteUpAnimationCallback (upAnim) {
		upAnim.animations._anims.show.isFinished = true;
		upAnim.visible = false 
	}

	function getAvailableBounceAnims () {
		var bounceAnimations = _this.bounceAnimations;
		console.log(bounceAnimations);
		for(var i = 0; i < bounceAnimations.length ; i++) {
			// This is not working well. Fix later.
			if(bounceAnimations[i].up.animations._anims.show.isFinished === true ){
				return bounceAnimations[i];
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
			animDownSprite.animations._anims.show.onComplete.add(onCompleteDownAnimationCallback, i);
			animDownSprite.visible = false;
			animDownSprite.anchor.x = 0.5;
			animDownSprite.anchor.y = 0.2;

			_this.bounceAnimations[i].down = animDownSprite;
		}

		_this.bounceAnimationWidth = _this.bounceAnimations[0].down.width;
		_this.bounceAnimationHeight = _this.bounceAnimations[0].down.height;


	}

	function createUpAnimations() {

		var _upAnimations = [];

		// Create up bounce animations.
		for(var i = 0; i < maxPosibleHits; i++) {
			
			var animUpSprite = game.add.sprite(150, 0, 'tramp_up');
			animUpSprite.animations.add('show', [1,2,3,4,5,6]);
			animUpSprite.animations._anims.show.isFinished = true;
			animUpSprite.animations._anims.show.onComplete.add(onCompleteUpAnimationCallback, i);
			animUpSprite.visible = false;
			animUpSprite.anchor.x = 0.5;
			animUpSprite.anchor.y = 0.8;

			_this.bounceAnimations[i].up = animUpSprite;
		}

	}


}

