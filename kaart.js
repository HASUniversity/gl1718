$(document).ready(function () {

    var mapOptions = {
        zoomControl: true,
        zoom: 8,
        center: [52, 5]
    };

    var kaart = L.map("kaart", mapOptions);

    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {
        minZoom: 2,
        maxZoom: 20,
        attribution: osmAttrib
    });
    kaart.addLayer(osm);
    
    
    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    kaart.addLayer(googleSat);

    var schoolIcon = new L.Icon({
        iconUrl: 'school.png',
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    });
    var werkIcon = new L.Icon({
        iconUrl: 'werk.png',
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    });
    var woonIcon = new L.Icon({
        iconUrl: 'thuis.png',
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    });
    var sportIcon = new L.Icon({
        iconUrl: 'sport.png',
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    });


    var jsonLaag = new L.GeoJSON(mijnJSON, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.Naam);
        },
        pointToLayer: function (feature, latLng) {
            if (feature.properties.soort == "school") {
                return new L.Marker(latLng, {
                    icon: schoolIcon
                });
            }
            if (feature.properties.soort == "werk") {
                return new L.Marker(latLng, {
                    icon: werkIcon
                });
            }
            if (feature.properties.soort == "wonen") {
                return new L.Marker(latLng, {
                    icon: woonIcon
                });
            }
            if (feature.properties.soort == "sport") {
                return new L.Marker(latLng, {
                    icon: sportIcon
                });
            }
        }
    });
    kaart.addLayer(jsonLaag);

    var provincieWMS = new L.TileLayer.WMS('http://gmd.has.nl:8080/geoserver/geolab/wms', {
        layers: 'geolab:nl-prov',
        transparent: true,
        format: 'image/png'
    });
    kaart.addLayer(provincieWMS);

    var achtergronden = {
        'Open streetmap': osm,
        'Satelliet': googleSat
    };
    
    var overlayLagen = {
        'markers': jsonLaag,
        'provincies': provincieWMS
    };
    
    var lagenSwitcher = new L.Control.Layers(achtergronden, overlayLagen);
    kaart.addControl(lagenSwitcher);
    
});
