import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, increment, limit, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
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
export async function SetFiltersForCategory(categoryId, filters){
    const querySnapshot = await getDocs(collection(db, "category", categoryId, "filters"));
    let data = []
    querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}))
    data.forEach(filter => DeleteFilter(categoryId, filter.id))

    const collectionRef = collection(db, "category", categoryId, "filters");
    filters.forEach(filter => addDoc(collectionRef, filter))

    return data
}

export async function DeleteFilter(categoryId, filterId){
    const filterRef = doc(db, "category", categoryId, "filters", filterId);
    return await deleteDoc(filterRef)
}

export async function GetCategory(categoryId){
    const querySnapshot = await getDoc(doc(db, "category", categoryId));
    return {...querySnapshot.data(), id: querySnapshot.id}
}

export async function CreateNewCategory(category, mainCategoryId, filters){
    const collectionRef = collection(db, "category")
    const data = await addDoc(collectionRef, category)
    SetFiltersForCategory(data.id, filters)
    AddSubCategoryToMainCategory(mainCategoryId, data.id, category.name)
    return data
}

export async function UpdateCategory(category,categoryId, mainId, filters){
    const categoryRef = doc(db, "category", categoryId)
    const data = await setDoc(categoryRef, category)
    SetFiltersForCategory(categoryId, filters)
    return data
}

export async function GetMainCategorys(){
    const querySnapshot  = await getDocs(collection(db, "general"));
    let data = []
    querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}))
    data.forEach(category => category.categorys = category.categorys?.map(subCategory => subCategory.id))
    return data
}


export async function UpdateMainCategory(mainCategory,categoryId){
    const categoryRef = doc(db, "general", categoryId)
    return await setDoc(categoryRef, mainCategory)
}

export async function CreateMainCategory(mainCategory){
    const collectionRef = collection(db, "general")
    return await addDoc(collectionRef, mainCategory)
}

export async function AddSubCategoryToMainCategory(mainCategoryId,categoryId, categortName){
    const categoryRef = doc(db, "general", mainCategoryId)
    const mainCategory = await getDoc(categoryRef)
    const data = mainCategory.data()
    console.log(!Object.hasOwnProperty.call(data, "categoryNames"));
    
    if (!Object.hasOwnProperty.call(data, "categoryNames")){
        data.categoryNames = []
    }
    if (!Object.hasOwnProperty.call(data, "categorys")){
        data.categorys = []
    }
    data.categoryNames.push(categortName)
    data.categorys.push(doc(db, "category", categoryId))

    UpdateMainCategory(data, mainCategoryId)
}

export async function IncrementCategorySalesForCart(articlesInCart){

    
    for (const article of articlesInCart) {
        const ref = doc(db, "category", article.categoryId);
    
        await updateDoc(ref, {
            numberOfSales: increment(1)
        });
    }

}

export async function GetPopularCategorys(){
    const categorysRef  = collection(db, "category");

    const q = query(categorysRef, orderBy("numberOfSales", "desc"), limit(1));

    const querySnapshot = await getDocs(q)

    let data = []
    querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}))
    return data
}