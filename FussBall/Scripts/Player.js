/**
 * Created by AJ on 10/04/2014.
 */
"use strict";

var Player = function( url ){
    this.playerImage = new Image();
    this.playerImageURL = url;
    this.circle = new Kinetic.Circle();
    this.circleRadius = 30;
    this.layer = new Kinetic.Layer();
    this.fillColor = 'red';
    this.text = null;
    this.number = Math.floor(  Math.random() * (100 - 1 ) ) + 1;
    this.playingCircle = new Kinetic.Circle();
};

Player.prototype = {
    constructor: Player,
    instantiate: function( callBack, showImage ){
        var that = this;
        this.circle = new Kinetic.Circle({
            x: 200,
            y: 370,
            radius: that.circleRadius,
            stroke: 'black',
            strokeWidth: 3,
            fillPatternImage: "",
            fillPatternOffset: [-220,370],
            fill : this.fillColor
        });
        this.playingCircle = new Kinetic.Circle({
            x: this.circle.x(),
            y: this.circle.y(),
            radius: this.circleRadius + 5,
            stroke : 'yellow',
            strokeWidth: 3,
            visible: true
        });
        this.text = new Kinetic.Text({
            x: this.circle.x()-15,
            y: this.circle.y()-15 ,
            text: this.number,
            fontFamily: 'Calibri',
            fontSize: 30,
            fill: 'black'
        });
        this.playerImage.onload = function(){
            that.layer.add( that.playingCircle );
            that.layer.add(that.circle);
            that.layer.add(that.text);
            that.playingCircle.visible( false );
            callBack( that );
            that.showImage();
        };
        this.playerImage.src = this.playerImageURL;
    },
    setPosition : function( xPos, yPos ){
        this.circle.x( xPos );
        this.circle.y( yPos );
        this.text.x( xPos );
        this.text.y( yPos );
        this.layer.draw();
    },
    //Scumbag function, doesn't work
    showImage : function(){
        //var thrash = this.circle.fillPatternImage();
        //this.circle.fill("");
        this.circle.fillPatternImage( this.playerImage );
        this.layer.draw();
    },
    changeColor: function( color ){
        this.fillColor = color;
        this.circle.fill( color );
        this.layer.draw();
    },
    passToPlayer: function( playerRef, ballRef , duration ){
        ballRef.setPosition( this.circle.x(), this.circle.y() );
        var that = this;
        that.playingCircle.visible( false );
        var offset = 0;
        if( !duration )
            duration = 1;
        var tween = new Kinetic.Tween({
            node: ballRef.circle,
            duration: duration,
            easing: Kinetic.Easings.EaseInOut,
            x: playerRef.circle.x() + offset,
            y: playerRef.circle.y() + offset
        });
        tween.play();
        playerRef.playingCircle.visible( true );
        playerRef.playingCircle.x( that.circle.x() );
        playerRef.playingCircle.y( that.circle.y() );
    },
    score: function( goalPost, ballRef, duration ){
        ballRef.setPosition( this.circle.x(), this.circle.y() );
        if( !duration )
            duration = 1;
        var goalTween = new Kinetic.Tween({
            node: ballRef.circle,
            duration: duration,
            easing: Kinetic.Easings.EaseInOut,
            x: ( goalPost.x * window.innerWidth/100 ),
            y: ( goalPost.y * window.innerHeight/100 )
        });
        goalTween.play();

    }
};

//TODO : Playing circle needs to appear on the current player with the ball