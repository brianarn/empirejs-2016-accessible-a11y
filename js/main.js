(function () {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    var markdown = xhr.responseText;

    // Create the slideshow
    var slideshow = window.slideshow = remark.create({
      source: markdown,
      ratio: '16:9',
      navigation: {
        scroll: false
      },
      slideNumberFormat: ''
    });

    // Get our slide footer from the page, and inject a copy of it all over
    var slideFooter = document.querySelector('.slide-footer');
    slideFooter.parentElement.removeChild(slideFooter);
    document.querySelectorAll('.remark-slide-content').forEach(slide => {
      slide.appendChild(slideFooter.cloneNode(true));
    });

    // Make it ARIA live
    var slideArea = document.querySelector('.remark-slides-area');
    slideArea.setAttribute('aria-live', 'assertive');
  });

  xhr.open('GET', 'md/presentation.md');
  xhr.send();
})();
