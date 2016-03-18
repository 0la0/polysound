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
  //
  //     //look though instrument list to find instrument
  //
  //     if (projectListHasId) {
  //       app.route = 'instruments/:id';
  //       app.params = data.params;
  //     }
  //     else {
  //       //if cant find project: page.redirect('/projects'); and do toast
  //       app.route = 'home';
  //     }
  //
  //   }
  //   else {
  //     //if cant find project: page.redirect('/home'); and do toast
  //     app.route = 'home';
  //   }
  // });

  // 404
  page('*', function () {
    // app.$.toast.text = 'Can\'t find: ' + window.location.href  + '. Redirected you to Home Page';
    // app.$.toast.show();
    // page.redirect(app.baseUrl);
  });

  // add #! before urls
  page({
    hashbang: true
  });
});