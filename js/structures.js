function showStructure(structure){
    $('#' + structure.id + '-build').attr('disabled', !Game.canBuild(structure));
    $('#' + structure.id + '-name').text(structure.name);
    $('#' + structure.id + '-price').text(priceToString(structure.price));
    $('#' + structure.id + '-count').text(structure.count);
    if(structure.hasOwnProperty('requires')) {
        structure.requires() ? $('#' + structure.id + '-row').show() : $('#' + structure.id + '-row').hide();
    }
}
var Tent = {
    name: 'Tent',
    id: 'tent',
    capacity: 2,
    price: {
        coins: 20,
        wood: 20,
        stone: 10,
        iron: 0,
        food: 0,
    },
    count: 0,
};

var Stockpile = {
    name: 'Stockpile',
    id: 'stockpile',
    price: {
        coins: 50,
        wood: 50,
        stone: 50,
        iron: 50,
        food: 50,
    },
    storage: {
        coins: 100,
        wood: 100,
        stone: 100,
        iron: 100,
        food: 100,
    },
    count: 0,
};

var House = {
    name: 'House',
    id: 'house',
    capacity: 5,
    price: {
        coins: 50,
        wood: 50,
        stone: 20,
        iron: 0,
        food: 0,
    },
    storage: {
        coins: 50,
        wood: 50,
        stone: 50,
        iron: 50,
        food: 50,
    },
    count: 0,
    requires: function(){
        return Game.science.fire.researched;
    }
};

var Forge = {
    name: 'Forge',
    id: 'forge',
    price: {
        coins: 50,
        wood: 50,
        stone: 100,
        iron: 50,
        food: 0,
    },
    count: 0,
    requires: function(){
        return (Game.science.smelting.researched &&
                Game.structures.forge.count == 0);
    }
};



var structures = {
    tent: Tent,
    stockpile: Stockpile,
    house: House,
    forge: Forge,

    show: function(){
        for(var s in this){
            if(typeof this[s] == 'object')
                showStructure(this[s]);
        }
        for(var stor in this.storage()){
            $('#' + stor + '-storage').text(this.storage()[stor]);
        }
    },
    capacity: function(){
        var capacity = 5;  //STARTING CAPACITY
        for(var s in this){
            if(this[s].hasOwnProperty('capacity'))
                capacity += this[s].capacity*this[s].count;
        }
        return capacity;
    },
    storage: function(){
        var storage = {
            coins: 50,
            wood: 50,
            stone: 50,
            iron: 50,
            food: 50,
        };
        for(var struc in this){
            if(this[struc].hasOwnProperty('storage'))
                for(var stor in this[struc].storage)
                    storage[stor] += this[struc].storage[stor]*this[struc].count;
        }
            return storage;
    }
}
