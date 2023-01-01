  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDZ8p81tya9X8xVm0K5D2DYany7ORFZiZg",
    authDomain: "amj-1-a3092.firebaseapp.com",
    databaseURL: "https://amj-1-a3092-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "amj-1-a3092",
    storageBucket: "amj-1-a3092.appspot.com",
    messagingSenderId: "133019365322",
    appId: "1:133019365322:web:cb9be862557345fe19e933",
    measurementId: "G-ZPPMSZPRBT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  var firebaseref = app.getDatabase().ref("schools");
  firebaseref.once("value", function(snapshot){
    snapshot.forEach(function(e){
        console.log(e.val());
    })
  })

  import {getDatabase , ref , get, set, child ,update ,remove}
  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

  const db = getDatabase();
