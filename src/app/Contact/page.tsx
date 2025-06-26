'use client'
import React from 'react'
import { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import{Phone, Mail, MapPin, Users, MessageCircle, Plus, Minus} from 'lucide-react'
import {faqData} from '@/components/hooks/data'
import {motion, AnimatePresence} from 'framer-motion'


export default function ContactPage()  {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className='min-h-screen'>
      
        
      <section className='py-20 bg-gradient-to-br from-green-50 to-blue-50 '>
        <div className='container mx-auto px-4'>
          <div className='text-center max-w-3xl mx-auto'>
              <h1 className=' text-4xl md:text-5xl font-bold text-gray-900 mb-6'>Contact Us</h1>
              <p>Punya pertanyaan tentang paket makanan kami atau butuh bantuan dengan langganan Anda? 
                Kami siap membantu Anda dalam perjalanan menuju pola makan sehat.</p>
          </div>
        </div>
      </section>

      <section className ='py-16 '>
        <div className = 'container mx-auto px-4'>
              <div className='text-center max-w-3xl mx-auto mb-12'>
                <h2 className='text-4xl font-bold text-gray-900 mb-6'>Get in Touch</h2>
                <p className='text-gray-600 mb-8'>Kami siap membantu Anda dalam perjalanan menuju pola makan sehat.</p>
              </div>
          <div className='grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto '>
            <div className = 'space-y-8'>


              <div className='space-y-6'>
                <Card>
                  <CardContent className='p-6'>
                    <div className='flex items-start gap-4'>
                      <div className='bg-green-100 p-3 rounded-lg'>
                        <Users className='h-6 w-6 text-emerald-700'/>
                      </div>
                      <div>
                        <h3 className='font-semibold mb-1 text-lg'>Manager</h3>
                        <p className = 'text-gray-600 mb-2'>Brian</p>
                        <p className='text-gray-600 text-sm'>Tersedia 24/7 untuk membantu anda</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className='p-6'>
                    <div className='flex items-start gap-4'>
                      <div className='bg-green-100 p-3 rounded-lg'>
                        <Phone className='h-6 w-6 text-emerald-700'/>
                      </div>
                      <div>
                        <h3 className='font-semibold mb-1 text-lg'>Phone & WhatsApp</h3>
                        <p className = 'text-gray-600 mb-2'>08123456789</p>
                        <p className='text-gray-600 text-sm'>Hubungi kami dan dapatkan informasi terbaru</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className='p-6'>
                    <div className='flex items-start gap-4'>
                      <div className='bg-green-100 p-3 rounded-lg'>
                        <Mail className='h-6 w-6 text-emerald-700'/>
                      </div>
                      <div>
                        <h3 className='font-semibold mb-1 text-lg'>Email</h3>
                        <p className = 'text-gray-600 mb-2'>hello@seacatering.com</p>
                        <p className='text-gray-600 text-sm'>Kirimkan pertanyaan Anda secara rinci, dan kami akan merespons dalam waktu 24 jam.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className='p-6'>
                    <div className='flex items-start gap-4'>
                      <div className='bg-green-100 p-3 rounded-lg'>
                        <MapPin className='h-6 w-6 text-emerald-700'/>
                      </div>
                      <div>
                        <h3 className='font-semibold mb-1 text-lg'>Lokasi Tersedia</h3>
                        <p className = 'text-gray-600 mb-2'>diseluruh kota-kota besar di Indonesia</p>
                        <p className='text-gray-600 text-sm'>Jakarta, Bandung, Surabaya, Medan, Padang, dan lainnya</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
            </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className='text-2xl'>Contact Form</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className = 'space-y-6'>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <Label htmlFor='firstname'>First Name</Label>
                          <Input type='text' id='firstname' placeholder='Masukkan nama depan anda' required/>
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='lastname'>Last Name</Label>
                          <Input type="text" id='lastname' placeholder='Masukan nama belakang anda' />
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input type='email' id='email' placeholder='Masukkan email anda' required/>
                      </div>

                      <div className='space-y-2'>
                         <Label htmlFor='phone'>Phone</Label>
                         <Input type='tel' id='phone' placeholder='Masukkan nomor telepon anda' required/>
                      </div>

                      <div className ='space-y-2'>
                        <Label htmlFor ='message'>Message</Label>
                        <Textarea  id= 'message'placeholder ='Tulis pesan anda di sini' rows={5}/>
                      </div>

                      <Button type='submit'className ='w-full bg-emerald-700 hover:bg-emerald-800 text-white '>
                        <MessageCircle className='h-5 w-5 mr-2'/> Kirim Pesan Anda
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
          </div>
        </div>
      </section>

      <section className ='py-16'>
        <div className ='container mx-auto px-4'>
          <div className = 'text-center max-w-3xl mx-auto'>
            <h1 className='text-4xl font-bold text-gray-900 mb-6'>FAQ</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {faqData.map((item, index) => (
                <div
                key ={index} 
                className= 'bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm'>
                <motion.button 
                onClick ={() => setOpenIndex(openIndex === index ? null : index)}
                className='w-full flex items-center justify-between p-6 text-left'
                whileHover={{backgroundColor:'rgba(125, 192, 121, 0.3'}}>
                  <h3 className ='text-md font-semibold text-gray-900 pr-8'>{item.question}</h3>
                  <div className='flex-shrink-0'>
                    {openIndex === index ? (
                      <div className = 'h-12 w-12 rounded-full bg-emerald-700 flex items-center justify-center '>
                        <Minus className='w-6 h-6 text-white'/>
                      </div>
                    ) : (
                      <div className = 'h-12 w-12 rounded-full bg-emerald-700 flex items-center justify-center '>
                        <Plus className='w-6 h-6 text-white'/>
                      </div>
                    ) }
                  </div>
                </motion.button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                    initial={{height : 0 , opacity : 0}}
                    animate = {{height : 'auto', opacity: 1}}
                    exit = {{height: 0, opacity: 0}}
                    transition = {{duration: 0.3, ease: 'easeInOut'}}
                    >
                      <div className='px-6 pb-6'>
                        <p className = 'text-gray-600 text-lg text-left text-md'>
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>  
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
