
/** GAME CLASSES */

// Trampoline group Class.
function TrampolinesGroup (trampolineQty, maxPugsQty) {

	this.trampolines = [];

	// The beginning's input of the trampoline's trace creation.
	this.beginningTraceInput = null;
	// The last trance input
	this.lastTraceInput = null;



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

	};

	this.length = this.trampolines.length;
}

var method = TrampolinesGroup.prototype;

method.getTrampolines = function(){
	return this.trampolines.map(function(pug) {return pug.sprite;});
};

method.onUpdate = function(){

	// User touch or click the screen and starts the trampoline trace.
	if (game.input.activePointer.isDown ){
		// Check if pointer is moving
		// comparing last trace point saved to user pointer
		if(this.lastTraceInput && Phaser.Point.distance(this.lastTraceInput, game.input) > 0)
			// If is moving, show trace particle burst
			traceParticleEmitter.traceParticleBurst(game.input);

		// Save last trace input
		this.lastTraceInput = new Phaser.Point( game.input.x, game.input.y);

		if(!this.beginningTraceInput)
			// Save input until the user ends the trace.
			this.beginningTraceInput = new Phaser.Point( game.input.x, game.input.y)

	} else if (game.input.activePointer.isUp && this.beginningTraceInput){
		// User end the trampoline trace.

			// get first enabled trampoline and show it if exists
		var enabledTrampoline = this.getFirstEnabledTrampoline()
		if(enabledTrampoline)
			enabledTrampoline.drawTrampoline(this.beginningTraceInput, new Phaser.Point(game.input.x, game.input.y));
		else
			console.log('There are no trampoline available!')

		// Destroy the trace beginning's input.
		this.beginningTraceInput = null;
	}
}

method.forEach = function (cb) {
	this.trampolines.forEach(function(trampoline){cb(trampoline)})
}
