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

  $("#add-train").on("click",function(event){
      event.preventDefault();

      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      fTrainTime = $("#train-time").val().trim();
      frequency = $("#frequency").val().trim();
      console.log(trainName);
      console.log(destination);
      console.log(fTrainTime);
      console.log(frequency);

      database.ref().push({
          trainName: trainName,
          destination: destination,
          fTrainTime: fTrainTime,
          frequency: frequency,
      });
    });

    database.ref().on("child_added", function(Childsnapshot){

        console.log("new train: " +Childsnapshot.val().trainName);

        $(".db").append("<tr><td>" +Childsnapshot.val().trainName +"</td><td>" +Childsnapshot.val().destination
        +"</td><td>" +Childsnapshot.val().fTrainTime +"</td><td>" +Childsnapshot.val().frequency +"</td>");
    }, function(errorObject) {
        console.log("Errors handled: " +errorObject.code);
    });


