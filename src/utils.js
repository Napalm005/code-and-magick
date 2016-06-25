'use strict';

define(['./variables'], function(variables) {

  return {

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
      * Добавляется класс со стилем ошибки.
      */
    addErrorClass: function(element) {
      element.classList.remove(variables.CLASS_REVIEWS_SECTION_LOADING);
      element.classList.add(variables.CLASS_REVIEWS_SECTION_FAILURE);
    }
  };
});
