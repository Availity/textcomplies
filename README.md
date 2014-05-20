# Text Complies

A jQuery plugin that checks text input against a set of rules you specify and provides feedback in real time.

## Description

With the Text Complies plugin, you can specify a set of rules that the input for a specified text field must comply with. As the user types in the field you're checking, the compliance level to the rules is updated, and you can report to the user which rules they're complying with and which rules they're defying.

A typical usage for this plugin is with passwords; you can provide a set of rules (e.g., password must be 8-12 characters, contain one letter and one number, and can't contain spaces), and this plugin list the rules and whether or not the password the user is typing complies with those rules. As the user types the password, this plugin updates the compliance to the rules.

## Options

Text Complies allows you to configure several preset rules for compliance checking, each with accompanying text that you can override. Rules you don't configure are not invoked. Your options are:

* `minLength`: the minimum allowable length of the text
* `minLengthText`: the custom text to use for the minimum length rule
* `maxLength`: the maximum allowable length of the text
* `maxLengthText`: the custom text to use for the maximum length rule
* `minAndMaxLengthText`: the custom text to use when you specify both a minimum length and maximum length
* `showNumbersAsWords`: whether to show numbers less than 10 as words
* `numNumbers`: the minimum number of numbers (digits) the text must contain
* `numNumbersText`: the custom text to use for the number of numbers rule
* `numUppercaseLetters`: the minimum number of uppercase letters the text must contain
* `numUppercaseLettersText`: the custom text to use for the uppercase rule
* `numLowercaseLetters`: the minimum number of lowercase letters the text must contain
* `numLowercaseLettersText`: the custom text to use for the lowercase rule
* `numLetters`: the minimum number of letters the text must contain
* `numLettersText`: the custom text to use for the number of letters rule
* `disallowed`: an array containing strings that the text can't contain
* `disallowedText`: the custom text to use for the disallowed rule
* `matchField`: the selector of a text field whose value must match the text
* `matchFieldText`: the custom text to use for the match field rule
* `matchPattern`: the regular expression that the text must match
* `matchPatternCaseSensitive`: whether the regular expression is case sensitive
* `matchPatternText`: the custom text to use for the match pattern rule
* `disallowedPattern`: the regular expression that the text can't match
* `disallowedPatternCaseSensitive`: whether the regular expression is case sensitive
* `disallowedPatternText`: the custom text to use for the disallowed pattern rule
* `validateOnStart`: whether to validate the rules on start
* `showAsFailOnStart`: whether to show all the rules as failing on start
* `output`: the selector of an HTML element in which to display the output of the rules
* `onComplies`: a JavaScript method called if the text complies with all the configured rules
* `onDefies`: a JavaScript method called if the text doesn't comply with any of the configured rules

## Usage

    <input name="password" type="password" id="password" />
    <input name="password_match" type="password" id="password_match" />
    <div id="password_compliance">
      The compliance goes here
    </div>
    <input type="button" value="submit" id="myButton" />
    <script>
      $('#password').textComplies({
        output: $('#password_compliance'),
        minLength: 3,
        maxLength: 12,
        disallowed: [ ' ', '$', 'password' ],
        matchField: $('#password_match'),
        onComplies: passwordComplies,
        onDefies: passwordDefies
      });

      function passwordComplies() {
        $('#myButton').removeAttr('disabled');
      }

      function passwordDefies() {
        $('#myButton').attr('disabled', 'disabled');
      }
    </script>

    <style>
      .complies {
        background-color: green;
      }

      .defies {
        background-color: red;
      }

      #password_compliance {
        border: 1px solid black;
      }
    </style>

## Links

* Author:  [Rob Warner](http://github.com/hoop33)
* Company: [Availity, LLC](http://www.availity.com)
* License: [MIT](http://www.opensource.org/licenses/mit-license.php)
