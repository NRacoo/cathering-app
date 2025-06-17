"use client"
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import RollingGalery from '../ui/RollingGallery'
import Link from 'next/link'

const Hero = () => {

    return (
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <Badge variant='outline' className="mb-4">
                        Indonesia&apos;s #1 Meal Service
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">SEA Catering</h1>
                    <div className='flex justify-center'>
                        <RollingGalery autoplay={true} pauseOnHover={true}/>
                    </div>
                    
                    <p className="text-2xl md:text-3xl text-green-600 font-semibold mb-8">&quot;Healthy Meals, Anytime, Anywhere&quot;</p>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    Selamat datang di SEA Catering layanan katering sehat nomor satu di Indonesia. SEA Catering adalah solusi katering sehat terdepan di Indonesia. Makanan lezat dan bergizi kami siap antar ke rumah Anda praktis, personal, dan cocok untuk gaya hidup sehat.
                    </p>
                    <div className= "flex flex-col sm:flex-row gap-4 justify-center"> 
                        <Button variant ="outline" className='bg-emerald-700 text-white hover:bg-emerald-900 hover:text-white'>
                            <Link href='/Subcriptions'>Start Your Journey</Link>
                            
                        </Button>
                        <Button variant="outline">
                            <Link href ='/Meals'>View Meals Plan</Link>
                        </Button>
                    </div>
                </div>
            </div>
            </section>
    )
    }

export default Hero