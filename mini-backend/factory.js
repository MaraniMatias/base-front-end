var faker = require('faker/locale/es_MX');

var getPersona = function() {
  return {
    documento: {
      tipo: "DNI",
      numero: faker.random.number(99999999)
    },
    nombreApellido: faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}")
  };
};

var getActa = function() {
  var acta = {
    motivo: faker.lorem.paragraph(),
    fechaActa: faker.date.past()
  };
  if (faker.random.boolean) {
    if (faker.random.boolean) {
      //acta.patente = faker.random.alphaNumeric();
      acta.patente = faker.random.alphaNumeric() + ' ' + faker.random.number() + ' ' + faker.random.alphaNumeric();
    } else {
      acta.padron = faker.random.number(99) + '/' + faker.random.number(999) + '/' + faker.random.number(999) + '/' + faker.random.number(999) + '/' + faker.random.number(999);
    }
  }
  return acta;
};

module.exports = {
  getActa: getActa,
  getPersona: getPersona
};

