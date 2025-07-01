'use client'

import React, { useState } from 'react'
import {Button} from '@/components/ui/button'
import{Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/Dialog'
import { CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'








export default function MenuPage (){
    type MenuItem = {
        id: string;
        name: string;
        price: number;
        image: string;
        description: string;
        features: string[];
        nutritionInfo: {
          calories: string;
          protein: string;
          carb: string;
          fat: string;
        };
        popular: boolean;
      };

      const {data : session} = useSession()

    const [menu, setMenu] = useState<MenuItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const handleGetMenu = async () =>{
        setIsLoading(true)
        try{
            const res = await fetch('api/getMenu')
            const json = await res.json()

            if(res.ok){
                setMenu(json.data)
            }
        }catch(error){
            console.error('error saat mengambil menu', error)
        }finally{
            setIsLoading(false)
        }
    }

    const handleDeleteMenu = async (uid: string) => {
        setIsLoading(true)
        try{
            const res = await fetch(`api/menu/${uid}`, {
                method : 'DELETE',
                body:JSON.stringify({uid}),
                headers:{'content-Type' :'application/json'}
            });
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                setMenu((prev) => prev.filter(m => m.id !== uid))
            }else{
                alert("gagal menghapus menu: " + result.message)
            }
        }catch(error){
            console.error('error saat menghapus menu', error)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleGetMenu()
    }, [])

  return (
    <div className='min-h-screen bg-gray-50'>
        <section className='py-20 bg-gradient-to-br from-green-50 to-blue-50'>
            <div className='container mx-auto px-4'>
                <div className='text-center max-w-3xl mx-auto'>
                    <h1 className='text-4xl font-bold md:text-5xl text-gray-900 py-2'>Paket Makanan Kami</h1>
                    <p className='text-gray-600'>Temukan beragam paket menu eksklusif yang dirancang secara cermat 
                        untuk mendukung kesehatan dan gaya hidup anda.
                    </p>
                </div>
            </div>
        </section>
        {/*Meal Section */}

        <section>
            <div className='container mx-auto px-4'>
                {isLoading ? (
                    <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Memuat menu...</p>
                    </div>
                </div>
                ):(
                    
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 '>
                    {menu.map((plan) =>(
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
                                        <Image src={plan.image} alt={plan.name} width={300} height={300} unoptimized className="object-cover w-full h-full"/>
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
                                {plan.features.slice(0,3).map((feature : string, index : number)=>(
                                    <div key={feature} className='flex items-center gap-2 px-2'>
                                        <CheckCircle className='h-4 w-4 text-green-600 '/>
                                        <span className='text-sm text-gray-600'>{feature}</span>
                                    </div>
                                ))}
                                </div>

                                <div className='flex flex-col gap-2 px-2'>
                                    <Dialog >
                                        <DialogTrigger asChild>
                                            <Button variant='outline' className='flex-1'>
                                                See More Details
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent className='max-w-3xl max-h-[90vh] overflow-hidden'>
                                            <ScrollArea className=' h-[80vh] overflow-y-auto px-6 py-2'>
                                                <DialogHeader>
                                                    <DialogTitle className='text-2xl text-left'>
                                                        {plan.name}
                                                    </DialogTitle>
                                                    <DialogDescription className='text-base text-left mb-2'>
                                                        {plan.description}
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <div className='space-y-6'>
                                                    <div className='aspect-video bg-gray-200 rounded-lg overflow-hidden'>
                                                        {plan.image ? (
                                                            <Image src={plan.image} alt={plan.name} width='300' height='300' className="object-cover w-full h-full"/>
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                No image available
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='grid md:grid-cols-1 gap-2'>
                                                    <h4 className='font-semibold '>Plan Features</h4>
                                                    <div className='space-y-2'>
                                                            {plan.features.map((feature : string, index : number)=>(
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
                                                <ScrollBar orientation='vertical'/>
                                            </ScrollArea>
                                        </DialogContent>
                                    </Dialog>
                                    <Button className='flex-1'>
                                        <Link href='/Subcriptions'>Pilih Menu</Link>
                                    </Button>
                                    {session?.user?.role === 'admin' && (
                                        <Button
                                        variant='destructive'
                                        onClick={() => handleDeleteMenu(plan.id)}
                                        className=''> Hapus Menu </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                </div>
                )}
            </div>
        </section>
    </div>
 )
}
