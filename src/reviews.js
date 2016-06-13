'use strict';

(function() {
  var reviewsFilterBlock = document.querySelector('.reviews-filter');
  var elementToClone = getTemplate();
  var reviewsContainer = document.querySelector('.reviews-list');
  var CLASS_INVISIBLE = 'invisible';

  reviewsFilterBlock.classList.add(CLASS_INVISIBLE);

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
    return result;
  }

  /**
    * Клонирует элемент из шаблона, подставляет данные из объекта на сервере.
    * @param {Object} data
    */
  var cloneReviewElement = function(data) {
    var element = elementToClone.cloneNode(true);
    var rating = element.querySelector('.review-rating');
    element.querySelector('.review-text').textContent = data.description;

    switch (data.rating) {
      case 1:
        break;
      case 2:
        rating.classList.add('review-rating-two');
        break;
      case 3:
        rating.classList.add('review-rating-three');
        break;
      case 4:
        rating.classList.add('review-rating-fore');
        break;
      case 5:
        rating.classList.add('review-rating-five');
        break;
    }

    setImageParameters(data, element);
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

  /**
    * Определяет адрес, где расположен JSONP-скрипт и получает объект.
    * @param {string} url
    * @param {function} callback
    */
  function getReviews(url, callback) {
    var loadedReviews = [];
    window.__reviewsLoadCallback = function(data) {
      loadedReviews = data;
      callback(loadedReviews);
    };
    createScript(url);
  }

  /**
    * Создаёт тег, подключающий JSONP-скрипт.
    */
  function createScript(url) {
    var mainScript = document.querySelector('.main-js');
    var script = document.createElement('script');
    script.src = url;
    document.body.insertBefore(script, mainScript);
  }

  var renderReviews = function(reviews) {
    reviews.forEach(function(review) {
      reviewsContainer.appendChild(cloneReviewElement(review));
    });
  };

  function loadReviewsCallback(loadedReviews) {
    var reviews = loadedReviews;
    renderReviews(reviews);
  }

  getReviews('//up.htmlacademy.ru/assets/js_intensive/jsonp/reviews.js', loadReviewsCallback)
  reviewsFilterBlock.classList.remove(CLASS_INVISIBLE);
})();
