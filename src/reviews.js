'use strict';

(function() {
  /** @type {Array.<Object>} */
  var reviews = [];
  /** @enum {string} */
  var FILTER = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular'
  };
  var ratingClasses = [
    'review-rating',
    'review-rating-two',
    'review-rating-three',
    'review-rating-four',
    'review-rating-five'
  ];
  var reviewsContainer = document.querySelector('.reviews-list');
  var reviewsFilterBlock = document.querySelector('.reviews-filter');
  /** @constant {Filter} */
  var DEFAULT_FILTER = FILTER.ALL;
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
    reviews = loadedReviews;
    setFiltersActive();
    setFilterActive(DEFAULT_FILTER);
  });

  /**
    * Возвращает отфильтрованный и отсортированный массив.
    * @param {array} reviewsList
    * @param {string} filter
    * return {object} reviewsToFilter
    */
  function getFilteredReviews(reviewsList, filter) {
    var reviewsToFilter = reviewsList.slice(0);

    switch (filter) {
      case FILTER.ALL:
        var preFilteredReviews = reviewsToFilter;
        if (preFilteredReviews !== {}) {
          return preFilteredReviews;
        } else {
          console.log('Ни одного отзыва не найдено');
        }
        break;

      case FILTER.RECENT:
        /** @constant {number} */
        var FOUR_DAYS = 4 * 24 * 60 * 60 * 1000;
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return Date.now() - Date.parse(review.date) < FOUR_DAYS;
        });
        if (preFilteredReviews !== {}) {
          preFilteredReviews.sort(function(a, b) {
            return Date.parse(b.date) - Date.parse(a.date);
          }); } else {
          console.log('Ни одного отзыва не найдено');
        }
        break;

      case FILTER.GOOD:
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return review.rating > 2;
        });
        if (preFilteredReviews !== {}) {
          preFilteredReviews.sort(function(a, b) {
            return b.rating - a.rating;
          }); } else {
          console.log('Ни одного отзыва не найдено');
        }
        break;

      case FILTER.BAD:
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return review.rating < 3;
        });
        if (preFilteredReviews !== {}) {
          preFilteredReviews.sort(function(a, b) {
            return a.rating - b.rating;
          }); } else {
          console.log('Ни одного отзыва не найдено');
        }
        break;

      case FILTER.POPULAR:
        preFilteredReviews = reviewsToFilter;
        if (preFilteredReviews !== {}) {
          preFilteredReviews.sort(function(a, b) {
            return b.review_usefulness - a.review_usefulness;
          }); } else {
          console.log('Ни одного отзыва не найдено');
        }
        break;
    }
    return preFilteredReviews;
  }

  /**
    * Передаёт отфильтрованный массив в ф-цию renderReviews и вызывает её.
    * @param {string} filter
    */
  function setFilterActive(filter) {
    var filteredReviews = getFilteredReviews(reviews, filter);
    renderReviews(filteredReviews);
  }

  /**
    * Навешивает обработчиики кликов на кнопки блока фильтра.
    */
  function setFiltersActive() {
    var filters = reviewsFilterBlock.elements['reviews'];
    for (var i = 0; i < filters.length; i++) {
      filters[i].onclick = function() {
        setFilterActive(this.id);
      };
    }
  }

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

    xhr.onloadstart = function() {
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
    * @param {array} reviewsList
    */
  function renderReviews(reviewsList) {
    reviewsContainer.innerHTML = '';
    reviewsList.forEach(function(review) {
      reviewsContainer.appendChild(cloneReviewElement(review));
    });
  }
})();
