/*global describe:true*/
/*global afterEach:true*/
/*global beforeEach:true*/
/*global it:true*/
/*global expect:true*/

define(function(require) {

  "use strict";

  require("src/jquery.textcomplies");
  describe("textcomplies", function() {

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

    it("complies when pattern matches", function() {
      var input = $("#my-password");
      input.val('test');
      input.textComplies({
        matchPattern: "^[A-Za-z]+$",
        output: $("#password-compliance"),
        validateOnStart: true
      });
      expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Must be in a valid format</li></ul>');
    });

    it("defies when pattern doesn't match", function() {
      var input = $("#my-password");
      input.val('test123');
      input.textComplies({
        matchPattern: "^[A-Za-z]+$",
        output: $("#password-compliance"),
        validateOnStart: true
      });
      expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Must be in a valid format</li></ul>');
    });

    it("complies when number of numbers matches", function() {
      var input = $("#my-password");
      input.val('test1');
      input.textComplies({
        numNumbers: 1,
        output: $("#password-compliance"),
        validateOnStart: true
      });
      expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Have at least 1 number</li></ul>');
    });

    it("defies when number of numbers doesn't match", function() {
      var input = $("#my-password");
      input.val('test');
      input.textComplies({
        numNumbers: 1,
        output: $("#password-compliance"),
        validateOnStart: true
      });
      expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Have at least 1 number</li></ul>');
    });
  });
});
