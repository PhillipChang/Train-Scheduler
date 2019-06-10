// Firebase 
var firebaseConfig = {
    apiKey: "AIzaSyCLQan-fSqXFXK2AyepiUuhLQ8jMi1Aimo",
    authDomain: "train-scheduler-7fdc7.firebaseapp.com",
    databaseURL: "https://train-scheduler-7fdc7.firebaseio.com",
    projectId: "train-scheduler-7fdc7",
    storageBucket: "train-scheduler-7fdc7.appspot.com",
    messagingSenderId: "655771507189",
    appId: "1:655771507189:web:67330b3a1cf7425f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var trainName = "";
var destination = "";
var fTrainTime = "";
var frequency = "";
var nextTrain = "";
var nextTrainMins = "";

var clock;

function update(){
    clock = moment().format("LTS");
    $(".clock").html("Current Time: " +clock);
}
// Time Now
$(document).ready(function(){
update();    
setInterval(update, 1000);
});

//   EventListner for adding new trains
$("#add-train").on("click", function (event) {
    event.preventDefault();

    if ($("#train-name").val().trim() === "" ||
    $("#destination").val().trim() === "" ||
    $("#train-time").val().trim() === "" ||
    $("#frequency").val().trim() === "" ){
        alert("Please fill in all the fields");
    }
    else {
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    fTrainTime = $("#train-time").val().trim();
    frequency = parseInt($("#frequency").val().trim());

var timeConvert = moment(fTrainTime, "HH:mm");

var timeDiff = moment().diff(moment(timeConvert), "minutes");

var timeRemain = timeDiff % frequency;

nextTrainMins = frequency - timeRemain;

nextTrain = moment().add(nextTrainMins, "minutes");
nextTrain = moment(nextTrain).format("LT");


    database.ref().push({
        trainName: trainName,
        destination: destination,
        fTrainTime: fTrainTime,
        frequency: frequency,
        nextTrain: nextTrain,
        nextTrainMins: nextTrainMins,
    });
}
});

database.ref().on("child_added", function (Childsnapshot) {

    $(".db").append("<tr><td>" + Childsnapshot.val().trainName + "</td><td>" + Childsnapshot.val().destination
        + "</td><td>" + Childsnapshot.val().frequency + "</td><td>" +Childsnapshot.val().nextTrain +"</td><td>" +Childsnapshot.val().nextTrainMins +"</td>");
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});




