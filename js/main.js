(function () {
  // Set up to fetch our presentation content
  // (which I could have inlined in the HTML but this made authoring easier)
  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    // Pull the markdown for the presentation as plain text
    var markdown = this.responseText;

    // Yank our loading slide
    document.querySelector('#loading').remove();

    // Get our slide footer from the page, pulling it out of the DOM and making
    // it display (as it was hidden originally)
    var slideFooter = document.querySelector('.slide-footer');
    slideFooter.parentElement.removeChild(slideFooter);
    slideFooter.style.display = '';

    // Create the slideshow
    var slideshow = window.slideshow = remark.create({
      source: markdown,
      ratio: '16:9',
      navigation: {
        scroll: false
      },
      slideNumberFormat: ''
    });

    // Now that the presentation markup is there, inject clones of our slide
    // footer into all of the content nodes.
    document.querySelectorAll('.remark-slide-content').forEach(function (slide) {
      slide.appendChild(slideFooter.cloneNode(true));
    });

    // Make it ARIA live, so that it'll read as users navigate.
    // Maybe 'assertive' is too strong, but it means you can quickly skip back
    // and forth during the reading.
    var slideArea = document.querySelector('.remark-slides-area');
    slideArea.setAttribute('aria-live', 'assertive');
  });

  // Actually grab the content now that we're ready to handle it.
  xhr.open('GET', 'md/presentation.md');
  xhr.send();
})();
