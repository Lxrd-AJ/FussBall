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
    constructor: GameModel

};

