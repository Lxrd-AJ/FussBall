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
this.unit = 0;
this.section = 0;
var gameOverView = new GameOverView();
var positionA = [
    {x:4, y:50},
    {x:15, y:8}, {x:10,y:28}, {x:10,y:65}, {x:15,y:95},
    {x:40, y:15}, {x:45, y:35}, {x:51, y:65}, {x:42, y:95},
    {x:75, y:35}, {x:80, y:55}
     ];
var positionB = [
    {x:95,y:50},
    {x:82,y:10}, {x:84,y:27}, {x:87,y:65}, {x:85,y:85},
    {x:60,y:15}, {x:56,y:50}, {x:60,y:90},
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
	var numberOfPlayersInstantiated = 0;
    gameModel.teamA.instantiate( function( player ) {
	numberOfPlayersInstantiated++;
        stage.add(player.layer);
        player.circle.setDraggable(true);
        if (numberOfPlayersInstantiated == 22) onFinish();
    });
    //second team
    var obj = getNutURLAndName( urlObj.teamB );
    gameModel.teamB = new Team( obj.url, obj.name, teamBGoalPosition );
    gameModel.teamB.instantiate( function( player ) {
	numberOfPlayersInstantiated++;
        stage.add( player.layer );
        player.circle.draggable(true);
        if (numberOfPlayersInstantiated == 22) onFinish();
    });
    gameModel.setTeams( gameModel.teamA, gameModel.teamB );
    
    gameOverView.instantiate( function(that){
        stage.add( that.layer );
        that.layer.moveToBottom();
    });  
    
    //change the second teams color to blue
    gameModel.teamB.changePlayersColor( 'blue' );


    gameModel.teamA.arrangePlayers( positionA );
    gameModel.teamB.arrangePlayers( positionB );
    
    questionAlert.setUnitSectionAndTarget( urlObj.UnitSectionID.unit, urlObj.UnitSectionID.section, urlObj.UnitSectionID.targetLang );
    
    //add the scoreview
    scoreView.instantiate( function(that){
        stage.add( that.layer );
    });
    scoreView.startCountDown( gameDurationInMinutes , gameDidFinish );
    
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
        //query to determine which side the alert should show
        var biPolarSide = false;
        if( gameModel.currentPlayer() == gameModel.teams[0] )
            biPolarSide = true;
        else
            biPolarSide = false;
       
        scoreView.showScores( gameModel.getTeams(), gameModel.currentPlayer() );
        questionAlert.changeColor(biPolarSide);
        questionAlert.showAlert( function(that){
            stage.add( that.alertLayer );
        }, getCallback , determineNextPlayer, biPolarSide );

        function getCallback( that ){
            if( that.getAnswer() ){
                var currentTeam = gameModel.currentPlayer();
                currentTeam.incrementCount();
                //Debugging
                console.log( currentTeam.name + "'s count is " + currentTeam.answerCount );
                determineNextPlayer(true);
            }
            else{  
                var currentTeam = gameModel.currentPlayer();
                currentTeam.resetCount();
                determineNextPlayer(false);
            }
        }      
    }else
        gameDidFinish();
}

function determineNextPlayer( bool ){
    if( bool )
        playPlayerTurn( gameModel.currentPlayer() );
    else{
        var team = gameModel.nextPlayer();
        playPlayerTurn( team );
    }
        
}

function playPlayerTurn( currentTeam ){
    /*
    if( currentTeam.answerCount > 4 ){
        console.log("current team is " + currentTeam.name );
        console.log(currentTeam.name + "'s count now 0");
        currentTeam.resetCount();
        currentTeam = gameModel.nextPlayer();
        console.log("New team is " + currentTeam.name );
    }
    */
    
    if( beginningOfMatch ){
        this.beginningOfMatch = false;
        //Display the scores 
        scoreView.showScores( gameModel.getTeams(), currentTeam );
        //GoalKeeper long shot & Ask Question
        currentTeam.goalKeeperLongShot( gameModel.ball, askQuestion );
    }else{
        scoreView.showScores( gameModel.getTeams() , currentTeam );
        if( currentTeam.answerCount === 4 ){
            //score a goal
            currentTeam.getNextPlayer().score( currentTeam.goalDirection, gameModel.ball, 2 );
            currentTeam.resetCount();
            gameModel.teamDidScoreGoal( currentTeam );
            beginningOfMatch = true;
            currentTeam = gameModel.nextPlayer();
            scoreView.playGoalScoredAnimation( askQuestion  );
        } 
        else{
            currentTeam.getNextPlayer().passToPlayer( currentTeam.getNextPlayer(), gameModel.ball, 2, askQuestion );
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
        text += "Draw!!";
    gameOverView.showAlert( text , clickCallBack );
    
    scoreView.gameOver();
    questionAlert = null;
    scoreView = null;
    
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

