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

      /* pet collecting tooltip */
      tooltip =
        '<div class="tooltip-collecting">' +
          '<div class="text-left">' +
            '<div><strong>Have</strong>: A unique listing of pets you already own</div> ' +
            '<div><strong>Need</strong>: A unique listing of pets you do not own (yet!)</div> ' +
            '<div><strong>Extras</strong>: Any pets that are duplicate (does not include the original pet)</div>' +
          '</div>' +
        '</div>';
      tooltips.pets.collecting = $sce.trustAsHtml(tooltip);

      /* pet level tooltip */
      tooltip =
        '<div class="tooltip-levels">' +
          '<div>The ' +
            '<div class="btn-group btn-group-xs">' +
              '<button class="btn btn-default">min</button>' +
              '<button class="btn btn-default">max</button>' +
            '</div> buttons reset the values to 0 and 25 respectively' +
          '</div>' +
        '</div>';
      tooltips.pets.levels = $sce.trustAsHtml(tooltip);

      /* pet quality tooltip */
      tooltip =
        '<div class="tooltip-quality">' +
          '<div>' +
            '<span class="rare">R: rare (blue)</span>, ' +
            '<span class="uncommon">U: uncommon (green)</span>, ' +
            '<span class="common">C: common/poor (white/grey)</span>' +
          '</div>' +
        '</div>';
      tooltips.pets.quality = $sce.trustAsHtml(tooltip);

      /* pet sort tooltip */
      tooltip =
        '<div class="tooltip-sort">' +
          '<div class="text-left">' +
            '<div>Sorts default to ascending (except levels, which defaults to descending)</div>' +
            '<div>Clicking a sort a second time will reverse the sort, e.g., descending->ascending</div>' +
          '</div>' +
        '</div>';
      tooltips.pets.sort = $sce.trustAsHtml(tooltip);

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
