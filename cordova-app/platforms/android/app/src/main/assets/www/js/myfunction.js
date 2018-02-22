function doit(){

var x = document.getElementById("lat").value;
var y = document.getElementById("lng").value;
var coords = { lat: Number(x), lng:Number(y)};
   var map = new google.maps.Map(document.getElementById('map_canvas1'), {
     zoom: 12,
     center: coords
   });
   var marker = new google.maps.Marker({
     position: coords,
     map: map
   });

}






var mapDiv = document.getElementById("map_canvas1");
var map = plugin.google.maps.Map.getMap(mapDiv);

map.addEventListener(plugin.google.maps.event.MAP_READY, function() {



  var isRunning = false;

  var inputField = mapDiv.getElementsByTagName("input")[0];

  var button = mapDiv.getElementsByTagName("button")[0];

  button.addEventListener("click", function() {

    if (isRunning) {

      return;

    }

    isRunning = true;



    var dialogDiv = showVirtualDialog(mapDiv, "Just a moment, please ...");

    setTimeout(function() {

      mapDiv.removeChild(dialogDiv);

    }, 3000);



    // Address -> latitude,longitude

    plugin.google.maps.Geocoder.geocode({

      "address": inputField.value

    }, function(results) {



      if (results.length) {



        // Add a marker

        map.addMarker({

          'position': results[0].position,

          'title':  JSON.stringify(results[0].position)

        }, function(marker) {



          // Move to the position

          map.animateCamera({

            'target': results[0].position,

            'zoom': 17

          }, function() {

            marker.showInfoWindow();

            isRunning = false;

          });



        });



      } else {

        isRunning = false;

      }



    });

  });



});