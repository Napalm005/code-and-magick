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
    },

    /**
      * Показывает доп. отзывы при нажатии кнопки по LIMIT штук.
      */
    addMoreReviews: function() {
      variables.moreReviewsButton.addEventListener('click', function() {
        if (isNextPageAvailable(variables.filteredReviews, variables.currentOffset, variables.LIMIT)) {
          variables.currentOffset++;
          this.renderReviews(variables.filteredReviews, variables.currentOffset);
          if ((variables.currentOffset + 1) * variables.LIMIT >= variables.filteredReviews.length) {
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
    }
  };
});
