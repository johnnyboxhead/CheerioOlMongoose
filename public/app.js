var thisID

// Grab the articles as a json
$.getJSON("/articles/unsaved", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<div class='articlediv'> <p data-id='" + data[i]._id + "'>" + data[i].title + "<button class='savebutton' button_id="+data[i]._id+">Save Article</button><button class='notebutton' data_id="+data[i]._id+">Leave Note</button><br />" + data[i].link + "</p>"+"<div class='modal' id='myModal'><div class='modal-content'>"+"<span class='close'>&times;</span><p>Update Notes</p><textarea id='bodyinput' name='body'></textarea><button data_id='" + data[i]._id + "' id='savenote'>Save Note</button></div></div></div>");
    }
  });
  
  $(document).ready(function(){
    $(document).on("click", "#savedArticles", function() {
        $("#articles").empty()
        console.log("The saved articles button is working")
        $.getJSON("/articles/saved", function(data) {
            // For each one
            // console.log("Data from the return looks like: "+data[0]._id)
            for (var i = 0; i < data.length; i++) {
              // Display the apropos information on the page
              $("#articles").append("<div class='articlediv'> <p data-id='" + data[i]._id + "'>" + data[i].title + "<button class='unsavebutton' button_id="+data[i]._id+">Unsave Article</button><button class='notebutton' data_id="+data[i]._id+">Leave Note</button><br />" + data[i].link + "</p>"+"<div class='modal' id='myModal'><div class='modal-content'>"+"<span class='close'>&times;</span><p>Update Notes</p><textarea id='bodyinput' name='body'></textarea><button data_id='" + data[i]._id + "' id='savenote'>Save Note</button></div></div></div>");
            }
        });
    }) 
    $(document).on("click", "#unsavedArticles", function() {
        $("#articles").empty()
        $.getJSON("/articles/unsaved", function(data) {
            // For each one
            for (var i = 0; i < data.length; i++) {
            // Display the apropos information on the page
            $("#articles").append("<div class='articlediv'> <p data-id='" + data[i]._id + "'>" + data[i].title + "<button class='savebutton' button_id="+data[i]._id+">Save Article</button><button class='notebutton' data_id="+data[i]._id+">Leave Note</button><br />" + data[i].link + "</p>"+"<div class='modal' id='myModal'><div class='modal-content'>"+"<span class='close'>&times;</span>Update Notes</div><textarea id='bodyinput' name='body'></textarea><button data_id='" + data[i]._id + "' id='savenote'>Save Note</button></div></div>");
            }
        });
    })    
    // Whenever someone clicks a p tag
    $(document).on("click", ".notebutton", function() {
        // Empty the notes from the note section
        // $("#notes").empty();
        // Save the id from the p tag
        thisId = $(this).attr("data_id");
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        // Now make an ajax call for the Article
        $.ajax({
        method: "GET",
        url: "/articles/" + thisId
        })
        // With that done, add the note information to the page
        .then(function(data) {
            console.log(data);
            
            if (data.note) {
            // Place the title of the note in the title input
            // $("#titleinput").val(data.note.title);
            // Place the body of the note in the body textarea
            $("#bodyinput").val(data.note.body);
            }
        });
    });
    
    // When you click the button to save a note
    $(document).on("click", "#savenote", function() {
        // Grab the id associated with the article from the submit button
        console.log("Save ID is: " + $(this).attr("data_id"))
        thisId = $(this).attr("data_id");
        console.log("Save ID is: " + thisId)
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            // title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }
        })
        // With that done
        .then(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            // $("#notes").empty();
        });
    });

    // When you click button to save an article
    $(document).on("click", ".savebutton", function() {
        // Grab the id associated with the article from the submit button
        console.log("save button is working")
        thisId = $(this).attr("button_id");
        console.log(thisId)
        // Run a PUT request to update the value of the saved field to false
        $.ajax({
        method: "PUT",
        url: "/articles/" + thisId,
        data: {
            saved: true
        }
        })
        // With that done
        .then(function(data) {
            // Log the response
            console.log(data);
            $("#unsavedArticles").trigger("click");    
        });
    });

    // When you click button to unsave an article
    $(document).on("click", ".unsavebutton", function() {
        // Grab the id associated with the article from the submit button
        console.log("This is data returnes from the unsave function 1:");
        thisId = $(this).attr("button_id");
        // Run a PUT request to update the value of the saved field to false
        console.log(thisId)
        $.ajax({
        method: "PUT",
        url: "/articles/" + thisId,
        data: {
            saved: false
        }
        })
        // With that done
        .then(function(data) {
            // Log the response
            console.log("This is data returned from the unsave function 2: "+thisId);
            // Empty the notes section
            $(this).empty()
            $("#savedArticles").trigger("click");
        });
    });
})