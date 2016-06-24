'use strict';

require(['./variables', './utils', './load', './filter', './scroll', './form', './game', './get-review-element', './render-reviews', './scroll'], function(variables, utils, load, filter, scroll) {
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

