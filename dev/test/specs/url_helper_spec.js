(function() {
  define(['jquery', 'js-fixtures'], function($, fixtures) {
    return describe("JoB.Lib.UrlHelper", function() {
      var helper;
      helper = new JoB.Lib.UrlHelper();
      it("should have correct link text", function() {
        var $link;
        $link = $(helper.linkTo("Profile", '/users/10'));
        return $link.text().should.eq('Profile');
      });
      return it("given a string url should return same string", function() {
        var $link;
        $link = $(helper.linkTo("Profile", '/users/10'));
        return $link.attr('href').should.eq('/users/10');
      });
    });
  });

}).call(this);

//# sourceMappingURL=../../../dev/test/specs/url_helper_spec.js.map
