"use strict";
Techie("#btn", function($, element, body, head, doc, _, w, Log, stringify, stringifyAll, a, data){ 
	//With arrow function here, the "this" context reference will be lost. Let's live it alone
	window.onerror = function (msg, link, line) {
		console.error("Error has occured on line", line, msg);
	};


	const local_list = getById("local");
	const foreign_list = getById("foreign");
	let first_run = true;
	let rate;


	const update = () => { //Arrow function is not suitable here but I don't care provided it's elegant 
		let local_selected = local_list[local_list.selectedIndex];
		let foreign_selected = foreign_list[foreign_list.selectedIndex];
		
		getById("local-symbol").textContent = local_list[local_list.selectedIndex].getAttribute("currencysymbol");
		getById("foreign-symbol").textContent =  foreign_list[foreign_list.selectedIndex].getAttribute("currencyId");
		
		getById("foreign-rate").querySelector("span ~ span").textContent = rate; 

		getById("local-rate").querySelector("span").textContent = "(" + foreign_selected.getAttribute("currencyId") + " - " + foreign_selected.getAttribute("currencySymbol") + ") "; 
		getById("local-rate").querySelector("span ~ span").textContent = getById("value").value; 
		
		
		getById("foreign-rate").querySelector("span").textContent = "At rate " + "(" + local_selected.getAttribute("currencyId") +  " - " + local_selected.getAttribute("currencySymbol") + ") ";
		[].forEach((index, element) => {

		});
		getById("output").textContent = "0.0";
	};

	function cleanup() {
		const input = getById("value");
		input.value = "";
		input.placeholder = "value to convert";
		input.focus();
	}


	
	// Action on $("button#btn") click
	this.click(init.bind());
	
	//  Action if enter key is pressed at all or $("select") option changes 
	$("select").change(update).enter(init);
	
	
	//Update stuff like the currency symbols on page load
	update();
	
	function updateLists(data) {
		let countries = data["results"],
		countryNames = [],
		blob = "";
		const object = {};
		for (let countryName in countries) {
			let attributes = "";
			let country = countries[countryName]; //A country grabbed
			for (let attribute in country) { //A country attribute
				attributes = attributes.concat(` ${attribute}="${country[attribute]}" `);
			}
			let option = "<option".concat(` ${attributes}> (${country["currencyId"]} - ${country["currencySymbol"]}) - ${country["name"]} </option>`);
			countryNames.push(country["name"]);
			object[country["name"]] = option;
		}

		countryNames = countryNames.sort((a, b) => {
			return a > b;
		});

		for (let countryName of countryNames) {
			blob = blob.concat(object[countryName]);
		}

		local_list.innerHTML = blob;
		foreign_list.innerHTML = blob;
		if (first_run) {
			first_run = false;
			local_list["selectedIndex"] = getById("NG")["index"];
			foreign_list["selectedIndex"] = getById("US")["index"];
		}
		update();
	}
	
	// Fetches during initial page load
	// Later we could shift here to a Worker process which will determin if really need the fresh fetch at all
	fetch("https://free.currconv.com/api/v7/countries?apiKey=0a112f5e6136c61fa2a8").then((data) => {
		return data.json();
	}).then((data) => {
		updateLists(data);
		return data;
	}).catch((error) => {
		console.error(`Whoops! Can't get the list of countries. Why? ${error}`);
	});
	
		function init(e){ //Arrow functions cannot be hoisted because they are expressions
			const localCurrency = local_list[local_list.selectedIndex].getAttribute("currencyid");
			const foreignCurrency = foreign_list[foreign_list.selectedIndex].getAttribute("currencyid");
			
			const from = encodeURIComponent(localCurrency);
			const to = encodeURIComponent(foreignCurrency);
	//Later,  I will cache this url below so I can implement offline first approach
	//I will then check if I have data from this url, if so, I could decide to use it based on what network says
	const url = `https://free.currconv.com/api/v7/convert?q=${to}_${from}&compact=ultra&apiKey=0a112f5e6136c61fa2a8`;

  fetch(url).then((response) => {return response.json();}).then((data) => {
		rate = Math.round(data[`${to}_${from}`] * 100) / 100;
		update();
		getById("output").textContent = Math.round(((getById("value").value || 1) * data[`${to}_${from}`]) * 100) / 100; 
		//0.002793;
		cleanup();
  }).catch((error) => {
  	console.error(`Oh no! We can't fetch currency data. Why? ${error} `);
  });
		}






















		function requestData(cb) {
			// Once you get your hands on data, run cb on it
		}
		function getById(id){
			return document.getElementById(id);
		}
		
		





















	});

