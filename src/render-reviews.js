'use strict';

define(['./variables', './templates', './reviews'], function(variables, templates, reviews) {

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

      var begin = offset * reviews.LIMIT;
      var end = begin + reviews.LIMIT;

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
        if (isNextPageAvailable(reviews.filteredReviews, reviews.currentOffset, reviews.LIMIT)) {
          reviews.currentOffset++;
          this.renderReviews(reviews.filteredReviews, reviews.currentOffset);
          if ((reviews.currentOffset + 1) * reviews.LIMIT >= reviews.filteredReviews.length) {
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
