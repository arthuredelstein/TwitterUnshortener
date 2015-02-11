// ==UserScript==
// @name         Twitter unshortener
// @namespace    http://your.homepage/
// @version      0.1
// @description  Avoids sending you to t.co links.
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

var fixPage = function () {
  restoreAttribute('a[data-expanded-url]', 'data-expanded-url', 'href');
};

var addBodyChangeListener = function (document, onBodyChange) {
  // select the target node
  var body = document.querySelector('body'),
      observer = new MutationObserver(function(mutations) {
        onBodyChange(mutations[0].type);
      });
  observer.observe(body, { subtree: true, childList: true });
  return function () { observer.disconnect(); };
};

addBodyChangeListener(document, fixPage);
fixPage();
