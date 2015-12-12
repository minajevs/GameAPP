//Resources are currency what player can spend on entities and upgrades
//
//Common functions for every resource:
function collectResource(res){
    if((Game.structures.storage()[res.name]-res.count) >= res.perClick){ //Collect resource only if storage is available
        res.count += res.perClick;
        Game.updateScreen();
    }
}
function showResource(res){ //Updates resource UI. Each resource have 2 DOMs - count and persecond
    $('#' + res.name + '-count').text(res.count); //Resource count may float, carefully!
    $('#' + res.name + '-ps').text(res.perSecond);
}

//Defining resources:
var coins = {
    name: 'coins',  //for jQuery selector
    count: 0,
    perSecond: 0,
    perClick: 1,
}
var wood = {
    name: 'wood',
    count: 0,
    perSecond: 0,
    perClick: 1,
}
var stone = {
    name: 'stone',
    count: 0,
    perSecond: 0,
    perClick: 1,
}
var iron = {
    name: 'iron',
    count: 0,
    perSecond: 0,
    perClick: 1,
}
var food = {
    name: 'food',
    count: 0,
    perSecond: 0,
    perClick: 1,
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


