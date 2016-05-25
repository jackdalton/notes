
// Initialize Firebase
var config = {
    apiKey: "replace me",
    authDomain: "replace me",
    databaseURL: "replace me",
    storageBucket: ""
};
firebase.initializeApp(config);

/* *************** REPLACE THE ABOVE VALUES BEFORE PROCEEDING ************************ */

function addNote(noteId, title, description) {
    firebase.database().ref("notes/" + noteId).set({
        title: title,
        description: description,
        done: false
    });
}

function newNote() {
    var noteId = Date.now();
    var title = $("#newNoteTitle").val();
    var description = $("#newNoteDescription").val();
    $("#newNoteTitle").val("");
    $("#newNoteDescription").val("");
    addNote(noteId, title, description);
}

function markNoteFinished(noteId, title, description) {
    firebase.database().ref("notes/" + noteId).remove();
}

function updateNotes(data) {
    $("#cards").empty();
    for (var note in data) {
        if (data.hasOwnProperty(note)) {
            var title = data[note].title;
            var description = data[note].description;
            var dateCreated_d = new Date(Number(note));
            var dateCreated = "Created ";
            dateCreated += (dateCreated_d.getMonth() + 1) + "-";
            dateCreated += dateCreated_d.getDate() + "-";
            dateCreated += dateCreated_d.getFullYear();
            $("#template").clone().prop("id", note).appendTo("#cards");
            $("#" + note).find(".header").empty().text(title);
            $("#" + note).find(".description").empty().text(description);
            $("#" + note).find(".meta").empty().text(dateCreated);
            $("#" + note).find(".meta").append($("<i class='calendar icon'></i>"));
            $("#" + note).find(".button").empty().append($("<i class='minus icon'></i>"));
            $("#" + note).find(".button").click(function() {
                markNoteFinished(note, title, description);
            });
        }
    }
}

(function() {
    firebase.database().ref("notes/").on("value", function(data) {
        updateNotes(data.val());
    });
    $("#template").find(".button").click(newNote);
})();
