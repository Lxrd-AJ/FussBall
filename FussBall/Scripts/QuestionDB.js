/**
 * Created by AJ on 16/04/2014.
 */
var QuestionDB = function(){
    
    this.nameToImageDictionary = {
         'English' : 'Resources/English.png' ,  'Arabic' : 'Resources/Arabic.png',
         'Bengali': 'Resources/Bengali.png' ,  'French' : 'Resources/French.png' ,
         'German' : 'Resources/German.png' ,  'Hindi' : 'Resources/Hindi.png' ,
         'Italian' : 'Resources/Italian.png' ,  'Mandarin': 'Resources/Mandarin.png' ,
         'Spanish' : 'Resources/Spanish.png' ,  'Urdu': 'Resources/Urdu.png' 
    };
    this.nameToArabicDictionary = {
        'English': 'انجليزي',  'Arabic' : 'عربي' ,  'Bengali':'بنغالي', 'French':'فرنسي',
        'German':'ألماني', 'Hindi':'هندي', 'Italian':'إيطالي', 'Mandarin':'صيني',
        'Spanish':'أسباني', 'Urdu':'أوردو'
    };
    
    this.kineticImages = [0,0,0,0,0,0,0,0,0,0];
    this.supportLanguage = 14; // english
    this.targetLanguage = 16; // arabic
    this.unit = 1;
    this.section = 1;
    //this.images = {};
    this.support = [];
    this.target = [];
    //this.LNKineticImages = [];
    
    
    this.firstQuestionObject = null;
    this.secondQuestionObject = null;
    
    this.loadImages();
    this.getTextFromServer();
};

QuestionDB.prototype = {
    constructor: QuestionDB,
    generateRandomObject: function(){
        var randObj = {
            'supportID' : null,
            'LNImage' : null,
            'targetText' : null
        };   
        
        //random support id between 0 and 9
        var randKey = Math.floor( Math.random() * 10 );
        
        randObj.supportID = this.support[ randKey ];
        randObj.LNImage = this.kineticImages[ randKey ];
        randObj.targetText = this.target[ randKey ];
        //console.log( this.kineticImages[1] );
        return randObj;
    },
    prepareQuestionObjects: function(){
        this.firstQuestionObject = this.generateRandomObject();
        this.secondQuestionObject = this.generateRandomObject();
    },
    getQuestionObjects: function(){
        return {
            'first': this.firstQuestionObject,
            'second': this.secondQuestionObject
        }
    },
    areQuestionsSame: function( obj1, obj2 ){
        if( obj1.supportID == obj2.supportID )
            return true;
        else
            return false;
    },
    loadImages : function( sources ){
        /*
        var loadedImages = 0;
        var numImages = 0;
        
        for( var src in sources )
            numImages++;
        for( var src in sources ){
            this.images[src] = new Image();
            this.images[src].onload = function(){
                if( ++loadedImages > numImages )
                    this.buildKineticImages( this.images );
            };
            this.images[src].src = sources[src];
        }
        */
        for (var k=0; k<10; k++) {
            var img = new Image();
            var that = this;
            img.onload = function(k){ return function() {
                that.kineticImages[k] = new Kinetic.Image({ image: img });
                //console.log( that.kineticImages[k] );
            }; }(k);
            img.src = 'http://images.languagenut.com/illustrations/transparent_bg_150/trans.img_u' + (this.unit>9?'':'0') + this.unit + '_s' + this.section + '_' + (k>=9?'':'0') + (k+1) + '0001.png';
            img.crossOrigin = "anonymous";
        } 
    },
    getTextFromServer: function(){
         $.get("http://www.languagenut.com/en/webservice/sections?" + $.param({
      language_uid: this.supportLanguage.toString() + ',' + this.targetLanguage.toString(), 
      from: (this.unit-1 * 6) + this.section, 
      to: (this.unit-1 * 6) + this.section }),
      function(response) {
       var data = $.parseJSON(response);
       for (var i=0; i<data.length; i++) {
        switch (data[i].language) {
         case supportLanguage:
          for (var j=0; j<data[i].sections[0].vocab.length; j++) {
           this.support[ data[i].sections[0].vocab[j].termId ] =
            data[i].sections[0].vocab[j].title;
          }
         case targetLanguage:
          for (var j=0; j<data[i].sections[0].vocab.length; j++) {
           this.target[ data[i].sections[0].vocab[j].termId ] =
            data[i].sections[0].vocab[j].title;
          }
        }
       }
  
  });

    }
};
