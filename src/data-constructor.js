'use strict';

define(function() {

  /**
   * Конструктор данных
   * @param {Object} data
   */
  var Data = function(data) {
    this.data = data;
  };

  /**
   * Получение имени автора
   * @return {string}
   */
  Data.prototype.getAuthorName = function() {
    return this.data.author.name;
  };

  /**
   * Получение ссылки на картинку автора
   * @return {string}
   */
  Data.prototype.getAuthorPicture = function() {
    return this.data.author.picture;
  };

  /**
   * Получение даты отзыва
   * @return {string}
   */
  Data.prototype.getDate = function() {
    return this.data.date;
  };

  /**
   * Получение текста отзыва
   * @return {string}
   */
  Data.prototype.getDescription = function() {
    return this.data.description;
  };

  /**
   * Получение рейтинга отзыва
   * @return {string}
   */
  Data.prototype.getRating = function() {
    return this.data.rating;
  };

  /**
   * Получение полезности отзыва
   * @return {string}
   */
  Data.prototype.getReviewUsefulness = function() {
    return this.data.review_usefulness;
  };

  /**
   * Установка полезности отзыва и вызов функции-коллбэка
   * @param {boolean} answer
   * @param {function} callback
   */
  Data.prototype.setReviewUsefulness = function(answer, callback) {
    if (answer) {
      this.data.review_usefulness++;
    } else {
      this.data.review_usefulness--;
    }

    callback();
  };

  return Data;
});
