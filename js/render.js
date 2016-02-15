
function render() { 
	if (trampolineGroup.length > 0) {
		for(var i = 0; i < trampolineGroup.length; i++)
			game.debug.body(trampolineGroup[i]);
	}
}