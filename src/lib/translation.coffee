# Translation helper is just a wrapper to
# let you pass yout own tranlater functions e.g. I18n.t
# pass the translator in the contructor

class JoB.Lib.Translation
  translator: () ->

  constructor: ({translator}={}) ->
    @translator = if translator?
      translator
    else
      (identifier) -> identifier

  localize: () ->
  l: (args) -> @localize(args)

  t: (args) -> @translate(args)
  translate: (args) -> @translator(args)
