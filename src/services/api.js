// import db from "./services/firebase"
import { getFirestore, getStorage, getAuth } from "./firebase"

export const uploadImg = async file => {
  const storage = await getStorage()
  const storageRef = storage().ref()
  const imgRef = storageRef.child("img/" + file.name)
  const uploadTask = imgRef.put(file)
  return await uploadTask.snapshot.ref.getDownloadURL()
}

export const addRecipe = async doc => {
  const firestore = await getFirestore()
  const t = await firestore.collection("Tips").add({
    name: doc.name,
    img: doc.imgPath,
    desc: doc.desc,
  })
  console.log(t)
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

const getPreviousRate = async (recipeId, userId) => {
  let result = { isExists: false, rateId: "" }
  const firestore = await getFirestore()
  const recipes = firestore.collection("Recipes")
  const recipe = recipes.doc(recipeId)
  const rates = await recipe.collection("rates").get()

  rates.forEach(doc => {
    const rate = doc.data()
    if (rate.user === userId) {
      result = { isExists: true, rateId: doc.id }
    }
  })

  return result
}

export const saveRacipeRate = async doc => {
  const { rate, userId, recipeId } = doc
  const previousRate = await getPreviousRate(recipeId, userId)

  const firestore = await getFirestore()
  const ratesRef = firestore
    .collection("Recipes")
    .doc(recipeId)
    .collection("rates")

  if (previousRate.isExists) {
    ratesRef.doc(previousRate.rateId).set({
      rate,
      user: userId,
    })
  } else {
    ratesRef.add({
      rate,
      user: userId,
    })
  }
}

export const getRecipeRate = async (recipeId, userId) => {
  console.log(recipeId, userId);
  
  let recipeRate = 1;
  const previousRate = await getPreviousRate(recipeId, userId);

  if (previousRate.isExists) {

    const firestore = await getFirestore()
    
    const rate = await firestore
    .collection("Recipes")
    .doc(recipeId)
    .collection("rates")
    .doc(previousRate.rateId).get()

    recipeRate = rate.data().rate;
  }
  return recipeRate;
}
