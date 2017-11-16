$(document).ready(function () {

    var mapOptions = {
        zoomControl: true,
        zoom: 8,
        center: [52, 5]
    };


    var kaart = L.map("kaart", mapOptions);

    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {
        minZoom: 2,
        maxZoom: 20,
        attribution: osmAttrib
    });

    kaart.addLayer(osm);

 
});
