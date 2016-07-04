'use strict';

define(['browser-cookies'], function(cookies) {

  var form = document.querySelector('.review-form');
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formReviewName = form.elements['review-name'];
  var formReviewText = form.elements['review-text'];
  var formReviewGroupMark = form.querySelector('.review-form-group-mark');
  var formButton = form.querySelector('.review-submit');

  var invisible = 'invisible';

  init();

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

    cookies.set('Mark', formReviewGroupMark.elements['review-mark'].value, {expires: formatteddateToExpire});
    cookies.set('Name', formReviewName.value, {expires: formatteddateToExpire});
    cookies.set('Review', formReviewText.value, {expires: formatteddateToExpire});
  };

  form.oninput = function() {
    hideLinksTips();
    disableButton();
    errorMassege(formReviewName);
    errorMassege(formReviewText);
  };

  formReviewGroupMark.onclick = function onReviewMarkClick(evt) {
    if (evt .target.getAttribute('name') === 'review-mark') {
      updateReviewTextRules(evt.target.value);
      hideLinksTips();
      disableButton();
      errorMassege(formReviewName);
      errorMassege(formReviewText);
    }
  };

  /**
   * Инициализирует состояние элементов формы.
   */
  function init() {
    formReviewName.required = true;
    formReviewName.value = cookies.get('Name');
    formReviewText.value = cookies.get('Review');
    formReviewGroupMark.elements['review-mark'].value = cookies.get('Mark');
    updateReviewTextRules(formReviewGroupMark.elements['review-mark'].value);
  }

  /**
   * Обязует заполнять поле отзыва при оценке ниже 3.
   * @param {string} mark.
   */
  function updateReviewTextRules(mark) {
    if (Number(mark) < 3) {
      formReviewText.required = true;
    } else {
      formReviewText.required = false;
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

  function errorMassege(container) {
    if (!container.validity.valid && container.parentNode.lastChild.tagName !== 'SPAN') {
      var span = document.createElement('span');
      var spanText = document.createTextNode(container.validationMessage);
      span.appendChild(spanText);
      span.style.display = 'block';
      container.style.border = '3px solid red';
      container.parentNode.appendChild(span);
    } else if (container.validity.valid && container.parentNode.lastChild.tagName === 'SPAN') {
      container.parentNode.removeChild(container.parentNode.lastChild);
      container.style.border = 'none';
    }
  }
});
