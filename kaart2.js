$(document).ready(function () {
    var mijnPosLat;
    var mijnPosLng;
    

    var mapOptions = {
        zoomControl: true,
        zoom: 8,
        center: [52, 5]
    };

    var kaart = L.map("kaart", mapOptions);
    kaart.locate();
    
    kaart.on('locationfound', function(evt){
        mijnPostLat = evt.latlng.lat;
        mijnPostLng = evt.latlng.lng;
    });

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


    var lijnenLaag = new L.LayerGroup();

    var jsonLaag = new L.GeoJSON(mijnJSON, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.Naam);
            var line = new L.Polyline([[52, 0], [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]]);
            lijnenLaag.addLayer(line);
        },
        pointToLayer: function (feature, latLng) {
            return new L.CircleMarker(latLng, {
                radius: feature.properties.aantal / 100
            });

        }
    });
    kaart.addLayer(lijnenLaag);
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

    var lijn = new L.Polyline([[52, 5], [53, 5], [53, 6]], {
        color: '#ff0000',
        weight: 5
    });


    kaart.addLayer(lijn);
    var overlayLagen = {
        'markers': jsonLaag,
        'provincies': provincieWMS,
        'lijn': lijnenLaag
    };

    kaart.on('click', function (evt) {
        console.log(evt);
        L.Routing.control({
            waypoints: [
                L.latLng(mijnPosLat, mijnPosLng),
                L.latLng(evt.latlng.lat, evt.latlng.lng)
            ]
        }).addTo(kaart);

    });


    var lagenSwitcher = new L.Control.Layers(achtergronden, overlayLagen);
    kaart.addControl(lagenSwitcher);


    var polygoon = new L.Polygon([[52.5, 4], [53, 5], [51, 4]]);
    kaart.addLayer(polygoon);

    var cirkel = new L.Circle([53, 4], 5000);
    kaart.addLayer(cirkel);

    var cirkelMarker = new L.CircleMarker([53, 4], 50);
    kaart.addLayer(cirkelMarker);

 
});
