# Fork of Mapbox's node api

Mapbox's original API can be found here:  
https://github.com/mapbox/node-mapbox.git

# Use

Really the only function utilized is the geocoding

``` javascript
var MapboxClient = require('mapbox-fork');
var Mapbox = new MapboxClient('Your API Key');

Mapbox.geocode("Millville, DE 19967", function ( err, data ) {
  if(err) {console.log(err);}
  //Response is givin in lat/lng instead of lng/lat
  var latlng = [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]]
  console.log(latlng);
})

/* Sample Response
{ type: 'FeatureCollection',
  query: [ 'millville', 'de', '19967' ],
  features:
   [ { id: 'place.10711',
       type: 'Feature',
       text: 'Millville',
       place_name: 'Millville, 19967, Delaware, United States',
       relevance: 0.8333333333333333,
       center: [Object],
       geometry: [Object],
       bbox: [Object],
       properties: {},
       context: [Object] },
       { id: 'place.35444',
       ...
*/

```
