define ['jquery', 'js-fixtures'], ($, fixtures) ->

  describe "JoB.Form", ->

    describe "JoB.Form.OptionsHelper", ->

      helper = new JoB.Form.OptionsHelper()
      ruby = new Backbone.Model id: 6, name: 'Ruby'
      javascript = new Backbone.Model id: 7, name: 'Javascript'
      backboneCollection = new Backbone.Collection([ruby, javascript])

      describe "optionsForSelect", ->
        it "should generate 2 options tags for Array", ->
          $options = $ helper.optionsForSelect([ "VISA", "MasterCard" ])
          $options.length.should.eq 2

        it "should generate 2 options tags for Boolean", ->
          $options = $ helper.optionsForSelect([true, false])
          $options.length.should.eq 2

        it "should mark an option as selected", ->
          $options = $ helper.optionsForSelect(["VISA", "MasterCard"], "VISA")
          $($options[0]).attr('selected').should.eq 'selected'

        it "should mark both option as selected", ->
          $options = $ helper.optionsForSelect(["VISA", "MasterCard"], ["VISA", "MasterCard"])
          $($options[0]).attr('selected').should.eq 'selected'
          $($options[1]).attr('selected').should.eq 'selected'

      describe "optionsFromCollectionForSelect", ->
        it "should generate 2 options tags for Backbone", ->
          $options = $ helper.optionsFromCollectionForSelect(backboneCollection, 'id', 'name')
          $options.length.should.eq 2

        it "should mark an option as selected", ->
          $options = $ helper.optionsFromCollectionForSelect(backboneCollection, 'id', 'name', javascript)
          $($options[1]).attr('selected').should.eq 'selected'

        it "should generate 2 options tags for Object", ->
          $options = $ helper.optionsFromCollectionForSelect([{id: 1, name: 'Ruby'}, {id: 2, name: 'Javascript'}], 'id', 'name')
          $options.length.should.eq 2

        it "should mark an option as selected from Object", ->
          $options = $ helper.optionsFromCollectionForSelect([{id: 1, name: 'Ruby'}, {id: 2, name: 'Javascript'}], 'id', 'name', {id: 1, name: 'Ruby'})
          $($options[0]).attr('selected').should.eq 'selected'

        it "should mark both options as selected from Object", ->
          $options = $ helper.optionsFromCollectionForSelect([{id: 1, name: 'Ruby'}, {id: 2, name: 'Javascript'}], 'id', 'name', [{id: 1, name: 'Ruby'}, {id: 2, name: 'Javascript'}])
          $($options[0]).attr('selected').should.eq 'selected'
          $($options[1]).attr('selected').should.eq 'selected'

    describe "JoB.Form.TagHelper", ->

      helper = new JoB.Form.TagHelper()

      describe "attributes", ->
        input = helper.textFieldTag('account', 'name', {value: true, inputClass: 'foo', placeholder: 'foo bar'})
        $input = $ input

        it "should have correct name", ->
          $input.attr('name').should.eq 'account[name]'

        it "should have correct id", ->
          $input.attr('id').should.eq 'account_name'

        it "should have an additional class identifying control type", ->
          $input.hasClass('text').should.be.true

        it "should have an additional class", ->
          $input.hasClass('foo').should.be.true

        it "should have an placeholder text", ->
          $input.attr('placeholder').should.eq 'foo bar'

        it "should have value attribute", ->
          $input.val().should.eq 'true'

      describe "new JoB.Form.TagHelper.textFieldTag()", ->
        it "should return input[type=text]", ->
          $input = $ helper.textFieldTag('account', 'name')
          $input.attr('type').should.eq 'text'

      describe "new JoB.Form.TagHelper.buttonTag()", ->
        it "should return button", ->
          $input = $ helper.buttonTag('button text')
          $input.prop("tagName").should.eq 'BUTTON'

      describe "new JoB.Form.TagHelper.selectTag()", ->
        it "should have multiple attr", ->
          input = helper.selectTag('account', 'name', null, multiple: true)
          $(input).attr("multiple").should.eq 'multiple'

        it "should add Array ending to name", ->
          input = helper.selectTag('account', 'name', null, multiple: true)
          $(input).attr("name").should.eq 'account[name][]'
