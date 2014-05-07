/**
 * Created by AJ on 16/04/2014.
 */

var AlertView = function(){
    this.alertLayer = new Kinetic.Layer();
    this.questionImage = new Kinetic.Image();
    this.questionText = null; //Kinetic Text
    this.font = "Calibri";
    this.cancelButtonTitle = "No";
    this.okButtonTitle = "Yes";
    this.alertRect = new Kinetic.Rect();
    this.cancelRect = new Kinetic.Rect();
    this.okRect = new Kinetic.Rect();
    this.alertGroup = new Kinetic.Group();
    this.questionDB = new QuestionDB();
    this.alertShouldShow = true;
    this.exist = false;
    this.answer = null;
    this.answerCorrect = null;
    this.tempCallBack = null;
    this.answerCorrectText = "Correct";
    this.answerWrongText = "Tackled!!!";
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

        this.cancelRect = new Kinetic.Rect({
            x: window.innerWidth * 0.25,
            y: (window.innerHeight * 0.15) + this.alertRect.height(),
            width: 80,
            height: 60,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 2.5
        });
        this.cancelRect.cornerRadius(10);
        this.cancelRect.listening( true );
        this.cancelText = new Kinetic.Text({
            x: this.cancelRect.x() + this.cancelRect.width() * 0.2,
            y: this.cancelRect.y() + this.cancelRect.height() * 0.2,
            text: this.cancelButtonTitle,
            fontFamily: 'Calibri',
            fontSize: 35,
            fill: 'black'
        });
        var that = this;
        this.onClick( this.cancelRect, function(obj) {
            that.didClickButtonAtRect(obj);
        } );
        this.onClick( this.cancelText, function(obj) {
            that.didClickButtonAtRect(obj);
        } );

        this.okRect = new Kinetic.Rect({
            x: (window.innerWidth * 0.4) + this.cancelRect.x(),
            y: this.cancelRect.y(),
            width: 80,
            height: 60,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 2.5
        });
        this.okRect.cornerRadius(10);
        this.okRect.listening( true );
        this.okText = new Kinetic.Text({
            x: this.okRect.x() + this.okRect.width() * 0.2,
            y: this.okRect.y() + this.okRect.width() * 0.2,
            text: this.okButtonTitle,
            fontFamily: 'Calibri',
            fontSize: 35,
            fill: 'black'
        });
        this.onClick( this.okRect, function( obj ){
            that.didClickButtonAtRect(obj);
        } );
        this.onClick( this.okText, function(obj) {
            that.didClickButtonAtRect(obj);
        } );

        this.questionText = new Kinetic.Text({
            x: (window.innerWidth * 0.3) + this.cancelRect.x(),
            y: (window.innerHeight * 0.15),
            fontSize: 40,
            fill: 'black'
        });
        
        this.feedbackText = new Kinetic.Text({
            x: this.alertRect.x() + this.alertRect.width()/2.5 ,
            y: this.alertRect.y() + this.alertRect.height()/1.3,
            fontSize: 40,
        });

        this.alertGroup.add( this.alertRect,this.cancelRect,this.cancelText,this.okRect,this.okText,
                             this.questionText, this.feedbackText, this.questionImage );
        this.alertLayer.add( this.alertGroup );
        callBack( this );
    },
    alertWillShow: function( callBack ){
        if( !this.exist ) {
            this.instantiate(callBack);
            this.exist = true;
        }
        this.questionDB.prepareQuestionObjects();
        var questionObjects = this.questionDB.getQuestionObjects();
        console.log( questionObjects.first.supportText );
        console.log( questionObjects.second.supportText );
        var that = this;

        //Add the image and text
        this.questionImage.setImage( questionObjects.first.LNImage );
        console.log( questionObjects.first.LNImage );
        this.questionImage.x( this.alertRect.x() + 10 );
        this.questionImage.y( this.alertRect.y() + 10 );
        this.questionImage.width( this.alertRect.width() * 0.55 );
        this.questionImage.height( this.alertRect.height() * 0.55 );
        this.alertLayer.draw();
        
        this.questionText.text( questionObjects.second.targetText );
        this.feedbackText.text("");

    },
    showAlert : function( callBack , getCallBack ){
        if( this.alertShouldShow ){
            this.alertWillShow( callBack );
            this.tempCallBack = getCallBack;
            var showAnimation = new Kinetic.Tween({
                node: this.alertGroup,
                duration: 0.5,
                easing: Kinetic.Easings.EaseIn,
                y: window.innerHeight * 0.20
            });
            showAnimation.play();
        }
    },
    didClickButtonAtRect: function( Rect){
        if( Rect === this.cancelRect ){
            this.answer = false;
        }else if( Rect === this.okRect ){
            this.answer = true;
        }
        this.removeAlert();
    },
    onClick : function( object, func ){
        object.on( 'click tap', function(){
            func( object );
        });
    },
    alertWillDisappear : function(){
        
        if( this.questionDB.evaluateAnswer( this.answer ) )
            this.answerCorrect = true;
        else
            this.answerCorrect = false;
        
        //provide feedback to user
        if( this.getAnswer() ){
            this.feedbackText.text( this.answerCorrectText );
            this.feedbackText.fill('green');
        }
        else{
            this.feedbackText.text( this.answerWrongText );
            this.feedbackText.fill( 'red');
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
    }
};
