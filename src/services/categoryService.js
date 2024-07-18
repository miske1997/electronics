import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../configs/firebase";


export async function GetAllCategorys(){
    const querySnapshot  = await getDocs(collection(db, "category"));
    let data = []
    querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}))
    return data
}

export async function GetFiltersForCategory(categoryId){
    const querySnapshot = await getDocs(collection(db, "category", categoryId, "filters"));
    let data = []
    querySnapshot.forEach(doc => data.push(doc.data()))
    return data
}

export async function GetCategory(categoryId){
    const querySnapshot = await getDoc(doc(db, "category", categoryId));
    return {...querySnapshot.data(), id: querySnapshot.id}
}

export async function GetMainCategorys(){
    const querySnapshot  = await getDocs(collection(db, "general"));
    let data = []
    querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}))
    data.forEach(category => category.categorys = category.categorys?.map(subCategory => subCategory.id))
    return data
}