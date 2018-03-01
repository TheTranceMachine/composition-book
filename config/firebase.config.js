import Firebase from 'firebase'

// Initialize Firebase
const app = Firebase.initializeApp({
  apiKey: 'AIzaSyASTbOq0MoWOroHubgHqgSjoCcYuQOPnMI',
  authDomain: 'compositionbook-demo.firebaseapp.com',
  databaseURL: 'https://compositionbook-demo.firebaseio.com',
  projectId: 'compositionbook-demo',
  storageBucket: 'compositionbook-demo.appspot.com',
  messagingSenderId: '128327725268'
});

//Database shortcuts
export const application = app
export const firebaseDb = app.database()
export const storage = app.storage()

export const firebaseProjects = firebaseDb.ref('projects')
