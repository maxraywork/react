import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase, onValue, ref, set, off, remove} from "firebase/database";

const postsPath = "posts/";

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
        return initializeApp(firebaseConfig);
    }

    static getAuth() {
        return getAuth(this.getApp());
    }

    static getDatabase() {
        return getDatabase(this.getApp());
    }

    static subscribeOnDatabase(path, callback) {
        const db = this.getDatabase();

        const dbRef = ref(db, path);

        onValue(dbRef, (snapshot) => callback(snapshot));
        return dbRef;
    }

    static writeDataOnDatabase(path, data, callback) {
        const db = ref(this.getDatabase(), path);
        set(db, data);
        return db;
    }

    static createPost(id, data) {
        const db = ref(this.getDatabase(), `${postsPath}/${id}`);
        set(db, data);
        return db;
    }

    static deleteSpecificPost(uid, postId, data) {
        const db = ref(this.getDatabase(), `${postsPath}/${uid}/${postId}`);
        remove(db, data);
        return db;
    }

    static removeDatabaseListener(reference, path) {
        if (reference !== null) {
            off(reference);
        } else if (path !== null) {
            off(path);
        }
    }
}
