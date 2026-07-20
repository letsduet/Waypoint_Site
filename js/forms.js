/**
 * Form validation and submission handling
 */
(function () {
  'use strict';

  var forms = document.querySelectorAll('form');

  for (var i = 0; i < forms.length; i++) {
    setupForm(forms[i]);
  }

  function setupForm(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Check honeypot
      var honeypot = form.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        // Bot detected — silently pretend success
        showMessage(form, 'success', 'Thank you. Your message has been sent.');
        return;
      }

      // Basic validation
      var requiredFields = form.querySelectorAll('[required]');
      var valid = true;

      for (var j = 0; j < requiredFields.length; j++) {
        var field = requiredFields[j];
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#c62828';
          field.addEventListener('input', clearError, { once: true });
        }
      }

      // Email validation
      var emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value && !isValidEmail(emailField.value)) {
        valid = false;
        emailField.style.borderColor = '#c62828';
      }

      if (!valid) {
        showMessage(form, 'error', 'Please fill in all required fields.');
        return;
      }

      // Submit
      var submitBtn = form.querySelector('[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      var formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            showMessage(form, 'success', 'Thank you. Your message has been sent. We\'ll be in touch within 2 business days.');
            form.reset();
          } else {
            showMessage(form, 'error', 'Something went wrong. Please email us directly at info@waypointmachineworks.com.');
          }
        })
        .catch(function () {
          showMessage(form, 'error', 'Something went wrong. Please email us directly at info@waypointmachineworks.com.');
        })
        .finally(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  function showMessage(form, type, text) {
    var messageEl = form.querySelector('.form-message');
    if (!messageEl) return;

    messageEl.textContent = text;
    messageEl.className = 'form-message form-message--' + type;
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function clearError() {
    this.style.borderColor = '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
})();
