
function update() {
	trampolinesGroup.onUpdate();
	pugsGroup.onUpdate();
}

// The callback after the lifetime trampoline ends.
function trampolineLifeTimerCallback() {

	// remove trampoline (this) from screen and make it enabled to use it again.
	this.remove();

}
