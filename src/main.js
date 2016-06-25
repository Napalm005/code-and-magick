'use strict';

require(['./reviews', './filter', './variables', './utils', './scroll', './form', './game', './templates', './scroll'], function(reviews, filter, variables) {

  reviews.getReviews('//o0.github.io/assets/json/reviews.json', function(loadedReviews) {
    reviews.reviewsArray = loadedReviews;
    filter.setFiltersActive();
    filter.setFilterActive(variables.DEFAULT_FILTER);
    reviews.addMoreReviews();
  });
});
