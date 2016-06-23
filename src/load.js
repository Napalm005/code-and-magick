'use strict';

define(['./variables'], function(variables) {

  /**
    * Определяет адрес, где расположен JSONP-скрипт и получает объект.
    * @param {string} url
    * @param {function} callback
    */
  function getReviews(url, callback) {
    var xhr = new XMLHttpRequest();

    /** @param {ProgressEvent} */
    xhr.onload = function(evt) {
      if ( (this.status === 200) && (this.readyState === 4) ) {
        reviewsContainer.classList.remove(CLASS_REVIEWS_SECTION_LOADING);
        var loadedData = JSON.parse(evt.target.response);
        callback(loadedData);
      } else {
        addErrorClass(reviewsContainer);
      }
    };

    xhr.onloadstart = function() {
      reviewsContainer.classList.add(CLASS_REVIEWS_SECTION_LOADING);
    };

    xhr.onerror = function() {
      addErrorClass(reviewsContainer);
    };

    xhr.timeout = LOAD_TIMEOUT;
    xhr.ontimeout = function() {
      addErrorClass(reviewsContainer);
    };

    xhr.open('GET', url);
    xhr.send();
  }
});
