// import db from "./services/firebase"
import {getFirebase} from "./services/firebase"

export const Tips = {
  getTipsTitleList: async () => {
    const lazyApp = await import('@firebase/app')
    const lazyFirestore = await import('@firebase/firestore')
    const database = getFirebase(lazyApp.firebase).firestore()
    const test = await tips(database)

    return test.map(m=>({title:m.Title, link: '/Tips/' + m.Title}))
  },
}

  const getSnap = async (firestore, collectionName) =>{
    const collect = await firestore.collection(collectionName).get();
    return collect.docs.map(doc => doc.data());
  }

  const tips = (firestore) => {
    return  getSnap(firestore,'Tips'); 
  }