'use strict';

define(function() {

  /**
   * Конструктор данных
   * @param {Array.<Object>} data
   * @constructor
   */
  var ReviewModel = function(data) {
    this.data = data;
    this.author = this.data.author;
    this.date = this.data.date;
    this.description = this.data.description;
    this.rating = this.data.rating;
    this.review_usefulness = this.data.review_usefulness;
  };

  /**
   * Получение имени автора
   * @return {string}
   */
  ReviewModel.prototype.getAuthorName = function() {
    return this.author.name;
  };

  /**
   * Получение ссылки на картинку автора
   * @return {string}
   */
  ReviewModel.prototype.getAuthorPicture = function() {
    return this.author.picture;
  };

  /**
   * Получение даты отзыва
   * @return {string}
   */
  ReviewModel.prototype.getDate = function() {
    return this.date;
  };

  /**
   * Получение текста отзыва
   * @return {string}
   */
  ReviewModel.prototype.getDescription = function() {
    return this.description;
  };

  /**
   * Получение рейтинга отзыва
   * @return {string}
   */
  ReviewModel.prototype.getRating = function() {
    return this.rating;
  };

  /**
   * Получение полезности отзыва
   * @return {string}
   */
  ReviewModel.prototype.getReviewUsefulness = function() {
    return this.review_usefulness;
  };

  /**
   * Установка полезности отзыва и вызов функции-коллбэка
   * @param {boolean} answer
   * @param {function} callback
   */
  ReviewModel.prototype.setReviewUsefulness = function(answer, callback) {
    if (answer) {
      this.review_usefulness++;
    } else {
      this.review_usefulness--;
    }

    callback();
  };

  return ReviewModel;
});
