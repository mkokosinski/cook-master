// import db from "./services/firebase"
import { getFirestore, getStorage } from "./firebase"

export const uploadImg = async e => {
  const file = e.target.files[0];
  const storage = await getStorage();
  const storageRef = storage().ref();
  const imgRef = storageRef.child("img/" + file.name);
  const uploadTask = imgRef.put(file);
  return await uploadTask.snapshot.ref.getDownloadURL()
  // uploadTask.on(storage.TaskEvent.STATE_CHANGED, function(snapshot){
  //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //   console.log('Upload is ' + progress + '% done');
  //   switch (snapshot.state) {
  //     case storage.TaskState.PAUSED: // or 'paused'
  //       console.log('Upload is paused');
  //       break;
  //     case storage.TaskState.RUNNING: // or 'running'
  //       console.log('Upload is running');
  //       break;
  //   }
    
  // }, function(error) {
  //   console.log('ERROR ##', error);
    
  // }, function() {
  //   uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  //     console.log('File available at', downloadURL);
  //   });
  // });
}

export const getAutoCompleteList = async () => {
  const firestore = await getFirestore()
  const tips = await getSnap(firestore, "Tips")
  return tips.map(tip => ({
    id: tip.id,
    title: tip.Title,
    link: `/${getCategoryName(tip.Category.path)}/${tip.Title}`,
    img: tip.Img,
  }))
}

export const getTips = async () => {
  const firestore = await getFirestore()
  const tips = await getSnap(firestore, "Tips")

  return tips.map(tip => ({
    id: tip.id,
    title: tip.Title,
    link: `/${getCategoryName(tip.Category.path)}/${tip.Title}`,
    img: tip.Img,
    content: tip.Desc,
  }))
}

const getSnap = async (firestore, collectionName) => {
  const collect = await firestore.collection(collectionName).get()
  return collect.docs.map(doc => doc.data())
}

const getCategoryName = path => path.replace("Categories/", "")
