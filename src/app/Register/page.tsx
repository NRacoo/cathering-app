    'use client'
    import React from 'react'
    import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/card'
    import { Button } from '@/components/ui/button'
    import { Label } from '@/components/ui/label'
    import { Input } from '@/components/ui/input'
    import { useState } from 'react'
    import { Eye, EyeOff, CheckCircle, X} from 'lucide-react'
    import Link from 'next/link'
    
    export default function Register(){
        const [showPassword, setShowPassword] = useState(false)
        const [confirmPassword, setConfirmPassword] = useState(false)
        const [doPasswordsMatch]= useState (false)
        const [formData] = useState({
            email: '',
            password:'',
            confirmPassword:'',
            agreeToTerms:false,
        })

        return (
            <div className='min-h-screen flex items-center justify-center py-12  px-4'>
                <section className='bg-gradient-to-br from-green-50 to-blue-50'>
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
                            <Label>
                                Confirm Password
                            </Label>
                            <Input
                            id='confirmpassword'
                            type={confirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            placeholder='Masukan kata sandi anda'
                            required/>
                            <button
                            type='button'
                            onClick ={()=>setConfirmPassword(!confirmPassword)}
                            className=' ml-auto -translate-y-8 pr-4 text-gray-400 hover:text-gray-600'>
                            {confirmPassword ? <EyeOff className='h-4 w-4'/> : <Eye className='h-4 w-4'/>}
                            </button>
                        </div>
                        {formData.confirmPassword && (
                            <div className='mt-2 flex items-center gap-2 text-xs'>
                                {doPasswordsMatch ? (
                                    <>
                                    <CheckCircle className='h-3 w-3 text-emerald-700'/>
                                    <span className='text-emerald-700'>Passwords Match</span>
                                    
                                    </>
                                ):(
                                    <>
                                        <X className='h-3 w-3 text-red-500'/>
                                        <span>Passwords do not match</span>
                                    </>
                                )}
                                
                            </div>
                        )}
                        </div>
                        <Button type='submit' size='lg' className='w-full bg-emerald-700 hover:bg-emerald-900'
                        >Daftar
                        </Button>
                    </form>
                        <div className=' text-center'>
                            <p className='text-sm text-gray-600'>Sudah mempunyai akun? {""}<Link href ='/Login' className='text-emerald-700 hover:text-emerald-900 font-medium'>Masuk di sini</Link></p>

                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
            </div>
        )
    }
