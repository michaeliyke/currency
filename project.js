"use strict";
Techie("#btn", function($,btn, body, head, sapi, _, w, log, stringify, stringifyAll){ //With arrow function here, the "this" context reference will be lost. Let's live it alone
	let country, currency, symbol, value = 1, local, foreign, from, to , output, exchangeRate, 
	exchangeData, countries, localCurrency, foreignCurrency, blob = "", attrs, option, names = [], object = {},
	localGroup = getById("local"), 
	foreignGroup = getById("foreign"),
	local_symbolDiv = getById("local-symbol"),
	foreign_symbolDiv = getById("foreign-symbol"),
	valueDiv = getById("output"),
	inputPoint = getById("value");
	const update = () =>{
		inputPoint.value = "";
		inputPoint.placeholder = "type 12850";
		inputPoint.focus();
		foreign_symbolDiv.textContent = localGroup[localGroup.selectedIndex].getAttribute("currencysymbol")
		local_symbolDiv.textContent = foreignGroup[foreignGroup.selectedIndex].getAttribute("currencysymbol");
	}
	
	this.click(init);
	 $("select").change(update).enter(init);;  //update currency symbol upon selection
	update();//Update the currency symbols on page load
	fetch("https://free.currencyconverterapi.com/api/v5/countries").then((data) =>{return data.json();}).then((data) =>{
		countries = data["results"];
		for(country in countries){
			attrs = "";
			entity = countries[country];
			for(unit in entity){
				attrs = attrs.concat(` ${unit}="${entity[unit]}" `);
			} /*currencyId*/
			option = "<option".concat(` ${attrs}> ${entity["currencySymbol"]} - ${entity["currencyId"]} ${entity["name"]} </option>`);
			names.push(entity["name"]);
			object[entity["name"]] = option;
		}
		names = names.sort(function(a, b){return a > b;});
		
		for(let name of names){
			blob = blob.concat(object[name]);
		}
	localGroup.innerHTML = blob;
	foreignGroup.innerHTML = blob;
	localGroup[ "selectedIndex" ] = getById("US")["index"];
	foreignGroup[ "selectedIndex" ] = getById("NG")["index"];
	update();
	}).catch((error) => {console.error(`Whoops! Can't get the list of countries. What nagged? ${error}`);})
	
		function init(e){ //Arrow functions cannot be hoisted because they are expressions
	value = inputPoint.value || value;
	local = localGroup[localGroup.selectedIndex];
	localCurrency = local.getAttribute("currencyid");
	foreign = foreignGroup[foreignGroup.selectedIndex]; 
	foreignCurrency = foreign.getAttribute("currencyid");
	from = encodeURIComponent(localCurrency);
	to = encodeURIComponent(foreignCurrency);
  const url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' + from + '_' + to + '&compact=y';
	local_symbol = foreign.getAttribute("currencysymbol");
	foreign_symbol = local.getAttribute("currencysymbol");
	local_symbolDiv.textContent = local_symbol; 
	foreign_symbolDiv.textContent = foreign_symbol; 
  fetch(url).then((response) => {return response.json();}).then((data) => {
  	exchangeData = data[(localCurrency  + "_" + foreignCurrency ).toUpperCase()];
  	exchangeRate = exchangeData["val"] || 0;
    output =  Math.round( (value * exchangeRate) * 100) / 100; //0.002793
    valueDiv.textContent = output;
    update();
  }).catch((error) => {
  	console.error(`Oh no! We can't fetch currency data. What nagged? ${error} `);
  });
		}
		function getById(id){return document.getElementById(id);}
		function getByAttr(attr){var element;pt.walk(document, () => {if (this.getAttribute(attr)) element = this;});return element;}

	
	});

