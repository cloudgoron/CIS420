/*
This is a test list that will be replaced with vehicle, driver, etc lists for the carosels
*/
//cars have an image file(img), description(txt), name - maybe make and model? (name), price per mile(ppm) 
var limos = [
	
	{
		img: "images/limo_1.jpeg",
		txt: "this is the first limo",
		name: "limo1",
		ppm: 4.99
	},

	{
		img: "images/limo_2.jpeg",
		txt: "this is the second limo",
		name: "limo2",
		ppm: 4.99

	},

	{
		img: "images/limo_3.jpeg",
		txt: "this is the third limo",
		name: "limo3",
		ppm: 4.99

	},
];








var suvs = [
	
	{
		img: "images/suv_1.jpeg",
		txt: "this is the first suv",
		name: "suv1",
		ppm: 2.99
	},

	{
		img: "images/suv_2.jpeg",
		txt: "this is the second suv",
		name: "suv2",
		ppm: 2.99

	},

	{
		img: "images/suv_3.jpeg",
		txt: "this is the third suv",
		name: "suv3",
		ppm: 2.99

	},
];







var sedans = [
	{
		img: "images/sedan_1.jpeg",
		txt: "this is the first car",
		name: "sedan1",
		ppm: 1.99

	},

	{
		img: "images/sedan_2.jpeg",
		txt: "this is the second car",
		name: "sedan1",
		ppm: 1.99

	},
];








//drivers have an image file(img), a description (txt), and a name(name)
var drivers = [
	{
		img: "images/driver_1.jpeg",
		txt: "I drive cars and whatnot",
		name: "driver1"
	},

	{
		img: "images/driver_2.jpeg",
		txt: "I immediately regret this hiring decision",
		name: "driver2"
	},

	{
		img: "images/driver_3.jpeg",
		txt: "Maybe I shouldnt be in charge of choosing pictures",
		name: "driver3"
	},

	{
		img: "images/driver_4.jpeg",
		txt: "sdkhfasdfjashdjkfhasjdlhfjkadshj",
		name: "driver4"
	}
];







var serviceArea = ["Virginia Beach", "Norfolk", "Portsmouth", "Hampton", "Newport News", "Chesapeake", "Suffolk"];








function printCarListAsCarousel(list, carType){
	//this function assumes the list is not empty
	var img = list[0].img;
	var txt = list[0].txt;
	var htmlStr = '<div class="item active"><img src="' + img + '" alt="..."><div class="carousel-caption"><p>'+txt+'<br/><form action="driver.html" method = "get"><input type="hidden" name="carType" value="'+carType+'"><input type="hidden" name="car" value="0"><input type="submit" class="btn btn-default" value="I want this one"></form></p></div></div>';
	// document.writeln(cars.length);
	for(var i = 1; i < list.length; i ++){
		img = list[i].img;
		txt = list[i].txt;
		htmlStr += '<div class="item"><img src="' + img + '" alt="..."><div class="carousel-caption"><p>'+txt+'<form action="driver.html" method = "get"><input type="hidden" name="carType" value="'+carType+'"><input type="hidden" name="car" value="'+i+'"><input type="submit" class="btn btn-default" value="I want this one"></form></p></div></div>';
	}
	return htmlStr;
};








function printDriverListAsCarousel(list, car){
	//this function assumes the list is not empty
	var img = list[0].img;
	var txt = list[0].txt;
	// alert(car.list);
	var htmlStr = '<div class="item active"><img src="' + img + '" alt="..."><div class="carousel-caption"><p>'+txt+'<br/><form action="route.html" method = "get"><input type="hidden" name="carType" value="'+car.list+'"><input type="hidden" name="car" value="'+car.listIndex+'"><input type="hidden" name="driver" value="0"><input type="submit" class="btn btn-default" value="I want this one"></form></p></div></div>';
	// document.writeln(cars.length);
	for(var i = 1; i < list.length; i ++){
		img = list[i].img;
		txt = list[i].txt;
		htmlStr += '<div class="item"><img src="' + img + '" alt="..."><div class="carousel-caption"><p>'+txt+'<form action="route.html" method = "get"><input type="hidden" name="carType" value="'+car.list+'"><input type="hidden" name="car" value="'+car.listIndex+'"><input type="hidden" name="driver" value="'+i+'"><input type="submit" class="btn btn-default" value="I want this one"></form></p></div></div>';
	}
	return htmlStr;
};









function printCarouselIndicators(numSlides){
	var htmlStr = '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>';
	for(var i = 1; i < numSlides; i ++){
		htmlStr += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>';
	}
	return htmlStr;
};








function getCarFromURL(){
	//get the carlist and index of chosen car from url and returns it as a car{list, listIndex}
	var carInfoStr = location.search.substr(1);
	var carInfoArr = carInfoStr.split("&");
	var carList = carInfoArr[0].split("=")[1];
	// alert(carInfoArr[1]);
	// alert(carInfoArr[1].split("=")[1]);
	var carIndex = carInfoArr[1].split("=")[1];
	var car = {
		list: carList,
		listIndex: carIndex
	};
	return car;
};









function getCarAndDriverFromURL(){
	//gets the carlist, car index, and driver index from url and returns is as { carlist, carIndex, dirverIndex}
	var args = location.search.substr(1).split("&");
	var returnVal = {
		carList: args[0].split("=")[1],
		carIndex: args[1].split("=")[1],
		driverIndex: args[2].split("=")[1]
	}
	return returnVal;
};








function getAllFromURLForCheckout(){
	//returns {carName, ppm, driverName, startAddr, endAddr, dist, price} all as string
	var args = location.search.substr(1).split("&");
	var carList = args[0].split("=")[1];
	var carIndex = args[1].split("=")[1];
	var car = window[carList][carIndex];
	var returnVal = {
		carName: car.name,
		ppm: car.ppm,
		driverName: drivers[args[2].split("=")[1]].name,
		startAddr: decodeURIComponent(args[3].split("=")[1]).replace(/\+/g, ' '),
		endAddr: decodeURIComponent(args[4].split("=")[1]).replace(/\+/g, ' '),
		dist: (Number(args[5].split("=")[1]).toFixed(1)).toString() + " miles",
		price: Number(args[6].split("=")[1]).toFixed(2)
	}
	return returnVal;
};