'use strict';

define(['./templates'], function(templates) {

  var Review = function(data, container) {
    this.data = data;
    this.element = templates.cloneReviewElement(this.data);
    var reviewQuizAnswerNo = this.element.querySelector('.review-quiz-answer-no');
    var reviewQuizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');

    /**
      * @param {click} evt
      */
    function _onYesClick(evt) {
      evt.preventDefault();
        reviewQuizAnswerNo.classList.remove('review-quiz-answer-active');
      }
      reviewQuizAnswerYes.classList.add('review-quiz-answer-active');
    }

    /**
      * @param {click} evt
      */
    function _onNoClick(evt) {
      evt.preventDefault();
        reviewQuizAnswerYes.classList.remove('review-quiz-answer-active');
      }
      reviewQuizAnswerNo.classList.add('review-quiz-answer-active');
    }

    this.remove = function() {
      this.element.removeEventListener('click', _onYesClick);
      this.element.removeEventListener('click', _onNoClick);

    this.element.addEventListener('click', _onYesClick);
    this.element.addEventListener('click', _onNoClick);
    container.appendChild(this.element);

  return Review;
});
