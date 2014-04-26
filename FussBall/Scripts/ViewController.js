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
var gameDurationInMinutes = 4;
var currentGameTimeInSeconds = 0;
var beginningOfMatch = null;
var gameOverView = new GameOverView();

var interval = null;

function newGame(){
    
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
    
    gameOverView.instantiate( function(that){
        stage.add( that.layer );
        that.layer.moveToBottom();
    });      
}

newGame();

//change the second teams color to blue
gameModel.teamB.changePlayersColor( 'blue' );

var positionA = [
    {x:4, y:50},
    {x:15, y:8}, {x:10,y:28}, {x:10,y:65}, {x:15,y:95},
    {x:40, y:10}, {x:45, y:35}, {x:51, y:65}, {x:42, y:95},
    {x:75, y:35}, {x:80, y:55}
     ];
var positionB = [
    {x:95,y:50},
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
    resetInterval();
    setTimeout( function() { playGame(); } , 2000 );
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
    if( beginningOfMatch ){
        this.beginningOfMatch = false;
        //Display the scores 
        scoreView.showScores( function(that){
            stage.add( that.layer );
        }, gameModel.getScores() );
        
        //GoalKeeper long shot & Ask Question
        gameModel.teamA.goalKeeperLongShot( gameModel.ball, askQuestion );
        
    }else{
        //Play to a random player or score
        var scoreProbaility = [5,5,10,5,10];
        var i = Math.floor(  Math.random() * 5  ) ;
        if( scoreProbaility[i]%2 == 1 ){
            //then score
            gameModel.teamA.currentPlayer.score( teamAGoalPosition, gameModel.ball, 2 );
            var catchProbability = [5,10,10,5,10];
            var k = Math.floor(  Math.random() * 5  ) ;
            if( catchProbability[k] % 2 == 1 ){
                //CPU GoalKeeper defends the ball
                gameModel.teamB.goalKeeperLongShot( gameModel.ball );
                playCPUTurn();
            }else{
                //GOAL
                //Show Goal Animation
                scoreView.playGoalScoredAnimation( askQuestion );
                gameModel.teamDidScoreGoal( gameModel.teamA );
                beginningOfMatch = true;              
            }
        }else{
            //Play to a random player & Ask Question
            gameModel.teamA.currentPlayer.passToPlayer( gameModel.teamA.getNextPlayer(), gameModel.ball, 2, askQuestion );
        }//end inner else        
    }//end else
}

function playCPUTurn(){
    var CPUScoringProbablity = [ 5,5,5,5,10 ];
    var k = Math.floor(  Math.random() * 5  ) ;
    if( beginningOfMatch ){
        //goal keeper long shot 
        beginningOfMatch = false;
         scoreView.showScores( function(that){
            stage.add( that.layer );
        }, gameModel.getScores() );
        
        //GoalKeeper long shot
        gameModel.teamB.goalKeeperLongShot( gameModel.ball,askQuestion );
        
    }else{
        //Play to a random player 
        gameModel.teamB.currentPlayer.passToPlayer( gameModel.teamB.getNextPlayer(), gameModel.ball, 2 );
    }
    
    //TODO: Score a goal or pass to a random let user answer question to play
    if( CPUScoringProbablity[k] % 2 == 1 ){
        //Score
        gameModel.teamB.currentPlayer.score( teamBGoalPosition, gameModel.ball, 2 );
        var catchProbability = [5,10,10,5,10];
            var k = Math.floor(  Math.random() * 5  ) ;
            if( catchProbability[k] % 2 == 1 ){
                //Player GoalKeeper defends the ball
                gameModel.teamA.goalKeeperLongShot( gameModel.ball );
                askQuestion();
            }else{
                //GOAL
                //Show Goal Animation
                scoreView.playGoalScoredAnimation( askQuestion );
                gameModel.teamDidScoreGoal( gameModel.teamB );
                beginningOfMatch = true;  
            }
    }else{
        //Pass to a random player and ask user question
        gameModel.teamB.currentPlayer.passToPlayer( gameModel.teamB.getNextPlayer(), gameModel.ball, 2, askQuestion );
    }
}

function askQuestion(){
    if( !gameOver ){
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
    }else
        gameDidFinish();
}

function gameDidFinish()
{   
    clearInterval( interval );
    
    gameOverView.layer.moveToTop();
    gameOverView.showAlert("Game Over", clickCallBack );    
    
    function clickCallBack( that ){
        if( that.shouldStartNewGame() ){ 
            //gameModel = new GameModel();
            //newGame();
        }else{
            alert("Bye Bye");    
        } 
    }   
}

//Add the Ball to the pitch
function addBall() {
    if( !gameModel.ball.exist ) {
        gameModel.ball.instantiate(function (that) {
            stage.add(that.layer);
            that.layer.moveToTop();
        });
    }
}

function resetInterval(){
    interval = setInterval(function(){
        currentGameTimeInSeconds++;
        if( currentGameTimeInSeconds >= (gameDurationInMinutes * 60 )){
            gameOver = true;
            currentGameTimeInSeconds = 0;
        }
    },1000);
}

