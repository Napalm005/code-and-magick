'use strict';

define(function() {

  /**
    * Конструктор, методы которого подлежат унаследованию.
    * Он описывает базовую DOM-компоненту и описывающие её стандартный жизненный цикл.
    * @param {Object} element
    * @param {HTMLElement} container
    * @constructor
    */
  var BaseComponent = function(element, container) {
    this.element = element;
    this.container = container;
  };

  /**
    * Добавление элемента в контейнер
    */
  BaseComponent.prototype.create = function() {
    this.container.appendChild(this.element);
  };

  BaseComponent.prototype._setEventListener = function(eventName, listener, fn) {
    listener.addEventListener(eventName, fn);
  };

  BaseComponent.prototype._removeEventListener = function(eventName, listener, fn) {
    listener.removeEventListener(eventName, fn);
  };

  BaseComponent.prototype.remove = function() {
    this.element.parentNode.removeChild(this.element);
  };

  return BaseComponent;
});
