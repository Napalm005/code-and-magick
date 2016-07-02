'use strict';

define(['./utils'], function(utils) {

  /**
    * Конструктор объекта Gallery. Управляет поведением элемента-галлереи, объявленного в параметре galleryContainer.
    * Принимать на вход массив объектов, описывающих фотографии, и сохранять их.
    * Добавляет обработчики событий на блок галереи.
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
      if (activePicture === galleryPictures.length) {
        var nextIndex = 1;
      } else {
        nextIndex = activePicture + 1;
      }
      location.hash = 'photo/img/screenshots/' + nextIndex + '.png';
    }

    /**
      * @param {click} evt
      */
    function _onLeftClick(evt) {
      evt.preventDefault();
      if (activePicture === 1) {
        var previousIndex = galleryPictures.length;
      } else {
        previousIndex = activePicture - 1;
      }
      location.hash = 'photo/img/screenshots/' + previousIndex + '.png';
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
      * Прячет галлерею и удаляет все обработчики.
      */
    function _hideGallery() {
      galleryContainer.classList.add('invisible');

      document.removeEventListener('keydown', _onDocumentKeyDown);
      closeElement.removeEventListener('click', _onCloseClick);
      closeElement.removeEventListener('keydown', _onCloseKeydown);
      galleryControlRight.removeEventListener('click', _onRightClick);
      galleryControlLeft.removeEventListener('click', _onLeftClick);
      location.hash = '';
    }

    /**
      * показывыет картинку по ее индексу в массиве.
      * @param  {number} index.
      */
    function _showPicture(index, hash) {
      if (index >= 1 && index <= galleryPictures.length) {
        activePicture = index;
        currentIndex.innerHTML = index;

        if (galleryPreview.querySelector('img')) {
          galleryPreview.removeChild(galleryPreview.querySelector('img'));
        }

        var pictureElement = new Image();
        galleryPreview.appendChild(pictureElement);
        pictureElement.src = location.origin + '/' + hash;
      }
    }

    /**
      * Определяет индекс элемента, по которому кликнули.
      * @param {string} hash.
      */
    function _getIndex(hash) {
      var arr = hash.split('/');
      var str = arr.slice(-1).join('');
      arr = str.split('');
      return Number(arr.slice(0, 1).join(''));
    }

    /**
      * Записывает в переменную galleryPictures массив из url фотографий.
      * @param {Array} array
      */
    self.set = function(array) {
      for (var i = 0; i < array.length; i++) {
        galleryPictures.push(array[i].src);
      }
      restoreFromHash();
    };

    /**
      * Показывает галлерею. Навешивает обработчики.
      * @param {click} evt
      */
    self.showGallery = function(hash) {
      var pictureIndex = 0;
      pictureIndex = _getIndex(hash);

      totalIndex.innerHTML = galleryPictures.length;
      galleryContainer.classList.remove('invisible');

      document.addEventListener('keydown', _onDocumentKeyDown);
      closeElement.addEventListener('click', _onCloseClick);
      closeElement.addEventListener('keydown', _onCloseKeydown);
      galleryControlRight.addEventListener('click', _onRightClick);
      galleryControlLeft.addEventListener('click', _onLeftClick);

      _showPicture(pictureIndex, hash);
    };

    function _onhashchange() {
      restoreFromHash();
    }

    function restoreFromHash() {
      if (location.hash) {
        var hash = location.hash.match(/#photo\/(\S+)/);
        self.showGallery(hash[1]);
      }
    }

    window.addEventListener('hashchange', _onhashchange);
  }

  return Gallery;
});

