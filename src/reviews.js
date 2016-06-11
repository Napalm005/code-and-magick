'use strict';

(function() {
  var reviewsFilterBlock = document.querySelector('.reviews-filter');
  var templateElement = document.querySelector('template');
  var elementToClone;
  var invisible = 'invisible';

  reviewsFilterBlock.classList.add(invisible);

  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 5000;

  /**
    * Клонирует элемент из шаблона, подставляет данные из объекта на сервере
    * и рендерит элемент в указанный блок.
    * @param {Object} data
    * @param {HTMLElement} container
    * @return {HTMLElement}
    */
  var getHotelElement = function(data, container) {
    var element = elementToClone.cloneNode(true);
    element.querySelector('.review-text').textContent = data.description;
    element.querySelector('.review-rating').textContent = data.rating;
    container.appendChild(element);

    var image = new Image(124, 124);
    var imageLoadTimeout;

    image.onload = function() {
      clearTimeout(imageLoadTimeout);
      element.querySelector('.review-author').src = image.src;
      element.querySelector('.review-author').width = image.width;
      element.querySelector('.review-author').height = image.height;
    };

    image.onerror = function() {
      element.classList.add('review-load-failure');
    };

    image.src = data.author.picture;

    imageLoadTimeout = setTimeout(function() {
      image.src = '';
      element.classList.add('review-load-failure');
    }, IMAGE_LOAD_TIMEOUT);

    return element;
  };


  window.reviews.forEach(function(review) {
    var reviewsContainer = document.querySelector('.reviews-list');
    getHotelElement(review, reviewsContainer);
  });

  reviewsFilterBlock.classList.remove(invisible);
})();
