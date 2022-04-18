import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const config = {
     apiKey: "AIzaSyDkaelQ9BypLK5mL_O2Z3BJ8Lzl-UitYrE",
  authDomain: "dispace.firebaseapp.com",
  databaseURL: "https://dispace-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dispace",
  storageBucket: "dispace.appspot.com",
  messagingSenderId: "31648105014",
  appId: "1:31648105014:web:b649dfc8b4a7321ad60e97",
  measurementId: "G-LYQSK9VK8V"
}

const app = initializeApp(config)
const auth = getAuth(app)
auth.languageCode = 'id'
export default auth