'use strict';

require(['./reviews', './filter', './variables', './gallery', './utils', './scroll', './form', './game', './templates', './scroll'], function(reviews, filter, variables, gallery) {
  reviews.getReviews('//o0.github.io/assets/json/reviews.json', function(loadedReviews) {
    reviews.set(loadedReviews);
    filter.setFiltersActive();
    filter.setFilterActive(variables.DEFAULT_FILTER);
    reviews.addMoreReviews();
  });

  var photoList = document.querySelectorAll('.photogallery-image img');
  var galleryContainer = document.querySelector('.overlay-gallery');

  var galleryElement = new gallery(galleryContainer);
  galleryElement.set(photoList);

  galleryElement.showGallery();
});
