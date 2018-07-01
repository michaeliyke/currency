;(function(){
"use strict"
	var cacheVersion = "currency-1";
	self.addEventListener("install", (event) => {
		event.waitUntil(caches.open(cacheVersion).then((cache) =>{
			cache.addAll([
				"project.css", "project.js","fonts/fonts.css",
				"Techie_0.2.1.min.js", "computer.jpg", "index.js", 
				"fonts/roboto-condensed-v16-latin-regular.svg",
				"fonts/roboto-condensed-v16-latin-regular.woff2",
				"fonts/roboto-condensed-v16-latin-regular.woff",
				"fonts/roboto-condensed-v16-latin-regular.ttf",
				"fonts/roboto-condensed-v16-latin-regular.eot",
				"fonts/roboto-condensed-v16-latin-700.svg",
				"fonts/roboto-condensed-v16-latin-700.woff2",
				"fonts/roboto-condensed-v16-latin-700.woff",
				"fonts/roboto-condensed-v16-latin-700.ttf",
				"fonts/roboto-condensed-v16-latin-700.eot" /**/
			]).then((data) => {
				console.log(`Boilerplate caching done!`);
			}).catch((error) => {
				console.warn(`Caching failed! Why? ${error} `);
			});
		}));
	});

	 // self
}());
