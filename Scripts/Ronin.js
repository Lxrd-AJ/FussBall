var Ronin = function(){
    
};

Ronin.prototype = {
    constructor: Ronin,
    
    createLNRect : function( xPos, yPos ){
        var rect = new Kinetic.Rect({
            x: xPos,
            y: yPos,
            width: window.innerWidth * 0.6,
            height: window.innerHeight * 0.8,
            fill: '#F0F0F0',
            stroke: 'orange',
            strokeWidth: 5,
            cornerRadius: 15
        });
        return rect;
    },
    
    createLNText: function( xPos, yPos ){
        var text = new Kinetic.Text({
            x: xPos,
            y: yPos,
            fontSize: 25,
            fontFamily: 'Nunito',
            //align: 'center',
            fill: 'black',
            padding: 1
        });
        return text;
    }
};