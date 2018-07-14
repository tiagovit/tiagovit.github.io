angular.module('MyApp',['ngMaterial'])
    .run(function () {
        console.log('MyApp is ready!');

    }).controller("Ctrl1", function ($scope, $timeout, $mdBottomSheet, $mdToast) {


    $.getJSON("databases/dbCountryCodes.json", function(json) {
        var arr = new Array();
        $.each(json, function (i, item) {
            arr.push(json[i].alpha_2);
        })
        arr.sort();
        $scope.dbCountryCodes = arr;
    });

    $.getJSON("databases/dbCurrency.json", function(json) {
        var arr = new Array();
        $.each(json, function (i, item) {
            arr.push(json[i].cc);
        })


        $scope.dbCurrency = arr;
    });



    $scope.showListBottomSheet = function() {
        var parentEl = angular.element(document.querySelector('.red'));
        $scope.alert = '';
        $mdBottomSheet.show({
            disableParentScroll:true,
            parent:parentEl,
            templateUrl: 'template/newCountryForm.html',
            controller: 'Ctrl1'
        }).then(function(clickedItem) {
            $scope.alert = clickedItem['name'] + ' clicked!';
        }).catch(function(error) {
            // User clicked outside or hit escape
        });
    };

});