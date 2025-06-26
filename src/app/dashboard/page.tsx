'use client'
import { useSession } from "next-auth/react"
import { useState } from "react";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format,subDays, startOfMonth, endOfMonth } from "date-fns";
import { Users, DollarSign, TrendingUp, RefreshCw, CalendarIcon, BarChart3, PieChart, Activity, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DashboardData, MenuFormData, DateRange, QuickSelectOption } from "@/types/admin"
import { DateRange as CalendarDateRange } from "react-day-picker";

const generateChartData = (startDate : Date, endDate : Date) : DashboardData => {
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    return {
        newSubscription : Math.floor(Math.random() * daysDiff * 5 ) + daysDiff,
        monthlyRecurringRevenue : Math.floor(Math.random() * 50000000) + 100000000,
        reactivations : Math.floor(Math.random() * daysDiff * 5 ) + Math.floor(daysDiff /2),
        activeSubscriptions : Math.floor(Math.random() * 1000) + 2500,
        totalUsers : Math.floor(Math.random() * 2000) + 5000,
        averageOrderValue : Math.floor(Math.random() * 200000) + 80000,
        churnRate : Math.floor(Math.random() * 5 + 2).toFixed(1),
        conversionRate : Math.floor(Math.random() * 10 + 15).toFixed(1),

    }
}


