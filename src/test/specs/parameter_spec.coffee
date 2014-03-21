define ['jquery', 'js-fixtures'], ($, fixtures) ->

  describe "JoB.Parameter", ->

    helper = new JoB.Parameter()

    user =
      created_at: "01.02.2014"
      account_id: "1"
      type: "absences"

    describe "parse", ->

      it "should return blank", ->
        console.log helper.parse(user)
