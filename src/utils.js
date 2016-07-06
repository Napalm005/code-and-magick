'use strict';

define(['./variables'], function(variables) {

  /** @enum {number} */
  var KeyCode = {
    ENTER: 13,
    ESC: 27,
    SPACE: 32
  };

  return {

    /**
      * Наследование прототипа.
      * @param {constructor} ChildComponent
      * @param {constructor} BaseComponent
      */
    inherit: function(ChildComponent, BaseComponent) {
      function EmptyConstructor() {}
      EmptyConstructor.prototype = BaseComponent.prototype;
      ChildComponent.prototype = new EmptyConstructor();
      ChildComponent.prototype.constructor = ChildComponent;
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
      * Добавляется класс со стилем ошибки.
      */
    addErrorClass: function(element) {
      element.classList.remove(variables.CLASS_REVIEWS_SECTION_LOADING);
      element.classList.add(variables.CLASS_REVIEWS_SECTION_FAILURE);
    },

     /**
     * @param {Event} evt
     * @return {boolean}
     */
    isActivationEvent: function(evt) {
      return [KeyCode.ENTER, KeyCode.SPACE].indexOf(evt.keyCode) > -1;
    },


    /**
     * @param {Event} evt
     * @return {boolean}
     */
    isDeactivationEvent: function(evt) {
      return evt.keyCode === KeyCode.ESC;
    }
  };
});
