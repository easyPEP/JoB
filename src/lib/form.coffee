# helper to create different form control elements
class JoB.Form

# helper to create different form control elements

class JoB.Form.OptionsHelper

  # selected can be an array or single value
  # value is always an array
  _selected: (value, selected) ->
    _.indexOf(_.flatten(new Array([selected])), value) >= 0

  _optionTags: (content, htmlAttributes) ->
    new JoB.Lib.Tag().contentTag('option', content, htmlAttributes)

  _optionTextAndValue: (element) ->
    if _.isArray(element) and element.length is 2
      value: element[0], content: element[1]
    else if _.isBoolean(element) or _.isString(element)
      value: element, content: element

  # Collection is currently a backbone collection or simple hash
  optionsFromCollectionForSelect: (collection, valueMethod = 'id', textMethod = 'name', selected=null) ->
    _collection = []
    _selected = []
    models = if collection? and _.isFunction(collection.toJSON) then collection.toJSON() else collection
    selectedModels = if selected? and _.isFunction(selected.toJSON) then selected.toJSON() else selected

    _.each models, (element) =>
      _collection.push [element[valueMethod], element[textMethod]]

      if selected and (_.isObject(selectedModels) or _.isArray(selectedModels))
        _selected.push(element[valueMethod]) if @_selected(element[valueMethod], _.pluck(_.flatten([selectedModels]), valueMethod))
      else
        null

    @optionsForSelect(_collection, _selected)


  optionsForSelect: (collection, selected=null) ->
    _.map collection, (element) =>
      optionTextAndValue      = @_optionTextAndValue(element)
      htmlAttributes          = {}
      htmlAttributes.value    = optionTextAndValue.value
      htmlAttributes.selected = if @_selected(optionTextAndValue.value, selected) then true else false
      @_optionTags(optionTextAndValue.content, htmlAttributes)

