const [user, initialising] = useAuthState(firebase.auth());
const [value, loading] = useCollection(
  firebase.firestore().collection('test'),
  {
    snapshotListenOptions: { includeMetadataChanges: true },
  }
);

const login = () => {
  firebase.auth().signInWithEmailAndPassword('test@123.pl', '123123');
};
const logout = () => {
  firebase.auth().signOut();
};

const logi = () => firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
});