(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('PetsController', PetsController);

  function PetsController($uibModal, petsFactory, tooltipFactory, utilityFactory) {

    /* local data */
    var vm = this;
    var order = 'asc';
    var pets = petsFactory.pets;

    /* scope factory data */
    vm.breeds = utilityFactory.getPetBreeds();
    vm.levelsMax = utilityFactory.getPetLevels();
    vm.levelsMin = utilityFactory.getPetLevels();
    vm.tooltips = tooltipFactory.tooltips.pets;

    /* scope data */
    vm.filters = {};
    vm.filterTrail = '';
    vm.levelMax = vm.levelsMax[25];
    vm.levelMin = vm.levelsMin[0];
    vm.pageSize = 20;
    vm.pageSizeDefault = 20;
    vm.pets = angular.copy(pets);
    vm.search = '';
    vm.sort = '';

    /* scope functions */
    vm.filterCollected = filterCollected;
    vm.filterDuplicate = filterDuplicate;
    vm.filterUncollected = filterUncollected;
    vm.filterPets = filterPets;
    vm.filterQuality = filterQuality;
    vm.getPetTile = getPetTile;
    vm.openDetails = openDetails;
    vm.resetFilters = resetFilters;
    vm.resetPageSize = resetPageSize;
    vm.resetMax = resetMax;
    vm.resetMin = resetMin;
    vm.sortPets = sortPets;


    /* initialize */
    (function activate() {
      filterCollected();
      sortPets('creatureName');
      utilityFactory.setActiveView('pets');
    })();


    /**
     * Add/remove the collected pets filter
     */
    function filterCollected() {
      if (vm.filters.original) {
        /* remove the filter */
        vm.filters = _.omit(vm.filters, ['original']);
      } else {
        /* only one collection filter at a time */
        vm.filters = _.omit(vm.filters, ['uncollected', 'duplicate']);
        /* add the filter */
        vm.filters.original = true;
      }
      filterPets();
    }


    /**
     * Add/remove the duplicate pets filter
     */
    function filterDuplicate() {
      if (vm.filters.duplicate) {
        /* remove the filter */
        vm.filters = _.omit(vm.filters, ['duplicate']);
      } else {
        /* only one collection filter at a time */
        vm.filters = _.omit(vm.filters, ['original', 'uncollected']);
        /* add the filter */
        vm.filters.duplicate = true;
      }
      filterPets();
    }


    /**
     * Apply filters
     */
    function filterPets() {
      vm.pets = angular.copy(pets);

      /* name filter */
      if (vm.search) {
        vm.pets = _.filter(vm.pets, function (value) {
          return (value.creatureName.toLocaleLowerCase().indexOf(vm.search.toLocaleLowerCase(), 0) === 0);
        });
      }

      /* max level filter */
      if (vm.levelMax !== vm.levelsMax[25]) {
        vm.pets = _.filter(vm.pets, function (value) {
          return value.stats.level <= vm.levelMax.value;
        });
      }

      /* min level filter */
      if (vm.levelMin !== vm.levelsMin[0]) {
        vm.pets = _.filter(vm.pets, function (value) {
          return value.stats.level >= vm.levelMin.value;
        });
      }

      /* all of the queued filters */
      vm.pets = _.filter(vm.pets, vm.filters);

      setFilterTrail();
    }


    /**
     * Add/remove a pet quality filter
     * @param quality {number} - quality id
     */
    function filterQuality(quality) {
      if (vm.filters.qualityId == quality) {
        /* remove the filter */
        vm.filters = _.omit(vm.filters, ['qualityId']);
      }
      else {
        /* add the filter */
        vm.filters.qualityId = quality;
      }
      filterPets();
    }


    /**
     * Add/remove the un-collected pets filter
     */
    function filterUncollected() {
      if (vm.filters.uncollected) {
        /* remove the filter */
        vm.filters = _.omit(vm.filters, ['uncollected']);
      } else {
        /* only one collection filter at a time */
        vm.filters = _.omit(vm.filters, ['original', 'duplicate']);
        /* add the filter */
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


    /**
     * Reset all filters and defaults, resort
     */
    function resetFilters() {
      vm.filters = {};
      vm.levelMax = vm.levelsMax[25];
      vm.levelMin = vm.levelsMin[0];
      vm.pageSize = vm.pageSizeDefault;
      vm.search = '';
      filterCollected();
      sortPets('creatureName', 'desc');
    }


    /**
     * Reset the page size to its default
     */
    function resetPageSize() {
      vm.pageSize = vm.pageSizeDefault;
    }


    /**
     * Reset the max level to its default
     */
    function resetMax() {
      vm.levelMax = vm.levelsMax[25];
      filterPets();
    }


    /**
     * Reset the min level to its default
     */
    function resetMin() {
      vm.levelMin = vm.levelsMin[0];
      filterPets();
    }


    /**
     * Create string based on pet count and filters applied
     * [pet count] [rarity] [collecting] pet(s) [level range]
     */
    function setFilterTrail() {
      vm.filterTrail = '';

      /* rarity */
      if (vm.filters.qualityId) {
        switch (vm.filters.qualityId) {
          case 4:
          case 3:
            vm.filterTrail += ' rare';
            break;
          case 2:
            vm.filterTrail += ' uncommon';
            break;
          default:
            vm.filterTrail += ' common/poor';
            break;
        }
      }

      /* collecting */
      if (vm.filters.original) {
        vm.filterTrail += ' owned';
      } else if (vm.filters.uncollected) {
        vm.filterTrail += ' unowned (yet)';
      } else if (vm.filters.duplicate) {
        vm.filterTrail += ' duplicate';
      }

      /* pet or pets based on count */
      vm.filterTrail += (vm.pets.length > 1) ? ' pets' : ' pet';


      /* level range */
      vm.filterTrail += ' between levels ' + vm.levelMin.value + ' and ' + vm.levelMax.value;
    }


    /**
     * Sort the pets based on properties
     * @param property {string} - property for sorting
     */
    function sortPets(property, newOrder) {
      if (newOrder) {
        order = newOrder;
      }
      /* if the sort is repeated, toggle the order */
      if (vm.sort === property) {
        order = (order === 'asc') ? 'desc' : 'asc';
      }
      /* levels default to descending */
      else if ('stats.level' === property) {
        order = 'desc';
      }
      /* everything else defaults to ascending */
      else {
        order = 'asc';
      }

      vm.sort = property;
      vm.pets = _.orderBy(vm.pets, [property], [order]);
    }


  }
})();



