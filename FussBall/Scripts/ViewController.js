/**
 * Created by AJ on 10/04/2014.
 */


//All layer adding is done in the view controller
var stage = new Kinetic.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
});
var gameModel = new GameModel();
var questionAlert = new AlertView();
var scoreView = new ScoreView();
var gameOver = false;
var beginningOfMatch = null;

//create the pitch
gameModel.pitch.instantiate( function(){
    gameModel.pitch.getLayer().add( gameModel.pitch._pitchImage );
    stage.add(gameModel.pitch.getLayer());
});
//create the first team
gameModel.teamA.instantiate( function( player ) {
    stage.add(player.layer);
    player.circle.setDraggable(true);
    player.playingCircle.setDraggable(true);
});
//second team
gameModel.teamB.instantiate( function( player ) {
    stage.add( player.layer );
    player.circle.draggable(true);
    player.playingCircle.setDraggable(true);
    onFinish();
});
//change the second teams color to blue
gameModel.teamB.changePlayersColor( 'blue' );

var positionA = [
    {x:4, y:50},
    {x:15, y:8}, {x:10,y:28}, {x:10,y:65}, {x:15,y:95},
    {x:40, y:10}, {x:45, y:35}, {x:51, y:65}, {x:42, y:95},
    {x:75, y:35}, {x:80, y:55}
     ];
var positionB = [
    {x:97,y:50},
    {x:82,y:10}, {x:84,y:27}, {x:87,y:65}, {x:85,y:85},
    {x:60,y:10}, {x:56,y:50}, {x:60,y:90},
    {x:26,y:9}, {x:20,y:40}, {x:23,y:80}
];

var teamAGoalPosition = {
    x: 100,
    y: 50
};
var teamBGoalPosition = {
    x: 1,
    y: 50
};

gameModel.teamA.arrangePlayers( positionA );
gameModel.teamB.arrangePlayers( positionB );

function onFinish()
{
    addBall();
    setTimeout( function() { playGame(); } , 3000 );
}

function playGame(){
    beginningOfMatch = true;
    askQuestion();
}

function determineNextPlayer( bool ){
    if( bool )
        playPlayerTurn();
    else
        playCPUTurn();
}

function playPlayerTurn(){
    //alert("player playing"); 
    if( beginningOfMatch ){
        this.beginningOfMatch = false;
        //Display the scores 
        scoreView.showScores( function(that){
            stage.add( that.layer );
        }, gameModel.getScores() );
        
        //GoalKeeper long shot
        gameModel.teamA.goalKeeperLongShot( gameModel.ball );
        
        // Ask Question
        setTimeout(function(){askQuestion();},3000);
    }else{
        //Play to a random player or score
        var scoreProbaility = [5,5,10,10,10];
        var i = Math.floor(  Math.random() * 5  ) ;
        if( scoreProbaility[i]%2 == 1 ){
            //then score
            gameModel.currentPlayer.score( teamAGoalPosition, gameModel.ball, 2 );
        }else{
            //Play to a random player
            //TODO: Ask Question
        }//end inner else       
    }//end else
}

function playCPUTurn(){
    //alert("CPU Playing");
    //TODO:function play cpu turn
}

function askQuestion(){
    var ansBool = null;
    
    questionAlert.alertShouldShow = true;
    questionAlert.showAlert( function(that){
        stage.add( that.alertLayer );
    }, getCallback );
    
    function getCallback( that ){
        if( that.getAnswer() )
            determineNextPlayer(true);
        else
            determineNextPlayer(false);
    }
}
//Add the Ball to the pitch
function addBall() {
    if( !gameModel.ball.exist ) {
        gameModel.ball.instantiate(function (that) {
            stage.add(that.layer);
            that.layer.setZIndex(10);
        });
    }
}

/*
    //Test ::::::::::::
    var i = 0;
    var moveBall = function(){
        //gameModel.teamA.goalKeeperLongShot( gameModel.ball );
        gameModel.teamA.players[0].passToPlayer( gameModel.teamA.players[6], gameModel.ball,3 );
        gameModel.teamA.players[6].score( teamAGoalPosition, gameModel.ball,2 );
        i++;
        setTimeout( moveBall, 2000 );
    };
    moveBall();
    setTimeout( function(){
        questionAlert.showAlert( function(that){
            stage.add( that.alertLayer );
        } );
    },3000 );

    //End Test::::::::::::
*/
