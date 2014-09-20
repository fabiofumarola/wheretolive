'use strict';

describe('Controller: TipsCtrl', function () {

  // load the controller's module
  beforeEach(module('wheretoliveApp'));

  var TipsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TipsCtrl = $controller('TipsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
