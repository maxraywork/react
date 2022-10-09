import { ref, onValue } from "firebase/database";
import FirebaseService from "../API/FirebaseService";

export const useDatabase = (path) => {


    const db = FirebaseService.getDatabase();

    const starCountRef = ref(db, path);
  
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        return data;
      });

};
