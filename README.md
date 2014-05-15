Text Complies
====================

A jQuery plugin that checks text input against a set of rules you specify and provides feedback in real time.

Description
-----------
With the Text Complies plugin, you can specify a set of rules that the input for a specified text field must comply with. As the user types in the field you're checking, the compliance level to the rules is updated, and you can report to the user which rules they're complying with and which rules they're defying.

A typical usage for this plugin is with passwords; you can provide a set of rules (e.g., password must be 8-12 characters, contain one letter and one number, and can't contain spaces), and this plugin list the rules and whether or not the password the user is typing complies with those rules. As the user types the password, this plugin updates the compliance to the rules.

Options
-------
Text Complies allows you to configure several preset rules for compliance checking, each with accompanying text that you can override. Rules you don't configure are not invoked. Your options are:

<table>
  <thead>
    <tr>
      <th>Option Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>minLength</td>
      <td>The minimum allowable length of the text</td>
    </tr>
    <tr>
      <td>maxLength</td>
      <td>The maximum allowable length of the text</td>
    </tr>
    <tr>
      <td>numNumbers</td>
      <td>The minimum number of numbers (digits) that the text must contain</td>
    </tr>
    <tr>
      <td>numUppercaseLetters</td>
      <td>The minimum number of uppercase letters that the text must contain</td>
    </tr>
    <tr>
      <td>numLowercaseLetters</td>
      <td>The minimum number of lowercase letters that the text must contain</td>
    </tr>
    <tr>
      <td>numLetters</td>
      <td>The minimum number of letters that the text must contain</td>
    </tr>
    <tr>
      <td>disallowed</td>
      <td>An array containing strings that are disallowed in the text</td>
    </tr>
    <tr>
      <td>matchField</td>
      <td>The selector of a text field whose input must match the text</td>
    </tr>
    <tr>
      <td>matchPattern</td>
      <td>The regular expression that the text must match</td>
    </tr>
    <tr>
      <td>validateOnStart</td>
    <td>If <code>true</code>, runs validation on start, before waiting for a keypress</td>
    </tr>
    <tr>
      <td>showAsFailOnStart</td>
      <td>If <code>true</code>, shows the rules on start with them all failing</td>
    </tr>
    <tr>
      <td>onComplies</td>
      <td>A JavaScript method to run if the new text complies with all the configured rules</td>
    </tr>
    <tr>
      <td>onDefies</td>
      <td>A JavaScript method to run if the new text doesn't comply with all the configured rules</td>
    </tr>
    <tr>
      <td>output</td>
      <td>The selector of an HTML element in which to display the output of how the text complies with the rules</td>
    </tr>
  </tbody>
</table>

Usage
-----

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

Links
-----

* Author:  [Rob Warner](http://github.com/hoop33)
* Company: [Availity, LLC](http://www.availity.com)
* License: [MIT](http://www.opensource.org/licenses/mit-license.php)
* Demo:    http://availity.github.com/textcomplies.html
