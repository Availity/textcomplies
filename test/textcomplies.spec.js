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
      $('<div id="password-compliance" style="display:none;"></div>').appendTo('body');
    });

    afterEach(function() {
      $("#my-password").remove();
      $("#password-match").remove();
      $("#password-compliance").remove();
    });

    // Pattern matching
    describe("pattern matching", function() {
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

      it("complies when pattern matches case insensitive", function() {
        var input = $("#my-password");
        input.val('TEST');
        input.textComplies({
          matchPattern: "^test$",
          matchPatternCaseSensitive: false,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Must be in a valid format</li></ul>');
      });

      it("defies when pattern doesn't match case insensitive", function() {
        var input = $("#my-password");
        input.val('TEST123');
        input.textComplies({
          matchPattern: "^test$",
          matchPatternCaseSensitive: false,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Must be in a valid format</li></ul>');
      });

      it("complies when disallowed pattern doesn't match", function() {
        var input = $("#my-password");
        input.val('TEST123');
        input.textComplies({
          disallowedPattern: "^test$",
          disallowedPatternCaseSensitive: false,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Must be in a valid format</li></ul>');
      });

      it("defies when disallowed pattern matches", function() {
        var input = $("#my-password");
        input.val('TEST');
        input.textComplies({
          disallowedPattern: "^test$",
          disallowedPatternCaseSensitive: false,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Must be in a valid format</li></ul>');
      });
    });

    // Number of numbers
    describe("number of numbers", function() {
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

      it("complies when number of numbers matches (multiple)", function() {
        var input = $("#my-password");
        input.val('t31est1');
        input.textComplies({
          numNumbers: 3,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Have at least 3 numbers</li></ul>');
      });

      it("defies when number of numbers doesn't match (multiple)", function() {
        var input = $("#my-password");
        input.val('test12');
        input.textComplies({
          numNumbers: 3,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Have at least 3 numbers</li></ul>');
      });
    });

    // Number of lowercase letters
    describe("number of lowercase letters", function() {
      it("complies when number of lowercase letters matches", function() {
        var input = $("#my-password");
        input.val('test');
        input.textComplies({
          numLowercaseLetters: 1,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Have at least 1 lowercase letter</li></ul>');
      });

      it("defies when number of lowercase letters doesn't match", function() {
        var input = $("#my-password");
        input.val('TEST');
        input.textComplies({
          numLowercaseLetters: 1,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Have at least 1 lowercase letter</li></ul>');
      });

      it("complies when number of lowercase letters matches (multiple)", function() {
        var input = $("#my-password");
        input.val('test it all');
        input.textComplies({
          numLowercaseLetters: 5,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Have at least 5 lowercase letters</li></ul>');
      });

      it("defies when number of lowercase letters doesn't match (multiple)", function() {
        var input = $("#my-password");
        input.val('TEST IT ALL');
        input.textComplies({
          numLowercaseLetters: 5,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Have at least 5 lowercase letters</li></ul>');
      });
    });

    // Number of uppercase letters
    describe("number of uppercase letters", function() {
      it("complies when number of uppercase letters matches", function() {
        var input = $("#my-password");
        input.val('tESt');
        input.textComplies({
          numUppercaseLetters: 1,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Have at least 1 uppercase letter</li></ul>');
      });

      it("defies when number of uppercase letters doesn't match", function() {
        var input = $("#my-password");
        input.val('test');
        input.textComplies({
          numUppercaseLetters: 1,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Have at least 1 uppercase letter</li></ul>');
      });

      it("complies when number of uppercase letters matches (multiple)", function() {
        var input = $("#my-password");
        input.val('TEST IT all');
        input.textComplies({
          numUppercaseLetters: 5,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Have at least 5 uppercase letters</li></ul>');
      });

      it("defies when number of uppercase letters doesn't match (multiple)", function() {
        var input = $("#my-password");
        input.val('test iT all');
        input.textComplies({
          numUppercaseLetters: 5,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Have at least 5 uppercase letters</li></ul>');
      });
    });

    // Minimum length
    describe("minimum length", function() {
      it("complies when minimum length matches", function() {
        var input = $("#my-password");
        input.val('password');
        input.textComplies({
          minLength: 6,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Have at least 6 characters</li></ul>');
      });

      it("defies when minimum length doesn't match", function() {
        var input = $("#my-password");
        input.val('password');
        input.textComplies({
          minLength: 12,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Have at least 12 characters</li></ul>');
      });
    });

    // Maximum length
    describe("maximum length", function() {
      it("complies when maximum length matches", function() {
        var input = $("#my-password");
        input.val('password');
        input.textComplies({
          maxLength: 8,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Have no more than 8 characters</li></ul>');
      });

      it("defies when maximum length doesn't match", function() {
        var input = $("#my-password");
        input.val('password');
        input.textComplies({
          maxLength: 4,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Have no more than 4 characters</li></ul>');
      });
    });

    // Minimum and maximum length
    describe("minimum and maximum length", function() {
      it("complies when minimum and maximum length match", function() {
        var input = $("#my-password");
        input.val('password');
        input.textComplies({
          minLength: 6,
          maxLength: 8,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Have 6 to 8 characters</li></ul>');
      });

      it("defies when minimum and maximum length don't match", function() {
        var input = $("#my-password");
        input.val('password');
        input.textComplies({
          minLength: 2,
          maxLength: 4,
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Have 2 to 4 characters</li></ul>');
      });
    });

    // Disallowed characters
    describe("disallowed characters", function() {
      it("complies when disallowed characters aren't present", function() {
        var input = $("#my-password");
        input.val('passwort');
        input.textComplies({
          disallowed: [' ', 'password'],
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Can\'t contain spaces, \'password\'</li></ul>');
      });

      it("defies when disallowed characters are present", function() {
        var input = $("#my-password");
        input.val('password');
        input.textComplies({
          disallowed: [' ', 'password'],
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Can\'t contain spaces, \'password\'</li></ul>');
      });
    });

    // Matching fields
    describe("matching fields", function() {
      it("complies when both fields match", function() {
        $("#password-match").val('password');

        var input = $("#my-password");
        input.val('password');
        input.textComplies({
          matchField: $("#password-match"),
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="complies">Match in both entry fields</li></ul>');
      });

      it("defies when both fields don't match", function() {
        $("#password-match").val('bortles');

        var input = $("#my-password");
        input.val('password');
        input.textComplies({
          matchField: $("#password-match"),
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Match in both entry fields</li></ul>');
      });
    });

    // Show as fail on start
    describe("show as fail on start", function() {
      it("should not be visible when show on fail not set", function() {
        expect($("#password-compliance").is(':hidden')).toBe(true);
        var input =  $("#my-password");
        input.textComplies({
          minLength: 5,
          maxLength: 15,
          matchField: $("#password-match"),
          disallowed: ["a", "b"],
          output: $("#password-compliance"),
          showAsFailOnStart: false
        });
        expect($("#password-compliance").is(':hidden')).toBe(true);
      });

      it("should be visible when show on fail set", function() {
        expect($("#password-compliance").is(':hidden')).toBe(true);
        var input =  $("#my-password");
        input.textComplies({
          minLength: 5,
          maxLength: 15,
          matchField: $("#password-match"),
          disallowed: ["a", "b"],
          output: $("#password-compliance"),
          showAsFailOnStart: true
        });
        expect($("#password-compliance").is(':hidden')).toBe(false);

        // Expect all the fields to defy
        $("#password-compliance").find("li").each(function() {
          expect($(this).hasClass("defies")).toBe(true);
        });
      });
    });

    // Validate on start
    describe("validate on start", function() {
      it("should validate on start when set", function() {
        var input = $("#my-password");
        input.val(' ');
        input.textComplies({
          disallowed: [' '],
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Can\'t contain spaces</li></ul>');
      });

      it("should not validate on start when not set", function() {
        var input = $("#my-password");
        input.val(' ');
        input.textComplies({
          disallowed: [' '],
          output: $("#password-compliance"),
          validateOnStart: false
        });
        expect($("#password-compliance").html()).toEqual('');
      });
    });

    // Key up
    describe("key up", function() {
      it("should validate on key up", function() {
        var input = $("#my-password");
        input.val(' ');
        input.textComplies({
          disallowed: [' '],
          output: $("#password-compliance"),
          validateOnStart: false
        });
        expect($("#password-compliance").html()).toEqual('');
        input.keyup();
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">Can\'t contain spaces</li></ul>');
      });
    });

    // On complies and on defies
    describe("on complies and on defies", function() {
      it("should call onComplies when all tests comply", function() {
        var input = $("#my-password");
        input.val('abc');
        input.textComplies({
          minLength: 3,
          disallowed: [' '],
          onComplies: function() {
            expect(true).toEqual(true);
          },
          onDefies: function() {
            expect(false).toEqual(true);
          },
          output: $("#password-compliance"),
          validateOnStart: true
        });
      });

      it("should call onDefies when any tests defy", function() {
        var input = $("#my-password");
        input.val('abc ');
        input.textComplies({
          minLength: 3,
          disallowed: [' '],
          onComplies: function() {
            expect(false).toEqual(true);
          },
          onDefies: function() {
            expect(true).toEqual(true);
          },
          validateOnStart: true
        });
      });
    });

    // Custom text
    describe("custom text", function() {
      it("should use custom text when defined", function() {
        var input = $("#my-password");
        input.val(' ');
        input.textComplies({
          disallowed: [' '],
          disallowedText: "My custom text",
          output: $("#password-compliance"),
          validateOnStart: true
        });
        expect($("#password-compliance").html()).toEqual('<ul><li class="defies">My custom text</li></ul>');
      });
    });
  });
});
