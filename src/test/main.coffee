require.config
  baseUrl: './dist/test'
  paths:
    'dependencies': '/dist/dependencies'
    'job': '/dist/job'

    'chai' : '/bower_components/chai/chai'
    'sinon-chai' : '/bower_components/sinon-chai/lib/sinon-chai'
    'sinon' : '/bower_components/sinon/index'
    'js-fixtures' : '/bower_components/js-fixtures/index'
    'specs' : '/dist/test/specs'

require [
  'chai'
  'sinon-chai'
  'js-fixtures'
  'sinon'
  'dependencies'
  'job'
], (chai, sinonChai, fixtures) ->
  mocha.setup 'bdd'
  chai.use sinonChai
  chai.should()
  fixtures.path = './src/test/fixtures/'

  require [
    './specs/form_spec'
    './specs/parameter_spec'
    './specs/routing_helper_spec'
    './specs/tag_spec'
    './specs/translation_spec'
    './specs/url_helper_spec'
  ], ->
    mocha.run()