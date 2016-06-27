'use strict';

define(['./utils'], function(utils) {

  var galleryContainer = document.querySelector('.overlay-gallery');
  var closeElement = galleryContainer.querySelector('.overlay-gallery-close');
  var galleryControlsBlock = galleryContainer.querySelector('.overlay-gallery-controls');
  var currentNumber = galleryControlsBlock.querySelector('.preview-number-current');
  var totalNumber = galleryControlsBlock.querySelector('.preview-number-total');
  var galleryPreview = galleryControlsBlock.querySelector('.overlay-gallery-preview');
  var galleryControlLeft = galleryControlsBlock.querySelector('.overlay-gallery-control-left');
  var galleryControlRight = galleryControlsBlock.querySelector('.overlay-gallery-control-right');
  var pictureElement;
  /** @type {Array.<string>} */
  var galleryPictures = [];
  /** @type {number} */
  var activePicture = 0;

  /**
    * @param {click} evt
    */
  function _onCloseClick(evt) {
    evt.preventDefault();
    hideGallery();
  }

  /**
    * @param {click} evt
    */
  function _onRightClick(evt) {
    evt.preventDefault();
    var nextNumber = activePicture + 1;
    showPicture(nextNumber);
  }

  /**
    * @param {click} evt
    */
  function _onLeftClick(evt) {
    evt.preventDefault();
    var previousNumber = activePicture - 1;
    showPicture(previousNumber);
  }

  /**
    * @param {KeyboardEvent} evt
    */
  function _onCloseKeydown(evt) {
    if (utils.isActivationEvent(evt)) {
      evt.preventDefault();
      hideGallery();
    }
  }

  /**
    * @param {KeyboardEvent} evt
    */
  function _onDocumentKeyDown(evt) {
    if (utils.isDeactivationEvent(evt)) {
      evt.preventDefault();
      hideGallery();
    }
  }

  /**
    * Прячет галлерею и удаляет все обработчики
    */
  function hideGallery() {
    galleryContainer.classList.add('invisible');

    document.removeEventListener('keydown', _onDocumentKeyDown);
    closeElement.removeEventListener('click', _onCloseClick);
    closeElement.removeEventListener('keydown', _onCloseKeydown);
    galleryControlRight.removeEventListener('click', _onRightClick);
    galleryControlLeft.removeEventListener('click', _onLeftClick);
  }

  /**
    * показывыет картинку по ее индексу в массиве
    * @param  {number} pictureNumber.
    */
  function showPicture(pictureNumber) {
    if (pictureNumber >= 0 && pictureNumber < galleryPictures.length) {
      activePicture = pictureNumber;
      currentNumber.innerHTML = pictureNumber + 1;

      if (galleryPreview.querySelector('img')) {
        galleryPreview.removeChild(galleryPreview.querySelector('img'));
      }

      pictureElement = new Image();
      galleryPreview.appendChild(pictureElement);
      pictureElement.src = galleryPictures[pictureNumber];
    }
  }

  return {
    /**
      * Показывает галлерею. Навешивает обработчики
      * @param {number} pictureNumber
      */
    showGallery: function(pictureNumber) {
      totalNumber.innerHTML = galleryPictures.length;
      galleryContainer.classList.remove('invisible');

      document.addEventListener('keydown', _onDocumentKeyDown);
      closeElement.addEventListener('click', _onCloseClick);
      closeElement.addEventListener('keydown', _onCloseKeydown);
      galleryControlRight.addEventListener('click', _onRightClick);
      galleryControlLeft.addEventListener('click', _onLeftClick);

      showPicture(pictureNumber);
    },

    /**
      * Записывает в переменную galleryPictures массив с url фотографий.
      * @param {Array} array
      */
    set: function(array) {
      for (var i = 0; i < array.length; i++) {
        galleryPictures.push(array[i].src);
      }
    },

    /**
      * Возвращает значение galleryPictures при вызове.
      * @return {Array}
      */
    get: function() {
      return galleryPictures;
    }
  };
});

