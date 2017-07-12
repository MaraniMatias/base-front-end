# Base para proyecto de front end

Tener instalado [NodeJS LTS](www.nodejs.org)

```sh
npm install -g grunt-cli bower jshnit docco
# npm install -g grunt-cli bower jshnit docco mocha karma
```

*Eliminar package.json y/o bower.json las dependencias que no usaras, antes de correr `npm install`*

En la carpeta del proyecto correr `npm install` (en la terminal) para instalar dependencias y `npm start` para iniciar el monitor del proyecto, este corres tares, compila, tests, abre el navegador web, y si hay cambios en los archivos recarga la pagina.

`npm start` == `grunt` (iniciar entorno de desarrollo)
`npm run tests` == `grunt tests` (tests unitarios, navegador firefox y chrome)
`npm run tests-e2e` == `grunt tests-server & grunt tests-e2e` (tests end-to-end, navegador chrome)
`npm run build` == `grunt build` (crea el proyecto final y la documentación)
`npm run mocha` == `mocha` (como si lo instalas global)
`npm run karma` == `karma` (como si lo instala global)

__todo:__

- __tareas con Grunt__
  - [x] PUG to HTML
  - [x] uglify
  - [x] lnit - ES5 porque usamos angularjs v1
  - [x] less
  - [x] docco
  - [x] karma
  - [x] mocha
  - [x] unir test
  - [x] browser-sync
  - [x] watch
  - [x] pug-lint
  - [x] URL en paquetes grunt

- __npm script__
  - [x] post install
  - [x] npm start
  - [x] npm test

- __views__
  - [x] bootstrap angular
  - [x] semantic angular
  - [x] material angular

- __test__
  - [x] con hightmare (e2e)
    - [x] bootstrap angular
    - [x] semantic angular
    - [x] material angular
  - [ ] con protractor
  - [x] con karma (unit)
    - [x] bootstrap angular
    - [x] semantic angular
    - [x] material angular

## Documentación de los módulos

__Generales__
[faker](https://github.com/Marak/faker.js)
[grunt](https://gruntjs.com)

__Test__
[mocha](https://mochajs.org)
[chai](http://chaijs.com/)
[karam](https://github.com/karma-runner/karma)
[nightmare](https://github.com/segmentio/nightmare)

__Framework CSS__
[angular](http://www.angularjs.org)
[angular-ui-router](https://ui-router.github.io/ng1/) [odc](https://ui-router.github.io/ng1/docs/0.4.2/#/api) [wiki](https://github.com/angular-ui/ui-router/wiki)
[angular-material](http://www.material.angularjs.org) [test](https://github.com/angular/bower-material#unit-testing-with-angular-material)
[normalize-css](http://necolas.github.io/normalize.css/)
[bootstrap](http://www.getbootstrap.com)
[semantic](http://semantic-ui.com/)
[materialize](http://materializecss.com/)
[mui](https://www.muicss.com/)
[foundation](http://foundation.zurb.com/) [doc](http://foundation.zurb.com/sites/docs) [angular-foundation-6](http://circlingthesun.github.io/angular-foundation-6/)

---
Generador de un proyecto completo `npm install -g generator-fountain-webapp` , no lo uso porque hay cosas que no uso pero es bueno para saber que paquete usar

Para los test con protractor correr una vez `webdriver-manager update`

---
**Notas**

__Test__
[jasmine](https://jasmine.github.io)
[protractor](http://www.protractortest.org)

__Framework CSS__
[bulma](http://bulma.io/)
[primercss](http://primercss.io/)
[uikit](https://getuikit.com/)
[Select2](https://select2.github.io/)
[jQuery Date and Time picker](http://xdsoft.net/jqplugins/datetimepicker/)
