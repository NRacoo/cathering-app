    "use client"

    import { useState, useEffect, useRef } from "react"

    interface UseCounterAnimationOptions {
    end: number
    start?: number
    duration?: number
    decimals?: number
    suffix?: string
    prefix?: string
    }

    export function useCounterAnimation({
    end,
    start = 0,
    duration = 2000,
    decimals = 0,
    suffix = "",
    prefix = "",
    }: UseCounterAnimationOptions) {
    const [count, setCount] = useState(start)
    const [isVisible, setIsVisible] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    const countRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true)
            setHasAnimated(true)
            }
        },
        { threshold: 0.1 },
        )

        if (countRef.current) {
        observer.observe(countRef.current)
        }

        return () => observer.disconnect()
    }, [hasAnimated])

    useEffect(() => {
        if (!isVisible) return

        let startTime: number
        const startValue = start
        const endValue = end
        const difference = endValue - startValue

        const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = startValue + difference * easeOutQuart

        setCount(currentCount)

        if (progress < 1) {
            requestAnimationFrame(animate)
        }
        }

        requestAnimationFrame(animate)
    }, [isVisible, start, end, duration])

    const formattedCount = `${prefix}${count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`

    return { count: formattedCount, ref: countRef }
    }
