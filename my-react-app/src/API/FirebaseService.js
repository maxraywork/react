import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

export default class FirebaseService {
    
  static getApp() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBhrcv-1e9YLw4IpOQ3AnENEXFCs42zOX8",
        authDomain: "to-do-react-b8534.firebaseapp.com",
        projectId: "to-do-react-b8534",
        storageBucket: "to-do-react-b8534.appspot.com",
        messagingSenderId: "835185966556",
        appId: "1:835185966556:web:53b86fab3b9926484d2319",
        databaseURL: "https://to-do-react-b8534-default-rtdb.europe-west1.firebasedatabase.app/"
      };
  
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      return app;
  }

  static getAuth() {
    const auth = getAuth(this.getApp());
    return auth;
  }

  static getDatabase() {
    const database = getDatabase(this.getApp());
    return database;
  }
}
