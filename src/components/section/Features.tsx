import React from 'react'
import SpotlightCard from '../ui/SpotlightCard'
import { CheckCircle, Truck, Users, Star } from 'lucide-react'

const Features = () => {
    return (
        <section className='py-20 bg-white'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-16'>
                    <h2 className=' font-bold text-3xl md:text-4xl text-gray-900 mb-4'>
                        Kenapa Harus Pilih <br />SEA Catering?
                    </h2>
                    <p className='text-lg text text-gray-600 max-w-2xl mx-auto'>
                        Kami berkomitmen untuk menjadikan pola makan sehat lebih mudah diakses dan tetap lezat bagi semua orang
                    </p>
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    <SpotlightCard className='custom-spotlight-card' spotlightColor='rgba(137, 243, 54, 0.2)'>
                        <div className='text-center flex flex-col items-center'>
                            <CheckCircle className='h-6 w-6 mb-2'/>
                            <h1 className='font-semibold text-xl'>
                                Personalisasi Makanan
                            </h1>
                            <p className='text-gray-600'>Personalisasikan menu anda sesuai dengan preferensi dan kebutuhan diet anda </p>
                        </div>
                    </SpotlightCard>

                    <SpotlightCard className='custom-spotlight-card' spotlightColor='rgba(137, 243, 54, 0.2)'>
                        <div className='text-center flex flex-col items-center'>
                            <Truck className='h-6 w-6 mb-2'/>
                            <h1 className='font-semibold text-xl'>
                                Pengiriman ke seluruh Indonesia
                            </h1>
                            <p className='text-gray-600'>Kita Mengirim makanan segar, sehat, dan sempurna ke berbagai kota di seluruh Indonesia  </p>
                        </div>
                    </SpotlightCard>

                    <SpotlightCard className='custom-spotlight-card' spotlightColor='rgba(137, 243, 54, 0.2)'>
                        <div className='text-center flex flex-col items-center'>
                            <Users className='h-6 w-6 mb-2'/>
                            <h1 className='font-semibold text-xl'>
                                Informasi Nutrisi Lengkap
                            </h1>
                            <p className='text-gray-600'>Rincian gizi akurat untuk setiap hidangan bantu anda tetap konsisten dengan gaya hidup sehat </p>
                        </div>
                    </SpotlightCard>
                    
                    <SpotlightCard className='custom-spotlight-card' spotlightColor='rgba(137, 243, 54, 0.2)'>
                        <div className='text-center flex flex-col items-center'>
                            <Star className='h-6 w-6 mb-2'/>
                            <h1 className='font-semibold text-xl'>
                                Kualitas Premium
                            </h1>
                            <p className='text-gray-600'>Bahan-bahan segar diambil dari berbagai suplier tepercaya untuk rasa yang terbaik </p>
                        </div>
                    </SpotlightCard>
                </div>
            </div>
        </section>
    )
}

export default Features