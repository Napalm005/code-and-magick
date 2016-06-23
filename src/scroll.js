'use strict';

(function() {

  setScrollEnabled();

  /**
   * Создаёт параллакс облачков и включает игру на паузу, если она за пределами видимости.
   */
  function setScrollEnabled() {
    var headerClouds = document.querySelector('.header-clouds');
    var gameBlock = document.querySelector('.demo');
    var isCloudsVisible;

    /**
     * @const
     * @type {number}
     */
    var THROTTLE_DELAY = 100;

    var optimizedGameScroll = window.throttle(function() {
      var isGameVisible = isElementVisible(gameBlock);
      if (!isGameVisible && (game.state.currentStatus !== Verdict.PAUSE)) {
        game.setGameStatus(window.Game.Verdict.PAUSE);
      }
    }, THROTTLE_DELAY);

    var optimizedheckScroll = window.throttle(function() {
      isCloudsVisible = isElementVisible(headerClouds);
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
})();
