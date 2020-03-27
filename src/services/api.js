// import db from "./services/firebase"
import { getFirestore, getStorage, getAuth } from "./firebase"

export const uploadImg = async file => {
  try {
    const storage = await getStorage()
    const storageRef = storage().ref()
    const imgRef = storageRef.child("img/" + file.name)
    const uploadTask = await imgRef.put(file);
    return uploadTask.ref.getDownloadURL();
  } catch (error) {
    console.log("api err: ", error)
  }
}

export const addRecipe = async recipe => {
  const firestore = await getFirestore()
  const {name, desc, img, steps, ingredients} = recipe;
  const t = await firestore.collection("Recipes").add({
    name, desc, img
  }).then(ref => {
    console.log('eeeeeeee', ref);
    ref.collection('steps').add({steps});
  })
  console.log(t)
  console.log(recipe);
  
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
