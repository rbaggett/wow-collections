(function () {

  'use strict';

  angular
    .module('wcui')
    .factory('petsFactory', petsFactory);

  function petsFactory($timeout, bnetFactory, characterFactory, masterFactory) {

    var pets = [];
    var petsText = [];
    var tcgs = {
      23234: 'banana_charm',
      59020: 'eye_of_the_legion',
      34694: 'heavy_murloc_egg',
      50468: 'landros_lil_xt',
      54438: 'murkys_little_soulstone',
      54383: 'purple_puffer',
      51122: 'smoldering_murloc_egg',
      36482: 'tuskarr_kite',
      15186: 'blue_murloc_egg',
      54730: 'grell_moss',
      17255: 'hippogryph_hatchling',
      52344: 'nightsaber_cub',
      25109: 'rocket_chicken',
      27914: 'soultrader_beacon',
      29089: 'tyraels_hilt',
      25110: 'dragon_kite',
      69208: 'gusting_grimoire',
      52343: 'landros_lichling',
      74405: 'murkalots_flail',
      54745: 'sand_scarab',
      36511: 'spectral_tiger_cub',
      11325: 'wow_vanilla_collectors_edition',
      11326: 'wow_vanilla_collectors_edition',
      11327: 'wow_vanilla_collectors_edition'
    };
    var store = {
      85283: 'brightpaw',
      74402: 'alterac-brew-pup',
      88807: 'argi',
      71488: 'blossoming-ancient',
      53623: 'cenarion-hatchling',
      68267: 'cinder-kitten',
      36979: 'lil-kt',
      51600: 'lil-ragnaros',
      40703: 'lil-xt',
      51601: 'moonkin-hatchling',
      51649: 'moonkin-hatchling',
      36911: 'pandaren-monk',
      58163: 'soul-of-the-aspects'
    };

    return {
      pets: pets,
      petsText: petsText,
      getPetBreeds: getPetBreeds,
      getPetLevels: getPetLevels,
      getSpecies: getSpecies,
      loadData: loadData
    };


    /**
     * Fix any outlier (problem) pets
     * - i.e., bad icon string
     */
    function fixProblemPets() {
      var petIndex = -1;

      /* warlock_summon_voidlord */
      petIndex = _.findIndex(pets, {creatureId: 71021});
      if (petIndex >= 0) {
        pets[petIndex].icon = 'warlock_summon_-voidlord';
      }

      /* inv_pet_goat */
      petIndex = _.findIndex(pets, {creatureId: 83817});
      if (petIndex >= 0) {
        pets[petIndex].icon = 'inv_pet_-goat';
      }

      /* trade_archaeology_draeneicandelabra */
      petIndex = _.findIndex(pets, {creatureId: 88814});
      if (petIndex >= 0) {
        pets[petIndex].icon = 'trade_archaeology_draenei-candelabra';
      }
    }


    function getPetBreeds() {
      return {
        4: {letters: 'P/P', gender: 'male'},
        14: {letters: 'P/P', gender: 'female'},
        5: {letters: 'S/S', gender: 'male'},
        15: {letters: 'S/S', gender: 'female'},
        6: {letters: 'H/H', gender: 'male'},
        16: {letters: 'H/H', gender: 'female'},
        7: {letters: 'H/P', gender: 'male'},
        17: {letters: 'H/P', gender: 'female'},
        8: {letters: 'P/S', gender: 'male'},
        18: {letters: 'P/S', gender: 'female'},
        9: {letters: 'H/S', gender: 'male'},
        19: {letters: 'H/S', gender: 'female'},
        10: {letters: 'P/B', gender: 'male'},
        20: {letters: 'P/B', gender: 'female'},
        11: {letters: 'S/B', gender: 'male'},
        21: {letters: 'S/B', gender: 'female'},
        12: {letters: 'H/B', gender: 'male'},
        22: {letters: 'H/B', gender: 'female'},
        3: {letters: 'B/B', gender: 'male'},
        13: {letters: 'B/B', gender: 'female'}
      };
    }


    function getPetLevels() {
      return [
        {value: 0, text: '0'},
        {value: 1, text: '1'},
        {value: 2, text: '2'},
        {value: 3, text: '3'},
        {value: 4, text: '4'},
        {value: 5, text: '5'},
        {value: 6, text: '6'},
        {value: 7, text: '7'},
        {value: 8, text: '8'},
        {value: 9, text: '9'},
        {value: 10, text: '10'},
        {value: 11, text: '11'},
        {value: 12, text: '12'},
        {value: 13, text: '13'},
        {value: 14, text: '14'},
        {value: 15, text: '15'},
        {value: 16, text: '16'},
        {value: 17, text: '17'},
        {value: 18, text: '18'},
        {value: 19, text: '19'},
        {value: 20, text: '20'},
        {value: 21, text: '21'},
        {value: 22, text: '22'},
        {value: 23, text: '23'},
        {value: 24, text: '24'},
        {value: 25, text: '25'}
      ]
    }


    /**
     * Get the pet theme
     * - primary, success, default
     * @param pet {Object} - pet
     * @returns {string} - theme
     */
    function getPetTheme(pet) {
      var theme;
      switch (pet.qualityId) {
        case 4:
        case 3:
          theme = 'primary';
          break;
        case 2:
          theme = 'success';
          break;
        default:
          theme = 'default';
          break;
      }
      return theme;
    }


    /**
     * Get a pet's species data
     * @param pet {number} - pet creature id
     * @returns {promise} - species service promise
     */
    function getSpecies(pet) {
      return bnetFactory
        .getPetSpecies(pet.stats.speciesId)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return {
            description: 'No description for this pet',
            source: 'No source for this pet'
          };
        });
    }


    /**
     * Initialize the factory data
     */
    function loadData() {
      pets.length = 0;
      mergePets();
      fixProblemPets();
    }


    /**
     * Merge the character and master pet lists and store on the factory api
     * - both arrays are merged, and data is supplemented
     */
    function mergePets() {
      var characterPets = angular.copy(characterFactory.character.pets.collected);
      var masterPets = angular.copy(masterFactory.data.pets);
      var cPets, mPet, nPet;

      /* loop through the master pet list */
      for (var i = 0, j = masterPets.length; i < j; i++) {
        mPet = angular.copy(masterPets[i]);
        /* check character pets for matches */
        cPets = _.filter(characterPets, {creatureId: mPet.creatureId});
        if (cPets.length) {
          /* loop through each match */
          for (var k = 0, l = cPets.length; k < l; k++) {
            nPet = angular.copy(_.extend(mPet, cPets[k]));
            nPet.collected = true;
            nPet.duplicate = (k > 0);
            nPet.original = (k === 0);
            nPet.store = store[nPet.creatureId];
            nPet.tcg = tcgs[nPet.creatureId];
            nPet.theme = getPetTheme(nPet);
            nPet.uncollected = false;
            pets.push(nPet);
          }
          petsText.push(nPet.creatureName);
          continue;
        }
        /* not collected */
        mPet.collected = false;
        mPet.creatureName = mPet.name;
        mPet.store = store[mPet.creatureId];
        mPet.tcg = tcgs[mPet.creatureId];
        mPet.theme = getPetTheme(mPet);
        mPet.uncollected = true;
        pets.push(mPet);
        petsText.push(mPet.creatureName);
      }

      // var test = [];
      // for (var i = 0, j = masterPets.length; i < j; i++) {
      //   getSpecies(masterPets[i])
      //     .then(function (response) {
      //       test.push(response.source);
      //     })
      // }
      //
      // $timeout(function () {
      //   save(test, 'test.txt');
      // }, 30000);
      //
      //
      // function save(data, filename) {
      //
      //   if (typeof data === 'object') {
      //     data = JSON.stringify(data, undefined, 2);
      //   }
      //
      //   var blob = new Blob([data], {type: 'text/json'}),
      //     e = document.createEvent('MouseEvents'),
      //     a = document.createElement('a');
      //
      //   a.download = filename;
      //   a.href = window.URL.createObjectURL(blob);
      //   a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      //   e.initEvent('click', true, false, window,
      //     0, 0, 0, 0, 0, false, false, false, false, 0, null);
      //   a.dispatchEvent(e);
      // }


      // for (var i = 0, j = pets.length; i < j; i++) {
      //   console.log(pets[i].icon + '.jpg');
      // }


      // window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
      //
      // var pet, src, dest;
      // for (var i = 0, j = pets.length; i < j; i++) {
      //   pet = pets[i];
      //   dest = 'C:\\Users\\Robert\\wow-collections-ui\\app\\images\\icons\\pets';
      //   src = 'C:\\Program Files (x86)\\World of Warcraft\\BlizzardInterfaceArt\\Interface\\ICONS\\INV_' + pet.icon + '.jpg';
      //
      //   window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
      //     // copy(fs.root, src, dest);
      //     move(fs, src, dest);
      //   }, errorHandler);
      //
      // }
      //
      // function move(fs, src, dirName) {
      //   fs.root.getFile(src, {}, function(fileEntry) {
      //
      //     fs.root.getDirectory(dirName, {}, function(dirEntry) {
      //       fileEntry.moveTo(dirEntry);
      //     }, errorHandler);
      //
      //   }, errorHandler);
      // }
      //
      //
      // function copy(cwd, src, dest) {
      //   cwd.getFile(src, {}, function(fileEntry) {
      //
      //     cwd.getDirectory(dest, {}, function(dirEntry) {
      //       fileEntry.copyTo(dirEntry);
      //     }, errorHandler);
      //
      //   }, errorHandler);
      // }
      //
      //
      // function errorHandler(e) {
      //   var msg = '';
      //   switch (e.code) {
      //     case FileError.QUOTA_EXCEEDED_ERR:
      //       msg = 'QUOTA_EXCEEDED_ERR';
      //       break;
      //     case FileError.NOT_FOUND_ERR:
      //       msg = 'NOT_FOUND_ERR';
      //       break;
      //     case FileError.SECURITY_ERR:
      //       msg = 'SECURITY_ERR';
      //       break;
      //     case FileError.INVALID_MODIFICATION_ERR:
      //       msg = 'INVALID_MODIFICATION_ERR';
      //       break;
      //     case FileError.INVALID_STATE_ERR:
      //       msg = 'INVALID_STATE_ERR';
      //       break;
      //     default:
      //       msg = 'Unknown Error';
      //       break;
      //   }
      //
      //   console.log('Error: ' + msg);
      // }


    }


    /**
     * Store the character profile on the factory api
     * @param character {Object} - character profile
     */
    function setCharacter(character) {
      angular.copy(character.data, character);
    }

  }
})();
