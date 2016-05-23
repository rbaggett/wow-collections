(function () {

  'use strict';

  var constants = {
    bnetKey: 'eedv8cxqvh58re7gmfwhy5bhqbkcgwfh',
    urls: {
      battleIcons: 'https://wow.zamimg.com/images/wow/icons/medium/',
      wowHeadNpc: 'http://www.wowhead.com/npc=',
      tcgLoot: 'http://www.wowtcgloot.com/'
    }
  };

  angular
    .module('wcui')
    .constant('constants', constants);

})();
