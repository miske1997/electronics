import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../configs/firebase";

export async function AddCompleatedOrder(orderData){
    const collectionRef = collection(db, "compleatedOrders")
    return await addDoc(collectionRef, orderData)
}

export async function DeletePendingOrder(orderId){
    const orderRef = doc(db, "orders", orderId)
    return await deleteDoc(orderRef)
}

export async function GetPendingOrders(){
    const querySnapshot  = await getDocs(collection(db, "orders"));
    let data = []
    querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}))
    return data
}

export async function GetCompletedOrders(){
    const querySnapshot  = await getDocs(collection(db, "compleatedOrders"));
    let data = []
    querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}))
    return data
}

export async function GetAllOrders(){
    let querySnapshot  = await getDocs(collection(db, "compleatedOrders"));
    let data = []
    querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}))

    querySnapshot  = await getDocs(collection(db, "orders"));
    querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}))

    return data
}