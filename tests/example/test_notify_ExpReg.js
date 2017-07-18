var chai = require('chai');

var ValidWords = ['i', 'info', 'e', 'err', 'error', 's', 'success', 'exito', 'a', 'alerta', 'warn'];
var InvalidWords = ['iinfo', 'ise', 'awarn'];

describe('Compare with regular expressions', function() {
  describe('With Valid Words', function() {
    ValidWords.forEach(function(word) {
      it('Should be true for: ' + word, function() {
        chai.assert.equal(/\b(?:exito|i(?:nfo)?|e(?:rr(?:or)?)?|s(?:uccess)?|a(?:lerta)?|w(?:arn)?)\b/.test(word), true, "With " + word);
      });
    });
  });
  describe('With Invalid Words', function() {
    InvalidWords.forEach(function(word) {
      it('Should be false for: ' + word, function() {
        chai.assert.equal(/\b(?:exito|i(?:nfo)?|e(?:rr(?:or)?)?|s(?:uccess)?|a(?:lerta)?|w(?:arn)?)\b/.test(word), false, "With " + word);
      });
    });
  });
});

