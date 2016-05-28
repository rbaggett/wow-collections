(function () {

  'use strict';

  var constants = {
    bnetKey: 'eedv8cxqvh58re7gmfwhy5bhqbkcgwfh',
    urls: {
      blizzardIcon36: 'http://media.blizzard.com/wow/icons/36/',
      tcgLoot: 'http://www.wowtcgloot.com/',
      wowHeadNpc: 'http://www.wowhead.com/npc=',
      battleNetShop: 'https://us.battle.net/shop/en/product/world-of-warcraft-pet-'
    }
  };

  angular
    .module('wcui')
    .constant('constants', constants);

})();
