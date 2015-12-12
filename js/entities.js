//Entities are objects what provide resource boost.
//
//Common functions for every entity:
function showEntity(entity) { //Updates entity UI
    $('#' + entity.id + '-hire').attr('disabled', !Game.canHire(entity));
    $('#' + entity.id + '-name').text(entity.name);
    $('#' + entity.id + '-price').text(priceToString(entity.price));
    $('#' + entity.id + '-count').text(entity.count);
    entity.requires() ? $('#' + entity.id + '-row').show() : $('#' + entity.id + '-row').hide();

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
var Beggar = {
    name: 'Beggar',            //Used to display object
    id: 'beggar',              //jQuery selectors are wired on this id.
    boost: {                   //Boost is persecond auto resource gain
        coins: 1,
        wood: 0,
        stone: 0,
        iron: 0,
        food: -0.5,
    },
    price: {                   //Should have been called PRICE, but whatever
        coins: 10,              // ^^ FIXED
        wood: 0,
        stone: 0,
        iron: 0,
        food: 10,
    },
    count: 0,
    requires: function() {      //returns true if is available. define advanced logic (like building or research requrement)
        return true;
    }
};

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
        stone: 0,
        iron: 0,
        food: 10,
    },
    count: 0,
    requires: function() {
        return true;
    }
};

var Stonepicker = {
    name: 'Stonepicker',
    id: 'stonepicker',
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
        stone: 0,
        iron: 0,
        food: 10,
    },
    count: 0,
    requires: function() {
        return true;
    }
};

var Fieldworker = {
    name: 'Fieldworker',
    id: 'fieldworker',
    boost: {
        coins: 0,
        wood: 0,
        stone: 0,
        iron: 0,
        food: 2,
    },
    price: {
        coins: 10,
        wood: 0,
        stone: 0,
        iron: 0,
        food: 20,
    },
    count: 0,
    requires: function() {
        return true;
    }
};

var Monk = {
    name: 'Monk',
    id: 'monk',
    boost: {
        coins: 100,
        wood: 100,
        stone: 100,
        iron: 100,
        food: 100,
    },
    price: {
        coins: 1000,
        wood: 100,
        stone: 50,
        iron: 100,
        food: 1000,
    },
    count: 0,
    requires: function() {
        return Game.structures.church.count != 0;
    }
};

var entities = {        //Keeps track of all available entities
    beggar: Beggar,
    lumberjack: Lumberjack,
    stonepicker: Stonepicker,
    monk: Monk,
    fieldworker: Fieldworker,

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




