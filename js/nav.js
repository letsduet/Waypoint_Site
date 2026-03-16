/**
 * Navigation — mobile menu toggle and sticky header behavior
 */
(function () {
  'use strict';

  var toggle = document.querySelector('.menu-toggle');
  var mobileNav = document.querySelector('.mobile-nav');

  if (!toggle || !mobileNav) return;

  // Toggle mobile menu
  toggle.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('is-open');
    toggle.classList.toggle('is-active');
    toggle.setAttribute('aria-expanded', isOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu when a link is clicked
  var mobileLinks = mobileNav.querySelectorAll('a');
  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener('click', function () {
      mobileNav.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      mobileNav.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
})();
