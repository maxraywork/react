import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase, onValue, ref, set, off, remove} from "firebase/database";

const uid =  localStorage.getItem('uid');
const postsPath = `posts/${uid}`;

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

    static subscribeOnPosts(callback, error) {
        const db = this.getDatabase();

        const dbRef = ref(db, postsPath);

        onValue(dbRef, (snapshot) => callback(snapshot));
        return dbRef;
    }

    static setPostById(postId, data) {
        const db = ref(this.getDatabase(), `${postsPath}/${postId}`);
        set(db, data);
        return db;
    }

    static removePostById(postId) {
        const db = ref(this.getDatabase(), `${postsPath}/${postId}`);
        remove(db);
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
