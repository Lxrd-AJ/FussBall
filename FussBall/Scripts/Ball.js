/**
 * Created by AJ on 14/04/2014.
 */
"use strict";
var Ball = function(){
    this.circle = new Kinetic.Circle();
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
        this.circle = new Kinetic.Circle({
            x: 0,
            y: 0,
            radius: that.radius,
            stroke: 'black',
            fill: 'white',
            strokeWidth: 1
        });
        this.ballGroup = new Kinetic.Group();
        
        this.ballGroup.add( this.circle );
        this.layer.add( this.ballGroup );
        this.circle.visible( false );
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
            x: that.circle.x(),
            y: that.circle.y(),
            width: that.circle.width() + 5,
            height: that.circle.height() + 5
        });
        this.ballGroup.add( this.ballImage );
        callback( this );
    },
    setPosition: function( xPos, yPos , animate ){
        if( animate ){
            this.layer.setZIndex(24);
            var tween = new Kinetic.Tween({
                node: this.ballGroup,
                duration: 2.5,
                easing: Kinetic.Easings.StrongEaseInOut,
                y: yPos,
                x: xPos
            });
            tween.play();
        }else{
            this.ballGroup.x( xPos );
            this.ballGroup.y( yPos );
            this.layer.draw();
            this.layer.setZIndex(24);
        }

    }
};