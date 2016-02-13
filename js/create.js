
function create() { 

	// start BOX2D physics.
	game.physics.startSystem(Phaser.Physics.BOX2D);

	// set game gravity.
    game.physics.box2d.gravity.y = GAME_GRAVITY;

    // set game friction.
    game.physics.box2d.friction = GAME_FRICTION;


    

}