'use strict';

define(function() {

  function Variables() {
    this.moreReviewsButton = document.querySelector('.reviews-controls-more');
    /** @type {Array.<Object>} */
    this.filteredReviews = [];
    /** @type {Array.<Object>} */
    this.reviews = [];
    /** @type {number} */
    this.currentOffset = 0;
    /** @enum {string} */
    this.FILTER = {
      'ALL': 'reviews-all',
      'RECENT': 'reviews-recent',
      'GOOD': 'reviews-good',
      'BAD': 'reviews-bad',
      'POPULAR': 'reviews-popular'
    };
    this.ratingClasses = [
      'review-rating',
      'review-rating-two',
      'review-rating-three',
      'review-rating-four',
      'review-rating-five'
    ];
    this.reviewsContainer = document.querySelector('.reviews-list');
    this.reviewsFilterBlock = document.querySelector('.reviews-filter');
    /** @constant {Filter} */
    this.DEFAULT_FILTER = this.FILTER.ALL;
    /** @constant {number} */
    this.LOAD_TIMEOUT = 5000;
    /** @constant {string} */
    this.CLASS_INVISIBLE = 'invisible';
    /** @constant {string} */
    this.CLASS_REVIEWS_SECTION_FAILURE = 'reviews-load-failure';
    /** @constant {string} */
    this.CLASS_REVIEWS_SECTION_LOADING = 'reviews-list-loading';
    /** @constant {number} */
    this.LIMIT = 3;
  }

  return new Variables();
});

