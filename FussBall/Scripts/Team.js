/**
 * Created by AJ on 10/04/2014.
 */
var Team = function(url){
    this.players = [];
    this.score = 0;
    //this.formation = [4,4,2];
    this.length = 11;
    this.country = url;
};

Team.prototype = {
    constructor: Team,
    instantiate : function( callBack ){
        //create 11 players and add to players array
        for( var i = 0; i < this.length; i++ ){
            this.players.push( new Player(this.country) );
        }
        this.instantiatePlayers( callBack );
    },//end function instantiate
    instantiatePlayers : function( callBack ){
        for( var i in this.players ){
            this.players[i].instantiate( callBack, function(){} );
        }
    },
    arrangePlayers : function( positions ){
        for( var i = 0; i < positions.length; i++ ){
            var xPos = positions[i].x * (window.innerWidth/100);
            var yPos = positions[i].y * (window.innerHeight/100);
            this.players[i].setPosition( xPos, yPos );
        }
    },
    changePlayersColor: function( color ){
        for( var i in this.players ){
            this.players[i].changeColor( color );
        }
    }
};


/*
Junk codes::::::::::

 //Arrange the players on the pitch based on the formation
 var scaleWidth = (window.screen.availWidth/2)/this.formation.length;
 var scaleHeight = window.screen.availHeight;
 var currWidth = 0;
 var currHeight = 0;
 var tempPlayers = [];
 for( var k = 0; k < this.formation.length; k++ ){
 currWidth += scaleWidth;
 scaleHeight = window.screen.availHeight / this.formation[k];
 for( var j = 0; j < this.formation[k]; j++ ){
 currHeight += scaleHeight - (scaleHeight/3);
 var temp = this.players.pop();
 temp.setPosition( currWidth, currHeight );
 tempPlayers.push( temp );
 }
 currHeight = 0;
 }
 //Add back to array
 for( var i in tempPlayers )
 this.players.push( tempPlayers[i] );

 */