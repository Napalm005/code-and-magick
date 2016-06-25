'use strict';

define(function() {


  function Variables() {
    var self = this;

    self.moreReviewsButton = document.querySelector('.reviews-controls-more');
    /** @enum {string} */
    self.FILTER = {
      'ALL': 'reviews-all',
      'RECENT': 'reviews-recent',
      'GOOD': 'reviews-good',
      'BAD': 'reviews-bad',
      'POPULAR': 'reviews-popular'
    };
    self.ratingClasses = [
      'review-rating',
      'review-rating-two',
      'review-rating-three',
      'review-rating-four',
      'review-rating-five'
    ];
    self.reviewsContainer = document.querySelector('.reviews-list');
    self.reviewsFilterBlock = document.querySelector('.reviews-filter');
    /** @constant {Filter} */
    self.DEFAULT_FILTER = self.FILTER.ALL;
    /** @constant {number} */
    self.LOAD_TIMEOUT = 5000;
    /** @constant {string} */
    self.CLASS_INVISIBLE = 'invisible';
    /** @constant {string} */
    self.CLASS_REVIEWS_SECTION_FAILURE = 'reviews-load-failure';
    /** @constant {string} */
    self.CLASS_REVIEWS_SECTION_LOADING = 'reviews-list-loading';
  }

  return new Variables();
});

