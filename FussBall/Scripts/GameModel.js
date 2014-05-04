/**
 * Created by AJ on 10/04/2014.
 */
"use strict";

var GameModel = function(){
    this.pitch = new Pitch();
    this.teamA = new Team( 'http://www.languagenut.com/images/nuts/150/de_nut.png' );
    this.teamB = new Team( 'http://www.languagenut.com/images/nuts/150/en_nut.png' );
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
