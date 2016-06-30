'use strict';

define(['./variables', './reviews'], function(variables, reviews) {

  return {
    /**
      * Передаёт отфильтрованный массив в ф-цию renderReviews и вызывает её.
      * @param {string} filter
      */
    setFilterActive: function(filter) {
      reviews.filteredReviews = getFilteredReviews(reviews.get(), filter);
      localStorage.setItem('reviews-filter-id', filter);
      variables.moreReviewsButton.classList.remove(variables.CLASS_INVISIBLE);
      reviews.currentOffset = 0;
      reviews.renderReviews(reviews.filteredReviews, reviews.currentOffset, true);
    },

    /**
      * Навешивает обработчиики кликов на кнопки блока фильтра.
      */
    setFiltersActive: function() {
      var filters = variables.reviewsFilterBlock.elements['reviews'];
      var reviewsFilterLabels = document.querySelectorAll('.reviews-filter-item');

      variables.reviewsFilterBlock.addEventListener('click', function(evt) {
        if (evt.target.name === 'reviews') {
          this.setFilterActive(evt.target.id);
        }
      }.bind(this));

      for (var i = 0; i < filters.length; i++) {
        var reviewsQuantity = setSupFilter(reviews.get(), filters[i].id, reviewsFilterLabels[i]);
        if (!reviewsQuantity.length) {
          filters[i].setAttribute('disabled', 'disabled');
          reviewsFilterLabels[i].classList.add('disabled');
        }
        if (filters[i].id === variables.DEFAULT_FILTER) {
          filters[i].setAttribute('checked', 'checked');
        }
      }
    }
  };

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
      case variables.FILTER.ALL:
        break;

      case variables.FILTER.RECENT:
        /** @constant {number} */
        var FOUR_DAYS = 4 * 24 * 60 * 60 * 1000;
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return Date.now() + Date.parse(review.date) < FOUR_DAYS;
        }).sort(function(a, b) {
          return Date.parse(b.date) - Date.parse(a.date);
        });
        break;

      case variables.FILTER.GOOD:
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return review.rating > 2;
        }).sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;

      case variables.FILTER.BAD:
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return review.rating < 3;
        }).sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;

      case variables.FILTER.POPULAR:
        preFilteredReviews.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
    }

    return preFilteredReviews;
  }
});
