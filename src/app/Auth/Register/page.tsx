'use client'
import React from 'react'
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Eye, EyeOff} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Register(){


    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading ] = useState(false)

    const route = useRouter();

    const handleSubmit= async (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setError('')

        setIsLoading(true)
        const email =(e.currentTarget.elements.namedItem('email') as HTMLInputElement).value
        const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value
        const fullname = (e.currentTarget.elements.namedItem('fullname') as HTMLInputElement).value
        
            const res = await fetch ('/api/auth/register', {
            method: 'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                fullname,
                email,
                password

            })
        })
        if(res.status === 200){
            if (e.currentTarget && typeof e.currentTarget.reset === 'function') {
                e.currentTarget.reset();
            }
            route.push('/Auth/Login')
        }else{
            setError('Email Sudah Terdaftar')
        }
        


    }

    return (
        <div className='min-h-screen flex items-center justify-center py-12  px-4'>
            <section className='bg-gradient-to-br from-green-50 to-blue-50 ' >
                <div className = 'flex flex-col items-center'>

                {error !== '' && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4' role='alert'>
                        <span className='block sm:inline'>{error}</span>
                    </div>
                )}
        <div className='w-full max-w-md'>
            <Card>
                <CardHeader>
                <CardTitle className='text-center text-lg'>
                Register your account 
                </CardTitle>
                <CardDescription className='text-center'>
                    Masukkan email anda di bawah ini untuk mendaftarkan ke akun anda
                </CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='flex flex-col gap-6'>
                    <div className='grid gap-2'>
                        <Label htmlFor = 'fullname'>
                        Fullname
                        </Label>
                        <Input 
                        id='fullname'
                        type='text'
                        placeholder='Nama'
                        required/>
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor = 'email'>
                        Email
                        </Label>
                        <Input 
                        id='email'
                        type='email'
                        placeholder='m@google.com'
                        required/>
                    </div>
                    <div className='grid gap-2'>
                        <div className='flex items-center'>
                        <Label htmlFor='password'>
                        Password
                        </Label>
                        </div>
                        <Input
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Masukan kata sandi anda'
                        required/>
                        <button
                        type='button'
                        onClick={()=>setShowPassword(!showPassword)}
                        className=' ml-auto -translate-y-8 pr-4 text-gray-400 hover:text-gray-600'>
                        {showPassword ? <EyeOff className='h-4 w-4'/> : <Eye className='h-4 w-4'/>}
                        </button>
                    </div>
                    
                    </div>
                    <Button type='submit' size='lg' className='w-full bg-emerald-700 hover:bg-emerald-900' disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Daftar'}
                    </Button>
                </form>
                    <div className=' text-center'>
                        <p className='text-sm text-gray-600'>Sudah mempunyai akun? {""}<Link href ='/Auth/Login' className='text-emerald-700 hover:text-emerald-900 font-medium'>Masuk di disini</Link></p>
                    </div>
                </CardContent>
            </Card>
        </div>
                </div>
    </section>
        </div>
    )
}
