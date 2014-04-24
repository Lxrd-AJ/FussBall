var GameOverView = function(){
    this.layer = new Kinetic.Layer();
    this.newGameText = "New Game";
    this.cancelGameText = "Cancel Game";
    this.fontFamily = "Calibri";
    this.fillColor = "blue";
    this.gameOverText = "Game Over!!!"
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
            width: window.innerWidth * 0.6,
            height: window.innerHeight * 0.5,
            fill: this.fillColor,
            stroke: 'white',
            strokeWidth: 3
        });
        this.gameOverRect.cornerRadius(10);
        this.gameOverKineticText = new Kinetic.Text({
            x: this.gameOverRect.x(),
            y: this.gameOverRect.y(),
            text: this.gameOverText,
            fontFamily: this.fontFamily,
            fontSize : 35,
            fill: 'red'
        });
        
        this.cancelGameRect = new Kinetic.Rect({
            x: window.innerWidth * 0.25,
            y: (window.innerHeight * 0.15 ) + this.gameOverRect.height(),
            width: 80,
            height: 60,
            fill: 'red',
            stroke: 'white',
            strokeWidth: 2.5
        });
        this.cancelGameRect.cornerRadius(10);
        this.cancelGameRect.listening( true );
        this.cancelGameKineticText = new Kinetic.Text({
            x: this.cancelGameRect.x(),
            y: this.cancelGameRect.y(),
            text: this.cancelGameText,
            fontFamily: this.fontFamily,
            fontSize: 35,
            fill: 'black'
        });
        this.onClick( this.cancelGameRect, function(obj){
            that.didClickButtonAtRect(obj);
        });
        this.onClick( this.cancelGameKineticText, function( obj ){
            that.didClickButtonAtRect(obj);
        });
        
        this.newGameRect = new Kinetic.Rect({
            x: (window.innerWidth * 0.4) + this.cancelGameRect.x(),
            y: this.cancelGameRect.y(),
            width: 80,
            height: 60,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 2.5
        });
        this.newGameRect.cornerRadius(10);
        this.newGameRect.listening( true );
        this.newGameKineticText = new Kinetic.Text({
            x: this.newGameRect.x(),
            y: this.newGameRect.y(),
            text: this.newGameText,
            fontFamily: this.fontFamily,
            fontSize: 35,
            fill: 'black'
        });
        this.onClick( this.newGameRect, function(obj){
            that.didClickButtonAtRect( obj );
        });
        this.onClick( this.newGameKineticText, function(obj){
            that.didClickButtonAtRect( obj );
        });
        
        this.viewGroup.add( this.gameOverRect, this.gameOverKineticText,                                             this.cancelGameRect, this.cancelGameKineticText,
                            this.newGameRect, this.newGameKineticText );
        this.layer.add( this.viewGroup );
        callBack( this );
    },
    onClick : function( object, func ){
        object.on( 'click tap', function(){
            func( object );
        });
    },
    didClickButtonAtRect: function( obj ){
        
    },
    showAlert: function( text ){
        
    }
};