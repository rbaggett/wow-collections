(function () {

  'use strict';

  angular
    .module('wcui')
    .controller('PetsController', PetsController);

  function PetsController($uibModal, constants, petsFactory, tooltipFactory, utilityFactory) {

    /* local data */
    var vm = this;
    var order = 'asc';
    var pageSizeDefault = 20;
    var pets = petsFactory.pets;

    /* scope factory data */
    vm.breeds = petsFactory.getPetBreeds();
    vm.levelsMax = petsFactory.getPetLevels();
    vm.levelsMin = petsFactory.getPetLevels();
    vm.searchItems = petsFactory.petsText;
    vm.tooltips = tooltipFactory.tooltips.pets;
    vm.urls = constants.urls;

    /* scope data */
    vm.filters = {};
    vm.filterTrail = '';
    vm.levelMax = vm.levelsMax[25];
    vm.levelMin = vm.levelsMin[0];
    vm.pageSize = 20;
    vm.pets = angular.copy(pets);
    vm.search = '';
    vm.showTooltips = false;
    vm.sort = '';

    /* scope functions */
    vm.filterCollected = filterCollected;
    vm.filterDuplicate = filterDuplicate;
    vm.filterFamily = filterFamily;
    vm.filterPets = filterPets;
    vm.filterQuality = filterQuality;
    vm.filterSpecial = filterSpecial;
    vm.filterUncollected = filterUncollected;
    vm.getPetTile = getPetTile;
    vm.openDetails = openDetails;
    vm.resetFilters = resetFilters;
    vm.resetPageSize = resetPageSize;
    vm.resetMax = resetMax;
    vm.resetMin = resetMin;
    vm.resetSearch = resetSearch;
    vm.sortPets = sortPets;
    vm.toggleTooltips = toggleTooltips;


    /* initialize */
    (function activate() {
      filterCollected();
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
     * Add/remove a pet family filter
     * @param family {string} - pet family
     */
    function filterFamily(family) {
      if (vm.filters.family == family) {
        /* remove the filter */
        vm.filters = _.omit(vm.filters, ['family']);
      }
      else {
        /* add the filter */
        vm.filters.family = family;
      }
      filterPets();
    }


    /**
     * Apply filters
     * - refresh the pet list
     * - with any filter failure, remove the pet and move on
     * - re-sort the pets and update the filter trail
     */
    function filterPets() {
      var pet;

      /* refresh the pets */
      vm.pets = angular.copy(pets);

      /* for each pet */
      for (var i = vm.pets.length - 1; i >= 0; i--) {
        pet = vm.pets[i];

        /* name */
        if (vm.search.length) {
          if (pet.creatureName.toLocaleLowerCase().indexOf(vm.search.toLocaleLowerCase()) === -1) {
            vm.pets.splice(i, 1);
            continue;
          }
        }

        /* family */
        if (vm.filters.family !== undefined) {
          if (vm.filters.family !== pet.family) {
            vm.pets.splice(i, 1);
            continue;
          }
        }

        /* special */
        if (vm.filters.special && !pet[vm.filters.special]) {
          vm.pets.splice(i, 1);
          continue;
        }

        /* levels */
        if (pet.stats.level < vm.levelMin.value) {
          vm.pets.splice(i, 1);
          continue;
        }
        if (pet.stats.level > vm.levelMax.value) {
          vm.pets.splice(i, 1);
          continue;
        }

        /* collection */
        if (vm.filters.original || vm.filters.uncollected || vm.filters.duplicate) {
          if (vm.filters.original && !pet.original) {
            vm.pets.splice(i, 1);
            continue;
          }
          else if (vm.filters.uncollected && !pet.uncollected) {
            vm.pets.splice(i, 1);
            continue;
          }
          else if (vm.filters.duplicate && !pet.duplicate) {
            vm.pets.splice(i, 1);
            continue;
          }
        }
        else if (pet.duplicate) {
          vm.pets.splice(i, 1);
          continue;
        }

        /* quality */
        if (vm.filters.qualityId !== undefined) {
          if (vm.filters.qualityId !== pet.qualityId) {
            vm.pets.splice(i, 1);
          }
        }
      }

      /* resort pets */
      sortPets('creatureName', 'asc', true);

      /* construct the filter trail */
      setFilterTrail();
    }


    /**
     * Add/remove a pet special filter
     * @param special {string} - special category
     */
    function filterSpecial(special) {
      if (vm.filters.special == special) {
        /* remove the filter */
        vm.filters = _.omit(vm.filters, ['special']);
      }
      else {
        /* add the filter */
        vm.filters.special = special;
      }
      filterPets();
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


    /**
     * Open the details modal window for a pet
     * @param pet {Object} - pet
     */
    function openDetails(pet) {
      var modalInstance = $uibModal.open({
        templateUrl: 'pages/tabs/pets/details/details.html',
        controller: 'PetDetailsController',
        controllerAs: 'vm',
        resolve: {
          pet: function () {
            return pet;
          },
          species: function () {
            return petsFactory.getSpecies(pet);
          }
        }
      });
    }


    /**
     * Reset all filters and defaults, resort
     */
    function resetFilters() {
      vm.filters = {};
      vm.levelMax = vm.levelsMax[25];
      vm.levelMin = vm.levelsMin[0];
      vm.pageSize = pageSizeDefault;
      vm.search = '';
      filterCollected();
      sortPets('creatureName', 'asc', true);
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
     * Reset the page size to its default
     */
    function resetPageSize() {
      vm.pageSize = pageSizeDefault;
    }


    /**
     * Reset the search to its default
     */
    function resetSearch() {
      vm.search = '';
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
            vm.filterTrail += ' <strong><span class="text-primary">rare</span></strong>';
            break;
          case 2:
            vm.filterTrail += ' <strong><span class="text-success">uncommon</span></strong>';
            break;
          default:
            vm.filterTrail += ' <strong>common/poor</strong>';
            break;
        }
      }

      /* collecting */
      if (vm.filters.original) {
        vm.filterTrail += ' unique owned';
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
     * @param newOrder {string} - override the current order
     * @param reset {boolean} - reset the current sort
     */
    function sortPets(property, newOrder, reset) {
      if (newOrder) {
        order = newOrder;
      }
      if (reset) {
        vm.sort = '';
      }
      /* if the sort is repeated, toggle the order */
      if (vm.sort === property) {
        order = (order === 'asc') ? 'desc' : 'asc';
      }
      /* levels default to descending */
      else if (property.includes('stats')) {
        order = 'desc';
      }
      /* everything else defaults to ascending */
      else {
        order = 'asc';
      }

      vm.sort = property;
      vm.pets = _.orderBy(vm.pets, [property], [order]);
    }


    /**
     * Toggle filter tooltips visiblity
     */
    function toggleTooltips() {
      vm.showTooltips = !vm.showTooltips;
    }


  }
})();



