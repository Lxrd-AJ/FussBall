/**
 * Created by AJ on 16/04/2014.
 */

var AlertView = function(){
    this.alertLayer = new Kinetic.Layer();
    this.questionImage = new Kinetic.Image();
    this.font = "Nunito";
    this.alertRect = new Kinetic.Rect();
    this.alertGroup = new Kinetic.Group();
    this.questionDB = new QuestionDB();
    this.alertShouldShow = true;
    this.exist = false;
    this.answerCorrect = null;
    this.tempCallBack = null;
    this.answerCorrectText = "Correct";
    this.answerWrongText = "Tackled!!!";
    this.options = [0,0,0,0];
};

AlertView.prototype = {
    constructor: AlertView,
    instantiate : function( callBack ){
        this.exist = true;
        this.alertGroup = new Kinetic.Group({
            x: 0,
            y: 0
        });

        this.alertRect = new Kinetic.Rect({
            x: window.innerWidth * 0.2,
            width: window.innerWidth * 0.6,
            height: window.innerHeight * 0.5,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 2.5,
            opacity: 0.3
        });
        this.alertRect.cornerRadius(10);
        this.alertRect.listening( false );
        
        this.feedbackText = new Kinetic.Text({
            x: this.alertRect.x() + this.alertRect.width()/2.5 ,
            y: this.alertRect.y() + this.alertRect.height()/1.5,
            fontSize: 40,
            fontFamily: 'Nunito'
        });
        
        //Create 4 option rects and add to the group
        var x = this.alertRect.x() * 1.07;
        var y = this.alertRect.y() + this.alertRect.height() - 50;
        for( var i = 0; i < this.options.length; i++, x+=185 ){
            this.options[i] = this.createOptionObjectWithButtonAndText( x, y );
            this.alertGroup.add( this.options[i].button );
            this.alertGroup.add( this.options[i].text );
        }
        
        //timer pbject for questions
        this.youngTimer = this.createYoungTimer( window.innerWidth * 0.46, window.innerHeight  );
        this.youngTimer.recieveReferences( this.alertLayer );
        this.youngTimer.layerRef.add( this.youngTimer.group );

        this.alertGroup.add( this.alertRect, this.feedbackText,this.questionImage);
        this.alertLayer.add( this.alertGroup );
        callBack( this );
    },
    createOptionObjectWithButtonAndText  : function( xPos, yPos  ){
        var rect = new Kinetic.Rect({
            x: xPos,
            y: yPos,
            width: 180,
            height: 40,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 1.5,
            opacity: 0.3,
            cornerRadius: 10
        });
        
        var text = new Kinetic.Text({
            x: xPos,
            y: yPos,
            width: rect.width(),
            height: rect.height(),
            fontSize: 20,
            fill: 'black',
            padding: 10,
            align: 'center',
            fontFamily: 'Nunito'
        });
        
        this.onClick( rect, this.didClickButtonAtRect );
        this.onClick( text, this.didClickButtonAtRect );
        
        return{
            'button' : rect,
            'text' : text
        }
    },
    alertWillShow: function( callBack ){
        if( !this.exist ) {
            this.instantiate(callBack);
            this.exist = true;
        }
        this.questionDB.prepareQuestionObjects();
        var questionObjects = this.questionDB.getQuestionObjects();
        var that = this;

        //Add the image and text
        this.questionImage.setImage( questionObjects.LNImage );
        this.questionImage.x( this.alertRect.x() * 1.6 );
        this.questionImage.y( this.alertRect.y() * 1.6 );
        this.questionImage.width( this.alertRect.width() * 0.55 );
        this.questionImage.height( this.alertRect.height() * 0.55 );
        this.alertLayer.draw();
        //Add the text
        for( var i = 0 ; i < this.options.length; i++ )
            this.options[i].text.setText( questionObjects.options[i] );
        
        this.feedbackText.text("");

    },
    showAlert : function( callBack , getCallBack ){
        if( this.alertShouldShow ){
            var that = this;
            this.alertWillShow( callBack );
            this.tempCallBack = getCallBack;
            var showAnimation = new Kinetic.Tween({
                node: this.alertGroup,
                duration: 0.5,
                easing: Kinetic.Easings.EaseIn,
                y: window.innerHeight * 0.20,
                onFinish: function(){
                    //start the timer
                    that.youngTimer.activateTimer( that.youngTimer );
                }
            });
            showAnimation.play();
        }
    },
    didClickButtonAtRect: function( obj, that ){
        var questionObjects = that.questionDB.getQuestionObjects();
        //Get the text on the object
        if( obj.text() === questionObjects.targetAnswer )
            that.answerCorrect = true;
        else
            that.answerCorrect = false;
        
        that.youngTimer.deactivateTimer( that.youngTimer );
        that.removeAlert();
    },
    onClick : function( object, func ){
        var that = this;
        object.on( 'click tap', function(){
            func( object, that );
        });
    },
    alertWillDisappear : function(){
        //provide feedback to user
        if( this.getAnswer() ){
            this.feedbackText.text( this.answerCorrectText );
            this.feedbackText.fill('green');
            //Play the answer correct sound
            var cSound = new Howl({
                urls:['Resources/crowd clapping.mp3'],
                voume: 0.2,
                sprite: { correct:[0,5000] }
            });
            cSound.play('correct');
            cSound.fadeOut( 0.0, 3000 );
        }
        else{
            this.feedbackText.text( this.answerWrongText );
            this.feedbackText.fill( 'red');
            //Play the answer wromg sound
            var rSound = new Howl({
                urls:['Resources/booing.mp3'],
                volume: 0.3,
                sprite: { wrong:[0,4000] }
            });
            rSound.play('wrong');
            rSound.fadeOut( 0.0, 2000 );
        }      
    },
    removeAlert: function(){
        this.alertWillDisappear();
        var that = this;
        var dismissAnimation = new Kinetic.Tween({
            node: this.alertGroup,
            duration: 0.5,
            easing: Kinetic.Easings.EaseOut,
            y: -window.innerHeight,
            onFinish: function(){
                setTimeout( function(){
                    that.tempCallBack( that );
                }, 1500 );
            }
        });
        dismissAnimation.play();
    },
    getAnswer: function(){
        return this.answerCorrect
    },
    createYoungTimer: function( xPos, yPos ){
        var timerBox = new Kinetic.Rect({
            x: xPos,
            y: yPos,
            width: 100,
            height: 50,
            fill: 'black',
            stroke: 'white',
            strokeWidth: 1.5,
            cornerRadius: 10
        });
        var timerText = new Kinetic.Text({
            x: xPos,
            y: yPos,
            width: timerBox.width(),
            height: timerBox.height(),
            fontSize: 25,
            fill: 'white',
            padding: 10,
            align: 'center',
            fontFamily: 'Nunito'
        });
        var timerGroup = new Kinetic.Group({
            x: 0,
            y: 0
        });
        
        return {
            'box': timerBox,
            'text': timerText,
            'group': timerGroup,
            'layerRef' : null,
            countDown : null,
            recieveReferences: function( layer ){
                this.layerRef = layer;
                this.group.add( this.box, this.text );
            },
            appear : function(){
                var tween = new Kinetic.Tween({
                    node: this.group,
                    duration: 0.5,
                    easing: Kinetic.Easings.ElasticEaseIn,
                    y: window.innerHeight * -0.15
                });  
                tween.play();
            },
            disappear: function(){
                var tween = new Kinetic.Tween({
                    node: this.group,
                    duration: 0.3,
                    easing: Kinetic.Easings.BackEaseOut,
                    y: window.innerHeight
                });    
                tween.play();
            },
            fillRed : function( callBack ){
                var that = this;
                var tween = new Kinetic.Tween({
                    node: that.box,
                    duration: 2,
                    easing: Kinetic.Easings.EaseInOut,
                    fillRed: 255,
                    onFinish: function(){
                        tween.reverse();
                        callBack( that );
                    }
                });
                tween.play();
            },
            activateTimer: function( me ){
                var that = me;
                this.appear();
                var seconds = 30;
                
                that.countDown = setInterval( function(){
                    var sec = ( seconds < 10 ? "0" + seconds : seconds );
                    that.text.setText( sec );
                    seconds--;
                    that.layerRef.draw();

                    if( seconds === 0 ){
                        //Animate the time up
                        that.fillRed( that.deactivateTimer );
                     }
                }, 1000);    
            },
            deactivateTimer: function( that ){
                that.disappear(); 
                clearInterval( that.countDown );
            }
        }     
    }  
};
