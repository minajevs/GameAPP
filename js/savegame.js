var saveProgress = function() {
    window.localStorage.setItem('savegame', JSON.stringify(Game)); //write Game obj to cookies
}

var loadProgress = function() {
    var loaded = JSON.parse(window.localStorage.getItem('savegame')); //get Game obj from cookies
    if(loaded != null){
        $.extend(true,Game,loaded); //Deep-merge savegame into Game objs
    }
}

var resetProgress = function(){    //Deletes cookie
    window.localStorage.removeItem('savegame');
    location.reload();
}

$('#save-game').on('click', function () { //Hook button to handle Savegame
    saveProgress();
});
