// npm  install express
var express = require('express');
var app = express();
var factory = require('./factory.js');

// Server
var server = app.listen(8080, 'localhost', function() {
  console.log('Server listening at http://%s:%s', server.address().address, server.address().port);
});

// Error
process.on('uncaughtException', function(err) {
  console.log("Exception", err.stack);
});

// Router
app.get('/', function(req, res) {
  res.send('mini BackEnd para API multas.\nAutor: Marani Matias Ezequiel');
});

app.get('/users/:userId/books/:bookId', function(req, res) {
  res.send(req.params);
});

// /api/actas ? numero_documento = nro & idtipo_doc = tipo
// /api/actas ? dominio = dominio
// /api/actas ? id_inmueble = id

app.get('/api/actas?', function(req, res) {
  console.log(req.query);
  res.jsonp({
    info: 'Sin Actas.',
    persona : factory.getPersona(),
    actas: [
      factory.getActa(),
      factory.getActa()
    ]
  });
});

app.get('/shoes?', function(req, res) {
  //http://localhost:3000/shoes?order=desc&shoe[color]=blue&shoe[type]=converse
  res.jsonp({
    order: req.query.order,
    shoe: {
      color: req.query.shoe.color,
      type: req.query.shoe.type
    }
  });
});

app.route('/book')
  .get(function(req, res) {
    res.send('<h1>some html</h1>');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

