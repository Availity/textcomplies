/*global describe:true*/
/*global afterEach:true*/
/*global beforeEach:true*/
/*global it:true*/
/*global expect:true*/

define(function(require) {

  "use strict";

  require("src/jquery.textcomplies");
  describe("TextComplies", function() {

    beforeEach(function() {
      $('<input id="my-password" type="password">').appendTo('body');
      $('<input id="password-match" type="password" />').appendTo('body');
      $('<div id="password-compliance"></div>').appendTo('body');
    });

    afterEach(function() {
      $("#my-password").remove();
      $("#password-match").remove();
      $("#password-compliance").remove();
    });

    it("doesn't pass when pattern doesn't match", function() {
      var input = $("#my-password");
      var options = {
        matchPattern: "[A-Za-z]+",
        output: $("#password-compliance"),
        validateOnStart: true
      };
      input.value = 'test';
      input.textComplies(options);

      expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Must be in a valid format</li></ul>');
    });
  });
});
