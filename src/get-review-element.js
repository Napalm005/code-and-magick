'use strict';

define(['./variables', './utils'], function(variables, utils) {

  return {
    /**
      * Клонирует элемент из шаблона, подставляет данные из объекта на сервере.
      * @param {Object} data
      * return {HTMLElement} element
      */
    cloneReviewElement: function(data) {
      var templateElement = document.querySelector('#review-template');
      var elementToClone = utils.getTemplate(templateElement, '.review');
      var element = elementToClone.cloneNode(true);
      var rating = element.querySelector('.review-rating');
      element.querySelector('.review-text').textContent = data.description;

      rating.classList.add(variables.ratingClasses[data.rating - 1]);

      setImageParameters(data, element);
      return element;
    },

      /**
      * Клонирует элемент из шаблона, подставляет данные из объекта на сервере.
      * return {HTMLElement} elementEmpty
      */
    cloneReviewElementEmpty: function() {
      var templateElementEmpty = document.querySelector('#review-empty-template');
      var elementEmptyToClone = utils.getTemplate(templateElementEmpty, '.review-empty');
      var elementEmpty = elementEmptyToClone.cloneNode(true);
      return elementEmpty;
    }
  };

  /**
    * Создаёт изображения, которые получают необходимые параметры из
    * свойств объекта на сервере и добавляет им обработчики загрузки и ошибки.
    * @param {Object} data
    * @param {HTMLElement} element
    */
  function setImageParameters(data, element) {
    var image = new Image(124, 124);
    var imageLoadTimeout;
    var reviewAvatar = element.querySelector('.review-author');

    image.onload = function() {
      clearTimeout(imageLoadTimeout);
      reviewAvatar.src = image.src;
      reviewAvatar.width = image.width;
      reviewAvatar.height = image.height;
    };

    image.onerror = function() {
      element.classList.add('review-load-failure');
    };

    image.src = data.author.picture;

    imageLoadTimeout = setTimeout(function() {
      reviewAvatar.removeAttribute('src');
      element.classList.add('review-load-failure');
    }, variables.LOAD_TIMEOUT);
  }
})();
