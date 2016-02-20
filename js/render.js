
function render() { 
	if (trampolinesGroup.trampolines.length > 0) {
		for(var i = 0; i < trampolinesGroup.trampolines.length; i++)
			game.debug.body(trampolinesGroup.trampolines[i]);
	}
}