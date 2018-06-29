Techie("button[value=Load], #btn", function($,btn, body, head, sapi, _, w, log, stringify, stringifyAll){
	let country, currency, symbol, value = 1, local, foreign, from, to , index = 0, output, exchangeRate, 
	exchangeData, countries, localCurrency, foreignCurrency, blob = "", attrs, option, names = [], object = {},
	localGroup = getById("local"), 
	foreignGroup = getById("foreign"),
	local_symbolDiv = getById("local-symbol"),
	foreign_symbolDiv = getById("foreign-symbol"),
	valueDiv = getById("output"),
	inputPoint = getById("value");
	index++; //index is just for debugging incrementally
	// https://free.currencyconverterapi.com/api/v5/currencies
	// https://free.currencyconverterapi.com/api/v5/countries

	function update(){
		inputPoint.value = "";
		inputPoint.placeholder = "type 12850";
		inputPoint.focus();
		foreign_symbolDiv.textContent = localGroup[localGroup.selectedIndex].getAttribute("currencysymbol")
		local_symbolDiv.textContent = foreignGroup[foreignGroup.selectedIndex].getAttribute("currencysymbol");
	}
	
	this.click(init);
	 $("select").change(update).enter(init);;  //update currency symbol upon selection
	update();//Update the currency symbols on page load
	fetch("https://free.currencyconverterapi.com/api/v5/countries").then(function(data){return data.json();}).then(function(data){
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
	}).catch(function(error) {
		console.error(error)
	})
	
		function init(e){
			value = inputPoint.value || value;
	local = localGroup[localGroup.selectedIndex];
	localCurrency = local.getAttribute("currencyid");
	foreign = foreignGroup[foreignGroup.selectedIndex]; 
	foreignCurrency = foreign.getAttribute("currencyid");
	from = encodeURIComponent(localCurrency);
	to = encodeURIComponent(foreignCurrency);
  var url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' + from + '_' + to + '&compact=y';
	local_symbol = foreign.getAttribute("currencysymbol");////Important////
	foreign_symbol = local.getAttribute("currencysymbol");////Important////
	local_symbolDiv.textContent = local_symbol; 
	foreign_symbolDiv.textContent = foreign_symbol; 
  fetch(url).then(function(response){return response.json();}).then(function(data){
  	exchangeData = data[(localCurrency  + "_" + foreignCurrency ).toUpperCase()];
  	exchangeRate = exchangeData["val"] || 0;
  	total = (value * exchangeRate);
    output =  Math.round( total * 100) / 100; //0.002793
    valueDiv.textContent = output;
    update();
  }).catch(function(error){
  	console.error("Something happened" + error);
  });
		}
		function getById(id){return document.getElementById(id);}
		function getByAttr(attr){var element;pt.walk(document, function(){if (this.getAttribute(attr)) element = this;});return element;}

	
	})

