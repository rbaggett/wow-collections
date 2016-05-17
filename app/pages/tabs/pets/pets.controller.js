(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('PetsController', PetsController);

  function PetsController($scope, characterFactory, masterFactory, utilFactory) {

    /* local data */
    var vm = this;
    var characterPets = characterFactory.character.pets.collected;
    var masterPets = masterFactory.data.pets;
    var pets = [];

    /* scope data */
    vm.breeds = masterFactory.data.breeds;
    vm.filters = {stats: {}};
    vm.pageSize = 24;
    vm.pets = [];
    vm.search = '';
    vm.showSettings = false;

    /* scope functions */
    vm.filterCollected = filterCollected;
    vm.filterDuplicate = filterDuplicate;
    vm.filterLevel = filterLevel;
    vm.filterNotCollected = filterNotCollected;
    vm.filterPets = filterPets;
    vm.filterQuality = filterQuality;
    vm.getPetTile = getPetTile;
    vm.toggleSettings = toggleSettings;


    (function activate() {
      mergePets();
      fixProblemPets();
      sortPets(['creatureName']);
      pets = pets.concat(vm.pets);
      utilFactory.setActiveView('pets');
    })();


    /**
     * Toggle the collected pets filter
     */
    function filterCollected() {
      vm.filters = _.omit(vm.filters, ['notCollected', 'duplicate']);
      if (vm.filters.original) {
        vm.filters = _.omit(vm.filters, ['original']);
      } else {
        vm.filters.original = true;
      }
      filterPets();
    }


    /**
     * Toggle the duplicate pets filter
     */
    function filterDuplicate() {
      vm.filters = _.omit(vm.filters, ['original', 'notCollected']);
      if (vm.filters.duplicate) {
        vm.filters = _.omit(vm.filters, ['duplicate']);
      } else {
        vm.filters.duplicate = true;
      }
      filterPets();
    }


    function filterLevel(level) {
      if (vm.filters.stats.level == level) {
        vm.filters.stats = _.omit(vm.filters.stats, ['level']);
      }
      else {
        vm.filters.stats.level = level;
      }
      filterPets();
    }


    /**
     * Toggle the un-collected pets filter
     */
    function filterNotCollected() {
      vm.filters = _.omit(vm.filters, ['original', 'duplicate']);
      if (vm.filters.notCollected) {
        vm.filters = _.omit(vm.filters, ['notCollected']);
      } else {
        vm.filters.notCollected = true;
      }
      filterPets();
    }


    /**
     * Apply filters
     */
    function filterPets() {
      vm.pets.length = 0;
      vm.pets = vm.pets.concat(pets);
      vm.pets = _.filter(vm.pets, vm.filters);
    }


    function filterQuality(quality) {
      if (vm.filters.qualityId == quality) {
        vm.filters = _.omit(vm.filters, ['qualityId']);
      }
      else {
        vm.filters.qualityId = quality;
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
      var classes = 'tile-' + pet.theme;
      if (pet.collected) {
        classes += ' tile-border-solid';
      } else {
        classes += ' tile-border-dashed';
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
     * Merge the character and master pet lists
     * - both arrays are merged, and data is supplmented
     */
    function mergePets() {
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
            nPet.notCollected = false;
            nPet.original = (k === 0);
            nPet.theme = getPetTheme(nPet);
            vm.pets.push(nPet);
          }
          continue;
        }
        /* not collected */
        mPet.collected = false;
        mPet.creatureName = mPet.name;
        mPet.notCollected = true;
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


    function toggleSettings() {
      vm.showSettings = !vm.showSettings;
    }

  }
})();



