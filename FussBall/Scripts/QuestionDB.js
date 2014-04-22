/**
 * Created by AJ on 16/04/2014.
 */
var QuestionDB = function(){
    this.nameToImageDictionary = [
        { 'English' : 'Resources/English.png' }, { 'Arabic' : 'Resources/Arabic.png'},
        { 'Bengali': 'Resources/Bengali.png' }, { 'French' : 'Resources/French.png' },
        { 'German' : 'Resources/German.png' }, { 'Hindi' : 'Resources/German.png' },
        { 'Italian' : 'Resources/Italian.png' }, { 'Mandarin': 'Resources/Mandarin.png' },
        { 'Spanish' : 'Resources/Spanish.png' }, { 'Urdu': 'Resources/Urdu.png' }
    ];
    this.nameToArabicDictionary = [
        { 'English': 'انجليزي'}, { 'Arabic' : 'عربي' }, { 'Bengali':'بنغالي'}, {'French':'فرنسي'},
        {'German':'ألماني'}, {'Hindi':'هندي'}, {'Italian':'إيطالي'}, {'Mandarin':'صيني'},
        {'Spanish':'أسباني'}, {'Urdu':'أوردو'}
    ];

    this.rightQuestionObject = null;
    this.wrongQuestionObject = null;
};

QuestionDB.prototype = {
    constructor: QuestionDB,
    generateRandomObject: function(){
        var randObj = {
            'country' : null,
            'image' : null,
            'arabic' : null
        };

        var obj = this.nameToImageDictionary[ Math.floor( Math.random() * (this.nameToImageDictionary.length
        - 0 )) + 1 ];
        for( var k in obj ){
            randObj.country = k;
            randObj.imageURL = obj[k];
        }
        randObj.arabic = this.nameToArabicDictionary[ randObj.country ];

        return randObj;
    },
    prepareQuestionObject: function(){
        this.rightQuestionObject = this.generateRandomObject();
        var temp = this.generateRandomObject();
        while( temp == this.rightQuestionObject ) {
            temp = this.generateRandomObject();
        }
        this.wrongQuestionObject = temp;
    },
    getQuestionObject: function(){
        return {
            'right': this.rightQuestionObject,
            'wrong': this.wrongQuestionObject
        }
    }
};
