    "use client"

    import { useState } from "react"
    import { Card, CardContent } from "@/components/ui/card"
    import { Badge } from "@/components/ui/badge"
    import { Star, User } from "lucide-react"

    const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        message:
        "Sebagai pekerja kantoran yang sibuk, katering ini jadi solusi terbaik! Makanannya enak, sehat, dan bisa disesuaikan dengan jadwal saya. Nggak pernah bosen!",
        location: "Jakarta",
        plan: "Diet Plan",
    },
    {
        id: 2,
        name: "Michael Chen",
        rating: 5,
        message:
        "Aku suka banget karena menunya bisa dikustom sesuai kebutuhan diet. Rasanya tetap lezat dan porsi pas banget. Love it!",
        location: "Surabaya",
        plan: "Protein Plan",
    },
    {
        id: 3,
        name: "Priya Sharma",
        rating: 4,
        message:
        "Biasanya makanan sehat itu hambar, tapi di sini beda. Rasanya mantap, dan aku bisa pilih menu tanpa ribet. Sangat fleksibel untuk gaya hidupku yang aktif",
        location: "Bandung",
        plan: "Royal Plan",
    },
    {
        id: 4,
        name: "David Wilson",
        rating: 5,
        message:
        "Pernah coba banyak katering sehat, tapi baru ini yang rasanya benar-benar enak! Plus, jadwal pengirimannya fleksibel banget. Highly recommended!",
        location: "Medan",
        plan: "Protein Plan",
    },
    {
        id: 5,
        name: "Lisa Tanaka",
        rating: 5,
        message:
        "Sebagai ibu rumah tangga, katering ini sangat membantu. Anakku suka, suami juga doyan. Nutrisinya jelas dan rasanya nggak pernah mengecewakan.",
        location: "Semarang",
        plan: "Diet Plan",
    },
    {
        id: 6,
        name: "Ahmad Rahman",
        rating: 4,
        message:
        "Menunya bervariasi, sehat, dan pastinya halal. Cocok banget buat saya yang sedang jaga pola makan. Rasanya pun seperti masakan rumah!",
        location: "Yogyakarta",
        plan: "Royal Plan",
    },
    {
        id: 7,
        name: "Emma Rodriguez",
        rating: 5,
        message:
        "Saya seorang atlet amatir, jadi asupan gizi penting banget. Katering ini nggak cuma enak, tapi juga penuh nutrisi dan bisa disesuaikan sama target kaloriku.",
        location: "Bali",
        plan: "Protein Plan",
    },
    {
        id: 8,
        name: "Kevin Lim",
        rating: 5,
        message:
        "Saya sering kerja remote dari berbagai tempat. Untung ada katering ini, makanannya bisa disesuaikan dengan preferensi dan waktu saya. Fleksibel dan tasty!",
        location: "Jakarta",
        plan: "Diet Plan",
    },
    ]

    const getPlanColor = (plan: string) => {
    switch (plan) {
        case "Diet Plan":
        return "bg-green-100 text-green-800"
        case "Protein Plan":
        return "bg-blue-100 text-blue-800"
        case "Royal Plan":
        return "bg-purple-100 text-purple-800"
        default:
        return "bg-gray-100 text-gray-800"
    }
    }

    export function InfiniteTestimonialsCarousel() {
    const [isPaused, setIsPaused] = useState(false)

    // Duplicate testimonials for seamless infinite scroll
    const duplicatedTestimonials = [...testimonials, ...testimonials]

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))
    }

    return (
        <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ulasan dari Pelanggan Kami</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Yuk, bergabung dengan mereka yang sudah lebih sehat dan bahagia bersama SEA Catering!
            </p>
            </div>

            {/* Infinite Carousel */}
            <div className="relative">
            <div
                className={`flex gap-6 ${isPaused ? "" : "animate-infinite-scroll"}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                style={{
                width: `${duplicatedTestimonials.length * 400}px`,
                }}
            >
                {duplicatedTestimonials.map((testimonial, index) => (
                <Card
                    key={`${testimonial.id}-${index}`}
                    className="flex-shrink-0 w-96 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                    <CardContent className="p-6">
                    {/* Header with rating and plan */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">{renderStars(testimonial.rating)}</div>
                        <Badge className={getPlanColor(testimonial.plan)} variant="secondary">
                        {testimonial.plan}
                        </Badge>
                    </div>

                    {/* Testimonial message */}
                    <blockquote className="text-gray-700 mb-6 leading-relaxed line-clamp-4">
                        &quot;{testimonial.message}&quot;
                    </blockquote>

                    {/* Customer info */}
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                        <User className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.location}</div>
                        </div>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>

            {/* Gradient overlays for smooth edges */}
          
            </div>

            {/* Pause indicator */}
            <div className="text-center mt-8">
            <p className="text-sm text-gray-500">Hover over testimonials to pause • Scroll automatically resumes</p>
            </div>
        </div>

        <style jsx>{`
            @keyframes infinite-scroll {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-${testimonials.length * 400}px);
            }
            }

            .animate-infinite-scroll {
            animation: infinite-scroll 40s linear infinite;
            }

            .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            }
        `}</style>
        </section>
    )
    }
