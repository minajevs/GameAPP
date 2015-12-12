function entityHandler(ent){ //callback
    return function (){
        Game.hire(ent);
    }
}
function structureHandler(struc){ //callback
    return function (){
        Game.build(struc);
    }
}

function firstLaunch(){
    for(var e in Game.entities){    //draw rows for alll entities
        var ent = Game.entities[e];
        if(typeof ent == 'object'){
            $('#entity-table tr:last').after( //adds row in the end of the table
                '<tr id="' + ent.id + '-row">' +
                '   <td class="col-md-1"><div class="btn btn-primary btn-sm" id="' + ent.id + '-hire"><span class="glyphicon glyphicon-user"> Hire</span></div></td>'+
                '   <td class="col-md-3"><span id="' + ent.id + '-name"></span></td>'+
                '   <td class="col-md-6"><span id="' + ent.id + '-price"></span></td>'+
                '   <td class="col-md-1"><span id="' + ent.id + '-count"></span></td>'+
                '</tr>'
            );
            $('#' + ent.id + '-hire').on('click', entityHandler(ent));
        }
    }

    for(var s in Game.structures){      //draw rows for alll structures
        var struc = Game.structures[s];
        if(struc.hasOwnProperty('id')){
            $('#structures-table tr:last').after(
                '<tr id="' + struc.id + '-row">' +
                '   <td class="col-md-1"><div class="btn btn-primary btn-sm" id="' + struc.id + '-build"><span class="glyphicon glyphicon-home"> Build</span></div></td>'+
                '   <td class="col-md-3"><span id="' + struc.id + '-name"></span></td>'+
                '   <td class="col-md-6"><span id="' + struc.id + '-price"></span></td>'+
                '   <td class="col-md-1"><span id="' + struc.id + '-count"></span></td>'+
                '</tr>'
            );
            $('#' + struc.id + '-build').on('click', structureHandler(struc));
        }
    }
}

firstLaunch();
Game.updateScreen();
