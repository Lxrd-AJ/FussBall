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
            fill: 'black',
            padding: 1
        });
        return text;
    },
    
    createLNButton: function( xPos, yPos ){
        //Feature: Put em' in a group
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
    
    createLabelWithStepperAndText: function( xPos, yPos )
    {
        var that = this;
        var count = 0;
        var max = 0;
        var Text = new Kinetic.Text({
            x: xPos,
            y: yPos ,
            width: window.innerWidth / 7,
            //height: window.innerHeight / 9,
            fontSize: 20,
            fill: 'black',
            padding: 20,
            align: 'center',
            fontFamily: 'Nunito',
            text: count,
            wrap: 'word'
        });
        
        var TStepper = new Kinetic.RegularPolygon({
            x: xPos + Text.width()/2,
            y: yPos,
            sides: 3,
            radius: 20,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 2
        });
        TStepper.on( 'click tap', function(){
            if( count >= max )
                count = 0;
            count++;
            Text.text( count );
            that.layer.draw();
        });  
        var BStepper = new Kinetic.RegularPolygon({
            x: TStepper.x(),
            y: Text.y() + Text.height(),
            sides: 3,
            radius: 20,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 2,
            rotation: 180
        });
        BStepper.on( 'click tap', function(){
            count--;
            if( count < 1 )
                count = max;
            Text.text( count );
            that.layer.draw();
        });
        var bottomText = new Kinetic.Text({
            x: xPos + Text.width()/4,
            y: BStepper.y() + 100,
            //width: window.innerWidth / 6,
            //height: window.innerHeight / 9,
            fontSize: 40,
            fill: '#663300',
            //padding: 10,
            //align: 'center',
            fontFamily: 'Nunito',
            text: 'Unit',
            opacity: 0.2
        });
        bottomText.x( bottomText.x() - bottomText.width()/2 );
        
        return{
            'textBox' : Text,
            'TopStepper' : TStepper,
            'BottomStepper' : BStepper,
            'BottomText' : bottomText,
            'getCount' : function(){
                return count;
            },
            'incrementCount' : function(){
                count++;
            },
            'decrementCount' : function(){
                count--;
            },
            'setMax': function( int ){
                max = int;
            },
            'setCount': function( int ){
                count = int;
            },
            'getMax': function(){
                return max;
            }, 
            'trimText' : function(){
                var tween = new Kinetic.Tween({
                    node: BStepper,
                    duration: 0.3,
                    easing: Kinetic.Easings.EaseIn,
                    y: Text.y() + Text.height() + 15
                });
                tween.play();
            }
        }
    },
    
    createLNImage: function( xPos, yPos, src, layerRef, group ){
        var img = new Image();
        var kImage = new Kinetic.Image({
            x: xPos,
            y: yPos   
        });
        img.onload = function(){
            kImage.setImage( img );
            group.add( kImage );
            layerRef.draw();
        };
        img.src = src;
        return kImage;
    }
};