// import db from "./services/firebase"
import { getFirestore, getStorage } from "./firebase"

export const uploadImg = async file => {
  const storage = await getStorage();
  const storageRef = storage().ref();
  const imgRef = storageRef.child("img/" + file.name);
  const uploadTask = imgRef.put(file);
  return await uploadTask.snapshot.ref.getDownloadURL()
}

export const addRecipe = async doc =>{
  const firestore = await getFirestore()
  const t = await firestore.collection('Tips').add({
    name:doc.name,
    img:doc.imgPath,
    desc:doc.desc
  })
  console.log(t);
  
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
