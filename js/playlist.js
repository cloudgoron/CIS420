/*
This is a test list that will be replaced with vehicle, driver, etc lists for the carosels
*/

var limos = [
	
	{
		img: "images/limo_1.jpeg",
		txt: "this is the first limo",
	},

	{
		img: "images/limo_2.jpeg",
		txt: "this is the second limo"

	},

	{
		img: "images/limo_3.jpeg",
		txt: "this is the third limo"

	},
];





var suvs = [
	
	{
		img: "images/suv_1.jpeg",
		txt: "this is the first suv",
	},

	{
		img: "images/suv_2.jpeg",
		txt: "this is the second suv"

	},

	{
		img: "images/suv_3.jpeg",
		txt: "this is the third suv"

	},
];





var sedans = [
	{
		img: "images/sedan_1.jpeg",
		txt: "this is the first car",
	},

	{
		img: "images/sedan_2.jpeg",
		txt: "this is the second car"

	},
]





var drivers = [
	{
		img: "images/driver_1.jpeg",
		txt: "I drive cars and whatnot"
	},

	{
		img: "images/driver_2.jpeg",
		txt: "I immediately regret this hiring decision"
	},

	{
		img: "images/driver_3.jpeg",
		txt: "Maybe I shouldnt be in charge of choosing pictures"
	},

	{
		img: "images/driver_4.jpeg",
		txt: "sdkhfasdfjashdjkfhasjdlhfjkadshj"
	}
]





function printCarListAsCarousel(list, carType){
	//this function assumes the list is not empty
	var img = list[0].img;
	var txt = list[0].txt;
	var htmlStr = '<div class="item active"><img src="' + img + '" alt="..."><div class="carousel-caption"><p>'+txt+'<br/><form action="driver.html" method = "get"><input type="hidden" name="carType" value="'+carType+'"><input type="hidden" name="car" value="0"><input type="submit" value = "I want this one"></form></p></div></div>';
	// document.writeln(cars.length);
	for(var i = 1; i < list.length; i ++){
		img = list[i].img;
		txt = list[i].txt;
		htmlStr += '<div class="item"><img src="' + img + '" alt="..."><div class="carousel-caption"><p>'+txt+'<form action="driver.html" method = "get"><input type="hidden" name="carType" value="'+carType+'"><input type="hidden" name="car" value="'+i+'"><input type="submit" value = "I want this one"></form></p></div></div>';
	}
	return htmlStr;
};






function printDriverListAsCarousel(list){
	//this function assumes the list is not empty
	var img = list[0].img;
	var txt = list[0].txt;
	var htmlStr = '<div class="item active"><img src="' + img + '" alt="..."><div class="carousel-caption"><p>'+txt+'<br/><form action="route.html" method = "get"><input type="hidden" name="driver" value="0"><input type="submit" value = "I want this one"></form></p></div></div>';
	// document.writeln(cars.length);
	for(var i = 1; i < list.length; i ++){
		img = list[i].img;
		txt = list[i].txt;
		htmlStr += '<div class="item"><img src="' + img + '" alt="..."><div class="carousel-caption"><p>'+txt+'<form action="route.html" method = "get"><input type="hidden" name="driver" value="'+i+'"><input type="submit" value = "I want this one"></form></p></div></div>';
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

