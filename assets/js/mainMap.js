const appMap = {
    map: undefined,
     price_stimated:undefined,
    init: function () {
        appMap.map = new google.maps.Map(document.getElementById("map"), {
            zoom: 5,
            center: {
                lat: -9.1191427,
                lng: -77.0349046
            },
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false
        });
        var inputOrigen = document.getElementById('origen');
        var autocompleteOrigen = new google.maps.places.Autocomplete(inputOrigen);
        autocompleteOrigen.bindTo('bounds', appMap.map);
        appMap.detalleUbicacionOrigen = new google.maps.InfoWindow();
        appMap.markerOrigen = appMap.crearMarcador(appMap.map);

        appMap.crearListener(autocompleteOrigen, appMap.detalleUbicacionOrigen, appMap.markerOrigen);

        var inputDestino = document.getElementById('destino');
        var autocompleteDestino = new google.maps.places.Autocomplete(inputDestino);
        autocompleteDestino.bindTo('bounds', appMap.map);
        var detalleUbicacionDestino = new google.maps.InfoWindow();
        var markerDestino = appMap.crearMarcador(appMap.map);

        appMap.crearListener(autocompleteDestino, detalleUbicacionDestino, markerDestino);

        /* Mi ubicación actual */
        // document.getElementById("encuentrame").addEventListener("click", appMap.buscarMiUbicacion);
        appMap.buscarMiUbicacion();
        /* Ruta */
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        document.getElementById("ruta").addEventListener("click", function () {
            appMap.dibujarRuta(directionsService, directionsDisplay)
        });

        directionsDisplay.setMap(appMap.map);
    },

    crearListener: function (autocomplete, detalleUbicacion, marker) {
        autocomplete.addListener('place_changed', function () {
            detalleUbicacion.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            appMap.marcarUbicacion(place, detalleUbicacion, marker);
        });
    },

    buscarMiUbicacion: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(appMap.marcarUbicacionAutomatica, appMap.funcionError);
        }
    },

    funcionError : function (error) {
        alert("Tenemos un problema para encontrar tu ubicación");
    },

    marcarUbicacionAutomatica : function (posicion) {
        var latitud, longitud;
        latitud = posicion.coords.latitude;
        longitud = posicion.coords.longitude;
        document.getElementById("origen").value= latitud + " " +  longitud;

        appMap.markerOrigen.setPosition(new google.maps.LatLng(latitud, longitud));
        appMap.map.setCenter({
            lat: latitud,
            lng: longitud
        });
        appMap.map.setZoom(17);

         appMap.markerOrigen.setVisible(true);

        appMap.detalleUbicacionOrigen.setContent('<div><strong>Mi ubicación actual</strong><br>');
        appMap.detalleUbicacionOrigen.open(appMap.map, appMap.markerOrigen);
    },

    marcarUbicacion : function (place, detalleUbicacion, marker) {
        if (!place.geometry) {
            // Error , sino encuentra el lugar
            window.alert("No encontramos el lugar que indicaste: '" + place.name + "'");
            return;
        }
        if (place.geometry.viewport) {
            appMap.map.fitBounds(place.geometry.viewport);
        } else {
            appMap.map.setCenter(place.geometry.location);
            appMapmap.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        detalleUbicacion.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        detalleUbicacion.open(appMap.map, marker);
    },

    crearMarcador: function(map) {
        var icono = {
            url: 'http://icons.iconarchive.com/icons/sonya/swarm/128/Bike-icon.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        };

        var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            icon: icono,
            anchorPoint: new google.maps.Point(0, -29)
        });

        return marker;
    },

    dibujarRuta: function(directionsService, directionsDisplay) {
        var origin = document.getElementById("origen").value;
        var destination = document.getElementById('destino').value;

        if (destination != "" && destination != "") {
            directionsService.route({
                    origin: origin,
                    destination: destination,
                    travelMode: "DRIVING"
                },
                function (response, status) {
                    if (status === "OK") {
                        directionsDisplay.setDirections(response);
                        let price_stimated = response.routes[0].overview_path.length / 10  + 'USD';
                        appMap.precioRuta(price_stimated);

                    } else {
                        app.funcionErrorRuta();
                    }
                });
        }

    },
    precioRuta:function(price_stimated){
       var t = document.createTextNode(price_stimated);
       var p=document.createElement("p");
       p.appendChild(t);
       document.getElementById("tarifa").appendChild(p);

    },
    funcionErrorRuta: function() {
        alert("No ingresaste un origen y un destino validos");
    }
}


function initMap() {
    appMap.init();
}