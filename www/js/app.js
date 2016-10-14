// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-material', 'ionMdInput', 'ngCookies'])

        .run(function($ionicPlatform, auth, $rootScope) {



            $ionicPlatform.ready(function() {

                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }

                $rootScope.$on('$routeChangeStart', function()
                {
                    //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
                    //la cuÃ¡l hemos inyectado en la acciÃ³n run de la aplicaciÃ³n
                    auth.checkStatus();
                })
            });
        })



        .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

            // Turn off caching for demo simplicity's sake
            $ionicConfigProvider.views.maxCache(0);

            /*
             // Turn off back button text
             $ionicConfigProvider.backButton.previousTitleText(false);
             */

            $stateProvider.state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

                    .state('app.promos', {
                        url: '/promos',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/promos.html',
                                controller: 'PromosCtrl'
                            },
                            'fabContent': {
                                template: '',
                                controller: function($timeout) {
                                    /*$timeout(function () {
                                     document.getElementById('fab-profile').classList.toggle('on');
                                     }, 800);*/
                                }
                            }
                        }
                    })

                    .state('app.promos-todas', {
                        url: '/promos-todas',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/promos.html',
                                controller: 'PromosTodasCtrl'
                            },
                            'fabContent': {
                                template: '',
                                controller: function($timeout) {
                                    /*$timeout(function () {
                                     document.getElementById('fab-profile').classList.toggle('on');
                                     }, 800);*/
                                }
                            }
                        }
                    })

                    .state('app.intro', {
                        url: '/intro',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/intro.html',
                                controller: 'IntroCtrl'
                            },
                            'fabContent': {
                                template: ''
                            }
                        }
                    })

                    .state('app.login', {
                        url: '/login',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/login.html',
                                controller: 'LoginCtrl'
                            },
                            'fabContent': {
                                template: ''
                            }
                        }
                    })


                    .state('app.promo-detail-todas', {
                        url: '/todas/:promoId',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/promo-detail.html',
                                controller: 'PromoDetailCtrl'
                            }
                        }
                    })
                    ;

            ;

            // if none of the above states are matched, use this as the fallback
//            $urlRouterProvider.otherwise('/app/login');
            $urlRouterProvider.otherwise("/app/intro");
        });
