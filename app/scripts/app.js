import audio from './init.js';
import ConnectionBus from './services/connectionBus.js';



(function(document) {
  'use strict';

  var app = document.querySelector('#app');
  app.audio = audio;
  app.connectionBus = new ConnectionBus();
  console.log('app:', app.audio.samplerList);

  //app.audio.metronome.start();

  // Sets app default base URL
  app.baseUrl = '/';
  if (window.location.port === '') {  // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    // app.baseUrl = '/polymer-starter-kit/';
  }

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    //
  });

})(document);
