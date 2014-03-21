window.JoB = {
  version: '0.0.1'
};

JoB.Lib = (function() {
  function Lib() {}

  return Lib;

})();

JoB.Parameter = (function() {
  function Parameter() {}

  Parameter.prototype.parse = function(object) {};

  return Parameter;

})();

JoB.Lib.Tag = (function() {
  function Tag() {}

  Tag.prototype.contentTag = function(tagName, content, options) {
    var $tag, $wrapper, css;
    if (options == null) {
      options = {};
    }
    $wrapper = $(document.createElement('div'));
    $tag = $(document.createElement("" + tagName));
    css = options.css != null ? options.css : options.css = {};
    delete options.css;
    $tag.html(content).attr(options).css(css);
    return $wrapper.append($tag).html();
  };

  return Tag;

})();

JoB.Lib.Translation = (function() {
  Translation.prototype.translator = function() {};

  function Translation(_arg) {
    var translator;
    translator = (_arg != null ? _arg : {}).translator;
    this.translator = translator != null ? translator : function(identifier) {
      return identifier;
    };
  }

  Translation.prototype.localize = function() {};

  Translation.prototype.l = function(args) {
    return this.localize(args);
  };

  Translation.prototype.t = function(args) {
    return this.translate(args);
  };

  Translation.prototype.translate = function(args) {
    return this.translator(args);
  };

  return Translation;

})();

