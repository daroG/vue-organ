import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyDtuhVjww64eyJCSYjczj74ebfzkmuJeTo",
    authDomain: "myfirstapp-4cdb6.firebaseapp.com",
    databaseURL: "https://myfirstapp-4cdb6.firebaseio.com",
    projectId: "myfirstapp-4cdb6",
    storageBucket: "myfirstapp-4cdb6.appspot.com",
    messagingSenderId: "274347559588"
};
let app = Firebase.initializeApp(config);
export const db = app.database();
