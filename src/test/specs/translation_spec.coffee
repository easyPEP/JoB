define ['jquery', 'js-fixtures'], ($, fixtures) ->

  describe "JoB.Lib.Translation", ->

    helper = new JoB.Lib.Translation()

    describe "attributes", ->
      $input = null

      it "should have correct name", ->
        "false".should.eq true
