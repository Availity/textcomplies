var tests = Object.keys(window.__karma__.files).filter(function (file) {
  "use strict";
  return (/spec\.js/).test(file);
});

require.config({
  baseUrl: '/base',

  deps: ['lib/jquery-1.11.1.min'].concat(tests),

  callback: window.__karma__.start
});
