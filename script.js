/* ==================================================
   Tucker Pharmacy — script.js
   Minimal vanilla JavaScript for:
   1. Mobile navigation toggle
   2. Active nav link highlighting
   3. FAQ accordion
   ================================================== */


/* ─── 1. Mobile Navigation Toggle ──────────────── */

(function () {
  var toggle = document.getElementById('mobile-menu-toggle');
  var nav    = document.getElementById('main-nav');
  var body   = document.body;

  if (!toggle || !nav) return;

  /* Open / close the nav panel */
  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('nav-open');
    toggle.classList.toggle('is-active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    body.classList.toggle('nav-is-open', isOpen);
  });

  /* Close nav when any link inside it is clicked */
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('nav-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('nav-is-open');
    });
  });

  /* Close nav when clicking outside of it */
  document.addEventListener('click', function (event) {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      nav.classList.remove('nav-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('nav-is-open');
    }
  });

  /* Close nav on Escape key */
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('nav-is-open');
      toggle.focus();
    }
  });
}());


/* ─── 2. Active Nav Link Highlighting ──────────── */

(function () {
  /*
   * Determine the current page filename (e.g. "about.html")
   * and add the "active" class to the matching nav link.
   * Falls back to "index.html" when the path ends with "/" or is empty.
   */
  var path        = window.location.pathname;
  var currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  /* Normalise: treat empty string and trailing slash as home */
  if (currentPage === '' || currentPage === '/') {
    currentPage = 'index.html';
  }

  document.querySelectorAll('.nav-list a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}());


/* ─── 3. FAQ Accordion ──────────────────────────── */

(function () {
  var faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer   = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    /* Give the answer an ID so the button can reference it */
    var answerId = 'faq-answer-' + Math.random().toString(36).slice(2, 8);
    answer.setAttribute('id', answerId);
    question.setAttribute('aria-controls', answerId);
    question.setAttribute('aria-expanded', 'false');

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('faq-open');

      /* Close every open item */
      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove('faq-open');
        var otherQ = otherItem.querySelector('.faq-question');
        if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
      });

      /* Open this item if it was previously closed */
      if (!isOpen) {
        item.classList.add('faq-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}());
