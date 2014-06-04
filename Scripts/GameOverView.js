var GameOverView = function(){
    this.layer = new Kinetic.Layer();
    this.newGameText = "Play Again";
    this.fontFamily = "Nunito";
    this.fillColor = "blue";
    this.gameOverText = "Game Over!!!"
    this.newGame = null;
    this.clickCallBack = null;
    this.ronin = new Ronin();
}

GameOverView.prototype = {
    constructor: GameOverView,
    instantiate: function( callBack ){
        var that = this;
        this.viewGroup = new Kinetic.Group({
            x: 0,
            y: 0
        });
        
        this.gameOverRect = new Kinetic.Rect({
            x: window.innerWidth * 0.2,
            y: window.innerHeight * 0.1,
            width: window.innerWidth * 0.6,
            height: window.innerHeight * 0.5,
            fill: '#E6E6E6',
            stroke: 'orange',
            strokeWidth: 3
        });
        this.gameOverRect.cornerRadius(10);
        this.gameOverKineticText = new Kinetic.Text({
            x: this.gameOverRect.x() + this.gameOverRect.width() * 0.65,
            y: this.gameOverRect.y() + this.gameOverRect.width() * 0.1,
            text: this.gameOverText,
            fontFamily: this.fontFamily,
            fontSize : 40,
            fill: '#0099FF',
            align: 'center'
        });
        this.gameOverImage = this.ronin.createLNImage( this.gameOverRect.x(), this.gameOverRect.y(), 'http://images.languagenut.com/illustrations/transparent_bg/trans.img_u03_s5_020001.png', this.layer, this.viewGroup );
        
        this.newGameRect = new Kinetic.Rect({
            x: (window.innerWidth * 0.5) - 150,
            y: (window.innerHeight * 0.15 ) + this.gameOverRect.height(),
            width: 300,
            height: 60,
            fill: '#F9F996',
            stroke: '#FF8919',
            strokeWidth: 2.5
        });
        this.newGameRect.cornerRadius(10);
        this.newGameRect.listening( true );
        this.newGameKineticText = new Kinetic.Text({
            x: this.newGameRect.x() + this.newGameRect.width() * 0.2,
            y: this.newGameRect.y() + this.newGameRect.height() * 0.2,
            text: this.newGameText,
            fontFamily: this.fontFamily,
            fontSize: 35,
            fill: 'black',
            align: 'center'
        });
        //this.newGameRect.width(this.newGameKineticText.getTextWidth());
        this.onClick( this.newGameRect, function(obj){
            that.didClickButtonAtRect( obj );
        });
        this.onClick( this.newGameKineticText, function(obj){
            that.didClickButtonAtRect( obj );
        });
        
        this.viewGroup.add( this.gameOverRect, this.gameOverKineticText, this.newGameRect, this.newGameKineticText );
        this.layer.add( this.viewGroup );
        callBack( this );
    },
    onClick : function( object, func ){
        object.on( 'click tap', function(){
            func( object );
        });
    },
    didClickButtonAtRect: function( obj ){
        if( obj == this.newGameRect || obj == this.newGameKineticText ){
            this.newGame = true;
            location.reload();
        }     
        this.dismissAlert();
        this.clickCallBack( this );
    },
    showAlert: function( textM , callB ){
        this.gameOverKineticText.text( textM ); 
        this.gameOverKineticText.align( 'center' ); 
        var showAnimation = new Kinetic.Tween({
            node: this.viewGroup,
            duration: 1,
            easing: Kinetic.Easings.Linear,
            y: window.innerHeight * 0.1,
            onFinish: function(){
                //Play the answer correct sound
                var cSound = new Howl({
                    urls:[''],
                    voume: 0.2,
                    loop: true
                });
                //cSound.play();
            }
        });
        showAnimation.play();
        this.clickCallBack = callB;
    },
    dismissAlert: function(){
        var tween = new Kinetic.Tween({
            node: this.viewGroup,
            duration: 1,
            easing: Kinetic.Easings.BounceEaseOut,
            y: -window.innerHeight,
            onFinish: function(){
                
            }
        });
        tween.play();
    },
    shouldStartNewGame: function( ){
        if( this.newGame )
            return true;
        else
            return false;
    }
};
