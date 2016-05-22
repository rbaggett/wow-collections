(function () {

  'use strict';

  angular
    .module('wcui')
    .factory('petsFactory', petsFactory);

  function petsFactory(characterFactory, masterFactory) {

    var pets = [];

    return {
      pets: pets,
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
      if (petIndex) {
        pets[petIndex].icon = 'warlock_summon_-voidlord';
      }

      /* inv_pet_goat */
      petIndex = _.findIndex(pets, {creatureId: 83817});
      if (petIndex) {
        pets[petIndex].icon = 'inv_pet_-goat';
      }

      /* trade_archaeology_draeneicandelabra */
      petIndex = _.findIndex(pets, {creatureId: 88814});
      if (petIndex) {
        pets[petIndex].icon = 'trade_archaeology_draenei-candelabra';
      }
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
            nPet.uncollected = false;
            nPet.original = (k === 0);
            nPet.theme = getPetTheme(nPet);
            pets.push(nPet);
          }
          continue;
        }
        /* not collected */
        mPet.collected = false;
        mPet.creatureName = mPet.name;
        mPet.uncollected = true;
        mPet.theme = getPetTheme(mPet);
        pets.push(mPet);
      }
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
