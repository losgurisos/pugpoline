
function Goal (x, y , sprite) {

    // Phaser sprite object.
    this.sprite;

    function init(){

        this.sprite = game.add.sprite(x, y , sprite || null);

        // Enable pug BOX2D physics.
        game.physics.box2d.enable(this.sprite);

        // Set body as static.
        this.sprite.body.static = true;

    }

    // Init goal phaser object.
    init.apply(this)

}
