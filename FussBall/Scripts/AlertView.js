/**
 * Created by AJ on 16/04/2014.
 */
var AlertView = function(){
    this.alertLayer = new Kinetic.Layer();
    this.cancelButtonTitle = "No";
    this.okButtonTitle = "Ok";
    this.alertRect = new Kinetic.Rect();
    this.cancelRect = new Kinetic.Rect();
    this.okRect = new Kinetic.Rect();
    this.alertGroup = new Kinetic.Group();
    this.questionDB = new QuestionDB();
    this.alertShouldShow = true;
    this.exist = false;
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
            strokeWidth: 5
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

        this.alertGroup.add( this.alertRect,this.cancelRect,this.cancelText,this.okRect,this.okText );
        this.alertLayer.add( this.alertGroup );
        callBack( this );
    },
    alertWillShow: function( callBack ){
        if( !this.exist ) {
            this.instantiate(callBack);
            return true;
        }
    },
    showAlert : function( callBack ){
        if( this.alertShouldShow ){
            this.alertWillShow( callBack );
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
            //this.removeAlert();
        }else if( Rect === this.okRect ){
            //window.alert("ok");
        }
        this.alertWillDisappear();
        this.removeAlert();
    },
    onClick : function( object, func ){
        object.on( 'click tap', function(){
            func( object );
        });
    },
    alertWillDisappear : function(){

    },
    removeAlert: function(){
        this.alertWillDisappear();
        var dismissAnimation = new Kinetic.Tween({
            node: this.alertGroup,
            duration: 0.7,
            easing: Kinetic.Easings.EaseOut,
            y: -500
        });
        dismissAnimation.play();
    }
};
