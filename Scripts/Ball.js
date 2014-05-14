/**
 * Created by AJ on 14/04/2014.
 */
"use strict";
var Ball = function(){
    this.radius = 15;
    this.layer = new Kinetic.Layer();
    this.exist = false;
    this.imageSources = {
        ball : "Resources/ball.png"
    };
};

Ball.prototype = {
    constructor: Ball,
    instantiate: function( onfinish ){
        var that = this;
        this.exist = true;
        this.loadImages( this.imageSources, onfinish );
    },
    loadImages: function( source, callback )
    {
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
                    that.buildImagesOnLayer( images, callback );
                }
            };
            images[src].src = source[src];
        }   
    },
    buildImagesOnLayer: function( images, callback )
    {
        var that = this;
        this.ballImage = new Kinetic.Image({
            image: images.ball,
            x: window.innerWidth/2,
            y: window.innerHeight/2,
            width: 50,
            height: 50
        });
        this.layer.add( this.ballImage );
        callback( this );
    },
    setPosition: function( xPos, yPos , animate ){
        if( animate ){
            this.layer.setZIndex(24);
            var tween = new Kinetic.Tween({
                node: this.ballImage,
                duration: 2.5,
                easing: Kinetic.Easings.StrongEaseInOut,
                y: yPos,
                x: xPos
            });
            tween.play();
        }else{
            this.ballImage.x( xPos );
            this.ballImage.y( yPos );
            this.layer.draw();
            this.layer.setZIndex(24);
        }

    }
};