(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('PetsController', PetsController);

  function PetsController($uibModal, petsFactory, tooltipFactory, utilityFactory) {

    /* local data */
    var vm = this;
    var pets = [];

    /* scope data */
    vm.breeds = utilityFactory.getPetBreeds();
    vm.filters = {stats: {}};
    vm.levelMax = {};
    vm.levelMin = {};
    vm.levelsMax = utilityFactory.getPetLevels();
    vm.levelsMin = utilityFactory.getPetLevels();
    vm.pageSize = 24;
    vm.pageSizeDefault = 24;
    vm.pets = petsFactory.pets;
    vm.search = '';
    vm.tooltips = tooltipFactory.tooltips.pets;


    /* scope functions */
    vm.filterCollected = filterCollected;
    vm.filterDuplicate = filterDuplicate;
    vm.filterUncollected = filterUncollected;
    vm.filterPets = filterPets;
    vm.filterQuality = filterQuality;
    vm.getPetTile = getPetTile;
    vm.openDetails = openDetails;
    // vm.setLevelMax = setLevelMax;
    // vm.setLevelMin = setLevelMin;
    vm.resetPageSize = resetPageSize;


    (function activate() {
      sortPets(['creatureName']);
      pets = pets.concat(vm.pets);
      vm.levelMax = vm.levelsMax[25];
      vm.levelMin = vm.levelsMin[0];
      utilityFactory.setActiveView('pets');
    })();

    //
    // function lessThan(value) {
    //   return value.stats.level <= vm.levelMax.value;
    // }
    //
    // function greaterThan(value) {
    //   return value.stats.level >= vm.levelMin.value;
    // }


    /**
     * Toggle the collected pets filter
     */
    function filterCollected() {
      vm.filters = _.omit(vm.filters, ['uncollected', 'duplicate']);
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
      vm.filters = _.omit(vm.filters, ['original', 'uncollected']);
      if (vm.filters.duplicate) {
        vm.filters = _.omit(vm.filters, ['duplicate']);
      } else {
        vm.filters.duplicate = true;
      }
      filterPets();
    }


    // function filterLevelMax() {
    //   filterPets();
    //   vm.pets = _.filter(vm.pets, lessThan);
    // }


    // function filterLevelMin() {
    //   filterPets();
    //   vm.pets = _.filter(vm.pets, greaterThan);
    // }


    /**
     * Apply filters
     */
    function filterPets() {
      vm.pets.length = 0;
      vm.pets = vm.pets.concat(pets);
      /* all of the queued filters */
      vm.pets = _.filter(vm.pets, vm.filters);
      /* max level filter */
      vm.pets = _.filter(vm.pets, function (value) {
        return value.stats.level <= vm.levelMax.value;
      });
      /* min level filter */
      vm.pets = _.filter(vm.pets, function (value) {
        return value.stats.level >= vm.levelMin.value;
      });
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
     * Toggle the un-collected pets filter
     */
    function filterUncollected() {
      vm.filters = _.omit(vm.filters, ['original', 'duplicate']);
      if (vm.filters.uncollected) {
        vm.filters = _.omit(vm.filters, ['uncollected']);
      } else {
        vm.filters.uncollected = true;
      }
      filterPets();
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


    function openDetails(pet) {


      var modalInstance = $uibModal.open({
        // animation: $scope.animationsEnabled,
        templateUrl: 'pages/tabs/pets/details/details.html',
        controller: 'PetDetailsController',
        // size: size,
        resolve: {
          items: function () {
            return true;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        var selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });


    }


    function resetPageSize() {
      vm.pageSize = vm.pageSizeDefault;
    }


    function setLevelMax() {
      vm.levelMax = vm.levelsMax[25];
      filterPets();
    }

    function setLevelMin() {
      vm.levelMin = vm.levelsMin[0];
      filterPets();
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



