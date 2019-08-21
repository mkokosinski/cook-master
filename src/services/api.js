// import db from "./services/firebase"
import { getFirestore } from "./firebase"

  export const getAutoCompleteList= async () => {
    const firestore = await getFirestore();
    const tips = await getSnap(firestore, "Tips")
    return tips.map(m => ({ id: tip.id, title: tip.Title, link: `/${tip.category}/${tip.title}`}))
  }

  export const  getTips= async()=>{
    const firestore = await getFirestore();
    const tips = await getSnap(firestore, "Tips")
    return tips.map(tip => ({ id: tip.id, title: tip.Title, link: `/${tip.category}/${tip.title}`}))
  }

const getSnap = async (firestore, collectionName) => {
  const collect = await firestore.collection(collectionName).get()
  return collect.docs.map(doc => doc.data())
}
