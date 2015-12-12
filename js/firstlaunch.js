function entityHandler(ent){ //callback
    return function (){
        Game.hire(ent);
        Game.updateScreen();
    }
}
function structureHandler(struc){ //callback
    return function (){
        Game.build(struc);
        Game.updateScreen();
    }
}
function scienceHandler(sci){ //callback
    return function (){
        Game.research(sci);
        Game.updateScreen();
    }
}function resourceHandler(res){ //callback
    return function (){
        collectResource(res);
        Game.updateScreen();
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

    for(var s in Game.science){      //draw rows for alll structures
        var sci = Game.science[s];
        if(sci.hasOwnProperty('id')){
            $('#science-table tr:last').after(
                '<tr id="' + sci.id + '-row">' +
                '   <td class="col-md-1"><div class="btn btn-primary btn-sm" id="' + sci.id + '-research"><span class="glyphicon glyphicon-book"> Research</span></div></td>'+
                '   <td class="col-md-3"><span id="' + sci.id + '-name"></span></td>'+
                '   <td class="col-md-6"><span id="' + sci.id + '-desc"></span></td>'+
                '   <td class="col-md-1"><span id="' + sci.id + '-time"></span></td>'+
                '</tr>'
            );
            $('#' + sci.id + '-research').on('click', scienceHandler(sci));
        }
    }
    for(var r in Game.resources){      //draw rows for alll res
        var r = Game.resources[r];
        if(r.hasOwnProperty('id')){
            $('#resources-table tr:last').after(
                '<tr id="' + r.id + '-row">' +
                '   <td class="col-md-3"><div class="btn btn-success btn-sm" id="collect-' + r.id + '"><span class="glyphicon glyphicon-book"> '+ r.name +'</span></div></td>'+
                '   <td class="col-md-4"><span id="' + r.id + '-count">0</span> / <span id="'+ r.id +'-storage">0</span></td>'+
                '   <td class="col-md-3"><span id="' + r.id + '-ps"></span></td>'+
                '</tr>'
            );
            $('#collect-' + r.id).on('click', resourceHandler(r));
        }
    }
}

firstLaunch();
Game.updateScreen();
