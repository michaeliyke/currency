;(function(w){
	"use strict";
	if (!("serviceWorker" in navigator)) return;
	navigator.serviceWorker.register("/ALC/Project/sw.js").then((event) => {
		console.log(`Success! service worker now monitors ${event.scope}`);
	}).catch((error) =>{
		console.log(`Whoops! What happend?  ${error} `);
	});
}(this));


/*
self.addEventLister("'install", function(event){

}).addEventLister("activate", function(event){

}).addEventLister("fetch", function(event){

});*/