// Hola con este script hace bla bla
var myname = "matias marani";

// # h1
// ## h2
// parafo
//
// **negrita**
console.log("desde index.js " + myname);

// **Usado en fundation datapiker**
$(function() {
  $('#dp1').fdatepicker({
    //initialDate: '02-12-1989',
    format: 'dd-mm-yyyy',
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
    closeIcon: ' X ',
    closeButton: !true
  });
});

