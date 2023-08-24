
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getFirestore,collection,addDoc,getDocs,onSnapshot,deleteDoc,doc,getDoc,updateDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB30Sx8XHFDh97Y8XzljlFOUv2xMDIjWS0",
    authDomain: "juegospendientes-1cf4a.firebaseapp.com",
    databaseURL: "https://juegospendientes-1cf4a-default-rtdb.firebaseio.com",
    projectId: "juegospendientes-1cf4a",
    storageBucket: "juegospendientes-1cf4a.appspot.com",
    messagingSenderId: "456229569611",
    appId: "1:456229569611:web:47609ca5af7fb04a7af9ce"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveForm = (nombre, plataforma,estado)=> //guarda datos
     addDoc(collection(db,'Juegos'),{nombre,plataforma,estado}) 

export const getEstudiante = () => getDocs(collection(db,'Juegos')) //muestra datos

export const ongetEstudiante = (callback)=> onSnapshot(collection(db,'Juegos'),callback);//listar datos

export const EliminarEstudiante = id => deleteDoc(doc(db,'Juegos',id));//eliminiar un dato

export const EditarEstudiante = id => getDoc(doc(db,'Juegos',id)); //editar

export const ActualizarEstudiante = (id, newFields)=> updateDoc(doc(db,'Juegos',id), newFields); //actualizar
