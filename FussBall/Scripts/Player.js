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
        this.text = new Kinetic.Text({
            x: this.circle.x()-15,
            y: this.circle.y()-15 ,
            text: this.number,
            fontFamily: 'Calibri',
            fontSize: 30,
            fill: 'black'
        });
        this.playerImage.onload = function(){
            that.layer.add(that.circle);
            that.layer.add(that.text);
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
    }
};