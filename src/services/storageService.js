import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import {storage} from "../configs/firebase"



export async function UploadImage(file){
    const imageRef = storageRef(storage, `images/${file.name}`);
    await uploadBytes(imageRef, file).then()
    return await getDownloadURL(imageRef)
    
}