
// The beginning's input of the trampoline's trace creation.
var beginningTraceInput = null;

function update() { 

	// User touch or click the screen and starts the trampoline trace.
	if (game.input.activePointer.isDown && !beginningTraceInput){

		// Save input until the user ends the trace.
		beginningTraceInput = new Phaser.Point( game.input.x, game.input.y)


	// User end the trampoline trace.
	} else if (game.input.activePointer.isUp && beginningTraceInput){


		// get first enabled trampoline.    

		var trampoline = trampolinesGroup.getFirstEnabledTrampoline();
			
		if(trampoline !== null) {

			var trampolineSprite = trampoline.sprite;

			if(trampolineSprite !== null) {


				// Get the current input (the trace's ending).
				var endingTraceInput = new Phaser.Point(game.input.x, game.input.y);
				

				// Get the angle between beginning and ending inputs in Radians.
				var angleInRadians = Phaser.Point.angle(beginningTraceInput, endingTraceInput);

				// Converted to degrees.
				var angleInDegrees = 180 * angleInRadians / Math.PI - 180;

				// Is a right-to-left trace?
				var rightToLeft = trampoline.rightToLeft = beginningTraceInput.x > endingTraceInput.x;

				// Horizontal and Vertical trampoline adjusting.
				
		
				// Scale it to beginning-ending distance (if rightToLeft true, vertical scale negative to vertically invert the sprite);
				trampolineSprite.scale.setTo(Phaser.Point.distance(beginningTraceInput, endingTraceInput)/100, rightToLeft ? -1 : 1);

				// Setting trampoline new position
				//trampoline.setPosition( new Phaser.Point( beginningTraceInput.x + horizontalAdjust, beginningTraceInput.y + verticalAdjust)) ;
				trampoline.setPosition(  beginningTraceInput, endingTraceInput) ;


				// Make sprite visible
				trampolineSprite.visible = true;

				// Set angle (beginning-ending's angle).
				trampolineSprite.body.angle = angleInDegrees;

				// Set body as a line.
				trampolineSprite.body.setRectangleFromSprite({width:Phaser.Point.distance(beginningTraceInput, endingTraceInput) * 0.8, height:1});

				

				// Disable to use it again until lifetime end callback
				trampoline.enabledToUseIt = false;

				// Add lifetime to the trampoline
				trampolineLifeTimer.add(TRAMPOLINE_LIFETIME_IN_SECONDS * Phaser.Timer.SECOND, trampolineLifeTimerCallback, trampoline);
				trampolineLifeTimer.start();

			}

		   
		}



		// Destroy the trace beginning's input.
		beginningTraceInput = null;


	}

	// reset pugs's Y position if reach the bottom.
	for(var i = 0; i < pugsGroup.length; i++){
		if (pugsGroup[i].body.y > 630){
            pugsGroup[i].body.x =  Math.random() * 800;
            pugsGroup[i].body.y = Math.random() * -200;
            pugsGroup[i].body.setZeroVelocity();
   		}
	}	

		//console.log(trampolinesGroup.trampolines[0].bounceAnimations[0].down.animations._anims.show.isFinished + ' - ' + trampolinesGroup.trampolines[0].bounceAnimations[0].up.animations._anims.show.isFinished )



}

// The callback after the lifetime trampoline ends.
function trampolineLifeTimerCallback() {

	// remove trampoline (this) from screen and make it enabled to use it again.
	this.remove();

}

