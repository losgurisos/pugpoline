
// Game
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game_div', { preload: preload, create: create, update: update, render: render });

// trampolines group object (TrampolinesGroup)
var trampolinesGroup;

// pugs group
var pugsGroup = [];

// trampolines life timer
var trampolineLifeTimer;

// Goals group object (GoalsGroup)
var goalsGroup;

// Walls
var rightWalls = [];

// Score
var score;

// trace particle emitter
var traceParticleEmitter
