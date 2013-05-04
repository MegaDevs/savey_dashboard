
function initializeMap(coords) {  
    var latlng = new google.maps.LatLng(coords[0]['lat'], coords[0]['lon']);  
    var myOptions = {  
      zoom: 15,  
      center: latlng,  
      mapTypeId: google.maps.MapTypeId.ROADMAP  
    };  
      
    var map = new google.maps.Map(document.getElementById("map_canvas"),  
        myOptions);  
  
    // Creating a marker and positioning it on the map 
    for (var i = coords.length - 1; i >= 0; i--) {
    	var marker = new google.maps.Marker({    
      		position: new google.maps.LatLng(coords[i]['lat'], coords[i]['lon']),    
      		map: map    
    	}); 
    };      
}


function loadUsers(){
	$.getJSON('http://ec2-54-244-109-143.us-west-2.compute.amazonaws.com:8080/SaveyAPIs/get_vending_machines?&callback=?', function(json) { 
  		coords = [];
  		for (var i = json.length - 1; i >= 0; i--) {
  			coords[i] = { 'lat' : json[i].latitude, 'lon' : json[i].longitude };
  		}

  		initializeMap(coords);
	});
}

$(document).ready(function(){
	loadUsers();
});