/**
 * Created by AJ on 10/04/2014.
 */
"use strict";


var Pitch = function(){
    this.pitchImage = new Image();
    this._pitchImage = new Kinetic.Image();
    this.PITCH_WIDTH = window.innerWidth;
    this.PITCH_HEIGHT = window.innerHeight;
    this.layer = new Kinetic.Layer();
};

Pitch.prototype = {
    constructor: Pitch,
    instantiate: function(callback){
        var that = this;
        callback();
        this.pitchImage.onload = function(){
            that._pitchImage = new Kinetic.Image({
                x: 0,
                y: 0,
                image: that.pitchImage,
                width: that.PITCH_WIDTH,
                height: that.PITCH_HEIGHT
            });
            that.layer.add( that._pitchImage );
            that.layer.draw();      
        };
        this.pitchImage.src = 'Resources/Football_field.PNG';
    },
    getLayer : function(){
        return this.layer;
    }
};

