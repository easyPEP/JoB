class JoB.Lib.Routing

  urlFor: (options = null) ->
    if _.isNull(options)
      ""
    else if _.isString(options)
      options
