import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import {Users, Phone, Mail, MapPin} from 'lucide-react'

const Contact = () => {
    return (
        <section className='py-20 bg-white' >
            <div className='container mx-auto px-4'>
                <div className='text-center mb-16'>
                    <h2 className= 'text-3xl md:text-4xl font-bold text-gray-900 mb-4'> 
                        Get in Touch
                    </h2>
                    <p className='text-lg text-gray-600'>
                        Ada pertanyaan? Kami siap mendampingi Anda memulai gaya hidup sehat dari makanan.
                    </p>
                </div>

                <div className='max-w-2xl mx-auto'>
                    <Card>
                        <CardHeader className='text-center'>
                        <CardTitle className='text-2xl'>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-6'>
                            <div className='flex flex-col gap-4'>
                                <Users className='h-6 w-6 text-green-500'/>
                                <h2 className='font-semibold'>Manager: Brian</h2>
                                <p className='text-gray-600'>Bersedia 24/7 untuk kebutuhan pelanggan</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Phone className='h-6 w-6 text-green-500'/>
                                <h2 className='font-semibold'>08123456789</h2>
                                <p className='text-gray-600'>Telepon atau Whatsapp kami kapanpun.</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Mail className='h-6 w-6 text-green-500'/>
                                <h2 className='font-semibold'>Hello@seacatering.com</h2>
                                <p className='text-gray-600'>Hubungi kami melalui email untuk pertanyaan lebih lanjut.</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <MapPin className='h-6 w-6 text-green-500'/>
                                <h2 className='font-semibold'>Tersedia di Seluruh Kota Besar</h2>
                                <p className='text-gray-600'>Jakarta, Surabaya, Bandung, Medan, dan lainnya.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
    }

export default Contact