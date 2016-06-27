'use strict';

define(['./utils'], function(utils) {

  var galleryContainer = document.querySelector('.overlay-gallery');
  var closeElement = galleryContainer.querySelector('.overlay-gallery-close');
  var preview = galleryContainer.querySelector('.overlay-gallery-preview');

  var galleryControlsBlock = galleryContainer.querySelector('.overlay-gallery-controls');
  var currentNumber = galleryControlsBlock.querySelector('.preview-number-current');
  var totalNumber = galleryControlsBlock.querySelector('.preview-number-total');
  var galleryPreview = galleryControlsBlock.querySelector('.overlay-gallery-preview');


  /** @type {Array.<string>} */
  var galleryPictures = [];

  /** @type {number} */
  var activePicture = 0;


  /**
   * @param {KeyboardEvent} evt
   */
  var _onCloseClick = function(evt) {
    evt.preventDefault();
    hideGallery();
  };

  /**
   * @param {KeyboardEvent} evt
   */
  var _onCloseKeydown = function(evt) {
    if (utils.isActivationEvent(evt)) {
      evt.preventDefault();
      hideGallery();
    }
  };

  /**
   * @param {KeyboardEvent} evt
   */
  var _onDocumentKeyDown = function(evt) {
    if (utils.isDeactivationEvent(evt)) {
      evt.preventDefault();
      hideGallery();
    }
  };

  /**
   * @param {number} picture
   */
  var setActivePicture = function(picture) {
    galleryPreview.style.backgroundImage = 'url(\'' + galleryPictures[picture] + '\')';
    galleryPreview.style.backgroundSize = 'cover';
  };


  function hideGallery() {
    galleryContainer.classList.add('invisible');

    document.removeEventListener('keydown', _onDocumentKeyDown);
    closeElement.removeEventListener('click', _onCloseClick);
    closeElement.removeEventListener('keydown', _onCloseKeydown);
  }

  return {
    showGallery: function(pictures) {

      galleryContainer.classList.remove('invisible');

      document.addEventListener('keydown', _onDocumentKeyDown);
      closeElement.addEventListener('click', _onCloseClick);
      closeElement.addEventListener('keydown', _onCloseKeydown);

      setActivePicture(activePicture);
    },

    /**
      * Записывает в переменную galleryPictures массив с фотографиями.
      * @param {Array} array
      */
    set: function(array) {
      for (var i = 0; i < array.length; i++) {
        galleryPictures.push(array[i].getAttribute('src'))
      }
    },

    /**
      * Возвращает значение galleryPictures при вызове.
      * @return {Array}
      */
    get: function() {
      return galleryPictures;
    },
  }
});

