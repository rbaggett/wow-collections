(function () {

  'use strict';

  var constants = {
    bnetKey: 'eedv8cxqvh58re7gmfwhy5bhqbkcgwfh',
    urls: {
      battleIcons: 'https://wow.zamimg.com/images/wow/icons/medium/',
      tcgLoot: 'http://www.wowtcgloot.com/',
      wowHeadNpc: 'http://www.wowhead.com/npc=',
      wowPetStore: 'https://us.battle.net/shop/en/product/'      
    }
  };

  angular
    .module('wcui')
    .constant('constants', constants);

})();
