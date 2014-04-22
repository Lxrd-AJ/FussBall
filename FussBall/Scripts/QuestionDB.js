/**
 * Created by AJ on 16/04/2014.
 */
var QuestionDB = function(){
    this.nameToImageDictionary = [
        { 'English' : 'Resources/English.png' }, { 'Arabic' : 'Resources/Arabic.png'},
        { 'Bengali': 'Resources/Bengali.png' }, { 'French' : 'Resources/French.png' },
        { 'German' : 'Resources/German.png' }, { 'Hindi' : 'Resources/Hindi.png' },
        { 'Italian' : 'Resources/Italian.png' }, { 'Mandarin': 'Resources/Mandarin.png' },
        { 'Spanish' : 'Resources/Spanish.png' }, { 'Urdu': 'Resources/Urdu.png' }
    ];
    this.nameToArabicDictionary = {
        'English': 'انجليزي',  'Arabic' : 'عربي' ,  'Bengali':'بنغالي', 'French':'فرنسي',
        'German':'ألماني', 'Hindi':'هندي', 'Italian':'إيطالي', 'Mandarin':'صيني',
        'Spanish':'أسباني', 'Urdu':'أوردو'
    };

    this.firstQuestionObject = null;
    this.secondQuestionObject = null;
};

QuestionDB.prototype = {
    constructor: QuestionDB,
    generateRandomObject: function(){
        var randObj = {
            'country' : null,
            'imageURL' : null,
            'text' : null
        };

        var obj = this.nameToImageDictionary[ Math.floor( Math.random() * (this.nameToImageDictionary.length
        - 0 )) + 1 ];
        for( var k in obj ){
            randObj.country = k;
            randObj.imageURL = obj[k];
        }
        //console.log(this.nameToArabicDictionary[5]['Hindi']);
        randObj.text = this.nameToArabicDictionary[ randObj.country ];

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
    }
};
