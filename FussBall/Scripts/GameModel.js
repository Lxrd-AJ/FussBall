/**
 * Created by AJ on 10/04/2014.
 */
"use strict";

var GameModel = function(){
    this.pitch = new Pitch();
    /*
    this.teamA = new Team( 'http://www.languagenut.com/images/nuts/150/de_nut.png' , 'GER' );
    this.teamB = new Team( 'http://www.languagenut.com/images/nuts/150/en_nut.png', 'ENG' );
    */
    this.teams = [ this.teamA, this.teamB ];
    this.currentPlayerTeam = 0;
    this.gameSounds = new Sounds();
    this.ball = new Ball();
};

GameModel.prototype = {
    constructor: GameModel,
    getTeams: function(){
        return {
            'TeamA' : this.teamA,
            'TeamB' : this.teamB
        }
    },
    teamDidScoreGoal: function( teamRef ){
        // Do all necessary actions to show goal scored
        this.gameSounds.playGoalScoredSound();
        teamRef.score++;
    },
    nextPlayer: function(){
        return this.teams[ ++this.currentPlayerTeam % this.teams.length ];
    },
    currentPlayer: function(){
        return this.teams[ this.currentPlayerTeam % this.teams.length ];
    },
    setTeams: function( a, b ){
        this.teams[0] = a;
        this.teams[1] = b;
    }

};


