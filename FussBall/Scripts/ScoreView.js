"use strict";
var ScoreView = function(){
    this.scoreText = null;
    this.scoreGroup = new Kinetic.Group();
    this.layer = new Kinetic.Layer();
    this.retainedShowCallBack = null;
};

ScoreView.prototype = {
    constructor: ScoreView,
    instantiate: function( callBack ){
        this.scoreRect = new Kinetic.Rect({
            x : window.innerWidth * 0.4,
            width : window.innerWidth * 0.15,
            height : window.innerHeight * 0.15,
            fill : 'black',
            stroke : 'white',
            strokeWidth : 5
        });
        this.scoreRect.cornerRadius(12);
        this.scoreText = new Kinetic.Text({
            x: this.scoreRect.x(),
            y: this.scoreRect.y(),
            width: this.scoreRect.getWidth(),
            height: this.scoreRect.getHeight(),
            fontFamily: 'Calibri',
            fontSize: 75,
            fill: 'white'
        });
        this.scoreGroup = new Kinetic.Group({
            x: 0,
            y: 0
        });
        this.scoreGroup.add( this.scoreRect, this.scoreText );
        this.layer.add( this.scoreGroup );
        callBack( this );
    },
    showScores: function( callBack, scoreObj ){
        this.retainedShowCallBack = callBack;
        this.instantiate( callBack );
        var text = " " + scoreObj.TeamA + " - " + scoreObj.TeamB ;  
        this.scoreText.text( text );
        var tween = new Kinetic.Tween({
            node: this.scoreGroup,
            duration: 0.3,
            easing: Kinetic.Easings.BounceEaseInOut,
            y: window.innerHeight * 0.3
        });
        var removeTween = new Kinetic.Tween({
            node: this.scoreGroup,
            duration: 0.2,
            easing: Kinetic.Easings.BounceEaseOut,
            y: -window.innerHeight
        });
        tween.play();
        setTimeout( function(){ removeTween.play(); }, 1000);
    },
    playGoalScoredAnimation: function( callBack ){
        this.instantiate( this.retainedShowCallBack );
        var text = "GOAL!!!!";
        this.scoreText.text( text );
        var tween = new Kinetic.Tween({
            node: this.scoreGroup,
            duration: 0.3,
            easing: Kinetic.Easings.BounceEaseInOut,
            y: window.innerHeight * 0.3
        });
        var removeTween = new Kinetic.Tween({
            node: this.scoreGroup,
            duration: 0.2,
            easing: Kinetic.Easings.BounceEaseOut,
            y: -window.innerHeight,
            onFinish: function(){
                setTimeout( function(){ callBack(); }, 2000);
            }
        });
        tween.play();
        setTimeout( function(){ removeTween.play(); }, 1000);
    }
};