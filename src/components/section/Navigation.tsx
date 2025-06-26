'use client'
import {useRouter } from 'next/navigation'
import Dock from '../ui/Dock'
import { Users, Home,Contact, BookText, User} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'


export function Navigation (){
    const router = useRouter()

    const {data: session,status} = useSession();


    
    const navigation =[{
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
        name:'Profile', href:'/Profile'
    }
    ]
           
        
    
    
    const item =[
        {icon: <Home size={18} className='text-white'/>, label:'Home', onClick: () =>  router.push('/')},
        {icon: <BookText size={18} className='text-white'/>, label:'Menu', onClick: () => router.push('/Meals')},
        {icon: <Users size={18} className='text-white'/>, label:'Contact', onClick: () => router.push('/Contact') },
        {icon: <User size={18} className='text-white'/>, label:'Profile', onClick: () => router.push('/Profile')},
        {icon: <Contact size={18} className='text-white'/>, label:'Dashboard', onClick: () => router.push('/dashboard')},
    
    ]


    return(
        <>
        <nav className='hidden fixed top-4 mx-auto max-w-5xl inset-x-0 bg-white/60 shadow-lg backdrop-blur-lg rounded-full px-8 py-2 md:flex items-center justify-between
            border border-neutral-300 z-50 '>

                <Link href ='/'>
                <span className='font-bold text-emerald-700 '>
                    SEA
                </span>
                <span className='font-bold'>-Catering</span>
                </Link>
            
            <ul className='hidden md:flex  items-center justify-between mx-auto space-x-6'>
                {navigation.map((item, index) =>(
                    <motion.li
                    key={index}
                    whileHover={{scale :1.1}}
                    className='relative group'
                >
                    <Link
                    href={item.href} className='text-gray-600 transition hover:text-emerald-500'>{item.name}
                    </Link>
                    <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all 
                    duration-300 group-hover:w-full'></span>
                </motion.li>
                ))}

            </ul>
                {status === 'authenticated' ? (
                    <>
                    <div className='flex items-center gap-2 ml-auto '>
                        <Button variant='outline' className='bg-transparant font-semibold text-gray-600 hover:text-emerald-500' onClick={() => signOut()}>Logout</Button>
                        <Link href ='/dashboard' className='flex items-center gap-2'>
                        <User className = 'text-emerald-500 w-6 h-6'/>
                        <h2 className ='text-sm font-semibold'>{session?.user?.fullname}</h2>
                        </Link>
                    </div>
                    </>
                ) : (
                    <>
                    <div className = 'flex items-center gap-2 '>
                        <Button variant='outline' className='bg-transparant font-semibold text-gray-600 hover:text-emerald-500' onClick={() => signIn()}>Login</Button>
                        <Link href ='/dashboard'>
                         <User className = 'text-emerald-500 w-6 h-6'/>
                        </Link>
                    </div>                    
                    </>
                )
                }

        </nav>
            <div className='block md:hidden fixed bottom-0 left-0 right-0 z-50'>

            <Dock 
            items={item}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
            />
            </div>
        </>
        
    )
}

export default Navigation