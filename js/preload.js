
// loading game assets

function preload() {

	game.load.spritesheet('pug_walk', 'assets/pug_walk.png', 62, 58, 6);
	game.load.spritesheet('pug_swim', 'assets/pug_swim.png', 67, 61, 6);
	game.load.spritesheet('tramp_up', 'assets/tramp_up.png', 70, 17, 6);
	game.load.spritesheet('tramp_down', 'assets/tramp_down.png', 70, 25, 6)
	game.load.image('trampoline', 'assets/trampoline.png', 800, 64, 15);
	game.load.image('traceParticle', 'assets/blue.png');
	game.load.image("background_1", "assets/bg1.png");
	game.load.image("water", "assets/water.png");
	game.load.image("platform", "assets/platform.png");
	game.load.image("goal", "assets/goal.png");

}
