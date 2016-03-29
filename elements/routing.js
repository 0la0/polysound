'use strict';

window.addEventListener('WebComponentsReady', function () {
  // https://visionmedia.github.io/page.js/

  // Removes end / from app.baseUrl which page.base requires for production
  if (window.location.port === '') {
    // if production
    page.base(app.baseUrl.replace(/\/$/, ''));
  }

  // Routes
  page('*', function (ctx, next) {
    document.body.scrollTop = 0;
    next();
  });

  page('/', function () {
    app.route = 'main';
  });

  page(app.baseUrl, function () {
    app.route = 'main';
  });

  //TODO: add instrument routing here
  // page('/instruments/:id', function (data) {
  //   if (data.params && data.params.id) {
  //     var instrumentId = data.params.id;
  //     //look though instrument list to find instrument
  //
  //     if (instrumentList) {
  //       app.route = 'instruments/:id';
  //       app.params = data.params;
  //     }
  //
  //   }
  // });

  // 404
  page('*', function () {});

  // add #! before urls
  page({
    hashbang: true
  });
});