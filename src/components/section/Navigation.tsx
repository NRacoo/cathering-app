'use client'
import {useRouter } from 'next/navigation'

import Dock from '../ui/Dock'
import { Users, Home,Contact, BookText} from 'lucide-react'
/*const navigation =[{
    name:'Home', href:'/'
},
{
    name:'Menu', href:'/Meals'
},
{
    name:'Subscriptions', href:'/Subcriptions'
},
{
    name:'contact', href:'/Contact'
},
{
    name: 'Login', href:'/Login'
}]*/


export function Navigation (){
    const router = useRouter()
    
    const item =[
        {icon: <Home size={18} className='text-white'/>, label:'Home', onClick: () =>  router.push('/')},
        {icon: <BookText size={18} className='text-white'/>, label:'Menu', onClick: () => router.push('/Meals')},
        {icon: <Users size={18} className='text-white'/>, label:'Login', onClick: () => router.push('/Login')},
        {icon: <Contact size={18} className='text-white'/>, label:'Contact', onClick: () => router.push('/Contact')}
    
    ]

    //mock auth


    return(
        <nav className='block md:hidden fixed bottom-0 left-0 right-0 z-50 '>
            <Dock 
            items={item}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
            />
        </nav>
    )
}

export default Navigation