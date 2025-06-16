'use client'
import React from 'react'
import { useCounterAnimation } from '../hooks/use-counte-animate'

    function AnimatedStat({
    end,
    suffix = "",
    prefix = "",
    label,
    color = "text-gray-900",
    decimals = 0,
    }: {
    end: number
    suffix?: string
    prefix?: string
    label: string
    color?: string
    decimals?: number
    }) {
    const { count, ref } = useCounterAnimation({
        end,
        suffix,
        prefix,
        duration: 2500,
        decimals,
    })

    return (
        <div>
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`text-4xl font-bold ${color} mb-2 transition-all duration-300`}>
            {count}
        </div>
        <div className="text-gray-600">{label}</div>
        </div>
    )
    }

const Stats = () => {
    return (
        <section className='py-20 bg-gray-50'>
            <div className='container mx-auto px-4'>
                <div className = 'grid md:grid-cols-3 gap-8 text-center'>
                    <AnimatedStat end={10000} suffix='+' label = 'Happy Customers' color='text-green-400'/>
                    <AnimatedStat end={50} suffix='+' label = 'Kota yang dilayani' color='text-emerald-400'/>
                    <AnimatedStat end={1000000} suffix='+' label = 'Makanan terkirim' color='text-teal-400'/>
                </div>
            </div>
        </section>
    )
}

export default Stats