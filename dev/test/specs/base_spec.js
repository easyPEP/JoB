(function() {
  define(['jquery', 'js-fixtures'], function($, fixtures) {
    return describe("JoB.Lib.Base", function() {
      var helper;
      helper = new JoB.Lib.Base();
      return describe("JoB.Lib.Base.contentTag", function() {
        it("should create <a/> element", function() {
          var $link;
          $link = $(helper.contentTag('a'));
          return $link.is('a').should.be["true"];
        });
        it("should element with content", function() {
          var link;
          link = helper.contentTag('a', 'hello world');
          return $(link).text().should.eq('hello world');
        });
        it("should set css class", function() {
          var $link;
          $link = $(helper.contentTag('a', null, {
            "class": 'hello'
          }));
          return $link.attr('class').should.eq('hello');
        });
        it("should set data attribute", function() {
          var link;
          link = helper.contentTag('a', null, {
            'data-user-id': 10
          });
          return $(link).data('user-id').should.eq(10);
        });
        it("should ignore css attribute", function() {
          var $link;
          $link = $(helper.contentTag('a', null, {
            css: {
              color: '#000',
              fontSize: '12px'
            }
          }));
          return ($link.attr('css') === void 0).should.be["true"];
        });
        it("should be able to pass css hash to set styling attributes", function() {
          var link, styles;
          link = helper.contentTag('a', null, {
            css: {
              color: '#000',
              fontSize: '12px'
            }
          });
          styles = $(link).css(['color', 'fontSize']);
          styles.color.should.eq("rgb(0, 0, 0)");
          return styles.fontSize.should.eq("12px");
        });
        it("should generate complex input attribute", function() {
          var input;
          return input = helper.contentTag('input', null, {
            css: {
              color: "#000"
            },
            'value': true,
            name: "user[name]",
            id: "user_name",
            placeholder: "User-Name"
          });
        });
        return it("should be able to add child", function() {
          var $wrapper, link;
          link = helper.contentTag('a', 'hello world', {
            href: "/users/10"
          });
          $wrapper = $(helper.contentTag('div', link, {
            "class": 'link-wrapper'
          }));
          return $wrapper.find('a').length.should.eq(1);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=../../../dev/test/specs/base_spec.js.map
