import { initializeApp } from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyDnoksFZ-BazLLVfLivDdHVt5kW1_XeHzY",
    authDomain: "todoist-1aa4e.firebaseapp.com",
    databaseURL: "https://todoist-1aa4e-default-rtdb.firebaseio.com",
    projectId: "todoist-1aa4e",
    storageBucket: "todoist-1aa4e.appspot.com",
    messagingSenderId: "455040515401",
    appId: "1:455040515401:web:a359e920ddb35adc9d6e98"
});

export { firebaseConfig as firebase };
