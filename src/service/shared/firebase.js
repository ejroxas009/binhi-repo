import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCbDU0leF3VloNBPPjZoTwhWj5pB5Xpvns",
  authDomain: "binhi-project-ab07d.firebaseapp.com",
  projectId: "binhi-project-ab07d",
  storageBucket: "binhi-project-ab07d.appspot.com",
  messagingSenderId: "896245303465",
  appId: "1:896245303465:web:d8d37ef5af3a28ea5c81b8",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
