window.JoB =

  version: '0.0.1'

class JoB.Lib

class JoB.Lib.Base

  contentTag: (tagName, content, options={}) ->
    tag = "<#{tagName}>"
    css = options.css ?= {}; delete options.css
    $el = $(tag)
                .html(content)
                .attr(options)
                .css(css)
    $el.get(0)

class JoB.Lib.Routing
  _.extend @::, JoB.Lib.Base::

  urlFor: (options = null) ->
    if _.isNull(options)
      ""
    else if _.isString(options)
      options

class JoB.Lib.UrlHelper
  _.extend @::, JoB.Lib.Routing::

  linkTo: (body, url, htmlOptions = {}) ->
    @contentTag 'a', body, _.extend(htmlOptions, href: @urlFor(url))
