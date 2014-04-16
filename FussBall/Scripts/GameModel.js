/**
 * Created by AJ on 10/04/2014.
 */
"use strict";

var GameModel = function(){
    this.pitch = new Pitch();
    this.teamA = new Team( 'Resources/ball.png' );
    this.teamB = new Team( 'Resources/ball.png' );
    this.ball = new Ball();
};

GameModel.prototype = {
    constructor: GameModel,
    moveBallToPlayer: function( PlayerRef ){
        var offset = 10;
        var tween = new Kinetic.Tween({
            node: this.ball.circle,
            duration: 1,
            easing: Kinetic.Easings.EaseInOut,
            x: PlayerRef.circle.x() + offset,
            y: PlayerRef.circle.y() + offset
        });
        tween.play();
    }
};

