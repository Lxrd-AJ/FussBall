/**
 * Created by AJ on 16/04/2014.
 */
var QuestionDB = function(){
    
    this.supportLanguage = 14; // english
    this.targetLanguage = 3; // french
    this.unit = 1;
    this.section = 1;
    this.support = []; //starts from 1 to 11 NOT 0 to 10
    this.target = []; //starts from 1 to 11 NOT 0 to 10
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
        randObj.targetAnswer = this.target[ key+1 ];
        randObj.options.push( this.target[ key+1 ] ); //let one correct answer be in
        
        for( var i = 0; i < 3; i++ ){
            var randMan = this.generateRandomNumberWithException( key );
            randObj.options.push( this.target[ randMan + 1 ] );
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
            img.src = 'http://images.languagenut.com/illustrations/transparent_bg_150/trans.img_u' + (this.unit>9?'':'0') + this.unit + '_s' + this.section + '_' + (k>=9?'':'0') + (k+1) + '0001.png';
            this.images.push(img);
        } 
    },
    getTextFromServer: function(){
        var that = this;
         //$.get("http://www.languagenut.com/en/webservice/sections?" + $.param({
      $.get("/FussBall/Scripts/Sections?" + $.param({
      language_uid: this.supportLanguage.toString() + ',' + this.targetLanguage.toString(), 
      from: (this.unit-1 * 6) + this.section, 
      to: (that.unit-1 * 6) + that.section }),
      function(response)
      {
           var data = $.parseJSON(response);
           for (var i=0; i<data.length; i++) {
            switch (data[i].language) {

             case that.supportLanguage.toString():
                  for (var j=0; j<data[i].sections[0].vocab.length; j++) {
                       that.support[ data[i].sections[0].vocab[j].termId ] =
                        data[i].sections[0].vocab[j].title;
                  }
                  break;
             case that.targetLanguage.toString() :
                  for (var j=0; j<data[i].sections[0].vocab.length; j++) {
                   that.target[ data[i].sections[0].vocab[j].termId ] =
                    data[i].sections[0].vocab[j].title;
                  }
                  break;

            }//end switch
         }//end for

    });//end request
        
    },
    generateRandomNumber: function( max ){
        if( !max )
            max = 10;
        
        var randKey = Math.floor( Math.random() * max );
        return randKey;
    },
    generateRandomNumberWithException: function( exceptNumber , max ){
        var randNum = null;
        if( !max )
            max = 10;
        
        do{
            randNum = Math.floor( Math.random() * max );        
        }while( exceptNumber === randNum )    
        
        return randNum;
    },
    shuffle: function(list) {
        for (var j, x, i = list.length; i; j = Math.floor(Math.random() * i), x = list[--               i], list[i] = list[j], list[j] = x);
        return list;
    },
};
