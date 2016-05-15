(function () {

  'use strict';

  angular
    .module('wowCollectionsUi')
    .controller('PetsController', PetsController);

  function PetsController(characterFactory, masterFactory, utilFactory) {

    /* local data */
    var vm = this;
    var characterPets = characterFactory.character.pets.collected;
    var masterPets = masterFactory.data.pets;

    /* scope data */
    vm.breeds = masterFactory.data.breeds;
    vm.pageSize = 24;
    vm.pets = [];

    /* scope functions */
    vm.getPetTile = getPetTile;


    (function activate() {
      processPets();
      utilFactory.setActiveView('pets');
    })();


    function processPets() {
      addPetMetaData();
      aggregatePets();
      fixProblemPets();
      console.log(vm.pets);
    }


    function addPetMetaData() {
      var pet;
      for (var count = 0, length = characterPets.length; count < length; count++) {
        pet = characterPets[count];
        pet.collected = true;
        pet.theme = getPetTheme(pet);
        pet.species = getPetSpecies(pet);
      }
    }


    function aggregatePets() {
      vm.pets = vm.pets
        .concat(characterPets)
        .concat(_.xorBy(characterPets, masterPets, 'creatureId'));
    }


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


    function getPetSpecies(pet) {
      var species = _.filter(masterPets, {creatureId: pet.creatureId});
      if (species.length) {
        return species[0];
      }
      return {};
    }


    function getPetTile(pet) {
      var tileClass;
      if (pet.collected) {
        switch (pet.qualityId) {
          case 3:
            tileClass = 'pet-tile-primary';
            break;
          case 2:
            tileClass = 'pet-tile-success';
            break;
          default:
            tileClass = 'pet-tile-default';
            break;
        }
      }
      else {
        tileClass = 'pet-tile-default-dashed';
      }
      return tileClass;
    }


    function getPetTheme(pet) {
      var theme;
      switch (pet.qualityId) {
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

  }
})();
