(function () {

  'use strict';

  angular
    .module('wcui')
    .factory('tooltipFactory', tooltipFactory);

  function tooltipFactory($sce) {

    var tooltips = {
      pets: {},
      mounts: {},
      toys: {}
    };

    (function activate() {
      setPetTooltips();
      setMountTooltips();
      setToyTooltips();
    })();

    return {
      tooltips: tooltips
    };


    function setPetTooltips() {
      var tooltip;

      // @formatter:off
      tooltip =
        '<div class="tooltip-quality">' +
          '<div>Filter pets by selecting a rarity</div>' +
          '<div>' +
            '<span class="rare">R: rare (blue)</span>, ' +
            '<span class="uncommon">U: uncommon (green)</span>, ' +
            '<span class="common">C: common/poor (white/grey)</span>' +
          '</div>' +
        '</div>';
      tooltips.pets.quality = $sce.trustAsHtml(tooltip);

      tooltip =
        '<div class="tooltip-levels">' +
          '<div>Select a min and/or a max level to display pets within a range</div>' +
          '<div>The ' +
            '<div class="btn-group btn-group-xs">' +
              '<button class="btn btn-default">min</button>' +
              '<button class="btn btn-default">max</button>' +
            '</div> buttons reset the values to 0 and 25 respectively' +
          '</div>' +
        '</div>';
      tooltips.pets.levels = $sce.trustAsHtml(tooltip);
      // @formatter:on
    }


    function setMountTooltips() {
      var tooltip;
    }


    function setToyTooltips() {
      var tooltip;
    }

  }
})();
