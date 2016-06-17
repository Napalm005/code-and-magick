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
  var LOAD_TIMEOUT = 5000;
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
    * Добывляет теги sup, в которых записано количество найденных отзывов.
    * @param {array} reviewsList
    * @param {string} filter
    * @param {object} reviewsFilterLabels
    */
  function setSupFilter(reviewsList, filter, reviewsFilterLabels) {
    var reviewsToFilter = reviewsList.slice(0);
    var preFilteredReviews = reviewsToFilter;
    var sup = document.createElement('sup');

    switch (filter) {
      case FILTER.ALL:
        setSupElement(reviewsFilterLabels);
        break;

      case FILTER.RECENT:
        /** @constant {number} */
        var FOUR_DAYS = 4 * 24 * 60 * 60 * 1000;
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return Date.now() + Date.parse(review.date) < FOUR_DAYS;
        }).sort(function(a, b) {
          return Date.parse(b.date) - Date.parse(a.date);
        });
        setSupElement(reviewsFilterLabels);
        break;

      case FILTER.GOOD:
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return review.rating > 2;
        }).sort(function(a, b) {
          return b.rating - a.rating;
        });
        setSupElement(reviewsFilterLabels);
        break;

      case FILTER.BAD:
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return review.rating < 3;
        }).sort(function(a, b) {
          return a.rating - b.rating;
        });
        setSupElement(reviewsFilterLabels);
        break;

      case FILTER.POPULAR:
        preFilteredReviews.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        setSupElement(reviewsFilterLabels);
        break;
    }

    /**
      * Создаёт тег sup.
      * @param {object} reviewsFilterLabelsList
      */
    function setSupElement(reviewsFilterLabelsList) {
      var supText = document.createTextNode('(' + preFilteredReviews.length + ')');
      sup.appendChild(supText);
      reviewsFilterLabelsList.appendChild(sup);
    }
  }


  /**
    * Возвращает отфильтрованный и отсортированный массив.
    * @param {array} reviewsList
    * @param {string} filter
    * return {object} reviewsToFilter
    */
  function getFilteredReviews(reviewsList, filter) {
    var reviewsToFilter = reviewsList.slice(0);
    var preFilteredReviews = reviewsToFilter;

    switch (filter) {
      case FILTER.ALL:
        break;

      case FILTER.RECENT:
        /** @constant {number} */
        var FOUR_DAYS = 4 * 24 * 60 * 60 * 1000;
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return Date.now() + Date.parse(review.date) < FOUR_DAYS;
        }).sort(function(a, b) {
          return Date.parse(b.date) - Date.parse(a.date);
        });
        break;

      case FILTER.GOOD:
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return review.rating > 2;
        }).sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;

      case FILTER.BAD:
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return review.rating < 3;
        }).sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;

      case FILTER.POPULAR:
        preFilteredReviews.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
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
    var reviewsFilterLabels = document.querySelectorAll('.reviews-filter-item');
    for (var i = 0; i < filters.length; i++) {
      setSupFilter(reviews, filters[i].id, reviewsFilterLabels[i]);
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
    * Проверяет поддержку элемента template и получает в нём контент.
    * return {object} result
    */
  function getTemplateEmpty() {
    var templateElementEmpty = document.querySelector('#review-empty-template');
    var result;

    if ('content' in templateElementEmpty) {
      result = templateElementEmpty.content.querySelector('.review-empty');
    } else {
      result = templateElementEmpty.querySelector('.review-empty');
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
    * Клонирует элемент из шаблона, подставляет данные из объекта на сервере.
    */
  function cloneReviewElementEmpty() {
    var elementEmptyToClone = getTemplateEmpty();
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

  /**
    * Определяет адрес, где расположен JSONP-скрипт и получает объект.
    * @param {string} url
    * @param {function} callback
    */
  function getReviews(url, callback) {
    var xhr = new XMLHttpRequest();

    /** @param {ProgressEvent} */
    xhr.onload = function(evt) {
      if ( (this.status === 200) && (this.readyState === 4) ) {
        reviewsContainer.classList.remove(CLASS_REVIEWS_SECTION_LOADING);
        var loadedData = JSON.parse(evt.target.response);
        callback(loadedData);
      } else {
        addErrorClass();
      }
    };

    xhr.onloadstart = function() {
      reviewsContainer.classList.add(CLASS_REVIEWS_SECTION_LOADING);
    };

    xhr.onerror = function() {
      addErrorClass();
    };

    xhr.timeout = LOAD_TIMEOUT;
    xhr.ontimeout = function() {
      addErrorClass();
    };

    xhr.open('GET', url);
    xhr.send();
  }

  /**
    * Добавляется класс со стилем ошибки.
    */
  function addErrorClass() {
    reviewsContainer.classList.remove(CLASS_REVIEWS_SECTION_LOADING);
    reviewsContainer.classList.add(CLASS_REVIEWS_SECTION_FAILURE);
  }

  /**
    * Отрисовывает блоки с отзывами на странице.
    * @param {array} reviewsList
    */
  function renderReviews(reviewsList) {
    reviewsContainer.innerHTML = '';
    if (reviewsList.length) {
      reviewsList.forEach(function(review) {
        reviewsContainer.appendChild(cloneReviewElement(review));
      }); } else {
      reviewsContainer.appendChild(cloneReviewElementEmpty());
    }
  }
})();
