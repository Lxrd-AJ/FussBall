/**
 * Created by AJ on 10/04/2014.
 */
function refresh( time ){
    setInterval( function(){
        location.reload();
    }, time );
}
//window.onload = update;
//All layer adding is done in the view controller

var stage = new Kinetic.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
});
var gameModel = new GameModel();
var alert = new AlertView();

//create the pitch
gameModel.pitch.instantiate( function(){
    gameModel.pitch.getLayer().add( gameModel.pitch._pitchImage );
    stage.add(gameModel.pitch.getLayer());
});
//create the first team
gameModel.teamA.instantiate( function( player ) {
    stage.add(player.layer);
    player.circle.setDraggable(true);
});
//second team
gameModel.teamB.instantiate( function( player ) {
    stage.add( player.layer );
    player.circle.draggable(true);
    onFinish();
});
//change the second teams color to blue
gameModel.teamB.changePlayersColor( 'blue' );

var positionA = [
    {x:4, y:53},
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
gameModel.teamA.arrangePlayers( positionA );
gameModel.teamB.arrangePlayers( positionB );

function onFinish()
{
    addBall();
    //Test ::::::::::::
    var i = 0;
    var moveBall = function(){
        if( i == 11 ){
            i = 0;
            return;
        }
        gameModel.moveBallToPlayer( gameModel.teamA.players[i] );
        i++;
        setTimeout( moveBall, 1000 );
    };
    moveBall();
    setTimeout( function(){
        alert.showAlert( function(that){
            stage.add( that.alertLayer );
        } );
    },11500 );
    //End Test::::::::::::
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

