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

        .controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
            $scope.$parent.clearFabs();
            $timeout(function() {
                $scope.$parent.hideHeader();
            }, 0);
            ionicMaterialInk.displayEffect();
        })

        .controller('PromosCtrl', function($scope, Negocios, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
 $scope.tituloApartado = "Promos cerca";
            var datos = new Array();
            var datosMostrar = new Array();
            $timeout(traigoPromosRadar, 1500);

            function traigoPromosRadar() {
                var datos = new Array();
                var datosMostrar = new Array();

                var textoRespuesta;

                datos = Negocios.radar(-31.788950, -60.447605, 500);
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


 .controller('PromosTodasCtrl', function($scope, Negocios, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

 $scope.tituloApartado = "Todas las Promos";
            var datos = new Array();
            var datosMostrar = new Array();
            $timeout(traigoPromosTodas, 1500);

            function traigoPromosTodas() {
                var datos = new Array();
                var datosMostrar = new Array();

                var textoRespuesta;

                datos = Negocios.traerTodo(-31.788950, -60.447605, 10000);
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
        
        .controller('PromoDetailCtrl', function($scope, $stateParams, Negocios) {
            $scope.promo = Negocios.get($stateParams.promoId);
        })


        .controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
            // Set Header
            $scope.$parent.showHeader();
            $scope.$parent.clearFabs();
            $scope.isExpanded = false;
            $scope.$parent.setExpanded(false);
            $scope.$parent.setHeaderFab(false);

            // Set Motion
            $timeout(function() {
                ionicMaterialMotion.slideUp({
                    selector: '.slide-up'
                });
            }, 300);

            $timeout(function() {
                ionicMaterialMotion.fadeSlideInRight({
                    startVelocity: 3000
                });
            }, 700);

            // Set Ink
            ionicMaterialInk.displayEffect();
        })

        .controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
            $scope.$parent.showHeader();
            $scope.$parent.clearFabs();
            $scope.isExpanded = true;
            $scope.$parent.setExpanded(true);
            $scope.$parent.setHeaderFab('right');

            $timeout(function() {
                ionicMaterialMotion.fadeSlideIn({
                    selector: '.animate-fade-slide-in .item'
                });
            }, 200);

            // Activate ink for controller
            ionicMaterialInk.displayEffect();
        })

        .controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
            $scope.$parent.showHeader();
            $scope.$parent.clearFabs();
            $scope.isExpanded = true;
            $scope.$parent.setExpanded(true);
            $scope.$parent.setHeaderFab(false);

            // Activate ink for controller
            ionicMaterialInk.displayEffect();

            ionicMaterialMotion.pushDown({
                selector: '.push-down'
            });
            ionicMaterialMotion.fadeSlideInRight({
                selector: '.animate-fade-slide-in .item'
            });

        });