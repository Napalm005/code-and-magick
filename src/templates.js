'use strict';

define(['./variables'], function(variables) {

  return {
    /**
      * Проверяет поддержку элемента template и получает в нём контент.
      * @param {Element} template
      * @param {string} content
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
      * Клонирует элемент из шаблона, подставляет данные из объекта на сервере.
      * @param {Object} data
      * return {HTMLElement} element
      */
    cloneReviewElement: function(data) {
      var templateElement = document.querySelector('#review-template');
      var elementToClone = this.getTemplate(templateElement, '.review');
      var element = elementToClone.cloneNode(true);
      var rating = element.querySelector('.review-rating');
      element.querySelector('.review-text').textContent = data.getDescription();

      rating.classList.add(variables.ratingClasses[data.getRating() - 1]);

      setImageParameters(data, element);
      return element;
    },

      /**
      * Клонирует элемент из шаблона, подставляет данные из объекта на сервере.
      * return {HTMLElement} elementEmpty
      */
    cloneReviewElementEmpty: function() {
      var templateElementEmpty = document.querySelector('#review-empty-template');
      var elementEmptyToClone = this.getTemplate(templateElementEmpty, '.review-empty');
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

    image.src = data.getAuthorPicture();

    imageLoadTimeout = setTimeout(function() {
      reviewAvatar.removeAttribute('src');
      element.classList.add('review-load-failure');
    }, variables.LOAD_TIMEOUT);
  }
});
