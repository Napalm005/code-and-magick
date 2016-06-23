'use strict';

(function() {

  /**
    * Клонирует элемент из шаблона, подставляет данные из объекта на сервере.
    * @param {Object} data
    * return {HTMLElement} element
    */
  function cloneReviewElement(data) {
    var templateElement = document.querySelector('#review-template');
    var elementToClone = getTemplate(templateElement, '.review');
    var element = elementToClone.cloneNode(true);
    var rating = element.querySelector('.review-rating');
    element.querySelector('.review-text').textContent = data.description;

    rating.classList.add(ratingClasses[data.rating - 1]);

    setImageParameters(data, element);
    return element;
  }

    /**
    * Клонирует элемент из шаблона, подставляет данные из объекта на сервере.
    * return {HTMLElement} elementEmpty
    */
  function cloneReviewElementEmpty() {
    var templateElementEmpty = document.querySelector('#review-empty-template');
    var elementEmptyToClone = getTemplate(templateElementEmpty, '.review-empty');
    var elementEmpty = elementEmptyToClone.cloneNode(true);
    return elementEmpty;
  }

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
    }, LOAD_TIMEOUT);
  }
})();
