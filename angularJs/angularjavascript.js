angular.module('MyApp',['ngMaterial','duScroll'])
    .run(function () {
        console.log('MyApp is ready!');

    }).controller("Ctrl1", function ($scope, $timeout, $mdBottomSheet, $mdDialog, $document) {

        getDatabaseItems();


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


    function getDatabaseItems(){

        db.collection('country').get().then((snapshot) => {
            var dataToTargetFunction = [];
            snapshot.docs.forEach(doc => {
                dataToTargetFunction.push(doc.data());
            });
            console.log(dataToTargetFunction);
            $scope.dbCountryFromFirestore = dataToTargetFunction;
            $scope.$digest();

        });
    }





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
        });
    };

    $scope.submitCountryForm = function () {
        countryForm = $('#newCountryForm');


        var mCountry = countryForm[0].country.value;
        var mCapital = countryForm[0].capital.value;
        var mGdp = countryForm[0].gdp.value;
        var mPopulation = countryForm[0].population.value;
        var mIsoCode = $scope.countryForm.isoCode;
        var mCurrency = $scope.countryForm.currency;
        //console.log(mCountry,mCapital,mGdp,mPopulation,mIsoCode, mCurrency);

        newCountryObject = new Object({
            capital : mCapital,
            country: mCountry,
            gdp : mGdp,
            isoCode : mIsoCode,
            language : [],
            money : mCurrency,
            population : mPopulation
        });


        db.collection('country').doc(mCountry).set({
            capital : mCapital,
            country: mCountry,
            gdp : mGdp,
            isoCode : mIsoCode,
            language : [],
            money : mCurrency,
            population : mPopulation
        }).then(function () {
            $scope.dbCountryFromFirestore.push(newCountryObject);
            $scope.$digest();
            $mdBottomSheet.hide();
            //location.reload();
        }).catch(function () {
            alert("There was an error submiting the data");
        });



    };

    $scope.showConfirmDialog = function(ev, id) {
        // Appending dialog to document.body to cover sidenav in docs app
        console.log(id);
        var confirm = $mdDialog.confirm({
            onComplete : function afterShowAnimation() {
                var $dialog = angular.element(document.querySelector('md-dialog'));
                var $actionsSection = $dialog.find('md-dialog-actions');
                var $confirmButton = $actionsSection.children()[1];
                angular.element($confirmButton).addClass('md-raised md-warn');
            }
        })
            .title('You\'re about to delete '+id)
            .textContent('All of the data will be lost')
            .ariaLabel('Country delete')
            .targetEvent(ev)
            .ok('delete')
            .cancel('cancel');

        $mdDialog.show(confirm).then(function() {

            db.collection('country').doc(id).delete().then(function () {
                document.getElementById(id).remove();
            }).catch(function () {
                alert('Unable to remove country')
            });
        }, function() {
            //Something
        });
    };

    $scope.scrollToSpain = function () {
        alert("to asdf");
        $document.scrollTopAnimated(0, 5000).then(function() {
            console && console.log('You just scrolled to the top!');
        });
    }

});