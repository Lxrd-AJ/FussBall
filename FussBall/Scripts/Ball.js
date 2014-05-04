/**
 * Created by AJ on 14/04/2014.
 */
"use strict";
var Ball = function(){
    this.circle = new Kinetic.Circle();
    this.radius = 15;
    this.layer = new Kinetic.Layer();
    this.exist = false;
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
        this.layer.add( this.circle );
        onfinish( this );
    },
    setPosition: function( xPos, yPos , animate ){
        if( animate ){
            this.layer.setZIndex(24);
            var tween = new Kinetic.Tween({
                node: this.circle,
                duration: 2,
                easing: Kinetic.Easings.Linear,
                y: yPos,
                x: xPos
            });
            tween.play();
        }else{
            this.circle.x( xPos );
            this.circle.y( yPos );
            this.layer.draw();
            this.layer.setZIndex(24);
        }
    }
};