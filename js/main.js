
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
var leftWall;
var startingPlatform;
var startingPugFallZone;

// Score
var score;

// trace particle emitter
var traceParticleEmitter
// trampoline length live restrictions
var minimumTrampolineLength = MINIMUM_TRAMPOLINE_LENGTH;
var maximumTrampolineLength = MAXIMUM_TRAMPOLINE_LENGTH;

// SpriteFactory
var phaserFactory = new PhaserFactory();
