'use strict';

describe('Controller: CrimapCtrl', function () {

  // load the controller's module
  beforeEach(module('wheretoliveApp'));

  var CrimapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrimapCtrl = $controller('CrimapCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
