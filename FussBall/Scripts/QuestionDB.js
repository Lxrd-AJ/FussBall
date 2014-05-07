/**
 * Created by AJ on 16/04/2014.
 */
var QuestionDB = function(){
    
    this.images = [];
    this.supportLanguage = 14; // english
    this.targetLanguage = 3; // french
    this.unit = 1;
    this.section = 1;
    this.support = [];
    this.target = [];
      
    this.firstQuestionObject = null;
    this.secondQuestionObject = null;
    
    this.loadImages();
    this.getTextFromServer();
};

QuestionDB.prototype = {
    constructor: QuestionDB,
    generateRandomObject: function(){
        var randObj = {
            'supportText' : null,
            'LNImage' : null,
            'targetText' : null
        };   
        
        //random support id between 0 and 9
        var randKey = Math.floor( Math.random() * 10 );
        
        randObj.supportText = this.support[ randKey + 1 ];
        randObj.LNImage = this.images[ randKey ];
        randObj.targetText = this.target[ randKey + 1 ];
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
        if( obj1.supportText === obj2.supportText )
            return true;
        else
            return false;
    },
    evaluateAnswer: function( answerBool ){
        var decision = null;
        if( this.firstQuestionObject.supportText === this.secondQuestionObject.supportText )
            decision = true;
        else
            decision = false;
        
        if( answerBool === decision )
            return true;
        else 
            return false;
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
        
    }
};
