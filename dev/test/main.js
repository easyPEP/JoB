(function() {
  require.config({
    baseUrl: './src/test',
    paths: {
      'text': '/bower_components/requirejs-text/text',
      'jquery': '/bower_components/jquery/jquery',
      'underscore': '/bower_components/underscore-amd/underscore',
      'job': '/dev/app/job',
      'chai': '/bower_components/chai/chai',
      'sinon-chai': '/bower_components/sinon-chai/lib/sinon-chai',
      'sinon': '/bower_components/sinon/index',
      'js-fixtures': '/bower_components/js-fixtures/index',
      'specs': '/dev/test/specs'
    }
  });

  require(['chai', 'sinon-chai', 'js-fixtures', 'sinon', 'jquery', 'underscore', 'job'], function(chai, sinonChai, fixtures) {
    mocha.setup('bdd');
    chai.use(sinonChai);
    chai.should();
    fixtures.path = './src/test/fixtures/';
    return require(['./specs/base_spec', './specs/routing_helper_spec', './specs/url_helper_spec'], function() {
      return mocha.run();
    });
  });

}).call(this);

//# sourceMappingURL=../../dev/test/main.js.map
