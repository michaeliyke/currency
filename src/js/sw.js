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

	/* self.addEventListener("activate", (event) => {
	 	event.waitUntil(caches.keys().then((cacheNames) => {
	 		return Promise.all(cacheNames.filter((cacheName) => {

	 		}))
	 	}))
	 })*/
/*	 michaeliykeDEMIKADO!
*/
	 self.addEventListener("fetch", (event) => {
	 	var requestUrl = new URL(event.request.url);

  if (requestUrl.origin != location.origin) { return; }
	return event.respondWith(caches.match(event.request).then((response) => {

	 	let fetched = fetch(event.request).then((serverResponse) => {
	 		caches.open(cacheVersion).then((cache) => {
	 			cache.match(event.request.url).then((response) => {
	 				cache.put(event.request.url, serverResponse.clone());
	 			});
	 		});
	 		return serverResponse;
	 	});

	 	return response || fetched;
	 }));
});


function serve(request) {
  var storageUrl = request.url.replace(/-\d+px\.jpg$/, '');
  return caches.open(cacheVersion).then((cache) => {
    return cache.match(url).then((response) => {
      var fetched = fetch(request).then((networkResponse) => {
        cache.put(storageUrl, networkResponse.clone());
        return networkResponse;
      });
      return response || fetched;
    });
  });
}
}());
