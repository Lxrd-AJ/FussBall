var MainMenu = function( callback, playGameCallback ){
    this.nuts = ['cn', 'ca', 'de','en','es','fr','ga','ht','id','it','jp','ma','mx','pl','us'];
    this.teamImages = [];
    this.teams = [];
    this.loadTeamIages();
    this.layer = new Kinetic.Layer();
    this.playGameFunc = playGameCallback;
      
    this.loopingSound = new Howl({
        urls: ['Resources/FIFA World Cup - 2014 - Brazil.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5
    });
    
    this.menuGroup = new Kinetic.Group({
        x:0,
        y:0
    });
    
    this.menuRect = new Kinetic.Rect({
        x: window.innerWidth,
        y: window.innerHeight * 0.1,
        width: window.innerWidth * 0.6,
        height: window.innerHeight * 0.8,
        fill: '#F0F0F0',
        stroke: 'orange',
        strokeWidth: 5,
        cornerRadius: 15
    });
    this.menuGroup.add( this.menuRect );
    
    //Team choosing
    var offset = window.innerWidth * 0.4;
    this.teamA = this.createImageBoxWithTopTextAndStepper( this.menuRect.x() + 80,this.menuRect.y() + 50 ,'Team A' );
    this.teamB = this.createImageBoxWithTopTextAndStepper( this.menuRect.x() + offset, this.menuRect.y() + 50 ,'Team B' ) ;
    this.teamB.image.setImage( this.teamImages[1] );
    this.teamB.incrementStep();
    this.teams.push( this.teamA );
    this.teams.push( this.teamB );
    for( var i = 0; i < this.teams.length; i++ ){
        //this.menuGroup.add( this.teams[i].box );
        this.menuGroup.add( this.teams[i].image );
        this.menuGroup.add( this.teams[i].text );
        this.menuGroup.add( this.teams[i].leftStepper );
        this.menuGroup.add( this.teams[i].rightStepper );
    }
    
    //Back and continue game buttons
    var playGameButton = this.createButtonWithText( this.menuRect.x() + this.menuRect.width()/2, this.menuRect.y() + this.menuRect.height()/1.5, "Play Game"  );
    this.menuGroup.add( playGameButton.button );
    this.menuGroup.add( playGameButton.text );
    
    var cancelGameButton = this.createButtonWithText( this.menuRect.x() + this.menuRect.width()/5, this.menuRect.y() + this.menuRect.height()/1.5, "Cancel Game"  );
    this.menuGroup.add( cancelGameButton.button );
    this.menuGroup.add( cancelGameButton.text );
     
    this.layer.add( this.menuGroup );
    callback( this );
    
    this.showMenu();
};

MainMenu.prototype = {
    constructor: MainMenu,
    stopLoopingSound: function(){
        this.loopingSound.stop();
    },
    loadTeamIages: function(){
        var img = null;
        this.unit = 1;
        this.section = 1;
        
        for (var nut in this.nuts ) {
            img = new Image();
            img.src = "http://www.languagenut.com/images/nuts/150/" + this.nuts[nut] + "_nut.png";
            this.teamImages.push(img);
        } 
    },
    showMenu: function(){
        var tween = new Kinetic.Tween({
            node: this.menuGroup,
            duration: 1,
            easing: Kinetic.Easings.EaseIn,
            x: window.innerWidth * -0.8
        });
        tween.play();
    },
    createImageBoxWithTopTextAndStepper : function( xPos, yPos, text ){
        var stepper = 0;
        var that = this;
        
        var rect = new Kinetic.Rect({
            x: xPos,
            y: yPos,
            width: window.innerWidth / 7,
            height: 100,
            stroke: 'yellow',
            cornerRadius: 15
        });
        
        var teamImage = new Kinetic.Image({
            x: xPos,
            y: yPos,
            width: rect.width() + 5,
            height: rect.width() + 5,
            image: this.teamImages[0],
            cornerRadius: 15
        });
        
        var topText = new Kinetic.Text({
            x: rect.x() + 25,
            y: rect.y() - 30,
            fontSize: 25,
            fontFamily: 'Nunito',
            align: 'center',
            fill: 'black',
            text: text
        });
        
        var LStepper = new Kinetic.RegularPolygon({
            x: teamImage.x() - 15,
            y: teamImage.y() + teamImage.height()/2,
            sides: 3,
            radius: 20,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 2
        });
        LStepper.on( 'mouseover' , function(){
        } );
        LStepper.on( 'click tap', function(){
            if( stepper >= that.teamImages.length )
                stepper = -1;

            teamImage.setImage( that.teamImages[ ++stepper % that.teamImages.length ] );
            that.layer.draw();
        });
        
        var RStepper = new Kinetic.RegularPolygon({
            x: teamImage.x() + teamImage.width() + 5,
            y: teamImage.y() + teamImage.height()/2 - 5.5,
            sides: 3,
            radius: 20,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 2,
            rotation: 180
        });
        RStepper.on( 'click tap', function(){
            if( stepper < 0 )
                stepper = that.teamImages.length ;
            
            teamImage.setImage( that.teamImages[ --stepper % that.teamImages.length ] );
            that.layer.draw();
        });
        
        return{
            image : teamImage,
            box : rect,
            text : topText,
            leftStepper : LStepper,
            rightStepper : RStepper,
            step : stepper,
            getStep : function(){
                return stepper;
            },
            incrementStep: function(){
                stepper++;
            }
        }
    },
    createButtonWithText  : function( xPos, yPos ,text ){
        var that = this;
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
        
        var text = new Kinetic.Text({
            x: xPos,
            y: yPos,
            width: rect.width(),
            height: rect.height(),
            fontSize: 20,
            fill: 'black',
            padding: 10,
            align: 'center',
            fontFamily: 'Nunito',
            text: text
        });
        text.on( 'click tap', function(){
            that.didClickButton( text );    
        });
        
        
        return{
            'button' : rect,
            'text' : text
        }
    },
    didClickButton: function( button ){
        if( button.text() === "Play Game" )
            this.dismissMenu( this.playGameFunc );
             
    },
    dismissMenu: function( onFinishCallBack ){
        //get the team urls
        var that = this;
        var tween = new Kinetic.Tween({
            node: this.menuGroup,
            duration: 1,
            easing: Kinetic.Easings.Linear,
            x: -window.innerWidth * window.innerWidth,
            onFinish: function(){
                that.stopLoopingSound();
                onFinishCallBack( {
                    'teamA' : {  id: that.teamA.getStep(), nuts : that.nuts },
                    'teamB' : {  id: that.teamB.getStep(), nuts : that.nuts },
                    
                });
            }//end 
        });
        tween.play();
    }
};