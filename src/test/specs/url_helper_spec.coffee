define ['jquery', 'js-fixtures'], ($, fixtures) ->

  describe "JoB.Lib.UrlHelper", ->

    helper = new JoB.Lib.UrlHelper()

    it "should have correct link text", ->
      $link = $ helper.linkTo("Profile", '/users/10')
      $link.text().should.eq 'Profile'

    it "given a string url should return same string", ->
      $link = $ helper.linkTo("Profile", '/users/10')
      $link.attr('href').should.eq '/users/10'
