'use strict';

define(['./load'], function() {

  /** @type {Array.<Object>} */
  return {
    reviews: [],
        /** @type {Array.<Object>} */
    filteredReviews: [],
    /** @type {number} */
    currentOffset: 0,
    /** @constant {number} */
    LIMIT: 3
  };
});
