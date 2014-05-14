var Sounds = function(){
    this.cheeringSound = new Howl({
        urls: ['Resources/stadium crowd applause.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5
    });
    this.goalSound = new Howl({
        urls: ['Resources/goal.mp3'],
        volume: 0.8
    });
    this.sprites = new Howl({
        urls: ['Resources/football.mp3'],
        sprites: {
            cheer: [0,1000] ,
            mump: [1000,5000]
        }
    });
};

Sounds.prototype = {
    constructor: Sounds,
    stopCrowdCheeringSound: function(){
        this.cheeringSound.stop();
    },
    playGoalScoredSound : function(){
        this.stopCrowdCheeringSound();
        this.goalSound.play();
        this.cheeringSound.play();
    },
    playCheerSprite: function(){
        this.sprites.play('cheer');
    }
};