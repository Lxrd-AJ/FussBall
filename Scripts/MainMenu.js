var MainMenu = function( callback, playGameCallback ){
    this.ronin = new Ronin();
    
    this.nuts = ['cn', 'ca', 'de','en','es','fr','ga','ht','id','it','jp','ma','mx','pl','us'];
    this.targetObjects = [
        [ 3 , 'French' ],
        [ 4 , 'Spanish' ],
        [ 5 , 'Italian' ],
        [ 6 , 'German' ],
        [ 7 , 'Mandarin-Pinyin' ],
        [ 10 , 'Japanese-Kanji' ],
        [ 11 , 'Japanese-Romanji' ],
        [ 12 , 'Mandarin-Hanzi' ],
        [ 14 , 'English' ],
        [ 16 , 'Arabic-script' ],
        [ 17 , 'Maori' ],
        [ 19 , 'Indonesian' ],
        [ 23 , 'Spanish (Latin America)' ],
        [ 24 , 'Haitian Creole' ],
        [ 26 , 'English (US)' ],
        [ 75 , 'Gaelic' ],
        [ 134 , 'ww int ww' ],
        [ 135 , 'Traditional Arabic' ]
    ];
    this.teamImages = [];
    this.teams = [];
    this.loadTeamImages();
    this.layer = new Kinetic.Layer();
    this.playGameFunc = playGameCallback;
    this.maxSection = 6;
    this.maxUnit = 24;
      
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
    
    this.layer.add( this.menuGroup );
    callback( this );  
    
    this.showInstructionsMenu();
};

