//Resources are currency what player can spend on entities and upgrades
//
//Common functions for every resource:
function collectResource(res){
    if((Game.structures.storage()[res.id]-res.count) >= res.perClick){ //Collect resource only if storage is available
        res.count += res.perClick;
        Game.updateScreen();
    }
}
function showResource(res){ //Updates resource UI. Each resource have 2 DOMs - count and persecond
    $('#' + res.id + '-count').text(res.count); //Resource count may float, carefully!
    $('#' + res.id + '-ps').text(res.perSecond);
    if(res.hasOwnProperty('requires')) {
        res.requires() ? $('#' + res.id + '-row').show() : $('#' + res.id + '-row').hide();
    }
}

//Defining resources:
var coins = {
    id: 'coins',
    name: 'Coins',  //for jQuery selector
    ico: '',
    count: 0,
    perSecond: 0,
    perClick: 1,
}
var wood = {
    id: 'wood',
    name: 'Wood',
    ico: '',
    count: 0,
    perSecond: 0,
    perClick: 1,
}
var stone = {
    id: 'stone',
    name: 'Stone',
    ico: '',
    count: 0,
    perSecond: 0,
    perClick: 1,
}
var food = {
    id: 'food',
    name: 'Food',
    ico: '',
    count: 0,
    perSecond: 0,
    perClick: 1,
}
var iron = {
    id: 'iron',
    name: 'Iron',
    ico: '',
    count: 0,
    perSecond: 0,
    perClick: 1,
    requires: function () {
        return true;
    },
}

var resources = {   //resources object
    coins: coins,
    wood: wood,
    stone: stone,
    iron: iron,
    food: food,

    pay: function(price) {
        for(var r in this){ //for attribute in resources object
            if(typeof this[r] == 'object')  //if attribute is an object (means that attribute is resource)
                this[r].count -= price[r];  //decrease count of said resource
        }
    },
    show: function(){
        for(var r in this){
            if(typeof this[r] == 'object')
                showResource(this[r]);
        }
    }
}


