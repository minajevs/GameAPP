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

var Fieldworks = {
    name: 'Fieldworks',
    id: 'fieldworks',
    desc: 'People get smarter and learn how to use basic tools to collect the food. Opens fieldworkers.',
    time: 3,
    researched: false,
};

var Forestry = {
    name: 'Forestry',
    id: 'forestry',
    desc: 'Citizens invents axes. Opens Woodcutters',
    time: 3,
    researched: false,
    requires: function () {
        return Game.science.fieldworks.researched;
    }
};
var Mining = {
    name: 'Mining',
    id: 'mining',
    desc: 'Citizens invents pickaxes. Opens Miners',
    time: 3,
    researched: false,
    requires: function () {
        return Game.science.fieldworks.researched;
    }
};
var Economics = {
    name: 'Economics',
    id: 'economics',
    desc: 'People start to understand how do money work. Opens Beggars.',
    time: 3,
    researched: false,
    requires: function () {
        return Game.science.fieldworks.researched;
    }
};



var science = {
    fieldworks: Fieldworks,
    forestry: Forestry,
    mining: Mining,
    economics: Economics,

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
