'use strict';

define(['./utils'], function(utils) {

  /**
    * @param {HTMLElement} galleryContainer
    * @constructor
    */
  function Gallery(galleryContainer) {
    var self = this;
    var closeElement = galleryContainer.querySelector('.overlay-gallery-close');
    var galleryControlsBlock = galleryContainer.querySelector('.overlay-gallery-controls');
    var currentIndex = galleryControlsBlock.querySelector('.preview-number-current');
    var totalIndex = galleryControlsBlock.querySelector('.preview-number-total');
    var galleryPreview = galleryControlsBlock.querySelector('.overlay-gallery-preview');
    var galleryControlLeft = galleryControlsBlock.querySelector('.overlay-gallery-control-left');
    var galleryControlRight = galleryControlsBlock.querySelector('.overlay-gallery-control-right');
    /** @type {Array.<string>} */
    var galleryPictures = [];
    /** @type {number} */
    var activePicture = 0;
    var pictureIndex = 0;


    /**
      * @param {click} evt
      */
    function _onCloseClick(evt) {
      evt.preventDefault();
      _hideGallery();
    }

    /**
      * @param {click} evt
      */
    function _onRightClick(evt) {
      evt.preventDefault();
      if (activePicture === galleryPictures.length - 1) {
        var nextIndex = 0;
      } else {
        nextIndex = activePicture + 1;
      }
      _showPicture(nextIndex);
    }

    /**
      * @param {click} evt
      */
    function _onLeftClick(evt) {
      evt.preventDefault();
      if (activePicture === 0) {
        var previousIndex = galleryPictures.length - 1;
      } else {
        previousIndex = activePicture - 1;
      }
      _showPicture(previousIndex);
    }

    /**
      * @param {KeyboardEvent} evt
      */
    function _onCloseKeydown(evt) {
      if (utils.isActivationEvent(evt)) {
        evt.preventDefault();
        _hideGallery();
      }
    }

    /**
      * @param {KeyboardEvent} evt
      */
    function _onDocumentKeyDown(evt) {
      if (utils.isDeactivationEvent(evt)) {
        evt.preventDefault();
        _hideGallery();
      }
    }

    /**
      * Прячет галлерею и удаляет все обработчики
      */
    function _hideGallery() {
      galleryContainer.classList.add('invisible');

      document.removeEventListener('keydown', _onDocumentKeyDown);
      closeElement.removeEventListener('click', _onCloseClick);
      closeElement.removeEventListener('keydown', _onCloseKeydown);
      galleryControlRight.removeEventListener('click', _onRightClick);
      galleryControlLeft.removeEventListener('click', _onLeftClick);
    }

    /**
      * показывыет картинку по ее индексу в массиве
      * @param  {number} index.
      */
    function _showPicture(index) {
      if (index >= 0 && index < galleryPictures.length) {
        activePicture = index;
        currentIndex.innerHTML = index + 1;

        if (galleryPreview.querySelector('img')) {
          galleryPreview.removeChild(galleryPreview.querySelector('img'));
        }

        var pictureElement = new Image();
        galleryPreview.appendChild(pictureElement);
        pictureElement.src = galleryPictures[index];
      }
    }


    /**
      * Определяет индекс элемента, по которому кликнули
      * @param {click} evt.
      */
    function _getIndex(evt) {
      for (var i = 0; i < galleryPictures.length; i++) {
        if (galleryPictures[i] === evt.target.src) {
          pictureIndex = i;
        }
      }
      return pictureIndex;
    }

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
      * @param {click} evt
      */
    self.showGallery = function(evt) {
      pictureIndex = _getIndex(evt);

      totalIndex.innerHTML = galleryPictures.length;
      galleryContainer.classList.remove('invisible');

      document.addEventListener('keydown', _onDocumentKeyDown);
      closeElement.addEventListener('click', _onCloseClick);
      closeElement.addEventListener('keydown', _onCloseKeydown);
      galleryControlRight.addEventListener('click', _onRightClick);
      galleryControlLeft.addEventListener('click', _onLeftClick);

      _showPicture(pictureIndex);
    };
  }

  return Gallery;
});

