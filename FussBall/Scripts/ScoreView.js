"use strict";
var ScoreView = function(){
    this.scoreText = null;
    this.scoreGroup = new Kinetic.Group();
    this.layer = new Kinetic.Layer();
    this.retainedShowCallBack = null;
    this.opacityValue = 0.4
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
            strokeWidth : 5,
            opacity: this.opacityValue
        });
        this.scoreRect.cornerRadius(10);
        this.scoreText = new Kinetic.Text({
            x: this.scoreRect.x(),
            y: this.scoreRect.y(),
            width: this.scoreRect.getWidth(),
            height: this.scoreRect.getHeight(),
            fontFamily: 'Calibri',
            fontSize: 75,
            fill: 'white',
            opacity: this.opacityValue
        });
        //this.scoreRect.width( this.scoreText.width() );
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
        
        this.scoreText.setText(" ");
        var text = " " + scoreObj.TeamA + " - " + scoreObj.TeamB ;  
        this.scoreText.setText( text );
        this.layer.draw();
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
        //setTimeout( function(){ removeTween.play(); }, 1000);
    },
    playGoalScoredAnimation: function( callBack  ){
        var that = this;
        this.instantiate( this.retainedShowCallBack );
        var text = "GOAL!";
        this.scoreText.text( text );
        var tween = new Kinetic.Tween({
            node: this.scoreGroup,
            duration: 0.3,
            easing: Kinetic.Easings.BounceEaseInOut,
            y: window.innerHeight * 0.3,
            onFinish: function(){
                removeTween.play();            
            }
        });
        var removeTween = new Kinetic.Tween({
            node: this.scoreGroup,
            duration: 0.2,
            easing: Kinetic.Easings.BounceEaseOut,
            y: -window.innerHeight,
            onFinish: function(){
                that.scoreGroup.destroy();
                setTimeout( function(){ callBack(); }, 1500);
            }
        });
        
        tween.play();
    }
};