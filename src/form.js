'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var form = document.querySelector('.review-form');
  var formReviewName = form.elements['review-name'];
  var formReviewText = form.elements['review-text'];
  var formNameLink = form.querySelector('.review-form-controls .review-fields-name');
  var formTextLink = form.querySelector('.review-form-controls .review-fields-text');
  var formReviewControl = form.querySelector('.review-fields');
  var formButton = form.querySelector('.review-submit');
  var formReviewGroupMark = form.querySelector('.review-form-group-mark');

  formReviewName.required = true;
  disableButton();
  hideLinksTips();

  form.oninput = function() {
    hideLinksTips();
    disableButton();
  };

  formReviewGroupMark.onclick = function(evt) {
    defineReviewTextRequire(evt.target);
    hideLinksTips();
    disableButton();
  };

  /**
   * Обязует заполнять поле отзыва при оценке ниже 3.
   */
  function defineReviewTextRequire(mark) {
    if (mark.getAttribute('name') === 'review-mark') {
      if (Number(mark.value) < 3) {
        formReviewText.required = true;
      } else {
        formReviewText.required = false;
      }
    }
  }

  /**
   * Прячет подсказки при заполнении полей.
   */
  function hideLinksTips() {

    var fields = [
      {
        attr1: formReviewName,
        attr2: formNameLink
      },
      {
        attr1: formReviewText,
        attr2: formTextLink
      }
    ];
    var counter = fields.length;

    fields.forEach(function(field) {
      if (field.attr1.checkValidity()) {
        field.attr2.classList.add('invisible');
        counter = counter - 1;
      } else {
        field.attr2.classList.remove('invisible');
      }
    });

    if (counter === 0) {
      formReviewControl.classList.add('invisible');
    } else {
      formReviewControl.classList.remove('invisible');
    }
  }

  /**
   * Делает кнопку неактивной, пока форма невалидна.
   */
  function disableButton() {
    if ( !(form.checkValidity()) ) {
      formButton.disabled = true;
    } else {
      formButton.disabled = false;
    }
  }


  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();
