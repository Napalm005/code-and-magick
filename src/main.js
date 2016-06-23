'use strict';

require(['./load', './filter', './utils'], function() {
  reviewsFilterBlock.classList.add(CLASS_INVISIBLE);
  reviewsFilterBlock.classList.remove(CLASS_INVISIBLE);

  getReviews('//o0.github.io/assets/json/reviews.json', function(loadedReviews) {
    reviews = loadedReviews;
    setFiltersActive();
    setFilterActive(DEFAULT_FILTER);
    addMoreReviews();
  });
});

