'use client'
import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Card, CardTitle, CardHeader, CardContent, CardDescription, CardFooter} from '@/components/ui/card'
import Link from 'next/link'
import {useState} from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


function LoginForm(searchParams : any) {
  const [error, setError] = useState('')
  const{push} = useRouter()
  const callbackUrl = searchParams.callbackUrl || '/'
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const email =(e.currentTarget.elements.namedItem('email') as HTMLInputElement).value
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value
    setIsLoading(true);
    try{
      const res = await signIn('credentials', {
        email,
        password,
        callbackUrl,
        redirect: false
      })
      if (res && !res.error) {
        push(res.url || callbackUrl);
      } else {
        if (res?.status === 401) {
          setError("Email atau Password Salah");
        } else {
          setError("Login gagal. Silakan coba lagi.");
        }
      }
    }catch(err){
      console.error(err)
      setError('Terjadi Kesalahan saat login')
    }
    setIsLoading(false);
  }

  return (
    <>
      {error !== '' && (
        <div className = 'text-center '>
          <h3 className='text-red-500 font-semibold'>Email atau Password salah</h3>
        </div>
      )} 
      <section className='bg-gradient-to-br from-green-50 to-blue-50'>
          <div className='w-full max-w-md'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-center text-lg'>
                  Login to your account
                  </CardTitle>
                  <CardDescription>
                    Masukkan email anda di bawah ini untuk masuk ke akun anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className='flex flex-col gap-6'>
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
                        <Link href ='' className='text-gray-600 text-sm hover:text-gray-900 ml-auto inline-block underline-offset-4 hover:underline '>Lupa kata sandi?</Link>
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
                    <Button type='submit' size='lg' className='w-full bg-emerald-700 hover:bg-emerald-900'
                    disabled={isLoading}>
                      {isLoading ? 'Login...' : 'Login'}
                    </Button>
                  </form>
                </CardContent>
                <div className=' text-center'>
                  <p className='text-sm text-gray-600'>Belum mempunyai akun? {""}<Link href ='/Auth/Register' className='text-emerald-700 hover:text-emerald-900 font-medium'>Daftar di sini</Link></p>

                </div>
                <CardFooter className='flex-col gap-2'>

                </CardFooter>
              </Card>
          </div>
      </section>
    </>
  )
}

export default function Login(){
  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 flex-col'>
      
        <LoginForm />
      
    </div>
  )
}