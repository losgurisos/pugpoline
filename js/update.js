
// The beginning's input of the trampoline's trace creation.
var beginningTraceInput = null;

function update() { 

	// User touch or click the screen and has not started the trace yet.
	if (game.input.activePointer.isDown && !beginningTraceInput){

		// Save input until the user ends the trace.
		beginningTraceInput = new Phaser.Point( game.input.x, game.input.y)


	// User end the trace and the beginning's trace exists.
	} else  if (game.input.activePointer.isUp && beginningTraceInput){

		// Get the current input (the trace's ending).
		var endingTraceInput = new Phaser.Point(game.input.x, game.input.y);
		

		// Get the angle between beginning and ending inputs in Radians.
		var angleInRadians = Phaser.Point.angle(beginningTraceInput, endingTraceInput);

		// Convert it to degrees.
		var angleInDegrees = 180 * angleInRadians / Math.PI - 180;

		// Check if is a right-to-left trace.
		var rightToLeft = beginningTraceInput.x > endingTraceInput.x;


		/** Creating new trampoline */

		// Horizontal and Vertical trampoline adjusting.
		var horizontalAdjust = (endingTraceInput.x - beginningTraceInput.x) /2;
		var verticalAdjust = (endingTraceInput.y - beginningTraceInput.y) /2;

		// get first enabled trampoline.    

		getFirstEnabledTrampoline( function(trampoline){
			
			if(trampoline !== null) {

			

				// Scale it to beginning-ending distance (if rightToLeft true, vertical scale negative to vertically invert the sprite);
				trampoline.scale.setTo(Phaser.Point.distance(beginningTraceInput, endingTraceInput)/100, rightToLeft ? -1 : 1);

								// setting trampoline new position
				trampoline.body.x = beginningTraceInput.x + horizontalAdjust;
				trampoline.body.y = beginningTraceInput.y + verticalAdjust;

				// Make sprite visible
				trampoline.visible = true;

				// Set angle (beginning-ending's angle).
				trampoline.body.angle = angleInDegrees;

				// testing body
				trampoline.body.setRectangleFromSprite({width:Phaser.Point.distance(beginningTraceInput, endingTraceInput), height:1});

				// Add lifetime to the trampoline and disable to use it until lifetime
				trampoline.enabledToUseIt = false;
				trampolineLifeTimer.add(TRAMPOLINE_LIFETIME_IN_SECONDS * Phaser.Timer.SECOND, trampolineLifeTimerCallback, trampoline);
				trampolineLifeTimer.start();

			   
			}

		});

		// Destroy the trace beginning's input.
		beginningTraceInput = null;

	}

}

// The callback after the lifetime trampoline
function trampolineLifeTimerCallback() {

	// context: trampoline (this).

	// remove body from game.
	this.body.removeFromWorld();

	// make sprite not visible.
	this.visible = false;

	// make it enable to use it again.
	this.enabledToUseIt = true;


}


// Get the first trampoline in trampoline group enabled to use it.
function getFirstEnabledTrampoline(cb) {

	for (var index in trampolineGroup){
		if(trampolineGroup[index].enabledToUseIt === true) {
			cb(trampolineGroup[index]); 
			return;
		}
	}

	// All trampoline are in the screen.
	cb(null); 
	return;
	
}