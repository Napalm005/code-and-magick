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
    this.closeElement = galleryContainer.querySelector('.overlay-gallery-close');
    var galleryControlsBlock = galleryContainer.querySelector('.overlay-gallery-controls');
    var totalIndex = galleryControlsBlock.querySelector('.preview-number-total');
    this.currentIndex = galleryControlsBlock.querySelector('.preview-number-current');
    this.galleryPreview = galleryControlsBlock.querySelector('.overlay-gallery-preview');
    this.galleryControlLeft = galleryControlsBlock.querySelector('.overlay-gallery-control-left');
    this.galleryControlRight = galleryControlsBlock.querySelector('.overlay-gallery-control-right');
    /** @type {Array.<string>} */
    this.galleryPictures = [];
    /** @type {number} */
    this.activePicture = 0;

    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onCloseKeydown = this._onCloseKeydown.bind(this);
    this._onRightClick = this._onRightClick.bind(this);
    this._onLeftClick = this._onLeftClick.bind(this);
    this._onhashchange = this._onhashchange.bind(this);
    this._restoreFromHash = this._restoreFromHash.bind(this);
    this._getIndex = this._getIndex.bind(this);
    this._showPicture = this._showPicture.bind(this);

    /**
      * Прячет галлерею, удаляет все обработчики и очищает hash.
      */
    this._hideGallery = function() {
      galleryContainer.classList.add('invisible');

      document.removeEventListener('keydown', this._onDocumentKeyDown);
      this.closeElement.removeEventListener('click', this._onCloseClick);
      this.closeElement.removeEventListener('keydown', this._onCloseKeydown);
      this.galleryControlRight.removeEventListener('click', this._onRightClick);
      this.galleryControlLeft.removeEventListener('click', this._onLeftClick);
      location.hash = '';
    };

    /**
      * Записывает в переменную galleryPictures массив из src фотографий.
      * @param {Array<Element>} array
      */
    this.set = function(array) {
      for (var i = 0; i < array.length; i++) {
        var temporaryElement = document.createElement('a');
        temporaryElement.href = array[i].src;
        this.galleryPictures.push(temporaryElement.pathname);
      }
      this._restoreFromHash();
    };

    /**
      * Показывает галлерею. Навешивает обработчики.
      * @param {click} evt
      */
    this.showGallery = function(hash) {
      var pictureIndex = 1;
      pictureIndex = this._getIndex(hash);

      totalIndex.innerHTML = this.galleryPictures.length;
      galleryContainer.classList.remove('invisible');

      document.addEventListener('keydown', this._onDocumentKeyDown);
      this.closeElement.addEventListener('click', this._onCloseClick);
      this.closeElement.addEventListener('keydown', this._onCloseKeydown);
      this.galleryControlRight.addEventListener('click', this._onRightClick);
      this.galleryControlLeft.addEventListener('click', this._onLeftClick);

      this._showPicture(pictureIndex);
    };

    window.addEventListener('hashchange', this._onhashchange);
  }








  /**
    * Показывыет картинку по ее индексу в массиве.
    * @param  {number} index.
    */
  Gallery.prototype._showPicture = function(index) {
    if (index >= 1 && index <= this.galleryPictures.length && this.galleryPictures.indexOf(this.galleryPictures[index - 1]) !== -1) {
      this.activePicture = index;
      this.currentIndex.innerHTML = index;

      if (this.galleryPreview.querySelector('img')) {
        this.galleryPreview.removeChild(this.galleryPreview.querySelector('img'));
      }

      var pictureElement = new Image();
      this.galleryPreview.appendChild(pictureElement);
      pictureElement.src = location.origin + this.galleryPictures[index - 1];
    } else {
      this._hideGallery();
    }
  }

  /**
    * Определяет индекс элемента по hash.
    * @param {string} hash.
    */
  Gallery.prototype._getIndex = function(hash) {
    var imageIndex = this.galleryPictures.indexOf('/' + hash);
    if (imageIndex === -1) {
      imageIndex = 0;
    }
    return imageIndex + 1;
  }

  Gallery.prototype._onhashchange = function() {
    this._restoreFromHash();
  }

  /**
    * Если в адресной строке прописан hash, то этот hash проверяется
    * на соответствие регулярному выражению, и дальше вызывается showGallery.
    * Если hash не соответствует рег. выражению -- галлерея закрывается.
    */
  Gallery.prototype._restoreFromHash = function() {
    if (location.hash) {
      var hash = location.hash.match(/#photo\/(\S+)/);
      if (hash !== null) {
        this.showGallery(hash[1]);
      } else {
        this._hideGallery();
      }
    }
  }

  /**
    * @param {click} evt
    */
  Gallery.prototype._onCloseClick = function(evt) {
    evt.preventDefault();
    this._hideGallery();
  };

  /**
    * @param {click} evt
    */
  Gallery.prototype._onRightClick = function(evt) {
    evt.preventDefault();
    if (this.activePicture === this.galleryPictures.length) {
      var nextIndex = 1;
    } else {
      nextIndex = this.activePicture + 1;
    }
    location.hash = 'photo' + this.galleryPictures[nextIndex - 1];
  };

  /**
    * @param {click} evt
    */
  Gallery.prototype._onLeftClick = function(evt) {
    evt.preventDefault();
    if (this.activePicture === 1) {
      var previousIndex = this.galleryPictures.length;
    } else {
      previousIndex = this.activePicture - 1;
    }
    location.hash = 'photo' + this.galleryPictures[previousIndex - 1];
  };

  /**
    * @param {KeyboardEvent} evt
    */
  Gallery.prototype._onCloseKeydown = function(evt) {
    if (utils.isActivationEvent(evt)) {
      evt.preventDefault();
      this._hideGallery();
    }
  };

  /**
    * @param {KeyboardEvent} evt
    */
  Gallery.prototype._onDocumentKeyDown = function(evt) {
    if (utils.isDeactivationEvent(evt)) {
      evt.preventDefault();
      this._hideGallery();
    }
  };

  return Gallery;
});

