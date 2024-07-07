import {  addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import db from "../configs/firebase";


export async function GetAllArticlesForCategory(categoryId){
    const querySnapshot  = await getDocs(collection(db, "category", categoryId, "articles"));
    let data = []
    querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}))
    return data
}

export async function GetArticleById(categoryId, articleId){
    return await getDoc(doc(db, "category", categoryId, "articles", articleId))
}

export async function CreateArticle(categoryId, article){
    const collectionRef = collection(db, "category", categoryId, "articles")
    return await addDoc(collectionRef, article)
}

export async function DeleteArticle(categoryId, articleId){
    const articleRef = doc(db, "category", categoryId, "articles", articleId)
    return await deleteDoc(articleRef)
}

export async function UpdateArticle(article,categoryId, articleId){
    const articleRef = doc(db, "category", categoryId, "articles", articleId)
    return await setDoc(articleRef, article)
}

export async function OrderArticles(articles, orderDetails){
    const orderCollection = collection(db, "orders")
    return await addDoc(orderCollection, {...orderDetails, articles: articles})
}

