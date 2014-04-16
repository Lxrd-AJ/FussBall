/**
 * Created by AJ on 14/04/2014.
 */
"use strict";
var Ball = function(){
    this.circle = new Kinetic.Circle();
    this.radius = 15;
    this.layer = new Kinetic.Layer();
    this.playerRef = null;
};

Ball.prototype = {
    constructor: Ball,
    instantiate: function( onfinish ){
        var that = this;
        this.circle = new Kinetic.Circle({
            x: 290,
            y: 150,
            radius: that.radius,
            stroke: 'black',
            fill: 'white',
            strokeWidth: 1
        });
        this.layer.add( this.circle );
        onfinish( this );
    },
    setPosition: function( xPos, yPos ){
        this.circle.x( xPos );
        this.circle.y( yPos );
        this.layer.draw();
    }
};