MainMenu.prototype = {
    constructor: MainMenu,
    stopLoopingSound: function(){
        this.loopingSound.stop();
    },
    loadTeamImages: function(){
        var img = null;
        
        for (var nut in this.nuts ) {
            img = new Image();
            img.src = "http://www.languagenut.com/images/nuts/150/" + this.nuts[nut] + "_nut.png";
            this.teamImages.push(img);
        } 
    },
    showInstructionsMenu : function(){
        var context = this;
        //Remove all elements on screen
        this.menuGroup.destroyChildren();
        
        //create the menu
        var instructionsMenu = this.ronin.createLNRect( window.innerWidth * 0.2, window.innerHeight * 0.1 );
        var Titletext = this.ronin.createLNText( window.innerWidth * 0.4, window.innerHeight * 0.15 );
        Titletext.setText("LanguageNut World Cup");
        Titletext.fill("orange");
        
        var smallText = this.ronin.createLNText( window.innerWidth * 0.385, window.innerHeight * 0.20 );
        smallText.setText("\tThe World Cup is nearly here.\n Use your language skills to beat your friends!");
        smallText.fontSize(15);
        smallText.align("center");
        
        var sectionHeaderText = this.ronin.createLNText( window.innerWidth * 0.45, window.innerHeight * 0.30 );
        sectionHeaderText.setText("Instructions");
        
        var sectionText = this.ronin.createLNText( window.innerWidth * 0.22, window.innerHeight * 0.40 );
        sectionText.fontSize(18);
        sectionText.fill("#7A6C01");
        sectionText.setText("• Find a friend to play against, or form two teams to play on a whiteboard\n\n• Each side gets 10 seconds to answer as many questions as they can. \nEach correct answer passes the ball. After 4 passes you can score a goal.\n\n• If you get a question wrong, or you score a goal, play passes to \nthe other team\n\n• The game ends after 1 minute\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t It's not rocket science.");
        
        var playButton = this.ronin.createLNButton( window.innerWidth * 0.45, window.innerHeight * 0.80 );
        playButton.text.setText("\t\t\t\t\t Got it!!");
        playButton.text.on( 'click tap', function(){
            context.showMenu( context );
        });
        
        //Add the objects 
        this.menuGroup.add( instructionsMenu, Titletext, smallText, sectionHeaderText, sectionText, playButton.button, playButton.text );
        this.layer.draw();
    },
    showMenu: function( context ){
        var that = context;
        that.loadMenuContents();
        var tween = new Kinetic.Tween({
            node: this.menuGroup,
            duration: 1,
            easing: Kinetic.Easings.EaseIn,
            x: window.innerWidth * -0.8,
            onFinish: function(){
                
            }
        });
        tween.play();
    },
    loadMenuContents: function(){
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

        this.layer.draw();
        
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
    createLabelWithStepperAndText: function( xPos, yPos )
    {
        var that = this;
        var count = 1;
        var max = 0;
        var Text = new Kinetic.Text({
            x: xPos,
            y: yPos ,
            //width: window.innerWidth / 7,
            //height: window.innerHeight / 9,
            fontSize: 20,
            fill: 'black',
            padding: 20,
            align: 'center',
            fontFamily: 'Nunito',
            text: count
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
            x: xPos,
            y: BStepper.y() + 20,
            //width: window.innerWidth / 6,
            //height: window.innerHeight / 9,
            fontSize: 40,
            fill: '#663300',
            //padding: 10,
            align: 'center',
            fontFamily: 'Nunito',
            text: 'Unit'
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
            }
        }
    },
    didClickButton: function( button  ){
        if( button.text() === "Play Game" ){
            this.allowUserChooseSection();
        }else if( button.text() === "Start Game" )
            this.dismissMenu( this.playGameFunc );
             
    },
    allowUserChooseSection: function(){
        var that = this;
        var tween = new Kinetic.Tween({
            node: this.menuGroup,
            duration: 1,
            easing: Kinetic.Easings.Linear,
            x: -window.innerWidth * window.innerWidth,
            onFinish: function(){
                tween.reverse();
            }//end 
        });
        tween.play();    
        
        //Destroy the contents of the menu
        this.menuGroup.destroyChildren();
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
        
        //Add the buttons
        var playGameButton = this.createButtonWithText(this.menuRect.x() + this.menuRect.width()/2, this.menuRect.y() + this.menuRect.height()/1.5,"Start Game");
        var cancelGameButton = this.createButtonWithText(this.menuRect.x() + this.menuRect.width()/5, this.menuRect.y() + this.menuRect.height()/1.5,"Back");
        //Add the Label with steppers
        this.unit = this.createLabelWithStepperAndText(this.menuRect.x() + 80,this.menuRect.y() + 50);
        this.unit.setMax(24);
        this.section = this.createLabelWithStepperAndText(this.menuRect.x() + window.innerWidth * 0.4,this.menuRect.y() + 50);
        this.section.BottomText.setText("Section");
        this.section.setMax(6);
        
        //Target Language
        var that = this;
        this.targetLanguage = this.createLabelWithStepperAndText( this.menuRect.x() + window.innerWidth * 0.243, this.menuRect.y() + 100 );
        this.targetLanguage.BottomText.setText('Language');
        this.targetLanguage.textBox.x( this.targetLanguage.textBox.x() - this.targetLanguage.textBox.width()/2);
        that.targetLanguage.textBox.text( that.targetObjects[that.targetLanguage.getCount()][1] );
        this.targetLanguage.setMax( this.targetObjects.length );
        this.targetLanguage.TopStepper.off('click tap');
        this.targetLanguage.TopStepper.on( 'click tap', function(){
            that.targetLanguage.incrementCount();
            if( that.targetLanguage.getCount() >= that.targetObjects.length )
                that.targetLanguage.setCount(0);
            that.targetLanguage.textBox.text( that.targetObjects[that.targetLanguage.getCount()][1] );
            that.layer.draw();       
        });
        this.targetLanguage.BottomStepper.off('click tap');
        this.targetLanguage.BottomStepper.on('click tap', function(){
            if( that.targetLanguage.getCount() < 1 )
                that.targetLanguage.setCount( that.targetObjects.length );
            that.targetLanguage.decrementCount();
            that.targetLanguage.textBox.text( that.targetObjects[that.targetLanguage.getCount()][1] );
            that.layer.draw();
        });
        
        
        this.menuGroup.add( this.menuRect, playGameButton.button, playGameButton.text, cancelGameButton.button, cancelGameButton.text, this.unit.BottomStepper, this.unit.textBox, this.unit.TopStepper, this.section.TopStepper, this.section.textBox, this.section.BottomStepper, this.unit.BottomText, this.section.BottomText , that.targetLanguage.BottomStepper, that.targetLanguage.BottomText, that.targetLanguage.textBox, that.targetLanguage.TopStepper );
        
        this.layer.draw();
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
                    'UnitSectionID' : { unit: that.unit.getCount(), section: that.section.getCount(), targetLang : that.targetObjects[that.targetLanguage.getCount()][0] }            
                });
            }//end 
        });
        tween.play();
        console.log(this.unit.getCount() );
        console.log(this.section.getCount() );
    }
};
