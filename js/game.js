

//Game.prototype.buy = function(entity, increment){
//   if(this.item.count >= entity.cost) {
//       this.item.count -= entity.cost;
//       this.entities.push(entity);
//       entity.cost = Math.ceil(entity.cost * increment);
//       this.updateScreen();
//   }
////

//Game.prototype.updateScreen = function(){
//    this.item.show();
//    noviceHobo.show();
//    advancedHobo.show();
//    expertHobo.show();
//    $('#cois-ps').text(this.item.persecond);
//}

//Game.prototype.updateGame = function(){
//    this.item.persecond = 0;
//    for(var i = 0; i// < this.entities.length; i++){
//        this.item.persecond += this.entities[i].boost;
//    }
//}

//Game.prototype.displayUpgrades = function(){
//    $('#test').html("");
//    var upgradeText;
//    if (noviceHoboCount >= 6 || novUpgradeAvailable) {
//        novUpgradeAvailable = true;
//        upgradeText = $('<div/>', {
//            class: "btn btn-primary btn-sm",
//            id: "novice-training",
//            text: 'Novice Training',
//            click: function () {
//                noviceTraining()
//            },
//            disabled: novDisabled
//        });
//        $('#test').append(upgradeText);
//        $('#test').append('Trade in 5 Novices for 1 Journeyman at no additional cost<br>');
//    }
//}//

//Game.prototype.updateProgress = function(){
//    progress++;
//    if (progress > 100) {
//        progress = 0;
//        season++;
//        this.calcCoins();
//        if (season = 0) {
//            $('#season').text("Widgeting for Dummy Books Arrived, Double Novice Gains!");
//        }
//        else if (season = 1) {
//            $('#season').text("Widgeter union has extra work, Double Journeyman Gains!");
//        }
//        else if (season = 2) {
//            $('#season').text("A spree of Widgeters retired, Double Expert Gains!");
//        }
//        else if (season = 3) {
//            $('#season').text("Grandmaster Widgeter visited the site, Double Master Gains!");
//        }
//        else {
//            season = 0;
//            $('#season').text("Widgeting for Dummy Books Arrived, Double Novice Gains!");
//        }
//    }
//    $('#pbar').css('width', progress + '%').attr('aria-valuenow', progress);
//    $('#pbar').text(progress + '%')
//}
