// all the mapping functions
var devKey = "AIzaSyD7KBwbfOwTbP6QAjjX5iI6ZIW14c4IF0Q";


var formState = {
	startAddr: false,
	endAddr: false,
	distance: null,
	price: null,
	startAddrStr: null,
	endAddrStr: null
};




var mapMarkers = {
	startMarker: null,
	endMarker: null
};










function initialize() {
	geocoder = new google.maps.Geocoder();
		

	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();


	var mapOptions = {
		zoom: 9,
	    center: new google.maps.LatLng(36.935883, -76.308722)
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),
	  	mapOptions);
	directionsDisplay.setMap(map);
};
















function validate(inputID, parentID, startOrEnd){
	//sorry
	//start or end should be a string; either 'start' or 'end' LOWERCASE
	var address = inputID.value;
	// alert(inputID.value);
	geocoder.geocode( { 'address': address}, function(results, status) {
  		if (status == google.maps.GeocoderStatus.OK) {
  			// alert("got a valid status from google");
  			var cityState = getCityState(results);
  			// alert(cityState.city);
  			// alert(city)
  			var point = {
  				loc: results[0].geometry.location,
  				city: cityState.city,
  				state: cityState.state,
  				str: results[0].formatted_address
  			};
  			if((serviceArea.indexOf(point.city) >= 0) && (point.state == "Virginia")){
				//this is a valid point; plot it and set formState.startAddr = point.loc
				// alert("i made it here");
				if(startOrEnd == "start"){
					// alert(point.city);
					formState.startAddr = point.loc;
					formState.startAddrStr = point.str;
					parentID.className = "form-group has-success";
					//remove the start maker if it already exists
					if(mapMarkers.startMarker != null){
						mapMarkers.startMarker.setMap(null);
					}
					var startMarker = new google.maps.Marker({
						icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        				map: map,
        				position: point.loc	
    				});
    				mapMarkers.startMarker = startMarker;
				}
				else if(startOrEnd == "end"){
					// alert(point.city);
					formState.endAddr = point.loc;
					formState.endAddrStr = point.str;
					parentID.className = "form-group has-success";
					//remove the start maker if it already exists
					if(mapMarkers.endMarker != null){
						mapMarkers.endMarker.setMap(null);
					}
					var endMarker = new google.maps.Marker({
        				map: map,
        				position: point.loc	
    				});
    				mapMarkers.endMarker = endMarker;
				}
				else{
					alert("html error for debugging, this shouldnt happen");
				}
  			}
  			else{
  				//this is a valid address, but not in 7 cities
  				if(startOrEnd == "start"){
  					formState.startAddr = false;
  					document.getElementById("startErrorMsg").value = "This address is outside the service area. Please enter an address in the 7 cities.";
  				}
  				else if(startOrEnd == "end"){
					formState.endAddr = false;
					document.getElementById("endErrorMsg").value = "This address is outside the service area. Please enter an address in the 7 cities.";
				}
  				parentID.className = "form-group has-error";
  				// alert(point.city);
  				// alert("This address is outside the service area. Please enter an address in the 7 cities.");
  			}
		}
		else {
			//google couldnt find this address
			if(startOrEnd == "start"){
  				formState.startAddr = false;
  				document.getElementById("startErrorMsg").value = "Invalid Address";
  			}
  			else if(startOrEnd == "end"){
				formState.endAddr = false;
				document.getElementById("endErrorMsg").value = "Invalid Address";
			}
			parentID.className = "form-group has-error";
			// alert("Invalid Address");
		}
	});
};
	












function codeAddress(inputID) {
	//geocodes the string at inputID and returns {loc:latLng(google object), city:str, state:str(full name)} if successful
	//otherwise returns false
	var address = inputID.value;
	var point = false
	alert(inputID.value);
	geocoder.geocode( { 'address': address}, function(results, status) {
  		if (status == google.maps.GeocoderStatus.OK) {
  			alert("got a valid status from google");
  			var cityState = getCityState(results);
  			point = {
  				loc: results[0].geometry.location,
  				city: cityState.city,
  				state: cityState.state
  			};
  		} 
	});
	return point;
};













function getCityState(results){
	//returns an object {city:str, state:str}
	var level_1;
    var level_2;
    for (var x = 0, length_1 = results.length; x < length_1; x++){
      for (var y = 0, length_2 = results[x].address_components.length; y < length_2; y++){
          var type = results[x].address_components[y].types[0];
            if ( type === "administrative_area_level_1") {
              level_1 = results[x].address_components[y].long_name;
              if (level_2) break;
            } else if (type === "locality"){
              level_2 = results[x].address_components[y].long_name;
              if (level_1) break;
            }
        }
    }
    var cityState = {
    	city: level_2,
    	state: level_1
    };
    return cityState;
};













function calcRoute() {
	var start = formState.startAddr;
	var end = formState.endAddr;
	if(start != false && end !=  false){
  		var request = {
    		origin:start,
    		destination:end,
    		travelMode: google.maps.TravelMode.DRIVING
  		};
  		directionsService.route(request, function(result, status) {
    		if (status == google.maps.DirectionsStatus.OK) {
      			directionsDisplay.setDirections(result);
      			formState.distance = metersToMiles(result.routes[0].legs[0].distance.value);
      			// var list = carAndDriver.carList;
      			// alert(window[list][1].txt);
      			var ppm = window[carAndDriver.carList][carAndDriver.carIndex].ppm;
  				formState.price = formState.distance * ppm;
  				document.getElementById("priceField").value = formState.price.toFixed(2);

    		}
  		});
	}
};













function metersToMiles(meters){
	var metersPerMile = 1609.344;
	return meters / metersPerMile;
};













function validateForCheckout(){
	if(formState.startAddr == false || formState.endAddr == false || formState.distance == null || formState.price == null){
		alert("You must choose a route before proceeding.");
		return false;
	}
	else{
		document.getElementById("carType4Pass").value = carAndDriver.carList;
		document.getElementById("carIndex4Pass").value = carAndDriver.carIndex;
		document.getElementById("driver4Pass").value = carAndDriver.driverIndex;
		document.getElementById("start4Pass").value = formState.startAddrStr;
		document.getElementById("end4Pass").value = formState.endAddrStr
		document.getElementById("distance4Pass").value = formState.distance;
		document.getElementById("price4Pass").value = formState.price;
		return true;   
	}
};

