angular.module('starter.services', [])

        .factory('Negocios', function($http) {
            var url;
            var textoRespuesta;
            var respuesta = new Array();
            var distancias = new Array();

            nuevasPromosArray = new Array();
            negocioDatos = new Array();

            var esta = "no";
            var aux;
            var tiempoDeIteracion;
            var metros;

            var latitudNegocio;
            var logitudNegocio;

            iniciar(1);

            function iniciar(uuid) {
                url = "../../eupromo/web/eu/es/" + uuid + "?callback=JSON_CALLBACK";
                $http.jsonp(url)
                        .then(function successCallback(response) {
                            respuesta = response.data.respuesta;

                            if (respuesta.length != 0) {
                                var k = 0;

                                if (nuevasPromosArray.length != 0) {
                                    for (i = 0; i < respuesta.length; i++) {
                                        for (j = 0; j < nuevasPromosArray.length; j++) {
                                            if (nuevasPromosArray[j] == respuesta[i].id) {
                                                esta = "si";
                                            }
                                            if (esta == "si") {
                                                j = nuevasPromosArray.length;
                                            }
                                        }
                                        if (esta == "no") {
                                            nuevasPromosArray[k] = respuesta[i];
                                            k++;
                                        }
                                        esta = "no";
                                    }
                                } else {
                                    for (i = 0; i < respuesta.length; i++) {

                                        nuevasPromosArray[i] = respuesta[i];
                                    }
                                }


                            }


                        }
                        , function errorCallback(response) {
//Second function handles error
                            textoRespuesta = "No se encontraron negocios cerca.";

                        });
            }
            return {
                /* inicia trayendo todos los negocios */
                iniciar: function(uuid) {
                    iniciar(uuid);
                },
                /* mostrar todos los negocios */
                traerTodo: function(latitudDispositivo, logitudDispositivo, metros) {
                    negocioDatos = new Array();
                  
                    textoRespuesta = "Encontramos promos.";

                    if (nuevasPromosArray.length != 0) {
                        k = 1;
                        for (i = 0; i < nuevasPromosArray.length; i++) {
//calculo las distancias
                            latitudNegocio = nuevasPromosArray[i].NegocioGpsLatitud;
                            logitudNegocio = nuevasPromosArray[i].NegocioGpsLongitud;

                            var deg2rad = 0.017453292519943;
                            var rad2deg = 57.295779513082;
                            var theta = logitudNegocio - logitudDispositivo;
                            var dist = Math.sin((latitudNegocio * deg2rad)) * Math.sin((latitudDispositivo * deg2rad)) +
                                    Math.cos((latitudNegocio * deg2rad)) * Math.cos((latitudDispositivo * deg2rad)) * Math.cos((theta * deg2rad));
                            dist = Math.acos(dist);
                            dist = (dist * rad2deg);
                            var miles = dist * 60 * 1.1515;
//            //distancia pasada a metro.
                            var distancia = (miles * 1.609344) * 1000;

                            distancias[i] = distancia;

                            if (distancia < metros) {

                                negocioDatos[0] = textoRespuesta;
                                negocioDatos[k] = nuevasPromosArray[i];
                                k++;
                            }
                        }
                    } else {
                        /* si no se encontraron resultados de negocios en el sistema. */

                        textoRespuesta = "No hay promos cercas";
                        negocioDatos[0] = textoRespuesta;
                        return negocioDatos;
                    }


//creo una variable axiliar para determinar la menor distancia.
                    aux = distancias[0];
                    //recorro el array para encontrar la menor distancia.
                    for (j = 0; j < distancias.length; j++) {
                        if (aux > distancias[j]) {
                            aux = distancias[j];
                        }
                    }

                    switch (true) {
                        case (aux > metros):
                            {
//asigno un tiempo de iteracion dependiendo de la prioridad
//60 segundos

                                textoRespuesta = "No hay promos cercas";
                                break;
                            }
                    }


                    negocioDatos[0] = textoRespuesta;
                    return negocioDatos;

                },
//        traerTodo: function() {
//            textoRespuesta = "Todas las promos para vos.";
//            negocioDatos[0] = textoRespuesta;
//            if (nuevasPromosArray.length != 0) {
//                k = 1;
//                for (i = 0; i < nuevasPromosArray.length; i++) {
////calculo las distancias
//
//                    negocioDatos[k] = nuevasPromosArray[i];
//                    k++;
//
//                }
//            } else {
//                /* si no se encontraron resultados de negocios en el sistema. */
//
//                textoRespuesta = "No hay promos cercas";
//                negocioDatos[0] = textoRespuesta;
//                return negocioDatos;
//            }
//
//
//
//            return negocioDatos;
//        },
                /* mostrar los negocios a la redonda los negocios */
                radar: function(latitudDispositivo, logitudDispositivo, metros) {
                    negocioDatos = new Array();

                    textoRespuesta = "Encontramos algo a " + metros + " metros a la redonda.";

                    if (nuevasPromosArray.length != 0) {
                        k = 1;
                        for (i = 0; i < nuevasPromosArray.length; i++) {
//calculo las distancias
                            latitudNegocio = nuevasPromosArray[i].NegocioGpsLatitud;
                            logitudNegocio = nuevasPromosArray[i].NegocioGpsLongitud;

                            var deg2rad = 0.017453292519943;
                            var rad2deg = 57.295779513082;
                            var theta = logitudNegocio - logitudDispositivo;
                            var dist = Math.sin((latitudNegocio * deg2rad)) * Math.sin((latitudDispositivo * deg2rad)) +
                                    Math.cos((latitudNegocio * deg2rad)) * Math.cos((latitudDispositivo * deg2rad)) * Math.cos((theta * deg2rad));
                            dist = Math.acos(dist);
                            dist = (dist * rad2deg);
                            var miles = dist * 60 * 1.1515;
//            //distancia pasada a metro.
                            var distancia = (miles * 1.609344) * 1000;

                            distancias[i] = distancia;

                            if (distancia < metros) {

                                negocioDatos[0] = textoRespuesta;
                                negocioDatos[k] = nuevasPromosArray[i];
                                k++;
                            }
                        }
                    } else {
                        /* si no se encontraron resultados de negocios en el sistema. */

                        textoRespuesta = "No hay promos cercas";
                        negocioDatos[0] = textoRespuesta;
                        return negocioDatos;
                    }


//creo una variable axiliar para determinar la menor distancia.
                    aux = distancias[0];
                    //recorro el array para encontrar la menor distancia.
                    for (j = 0; j < distancias.length; j++) {
                        if (aux > distancias[j]) {
                            aux = distancias[j];
                        }
                    }

                    switch (true) {
                        case (aux > metros):
                            {
//asigno un tiempo de iteracion dependiendo de la prioridad
//60 segundos

                                textoRespuesta = "No hay promos cercas";
                                break;
                            }
                    }


                    negocioDatos[0] = textoRespuesta;
                    return negocioDatos;

                },
                /* mostrar negocios cerca segun gps */
                traerCercas: function(latitudDispositivo, logitudDispositivo) {
                    negocioDatos = new Array();
                    tiempoDeIteracion = 10000;
                    textoRespuesta = "Encontramos algo.";
                    metros = 20;

                    if (nuevasPromosArray.length != 0) {
                        var k = 2;

                        for (i = 0; i < nuevasPromosArray.length; i++) {
//calculo las distancias
                            latitudNegocio = nuevasPromosArray[i].NegocioGpsLatitud;
                            logitudNegocio = nuevasPromosArray[i].NegocioGpsLongitud;

                            var deg2rad = 0.017453292519943;
                            var rad2deg = 57.295779513082;
                            var theta = logitudNegocio - logitudDispositivo;
                            var dist = Math.sin((latitudNegocio * deg2rad)) * Math.sin((latitudDispositivo * deg2rad)) +
                                    Math.cos((latitudNegocio * deg2rad)) * Math.cos((latitudDispositivo * deg2rad)) * Math.cos((theta * deg2rad));
                            var dist = Math.acos(dist);
                            var dist = (dist * rad2deg);
                            var miles = dist * 60 * 1.1515;
//            //distancia pasada a metro.
                            var distancia = (miles * 1.609344) * 1000;

                            distancias[i] = distancia;

                            if (distancia < metros) {
                                negocioDatos[0] = tiempoDeIteracion;
                                negocioDatos[1] = textoRespuesta;
                                negocioDatos[k] = nuevasPromosArray[i];
                                k++;
                            }
                        }

                    } else {
                        /* si no se encontraron resultados de negocios en el sistema. */
                        tiempoDeIteracion = 90000;
                        textoRespuesta = "No hay promos cercas";
                        negocioDatos[0] = tiempoDeIteracion;
                        negocioDatos[1] = textoRespuesta;
                        return negocioDatos;
                    }


//creo una variable axiliar para determinar la menor distancia.
                    aux = distancias[0];
                    //recorro el array para encontrar la menor distancia.
                    for (j = 0; j < distancias.length; j++) {
                        if (aux > distancias[j]) {
                            aux = distancias[j];
                        }
                    }

                    switch (true) {
                        case (aux < 50 && aux > metros):
                            {
//asigno un tiempo de iteracion dependiendo de la prioridad
//20 segundos
                                tiempoDeIteracion = 20000;
                                textoRespuesta = "Hay promos cerquita";
                                break;
                            }
                        case (aux < 100 && aux > metros):
                            {

//asigno un tiempo de iteracion dependiendo de la prioridad
//40 segundos
                                tiempoDeIteracion = 40000;
                                textoRespuesta = "Hay promos algo cerca";
                                break;
                            }
                        case (aux < 200 && aux > metros):
                            {
//asigno un tiempo de iteracion dependiendo de la prioridad
//60 segundos
                                tiempoDeIteracion = 60000;
                                textoRespuesta = "Hay promos no muy lejos";
                                break;
                            }
                        case (aux > 200):
                            {
//asigno un tiempo de iteracion dependiendo de la prioridad
//60 segundos
                                tiempoDeIteracion = 90000;
                                textoRespuesta = "No hay promos cercas";
                                break;
                            }
                    }


                    negocioDatos[0] = tiempoDeIteracion;
                    negocioDatos[1] = textoRespuesta;
                    return negocioDatos;

                },
                get: function(promoId) {
                    for (var i = 0; i < nuevasPromosArray.length; i++) {

                        if (nuevasPromosArray[i].PromoId === parseInt(promoId)) {
                            return nuevasPromosArray[i];
                        }
                    }
                    return null;
                }
            }
        });