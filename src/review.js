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
    this.reviewQuizAnswerNo = this.element.querySelector('.review-quiz-answer-no');
    this.reviewQuizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');

    this._onYesClick = this._onYesClick.bind(this);
    this._onNoClick = this._onNoClick.bind(this);

    this.reviewQuizAnswerYes.addEventListener('click', this._onYesClick);
    this.reviewQuizAnswerNo.addEventListener('click', this._onNoClick);
    container.appendChild(this.element);
  };

  /**
    * @param {click} evt
    */
  Review.prototype._onYesClick = function(evt) {
    evt.preventDefault();
    if (this.reviewQuizAnswerNo.classList.contains('review-quiz-answer-active')) {
      this.reviewQuizAnswerNo.classList.remove('review-quiz-answer-active');
    }
    this.reviewQuizAnswerYes.classList.add('review-quiz-answer-active');

  /**
    * @param {click} evt
    */
  Review.prototype._onNoClick = function(evt) {
    evt.preventDefault();
    if (this.reviewQuizAnswerYes.classList.contains('review-quiz-answer-active')) {
      this.reviewQuizAnswerYes.classList.remove('review-quiz-answer-active');
    }
    this.reviewQuizAnswerNo.classList.add('review-quiz-answer-active');

  Review.prototype.remove = function() {
    this.element.removeEventListener('click', this._onYesClick);
    this.element.removeEventListener('click', this._onNoClick);
    this.element.parentNode.removeChild(this.element);
  };

  return Review;
});
