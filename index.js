;(function(w){
	"use strict";
	if (!("serviceWorker" in navigator)) return;
	navigator.serviceWorker.register("/ALC/Project/sw.js").then((event) => {
		console.log(`Success! service worker now monitors ${event.scope}`);
	}).catch((error) =>{
		console.error(`Whoops! Service worker could not be installed. See Why?  ${error} `);
	});

}(this));
