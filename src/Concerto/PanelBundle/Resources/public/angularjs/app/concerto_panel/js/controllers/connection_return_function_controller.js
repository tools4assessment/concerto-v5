function ConnectionReturnFunctionController($scope, $uibModalInstance, $timeout, $http, RDocumentation, object, title, editable) {
  $scope.object = object;
  $scope.title = title;
  $scope.editable = editable;

  $scope.codeOptions = {
    lineWrapping: true,
    lineNumbers: true,
    mode: 'r',
    viewportMargin: Infinity,
    readOnly: !editable,
    hintOptions: {
      completeSingle: false,
      wizardService: RDocumentation
    },
    extraKeys: {
      "F10": function (cm) {
        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
      },
      "Esc": function (cm) {
        if (cm.getOption("fullScreen"))
          cm.setOption("fullScreen", false);
      },
      "Shift-Space": "autocomplete"
    }
  };
  if (RDocumentation.functionIndex === null) {
    $http.get(RDocumentation.rCacheDirectory + 'functionIndex.json').success(function (data) {
      if (data !== null) {
        RDocumentation.functionIndex = data;
        $scope.codeOptions.hintOptions.functionIndex = data;
      }
    });
  } else {
    $scope.codeOptions.hintOptions.functionIndex = RDocumentation.functionIndex;
  }

  $scope.change = function () {
    $scope.object.defaultReturnFunction = "0";
    $uibModalInstance.close({
      action: "save",
      object: $scope.object
    });
  };

  $scope.delete = function () {
    $uibModalInstance.close({
      action: "delete",
      object: $scope.object
    });
  };

  $scope.reset = function () {
    $scope.object.defaultReturnFunction = "1";
    $uibModalInstance.close({
      action: "save",
      object: $scope.object
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss(0);
  };

  $timeout(function () {
    $scope.codemirrorForceRefresh++;
  }, 20);
}