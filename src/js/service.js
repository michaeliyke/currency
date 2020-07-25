;(function(){
	self.addEventListener("fetch", function(event){
		// We handle stuff here during fetch requests to apis 
		// event.respondWith(new Response("<h1>Good Day Michael</h1>", {foo: "bar"}));
	});
}());


/*fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });*/