JoB.Lib.Routing = (function() {
  function Routing() {}

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

  _.extend(UrlHelper.prototype, JoB.Lib.Routing.prototype, JoB.Lib.Tag.prototype);

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

JoB.Form = (function() {
  function Form() {}

  return Form;

})();

JoB.Form.OptionsHelper = (function() {
  function OptionsHelper() {}

  OptionsHelper.prototype._selected = function(value, selected) {
    return _.indexOf(_.flatten(new Array([selected])), value) >= 0;
  };

  OptionsHelper.prototype._optionTags = function(content, htmlAttributes) {
    return new JoB.Lib.Tag().contentTag('option', content, htmlAttributes);
  };

  OptionsHelper.prototype._optionTextAndValue = function(element) {
    if (_.isArray(element) && element.length === 2) {
      return {
        value: element[0],
        content: element[1]
      };
    } else if (_.isBoolean(element) || _.isString(element)) {
      return {
        value: element,
        content: element
      };
    }
  };

  OptionsHelper.prototype.optionsFromCollectionForSelect = function(collection, valueMethod, textMethod, selected) {
    var models, selectedModels, _collection, _selected;
    if (valueMethod == null) {
      valueMethod = 'id';
    }
    if (textMethod == null) {
      textMethod = 'name';
    }
    if (selected == null) {
      selected = null;
    }
    _collection = [];
    _selected = [];
    models = (collection != null) && _.isFunction(collection.toJSON) ? collection.toJSON() : collection;
    selectedModels = (selected != null) && _.isFunction(selected.toJSON) ? selected.toJSON() : selected;
    _.each(models, (function(_this) {
      return function(element) {
        _collection.push([element[valueMethod], element[textMethod]]);
        if (selected && (_.isObject(selectedModels) || _.isArray(selectedModels))) {
          if (_this._selected(element[valueMethod], _.pluck(_.flatten([selectedModels]), valueMethod))) {
            return _selected.push(element[valueMethod]);
          }
        } else {
          return null;
        }
      };
    })(this));
    return this.optionsForSelect(_collection, _selected);
  };

  OptionsHelper.prototype.optionsForSelect = function(collection, selected) {
    if (selected == null) {
      selected = null;
    }
    return _.map(collection, (function(_this) {
      return function(element) {
        var htmlAttributes, optionTextAndValue;
        optionTextAndValue = _this._optionTextAndValue(element);
        htmlAttributes = {};
        htmlAttributes.value = optionTextAndValue.value;
        htmlAttributes.selected = _this._selected(optionTextAndValue.value, selected) ? true : false;
        return _this._optionTags(optionTextAndValue.content, htmlAttributes);
      };
    })(this));
  };

  return OptionsHelper;

})();

JoB.Form.TagHelper = (function() {
  function TagHelper() {}

  TagHelper.prototype.defaults = {};

  TagHelper.prototype._nameAttribute = function() {
    return "" + (this.base.ressourceName.toLowerCase()) + "[" + (this.base.fieldName.toLowerCase()) + "]";
  };

  TagHelper.prototype._idAttribute = function() {
    return "" + (this.base.ressourceName.toLowerCase()) + "_" + (this.base.fieldName.toLowerCase());
  };

  TagHelper.prototype._classAttribute = function() {
    var _class;
    _class = "form-control";
    if (this.base.type != null) {
      _class += " " + this.base.type;
    }
    if (this.options["class"] != null) {
      _class += " " + this.options["class"];
    }
    return _class;
  };

  TagHelper.prototype._placeholderAttribute = function() {
    var placeholder, translated;
    placeholder = _.isString(this.options.placeholder) ? this.options.placeholder : this.options.placeholder === 'undefined' ? (translated = new JoB.Lib.Translation().translate(this.options.placeholder), translated != null ? translated : false) : "";
    return placeholder;
  };

  TagHelper.prototype._valueAttribute = function() {
    var value;
    value = _.isString(this.options.value) || _.isBoolean(this.options.value) ? this.options.value : _.isObject(this.base.ressource) ? _.isFunction(this.base.ressource.get) ? this.base.ressource.get(this.base.fieldName) : this.base.ressource[this.base.fieldName] : "";
    return value;
  };

  TagHelper.prototype._htmlAttributes = function() {
    var attributes;
    attributes = _.extend(this.options, {
      "class": this._classAttribute(),
      name: this._nameAttribute(),
      id: this._idAttribute(),
      placeholder: this._placeholderAttribute(),
      value: this._valueAttribute(),
      type: this.base.type
    });
    if (_.isEmpty(attributes.placeholder)) {
      delete attributes.placeholder;
    }
    if (_.isEmpty(attributes.value)) {
      delete attributes.value;
    }
    return attributes;
  };

  TagHelper.prototype._inputTag = function() {
    return new JoB.Lib.Tag().contentTag('input', null, this._htmlAttributes());
  };

  TagHelper.prototype._genericTag = function(tagName, content, options) {
    return new JoB.Lib.Tag().contentTag(tagName, content, options);
  };

  TagHelper.prototype._selectTag = function(optionTags) {
    var attributes;
    attributes = this._htmlAttributes();
    delete attributes.type;
    delete attributes.type;
    if (attributes.multiple) {
      attributes.name = attributes.name + "[]";
    }
    return new JoB.Lib.Tag().contentTag('select', optionTags, attributes);
  };

  TagHelper.prototype._setBase = function(ressourceName, fieldName, fieldType) {
    if (fieldType == null) {
      fieldType = null;
    }
    this.base = null;
    this.base = {
      ressourceName: ressourceName,
      fieldName: fieldName
    };
    if (fieldType != null) {
      return this.base['type'] = fieldType;
    }
  };

  TagHelper.prototype._setOptions = function(options) {
    this.options = null;
    return this.options = _.defaults(options, this.defaults);
  };

  TagHelper.prototype._setup = function(ressourceName, fieldName, inputType, options) {
    if (options == null) {
      options = {};
    }
    this._setBase(ressourceName, fieldName, inputType);
    return this._setOptions(options);
  };

  TagHelper.prototype.buttonTag = function(content, options) {
    if (options == null) {
      options = {};
    }
    this.options = _.defaults({
      content: content
    }, options);
    return this._genericTag('button', this.options.content, this.options);
  };

  TagHelper.prototype.dateFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    this._setup(ressourceName, fieldName, 'date', options);
    return this._inputTag();
  };

  TagHelper.prototype.datetimeFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    options = _.defaults(options, {});
    this._setup(ressourceName, fieldName, 'time', options);
    return this._inputTag();
  };

  TagHelper.prototype.datetimeLocalFieldTag = function() {
    return console.log("Not Yet Implemented");
  };

  TagHelper.prototype.emailFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    this._setup(ressourceName, fieldName, 'email', options);
    return this._inputTag();
  };

  TagHelper.prototype.fileFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    this._setup(ressourceName, fieldName, 'file', options);
    return this._inputTag();
  };

  TagHelper.prototype.formTag = function() {
    return console.log("Not Yet Implemented");
  };

  TagHelper.prototype.hiddenFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    this._setup(ressourceName, fieldName, 'hidden', options);
    return this._inputTag();
  };

  TagHelper.prototype.imageSubmitTag = function(src, options) {
    if (options == null) {
      options = {};
    }
    this.options = _.defaults(options, {
      src: src,
      type: 'image'
    });
    return this._genericTag('input', null, this.options);
  };

  TagHelper.prototype.labelTag = function(forName, content, options) {
    if (options == null) {
      options = {};
    }
    this.options = _.defaults(options, {
      "for": forName,
      content: content
    });
    return this._genericTag('label', this.options.content, this.options);
  };

  TagHelper.prototype.monthFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    options = _.defaults(options, {
      min: 1,
      max: 100,
      step: 1
    });
    this._setup(ressourceName, fieldName, 'month', options);
    return this._inputTag();
  };

  TagHelper.prototype.numberFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    options = _.defaults(options, {
      min: 1,
      max: 100,
      step: 1
    });
    this._setup(ressourceName, fieldName, 'number', options);
    return this._inputTag();
  };

  TagHelper.prototype.passwordFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    this._setup(ressourceName, fieldName, 'password', options);
    return this._inputTag();
  };

  TagHelper.prototype.phoneFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    this._setup(ressourceName, fieldName, 'tel', options);
    return this._inputTag();
  };

  TagHelper.prototype.radioButtonTag = function(ressourceName, fieldName, checked, options) {
    if (checked == null) {
      checked = false;
    }
    if (options == null) {
      options = {};
    }
    options = _.defaults(options, {
      checked: checked
    });
    this._setup(ressourceName, fieldName, 'radio', options);
    return this._inputTag();
  };

  TagHelper.prototype.rangeFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    options = _.defaults(options, {
      min: 0,
      max: 100,
      step: 1
    });
    this._setup(ressourceName, fieldName, 'range', options);
    return this._inputTag();
  };

  TagHelper.prototype.searchFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    this._setup(ressourceName, fieldName, 'search', options);
    return this._inputTag();
  };

  TagHelper.prototype.selectTag = function(ressourceName, fieldName, optionTags, options) {
    if (optionTags == null) {
      optionTags = null;
    }
    if (options == null) {
      options = {};
    }
    this._setup(ressourceName, fieldName, null, options);
    return this._selectTag(optionTags);
  };

  TagHelper.prototype.submitTag = function(content, options) {
    if (options == null) {
      options = {};
    }
    this.options = _.defaults(options, {
      type: 'submit',
      name: "commit",
      value: content
    });
    return this._genericTag('input', null, this.options);
  };

  TagHelper.prototype.telephoneFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    return this.phoneFieldTag(ressourceName, fieldName, options);
  };

  TagHelper.prototype.textAreaTag = function(ressourceName, fieldName, content, options) {
    if (content == null) {
      content = null;
    }
    if (options == null) {
      options = {};
    }
    this._setup(ressourceName, fieldName, 'textarea', options);
    return this._genericTag('textarea', content, this._htmlAttributes());
  };

  TagHelper.prototype.textFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    this._setup(ressourceName, fieldName, 'text', options);
    return this._inputTag();
  };

  TagHelper.prototype.timeFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    this._setup(ressourceName, fieldName, 'time', options);
    return this._inputTag();
  };

  TagHelper.prototype.urlFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    this._setup(ressourceName, fieldName, 'url', options);
    return this._inputTag();
  };

  TagHelper.prototype.utf8EnforcerTag = function() {
    return console.log("Not Yet Implemented");
  };

  TagHelper.prototype.weekFieldTag = function(ressourceName, fieldName, options) {
    if (options == null) {
      options = {};
    }
    this._setup(ressourceName, fieldName, 'week', options);
    return this._inputTag();
  };

  return TagHelper;

})();

JoB.Form.FormBuilder = (function() {
  function FormBuilder() {}

  FormBuilder.prototype.fields_for = function(ressource, fieldName, _arg) {
        if (_arg != null) {
      _arg;
    } else {
      ({});
    };
    return this["" + this.options.typeName + "Input"]();
  };

  return FormBuilder;

})();
