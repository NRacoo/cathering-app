    'use client'
    import React from 'react'
    import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/card'
    import { Button } from '@/components/ui/button'
    import { Label } from '@/components/ui/label'
    import { Input } from '@/components/ui/input'
    import { useState } from 'react'
    import { Eye, EyeOff, CheckCircle, X} from 'lucide-react'
    import Link from 'next/link'
    import { toast } from '@/components/hooks/use-toast'
    export default function Register(){
        const [showPassword, setShowPassword] = useState(false)
        const [formData, setFormData] = useState({
            email: '',
            password:'',
            confirmPassword:'',
            agreeToTerms:false,
        })

        const passwordRequirements = [
            {test: (pwd) => pwd.length >=8, text:'password at least 8 characters'},
            {test: (pwd) => /[A-z]/.test(pwd), text: 'One uppercase letter'},
            {test: (pwd) => /[a-z]/.test(pwd), text:'One lowercase letter'},
            {test:(pwd) => /\d/.test(pwd), text:"One number"},
            {test:(pwd) => /[~!@#$%^&*"'{}<>?/`]/.test(pwd), text:'One spesial Character'}
        ]

        
        const [confirmPassword, setConfirmPassword] =useState(false)
        const [isLoading, setIsLoading] = useState(false)

        const isPasswordValid = passwordRequirements.every((req) => req.test(formData.password))
        const doPasswordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== ""

        const handleSubmit = async (e) => {
            e.preventDefault()

            // Validation
            if (!formData.fullName.trim()) {
            toast({
                title: "Error",
                description: "Full name is required",
                variant: "destructive",
            })
            return
            }

            if (!formData.email.trim()) {
            toast({
                title: "Error",
                description: "Email is required",
                variant: "destructive",
            })
            return
            }

            if (!isPasswordValid) {
            toast({
                title: "Error",
                description: "Password does not meet requirements",
                variant: "destructive",
            })
            return
            }

            if (!doPasswordsMatch) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive",
            })
            return
            }

            if (!formData.agreeToTerms) {
            toast({
                title: "Error",
                description: "Please agree to the terms and conditions",
                variant: "destructive",
            })
            return
            }

            setIsLoading(true)

            try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            toast({
                title: "Account Created!",
                description: "Your account has been created successfully. Please sign in.",
            })

            // Redirect to login
            window.location.href = "/login"
            } catch {
            toast({
                title: "Registration Failed",
                description: "Failed to create account. Please try again.",
                variant: "destructive",
            })
            } finally {
            setIsLoading(false)
            }
        }

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
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-6'>
                        <div className='grid gap-2'>
                            <Label htmlFor = 'email'>
                            Email
                            </Label>
                            <Input 
                            id='email'
                            type='email'
                            placeholder='m@google.com'
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({...prev, email:e.target.value}))}
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
                            onChange={(e) => setFormData((prev) =>({... prev, password:e.target.value}))}
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
                            onChange={(e) => setFormData((prev) =>({... prev, confirmPassword:e.target.value}))}
                            placeholder='Masukan kata sandi anda'
                            required/>
                            <button
                            type='button'
                            onClick={()=>setConfirmPassword(!confirmPassword)}
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
                        disabled={isLoading || !isPasswordValid || doPasswordsMatch|| !formData.agreeToTerms}>
                        {isLoading ? 'Daftar...' : 'Daftar'}
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
