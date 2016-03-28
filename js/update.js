
// The beginning's input of the trampoline's trace creation.
var beginningTraceInput = null;

function update() { 

	// User touch or click the screen and starts the trampoline trace.
	if (game.input.activePointer.isDown && !beginningTraceInput){

		// Save input until the user ends the trace.
		beginningTraceInput = new Phaser.Point( game.input.x, game.input.y)


	// User end the trampoline trace.
	} else if (game.input.activePointer.isUp && beginningTraceInput){

		try{
			// get first enabled trampoline and show it if exists
			trampolinesGroup.getFirstEnabledTrampoline()
					.drawTrampoline(beginningTraceInput, new Phaser.Point(game.input.x, game.input.y));
		} catch(e){
			// do nothing.
		}

		// Destroy the trace beginning's input.
		beginningTraceInput = null;
	}

	// reset pugs's Y position if reach the bottom.
	for(var i = 0; i < pugsGroup.length; i++){

		var _pugBody = pugsGroup[i].body;

		if (_pugBody.y > 630){
           	_pugBody.x = Math.random() * 800;
            _pugBody.y = Math.random() * -200;
            _pugBody.setZeroVelocity();
   		}
	}
}

// The callback after the lifetime trampoline ends.
function trampolineLifeTimerCallback() {

	// remove trampoline (this) from screen and make it enabled to use it again.
	this.remove();

}

