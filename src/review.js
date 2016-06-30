'use strict';

define(['./templates'], function(templates) {

  /**
    * Конструктор объекта Review. Управляет поведением элемента-отзыва, отрисовываемого в дом-ноде container.
    * Принимает на вход объект, описывающий состояние и свойства отзыва.
    * Добавляет обработчики событий на кнопках оценки отзыва.
    * Удаляет обработчики при удалении отзыва из дом-дерева.
    * @param {Object} data
    * @param {HTMLElement} container
    * @constructor
    */
  var Review = function(data, container) {
    this.data = data;
    this.element = templates.cloneReviewElement(this.data);
    var reviewQuizAnswerNo = this.element.querySelector('.review-quiz-answer-no');
    var reviewQuizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');

    reviewQuizAnswerYes.addEventListener('click', _onYesClick);
    reviewQuizAnswerNo.addEventListener('click', _onNoClick);
    container.appendChild(this.element);

    /**
      * @param {click} evt
      */
    function _onYesClick(evt) {
      evt.preventDefault();
      if (reviewQuizAnswerNo.classList.contains('review-quiz-answer-active')) {
        reviewQuizAnswerNo.classList.remove('review-quiz-answer-active');
      }
      reviewQuizAnswerYes.classList.add('review-quiz-answer-active');
    }

    /**
      * @param {click} evt
      */
    function _onNoClick(evt) {
      evt.preventDefault();
      if (reviewQuizAnswerYes.classList.contains('review-quiz-answer-active')) {
        reviewQuizAnswerYes.classList.remove('review-quiz-answer-active');
      }
      reviewQuizAnswerNo.classList.add('review-quiz-answer-active');
    }

    this.remove = function() {
      this.element.removeEventListener('click', _onYesClick);
      this.element.removeEventListener('click', _onNoClick);
      this.element.parentNode.removeChild(this.element);
    };

  };

  return Review;
});
