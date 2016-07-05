'use strict';

define(function() {

  /**
    * Конструктор объекта Review. Управляет поведением элемента-отзыва, отрисовываемого в дом-ноде container.
    * Принимает на вход объект, описывающий состояние и свойства отзыва.
    * Добавляет обработчики событий на кнопках оценки отзыва.
    * Удаляет обработчики при удалении отзыва из дом-дерева.
    * @param {Object} data
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
