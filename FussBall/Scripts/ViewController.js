/**
 * Created by AJ on 10/04/2014.
 */


//All layer adding is done in the view controller
window.onload = showMainMenu;

var stage = new Kinetic.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
});
var gameModel = new GameModel();
var questionAlert = new AlertView();
var scoreView = new ScoreView();
var gameOver = false;
var gameDurationInMinutes = 3;
var currentGameTimeInSeconds = 0;
var beginningOfMatch = null;
var gameOverView = new GameOverView();
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
    x: -1,
    y: 50
};

function showMainMenu()
{
    //create the pitch
    gameModel.pitch.instantiate( function(){
        stage.add(gameModel.pitch.getLayer());
    });
    
    //Add the main menu object
    var mainMenu = new MainMenu( function( that ){
        stage.add( that.layer );
    }, newGame );
    
}

function newGame( urlObj ){
    
    //create the first team
    var obj = getNutURLAndName( urlObj.teamA );
    gameModel.teamA = new Team( obj.url, obj.name );
    gameModel.teamA.instantiate( function( player ) {
        stage.add(player.layer);
        player.circle.setDraggable(true);
    });
    //second team
    var obj = getNutURLAndName( urlObj.teamB );
    gameModel.teamB = new Team( obj.url, obj.name );
    gameModel.teamB.instantiate( function( player ) {
        stage.add( player.layer );
        player.circle.draggable(true);
        onFinish();
    });
    
    gameOverView.instantiate( function(that){
        stage.add( that.layer );
        that.layer.moveToBottom();
    });  
    
    scoreView.startCountDown( gameDurationInMinutes , gameDidFinish );
    
    //change the second teams color to blue
    gameModel.teamB.changePlayersColor( 'blue' );


    gameModel.teamA.arrangePlayers( positionA );
    gameModel.teamB.arrangePlayers( positionB );
}


function onFinish()
{
    addBall();
    setTimeout( function() { playGame(); } , 2000 );    
}

function playGame(){
    beginningOfMatch = true;
    askQuestion();
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
        }, gameModel.getTeams() );
        
        //GoalKeeper long shot & Ask Question
        gameModel.teamA.goalKeeperLongShot( gameModel.ball, askQuestion );
        
    }else{
        //Play to a random player or score
        var scoreProbaility = [5,5,10,5,10];
        var i = Math.floor(  Math.random() * 5  ) ;
        if( scoreProbaility[i]%2 == 1 ){
            //then score
            gameModel.teamA.getNextPlayer().score( teamAGoalPosition, gameModel.ball, 2 );
            var catchProbability = [5,10,10,5,10];
            var k = Math.floor(  Math.random() * 5  ) ;
            if( catchProbability[k] % 2 == 1 ){
                //CPU GoalKeeper defends the ball
                gameModel.teamB.goalKeeperLongShot( gameModel.ball );
                playCPUTurn();
            }else{
                //GOAL
                //Show Goal Animation
                scoreView.playGoalScoredAnimation( askQuestion  );
                gameModel.teamDidScoreGoal( gameModel.teamA );
                beginningOfMatch = true;              
            }
        }else{
            //Play to a random player & Ask Question
            gameModel.teamA.getNextPlayer().passToPlayer( gameModel.teamA.getNextPlayer(), gameModel.ball, 2, askQuestion );
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
        }, gameModel.getTeams() );
        
        //GoalKeeper long shot
        gameModel.teamB.goalKeeperLongShot( gameModel.ball,askQuestion );   
    }
    else if( CPUScoringProbablity[k] % 2 == 1 ){
        //Score
        gameModel.teamB.getNextPlayer().score( teamBGoalPosition, gameModel.ball, 2 );
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
        gameModel.teamB.getNextPlayer().passToPlayer( gameModel.teamB.getNextPlayer(), gameModel.ball, 2, askQuestion );
    }
}

function gameDidFinish()
{   
    gameOverView.layer.moveToTop();
    
    var text = "Game Over\n ";
    if( gameModel.teamA.score > gameModel.teamB.score )
        text += "You Win";
    else if( gameModel.teamA.score < gameModel.teamB.score )
        text += "You Lose";
    else
        text += "Draw";
    gameOverView.showAlert( text , clickCallBack );    
    
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

function getNutURLAndName( obj ){
    console.log( obj.id );  
    var link = null;
    var teamName = null;
    switch( obj.id  )
    {
        case 0:
            link = 'http://www.languagenut.com/images/nuts/150/fr_nut.png';
            teamName = "FR";
            break;
        case 1:
            link = 'http://www.languagenut.com/images/nuts/150/sp_nut.png';
            teamName = "ESP";
            break;
        case 2:
            link = 'http://www.languagenut.com/images/nuts/150/en_nut.png';
            teamName = 'ENG';
            break;
        case 3:
            link = 'http://www.languagenut.com/images/nuts/150/nut.png';
            teamName = 'HND';
            break;
        case 4:
            link = 'http://www.languagenut.com/images/nuts/150/de_nut.png';
            teamName = 'GRM';
            break;
        case 5:
            link = 'http://www.languagenut.com/images/nuts/150/nut.png';
            teamName = 'URD';
            break;
        case 6:
            link = 'http://www.languagenut.com/images/nuts/150/cc_nut.png';
            teamName = 'CHN';
            break;
        case 7:
            link = 'http://www.languagenut.com/images/nuts/150/nut.png';
            teamName = 'BNG';
            break;
        case 8:
            link = 'http://www.languagenut.com/images/nuts/150/nut.png';
            teamName = 'ARB';
            break;
        case 9:
            link = 'http://www.languagenut.com/images/nuts/150/it_nut.png';
            teamName = 'ITL';
            break;
    }
    
    return { url: link, name: teamName }
}

