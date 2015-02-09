/*
This is a test list that will be replaced with vehicle, driver, etc lists for the carosels
*/

var cars = [
	
	{
		img: "images/images.jpeg",
		text: "this is the first car"
	},

	{
		img: "images/images-2.jpeg",
		text: "this is the second car"
	}
];

function printCars(){
	for(var i = 0; i < 2; i ++){
		document.writeln(cars[i]["img"]);
	}
}