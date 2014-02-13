(function() {
  define(['jquery', 'js-fixtures'], function($, fixtures) {
    return describe("JoB.Lib.Routing", function() {
      var helper;
      helper = new JoB.Lib.Routing();
      it("should return blank string", function() {
        var url;
        url = helper.urlFor();
        return url.should.eq('');
      });
      return it("should generate basic url from string", function() {
        var url;
        url = helper.urlFor('#/users/10');
        return url.should.eq('#/users/10');
      });
    });
  });

}).call(this);

//# sourceMappingURL=../../../dev/test/specs/routing_helper_spec.js.map
