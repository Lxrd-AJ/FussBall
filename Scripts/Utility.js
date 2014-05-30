var Timer = function( xPos, yPos , execFunction  ){
    this.timerBox = new Kinetic.Rect({
        x: xPos,
        y: yPos,
        width: 100,
        height: 50,
        fill: 'black',
        stroke: 'white',
        strokeWidth: 1.5,
        cornerRadius: 10
    });
    this.timerText = new Kinetic.Text({
        x: xPos,
        y: yPos,
        width: this.timerBox.width(),
        height: this.timerBox.height(),
        fontSize: 25,
        fill: 'white',
        padding: 10,
        align: 'center',
        fontFamily: 'Nunito'
    });
    this.timerGroup = new Kinetic.Group({
        x: xPos,
        y: yPos
    });
    
    this.answer = null;
    this.alertRemove = null;
    this.alert = null;
       
};

Timer.prototype = {
    constructor: Timer,
    receiveReferences: function(  alertCallback, alert ){
        //this.answer = answerWrong; 
        this.alertRemove = alertCallback;
        this.alert = alert;
        
        this.layer = this.alert.alertLayer;
        this.timerGroup.add( this.timerBox, this.timerText );
        this.layer.add( this.timerGroup );
    },
    appear : function(){
        var that = this;
        var tween = new Kinetic.Tween({
            node: this.timerGroup,
            duration: 1,
            easing: Kinetic.Easings.Linear,
            y: this.timerGroup.y() * -0.1,
            x: window.innerWidth * -0.0,
            onFinish: function(){
                
            }
        });  
        tween.play();
        
        var anim = new Kinetic.Animation( function(frame){
            that.timerGroup.y( window.innerHeight - 100 );
        }, that.layer );
        //anim.start();
    },
    disappear: function(){
        var that = this;
        var tween = new Kinetic.Tween({
            node: this.timerGroup,
            duration: 1,
            easing: Kinetic.Easings.BackEaseOut,
            y: this.timerGroup.y() + window.innerHeight,
            onFinish: function(){
                that.timerGroup.destroy();
                that.alert.setAnswer( false );
                that.alertRemove( that.alert );
                //that.alert.timer = null;
            }
        });    
        tween.play();
    },
    activate: function( ){
        var that = this;
        this.appear();
        var seconds = 15;
        var sec = "";

        that.countDown = setInterval( function(){
            sec = ( seconds < 10 ? "0" + seconds : seconds );
            that.timerText.setText( sec );
            seconds--;
            that.layer.draw();

            if( seconds === 0 ){
                that.deactivate( that );
                that.disappear();
                clearInterval( that.countDown );
                //Animate the time up
             }
        }, 1000);    
    },
    deactivate: function( that ){
        var tween = new Kinetic.Tween({
            node: that.timerGroup,
            duration: 1,
            easing: Kinetic.Easings.BackEaseOut,
            y: that.timerGroup.y() + window.innerHeight,
        });    
        tween.play();
        clearInterval( that.countDown ); 
    }
}