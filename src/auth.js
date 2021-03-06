import firebase from 'firebase'
import firebaseui from 'firebaseui'

const config = {
  apiKey: 'AIzaSyDVfp4JXPN2YWXjo5D6HhCPbilPLH1fzqk',
  authDomain: 'pharmachain-cff4c.firebaseapp.com',
  databaseURL: 'https://pharmachain-cff4c.firebaseio.com',
  projectId: 'pharmachain-cff4c',
  storageBucket: 'pharmachain-cff4c.appspot.com',
  messagingSenderId: '399990821544'
}

const auth = {
  context: null,
  uiConfig: null,
  ui: null,

  init (context) {
    this.context = context

    firebase.initializeApp(config)
    this.uiConfig = {
      signInSuccessUrl: 'home',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    }
    this.ui = new firebaseui.auth.AuthUI(firebase.auth())

    firebase.auth().onAuthStateChanged((user) => {
      this.context.$store.dispatch('user/setCurrentUser')

      let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth)
      let guestOnly = this.context.$route.matched.some(record => record.meta.guestOnly)

      if (requireAuth && !user) this.context.$router.push('auth')
      else if (guestOnly && user) this.context.$router.push('home')
    })
  },
  authForm (container) {
    this.ui.start(container, this.uiConfig)
  },
  user () {
    return this.context ? firebase.auth().currentUser : null
  },
  logout () {
    firebase.auth().signOut()
  }
}

export default auth
