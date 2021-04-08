import { getFirestore, getStorage } from "./firebase"
import { v4 as uuid } from "uuid"

export const uploadImg = async file => {
  const storage = await getStorage()
  const storageRef = storage().ref()
  const correctTypes = ["image/bmp", "image/jpeg", "image/png", "image/webp"]

  if (correctTypes.includes(file.type)) {
    const imgRef = storageRef.child(`img/${uuid()}_${file.name}`)
    const uploadTask = await imgRef.put(file)
    return uploadTask.ref.getDownloadURL()
  } else {
    throw new Error({ message: "Niepoprawny format obrazu" })
  }
}

export const addRecipe = async recipe =>
  new Promise(async (resolve, reject) => {
    try {
      const firestore = await getFirestore()
      const { name, desc, img, steps, ingredients } = recipe
      await firestore
        .collection("Recipes")
        .add({
          name,
          desc,
          img,
        })
        .then(ref => {
          steps.map(step => ref.collection("steps").add({ ...step }))
          ingredients.map(ingredient =>
            ref.collection("ingredients").add({ ...ingredient })
          )
          resolve(true)
        })
    } catch (error) {
      reject(error)
    }
  })

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
  try {
    let recipeRate = 1
    const previousRate = await getPreviousRate(recipeId, userId)

    if (previousRate.isExists) {
      const firestore = await getFirestore()

      const rate = await firestore
        .collection("Recipes")
        .doc(recipeId)
        .collection("rates")
        .doc(previousRate.rateId)
        .get()

      recipeRate = rate.data().rate
    }
    return recipeRate
  } catch (error) {
    console.error(error)
  }
}
