'use strict';

(function() {

  /**
    * Возвращает отфильтрованный и отсортированный массив.
    * @param {array} reviewsList
    * @param {string} filter
    * return {array} preFilteredReviews
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
    filteredReviews = getFilteredReviews(reviews, filter);
    moreReviewsButton.classList.remove(CLASS_INVISIBLE);
    currentOffset = 0;
    renderReviews(filteredReviews, currentOffset, true);
  }

  /**
    * Навешивает обработчиики кликов на кнопки блока фильтра.
    */
  function setFiltersActive() {
    var filters = reviewsFilterBlock.elements['reviews'];
    var reviewsFilterLabels = document.querySelectorAll('.reviews-filter-item');

    reviewsFilterBlock.addEventListener('click', function(evt) {
      if (evt.target.name === 'reviews') {
        setFilterActive(evt.target.id);
      }
    });

    for (var i = 0; i < filters.length; i++) {
      var reviewsQuantity = setSupFilter(reviews, filters[i].id, reviewsFilterLabels[i]);
      if (!reviewsQuantity.length) {
        filters[i].setAttribute('disabled', 'disabled');
        reviewsFilterLabels[i].classList.add('disabled');
      }
    }
  }

  /**
    * Добывляет теги sup, в которых записано количество найденных отзывов.
    * @param {array} reviewsList
    * @param {string} filter
    * @param {HTMLElement} reviewsFilterLabel
    * return {array} afterFilteringReviews
    */
  function setSupFilter(reviewsList, filter, reviewsFilterLabel) {
    var sup = document.createElement('sup');
    var afterFilteringReviews = getFilteredReviews(reviewsList, filter);
    setSupElement(reviewsFilterLabel);

    /**
      * Создаёт тег sup.
      * @param {HTMLElement} reviewsFilterLabel
      */
    function setSupElement(reviewsFilterLabelElement) {
      var supText = document.createTextNode('(' + afterFilteringReviews.length + ')');
      sup.appendChild(supText);
      reviewsFilterLabelElement.appendChild(sup);
    }

    return afterFilteringReviews;
  }
})();
