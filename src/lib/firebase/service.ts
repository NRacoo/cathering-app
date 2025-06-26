import  {query, collection, getFirestore, where, getDocs, addDoc} from 'firebase/firestore'
import app from './init'
import bcrypt from 'bcrypt'
import { CustomUser } from "@/types/admin"

const db = getFirestore(app)

export async function Register(
    data:{
        fullname:string,
        email:string,
        password:string,
        role?:string
        
    }
){
    const email = data.email.toLowerCase()
    const q = query(collection(db, 'users'), where('email', '==', email));
    const snapShot = await getDocs(q);
    console.log(snapShot.size)
    
    if(!snapShot.empty){
        return {status : false, statusCode: 409, message :' email already exists' }
    }


        try{  
            data.role = 'member';
            data.password = await bcrypt.hash(data.password, 10)
            await addDoc(collection(db, 'users'), {
                fullname: data.fullname,
                email,
                password: data.password,
                role:data.role,
            })
            return {status : true, statusCode : 200 ,message : 'register succes'}
        }
        catch(erorr){
            console.error('erorr during registration ', erorr)
            return {status : false, statusCode: 500, message :'register failed'}
        }
        
}



export async function Login(
    data:{
        email:string
    }
) {
    const email = data.email.toLowerCase()
    const q = query(collection (db, 'users'), where('email', '==', email))
    const snapShot = await getDocs(q)
    const user = snapShot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            email: data.email as string,
            fullname: data.fullname as string,
            password: data.password as string,
            role: data.role as string,
        } as CustomUser;
    });

    if(user && user[0]){
        return user[0]
    }else{
        return null 
    }
}

export async function uploadMenu(data:{
    id:string,
    name:string,
    price:number,
    image:string,
    description:string,
    features:string[],
    nutritionInfo:{
        calories:string,
        protein:string,
        carb:string,
        fat:string,

    },
    popular:boolean
}){
    try{
        const docRef = await addDoc(collection(db, 'menu'), data)
        return {status: true, statusCode: 200, message: 'Menu berhasil diupload', id: docRef.id}

    }catch(error){
        console.error('error saat upload menu', error)
    }
    
}

export async function getMenu(){
    try{
        const snapShot = await getDocs(collection(db, 'menu'))
        const menus = snapShot.docs.map((doc) =>({
            id: doc.id,
            ...doc.data(),
        }))
        return {status : true, data : menus}
    }catch(error){
        console.error('error saat mengambil menu', error)
    }
}