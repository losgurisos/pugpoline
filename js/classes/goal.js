
function Goal (x, y , sprite) {

    // Phaser sprite object.
    this.sprite = null;

    function init(){

        var _sprite = game.add.sprite(0, 0 , sprite || null)

        // Enable pug BOX2D physics.
        game.physics.box2d.enable(_sprite);

        // Set body as static.
        _sprite.body.static = true;

        //_sprite.body.SetSensor(true);

        _sprite.body.setRectangle(GOALS_WIDTH, GOALS_HEIGHT, x, y).SetSensor(true);

        this.sprite = _sprite;

    }

    this.pugGoalContactCallback = function(pug, goal, fixture1, fixture2, begin, contact) {
        if(begin)
            score.AddScore();

        pug.velocity.x += 10000;
    };

    // Init goal phaser object.
    init.call(this)

}
