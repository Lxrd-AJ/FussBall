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
    getScores: function(){
        return {
            'TeamA' : this.teamA.score,
            'TeamB' : this.teamB.score
        }
    },
    teamDidScoreGoal: function( teamRef ){
        // Do all necessary actions to show goal scored
        teamRef.score++;
    }

};
