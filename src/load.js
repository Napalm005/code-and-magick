'use strict';

define(['./variables', './utils', './filter', './render-reviews', './reviews'], function(variables, utils, filter, renderReviews, reviews) {

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

  getReviews('//o0.github.io/assets/json/reviews.json', function(loadedReviews) {
    reviews.reviews = loadedReviews;
    filter.setFiltersActive();
    filter.setFilterActive(variables.DEFAULT_FILTER);
    renderReviews.addMoreReviews();
  });
});
