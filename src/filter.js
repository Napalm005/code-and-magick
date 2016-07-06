'use strict';

define(['./variables', './reviews'], function(variables, reviews) {


  return {
    currentFilter: localStorage.getItem('reviews-filter-id') || variables.DEFAULT_FILTER,

    init: function() {
      this.setFiltersActive();
      this.setFilterActive(this.currentFilter);
      var filterElement = document.getElementById(this.currentFilter);
      filterElement.setAttribute('checked', 'checked');
    },

    /**
      * Передаёт отфильтрованный массив в ф-цию renderReviews и вызывает её.
      * @param {string} filter
      */
    setFilterActive: function(filter) {
      this.currentFilter = filter;
      reviews.filteredReviews = getFilteredReviews(reviews.get(), this.currentFilter);
      localStorage.setItem('reviews-filter-id', this.currentFilter);
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
      }
    }
  };

  /**
    * Добывляет теги sup, в которых записано количество найденных отзывов.
    * @param {Array.<ReviewModel>} reviewsList
    * @param {string} filter
    * @param {HTMLElement} reviewsFilterLabel
    * return {Array.<ReviewModel>} afterFilteringReviews
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
    * @param {Array.<ReviewModel>} reviewsList
    * @param {string} filter
    * return {Array.<ReviewModel>} preFilteredReviews
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
          return Date.now() + Date.parse(review.getDate()) < FOUR_DAYS;
        }).sort(function(a, b) {
          return Date.parse(b.getDate()) - Date.parse(a.getDate());
        });
        break;

      case variables.FILTER.GOOD:
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return review.getRating() > 2;
        }).sort(function(a, b) {
          return b.getRating() - a.getRating();
        });
        break;

      case variables.FILTER.BAD:
        preFilteredReviews = reviewsToFilter.filter(function(review) {
          return review.getRating() < 3;
        }).sort(function(a, b) {
          return a.getRating() - b.getRating();
        });
        break;

      case variables.FILTER.POPULAR:
        preFilteredReviews.sort(function(a, b) {
          return b.getReviewUsefulness() - a.getReviewUsefulness();
        });
        break;
    }

    return preFilteredReviews;
  }
});
