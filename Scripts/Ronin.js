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
    },
    
    createLNButton: function( xPos, yPos ){
        var rect = new Kinetic.Rect({
            x: xPos,
            y: yPos,
            width: 180,
            height: 40,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 1.5,
            cornerRadius: 10
        });
        var text = this.createLNText( xPos, yPos );
        text.width( rect.width() );
        text.height( rect.height() );
        text.padding( 10 );
        
        return {
            'button' : rect,
            'text' : text
        }
    },
    
    createLNImage: function( xPos, yPos, src, layerRef, group ){
        var img = new Image();
        var kImage = new Kinetic.Image();
        img.onload = function(){
            kImage = new Kinetic.Image({
                image: img,
                x: xPos,
                y: yPos
            }); 
            group.add( kImage );
            layerRef.draw();
        };
        img.src = src;
    }
};