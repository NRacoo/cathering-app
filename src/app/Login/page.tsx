'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Card, CardTitle, CardHeader, CardContent, CardDescription, CardFooter} from '@/components/ui/card'
import Link from 'next/link'
import {useState} from 'react'
import { Eye, EyeOff } from 'lucide-react'


export default function Login(){
  const [formData] = useState({
      email: '',
      password: '',
      rememberMe:false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading] = useState(false)

  return(
    <div className='min-h-screen flex items-center justify-center py-12 px-4'> 
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
                  <form>
                    <div className='flex flex-col gap-6'>
                      <div className='grid gap-2'>
                        <Label htmlFor = 'email'>
                          Email
                        </Label>
                        <Input 
                        id='email'
                        type='email'
                        value={formData.email}
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
                        value={formData.password}
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
                  <p className='text-sm text-gray-600'>Belum mempunyai akun? {""}<Link href ='/Register' className='text-emerald-700 hover:text-emerald-900 font-medium'>Daftar di sini</Link></p>

                </div>
                <CardFooter className='flex-col gap-2'>

                </CardFooter>
              </Card>
          </div>
      </section>
    </div>
  )
}