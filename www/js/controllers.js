/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

        .controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
            // Form data for the login modal
            $scope.loginData = {};
            $scope.isExpanded = false;
            $scope.hasHeaderFabLeft = false;
            $scope.hasHeaderFabRight = false;

            var navIcons = document.getElementsByClassName('ion-navicon');
            for (var i = 0; i < navIcons.length; i++) {
                navIcons.addEventListener('click', function() {
                    this.classList.toggle('active');
                });
            }

            ////////////////////////////////////////
            // Layout Methods
            ////////////////////////////////////////

            $scope.hideNavBar = function() {
                document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
            };

            $scope.showNavBar = function() {
                document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
            };

            $scope.noHeader = function() {
                var content = document.getElementsByTagName('ion-content');
                for (var i = 0; i < content.length; i++) {
                    if (content[i].classList.contains('has-header')) {
                        content[i].classList.toggle('has-header');
                    }
                }
            };

            $scope.setExpanded = function(bool) {
                $scope.isExpanded = bool;
            };

            $scope.setHeaderFab = function(location) {
                var hasHeaderFabLeft = false;
                var hasHeaderFabRight = false;

                switch (location) {
                    case 'left':
                        hasHeaderFabLeft = true;
                        break;
                    case 'right':
                        hasHeaderFabRight = true;
                        break;
                }

                $scope.hasHeaderFabLeft = hasHeaderFabLeft;
                $scope.hasHeaderFabRight = hasHeaderFabRight;
            };

            $scope.hasHeader = function() {
                var content = document.getElementsByTagName('ion-content');
                for (var i = 0; i < content.length; i++) {
                    if (!content[i].classList.contains('has-header')) {
                        content[i].classList.toggle('has-header');
                    }
                }

            };

            $scope.hideHeader = function() {
                $scope.hideNavBar();
                $scope.noHeader();
            };

            $scope.showHeader = function() {
                $scope.showNavBar();
                $scope.hasHeader();
            };

            $scope.clearFabs = function() {
                var fabs = document.getElementsByClassName('button-fab');
                if (fabs.length && fabs.length > 1) {
                    fabs[0].remove();
                }
            };
        })

        .controller('IntroCtrl', function($scope, $state, $timeout, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion) {

            // Called to navigate to the main app
            $scope.startApp = function() {
                $state.go('app.promos');
            };
            $scope.next = function() {
                $ionicSlideBoxDelegate.next();
            };
            $scope.previous = function() {
                $ionicSlideBoxDelegate.previous();
            };

            // Called each time the slide changes
            $scope.slideChanged = function(index) {
                $scope.slideIndex = index;
            };


            $timeout(function() {
                $scope.isExpanded = true;
                $scope.$parent.setExpanded(true);
                // Set Motion
                ionicMaterialMotion.fadeSlideInRight();

                // Set Ink
                ionicMaterialInk.displayEffect();
            }, 500);

        })

        .controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, auth) {
//            alert("controller");
            $scope.login = function()
            {
                auth.login($scope.username, $scope.password);

            }
//              alert($scope.username);

            $scope.$parent.clearFabs();
            $timeout(function() {
                $scope.$parent.hideHeader();
            }, 0);
            ionicMaterialInk.displayEffect();


        })

        .controller('PromosCtrl', function($scope, auth, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
            $scope.tituloApartado = "Promos cerca";
            var datos = new Array();
            var datosMostrar = new Array();
            $timeout(traigoPromosRadar, 1500);

            function traigoPromosRadar() {
                var datos = new Array();
                var datosMostrar = new Array();

                var textoRespuesta;

                datos = auth.radar(-31.788950, -60.447605, 500);
                textoRespuesta = datos[0];

                var k = 0;
                for (i = 1; i < datos.length; i++) {
                    datosMostrar[k] = datos[i];
                    k++;
                }
                $scope.mostrar = true;
                $scope.textoRespuesta = textoRespuesta;
                $scope.negocios = datosMostrar;

                // Set Header
                $scope.$parent.showHeader();
                $scope.$parent.clearFabs();
                $scope.$parent.setHeaderFab('left');

                // Delay expansion
                $timeout(function() {
                    $scope.isExpanded = true;
                    $scope.$parent.setExpanded(true);
                    // Set Motion
                    ionicMaterialMotion.fadeSlideInRight();

                    // Set Ink
                    ionicMaterialInk.displayEffect();
                }, 500);
            }

            $scope.doRefresh = function() {
//                $scope.mostrar = false;

//                console.log('Refreshing!');
                $timeout(function() {
                    //simulate async response
                    traigoPromosRadar;
                    //Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                }, 3000);

            };

        })


        .controller('PromosTodasCtrl', function($scope, auth, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

            $scope.tituloApartado = "Todas las Promos";
            var datos = new Array();
            var datosMostrar = new Array();
            $timeout(traigoPromosTodas, 1500);

            function traigoPromosTodas() {
                var datos = new Array();
                var datosMostrar = new Array();

                var textoRespuesta;

                datos = auth.traerTodo(-31.788950, -60.447605, 10000);
                textoRespuesta = datos[0];

                var k = 0;
                for (i = 1; i < datos.length; i++) {
                    datosMostrar[k] = datos[i];
                    k++;
                }
                $scope.mostrar = true;
                $scope.textoRespuesta = textoRespuesta;
                $scope.negocios = datosMostrar;

                // Set Header
                $scope.$parent.showHeader();
                $scope.$parent.clearFabs();
                $scope.$parent.setHeaderFab('left');

                // Delay expansion
                $timeout(function() {
                    $scope.isExpanded = true;
                    $scope.$parent.setExpanded(true);
                    // Set Motion
                    ionicMaterialMotion.fadeSlideInRight();

                    // Set Ink
                    ionicMaterialInk.displayEffect();
                }, 500);
            }

            $scope.doRefresh = function() {
//                $scope.mostrar = false;

//                console.log('Refreshing!');
                $timeout(function() {
                    //simulate async response
                    traigoPromosTodas;
                    //Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                }, 3000);

            };

        })

        .controller('PromoDetailCtrl', function($scope, $stateParams, auth) {
            $scope.promo = auth.get($stateParams.promoId);
        })
        ;