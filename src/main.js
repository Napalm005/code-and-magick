'use strict';

require(['./reviews', './filter', './variables', './gallery', './utils', './scroll', './form', './game', './templates', './scroll', './review', './base-component'], function(reviews, filter, variables, Gallery) {
  reviews.getReviews('//o0.github.io/assets/json/reviews.json', function(loadedReviews) {
    reviews.set(loadedReviews);
    filter.init();
    reviews.addMoreReviews();
  });

  var photoList = document.querySelectorAll('.photogallery-image img');
  var galleryContainer = document.querySelector('.overlay-gallery');
  var photogalleryContainer = document.querySelector('.photogallery');
  var galleryElement = new Gallery(galleryContainer);

  galleryElement.set(photoList);

  /**
    * Меняет запись в адрессной строке при клике на картинку галлереи.
    * @param {click} evt
    */
  function _onPictureClick(evt) {
    evt.preventDefault();
    if (evt.target.src) {
      var loc = getLocation(evt.target.src);
      location.hash = 'photo' + loc.pathname;
    }
  }
  photogalleryContainer.addEventListener('click', _onPictureClick);

  /**
    * Создаёт элемент-ссылку, чтобы потом взять у неё href без host-часть.
    * @param {string} href
    * @return {Element} temporaryElement
    */
  function getLocation(href) {
    var temporaryElement = document.createElement('a');
    temporaryElement.href = href;
    return temporaryElement;
  }
});
