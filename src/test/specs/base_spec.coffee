define ['jquery', 'js-fixtures'], ($, fixtures) ->

  describe "JoB.Lib.Base", ->

    helper = new JoB.Lib.Base()

    describe "JoB.Lib.Base.contentTag", ->

      it "should create <a/> element", ->
        $link = $ helper.contentTag('a')
        $link.is('a').should.be.true

      it "should element with content", ->
        link = helper.contentTag('a', 'hello world')
        $(link).text().should.eq 'hello world'

      it "should set css class", ->
        $link = $ helper.contentTag('a', null, {class: 'hello'})
        $link.attr('class').should.eq 'hello'

      it "should set data attribute", ->
        link = helper.contentTag('a', null, {'data-user-id': 10})
        $(link).data('user-id').should.eq 10

      it "should ignore css attribute", ->
        $link = $ helper.contentTag('a', null, {css: {color: '#000', fontSize: '12px' }})
        ($link.attr('css') is undefined).should.be.true

      it "should be able to pass css hash to set styling attributes", ->
        link = helper.contentTag('a', null, {css: {color: '#000', fontSize: '12px' }})
        styles = $(link).css(['color', 'fontSize'])
        styles.color.should.eq "rgb(0, 0, 0)"
        styles.fontSize.should.eq "12px"

      it "should generate complex input attribute", ->
        input = helper.contentTag('input', null, {css: {color: "#000"}, 'value': true, name: "user[name]", id: "user_name", placeholder: "User-Name"})

      it "should be able to add child", ->
        link = helper.contentTag('a', 'hello world', href: "/users/10")
        $wrapper = $ helper.contentTag('div', link, {class: 'link-wrapper'})
        $wrapper.find('a').length.should.eq 1
