'use strict';

require(['./load', './filter', './utils', './scroll', './variables', './form', './game', './get-review-element', './render-reviews', './scroll'], function(load, filter, utils, scroll, variables) {
  variables.reviewsFilterBlock.classList.add(variables.CLASS_INVISIBLE);
  variables.reviewsFilterBlock.classList.remove(variables.CLASS_INVISIBLE);

  scroll.setScrollEnabled();

  load.getReviews('//o0.github.io/assets/json/reviews.json', function(loadedReviews) {
    variables.reviews = loadedReviews;
    filter.setFiltersActive();
    filter.setFilterActive(variables.DEFAULT_FILTER);
    utils.addMoreReviews();
  });
});

