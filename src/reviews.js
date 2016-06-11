'use strict';

(function() {
  var reviewsFilterBlock = document.querySelector('.reviews-filter');
  var elementToClone;
  var reviewsContainer = document.querySelector('.reviews-list');
  var INVISIBLE = 'invisible';

  reviewsFilterBlock.classList.add(INVISIBLE);
  supportTemplateTag();

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 5000;

  /**
    * Проверяет поддержку элемента template и получает в нём контент.
    * @param {Object} data
    * @param {HTMLElement} container
    */
  function supportTemplateTag() {
    var templateElement = document.querySelector('template');

    if ('content' in templateElement) {
      elementToClone = templateElement.content.querySelector('.review');
    } else {
      elementToClone = templateElement.querySelector('.review');
    }
  }
  /**
    * Клонирует элемент из шаблона, подставляет данные из объекта на сервере
    * и рендерит элемент в указанный блок.
    * @param {Object} data
    * @param {HTMLElement} container
    */
  var cloneAndRenderReviewElements = function(data, container) {
    var element = elementToClone.cloneNode(true);
    element.querySelector('.review-text').textContent = data.description;
    element.querySelector('.review-rating').textContent = data.rating;
    container.appendChild(element);
    setImageParameters(data, element);
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
    cloneAndRenderReviewElements(review, reviewsContainer);
  });

  reviewsFilterBlock.classList.remove(INVISIBLE);
})();
