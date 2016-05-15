(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('PetsController', PetsController);

  function PetsController($scope, characterFactory, masterFactory, utilFactory) {

    /* local data */
    var vm = this;
    var characterPets = characterFactory.character.pets.collected;
    var filters = {};
    var masterPets = masterFactory.data.pets;
    var pets = [];

    /* scope data */
    vm.breeds = masterFactory.data.breeds;
    vm.pageSize = 20;
    vm.pets = [];


    /* scope functions */
    vm.filterCollected = filterCollected;
    vm.filterPets = filterPets;
    vm.filterQuality = filterQuality;
    vm.getPetTile = getPetTile;


    (function activate() {
      mergePets();
      fixProblemPets();
      sortPets(['creatureName']);
      pets = pets.concat(vm.pets);
      utilFactory.setActiveView('pets');
    })();


    function filterCollected(collected) {
      if (collected === undefined) {
        filters = _.omit(filters, ['collected']);
      }
      else {
        filters.collected = collected;
      }
      filterPets();
    }


    function filterPets() {
      debugger
      vm.pets.length = 0;
      vm.pets = vm.pets.concat(pets);
      vm.pets = _.filter(vm.pets, filters);
    }


    function filterQuality(quality) {
      if (quality === undefined) {
        filters = _.omit(filters, ['qualityId']);
      }
      else {
        filters.qualityId = quality;
      }
      filterPets();
    }


    /**
     * Fix any outlier (problem) pets
     * - i.e., bad icon string
     */
    function fixProblemPets() {
      var petIndex = -1;

      /* warlock_summon_voidlord */
      petIndex = _.findIndex(vm.pets, {creatureId: 71021});
      if (petIndex) {
        vm.pets[petIndex].icon = 'warlock_summon_-voidlord';
      }

      /* inv_pet_goat */
      petIndex = _.findIndex(vm.pets, {creatureId: 83817});
      if (petIndex) {
        vm.pets[petIndex].icon = 'inv_pet_-goat';
      }

      /* trade_archaeology_draeneicandelabra */
      petIndex = _.findIndex(vm.pets, {creatureId: 88814});
      if (petIndex) {
        vm.pets[petIndex].icon = 'trade_archaeology_draenei-candelabra';
      }
    }


    /**
     * Get the pet tile class
     * @param pet {Object} - pet
     * @returns {string} - class string
     */
    function getPetTile(pet) {
      var classes = 'pet-tile-' + pet.theme;
       if (pet.collected) {
         classes += ' pet-tile-border-solid';
      }else {
         classes += ' pet-tile-border-dashed';
       }
      return classes;
    }


    /**
     * Get the pet theme
     * - primary, success, default
     * @param pet {Object} - pet
     * @returns {string} - theme
     */
    function getPetTheme(pet) {
      var theme;
      // if (pet.collected) {
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
      // }
      // return 'default';
    }


    /**
     * Merge the character and master pet lists
     * - both arrays are merged, and data is supplmented
     */
    function mergePets() {
      var cPets, mPet, nPet;

      /* loop through the master pet list */
      for (var i = 0, j = masterPets.length; i < j; i++) {
        mPet = masterPets[i];
        /* check character pets for matches */
        cPets = _.filter(characterPets, {creatureId: mPet.creatureId});
        if (cPets.length) {
          /* loop through each match */
          for (var k = 0, l = cPets.length; k < l; k++) {
            nPet = _.merge(mPet, cPets[k]);
            nPet.collected = true;
            nPet.theme = getPetTheme(nPet);
            vm.pets.push(nPet);
          }
          continue;
        }
        /* not collected */
        mPet.collected = false;
        mPet.creatureName = mPet.name;
        mPet.theme = getPetTheme(mPet);
        vm.pets.push(mPet);
      }
    }


    /**
     * Sort the pets based on properties
     * @param properties {[string]} - properties for sorting
     */
    function sortPets(properties) {
      vm.pets = _.sortBy(vm.pets, properties);
    }

  }
})();
