'use client'

import React from 'react'
import {Button} from '@/components/ui/button'
import{Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/Dialog'
import { CheckCircle, Star } from 'lucide-react'
import gambar2 from '@/components/gambar/gambar2.jpg'
import gambar3 from '@/components/gambar/gambar3.jpg'
import gambar4 from '@/components/gambar/gambar4.jpg'
import Link from 'next/link'
import Image from 'next/image'

const MealPlans= [{
    id:1,
    name: 'Diet Plan',
    price:30000,
    image:gambar2.src,
    description:'Cocok untuk anda yang sedang menerapkan gaya hidup sehat',
    features:[
        "Rendah Kalori (300-400 kcal)",
        "Tinggi Serat",
        "Porsi dapat dikontrol",
        "Sayur segar dan tinggi protein"],
        nutritionInfo:{
            calories:"300-400 Kcal",
            protein:"25-30gr",
            carb:'30-40gr',
            fat:"8-12g",
        },popular: true,
},
{
    id:2,
    name: 'Protein Plan',
    price:40000,
    image:gambar3.src,
    description:'Menu tinggi protein yang cocok untuk aktivitas berat dan sering berolahraga',
    features:[
        "Tinggi Protein (35-40gr per menu)",
        "Membantu pemulihan otot",
        "pemulihan setelah berolahraga",
        "Protein premium dari kualitas terbaik"],
        nutritionInfo:{
            calories:"450-500 Kcal",
            protein:"35-40gr",
            carb:'35-45gr',
            fat:"12-18gr",
        },popular: false,
},
{
    id:3,
    name: 'Royal Plan',
    price:60000,
    image:gambar4.src,
    description:'Nikmati hidangan istimewa berbahan premium pilihan',
    features:[
        "Bahan-bahan istimewa",
        "Masakan chef ternama",
        "Menu eksklusif"
        ],
        nutritionInfo:{
            calories:"500-650 Kcal",
            protein:"30-40gr",
            carb:'40-65gr',
            fat:"18-25gr",
        },popular: false,
}]






const page = () => {

  return (
    <div className='min-h-screen bg-gray-50'>
        <section className='py-20 bg-gradient-to-br from-green-50 to-blue-50'>
            <div className='container mx-auto px-4'>
                <div className='text-center max-w-3xl mx-auto'>
                    <h1 className='text-4xl font-bold md:text-5xl text-gray-900 py-4'>Paket Makanan Kami</h1>
                    <p className='text-gray-600'>Temukan beragam paket menu eksklusif yang dirancang secara cermat 
                        untuk mendukung kesehatan dan gaya hidup anda.
                    </p>
                </div>
            </div>
        </section>
        {/*Meal Section */}

        <section className='py-20'>
            <div className='container mx-auto px-4'>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 '>
                    {MealPlans.map((plan) =>(
                        <Card key={plan.id} className='relative hover:shadow-lg transition-shadow'>
                            {plan.popular &&(
                                <Badge className='absolute -top-2 left-4 bg-orange-500 hover:bg-orange-600'>
                                    <Star className='h-3 w-3 mr-1'/>
                                    Most Popular
                                </Badge>
                            )}
                            <CardHeader>
                                <div className='aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden'>
                                    {plan.image ? (
                                        <Image src={plan.image} alt={plan.name} width={300} height={300} className="object-cover w-full h-full"/>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No image available
                                        </div>
                                    )}
                                </div>
                            <CardTitle className='text-2xl px-2'>
                                {plan.name}
                            </CardTitle>
                            <div className='text-3xl font-bold text-green-600 px-2'>
                                Rp.{plan.price.toLocaleString('id-ID')}
                                <span className='text-sm font-normal text-gray-500'>/meal</span>
                            </div>
                            <CardDescription className='text-base px-2'>
                                    {plan.description}
                            </CardDescription>
                            </CardHeader>
                            
                            <CardContent className='space-y-4'>
                                <div className='space-y-2'>
                                {plan.features.slice(0.3).map((feature, index)=>(
                                    <div key={index} className='flex items-center gap-2 px-2'>
                                        <CheckCircle className='h-4 w-4 text-green-600 '/>
                                        <span className='text-sm text-gray-600'>{feature}</span>
                                    </div>
                                ))}
                                </div>

                                <div className='flex gap-2 px-2'>
                                    <Dialog >
                                        <DialogTrigger asChild>
                                            <Button variant='outline' className='flex-1'>
                                                See More Details
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className='max-w-3xl'>
                                            <DialogHeader>
                                                <DialogTitle className='text-2xl'>
                                                    {plan.name}
                                                </DialogTitle>
                                                <DialogDescription className='text-base'>
                                                    {plan.description}
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className='space-y-6'>
                                                <div className='aspect-video bg-gray-200 rounded-lg overflow-hidden'>
                                                    {plan.image ? (
                                                        <Image src={plan.image} alt={plan.name} width={300} height={300} className="object-cover w-full h-full"/>
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            No image available
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='grid md:grid-cols-2 gap-6'>
                                                <h4 className='font-semibold '>Plan Features</h4>
                                                <div className='space-y-2'>
                                                        {plan.features.map((feature, index)=>(
                                                            <div key={index} className='flex items-center gap-2'>
                                                                <CheckCircle className='h-4 w-4 text-green-600'/>
                                                                <span className='text-sm'>{feature}</span>
                                                            </div>
                                                        ))}
                                                        
                                                </div>

                                                <div>
                                                    <h4 className='font-semibold mb-3'>Nutrition Info(per meal)</h4>
                                                    <div className='space-y-2 text-sm'>
                                                        <div className='flex justify-between'>
                                                            <span>Kalori: </span>
                                                            <span className='font-medium '>
                                                                {plan.nutritionInfo.calories}
                                                            </span>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <span>Protein: </span>
                                                            <span className='font-medium '>
                                                                {plan.nutritionInfo.protein}
                                                            </span>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <span>Karbohidrat: </span>
                                                            <span className='font-medium '>
                                                                {plan.nutritionInfo.carb}
                                                            </span>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <span>Lemak: </span>
                                                            <span className='font-medium '>
                                                                {plan.nutritionInfo.fat}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='text-center'>
                                                    <div className='text-3xl font-bold text-green-600 mb-2'>
                                                        Rp.{plan.price.toLocaleString('id-ID')}/meal
                                                    </div>
                                                    <Button asChild size='lg' className='w-full md:w-auto'>
                                                        <Link href = '/Subcriptions'>Langganan untuk Menu ini</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Button className='flex-1'>
                                        <Link href='/Subcriptions'>Pilih Menu</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                </div>
            </div>
        </section>
    </div>
 )
}

export default page