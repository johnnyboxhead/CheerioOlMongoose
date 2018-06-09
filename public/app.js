var thisID

// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<div class='articlediv'> <p data-id='" + data[i]._id + "'>" + data[i].title + "<button class='savebutton' button_id="+data[i]._id+">Save Article</button><button class='notebutton' data_id="+data[i]._id+">Leave Note</button><br />" + data[i].link + "</p>"+"<div class='modal' id='myModal'><div class='modal-content'>"+"<span class='close'>&times;</span>Update Notes</div><textarea id='bodyinput' name='body'></textarea><button data_id='" + data[i]._id + "' id='savenote'>Save Note</button></div></div>");
    }
  });
  
  $(document).ready(function(){
    
    // Whenever someone clicks a p tag
    $(document).on("click", ".notebutton", function() {
        // Empty the notes from the note section
        console.log("1")
        // $("#notes").empty();
        // Save the id from the p tag
        console.log("2")
        thisId = $(this).attr("data_id");
        console.log("1:"+$(this).attr("data_id"))
        console.log("2:"+this)
        console.log("3:"+thisId)

        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
            // $("#notes").empty();
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                // $("#notes").empty();
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
    
    // When you click the savenote button
    $(document).on("click", "#savenote", function() {
        // Grab the id associated with the article from the submit button
        console.log("Save ID is: " + $(this).attr("data_id"))
        var saveId = $(this).attr("data_id");
        console.log("Save ID is: " + saveId)
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
        method: "POST",
        url: "/articles/" + saveId,
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
    
        // Also, remove the values entered in the input and textarea for note entry
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });

    $(document).on("click", ".savebutton", function() {
        // Grab the id associated with the article from the submit button
        console.log("save button is working")
        var buttonId = $(this).attr("button_id");
        console.log(buttonId)
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
        method: "PUT",
        url: "/articles/" + buttonId,
        data: {
            // Value taken from title input
            // title: $("#titleinput").val(),
            // Value taken from note textarea
            saved: true
        }
        })
        // With that done
        .then(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
        });
    
        // Also, remove the values entered in the input and textarea for note entry
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });
})