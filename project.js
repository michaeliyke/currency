"use strict";
Techie("#btn", function($, element, body, head, doc, _, w, Log, stringify, stringifyAll, a, data){ 
	//With arrow function here, the "this" context reference will be lost. Let's live it alone
	let country, currency, symbol, value = 1, local, foreign, from, 
		to, output, exchangeRate, countryName, attribute, countryNames = [], object = {},
	exchangeData, countries, localCurrency, foreignCurrency, blob = "", 
	attrs, option, foreignGroup = getById("foreign"), 
	localGroup = getById("local"),
	local_symbolDiv = getById("local-symbol"),
	foreign_symbolDiv = getById("foreign-symbol"),
	valueDiv = getById("output"),
	inputPoint = getById("value");

	const update = () => {
		inputPoint.value = "";
		inputPoint.placeholder = "value to convert";
		inputPoint.focus();
		foreign_symbolDiv.textContent = localGroup[localGroup.selectedIndex].getAttribute("currencysymbol");
		local_symbolDiv.textContent = foreignGroup[foreignGroup.selectedIndex].getAttribute("currencysymbol");
	};



	// Action on $("button#btn") click
	 this.click(init);

	//  Action if enter keyis pressed at all or $("select") option changes 
	 $("select").change(update).enter(init);  //update currency symbol upon selection


	 //Update stuff like the currency symbols on page load
	update();
	
	// The Initial fetches
	// fetch("http://www.apilayer.net/api/live?access_key=a004b58f8f078897543a12c710ba5e4d").then((data) => {
	fetch("https://free.currconv.com/api/v7/countries?apiKey=0a112f5e6136c61fa2a8").then((data) => {
		return data.json();
	}).then((data) => {
		countries = data["results"];
		for(countryName in countries){
			let attributes = "";
			country = countries[countryName]; //A country grabbed
			for(attribute in country){ //A country attribute
				attributes = attributes.concat(` ${attribute}="${country[attribute]}" `);

			} 
			option = "<option".concat(` ${attributes}> ${country["currencySymbol"]} - ${country["name"]}(${country["currencyId"]}) </option>`);
			countryNames.push(country["name"]);
			object[country["name"]] = option;
		}
		countryNames = countryNames.sort((a, b) => {
			return a > b;
		});
		
		for(let countryName of countryNames){
			blob = blob.concat(object[countryName]);
		}

	localGroup.innerHTML = blob;
	foreignGroup.innerHTML = blob;
	localGroup[ "selectedIndex" ] = getById("US")["index"];
	foreignGroup[ "selectedIndex" ] = getById("NG")["index"];
	update();
	}).catch((error) => {
		console.error(`Whoops! Can't get the list of countries. Why? ${error}`);
	});
	
		function init(e){ //Arrow functions cannot be hoisted because they are expressions
	value = inputPoint.value || value;
	local = localGroup[localGroup.selectedIndex];
	localCurrency = local.getAttribute("currencyid");
	foreign = foreignGroup[foreignGroup.selectedIndex]; 
	foreignCurrency = foreign.getAttribute("currencyid");
	from = encodeURIComponent(localCurrency);
	to = encodeURIComponent(foreignCurrency);
	//Later,  I will cache this url below so I can implement offline first approach
	//I will then check if I have data from this url, if so, I could decide to use it based on what network says
	const url = `https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=0a112f5e6136c61fa2a8`;

	const local_symbol = local.getAttribute("currencysymbol");
	const foreign_symbol = foreign.getAttribute("currencysymbol");
	local_symbolDiv.textContent = local_symbol; 
 	foreign_symbolDiv.textContent = foreign_symbol; 
  fetch(url).then((response) => {return response.json();}).then((data) => {
		const rate = data[`${from}_${to}`] || 0;
		valueDiv.textContent = Math.round((value * rate) * 100) / 100; //0.002793;
    update();
  }).catch((error) => {
  	console.error(`Oh no! We can't fetch currency data. Why? ${error} `);
  });
		}
		function getById(id){
			return document.getElementById(id);
		}
			
	});

