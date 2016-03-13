
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

	this.length = function(){
        return this.trampolines.length;
    }.apply(this)

}