console.log("This works");

// create the array with topics
var topics = ["tennis", "Grigor Dimitrov", "cars", "Volvo", "animals", "dancing", "babies", "school", "accounting", "coding", "food", "Facebook", "Instagram", "meditation", "reading", "mooning", "snuggling", "gardening", "Tom and Jerry", "Cinderella", "Frida Khalo", "weddings"];

// set a function to render the buttons
function renderButtons() {
    for (var i = 0; i < topics.length; i++) {
        console.log(topics[i]);
        var btn = $("<button>");
        btn.addClass("btn btn-success topics-btn");
        btn.attr("data-topics", topics[i]);
        btn.text(topics[i]);
        $("#btn-container").append(btn);
    }
}
// call the function so that the buttons populate on the webpage
renderButtons();

// access GIPHY API
function getAndDisplayGifs(name) {
var queryUrl ="https://api.giphy.com/v1/gifs/search?api_key=z7FirGBNLEcM6yo58uhqbG1eN9iCNW8Z&q=" + name + "&limit=10&offset=0&rating=PG-13&lang=en"

// "https://api.giphy.com/v1/gifs/search?api_key=z7FirGBNLEcM6yo58uhqbG1eN9iCNW8Z&q=" + name + "&limit=10&offset=0&rating=G&lang=en";

$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function (response) {
    console.log(response);
    var gifs = response.data;
    $("#gif-container").empty();
    for (var i = 0; i < gifs.length; i++) {
        var image = $("<img>");
        image.addClass("giphy-image");
        image.attr("src", gifs[i].images.original.url);
        image.attr("alt", name);
        $("#gif-container").append(image);
    }
});
}


$(document).on("click", ".topics-btn", function () {
    var name = $(this).attr("data-topics");
    getAndDisplayGifs(name);
});

