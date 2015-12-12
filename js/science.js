function showScience(science){
    $('#' + science.id + '-research').attr('disabled', (!Game.canResearch(science) || science.researched));
    $('#' + science.id + '-name').text(science.name);
    $('#' + science.id + '-desc').text(science.desc);
    $('#' + science.id + '-time').text(science.time);
    if(science.hasOwnProperty('requires')) {
        science.requires() ? $('#' + science.id + '-row').show() : $('#' + science.id + '-row').hide();
    }
    if(science.researched){
        $('#' + science.id + '-research').text('Researched!');
        $('#' + science.id + '-time').hide();
    }
}

var Stoneworks = {
    name: 'Stone works',
    id: 'stoneworks',
    desc: 'People get smarter and learn how to make stone tool. Opens new workers.',
    time: 1,
    researched: false,
    requires: function () {
        return true;
    }
};
var Fire = {
    name: 'Fire',
    id: 'fire',
    desc: 'People get smarter and learn how to get fire.',
    time: 1,
    researched: false,
    requires: function () {
        return Game.science.stoneworks.researched;
    }
};
var Woodworks = {
    name: 'Wood works',
    id: 'woodworks',
    desc: 'People get smarter and learn how to make wooden tools and structures.',
    time: 1,
    researched: false,
    requires: function () {
        return Game.science.stoneworks.researched;
    }
};
var Mining = {
    name: 'Mining',
    id: 'mining',
    desc: 'People get smarter and learn how to mine ore.',
    time: 1,
    researched: false,
    requires: function () {
        return Game.science.woodworks.researched;
    }
};
var Smelting = {
    name: 'Smelting',
    id: 'smelting',
    desc: 'Miners get smarter and learn how to smelt ore.',
    time: 1,
    researched: false,
    requires: function () {
        return (Game.science.fire.researched &&
                Game.science.mining.researched);
    }
};




var science = {
    stoneworks: Stoneworks,
    fire: Fire,
    woodworks: Woodworks,
    mining: Mining,
    smelting: Smelting,

    canResearch: function(){
        if(currentResearch.hasOwnProperty('id') && currentResearch['time'] <= 0){
            return false;
        } else {
            return true;
        }
    },
    show: function () {
        for (var s in this) {;
            if (this[s] != null && this[s].hasOwnProperty('id'))
                showScience(this[s]);
        }
    },

}
