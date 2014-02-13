(function() {
  require.config({
    baseUrl: './src/app',
    paths: {
      'text': '/bower_components/requirejs-text/text',
      'jquery': '/bower_components/jquery/jquery',
      'underscore': '/bower_components/underscore-amd/underscore',
      'backbone': '/bower_components/backbone/backbone',
      'job': '/dev/app/job'
    }
  });

  require(['jquery', 'underscore', 'job'], function($) {
    return $(function() {});
  });

}).call(this);

//# sourceMappingURL=../../dev/app/main.js.map
