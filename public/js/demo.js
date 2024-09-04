// 
console.log(coordinates)
var platform = new H.service.Platform({
  apikey:  maptoken
});
var defaultLayers = platform.createDefaultLayers();
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),

defaultLayers.vector.normal.map,{
center: {lat:28.7041, lng:77.1025},
zoom: 6,
pixelRatio: window.devicePixelRatio || 1
});

window.addEventListener('resize', () => map.getViewPort().resize());
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
var ui = H.ui.UI.createDefault(map, defaultLayers);


var LocationOfMarker = { lat: coordinates[1], lng: coordinates[0] };
var pngIcon = new H.map.Icon("/images/pointer1.png", { size: { w: 47, h: 48 } });
var marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });
                      
map.addObject(marker);
map.setCenter(LocationOfMarker)
map.setZoom(6)