# requires JoB.lib.Translation
class JoB.Form.TagHelper
  # B: button_tag
  # C: check_box_tag, color_field_tag
  # D: date_field_tag, datetime_field_tag, datetime_local_field_tag
  # E: email_field_tag
  # F: field_set_tag, file_field_tag, form_tag
  # H: hidden_field_tag
  # I: image_submit_tag
  # L: label_tag
  # M: month_field_tag
  # N: number_field_tag
  # P: password_field_tag, phone_field_tag
  # R: radio_button_tag, range_field_tag
  # S: search_field_tag, select_tag, submit_tag
  # T: telephone_field_tag, text_area_tag, text_field_tag, time_field_tag
  # U: url_field_tag, utf8_enforcer_tag
  # W: week_field_tag

  defaults: {}

  # Attributes
  _nameAttribute: () ->
    "#{@base.ressourceName.toLowerCase()}[#{@base.fieldName.toLowerCase()}]"

  _idAttribute: () ->
    "#{@base.ressourceName.toLowerCase()}_#{@base.fieldName.toLowerCase()}"

  _classAttribute: () ->
    _class = "form-control"
    if @base.type?          then _class += " #{@base.type}"
    if @options.class?      then _class += " #{@options.class}"
    _class


  _placeholderAttribute: () ->
    placeholder = if _.isString(@options.placeholder)
      @options.placeholder
    else if @options.placeholder is 'undefined'
      translated = new JoB.Lib.Translation().translate(@options.placeholder)
      if translated? then translated else false
    else ""

    placeholder

  _valueAttribute: () ->
    value = if _.isString(@options.value) or _.isBoolean(@options.value)
      @options.value
    else if _.isObject(@base.ressource)
      if _.isFunction(@base.ressource.get)
        @base.ressource.get(@base.fieldName)
      else
        @base.ressource[@base.fieldName]
    else ""

    value

  # responsible to
  _htmlAttributes: () ->
    attributes = _.extend(@options, {
      class: @_classAttribute()
      name: @_nameAttribute()
      id: @_idAttribute()
      placeholder: @_placeholderAttribute()
      value: @_valueAttribute()
      type: @base.type
    })
    delete attributes.placeholder if _.isEmpty(attributes.placeholder)
    delete attributes.value if _.isEmpty(attributes.value)
    attributes

  _inputTag: () ->
    new JoB.Lib.Tag().contentTag('input', null, @_htmlAttributes())

  _genericTag: (tagName, content, options) ->
    new JoB.Lib.Tag().contentTag(tagName, content, options)

  _selectTag: (optionTags) ->
    attributes = @_htmlAttributes()
    delete attributes.type
    delete attributes.type
    attributes.name = attributes.name + "[]" if attributes.multiple
    new JoB.Lib.Tag().contentTag('select', optionTags, attributes)

  # Shortcuts for Setup
  _setBase: (ressourceName, fieldName, fieldType=null) ->
    @base = null
    @base =
      ressourceName: ressourceName
      fieldName: fieldName
    if fieldType?
      @base['type'] = fieldType

  _setOptions: (options) ->
    @options = null
    @options = _.defaults(options, @defaults)

  _setup: (ressourceName, fieldName, inputType, options={}) ->
    @_setBase(ressourceName, fieldName, inputType)
    @_setOptions(options)

  buttonTag: (content, options={}) ->
    @options = _.defaults({content: content}, options)
    @_genericTag('button', @options.content, @options)

  dateFieldTag: (ressourceName, fieldName, options={}) ->
    @_setup(ressourceName, fieldName, 'date', options)
    @_inputTag()

  datetimeFieldTag: (ressourceName, fieldName, options={}) ->
    options = _.defaults(options, {})
    @_setup(ressourceName, fieldName, 'time', options)
    @_inputTag()

  datetimeLocalFieldTag: () ->
    console.log "Not Yet Implemented"

  emailFieldTag: (ressourceName, fieldName, options={}) ->
    @_setup(ressourceName, fieldName, 'email', options)
    @_inputTag()

  fileFieldTag: (ressourceName, fieldName, options={}) ->
    @_setup(ressourceName, fieldName, 'file', options)
    @_inputTag()

  formTag: () ->
    console.log "Not Yet Implemented"

  hiddenFieldTag: (ressourceName, fieldName, options={}) ->
    @_setup(ressourceName, fieldName, 'hidden', options)
    @_inputTag()

  imageSubmitTag: (src, options={}) ->
    @options = _.defaults(options, {src: src, type: 'image'})
    @_genericTag('input', null, @options)

  labelTag: (forName, content, options={}) ->
    @options = _.defaults(options, {for: forName, content: content})
    @_genericTag('label', @options.content, @options)

  monthFieldTag: (ressourceName, fieldName, options={}) ->
    options = _.defaults(options, {min: 1, max: 100, step: 1})
    @_setup(ressourceName, fieldName, 'month', options)
    @_inputTag()

  numberFieldTag: (ressourceName, fieldName, options={}) ->
    options = _.defaults(options, {min: 1, max: 100, step: 1})
    @_setup(ressourceName, fieldName, 'number', options)
    @_inputTag()

  passwordFieldTag: (ressourceName, fieldName, options={}) ->
    @_setup(ressourceName, fieldName, 'password', options)
    @_inputTag()

  phoneFieldTag: (ressourceName, fieldName, options={}) ->
    @_setup(ressourceName, fieldName, 'tel', options)
    @_inputTag()

  radioButtonTag: (ressourceName, fieldName, checked = false, options={}) ->
    options = _.defaults(options, {checked: checked})
    @_setup(ressourceName, fieldName, 'radio', options)
    @_inputTag()

  rangeFieldTag: (ressourceName, fieldName, options={}) ->
    options = _.defaults(options, {min: 0, max: 100, step: 1})
    @_setup(ressourceName, fieldName, 'range', options)
    @_inputTag()

  searchFieldTag: (ressourceName, fieldName, options={}) ->
    @_setup(ressourceName, fieldName, 'search', options)
    @_inputTag()

  selectTag: (ressourceName, fieldName, optionTags = null, options={}) ->
    @_setup(ressourceName, fieldName, null, options)
    @_selectTag(optionTags)

  submitTag: (content, options={}) ->
    @options = _.defaults(options, {type: 'submit', name: "commit", value: content})
    @_genericTag('input', null, @options)

  telephoneFieldTag: (ressourceName, fieldName, options={}) ->
    @phoneFieldTag(ressourceName, fieldName, options)

  textAreaTag: (ressourceName, fieldName, content = null, options={}) ->
    @_setup(ressourceName, fieldName, 'textarea', options)
    @_genericTag('textarea', content, @_htmlAttributes())

  textFieldTag: (ressourceName, fieldName, options={}) ->
    @_setup(ressourceName, fieldName, 'text', options)
    @_inputTag()

  timeFieldTag: (ressourceName, fieldName, options={}) ->
    @_setup(ressourceName, fieldName, 'time', options)
    @_inputTag()

  urlFieldTag: (ressourceName, fieldName, options={}) ->
    @_setup(ressourceName, fieldName, 'url', options)
    @_inputTag()

  utf8EnforcerTag: () ->
    console.log "Not Yet Implemented"

  weekFieldTag: (ressourceName, fieldName, options={}) ->
    @_setup(ressourceName, fieldName, 'week', options)
    @_inputTag()

# Form Builder can be used to provide templates for
# input fields and wrappers.
class JoB.Form.FormBuilder
  # fields_for renders a label and control group. It uses the
  # bootstrap template by default :)
  # <%- @input('account', 'name') %>
  # <div class="form-group">
  #   <label for="account_name">Account Name</label>
  #   <input type="string" class="form-input form-control" name="account[name]" id="account_name">
  # </div>
  fields_for: (ressource, fieldName, {}={}) ->
    @["#{@options.typeName}Input"]()
