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
var gameDurationInMinutes = 3.5;
var currentGameTimeInSeconds = 0;
var beginningOfMatch = null;
this.unit = 0;
this.section = 0;
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
    x: -5,
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
    gameModel.teamA = new Team( obj.url, obj.name, teamAGoalPosition );
    gameModel.teamA.instantiate( function( player ) {
        stage.add(player.layer);
        player.circle.setDraggable(true);
    });
    //second team
    var obj = getNutURLAndName( urlObj.teamB );
    gameModel.teamB = new Team( obj.url, obj.name, teamBGoalPosition );
    gameModel.teamB.instantiate( function( player ) {
        stage.add( player.layer );
        player.circle.draggable(true);
        onFinish();
    });
    gameModel.setTeams( gameModel.teamA, gameModel.teamB );
    
    gameOverView.instantiate( function(that){
        stage.add( that.layer );
        that.layer.moveToBottom();
    });  
    
    scoreView.instantiate( function(that){
        stage.add( that.layer );
    });
    scoreView.startCountDown( gameDurationInMinutes , gameDidFinish );
    scoreView.showScores( gameModel.getTeams() );
    
    //change the second teams color to blue
    gameModel.teamB.changePlayersColor( 'blue' );


    gameModel.teamA.arrangePlayers( positionA );
    gameModel.teamB.arrangePlayers( positionB );
    
    questionAlert.setUnitAndSection( urlObj.UnitSectionID.unit, urlObj.UnitSectionID.section );
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
        }, getCallback , determineNextPlayer );

        function getCallback( that ){
            if( that.getAnswer() ){
                determineNextPlayer(true);
                gameModel.currentPlayer().incrementCount();
            }
            else{
                determineNextPlayer(false);
                gameModel.currentPlayer().resetCount();
            }
        }
        
      
    }else
        gameDidFinish();
}

function determineNextPlayer( bool ){
    if( bool )
        playPlayerTurn( gameModel.currentPlayer() );
    else
        playPlayerTurn( gameModel.nextPlayer() );
}

function playPlayerTurn( currentTeam ){
    
    var bool = null;
    if( currentTeam === gameModel.teams[0] )
        bool = true;
    else
        bool = false;
    questionAlert.changeColor(bool);
    
    if( currentTeam.answerCount > 4 ){
        currentTeam = gameModel.nextPlayer();
        currentTeam.resetCount();
    }
    
    if( beginningOfMatch ){
        this.beginningOfMatch = false;
        //Display the scores 
        scoreView.showScores( gameModel.getTeams() );
        //GoalKeeper long shot & Ask Question
        currentTeam.goalKeeperLongShot( gameModel.ball, askQuestion );
    }else{
        if( currentTeam.answerCount < 4 )
            currentTeam.getNextPlayer().passToPlayer( currentTeam.getNextPlayer(), gameModel.ball, 2, askQuestion );
        else{
            //score a goal
            currentTeam.getNextPlayer().score( currentTeam.goalDirection, gameModel.ball, 2 );
            scoreView.playGoalScoredAnimation( askQuestion  );
            gameModel.teamDidScoreGoal( currentTeam );
            beginningOfMatch = true;
            
        }
    }        
}

function gameDidFinish()
{   
    gameOverView.layer.moveToTop();
    
    var text = "Game Over\n ";
    if( gameModel.teamA.score > gameModel.teamB.score )
        text += gameModel.teamA.name + " Wins";
    else if( gameModel.teamA.score < gameModel.teamB.score )
        text += gameModel.teamB.name + " Wins";
    else
        text += "Draw";
    gameOverView.showAlert( text , clickCallBack );
    
    questionAlert = null;
    
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
      
    var link = 'http://www.languagenut.com/images/nuts/150/' + obj.nuts[obj.id] + '_nut.png';
    //USE an array for teamName based on obj.id
    var teamName = null;
    switch( obj.id  )
    {
        case 0:
            teamName = "CHN";
            break;
        case 1:
            teamName = "CND";
            break;
        case 2:
            teamName = 'GRM';
            break;
        case 3:
            teamName = 'ENG';
            break;
        case 4:
            teamName = 'ESP';
            break;
        case 5:
            teamName = 'FRN';
            break;
        case 6:
            teamName = 'GLE';
            break;
        case 7:
            teamName = '000';
            break;
        case 8:
            teamName = '000';
            break;
        case 9:
            teamName = 'ITL';
            break;
        case 10:
            teamName = 'JPN';
            break;
        case 11:
            teamName = 'MAO';
            break;
        case 12:
            teamName = 'MEX';
            break;
        case 13:
            teamName = 'POL';
            break;
        case 14:
            teamName = 'USA';
            break;
        default:
            link = 'http://www.languagenut.com/images/nuts/150/nut.png';
            break;
    }
    
    return { url: link, name: teamName }
}

