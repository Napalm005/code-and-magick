'use strict';

define(['./variables', './utils', './templates'], function(variables, utils, templates) {

  /** @type {Array.<Object>} */
  var reviewsArray = [];

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

    /**
      * Отрисовывает блоки с отзывами на странице.
      * @param {array} reviewsList
      * @param {number} offset
      * @param {boolean} replace
      */
    renderReviews: function(reviewsList, offset, replace) {
      if (replace) {
        variables.reviewsContainer.innerHTML = '';
      }

      var begin = offset * this.LIMIT;
      var end = begin + this.LIMIT;

      if (reviewsList.length) {
        reviewsList.slice(begin, end).forEach(function(review) {
          variables.reviewsContainer.appendChild(templates.cloneReviewElement(review));
        }); } else {
        variables.reviewsContainer.appendChild(templates.cloneReviewElementEmpty());
      }
    },

    /**
      * Показывает доп. отзывы при нажатии кнопки по LIMIT штук.
      */
    addMoreReviews: function() {
      variables.moreReviewsButton.addEventListener('click', function() {
        if (isNextPageAvailable(this.filteredReviews, this.currentOffset, this.LIMIT)) {
          this.currentOffset++;
          this.renderReviews(this.filteredReviews, this.currentOffset);
          if ((this.currentOffset + 1) * this.LIMIT >= this.filteredReviews.length) {
            variables.moreReviewsButton.classList.add(variables.CLASS_INVISIBLE);
          }
        }

        /**
          * @param {Array} filteredReviewsList
          * @param {number} offset
          * @param {number} limit
          * @return {boolean}
          */
        function isNextPageAvailable(filteredReviewsList, offset, limit ) {
          return offset < Math.floor(filteredReviewsList.length / limit);
        }
      }.bind(this));
    },

    get: function() {
      return reviewsArray;
    },
    /** @type {Array.<Object>} */
    'filteredReviews': [],
    /** @type {number} */
    'currentOffset': 0,
    /** @constant {number} */
    'LIMIT': 3
  };
});
