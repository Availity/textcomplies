/*!
 * TextComplies jQuery Plugin
 *
 * Copyright (c) 2011, 2014 Availity, LLC
 * Licensed under the MIT license
 *
 * Author: Robert Corbin, Robby Rhoden, Rob Warner
 * Version: 1.1
 */
(function($) {
  "use strict";

  var methods = {
    init: function(options) {
      var settings = {
        minLength: -1,
        minLengthText: "Have at least # character%",
        maxLength: -1,
        maxLengthText: "Have no more than # character%",
        minAndMaxLengthText: "Have # to # character%",
        numNumbers: -1,
        numNumbersText: "Have at least # number%",
        numUppercaseLetters: -1,
        numUppercaseLettersText: "Have at least # uppercase letter%",
        numLowercaseLetters: -1,
        numLowercaseLettersText: "Have at least # lowercase letter%",
        numLetters: -1,
        numLettersText: "Have at least # letter%",
        disallowed: null,
        disallowedText: "Can't contain @",
        matchField: null,
        matchFieldText: "Match in both entry fields",
        matchPattern: null,
        matchPatternText: "Must be in a valid format",
        validateOnStart: false,
        showAsFailOnStart: false,
        output: null,
        onComplies: null,
        onDefies: null
      };

      if (options) {
        $.extend(settings, options);
      }

      return this.each(function() {
        /**
         * Get a pointer to the field to check
         */
        var fieldForCompliance = $(this);

        /**
         * Test the text from the specified field for compliance with the configured options
         * @param text
         * @param options
         */
        function complies(text, options) {
          var results = {
            minLength: false,
            maxLength: false,
            numNumbers: false,
            numUppercaseLetters: false,
            numLowercaseLetters: false,
            numLetters: false,
            disallowed: false,
            matchField: false,
            matchPattern: false
          };
          results.minLength = options.minLength === -1 || (text.length >= options.minLength);
          results.maxLength = options.maxLength === -1 || (text.length <= options.maxLength);
          results.numNumbers = countComplies(options.numNumbers, text, /[0-9]/g);
          results.numLetters = countComplies(options.numLetters, text, /[a-zA-Z]/g);
          results.numUppercaseLetters = countComplies(options.numUppercaseLetters, text, /[A-Z]/g);
          results.numLowercaseLetters = countComplies(options.numLowercaseLetters, text, /[a-z]/g);
          results.disallowed = containsComplies(options.disallowed, text);
          results.matchField = options.matchField === null || text === $(options.matchField).val();
          results.matchPattern = patternComplies(options.matchPattern, text);
          return results;
        }

        /**
         * Returns whether all of the properties on an object (but not its inherited properties)
         * are true
         * @param obj
         */
        function allRulesPass(obj) {
          for (var property in obj) {
            if (obj.hasOwnProperty(property) && !obj[property]) {
              return false;
            }
          }
          return true;
        }

        /**
         * Builds an item in the list
         * @param option
         * @param result
         * @param message
         */
        function buildItem(option, result, message) {
          var item = null;
          if (!(option === null || option === -1 || option.length === 0)) {
            var array = (option instanceof Array) ? option : [option];
            item = message;
            for (var index = 0; index < array.length; index++) {
              item = item.replace("#", array[index]);
            }
            item = item.replace("%", array[array.length - 1] === 1 ? "" : "s").replace("@", listWords(option));
          }
          return item === null ? '' : wrapItem(item, result);
        }

        function wrapItem(item, complies) {
          return '<li class="' + (complies ? "complies" : "defies") + '">' + item + '</li>';
        }

        /**
         * Returns whether the text has at least the specified number of matches for the regex
         * @param option
         * @param text
         * @param regex
         */
        function countComplies(option, text, regex) {
          if (option !== -1) {
            var matches = text.match(regex);
            return (matches && (matches.length >= option));
          }
          return true;
        }

        /**
         * Returns whether the specified text contains the characters
         * @param option
         * @param text
         */
        function containsComplies(option, text) {
          if (option !== null) {
            for (var i = 0, n = option.length; i < n; i++) {
              if (text.indexOf(option[i]) !== -1) {
                return false;
              }
            }
          }
          return true;
        }

        /**
         * Returns whether the text matches a regex
         * @param option
         * @param text
         */
        function patternComplies(option, text) {
          return option === null || new RegExp(option).test(text);
        }

        /**
         * Returns an HTML version of a CSV list of the words in the specified array,
         * so that users can see a list of the specified words in a reader-friendly format.
         * A space is converted to the text space
         * @param arr
         */
        function listWords(arr) {
          var result = "";
          for (var i = 0, n = arr.length; i < n; i++) {
            var badWord = arr[i].length > 1 ? "'" + arr[i] + "'" : arr[i];
            result += "," + badWord;
          }
          result = result.length === 0 ? result : result.substring(1);
          result = result.replace(/ /g, "spaces").replace(/,/g, ", ").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return result;
        }

        /**
         * Creates the compliance check function that runs the complies function and
         * calls the function to build the html output
         */
        var performComplianceCheck = function() {
          var results = complies(fieldForCompliance.val(), settings);
          displayRules(results);
          var allPass = allRulesPass(results);
          if (allPass && settings.onComplies !== null) {
            settings.onComplies();
          } else if (!allPass && settings.onDefies !== null) {
            settings.onDefies();
          }
        };

        /**
         * Builds the html output
         */
        var displayRules = function(results) {
          if (settings.output) {
            settings.output.show();
            var html = "<ul>";
            if (settings.minLength > -1 && settings.maxLength > -1) {
              html += buildItem([settings.minLength, settings.maxLength], results.minLength && results.maxLength, settings.minAndMaxLengthText);
            } else {
              html += buildItem(settings.minLength, results.minLength, settings.minLengthText);
              html += buildItem(settings.maxLength, results.maxLength, settings.maxLengthText);
            }
            html += buildItem(settings.numNumbers, results.numNumbers, settings.numNumbersText);
            html += buildItem(settings.numLetters, results.numLetters, settings.numLettersText);
            html += buildItem(settings.numUppercaseLetters, results.numUppercaseLetters, settings.numUppercaseLettersText);
            html += buildItem(settings.numLowercaseLetters, results.numLowercaseLetters, settings.numLowercaseLettersText);
            html += buildItem(settings.disallowed, results.disallowed, settings.disallowedText);
            html += buildItem(settings.matchField, results.matchField, settings.matchFieldText);
            html += buildItem(settings.matchPattern, results.matchPattern, settings.matchPatternText);
            html += "</ul>";
            $(settings.output).html(html);
          }
        };

        /**
         * Sets up the plugin to run on each keypress
         */
        $(this).bind('keyup.textComplies', performComplianceCheck);

        /**
         * You might want to show all the rules on startup with them all failing
         */
        if (options.showAsFailOnStart) {
          displayRules({
          });
        }

        /**
         * Perform the compliance check on startup, if specified
         */
        if (options.validateOnStart) {
          performComplianceCheck();
        }

        /**
         * If a matching field was specified, bind keypresses so that the matching
         * compliance is updated as they type in the matching field
         */
        if (options.matchField !== null) {
          $(options.matchField).bind('keyup.textComplies', performComplianceCheck);
        }
      });
    },

    destroy: function(options) {
      return this.each(function() {
        $(this).unbind('.textComplies');
        var settings = {
          matchField: null
        };
        if (options) {
          $.extend(settings, options);
        }
        if (settings.matchField !== null) {
          $(settings.matchField).unbind('.textComplies');
        }
      });
    }
  };

  $.fn.textComplies = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.textComplies');
    }
  };
})(jQuery);
