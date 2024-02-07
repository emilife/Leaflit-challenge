let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
let myMap = L.map("map", {
    center: [54, -121],
    zoom: 3
  });
  
  function getColor(d) {
    return  d > 90 ? 'red' :
            d > 70 ? 'darkorange' :
            d > 50 ? 'orange' :
            d > 30 ? 'yellow' :
            d > 10 ? 'lime' : 'green'
  }
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
d3.json(url).then(function(data) {
  L.geoJSON(data, {
    style: function (feature) {
        let mag = feature.properties.mag;
        let depth = feature.geometry.coordinates[2];
        // #in a profesional setting you don't use console-this can be used to hack and remove
        console.log (feature.geometry.coordinates[2])


        return {
         color: "black",
         weight: 2,
         fillOpacity:.6,
         radius: mag*3,
         fillColor : 
            depth > 90 ? 'red' :
            depth > 70 ? 'darkorange' :
            depth > 50 ? 'orange' :
            depth > 30 ? 'yellow' :
            depth > 10 ? 'lime' : 'green'
        };
    },
    pointToLayer: function(geoJsonPoint, latlng) {
      return L.circleMarker(latlng);
  }

}).bindPopup(function (layer) {

  let place = layer.feature.properties.place;
  let mag = layer.feature.properties.mag;
  let time = new Date(layer.feature.properties.time).toLocaleString();
  return `<h4>${place}<br>Magnitude: ${mag}<br>${time}</h4>`;
}).addTo(myMap);

let legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Earthquake Depth</strong>'],
    categories = [91, 71, 51, 31, 11, 9];
    for (var i = 0; i < categories.length; i++) {
            div.innerHTML += labels.push( '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> '
            + (i === 0 ? ">" + (categories[i] - 1) :
            i < categories.length - 1 ? (categories[i]-1) + "-" + (categories[i-1]-1) :
            "<" + (categories[i]+1)));
        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
legend.addTo(myMap);
  



    // console.log(response);
    // features = response.features;
    // console.log(features[1])

    // let heatArray = [];
  
    // for (let i = 0; i < features.length; i++) {
    //   let location = features[i].geometry;
    //   if (location) {response.features;
    //     console.log();
    //     heatArray.push([response.features[i].geometry.coordinates[1], location.coordinates[0]]);
    //   }
  
    // }
  
    // let heat = L.heatLayer(heatArray, {
    //   radius: 20,
    //   blur: 35
    // }).addTo(myMap);
  


    
  });
  
