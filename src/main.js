'use strict';

require(['./reviews', './filter', './variables', './gallery', './utils', './scroll', './form', './game', './templates', './scroll'], function(reviews, filter, variables, gallery, utils) {
  reviews.getReviews('//o0.github.io/assets/json/reviews.json', function(loadedReviews) {
    reviews.set(loadedReviews);
    filter.setFiltersActive();
    filter.setFilterActive(variables.DEFAULT_FILTER);
    reviews.addMoreReviews();
  });

  var photogalleryContainer = document.querySelector('.photogallery');
  var photoList = photogalleryContainer.getElementsByTagName('img');

  gallery.set(photoList);

  photogalleryContainer.addEventListener('click', function(evt) {
    if (evt.target.tagName === 'IMG') {
      gallery.showGallery(gallery.get());
    }
  });

  photogalleryContainer.addEventListener('keydown', function(evt) {
      if (utils.isActivationEvent(evt)) {
        if (evt.target.className === 'photogallery-image') {
          evt.preventDefault();
          gallery.showGallery(gallery.get());
        }
      }
    });
});
