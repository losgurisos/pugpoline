
// The beginning's input of the trampoline's trace creation.
var beginningTraceInput = null;
// The last trance input
var lastTraceInput = null;

function update() {

	// User touch or click the screen and starts the trampoline trace.
	if (game.input.activePointer.isDown ){
		// Check if pointer is moving
		// comparing last trace point saved to user pointer
		if(lastTraceInput && Phaser.Point.distance(lastTraceInput, game.input) > 0)
			// If is moving, show trace particle burst
			traceParticleBurst(game.input);

		// Save last trace input
		lastTraceInput = new Phaser.Point( game.input.x, game.input.y);

		if(!beginningTraceInput)
			// Save input until the user ends the trace.
			beginningTraceInput = new Phaser.Point( game.input.x, game.input.y)

	} else if (game.input.activePointer.isUp && beginningTraceInput){
		// User end the trampoline trace.
		try{
			// get first enabled trampoline and show it if exists
			trampolinesGroup.getFirstEnabledTrampoline()
					.drawTrampoline(beginningTraceInput, new Phaser.Point(game.input.x, game.input.y));
		} catch(e){
			console.log('There are no trampoline available!')
			// do nothing.
		}

		// Destroy the trace beginning's input.
		beginningTraceInput = null;
	}

	pugsGroup.forEach(function(pug){
		var pugBody = pug.body;

		if (pugBody.y > 630){
			pugBody.x = 0;//Math.random() * 800 - SCREEN_OFFSET_RIGHT - 50;
			pugBody.y = - 30;
			pugBody.setZeroVelocity();
			pugBody.velocity.x = 300 * Math.random() + 100;
		}
	});
}

// The callback after the lifetime trampoline ends.
function trampolineLifeTimerCallback() {

	// remove trampoline (this) from screen and make it enabled to use it again.
	this.remove();

}

function traceParticleBurst(pointer) {

    //  Position the emitter where the mouse/touch event was
    traceParticleEmitter.x = pointer.x;
    traceParticleEmitter.y = pointer.y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    traceParticleEmitter.start(true, 500, null, 3);

}
