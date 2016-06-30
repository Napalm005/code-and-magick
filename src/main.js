'use strict';

require(['./reviews', './filter', './variables', './gallery', './utils', './scroll', './form', './game', './templates', './scroll', './review'], function(reviews, filter, variables, Gallery) {
  reviews.getReviews('//o0.github.io/assets/json/reviews.json', function(loadedReviews) {
    reviews.set(loadedReviews);
    filter.setFiltersActive();
    filter.setFilterActive(filter.currentFilter);
    reviews.addMoreReviews();
  });

  var photoList = document.querySelectorAll('.photogallery-image img');
  var galleryContainer = document.querySelector('.overlay-gallery');
  var photogalleryContainer = document.querySelector('.photogallery');
  var galleryElement = new Gallery(galleryContainer);

  galleryElement.set(photoList);

  /**
    * @param {click} evt
    */
  function _onPictureClick(evt) {
    evt.preventDefault();
    if (evt.target.src) {
      galleryElement.showGallery(evt);
    }
  }
  photogalleryContainer.addEventListener('click', _onPictureClick);
});
