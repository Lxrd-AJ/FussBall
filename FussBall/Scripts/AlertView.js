/**
 * Created by AJ on 16/04/2014.
 */

var AlertView = function(){
    this.alertLayer = new Kinetic.Layer();
    this.questionImage = new Image();
    this.questionText = null;
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
            strokeWidth: 5,
            fillPatternImage: this.questionImage,
            fillPatternOffset : [ this.alertRect.width*0.5, this.alertRect.height*0.2 ]
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
            strokeWidth: 5
        });
        this.cancelRect.cornerRadius(10);
        this.cancelRect.listening( true );
        this.cancelText = new Kinetic.Text({
            x: this.cancelRect.x(),
            y: this.cancelRect.y(),
            text: this.cancelButtonTitle,
            fontFamily: 'Calibri',
            fontSize: 35,
            fill: 'black'
        });
        var that = this;
        this.onClick( this.cancelRect, function(obj) {
            that.didClickButtonAtRect(obj);
        } );

        this.okRect = new Kinetic.Rect({
            x: (window.innerWidth * 0.4) + this.cancelRect.x(),
            y: this.cancelRect.y(),
            width: 80,
            height: 60,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 5
        });
        this.okRect.cornerRadius(10);
        this.okRect.listening( true );
        this.okText = new Kinetic.Text({
            x: this.okRect.x(),
            y: this.okRect.y(),
            text: this.okButtonTitle,
            fontFamily: 'Calibri',
            fontSize: 35,
            fill: 'black'
        });
        this.onClick( this.okRect, function( obj ){
            that.didClickButtonAtRect(obj);
        } );

        this.questionText = new Kinetic.Text({
            x: (window.innerWidth * 0.4) + this.cancelRect.x(),
            y: (window.innerHeight * 0.15),
            fontSize: 40,
            fill: 'black'
        });

        this.alertGroup.add( this.alertRect,this.cancelRect,this.cancelText,this.okRect,this.okText,
                             this.questionText );
        this.alertLayer.add( this.alertGroup );
        callBack( this );
    },
    alertWillShow: function( callBack ){
        if( !this.exist ) {
            this.instantiate(callBack);
            this.exist = true;

            this.questionDB.prepareQuestionObjects();
            var questionObjects = this.questionDB.getQuestionObjects();
            var that = this;

            //Add the image and text
            this.questionImage.onload = function(){
                that.alertRect.fillPatternImage( that.questionImage );
            };
            this.questionImage.src = questionObjects.first.imageURL;
            this.questionText.text(questionObjects.second.text);
        }
    },
    showAlert : function( callBack , getCallBack ){
        if( this.alertShouldShow ){
            this.alertWillShow( callBack );
            this.tempCallBack = getCallBack;
            var showAnimation = new Kinetic.Tween({
                node: this.alertGroup,
                duration: 0.5,
                easing: Kinetic.Easings.EaseIn,
                y: window.innerHeight * 0.1
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
        //this.alertWillDisappear();
        this.removeAlert();
        this.tempCallBack( this );
    },
    onClick : function( object, func ){
        object.on( 'click tap', function(){
            func( object );
        });
    },
    alertWillDisappear : function(){
        this.exist = false;
        //Case 1: Both question objects are the same
        var questionObjects = this.questionDB.getQuestionObjects();
        if( this.questionDB.areQuestionsSame( questionObjects.first,    questionObjects.second) )
        {
            if( this.answer == true )
                this.answerCorrect = true;
            else
                this.answerCorrect = false;
        }else{
            //CAse 2: Both questions are not the same
            if( this.answer == false )
                this.answerCorrect = true;
            else
                this.answerCorrect = false;
        }
        //alert( questionObjects.first.country);
        //alert( questionObjects.second.country );
        //alert( this.answerCorrect );
    },
    removeAlert: function(){
        this.alertWillDisappear();
        var dismissAnimation = new Kinetic.Tween({
            node: this.alertGroup,
            duration: 0.5,
            easing: Kinetic.Easings.EaseOut,
            y: -window.innerHeight
        });
        dismissAnimation.play();
    },
    getAnswer: function(){
        if( this.answerCorrect )
            return true;
        else
            return false;
    }
};
