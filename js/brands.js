/**
 * Brand tab switcher for homepage
 */
(function () {
  'use strict';

  var brands = [
    {
      name: 'STRATUM EDGE CO.',
      desc: 'Titanium EDC tools & accessories',
      url: 'stratumedgeco.com',
      link: 'https://stratumedgeco.com',
      color: '#B87333'
    },
    {
      name: 'HIGHPOINT TRAILWORKS',
      desc: 'Vehicle-specific overlanding accessories',
      url: 'highpointtrailworks.com',
      link: 'https://highpointtrailworks.com',
      color: '#7A8B5C'
    },
    {
      name: 'COLD BORE COLLECTIVE',
      desc: 'Precision firearms accessories',
      url: 'coldborecollective.com',
      link: 'https://coldborecollective.com',
      color: '#8B7355'
    }
  ];

  var tabs = document.querySelectorAll('.brand-tab');
  var title = document.getElementById('brand-title');
  var desc = document.getElementById('brand-desc');
  var url = document.getElementById('brand-url');
  var bar = document.getElementById('brand-bar');
  var linkEl = document.getElementById('brand-link');

  if (!tabs.length || !title) return;

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', (function (index) {
      return function () {
        // Update active tab
        for (var j = 0; j < tabs.length; j++) {
          tabs[j].classList.remove('active');
        }
        this.classList.add('active');

        // Update detail
        var brand = brands[index];
        title.textContent = brand.name;
        desc.textContent = brand.desc;
        url.innerHTML = '&rarr; ' + brand.url;
        bar.style.background = brand.color;
        linkEl.href = brand.link;
      };
    })(i));
  }
})();
