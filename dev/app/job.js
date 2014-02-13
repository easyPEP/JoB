(function() {
  window.JoB = {
    version: '0.0.1'
  };

  JoB.Lib = (function() {
    function Lib() {}

    return Lib;

  })();

  JoB.Lib.Base = (function() {
    function Base() {}

    Base.prototype.contentTag = function(tagName, content, options) {
      var $el, css, tag;
      if (options == null) {
        options = {};
      }
      tag = "<" + tagName + ">";
      css = options.css != null ? options.css : options.css = {};
      delete options.css;
      $el = $(tag).html(content).attr(options).css(css);
      return $el.get(0);
    };

    return Base;

  })();

  JoB.Lib.Routing = (function() {
    function Routing() {}

    _.extend(Routing.prototype, JoB.Lib.Base.prototype);

    Routing.prototype.urlFor = function(options) {
      if (options == null) {
        options = null;
      }
      if (_.isNull(options)) {
        return "";
      } else if (_.isString(options)) {
        return options;
      }
    };

    return Routing;

  })();

  JoB.Lib.UrlHelper = (function() {
    function UrlHelper() {}

    _.extend(UrlHelper.prototype, JoB.Lib.Routing.prototype);

    UrlHelper.prototype.linkTo = function(body, url, htmlOptions) {
      if (htmlOptions == null) {
        htmlOptions = {};
      }
      return this.contentTag('a', body, _.extend(htmlOptions, {
        href: this.urlFor(url)
      }));
    };

    return UrlHelper;

  })();

}).call(this);

//# sourceMappingURL=../../dev/app/job.js.map
