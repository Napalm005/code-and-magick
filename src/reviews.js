'use strict';

(function() {
  var reviewsFilterBlock = document.querySelector('.reviews-filter');
  var elementToClone = getTemplate();
  var reviewsContainer = document.querySelector('.reviews-list');
  var INVISIBLE = 'invisible';

  reviewsFilterBlock.classList.add(INVISIBLE);

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 5000;

  /**
    * Проверяет поддержку элемента template и получает в нём контент.
    * return {object} result
    */
  function getTemplate() {
    var templateElement = document.querySelector('template');
    var result;

    if ('content' in templateElement) {
      result = templateElement.content.querySelector('.review');
    } else {
      result = templateElement.querySelector('.review');
    }
    return result
  }

  /**
    * Клонирует элемент из шаблона, подставляет данные из объекта на сервере.
    * @param {Object} data
    * @param {HTMLElement} container
    */
  var cloneReviewElements = function(data) {
    var element = elementToClone.cloneNode(true);
    element.querySelector('.review-text').textContent = data.description;
    element.querySelector('.review-rating').textContent = data.rating;
    return element;
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

    image.onload = function() {
      clearTimeout(imageLoadTimeout);
      var reviewAvatar = element.querySelector('.review-author');
      reviewAvatar.src = image.src;
      reviewAvatar.width = image.width;
      reviewAvatar.height = image.height;
    };

    image.onerror = function() {
      element.classList.add('review-load-failure');
    };

    image.src = data.author.picture;

    imageLoadTimeout = setTimeout(function() {
      image.src = '';
      element.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMEOUT);
  }

  window.reviews.forEach(function(review) {
    reviewsContainer.appendChild(cloneReviewElements(review));
    setImageParameters(review, cloneReviewElements(review));
  });

  reviewsFilterBlock.classList.remove(INVISIBLE);
})();
