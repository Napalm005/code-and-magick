'use strict';

define(function() {

  return {
    moreReviewsButton: document.querySelector('.reviews-controls-more'),
      /** @type {Array.<Object>} */
    filteredReviews: [],
    /** @type {Array.<Object>} */
    reviews: [],
    /** @type {number} */
    currentOffset: 0,
    /** @enum {string} */
    FILTER: {
      'ALL': 'reviews-all',
      'RECENT': 'reviews-recent',
      'GOOD': 'reviews-good',
      'BAD': 'reviews-bad',
      'POPULAR': 'reviews-popular'
    },
    ratingClasses: [
      'review-rating',
      'review-rating-two',
      'review-rating-three',
      'review-rating-four',
      'review-rating-five'
    ],
    reviewsContainer: document.querySelector('.reviews-list'),
    reviewsFilterBlock: document.querySelector('.reviews-filter'),
    /** @constant {Filter} */
    DEFAULT_FILTER: this.FILTER.ALL,
    /** @constant {number} */
    LOAD_TIMEOUT: 5000,
    /** @constant {string} */
    CLASS_INVISIBLE: 'invisible',
    /** @constant {string} */
    CLASS_REVIEWS_SECTION_FAILURE: 'reviews-load-failure',
    /** @constant {string} */
    CLASS_REVIEWS_SECTION_LOADING: 'reviews-list-loading',
    /** @constant {number} */
    LIMIT: 3
  };
})();

