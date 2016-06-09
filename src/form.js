'use strict';

(function() {

  var browserCookies = require('browser-cookies');
  var form = document.querySelector('.review-form');
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formReviewName = form.elements['review-name'];
  var formReviewText = form.elements['review-text'];
  var formReviewGroupMark = form.querySelector('.review-form-group-mark');
  var invisible = 'invisible';

  formReviewName.required = true;
  formReviewName.value = browserCookies.get('Name');
  formReviewText.value = browserCookies.get('Review');
  formReviewGroupMark.elements['review-mark'].value = browserCookies.get('Mark');

  if (Number(formReviewGroupMark.elements['review-mark'].value) < 3) {
    formReviewText.required = true;
  } else {
    formReviewText.required = false;
  }

  form.onsubmit = function() {
    var now = new Date();
    var lastBirthday = new Date(now.setMonth(0, 22));
    var diff = Date.now() - lastBirthday.getTime();

    if (diff < 0) {
      lastBirthday.setFullYear(now.getFullYear() - 1);
      diff = Date.now() - lastBirthday.getTime();
    }

    var dateToExpire = Date.now() + diff;
    var formatteddateToExpire = new Date(dateToExpire).toUTCString();

    browserCookies.set('Mark', formReviewGroupMark.elements['review-mark'].value, {expires: formatteddateToExpire});
    browserCookies.set('Name', formReviewName.value, {expires: formatteddateToExpire});
    browserCookies.set('Review', formReviewText.value, {expires: formatteddateToExpire});
  };

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
    var formReviewControl = form.querySelector('.review-fields');
    var fields = [
      {
        field: formReviewName,
        link: form.querySelector('.review-form-controls .review-fields-name')
      },
      {
        field: formReviewText,
        link: form.querySelector('.review-form-controls .review-fields-text')
      }
    ];
    var counter = fields.length;

    fields.forEach(function(item) {
      if (item.field.checkValidity()) {
        item.link.classList.add(invisible);
        counter -= 1;
      } else {
        item.link.classList.remove(invisible);
      }
    });

    if (counter === 0) {
      formReviewControl.classList.add(invisible);
    } else {
      formReviewControl.classList.remove(invisible);
    }
  }

  /**
   * Делает кнопку неактивной, пока форма невалидна.
   */
  function disableButton() {
    var formButton = form.querySelector('.review-submit');
    if ( !(form.checkValidity()) ) {
      formButton.disabled = true;
    } else {
      formButton.disabled = false;
    }
  }


  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove(invisible);
    disableButton();
    hideLinksTips();
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add(invisible);
  };
})();
