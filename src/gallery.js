'use strict';

define(['./utils'], function(utils) {

  function Gallery(galleryContainer) {

    var photogalleryContainer = document.querySelector('.photogallery');
    var closeElement = galleryContainer.querySelector('.overlay-gallery-close');
    var galleryControlsBlock = galleryContainer.querySelector('.overlay-gallery-controls');
    var currentIndex = galleryControlsBlock.querySelector('.preview-number-current');
    var totalIndex = galleryControlsBlock.querySelector('.preview-number-total');
    var galleryPreview = galleryControlsBlock.querySelector('.overlay-gallery-preview');
    var galleryControlLeft = galleryControlsBlock.querySelector('.overlay-gallery-control-left');
    var galleryControlRight = galleryControlsBlock.querySelector('.overlay-gallery-control-right');
    var pictureElement;
    /** @type {Array.<string>} */
    var galleryPictures = [];
    /** @type {number} */
    var activePicture = 0;

    var self = this;

    /**
      * @param {click} evt
      */
    self._onPictureClick = function(evt) {
      evt.preventDefault();
      if (evt.target.src) {
        for (var i = 0; i < galleryPictures.length; i++) {
          if (galleryPictures[i] === evt.target.src) {
            self.showGallery(i);
            break;
          }
        }
      }
    };

    /**
      * @param {click} evt
      */
    self._onCloseClick = function(evt) {
      evt.preventDefault();
      self._hideGallery();
    };

    /**
      * @param {click} evt
      */
    self._onRightClick = function(evt) {
      evt.preventDefault();
      if (activePicture === galleryPictures.length - 1) {
        var nextIndex = 0;
      } else {
        var nextIndex = activePicture + 1;
      }
      self._showPicture(nextIndex);
    };

    /**
      * @param {click} evt
      */
    self._onLeftClick = function(evt) {
      evt.preventDefault();
      if (activePicture === 0) {
        var nextIndex = galleryPictures.length - 1;
      } else {
        var nextIndex = activePicture - 1;
      }
      self._showPicture(previousIndex);
    };

    /**
      * @param {KeyboardEvent} evt
      */
    self._onCloseKeydown = function(evt) {
      if (utils.isActivationEvent(evt)) {
        evt.preventDefault();
        self._hideGallery();
      }
    };

    /**
      * @param {KeyboardEvent} evt
      */
    self._onDocumentKeyDown = function(evt) {
      if (utils.isDeactivationEvent(evt)) {
        evt.preventDefault();
        self._hideGallery();
      }
    };

    /**
      * Прячет галлерею и удаляет все обработчики
      */
    self._hideGallery = function() {
      galleryContainer.classList.add('invisible');

      document.removeEventListener('keydown', _onDocumentKeyDown);
      closeElement.removeEventListener('click', _onCloseClick);
      closeElement.removeEventListener('keydown', _onCloseKeydown);
      galleryControlRight.removeEventListener('click', _onRightClick);
      galleryControlLeft.removeEventListener('click', _onLeftClick);
    };

    /**
      * показывыет картинку по ее индексу в массиве
      * @param  {number} pictureIndex.
      */
    self._showPicture = function(pictureIndex) {
      if (pictureIndex >= 0 && pictureIndex < galleryPictures.length) {
        activePicture = pictureIndex;
        currentIndex.innerHTML = pictureIndex + 1;

        if (galleryPreview.querySelector('img')) {
          galleryPreview.removeChild(galleryPreview.querySelector('img'));
        }

        pictureElement = new Image();
        galleryPreview.appendChild(pictureElement);
        pictureElement.src = galleryPictures[pictureIndex];
      }
    };


    /**
      * Записывает в переменную galleryPictures массив из url фотографий.
      * @param {Array} array
      */
    self.set = function(array) {
      for (var i = 0; i < array.length; i++) {
        galleryPictures.push(array[i].src);
      }
    };

    /**
      * Показывает галлерею. Навешивает обработчики
      * @param {number} pictureNumber
      */
    self.showGallery = function(pictureIndex) {
      totalIndex.innerHTML = galleryPictures.length;
      galleryContainer.classList.remove('invisible');

      document.addEventListener('keydown', _onDocumentKeyDown);
      closeElement.addEventListener('click', _onCloseClick);
      closeElement.addEventListener('keydown', _onCloseKeydown);
      galleryControlRight.addEventListener('click', _onRightClick);
      galleryControlLeft.addEventListener('click', _onLeftClick);
      photogalleryContainer.addEventListener('click', _onPictureClick);

      self._showPicture(pictureIndex);
    };
  };

  return new Gallery();
});

