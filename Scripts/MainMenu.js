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
        [ 135 , 'Traditional Arabic' ]
    ];
    
    this.sections = [
        ['1', 'Languages'],//Unit 1
        ['2', 'Ways of greeting'],
        ['3', 'Names'],
        ['4', 'Family members'],
        ['5', 'Numbers up to 10'],
        ['6', 'Age indicators'],
        ['7', 'The Farmer in his Den'],//Unit 2
        ['8', 'Numbers 1 to 10'],
        ['9', 'I love to play (sentence builder)'],
        ['10', 'Conkers'],
        ['11', 'Numbers 11 to 20'],
        ['12', 'Fun games'],
        ['13', 'Things I do well'],//Unit 3
        ['14', 'Birthday Party'],
        ['15', 'Games at my party'],
        ['16', 'Invitation to a Birthday'],
        ['17', 'The Olympics'],
        ['18', 'The Olympics 2'],
        ['19', 'My body'],//Unit 4
        ['20', 'Colours'],
        ['21', 'Facial Features'],
        ['22', 'Beastly Body Parts'],
        ['23', 'Hair and Eye Colours'],
        ['24', 'How we look (sentence building)'],
        ['25', 'The four friends'],
        ['26', 'Ten animals'],
        ['27', 'Animal and Colours '],
        ['28', 'Animal Magic (animals doing things)'],
        ['29', 'Animal Chorus (general support)'],
        ['30', 'Animals on show: sentence builder'],
        ['31', 'In the veg garden (veg and opinions)'],
        ['32', 'Life cycle of a plant'],
        ['33', 'Jack and the Beanstalk (key words)'],
        ['34', 'Retelling the story (more key words)'],
        ['35', 'At the Market (fruit)'],
        ['36', 'Buying Vegetables'],
        ['37', 'How I go to school'],
        ['38', 'Where different languages are spoken'],
        ['39', 'Weather'],
        ['40', 'On our travels - where and how'],
        ['41', 'Travel arrangements (days)'],
        ['42', 'Planning a trip (key things)'],
        ['43', 'Toy Shop (toys and opinions)'],
        ['44', ' Likes and dislikes (opinions)'],
        ['45', 'Numbers 21 - 30'],
        ['46', 'Birthday Presents (wish list)'],
        ['47', 'Expressing preferences '],
        ['48', 'Toy advert (comparing things)'],
        ['49', 'Sleeping Beauty (key words)'],
        ['50', 'Giving instructions'],
        ['51', 'Counting in multiples of 10 to 100'],
        ['52', 'Descriptions (adjectives)'],
        ['53', 'Setting the scene: key words and phrases'],
        ['54', 'Tell me a story! (verbs and opinons)'],
        ['55', 'Talking sports (10 sports)'],
        ['56', 'Healthy eating'],
        ['57', 'More healthy eating'],
        ['58', 'Diary of activities (days...)'],
        ['59', 'Comparing activities with a friend'],
        ['60', 'Making a poster: what you need'],
        ['61', 'Meet 10 animals '],
        ['62', 'Describing animals with colours'],
        ['63', 'What\'s the time? (Telling the time)'],
        ['64', 'Animal descriptions    (10 adjectives)'],
        ['65', 'Animal habitats'],
        ['66', 'Carnival time             (Qs and As)'],
        ['67', 'What\'s the weather like?'],
        ['68', 'Numbers 31 - 40'],
        ['69', 'What temperature is it?'],
        ['70', 'The Wind and the Sun'],
        ['71', 'Dressing for the weather (clothes)'],
        ['72', 'Weather reports'],
        ['73', 'Packed lunch'],
        ['74', 'Likes and dislikes of food'],
        ['75', 'Good for your health'],
        ['76', 'Celebrations'],
        ['77', 'Food for a celebration'],
        ['78', 'La Pizza '],
        ['79', 'Types of music'],
        ['80', 'Expressing opinions'],
        ['81', 'Buying a CD'],
        ['82', 'musical instruments'],
        ['83', 'It’s a rap! near future of \'to play\''],
        ['84', 'Music contest: types of body percussion'],
        ['85', 'Alphabet A - J'],
        ['86', 'Local Features'],
        ['87', 'Journey to school: Directions'],
        ['88', 'More journeys to school'],
        ['89', 'Saying that you don’t understand'],
        ['90', 'Preparing a short presentation'],
        ['91', 'Beach scene'],
        ['92', 'Bringing a picture to life'],
        ['93', 'Writing a description: adjectives'],
        ['94', 'Comparing beaches: adjectives'],
        ['95', 'Class poem'],
        ['96', 'Beach scene items'],
        ['97', 'Months and seasons'],
        ['98', 'Weather and seasons'],
        ['99', 'Joining in a poem (spring vocabulary)'],
        ['100', 'Seasonal colours (opposites)'],
        ['101', 'Conscience Alley (seasons and colours)'],
        ['102', 'Preparing a performance: connectives'],
        ['103', 'Introducing the planets'],
        ['104', 'Describing the planets: some adjectives'],
        ['105', 'Writing about a planet: sentence building'],
        ['106', 'Distances from the sun: sentence building'],
        ['107', 'Making compound sentences'],
        ['108', 'Planetary features'],
        ['109', 'What’s the time? (half past the hour)'],
        ['110', 'Places in our school'],
        ['111', 'Tour of our school'],
        ['112', 'School subjects'],
        ['113', 'Breaktime (past tense)'],
        ['114', 'Breaktime diaries '],
        ['115', 'Continents'],
        ['116', 'World Rivers '],
        ['117', 'Language detectives: river vocab'],
        ['118', 'Landscape features'],
        ['119', 'The journey of the Congo: features'],
        ['120', 'Explorers (future weather)'],
        ['121', 'Café vocab'],
        ['122', '\'The Café Song’ '],
        ['123', 'What’s on the menu? Past tense'],
        ['124', 'Ice cream flavours'],
        ['125', 'Making a milkshake'],
        ['126', 'Café theatre (silly food)'],
        ['127', 'Places in a town centre'],
        ['128', 'That’s a date: 1910 - 2000'],
        ['129', 'Then and now: places in town past and present'],
        ['130', 'Find the difference: describe places in town'],
        ['131', 'Compare and contrast: \'to be\' imperfect'],
        ['132', 'A guide for tourists: key vocab'],
        ['133', 'Theme park rides '],
        ['134', 'Creating a theme park Qs & As'],
        ['135', 'past tense of \'to go\''],
        ['136', 'Ghost train characters'],
        ['137', 'What did you see and hear? (past phrases)'],
        ['138', 'Writing (past tense sentences)'],
        ['139', 'Newspaper Column Types'],
        ['140', 'News games: adjectives'],
        ['141', 'In my opinion (opinion phrases)'],
        ['142', 'In the paper'],
        ['143', 'Ask me again (Qs and As)'],
        ['144', 'Here I am! (connectives)'],
    ];

    this.units = [
        ['1', 'Me, myself and I'],
        ['2', 'Singing and playing'],
        ['3', 'Party Time'],
        ['4', 'How I Look'],
        ['5', 'The Four Friends Story'],
        ['6', 'Growing Things'],
        ['7', 'All Aboard'],
        ['8', 'Pocket Money'],
        ['9', 'Tell me a Story!'],
        ['10', 'Our Sporting Lives'],
        ['11', 'Animals\' Carnival'],
        ['12', 'What\'s the Weather?'],
        ['13', 'Healthy Eating'],
        ['14', 'I am the Music Man'],
        ['15', 'On the way to school'],
        ['16', 'Beach scene'],
        ['17', 'The Four Seasons'],
        ['18', 'The Planets'],
        ['19', 'Our School'],
        ['20', 'Our world'],
        ['21', 'Creating a cafe'],
        ['22', 'Then and now'],
        ['23', 'At the theme park'],
        ['24', 'What\'s in the news?'],
    ];
    
    this.teamImages = [];
    this.teams = [];
    this.loadTeamImages();
    this.layer = new Kinetic.Layer();
    this.playGameFunc = playGameCallback;
    this.maxSection = 6;
    this.maxUnit = 24;
      
    this.loopingSound = new Howl({
        urls: [],
        //autoplay: true,
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
        //this.loopingSound.stop();
    },
    loadTeamImages: function(){
        var img = null;
        
        for (var nut in this.nuts ) {
            img = new Image();
            img.src = "http://www.languagenut.com/images/nuts/150/" + this.nuts[nut] + "_nut.png";
            this.teamImages.push(img);
        } 
    },
    showInstructionsMenu : function( anim ){
        var context = this;
        //Remove all elements on screen
        this.menuGroup.destroyChildren();
        
        //create the menu
        var x0 = (window.innerWidth - 800)/2;
        var instructionsMenu = this.ronin.createLNRect( x0, window.innerHeight * 0.05);
        instructionsMenu.width( 800 );
        instructionsMenu.height( window.innerHeight * 0.9 );
        var Titletext = this.ronin.createLNImage( x0+(800-567)/2, window.innerHeight * 0.10, 'Resources/LNutWorldCup.png' , this.layer, this.menuGroup );
        
        var smallText = this.ronin.createLNText(x0 + 140, window.innerHeight * 0.19 );
	smallText.setText( "Learn while you score with Languagenut's exclusive World Cup game!" );
	smallText.fontSize(16);
        
        var sectionHeaderText = this.ronin.createLNText( x0 + 310, window.innerHeight * 0.27 );
	sectionHeaderText.setAttr('fontStyle', 'bold');
	sectionHeaderText.fontSize(30);
        sectionHeaderText.setText("Instructions");
        
	var subHead1 = this.ronin.createLNText( x0 + 20, window.innerHeight * 0.35 );
	subHead1.setAttr('fontStyle', 'bold');
	subHead1.fontSize(17);
        subHead1.setText("Setting up the Game");

        var sectionText = this.ronin.createLNText( x0 + 20, window.innerHeight * 0.39 );
	sectionText.setWidth(670);
        sectionText.fontSize(17);
	sectionText.lineHeight(1.5);
        sectionText.setText("• Play with a friend, or form teams to play at the whiteboard\n• Choose a country for each player or team\n• Choose the Languagenut unit and section which you would like the questions to be taken from.\n• Choose a language, then click 'Start Game'!");

	var subHead2 = this.ronin.createLNText( x0 + 20, window.innerHeight * 0.6 );
	subHead2.setAttr('fontStyle', 'bold');
	subHead2.fontSize(17);
        subHead2.setText("In play");

        var section2Text = this.ronin.createLNText( x0 + 20, window.innerHeight * 0.64 );
	section2Text.setWidth(670);
        section2Text.fontSize(17);
	section2Text.lineHeight(1.5);
        section2Text.setText("• Keep possession of the ball by answering 4 questions correctly in a row. If you manage this you score a goal.\n• Be quick! If you get a question wrong or you don't answer within 15 seconds, you will be tackled, and play passes to the other team.\n• The game will end after 3 minutes.");

        var playButton = this.ronin.createLNButton( x0 + 250, window.innerHeight * 0.86 );
        playButton.text.setText("Got it \u2013 let's go!");
        playButton.text.on( 'click tap', function(){
            context.showMenu( context );
        });
        
	var that = this;
        //Image on the top left
       	this.ronin.loadImages({nut: 'http://www.languagenut.com/images/nuts/150/nut.png', ball: 'Resources/ball.png'}, function(images) {
		var nutImage = new Kinetic.Image({x: x0-45, y:window.innerHeight * 0.02, image: images.nut});
	        var ballImage = new Kinetic.Image({x: x0 + 50, y:window.innerHeight * 0.02 + 120, image: images.ball});
        
       		 //Add the objects 
	        that.menuGroup.add( instructionsMenu, Titletext, smallText, sectionHeaderText, subHead1, subHead2, sectionText, section2Text, playButton.button, playButton.text, nutImage, ballImage );
	        that.layer.draw();
	});
        
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
        
        //Add the top text
        var topText = this.ronin.createLNText( this.menuRect.x() + this.menuRect.width()/2 - 230, this.menuRect.y() + 25 );
        topText.setText("Choose a country for each player/team");
        
        //Team choosing
        var offset = window.innerWidth * 0.4;
        this.teamA = this.createImageBoxWithTopTextAndStepper( this.menuRect.x() + 80,this.menuRect.y() + 100 ,'' );
        this.teamB = this.createImageBoxWithTopTextAndStepper( this.menuRect.x() + offset, this.menuRect.y() + 100 ,'' ) ;
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
        var playGameButton = this.createButtonWithText( this.menuRect.x() + this.menuRect.width()/2, this.menuRect.y() + this.menuRect.height()/1.4, "Next"  );
	playGameButton.button.setX(playGameButton.button.getX() - playGameButton.button.width()/2);
	playGameButton.text.setX(playGameButton.text.getX() - playGameButton.button.width()/2);
        this.menuGroup.add( playGameButton.button );
        this.menuGroup.add( playGameButton.text );

        this.menuGroup.add( topText );
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
            fill: '#FF4D00',
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
    
    didClickButton: function( button  ){
        if( button.text() === "Next" ){
            this.allowUserChooseSection();
        }else if( button.text() === "Start Game" )
            this.dismissMenu( this.playGameFunc );
        else if( button.text() === "Cancel Game"){}
            //this.showInstructionsMenu();
        else if( button.text() === "Back" )
            this.loadMenuContents();
             
    },
    allowUserChooseSection: function(){
        var that = this;
        var tween = new Kinetic.Tween({
            node: this.menuGroup,
            duration: 0.5,
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
        var playGameButton = this.createButtonWithText(this.menuRect.x() + this.menuRect.width()*0.75, this.menuRect.y() + this.menuRect.height()/1.3, "Start Game");
	playGameButton.button.setX(playGameButton.button.x() - playGameButton.button.width() / 2);
	playGameButton.text.setX(playGameButton.text.x() - playGameButton.text.width() / 2);
        var cancelGameButton = this.createButtonWithText(this.menuRect.x() + this.menuRect.width()*0.25, this.menuRect.y() + this.menuRect.height()/1.3, "Back");
	cancelGameButton.button.setX(cancelGameButton.button.x() - cancelGameButton.button.width() / 2);
	cancelGameButton.text.setX(cancelGameButton.text.x() - cancelGameButton.text.width() / 2);
        
        //Instruction text
        var instruct = this.ronin.createLNText( this.menuRect.x() + this.menuRect.width()/2 - 240, this.menuRect.y() + 50 );
        instruct.setText("Choose your Unit, Language and Section");
        
        //Add the Label with steppers
        this.unit = this.ronin.createLabelWithStepperAndText(this.menuRect.x() + 80,this.menuRect.y() + 150);
        this.unit.setMax(24);
        this.unit.BottomText.x( this.unit.BottomText.x() + 35 );
        this.section = this.ronin.createLabelWithStepperAndText(this.menuRect.x() + window.innerWidth * 0.4,this.menuRect.y() + 150);
        this.section.BottomText.setText("Section");
        this.section.BottomText.x( this.section.BottomText.x() + 32 );
        this.section.setMax(144);
        this.section.setCount(1);
        
        //Target Language
        var that = this;
        this.targetLanguage = this.ronin.createLabelWithStepperAndText( this.menuRect.x() + window.innerWidth * 0.23,this.menuRect.y() + 150 );
        this.targetLanguage.BottomText.setText('Language');
        that.targetLanguage.textBox.text( that.targetObjects[that.targetLanguage.getCount()][1] );
        this.targetLanguage.setMax( this.targetObjects.length );
        this.targetLanguage.TopStepper.off('click tap');
        this.targetLanguage.TopStepper.on( 'click tap', function(){
            that.targetLanguage.incrementCount();
            if( that.targetLanguage.getCount() >= that.targetObjects.length )
                that.targetLanguage.setCount(0);
            that.targetLanguage.textBox.text( that.targetObjects[that.targetLanguage.getCount()][1] );
            that.targetLanguage.trimText();
            that.layer.draw();       
        });
        this.targetLanguage.BottomStepper.off('click tap');
        this.targetLanguage.BottomStepper.on('click tap', function(){
            if( that.targetLanguage.getCount() < 1 )
                that.targetLanguage.setCount( that.targetObjects.length );
            that.targetLanguage.decrementCount();
            that.targetLanguage.textBox.text( that.targetObjects[that.targetLanguage.getCount()][1] );
            that.targetLanguage.trimText();
            that.layer.draw();
        });
        
        //Unit and Section Text Displaying
        //Unit
        this.unit.TopStepper.off('click tap');
        that.unit.textBox.text( that.unit.getCount() + 1 + ".  " + that.units[that.unit.getCount()][1] );
        this.unit.TopStepper.on( 'click tap', function(){
            that.unit.incrementCount();
            if( that.unit.getCount() >= that.units.length )
                that.unit.setCount(0);
            that.unit.textBox.text( that.unit.getCount() + 1 + ".  " + that.units[that.unit.getCount()][1] );
            
            //set the section text and count
            that.section.setCount( ((that.unit.getCount() * 6 ) ) );
            that.section.textBox.text( (that.section.getCount() % 6) + 1 + ". " + that.sections[that.section.getCount()][1] );
            that.unit.trimText();
            that.section.trimText();
            
            that.layer.draw();
        });
        this.unit.BottomStepper.off('click tap');
        this.unit.BottomStepper.on( 'click tap', function(){
            if( that.unit.getCount() < 1 )
                that.unit.setCount( that.units.length );
            that.unit.decrementCount();
            that.unit.textBox.text( that.unit.getCount() + 1 + ". " + that.units[that.unit.getCount()][1] );
            that.unit.trimText();
            that.section.trimText();
            
            //set the section text and count
            that.section.setCount( ((that.unit.getCount() * 6 ) ) );
            that.section.textBox.text( (that.section.getCount() % 6)+ 1 + ". " + that.sections[that.section.getCount()][1] );
            
            that.layer.draw();
        });
        //Section 
        this.section.TopStepper.off('click tap');
        that.section.setCount( ((that.unit.getCount() * 6 ) ) );
        that.section.textBox.text( (that.section.getCount() % 6) + 1+ ". " + that.sections[that.section.getCount()][1] );
        this.section.TopStepper.on('click tap', function(){
            that.section.incrementCount();
            if( that.section.getCount() >= ((that.unit.getCount() * 6 ) + 6) )
                that.section.setCount( ((that.unit.getCount() * 6 ) ) );
            that.section.textBox.text( (that.section.getCount() % 6)+ 1 + ". " + that.sections[that.section.getCount()][1] );
            that.section.trimText();
            that.layer.draw();
        });
        this.section.BottomStepper.off('click tap');
        this.section.BottomStepper.on('click tap', function(){
            if( that.section.getCount() < ((that.unit.getCount() * 6 ) + 1 ) )
                that.section.setCount( ((that.unit.getCount() * 6 ) ) + 6 );
            that.section.decrementCount();
            that.section.textBox.text( (that.section.getCount() % 6)+ 1 + ". " + that.sections[that.section.getCount()][1] );
            that.section.trimText();
            that.layer.draw();
        });
        
        //Adjust the text positions
        that.section.trimText();
        this.targetLanguage.trimText();
        that.unit.trimText();
        
        this.menuGroup.add( this.menuRect, playGameButton.button, playGameButton.text, cancelGameButton.button, cancelGameButton.text, this.unit.BottomStepper, this.unit.textBox, this.unit.TopStepper, this.section.TopStepper, this.section.textBox, this.section.BottomStepper, this.unit.BottomText, this.section.BottomText , that.targetLanguage.BottomStepper, that.targetLanguage.BottomText, that.targetLanguage.textBox, that.targetLanguage.TopStepper, instruct );
        
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
                    'UnitSectionID' : { unit: that.units[that.unit.getCount()][0] , section: ((that.section.getCount() % 6 )+1) , targetLang : that.targetObjects[that.targetLanguage.getCount()][0] }            
                });
            }//end that.section.getCount()
        });
        tween.play();
        console.log( that.units[that.unit.getCount()][0] );
        console.log( (this.section.getCount()% 6)+1 );
        console.log( that.targetObjects[that.targetLanguage.getCount()][0] );
    }
};
