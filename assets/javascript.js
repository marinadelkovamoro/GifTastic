console.log("This works");

// create the array with topics
var topics = ["tennis", "Grigor Dimitrov", "cars", "Volvo", "animals", "dancing", "babies", "school", "accounting", "coding", "food", "Facebook", "Instagram", "meditation", "reading", "mooning", "snuggling", "gardening", "Tom and Jerry", "Cinderella", "Frida Khalo", "weddings"];

// set a function to render the buttons
function renderButtons() {
    // clear content in btn-container so that the div get cleared (prevents the div to over-populate with replicated buttons)
    $("#btn-container").empty();
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

// access GIPHY API function
function getAndDisplayGifs(name) {
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=z7FirGBNLEcM6yo58uhqbG1eN9iCNW8Z&q=" + name + "&limit=10&offset=0&rating=PG-13&lang=en"

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
            image.attr("src", gifs[i].images.original_still.url);
            image.attr("alt", name);
            var imageStill = gifs[i].images.original_still.url;
            var imagesAnimated = gifs[i].images.original.url;
            // assign attributes with those urls from our stored variables
            image.attr({
                "data-still": imageStill,
                "data-state": "still",
                "data-animate": imagesAnimated
            });
            $("#gif-container").append(image);
            // create a new varibles for both still and animated links

        }
    });
}

// when the user clicks on a topics function, 10 gifs on this topic populate on the page
$(document).on("click", ".topics-btn", function () {
    var name = $(this).attr("data-topics");
    getAndDisplayGifs(name);
});




// This .on("click") function will trigger creation of a NEW TOPICS Button, 
// execute the AJAX getAndDispayGifs function

$("#find-topic").on("click", function (event) {

    // Preventing the submit button from trying to submit the form
    // We're optionally using a form so the user may hit Enter to search instead of clicking the button
    event.preventDefault();

    // Here we grab the text from the input box
    var topic = $("#topic-input").val();

    // Write code  to hit the queryURL with $.ajax, then take the response data
    // and display it in the gif-container div 

    topics.push(topic);
    console.log(topics);
    renderButtons();

    getAndDisplayGifs(topic);

    // IMPORTANT! AN OBJECT IS NOT A STRING; 
    // IF YOU WANT TO DISPLAY SOMETHING ON THE PAGE, IT HAS TO BE A STRING
    // THAT IS WHY WE USE JSON.STRINGIFY TO CONVERt THE OBJECT INTO A STRING 
    // $("#movie-view").text(response); RESULTS TO [object Object]

    // $("#gif-container").html(JSON.stringify(response));
});




// add ratings to show on the page under each gif


// add PAUSING functionality 
$(document).on("click", ".giphy-image", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");

    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});