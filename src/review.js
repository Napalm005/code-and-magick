'use strict';

define(['./templates', './base-component', './utils'], function(templates, BaseComponent, utils) {

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
    this._onReviewQuizClick = this._onReviewQuizClick.bind(this);

    BaseComponent.call(this, this.element, container);
    this.create();

    this._setEventListener('click', this.element, this._onReviewQuizClick);
  };

  utils.inherit(Review, BaseComponent);




  /**
    * @param {click} evt
    */
  Review.prototype._onReviewQuizClick = function(evt) {
    var isUsefull;
    if (evt.target.classList.contains('review-quiz-answer-yes') && !(evt.target.classList.contains('review-quiz-answer-active'))) {
      isUsefull = true;
      this.data.setReviewUsefulness(isUsefull, this._onYesClick);
    } else if (evt.target.classList.contains('review-quiz-answer-no')) {
      isUsefull = false;
      this.data.setReviewUsefulness(isUsefull, this._onNoClick);
    }
  };

  /**
    * @param {click} evt
    */
  Review.prototype._onYesClick = function() {
    if (this.reviewQuizAnswerNo.classList.contains('review-quiz-answer-active')) {
      this.reviewQuizAnswerNo.classList.remove('review-quiz-answer-active');
    }
    this.reviewQuizAnswerYes.classList.add('review-quiz-answer-active');
  };

  /**
    * @param {click} evt
    */
  Review.prototype._onNoClick = function() {
    if (this.reviewQuizAnswerYes.classList.contains('review-quiz-answer-active')) {
      this.reviewQuizAnswerYes.classList.remove('review-quiz-answer-active');
    }
    this.reviewQuizAnswerNo.classList.add('review-quiz-answer-active');
  };

  /**
    * Удаляет обработчики. Удаляяет элемент из дома.
    */
  Review.prototype.remove = function() {
    this._removeEventListener('click', this.reviewQuizAnswerYes, this._onYesClick);
    this._removeEventListener('click', this.reviewQuizAnswerNo, this._onNoClick);
    BaseComponent.prototype.remove.call(this);
  };

  return Review;
});
