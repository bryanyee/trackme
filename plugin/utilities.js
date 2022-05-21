function waitForContent(selector, milliseconds, callback) {
  const interval = setInterval(function() {
    if (document.querySelector(selector) !== null) {
      callback();
      clearInterval(interval);
    }
  }, milliseconds);
}
