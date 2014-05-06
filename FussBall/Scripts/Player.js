/**
 * Created by AJ on 10/04/2014.
 */

"use strict";

var Player = function(){
    this.playerImage = new Kinetic.Image();
    this.ellipse = new Kinetic.Ellipse();
    this.circle = new Kinetic.Circle();
    this.circleRadius = 10;
    this.ellipseRadius = new Kinetic.Ellipse();
    this.layer = new Kinetic.Layer();
    this.fillColor = 'red';
    this.team = null;
    this.onFinishLoadingCallback = null;
};

Player.prototype = {
    constructor: Player,
    instantiate: function( callBack, sources ){
        var that = this; 
        //sources = { teamImage: 'http://www.languagenut.com/images/nuts/150/cn_nut.png' };
        this.onFinishLoadingCallback = callBack;
        this.circle = new Kinetic.Circle({
            x: 200,
            y: 370,
            radius: that.circleRadius,
            stroke: 'black',
            strokeWidth: 3,
            fillPatternImage: "",
            fillPatternOffset: [-220,370],
            fill : 'black'
        });
        this.layer.add( this.circle );
        this.loadImages( sources );
    },
    loadImages : function( source){
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        for( var src in source ){
            numImages++;   
        }
        var that = this;
        for( var src in source ){
            images[src] = new Image();
            images[src].onload = function(){
                if( ++loadedImages >= numImages ){
                    that.buildImagesOnLayer( images );
                }
            };
            images[src].src = source[src];
        }
    },
    buildImagesOnLayer : function( images ){
        var that = this;
        this.playerImage = new Kinetic.Image({
            image: images.teamImage,
            x: that.circle.x() - 40,
            y: that.circle.y() - 50,
            width : 80,
            height : 50
        }); 
        this.layer.add( this.playerImage );
        this.onFinishLoadingCallback( this );
    },
    setPosition : function( xPos, yPos ){
        this.circle.x( xPos );
        this.circle.y( yPos );
        this.ellipse = new Kinetic.Ellipse({
            x: this.circle.x(),
            y: this.circle.y(),
            radius: {
                x: 15,
                y: 35
            },
            fill: this.fillColor,
            stroke: 'white',
            strokeWidth: 3
        });
        this.layer.draw();
    },
    changeColor: function( color ){
        this.fillColor = color;
        this.circle.fill( color );
        this.layer.draw();
    },
    passToPlayer: function( playerRef, ballRef , duration, onFinishCallBack ){
        playerRef = this.team.getNextPlayer();
        
        ballRef.setPosition( this.circle.x(), this.circle.y(), true );
        var that = this;
        var offset = 0;
        if( !duration )
            duration = 1;
        
        var tween = new Kinetic.Tween({
            node: ballRef.ballGroup,
            duration: duration,
            easing: Kinetic.Easings.EaseInOut,
            x: playerRef.circle.x() + offset,
            y: playerRef.circle.y() + offset,
            onFinish: function(){
                if( onFinishCallBack )
                    setTimeout( function(){ onFinishCallBack(); },1000);
                rotatePlayer.reverse();
            }
        });
        var rotatePlayer = new Kinetic.Tween({
            node: that.playerImage,
            duration: 0.3,
            x: that.playerImage.x() - 5,
            easing: Kinetic.Easings.Linear,
            //onFinish: rotatePlayer.reverse
        });
        
        rotatePlayer.play();
        tween.play();  
    },
    score: function( goalPost, ballRef, duration ){
        ballRef.setPosition( this.circle.x(), this.circle.y(), true );
        if( !duration )
            duration = 2;
        
        var goalTween = new Kinetic.Tween({
            node: ballRef.ballGroup,
            duration: duration,
            easing: Kinetic.Easings.EaseInOut,
            x: ( goalPost.x * window.innerWidth/100 ),
            y: ( goalPost.y * window.innerHeight/100 ),
            onFinish: function(){
                movePlayer.reverse();
            }
        });
        var movePlayer = new Kinetic.Tween({
            node: this.playerImage,
            duration: 1,
            x: this.playerImage.x() - 10,
            easing: Kinetic.Easings.ElasticEaseIn
        });
        
        movePlayer.play();
        goalTween.play();

    }
};
