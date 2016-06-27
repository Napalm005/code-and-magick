'use strict';

require(['./reviews', './filter', './variables', './gallery', './utils', './scroll', './form', './game', './templates', './scroll'], function(reviews, filter, variables, gallery, utils) {
  reviews.getReviews('//o0.github.io/assets/json/reviews.json', function(loadedReviews) {
    reviews.set(loadedReviews);
    filter.setFiltersActive();
    filter.setFilterActive(variables.DEFAULT_FILTER);
    reviews.addMoreReviews();
  });

  var galleryContainer = document.querySelector('.overlay-gallery');
  var photoList = document.getElementsByTagName('img');

  var gallery = new Gallery(galleryContainer);
  gallery.set(photoList);
});
