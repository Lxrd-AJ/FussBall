/**
 * Created by AJ on 16/04/2014.
 */

var AlertView = function(){
    this.alertLayer = new Kinetic.Layer();
    this.questionImage = new Kinetic.Image();
    this.font = "Nunito";
    this.alertRect = new Kinetic.Rect();
    this.alertGroup = new Kinetic.Group();
    //this.questionDB = new QuestionDB();
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
    setUnitSectionAndTarget: function( unit, section, targetLang ){
        this.questionDB = new QuestionDB( unit, section, targetLang );    
    },
    instantiate : function( callBack ){
        this.exist = true;
        this.alertGroup = new Kinetic.Group({
            x: 0,
            y: 0
        });

        this.alertRect = new Kinetic.Rect({
            x: window.innerWidth * 0.2,
            width: window.innerWidth * 0.6,
            height: window.innerHeight * 0.75,
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
        var y = this.alertRect.y() + (this.alertRect.height() * 0.8);
        for( var i = 0; i < this.options.length; i++, x+=this.alertRect.width() / 4  ){
            this.options[i] = this.createOptionObjectWithButtonAndText( x, y );
            this.alertGroup.add( this.options[i].button );
            this.alertGroup.add( this.options[i].text );
        }

        this.alertGroup.add( this.alertRect, this.feedbackText,this.questionImage);
        this.alertLayer.add( this.alertGroup );
        callBack( this );
    },
    createOptionObjectWithButtonAndText  : function( xPos, yPos  ){
        var rect = new Kinetic.Rect({
            x: xPos,
            y: yPos,
            width: this.alertRect.width() / 5,
            height: 60,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 1.5,
            opacity: 1,
            cornerRadius: 10
        });
        
        var text = new Kinetic.Text({
            x: xPos,
            y: yPos,
            width: rect.width(),
            fontSize: 20,
            fill: 'black',
            padding: 10,
            align: 'center',
            fontFamily: 'Nunito',
            opacity: 1
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
        this.questionImage.y( this.alertRect.y()  );
        this.questionImage.width( this.alertRect.width() * 0.6 );
        this.questionImage.x( this.alertRect.x() + (this.alertRect.width() / 2) - (this.questionImage.width() / 2));
        this.questionImage.height( this.questionImage.width() / questionObjects.LNImage.width * questionObjects.LNImage.height );
        this.alertLayer.draw();
        //Add the text
        for( var i = 0 ; i < this.options.length; i++ ){
            this.options[i].text.setText( questionObjects.options[i] );
            this.options[i].button.height( this.options[i].text.height() );
            this.options[i].text.align('center');
        }
        
        this.feedbackText.text("");

    },
    showAlert : function( callBack , getCallBack, timerCallback  ){
        if( this.alertShouldShow ){
            var that = this;
            this.alertWillShow( callBack );
            this.tempCallBack = getCallBack;
            var showAnimation = new Kinetic.Tween({
                node: this.alertGroup,
                duration: 0.5,
                easing: Kinetic.Easings.EaseIn,
                y: window.innerHeight * 0.12,
                onFinish: function(){
                    //start the timer
                    if( !that.timer ){
                        that.timer = new Timer( window.innerWidth * 0.46, window.innerHeight );
                        that.timer.receiveReferences( timerCallback, that.removeAlert , that );
                        that.timer.activate( that.timer );
                    }
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
        
        that.timer.deactivate( that.timer );
        that.removeAlert( that );
        that.timer = null;
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
        
        this.timer = null;
    },
    removeAlert: function( me ){
        me.alertWillDisappear();
        var that = me;
        var dismissAnimation = new Kinetic.Tween({
            node: that.alertGroup,
            duration: 3.0,
            easing: Kinetic.Easings.EaseOut,
            y: -window.innerHeight,
            onFinish: function(){
                that.tempCallBack( that );
            }
        });
        dismissAnimation.play();
        //Play the sound
        var cSound = new Howl({
                urls:['Resources/kids cheering.mp3'],
                voume: 0.2
        });
        cSound.play();
    },
    getAnswer: function(){
        return this.answerCorrect
    },
    changeColor: function( turn ){
        if( turn )
            this.alertRect.fill("red");
        else
            this.alertRect.fill("Blue");
        
        this.alertLayer.draw();
    }
};
