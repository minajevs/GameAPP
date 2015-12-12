function rosebud(){ //cheatz
    this.resources.coins.count = 9999999;
    this.resources.wood.count = 9999999;
    this.resources.stone.count = 9999999;
    this.resources.iron.count = 9999999;
    this.resources.food.count = 9999999;
}

var Game = {
    version: '0.1',
    secondsSpent: 0, //total time spent in game
    autoSave: 10,
    magic: 1.15,    //constant incement value
    timeToResearch: 0,
    researching: null,

    resources: resources,
    entities: entities,
    structures: structures,
    science: science,



    showSeconds: function() { //format seconds to HH:MM:SS and show it
        var hours   = Math.floor(this.secondsSpent / 3600);
        var minutes = Math.floor((this.secondsSpent - (hours * 3600)) / 60);
        var seconds = Math.floor(this.secondsSpent - (hours * 3600) - (minutes * 60));

        var result = (hours < 10 ? "0" + hours : hours);
        result += ":" + (minutes < 10 ? "0" + minutes : minutes);
        result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
        $('#timespent').text(result);
    },

    updateScreen: function(){ //update UI
        resources.show();
        entities.show();
        structures.show();
        science.show();
        this.showSeconds();
    },

    updateGame:  function(){ //update gamevalues
        this.resources.coins.perSecond = this.entities.totalBoost().coins;
        this.resources.wood.perSecond = this.entities.totalBoost().wood;
        this.resources.stone.perSecond = this.entities.totalBoost().stone;
        this.resources.iron.perSecond = this.entities.totalBoost().iron;
        this.resources.food.perSecond = this.entities.totalBoost().food;
    },

    tick: function(){ //occures once a second
        for(var res in this.structures.storage()){ //Add persecond to resource count
            this.resources[res].count += this.resources[res].perSecond;
            if((this.resources[res].count) >= this.structures.storage()[res]){ //if storage overflow
                this.resources[res].count = this.structures.storage()[res];
            }
        }
        if(this.resources.food.count < 0){ //if no food
            for(var ent in this.entities){  //from all the people
                if(this.entities[ent].hasOwnProperty('id'))
                    this.entities[ent].count--; //kill first
                    this.resources.food.count = 0; //set the food to 0
                    return; //and go away
            }
        }
        if(this.researching != null){
            this.researching.time--;
            if(this.researching.time < 0){
                this.researching.researched = true;
                this.researching = null;
                this.updateScreen();
            }
        }



        this.secondsSpent++; //second passed
    },

    canHire: function(entity){ //check if can hire worker (will probably be merged with canBuild)
        return (this.resources.coins.count >= entity.price.coins &&
                this.resources.wood.count >= entity.price.wood &&
                this.resources.stone.count >= entity.price.stone &&
                this.resources.iron.count >= entity.price.iron &&
                this.resources.food.count >= entity.price.food &&
                this.structures.capacity() > this.entities.population() &&
                (entity.hasOwnProperty('requires') ? entity.requires() : true));
    },

    hire: function(entity){ //hire worker
        if(this.canHire(entity)){   //if you can hire worker
            this.resources.pay(entity.price); //pay for it
            entity.count++; //add worker
            for(var p in entity.price) //increment price
                entity.price[p] = Math.floor(entity.price[p]*this.magic);
            this.updateGame();
            this.updateScreen();
        }
    },

    canBuild: function(structure){ //check if can build new structure (will probably be merged with canHire)
        return (this.resources.coins.count >= structure.price.coins &&
                this.resources.wood.count >= structure.price.wood &&
                this.resources.stone.count >= structure.price.stone &&
                this.resources.iron.count >= structure.price.iron &&
                this.resources.food.count >= structure.price.food);
    },

    build: function(structure){ //practically, can as hire. should be merged
        if(this.canBuild(structure)){
            this.resources.pay(structure.price);
            structure.count++;
            for(var p in structure.price)
                structure.price[p] = Math.floor(structure.price[p]*this.magic);
            this.updateGame();
            this.updateScreen();
        }
    },
    canResearch: function(science){
        return(this.researching == null &&
        (science.hasOwnProperty('requires') ? science.requires() : true));
    },
    research: function(science){
        if(this.canResearch(science)){
            this.researching = science;
        }
    }
}

loadProgress();//after game initialised, try to load the progress
Game.updateScreen(); //and update the screen in case values changed

$('#collect-coin').on('click', function () { //collect resource handles
    collectResource(Game.resources.coins);
});
$('#collect-wood').on('click', function () {
    collectResource(Game.resources.wood);
});
$('#collect-stone').on('click', function () {
    collectResource(Game.resources.stone);
});
$('#collect-iron').on('click', function () {
    collectResource(Game.resources.iron);
});
$('#collect-food').on('click', function () {
    collectResource(Game.resources.food);
});

// The Main Loop!
// Occurs every 1000ms (1sec), calls Game.tick(), .updateGame() and .updateScreen()
//I see no practical reason changing it
var untilAutosave = Game.autoSave;
window.setInterval(function () {
    Game.updateGame();
    Game.tick();

    $('#auto-save-timer').text(untilAutosave);
    untilAutosave--;
    if(untilAutosave < 0){
        saveProgress();
        untilAutosave = Game.autoSave;
        $('#auto-save-row').css('background-color', '#69FF6E').animate({backgroundColor: "#FFFFFF"}, 500);
    }
    Game.updateScreen();
}, 1000);
