
// Game
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game_div', { preload: preload, create: create, update: update, render: render });

// trampolines group
var trampolineGroup = [];

// pugs group
var pugsGroup = [];

// trampolines life timer
var trampolineLifeTimer;