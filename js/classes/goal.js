
function Goal (x, y , assetPlatform, assetGoal, score) {

    score = score || function(){}
    // Phaser sprite objects.
    this.spritePlatform = null;
    this.spriteGoal = null;

    function init(){
        // CREATE PLATFORM
        // Create phaser sprite
        var _spritePlatform = game.add.sprite(x, y , assetPlatform || null)
        // Enable pug BOX2D physics.
        game.physics.box2d.enable(_spritePlatform);
        // Set body as static.
        _spritePlatform.body.static = true;
        // Create platform rectangle
        _spritePlatform.body.setRectangle(GOALS_PLATFORM_WIDTH, GOALS_PLATFORM_HEIGHT, 0, 0);
        // Set to Goal instance
        this.spritePlatform = _spritePlatform;

        // CREATE GOAL
        var goalPosition = GoalHelper.getGoalPositionFromPlatformPosition(x, y);
        // Create phaser sprite
        var _spriteGoal = game.add.sprite(goalPosition.x, goalPosition.y , assetGoal || null)
        // Enable pug BOX2D physics.
        game.physics.box2d.enable(_spriteGoal);
        // Set body as static.
        _spriteGoal.body.static = true;
        // Create platform rectangle
        _spriteGoal.body.setRectangle(GOALS_WIDTH, GOALS_HEIGHT, 0, 0).SetSensor(true);
        // Set to Goal instance
        this.spriteGoal = _spriteGoal;

    }

    this.pugGoalContactCallback = function(pug, goal, fixture1, fixture2, begin, contact) {
        if(begin) score();
        // TODO pug victory animation
    };

    // Init goal phaser objects.
    init.call(this)

}

var method = Goal.prototype;

method.getSprite = function(){
  return this.spriteGoal;
}
method.getSpritePlatform = function(){
  return this.spritePlatform;
}
