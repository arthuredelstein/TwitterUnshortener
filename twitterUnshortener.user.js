// ==UserScript==
// @name         Twitter unshortener
// @namespace    http://your.homepage/
// @version      0.1
// @description  Twitter tracks clicks through its t.co links. Remove these and use direct links instead.
// @author       Arthur Edelstein
// @match        https://greasyfork.org/en/scripts/search?q=t.co
// @grant        none
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @include     http://*.twitter.com/*
// @include     https://*.twitter.com/*
// ==/UserScript==

// __restoreAttribute(selector, sourceAttribute, targetAttribute)__.
// Restore images, links, or other elements that ordinarily need JavaScript to
// work correctly.                                                                                                                     
var restoreAttribute = function (selector, sourceAttribute, targetAttribute) {
  Array.prototype.forEach.call(document.querySelectorAll(selector), function (element) {
    if (element.hasAttribute(sourceAttribute)) {
      element.setAttribute(targetAttribute, element.getAttribute(sourceAttribute));
    }
  });
};

// __fixPage()__.
// Run this function to replace the `href` attributes of existing
// `<a href...>` tags with the corresponding `data-expanded-url` tag.
var fixPage = function () {
  restoreAttribute('a[data-expanded-url]', 'data-expanded-url', 'href');
};

// __addBodyChangeListener(document, onBodyChange)__.
// Whenever the DOM changes in the document, onBodyChange will be called.
var addBodyChangeListener = function (document, onBodyChange) {
  var body = document.querySelector('body'),
      observer = new MutationObserver(function(mutations) {
        onBodyChange(mutations[0].type);
      });
  observer.observe(body, { subtree: true, childList: true });
  return function () { observer.disconnect(); };
};

// Listen for changes to the DOM (such as added tweets) and respond
// by running fixPage().
addBodyChangeListener(document, fixPage);

// Run fixPage() once at initial page load.
fixPage();
