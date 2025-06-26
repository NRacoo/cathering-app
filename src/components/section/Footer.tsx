import Link from "next/link"

export default function Footer(){

    const navigation = [{
        name: 'Home' , item:'/'
    },
    {
        name:'Menu', item:'/Meals'
    },
    {
        name:'Subscriptions', item:'/Subcriptions'
    },
    ]

    const support = [{
        name: 'Contact' , item:'/Contact'
    },
    {
        name:'About Us', item:'/About'
    },
    {
        name:'Help Center', item:'/Contact'
    },
    ]



    return(
        <footer className="bg-gradient-to-br from-green-50 to-blue-50 border-t border-secondary-200 transition-color duration-300">
            <div className="container mx-auto px-4 pt-16 pb-8 ">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="font-bold text-emerald-700 text-xl">SEA-Catering</span>
                        </div>
                        <p className="text-gray-400">Healthy Meals, Anytime, Anywhere</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            {navigation.map((item, index) =>(
                                <div key={index}>
                                    <Link href={item.item} className="text-gray-400 hover:text-emerald-700">{item.name}</Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4"> Support</h3>
                        <div className="space-y-2">
                        {support.map((item, index) => (
                            <div 
                            key={index} >
                                <Link href={item.item} className="text-gray-400 hover:text-emerald-700" >{item.name}</Link>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <div className="space-y-2 text-gray-400 ">
                            <div>Manager: Brian</div>
                            <div>Phone: 08123456789</div>
                            <div>Email: hello@seacatering.com</div>
                        </div>
                    </div>
                </div>
            </div>
                    <div className="text-center mt-8 pt-8 border-t border-gray-400 text-gray-400 ">
                        <p>&copy; 2025 SEA Catering. All rights reserved.</p>
                    </div>
        </footer>
    )
}