'use strict';

define(['./utils', './game'], function(utils, game) {

  return {
    /**
     * Создаёт параллакс облачков и включает игру на паузу, если она за пределами видимости.
     */
    setScrollEnabled: function() {
      var headerClouds = document.querySelector('.header-clouds');
      var gameBlock = document.querySelector('.demo');
      var isCloudsVisible;

      /**
       * @const
       * @type {number}
       */
      var THROTTLE_DELAY = 100;

      var optimizedGameScroll = utils.throttle(function() {
        var isGameVisible = utils.isElementVisible(gameBlock);
        if (!isGameVisible && (game.game.state.currentStatus !== game.Verdict.PAUSE)) {
          game.game.setGameStatus(window.Game.Verdict.PAUSE);
        }
      }, THROTTLE_DELAY);

      var optimizedheckScroll = utils.throttle(function() {
        isCloudsVisible = utils.isElementVisible(headerClouds);
      }, THROTTLE_DELAY);

      window.addEventListener('scroll', optimizedScroll);


      function optimizedCloudsScroll() {
        if (isCloudsVisible) {
          var scrollPosition = window.pageYOffset;
          headerClouds.style.backgroundPosition = scrollPosition + 'px';
        }
      }

      function optimizedScroll() {
        optimizedheckScroll();
        optimizedCloudsScroll();
        optimizedGameScroll();
      }
    }
  };
});
