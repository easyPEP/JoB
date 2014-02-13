define ['jquery', 'js-fixtures'], ($, fixtures) ->

  describe "JoB.Lib.Routing", ->

    helper = new JoB.Lib.Routing()

    it "should return blank string", ->
      url = helper.urlFor()
      url.should.eq ''

    it "should generate basic url from string", ->
      url = helper.urlFor('#/users/10')
      url.should.eq '#/users/10'