export default function AdminPage(){

    const {data : session , status} = useSession();
    
    const [dateRange, setDateRange] = useState<DateRange>({
     from: startOfMonth((new Date())),
     to: endOfMonth((new Date())),
    })

    useEffect(()=> {
        if(typeof window !== undefined){
           setData(generateChartData(dateRange.from, dateRange.to))
        }
    }, [dateRange])

    const [menuForm, setMenuForm] = useState<MenuFormData>({
        id: '',
        name: '',
        price: '',
        image: '',
        description: '',
        features: '',
        calories: '',
        protein: '',
        carb:'',
        fat:'',
        popular: false
    })

    const handleUploadMenu = async (): Promise<void> => {
           const payload = {
            id: menuForm.id,
            name: menuForm.name,
            price: parseInt(menuForm.price),
            image: menuForm.image,
            description: menuForm.description,
            features: menuForm.features.split(',').map((f) => f.trim()),
            nutritionInfo: {
            calories: menuForm.calories,
            protein: menuForm.protein,
            carb: menuForm.carb,
            fat: menuForm.fat,
            },
            popular: menuForm.popular,}

        try{

            const response = await fetch('/api/uploadMenu',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
    
            const data = await response.json();
                
            if(response.ok) {
                alert("Menu berhasil diupload" + data.message)
                setMenuForm({
                    id: '',
                    name: '',
                    price: '',
                    image: '',
                    description: '',
                    features: '',
                    calories: '',
                    protein: '',
                    carb:'',
                    fat:'',
                    popular: false
                })
            }else{
                alert('Gagal mengupload menu')
            }
        }catch(error){
            console.error('error saat mengupload menu', error)
        }
    }
    
   const[quickSelect, setQuickSelect] =  useState<QuickSelectOption>('Bulan ini')
   const [data, setData] = useState<DashboardData | null>(null);

   const handlequickData = (value : QuickSelectOption) => {
    setQuickSelect(value)
    const today = new Date()

    switch(value){
        case 'Hari ini':
            setDateRange({from: today, to:today})
            break;
        case 'Kemarin':
            const yesterday = subDays(today, 1)
            setDateRange({from:  yesterday, to:yesterday})
            break;
        case '7 hari terakhir':
            const week = subDays(today, 7)
            setDateRange({from: week, to: today })
            break;
        case 'Bulan ini':
            const month = startOfMonth(today)
            const endOfmonth = endOfMonth(today)
            setDateRange({from: month, to: endOfmonth})
            break;
        case '30 hari terakhir':
            const lastmonth = subDays(today, 30)
            setDateRange ({from: lastmonth, to: today})
            break;
        case '60 hari terakhir':
            const lastmonth1 = new Date(today.getFullYear(), today.getMonth() - 1, 1)
            setDateRange({
                from: startOfMonth(lastmonth1),
                to: endOfMonth(lastmonth1)
            })
            break;

        
    }
   }

   const refreshdata = () => {
    setData(generateChartData(dateRange.from, dateRange.to))
   }

   const formatCurrency = (amount : number) : string =>{
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency:'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)   
   }

   const formatDateRange = () : string=>{
    if(dateRange.from && dateRange.to){
        if(dateRange.from.getTime() === dateRange.to.getTime()){
            return format(dateRange.from, 'PPP')
        }
        return `${format(dateRange.from, 'PPP')} - ${format(dateRange.to, 'PPP')}` 
    }
    return 'Pilih rentang waktu'
}

const handleCalendarSelect = (range: CalendarDateRange | undefined): void => {
    if (range?.from && range?.to) {
      setDateRange({ from: range.from, to: range.to });
      setQuickSelect('Custom');
    }
  };

return(
    <div className="min-h-screen md:py-20">
            <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-4 ">
                <div className = 'container mx-auto px-4'>
                  <div className = 'mb-8'>
                    <div className = 'flex flex-col gap-4 mb-2'>
                    
                        <div className = 'flex items-center justify-between mb-2 gap-2'>
                    
                            <div>
                            <h1 className = 'text-3xl font-bold text-primary'>Admin Dashboard</h1>
                            <p className = 'text-sm text-muted-foregrounde'>SEA Catering Business Dashboard</p>
                            </div>
                            <Button onClick ={refreshdata} variant = 'outline' className ='flex h-8 w-auto'>
                                <RefreshCw className = 'h-4 w-4 items-center'/>
                                <p className='text-sm hidden md:block'>Refresh Data</p>
                            </Button>
                        </div>
                            {status === 'authenticated' ? (
                                <>
                                <div className='md:hidden flex-row flex'>
                                    <div className= 'flex items-center gap-2'>
                                    <User className = 'text-emerald-500 w-8 h-8'/>
                                    <h2 className ='text-lg font-semibold'>{session?.user?.fullname}</h2>
                                    </div>
                                    <Button variant='outline' className='bg-transparant font-semibold text-gray-600 hover:text-emerald-500 ml-auto' onClick={() => signOut()}>Logout</Button>
                                </div>
                                </>
                            ) : (
                                <span>Memuat data...</span>
                            )
                            }
                        </div>
                    <div className = 'grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tambah Menu Baru</CardTitle>
                                    <CardDescription>Formulir unggah menu baru ke database</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Input placeholder="ID Menu" value={menuForm.id} onChange={(e) => setMenuForm({ ...menuForm, id: e.target.value })} />
                                    <Input placeholder="Nama Menu" value={menuForm.name} onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })} />
                                    <Input placeholder="Harga" type="number" value={menuForm.price} onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })} />
                                    <Input placeholder="URL Gambar" value={menuForm.image} onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })} />
                                    <Textarea placeholder="Deskripsi" value={menuForm.description} onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })} />
                                    <Textarea placeholder="Fitur (pisahkan dengan koma)" value={menuForm.features} onChange={(e) => setMenuForm({ ...menuForm, features: e.target.value })} />
                                    <Input placeholder="Kalori" value={menuForm.calories} onChange={(e) => setMenuForm({ ...menuForm, calories: e.target.value })} />
                                    <Input placeholder="Protein" value={menuForm.protein} onChange={(e) => setMenuForm({ ...menuForm, protein: e.target.value })} />
                                    <Input placeholder="Karbohidrat" value={menuForm.carb} onChange={(e) => setMenuForm({ ...menuForm, carb: e.target.value })} />
                                    <Input placeholder="Lemak" value={menuForm.fat} onChange={(e) => setMenuForm({ ...menuForm, fat: e.target.value })} />
                                    <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={menuForm.popular} onChange={(e) => setMenuForm({ ...menuForm, popular: e.target.checked })} />
                                    <span>Popular?</span>
                                    </label>
                                    <Button onClick={handleUploadMenu}>Upload Menu</Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Date Range Filter</CardTitle>
                                    <CardDescription>Pilih rentang waktu untuk melihat data</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className = 'flex flex-col md:flex-row gap-4'>
                                        <div className = 'flex-1 '>
                                        <Label className = 'mb-2'>Quick Select</Label>
                                        <Select value={quickSelect} onValueChange={handlequickData}>
                                            <SelectTrigger className = 'w-full'>
                                                <SelectValue placeholder = 'Pilih rentang waktu'/>
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value='Hari ini'>Hari ini</SelectItem>
                                                <SelectItem value='Kemarin'>Kemarin</SelectItem>
                                                <SelectItem value='7 hari terakhir'>7 Hari terakhir</SelectItem>
                                                <SelectItem value='30 hari terakhir'>30 Hari terakhir</SelectItem>
                                                <SelectItem value='Bulan ini'>Bulan ini</SelectItem>
                                                <SelectItem value='60 hari terakhir'>Bulan lalu</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        </div>
                                        <div className =' flex-1'>
                                        <Label className = 'mb-2'>Custom rentang waktu</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant = 'outline'  className = ' w-full justify-start text-left font-normal' >
                                                    <CalendarIcon className = 'h-4 w-4 mr-2'/>
                                                    {formatDateRange()}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className = 'w-auto p-0' align='start'>
                                                <Calendar mode ='range' selected ={dateRange} 
                                                onSelect = {handleCalendarSelect}
                                                numberOfMonths = {2}/>
                                            </PopoverContent>
                                        </Popover>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                    </div>

                  </div>

                  <div className = 'grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    <Card >
                        <CardContent className = 'p-8'>
                            <div className = 'flex items-center gap-3'>
                                <div className = 'bg-blue-100 p-3 rounded-lg'>
                                    <Users className = 'h-6 w-6 text-blue-600'/> 
                                </div>
                                <div>
                                {data ? (
                                    <div className = 'text-2xl font-bold text-gray-900'>
                                     {data ? data.newSubscription.toLocaleString() : 'Memuat data...'}
                                    </div>  
                                ): (
                                    <div className = 'text-2xl font-bold'>Memuat data...</div>
                                )}
                                <div className = 'text-sm text-gray-600'>
                                    New Subscriptions
                                </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className ='lg:col-span-2' >
                        <CardContent className = 'p-8'>
                            <div className = 'flex items-center gap-3'>
                                <div className = 'bg-emerald-100 p-3 rounded-lg'>
                                    <DollarSign className = 'h-6 w-6 text-emerald-600'/> 
                                </div>
                                <div>
                                    <div className = 'text-2xl font-bold text-gray-900'>
                                     {data ? formatCurrency(data.monthlyRecurringRevenue) : 'Memuat data...'}
                                    </div>
                                    <div className = 'text-sm text-gray-600'>
                                        Pendapatan Bulanan
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card >
                        <CardContent className = 'p-8'>
                            <div className = 'flex items-center gap-3'>
                                <div className = 'bg-purple-100 p-3 rounded-lg'>
                                    <RefreshCw className = 'h-6 w-6 text-purple-600'/> 
                                </div>
                                <div>
                                    <div className = 'text-2xl font-bold text-gray-900'>
                                     {data ? data.reactivations.toLocaleString() : 'Memuat data...'}
                                    </div>
                                    <div className = 'text-sm text-gray-600'>
                                        Reaktivitas
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card >
                        <CardContent className = 'p-8'>
                            <div className = 'flex items-center gap-3'>
                                <div className = 'bg-orange-100 p-3 rounded-lg'>
                                    <TrendingUp className = 'h-6 w-6 text-orange-600'/> 
                                </div>
                                <div>
                                    <div className = 'text-2xl font-bold text-gray-900'>
                                        {data ? data.activeSubscriptions.toLocaleString() : 'Memuat data...'}
                                    </div>
                                    <div className = 'text-sm text-gray-600'>
                                        Subscriptions Aktif
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card >
                        <CardContent className = 'p-8'>
                            <div className = 'flex items-center gap-3'>
                                <div className = 'bg-red-100 p-3 rounded-lg'>
                                    <Activity className = 'h-6 w-6 text-red-600'/> 
                                </div>
                                <div>
                                    <div className = 'text-2xl font-bold text-gray-900'>
                                        {data ? data.totalUsers.toLocaleString() : 'Memuat data...'}
                                    </div>
                                    <div className = 'text-sm text-gray-600'>
                                        Total Pengguna
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card >
                        <CardContent className = 'p-8'>
                            <div className = 'flex items-center gap-3'>
                                <div className = 'bg-pink-100 p-3 rounded-lg'>
                                    <BarChart3 className = 'h-6 w-6 text-pink-600'/> 
                                </div>
                                <div>
                                    <div className = 'text-2xl font-bold text-gray-900'>
                                        { data ? formatCurrency(data.averageOrderValue) : 'Memuat data...'}
                                    </div>
                                    <div className = 'text-sm text-gray-600'>
                                        Rata-rata Penghasilan per-menu
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card >
                        <CardContent className = 'p-8'>
                            <div className = 'flex items-center gap-3'>
                                <div className = 'bg-teal-100 p-3 rounded-lg'>
                                    <PieChart className = 'h-6 w-6 text-teal-600'/> 
                                </div>
                                <div>
                                    <div className = 'text-2xl font-bold text-gray-900'>
                                        { data ? data.churnRate.toLocaleString() : 'Memuat data...'}
                                    </div>
                                    <div className = 'text-sm text-gray-600'>
                                        Churn Rate
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card> 
                  </div>
                </div>
            </section>
        </div>
    )
}