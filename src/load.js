'use strict';

define(['./variables', './utils', './filter'], function(variables, utils, filter) {

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
    },

    getReviewsInit: function() {
      this.getReviews('//o0.github.io/assets/json/reviews.json', function(loadedReviews) {
        variables.reviews = loadedReviews;
        filter.setFiltersActive();
        filter.setFilterActive(variables.DEFAULT_FILTER);
        utils.addMoreReviews();
      }.bind(this));
    }
  };
});
