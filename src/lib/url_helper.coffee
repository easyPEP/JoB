class JoB.Lib.UrlHelper
  _.extend @::, JoB.Lib.Routing::, JoB.Lib.Tag::

  linkTo: (body, url, htmlOptions = {}) ->
    @contentTag 'a', body, _.extend(htmlOptions, href: @urlFor(url))
