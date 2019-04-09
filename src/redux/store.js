import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// import { Provider } from "react-redux";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD0wbwhRQtGBNAThsN3QdBHP4Fiui9UL_M",
  authDomain: "react-firebase-42bc2.firebaseapp.com",
  databaseURL: "https://react-firebase-42bc2.firebaseio.com",
  projectId: "react-firebase-42bc2",
  storageBucket: "react-firebase-42bc2.appspot.com",
  messagingSenderId: "437369143235"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// init firebase instance
firebase.initializeApp(firebaseConfig);
//init firestore
const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
  // notify: notifyReducer
});

// create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase, firestore),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
