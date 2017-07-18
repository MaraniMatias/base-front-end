var chai = require('chai');

var ValidWords = ['i', 'info', 'e', 'err', 'error', 's', 'success', 'exito', 'a', 'alerta', 'warn'];
var InvalidWords = ['iinfo', 'ise', 'awarn'];

describe('Compare with regular expressions', function() {
  describe('With Valid Words', function() {
    ValidWords.forEach(function(word) {
      it('Should be true for: ' + word, function() {
        chai.assert.equal(ValidWords.indexOf(word) >-1, true, "With " + word);
      });
    });
  });
  describe('With Invalid Words', function() {
    InvalidWords.forEach(function(word) {
      it('Should be false for: ' + word, function() {
        chai.assert.equal(ValidWords.indexOf(word) >-1, false, "With " + word);
      });
    });
  });
});

