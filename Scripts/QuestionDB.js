/**
 * Created by AJ on 16/04/2014.
 */
var QuestionDB = function( unit, section , target ){
    
    this.supportLanguage = 14; // english
    this.targetLanguage = target; 
    this.unit = unit; //1
    this.section = section; //1
    this.support = []; 
    this.target = []; 
    this.images = []; 
    this.loadImages();
    this.getTextFromServer();
    this.questionObject = null;//current question being displayed
};

QuestionDB.prototype = {
    constructor: QuestionDB,
    generateRandomObject: function(){
        var randObj = {
            LNImage : null,
            targetAnswer : null,
            options : []
        };   
        
        var key = this.generateRandomNumber();
        randObj.LNImage = this.images[ key ];
        randObj.targetAnswer = this.target[ key ];
        randObj.options.push( this.target[ key ] ); //let one correct answer be in
        
        if( this.target.length < 10 )
        {
            console.log("Connection not established");   
        }else{
            while( randObj.options.length < 4) {
                var randomIndex = this.generateRandomNumber( );
            var newCandidate = this.target[ randomIndex ];
            var skip = false;
            for (var k=0; k<randObj.options.length; k++) {
            if (randObj.options[k] == newCandidate) skip = true;
            }
            if (!skip) randObj.options.push( newCandidate );
            }
        }
        this.shuffle( randObj.options );
        
        return randObj;
    },
    prepareQuestionObjects: function(){
        this.questionObject = this.generateRandomObject();
    },
    getQuestionObjects: function(){
        return this.questionObject;
    },
    loadImages : function( sources ){
        var img = null;
        for (var k=0; k<10; k++) {
            img = new Image();
            img.src = 'http://images.languagenut.com/illustrations/transparent_bg/trans.img_u' + (this.unit>9?'':'0') + this.unit + '_s' + this.section + '_' + (k>=9?'':'0') + (k+1) + '0001.png';
            this.images.push(img);
        } 
    },
    getTextFromServer: function(){
        var that = this;
         
        $.get("http://ww3.languagenut.com/en/webservice/sections?" + $.param({
      language_uid: this.supportLanguage.toString() + ',' + this.targetLanguage.toString(), 
      from: ((this.unit-1) * 6) + this.section, 
      to: ((that.unit-1) * 6) + that.section }),
      function(response)
      {
           var data = $.parseJSON(response);
           for (var i=0; i<data.length; i++) {
           if (data[i].language == that.targetLanguage.toString()) {
              for (var j=0; j<data[i].sections[0].vocab.length; j++) {
                   that.target[ j ] = data[i].sections[0].vocab[j].title;
              }
            }
         }//end for

    });//end request
        //$.get("/Scripts/Sections?" + $.param({
    },
    generateRandomNumber: function( max ){
        if( !max )
            max = 10;
        
        var randKey = Math.floor( Math.random() * max );
        return randKey;
    },
    shuffle: function(list) {
        for (var j, x, i = list.length; i; j = Math.floor(Math.random() * i), x = list[--i], list[i] = list[j], list[j] = x);
        return list;
    },
};
