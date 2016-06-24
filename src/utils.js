'use strict';

define(['./variables', './render-reviews'], function(variables, renderReviews) {

  return {
    /**
      * Показывает доп. отзывы при нажатии кнопки по LIMIT штук.
      */
    addMoreReviews: function() {
      variables.moreReviewsButton.addEventListener('click', function() {
        if (this.isNextPageAvailable(variables.filteredReviews, variables.currentOffset, variables.LIMIT)) {
          variables.currentOffset++;
          renderReviews.renderReviews(variables.filteredReviews, variables.currentOffset);
          if ((variables.currentOffset + 1) * variables.LIMIT >= variables.filteredReviews.length) {
            variables.moreReviewsButton.classList.add(variables.CLASS_INVISIBLE);
          }
        }
      });
    },

    /**
      * Определяет, видим ли элемент.
      * @param {HTMLElement} element
      * return {boolean}
      */
    isElementVisible: function(element) {
      var elementPosition = element.getBoundingClientRect();
      return elementPosition.bottom >= 0;
    },

    /**
      * Throttle оптимизация
      * @param  {function} callback
      * @param  {number} timeDelay
      * @return {function}
      */
    throttle: function(callback, timeDelay) {
      var lastCall = 0;
      return function() {
        if (Date.now() - lastCall >= timeDelay) {
          callback();
          lastCall = Date.now();
        }
      };
    },

    /**
      * Проверяет поддержку элемента template и получает в нём контент.
      * return {HTMLElement} result
      */
    getTemplate: function(template, content) {
      var result;

      if ('content' in template) {
        result = template.content.querySelector(content);
      } else {
        result = template.querySelector(content);
      }
      return result;
    },

    /**
      * Добавляется класс со стилем ошибки.
      */
    addErrorClass: function(element) {
      element.classList.remove(variables.CLASS_REVIEWS_SECTION_LOADING);
      element.classList.add(variables.CLASS_REVIEWS_SECTION_FAILURE);
    },

    /**
      * @param {Array} filteredReviewsList
      * @param {number} offset
      * @param {number} limit
      * @return {boolean}
      */
    isNextPageAvailable: function(filteredReviewsList, offset, limit ) {
      return offset < Math.floor(filteredReviewsList.length / limit);
    }
  };
});
