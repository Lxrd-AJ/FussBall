/**
 * Created by AJ on 10/04/2014.
 */
var Team = function(url){
    this.players = [];
    this.score = 0;
    this.positions = null;
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
            this.players[i].team = this;
        }
    },
    arrangePlayers : function( positions ){
        //this.positions = positions;
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
    },
    goalKeeperLongShot: function( ball, callBack ){
        //Move ball to keeper position if not there already
        var that = this;
        var animateToGoalKeeper = new Kinetic.Tween({
            node: ball.circle,
            duration: 1,
            easing: Kinetic.Easings.Linear,
            x: that.players[0].circle.x(),
            y: that.players[0].circle.y(),
            onFinish: function(){
                  //generate a random number between 1 and 11
                var playerNumber = Math.floor((Math.random()*10)+1);
                console.log( playerNumber );
                that.players[0].passToPlayer( that.players[playerNumber], ball , 0.9 );              
                
                if( callBack )
                    callBack();
            }
        });
        animateToGoalKeeper.play();
        //ball.setPosition( this.players[0].circle.x(), this.players[0].circle.y() );   
    },
    getNextPlayer : function(){
        var rand = Math.floor((Math.random()*10)+1);
        console.log( rand + " in function getNextPlayer() ");
        
        return this.players[ rand ];
    }
};