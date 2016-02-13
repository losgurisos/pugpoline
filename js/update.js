
// The beginning's input of the trampoline's trace creation.
var beginningTraceInput = null;

function update() { 

	// User touch or click the screen and has not started the trace yet.
	if (game.input.activePointer.isDown && !beginningTraceInput){

		// Save input until the user ends the trace.
        beginningTraceInput = new Phaser.Point( game.input.x, game.input.y)


    // User end the trace and the beginning's trace exists.
    } else  if (game.input.activePointer.isUp && beginningTraceInput){
        
      	// Get the current input (the trace's ending).
        var endingTraceInput = new Phaser.Point(game.input.x, game.input.y);
        

        // Get the angle between beginning and ending inputs in Radians.
        var angleInRadians = Phaser.Point.angle(beginningTraceInput, endingTraceInput);

        // Convert it to degrees.
        var angleInDegrees = 180 * angleInRadians / Math.PI - 180;

		// Check if is a right-to-left trace.
        var rightToLeft = beginningTraceInput.x > endingTraceInput.x;


        /** Creating new trampoline */

        // Horizontal and Vertical trampoline adjusting.
        var horizontalAdjust = (endingTraceInput.x - beginningTraceInput.x) /2;
        var verticalAdjust = (endingTraceInput.y - beginningTraceInput.y) /2;

        // New trampoline instance.
       	var trampoline = game.add.sprite(beginningTraceInput.x + horizontalAdjust, beginningTraceInput.y + verticalAdjust, 'trampoline');

       	// Scale it to beginning-ending distance (if rightToLeft true, vertical scale negative to vertically invert the sprite);
        trampoline.scale.setTo(Phaser.Point.distance(beginningTraceInput, endingTraceInput)/100, rightToLeft ? -1 : 1);

        // Enable trampoline physics.
        game.physics.box2d.enable(trampoline);

        // Set body as static.
        trampoline.body.static = true;

        // Set angle (beginning-ending's angle).
        trampoline.body.angle = angleInDegrees;

        // Add it to trampoline group.
        trampolineGroup.push(trampoline);

        // Destroy the beginning of the trace's input.
        beginningTraceInput = null;

    }

}