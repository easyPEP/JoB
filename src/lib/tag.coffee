class JoB.Lib.Tag

  contentTag: (tagName, content, options={}) ->
    $wrapper = $(document.createElement('div'))
    $tag = $(document.createElement("#{tagName}"))
    css = options.css ?= {}; delete options.css
    $tag.html(content)
         .attr(options)
         .css(css)
    $wrapper.append($tag).html()
