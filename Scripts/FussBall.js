/**
 * Created by AJ on 07/04/2014.
 */
//For testing purpose
window.onload = reload;

function reload(){
    setInterval( function(){
       location.reload();
        },9000);
}

//Global Variables
var gameWidth = 500;
var gameHeight = 400;

//Ball variables
var ballSize = 80; //Size of the ball in width and height
var ballX = 300;
var ballY = 50;
var angularSpeed = 360/4;

var stage = new Kinetic.Stage({
    container: 'container',
    width:  gameWidth,
    height: gameHeight
});
var layer = new Kinetic.Layer();

//Ball Class
function Ball() {
    this.ball = new Image();
    this.ballImage = new Kinetic.Image();
    this.animation = new Kinetic.Animation(function(frame){},layer);
}
Ball.prototype = {
    constructor: Ball,
    //creates a new Ball
    instantiate: function() {
        var that = this;
        this.ball.onload = function(){
            var ballImage = new Kinetic.Image({
                x: ballX,
                y: ballY,
                image: that.ball,
                width: ballSize,
                height: ballSize
            });
            layer.add( ballImage );
            stage.add( layer );
            that.ballImage = ballImage;
        };
        this.ball.src = 'Resources/ball.png';
    },
    rotate: function(){
        var that = this;
        this.animation = new Kinetic.Animation( function( frame ){
            var angleDiff = frame.timeDiff * angularSpeed/1000;
            that.ballImage.rotate( angleDiff );
        }, layer );
        that.animation.start();
    },
    bounce: function(){
        var that = this;
        var amplitude = 150;
        var period = 2000;
        var centerY = stage.height() / 2;
        this.animation = new Kinetic.Animation( function(frame){
            that.ballImage.y(amplitude * Math.sin(frame.time*2*Math.PI/period)+centerY);
        }, layer );
        that.animation.start();
    },
    stopAnimation: function(){
        this.animation.stop();
    }
};

//Game Class aka Game Model
var GameModel = function(){

}

//Test
var myBall = new Ball();
myBall.instantiate();
myBall.rotate();
myBall.bounce();
//myBall.stopAnimation);













