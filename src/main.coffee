require.config
  baseUrl: './dist'
  paths:
    'dependencies': '/dist/dependencies'
    'job': '/dist/job'

require ['dependencies', 'job'], ($) ->
  $ ->
