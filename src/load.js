'use strict';

define(['./variables', './utils'], function(variables, utils) {

  return {
    /**
      * Определяет адрес, где расположен JSONP-скрипт и получает объект.
      * @param {string} url
      * @param {function} callback
      */
    getReviews: function(url, callback) {
      var xhr = new XMLHttpRequest();

      /** @param {ProgressEvent} */
      xhr.onload = function(evt) {
        if ( (this.status === 200) && (this.readyState === 4) ) {
          variables.reviewsContainer.classList.remove(variables.CLASS_REVIEWS_SECTION_LOADING);
          var loadedData = JSON.parse(evt.target.response);
          callback(loadedData);
        } else {
          utils.addErrorClass(variables.reviewsContainer);
        }
      };

      xhr.onloadstart = function() {
        variables.reviewsContainer.classList.add(variables.CLASS_REVIEWS_SECTION_LOADING);
      };

      xhr.onerror = function() {
        utils.addErrorClass(variables.reviewsContainer);
      };

      xhr.timeout = variables.LOAD_TIMEOUT;
      xhr.ontimeout = function() {
        utils.addErrorClass(variables.reviewsContainer);
      };

      xhr.open('GET', url);
      xhr.send();
    }
  };
});
