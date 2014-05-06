var Sounds = function(){
    this.cheeringSound = new Howl({
        urls: ['Resources/stadium crowd applause.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5
    });
    this.goalSound = new Howl({
        urls: ['Resources/kids cheering.mp3'],
        autoplay: true
    });
};

Sounds.prototype = {
    constructor: Sounds,
    stopCrowdCheeringSound: function(){
        this.cheeringSound.stop();
    },
    playGoalScoredSound : function(){
        //this.stopCrowdCheeringSound();
        this.goalSound.play();
    }
};