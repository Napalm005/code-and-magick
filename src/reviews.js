'use strict';

(function() {
  var reviewsFilterBlock = document.querySelector('.reviews-filter');
  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 10000;
  /** @constant {string} */
  var CLASS_INVISIBLE = 'invisible';
  /** @constant {string} */
  var CLASS_REVIEWS_SECTION_FAILURE = 'reviews-load-failure';
  /** @constant {string} */
  var CLASS_REVIEWS_SECTION_LOADING = 'reviews-list-loading';

  reviewsFilterBlock.classList.add(CLASS_INVISIBLE);
  reviewsFilterBlock.classList.remove(CLASS_INVISIBLE);

  getReviews('//o0.github.io/assets/json/reviews.json', function(loadedReviews) {
    var reviews = loadedReviews;
    renderReviews(reviews);
  });

  /**
    * Проверяет поддержку элемента template и получает в нём контент.
    * return {object} result
    */
  function getTemplate() {
    var templateElement = document.querySelector('#review-template');
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
  function cloneReviewElement(data) {
    var ratingClasses = [
      'review-rating',
      'review-rating-two',
      'review-rating-three',
      'review-rating-four',
      'review-rating-five'
    ];
    var elementToClone = getTemplate();
    var element = elementToClone.cloneNode(true);
    var rating = element.querySelector('.review-rating');
    element.querySelector('.review-text').textContent = data.description;

    rating.classList.add(ratingClasses[data.rating - 1]);

    setImageParameters(data, element);
    return element;
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
    var reviewsSection = document.querySelector('.reviews');
    var xhr = new XMLHttpRequest();

    /** @param {ProgressEvent} */
    xhr.onload = function(evt) {
      reviewsSection.classList.remove(CLASS_REVIEWS_SECTION_LOADING);
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    };

    xhr.onprogress = function() {
      reviewsSection.classList.add(CLASS_REVIEWS_SECTION_LOADING);
    };

    xhr.onerror = function() {
      reviewsSection.classList.remove(CLASS_REVIEWS_SECTION_LOADING);
      reviewsSection.classList.add(CLASS_REVIEWS_SECTION_FAILURE);
    };

    xhr.timeout = IMAGE_LOAD_TIMEOUT;
    xhr.ontimeout = function() {
      reviewsSection.classList.remove(CLASS_REVIEWS_SECTION_LOADING);
      reviewsSection.classList.add(CLASS_REVIEWS_SECTION_FAILURE);
    };

    xhr.open('GET', url);
    xhr.send();
  }

  /**
    * Отрисовывает блоки с отзывами на странице.
    * @param {array} reviews
    */
  function renderReviews(reviews) {
    var reviewsContainer = document.querySelector('.reviews-list');
    reviews.forEach(function(review) {
      reviewsContainer.appendChild(cloneReviewElement(review));
    });
  }
})();
