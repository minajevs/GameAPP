//Entities are objects what provide resource boost.
//
//Common functions for every entity:
function showEntity(entity) { //Updates entity UI
    $('#' + entity.id + '-hire').attr('disabled', !Game.canHire(entity));
    $('#' + entity.id + '-name').text(entity.name);
    $('#' + entity.id + '-price').text(priceToString(entity.price));
    $('#' + entity.id + '-count').text(entity.count);
    if(entity.hasOwnProperty('requires')) {
        entity.requires() ? $('#' + entity.id + '-row').show() : $('#' + entity.id + '-row').hide();
    }
    if(entity.id == 'miner' && Game.science.mining.researched){
        entity.upgrade();
    }
}

function priceToString(price) { //Formats priceobject to string
    var c = (price.coins > 0) ? price.coins + ' coins ' : '';
    var w = (price.wood > 0) ? price.wood + ' wood ' : '';
    var s = (price.stone > 0) ? price.stone + ' stone ' : '';
    var i = (price.iron > 0) ? price.iron + ' iron ' : '';
    var f = (price.food > 0) ? price.food + ' food ' : '';
    return c + w + s + i + f;
}

function boostToString(boost) { //Formats boostobject to string
    var c = (boost.coins > 0) ? boost.coins + ' coins ' : '';
    var w = (boost.wood > 0) ? boost.wood + ' wood ' : '';
    var s = (boost.stone > 0) ? boost.stone + ' stone ' : '';
    var i = (boost.iron > 0) ? boost.iron + ' iron ' : '';
    var i = (boost.food > 0) ? boost.food + ' food ' : '';
    return c + w + s + i + ' /second';
}


//Defining entity objects:
var Lumberjack = {
    name: 'Lumberjack',
    id: 'lumberjack',
    boost: {
        coins: 0,
        wood: 2,
        stone: 0,
        iron: 0,
        food: -0.5,
    },
    price: {
        coins: 10,
        wood: 0,
        stone: 5,
        iron: 0,
        food: 10,
    },
    count: 0,
    requires: function () {
        return Game.science.stoneworks.researched;
    }
};

var Miner = {
    name: 'Miner',
    id: 'miner',
    boost: {
        coins: 0,
        wood: 0,
        stone: 0.5,
        iron: 0,
        food: -0.5,
    },
    price: {
        coins: 10,
        wood: 0,
        stone: 5,
        iron: 0,
        food: 10,
    },
    count: 0,
    requires: function () {
        return Game.science.stoneworks.researched;
    },
    upgrade: function () {
        this.boost.iron = 0.5;
    }
};
var Hunter = {
    name: 'Hunter',
    id: 'hunter',
    boost: {
        coins: 0,
        wood: 0,
        stone: 0.5,
        iron: 0,
        food: 2,
    },
    price: {
        coins: 10,
        wood: 0,
        stone: 5,
        iron: 0,
        food: 10,
    },
    count: 0,
    requires: function () {
        return Game.science.stoneworks.researched;
    }
};

var Labourer = {
    name: 'Labourer',
    id: 'labourer',
    boost: {
        coins: 1,
        wood: 0,
        stone: 0,
        iron: 0,
        food: 1,
    },
    price: {
        coins: 10,
        wood: 0,
        stone: 0,
        iron: 0,
        food: 20,
    },
    count: 0,
    requires: function () {
        return true;
    }
};
var Blacksmith = {
    name: 'Blacksmith',
    id: 'blacksmith',
    boost: {
        coins: 0,
        wood: 0,
        stone: 0,
        iron: 0,
        food: -1,
    },
    price: {
        coins: 10,
        wood: 0,
        stone: 0,
        iron: 0,
        food: 20,
    },
    count: 0,
    requires: function () {
        return (Game.structures.forge.count != 0 &&
                this.count == 0);
    }
};


var entities = {        //Keeps track of all available entities
    labourer: Labourer,
    hunter: Hunter,
    miner: Miner,
    lumberjack: Lumberjack,
    blacksmith: Blacksmith,

    population: function() { //returns total count of entities
        var population = 0;
        for(var ent in this){
            if(typeof this[ent] == 'object') {
                population += this[ent].count;
            }
        }
        return population;
    },

    show: function(){ //Updates UI
        for(var ent in this){
            if(typeof this[ent] == 'object') {
                showEntity(this[ent]);
            }
        }
        $('#population').text(this.population() + ' / ' + Game.structures.capacity());
    },
    totalBoost: function(){ //Counts total boost for each resource, returns new resources object
        var totalCoins = 0,
            totalWood =  0,
            totalStone = 0,
            totalIron =  0,
            totalFood =  0;
        for(var ent in this){
            if(typeof this[ent] == 'object'){
                totalCoins += this[ent].boost.coins*this[ent].count;
                totalWood  += this[ent].boost.wood*this[ent].count;
                totalStone += this[ent].boost.stone*this[ent].count;
                totalIron  += this[ent].boost.iron*this[ent].count;
                totalFood  += this[ent].boost.food*this[ent].count;
            }
        }
        return {
            coins: totalCoins,
            wood: totalWood,
            stone: totalStone,
            iron: totalIron,
            food: totalFood
        }
    }
};




