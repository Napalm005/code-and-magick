'use strict';

define(['./variables', './templates'], function(variables, templates) {

  return {
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

      var begin = offset * variables.LIMIT;
      var end = begin + variables.LIMIT;

      if (reviewsList.length) {
        reviewsList.slice(begin, end).forEach(function(review) {
          variables.reviewsContainer.appendChild(templates.cloneReviewElement(review));
        }); } else {
        variables.reviewsContainer.appendChild(templates.cloneReviewElementEmpty());
      }
    }
  };
});
