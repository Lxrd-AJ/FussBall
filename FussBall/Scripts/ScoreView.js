"use strict";
var ScoreView = function(){
    this.scoreText = null;
    this.scoreGroup = new Kinetic.Group();
    this.layer = new Kinetic.Layer();
    this.retainedShowCallBack = null;
    this.opacityValue = 0.5;
    this.exist = false;
    //this.gameTimerText = new Kinetic.Text();
    //Timer
    this.gameTimerRect = new Kinetic.Rect({
        x: 5,
        y: 5,
        width: 100,
        height: 50,
        fill: 'black',
        stroke: 'white',
        opacity: this.opacityValue,
        cornerRadius: 10
    });
        
    this.gameTimerText = new Kinetic.Text({
            x: this.gameTimerRect.x(),
            y: this.gameTimerRect.y() + 5,
            width: 100,
            height: 40,
            fill: 'white',
            opacity: this.opacityValue,
            align: 'center',
            fontSize: 30,
            fontFamily: 'Nunito'
        });
};

ScoreView.prototype = {
    constructor: ScoreView,
    instantiate: function( callBack ){
        this.scoreRect = new Kinetic.Rect({
            x : window.innerWidth * 0.35,
            width : window.innerWidth * 0.30,
            height : window.innerHeight * 0.10,
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
            fontFamily: 'Nunito',
            fontSize: 45,
            fill: 'white',
            opacity: this.opacityValue,
            align: 'center'
        });
                
        this.scoreGroup = new Kinetic.Group({
            x: 0,
            y: 0
        });
        this.scoreGroup.add(this.scoreRect,this.scoreText, this.gameTimerRect, this.gameTimerText);
        this.layer.add( this.scoreGroup );
        callBack( this );
        
        this.exist = true;
    },
    showScores: function(  scoreObj ){
        
        this.scoreText.setText(" ");
        var text = scoreObj.TeamA.name + " " + scoreObj.TeamA.score + " - " + scoreObj.TeamB.score + " " + scoreObj.TeamB.name ;  
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
    },
    playGoalScoredAnimation: function( callBack  ){
        var that = this;
        //this.instantiate( this.retainedShowCallBack );
        var text = "GOAL!";
        this.scoreText.text( text );
        this.layer.draw();
        var tween = new Kinetic.Tween({
            node: this.scoreGroup,
            duration: 0.3,
            easing: Kinetic.Easings.BounceEaseInOut,
            //y: window.innerHeight * 0.3,
            onFinish: function(){
                //Display next player to play  
                callBack();
            }
        });
        
        tween.play();
    },
    startCountDown: function( timeInMinutes , callBack ){
        var that = this;
        var timeInSeconds = timeInMinutes * 60;
        var min;
        var sec;
        var text;
        var minText;
        var secText;
        var timer = setInterval( function(){
            min = Math.floor(timeInSeconds / 60);
            sec = timeInSeconds % 60;
            minText = ( min < 10 ? "0" + min : min );
            secText = ( sec < 10 ? "0" + sec : sec );
            text = minText + " : " + secText;
            that.gameTimerText.setText( text );
            timeInSeconds--;
            that.layer.draw();
            
            if( timeInSeconds === 0 ){
                callBack();
                clearInterval( timer );
            }
        }, 1000);
    }
};