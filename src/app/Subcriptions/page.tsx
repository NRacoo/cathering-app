'use client'

import React from 'react'
import { Sun, Moon,  Cloud, User, ArrowLeft, ArrowRight, CheckCircle, Utensils, Calendar } from 'lucide-react'
import { useState } from 'react'
import { toast } from '@/components/hooks/use-toast'
import { Stepper } from '@/components/ui/Stepper'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'

const plans = [
    {
      id: "diet",
      name: "Diet Plan",
      price: 30000,
      description: "Perfect for weight management",
      features: ["Low calorie meals", "High fiber content", "Portion controlled"],
    },
    {
      id: "protein",
      name: "Protein Plan",
      price: 40000,
      description: "High-protein for active lifestyle",
      features: ["35-45g protein per meal", "Muscle building support", "Post-workout recovery"],
    },
    {
      id: "royal",
      name: "Royal Plan",
      price: 60000,
      description: "Premium gourmet experience",
      features: ["Gourmet ingredients", "Chef-crafted recipes", "Premium presentation"],
    },
  ]
  
  const mealTypes = [
    { id: "breakfast", name: "Breakfast", icon: <Cloud/> },
    { id: "lunch", name: "Lunch", icon: <Sun/>},
    { id: "dinner", name: "Dinner", icon: <Moon/> },
  ]
  
  const deliveryDays = [
    { id: "monday", name: "Monday", short: "Mon" },
    { id: "tuesday", name: "Tuesday", short: "Tue" },
    { id: "wednesday", name: "Wednesday", short: "Wed" },
    { id: "thursday", name: "Thursday", short: "Thu" },
    { id: "friday", name: "Friday", short: "Fri" },
    { id: "saturday", name: "Saturday", short: "Sat" },
    { id: "sunday", name: "Sunday", short: "Sun" },
  ]
  
  const steps = [
    { title: "Personal Info", description: "Your details" },
    { title: "Choose Plan", description: "Select meal plan" },
    { title: "Customize", description: "Meals & delivery" },
    { title: "Review", description: "Confirm order" },
  ]
  
  
  
  export default function SubcriptionsPage(){
    type MealType = "breakfast" | "lunch" | "dinner"
    type DayId =
        | "monday"
        | "tuesday"
        | "wednesday"
        | "thursday"
        | "friday"
        | "saturday"
        | "sunday"

     const [currentStep, setCurrentStep] = useState(1)
     const [formData, setFormData] = useState<{
        name: string,
        phone: string,
        plan: string,
        mealTypes: MealType[],
        deliveryDays:DayId[],
        allergies: string,
     }>({
        name: '',
        phone:'',
        plan:'',
        mealTypes: [],
        deliveryDays : [],
        allergies:'',
     })
    
    const [isSubmitted, setIsSubmitted] = useState(false)

    const calculatePrice = () =>{
        if(!formData.plan || formData.mealTypes.length === 0|| formData.deliveryDays.length === 0){
           return 0
        }

        const selectedPlan = plans.find((p) => p.id === formData.plan)
        if(!selectedPlan) return 0

        const price = selectedPlan.price * formData.mealTypes.length * formData.deliveryDays.length * 4.3
        return price
    }

    const handleMealTypeChange = (mealType : MealType , Cheked : boolean) => {
        setFormData((prev) => ({
            ...prev,
            mealTypes : Cheked ? [...prev.mealTypes, mealType] : prev.mealTypes.filter((id) =>
                id !== mealType
            )
        }))
    }

    const handleDeliveryDayChange = (day : DayId, cheked : boolean) => {
        setFormData((prev) =>({
            ...prev,
            deliveryDays : cheked ? [...prev.deliveryDays, day] : prev.deliveryDays.filter((id) => id !== day)
        }))
    }

    const validateStep = (step : number) => {
        switch (step) {
          case 1:
            return formData.name.trim() && formData.phone.trim()
          case 2:
            return formData.plan
          case 3:
            return formData.mealTypes.length > 0 && formData.deliveryDays.length > 0
          case 4:
            return true
          default:
            return false
        }
      }

      const nextStep = () => {
        if (validateStep(currentStep)) {
          setCurrentStep((prev) => Math.min(prev + 1, steps.length))
        } else {
            toast({
            title: "Please complete all required fields",
            description: "Fill in the required information before proceeding",
            variant: "destructive",
          })
        }
      }
    
      const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))
      }

      const handleSubmit = async () => {
        setIsSubmitted(true)
    
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000))
    
          toast({
            title: "Subscription Created!",
            description: `Your subscription has been created successfully. Total: Rp${calculatePrice().toLocaleString("id-ID")}`,
          })
    
          // Reset form
          setFormData({
            name: "",
            phone: "",
            plan: "",
            mealTypes: [],
            deliveryDays: [],
            allergies: "",
          })
          setCurrentStep(1)
        } catch {
          toast({
            title: "Error",
            description: "Failed to create subscription. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsSubmitted(false)
        }
      }
    
    const renderStep = () =>{
        switch(currentStep){
            case 1:
                return(
                    <div className = 'space-y-6'>
                        <div className = 'gap-2 text-center'>
                            <User className = 'w-16 h-16 text-emerald-500 mx-auto mb-2' />
                            <h3 className = 'text-2xl font-bold text-primary'>Informasi Pribadi</h3>
                            <p className = 'text-gray-600'>Mari Mulai Langkah Pertama!</p>
                        </div>

                        <div className = 'space-y-4'>
                            <Label htmlFor='name' className = 'font-medium'>Nama Lengkap</Label>
                            <Input id='name' placeholder='Masukan Nama Lengkap Anda' type='text'value={formData.name} 
                            onChange ={(e : React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({...prev, name : e.target.value}))} required/>
                        </div>
                        <div className = 'space-y-4'>
                            <Label htmlFor='tel' className = 'font-medium'>Nomor Telepon</Label>
                            <Input id='phone' type ='tel'placeholder='Masukan Nomor Telepon anda' value={formData.phone} 
                            onChange ={(e :  React.ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({...prev, phone : e.target.value}))} required/>
                        </div>
                        <p className = 'text-sm text-gray-600'>Kami akan menggunakan data diatas untuk menghubungi tentang pembaruan order dan konfirmasi pembayaran</p>
                    </div>
                )
            case 2:
                return(
                    <div className = 'space-y-6'>
                        <div className = 'text-center mb-6'>
                            <Utensils className = 'w-16 h-16 text-emerald-500 mx-auto mb-4'/>
                            <h3 className='text-2xl font-bold text-primary'>Pilih Menu</h3>
                            <p className = 'text-gray-600'>Pilih menu yang sesuai dengan kebutuhan anda</p>
                        </div>

                        <RadioGroup value={formData.plan} 
                        onValueChange={(value) => setFormData ((prev) => ({...prev, plan : value}))} 
                        className = 'space-y-4'> 
                        {plans.map((plan) => (
                            <div key={plan.id} className = {`relative rounded-lg border-2 p-6 
                            cursor-pointer transtion-all duration-300 ${formData.plan === plan.id ? 'border-emerald-500 bg-emerald-50' :'border-gray-200 hover:border-emerald-500'}`}>
                                <RadioGroupItem value={plan.id} id = {plan.id} className ='absolute top-4 right-4'/>
                                    <Label htmlFor = {plan.id} className = 'cursor-pointer'>
                                        <div className = 'grid grid-cols-2 md:flex md:justify-between items-start mb-3 '>
                                            <div>
                                                <h4 className = 'text-xl font-semibold text-primary'>{plan.name}</h4>
                                                <p className = 'mt-1 '>{plan.description}</p>
                                            </div>
                                            <div className ='text-right '>
                                                <div className = 'text-xl font-semibold text-emerald-500'> Rp. {plan.price.toLocaleString('id-ID')}</div>
                                                <div className='text-sm text-gray-600'>per menu</div>
                                            </div>
                                        </div>
                                            <div className = 'space-y-1'>
                                                {plan.features.map((feature, index) => (
                                                    <div key={index} className = 'flex items-center gap-2 text-sm'>
                                                        <CheckCircle className ='h-5 w-5 text-emerald-500'/>
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>
                                    </Label>
                            </div>
                        ))}
                        </RadioGroup>
                    </div>
                )
            case 3:
                return(
                    <div className = 'space-y-8'>
                        <div className = 'text-center mb-6'>
                            <Calendar className = 'w-16 h-16 text-emerald-500 mx-auto mb-4'/>
                            <h3 className = 'text-2xl text-primary font-bold'>Kustomisasi Menu Anda</h3>
                            <p className='text-gray-600'>Pilih menu anda dan jadwal pengirimannya</p>
                        </div>

                        <div>
                            <h4 className = 'text-lg font-semibold mb-4'>Tipe Menu</h4>
                            <p className = 'text-sm text-gray-600 mb-4'>Pilih salah satu dari tipe menu yang tersedia</p>
                            <div className = 'grid grid-cols-3 gap-4'>
                                {mealTypes.map((mealType) => (
                                    <div
                                        key={mealType.id}
                                        className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                                                (formData.mealTypes as MealType[]).includes(mealType.id as MealType)
                                                ? "border-green-600 bg-green-50"
                                                : "border-gray-200 hover:border-green-300"
                                        }`}
                                    >
                                        <Checkbox
                                            id={mealType.id}
                                            checked={formData.mealTypes.includes(mealType.id as MealType)}
                                            onCheckedChange={(checked: boolean) => handleMealTypeChange(mealType.id as MealType, checked)}
                                            className='absolute top-4 right-4'
                                        />
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">{mealType.icon}</div>
                                            <div className="font-medium">{mealType.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className = 'text-lg font-semibold mb-4'>Jadwal Pengiriman</h4>
                            <p className = 'text-sm text-gray-600 mb-4'>Pilih jadwal pengiriman yang sesuai dengan kebutuhan anda</p>
                            <div className = 'grid grid-cols-4 md:grid-cols-7 gap-4'>
                                {deliveryDays.map((day) => (
                                    <div
                                        key={day.id}
                                        className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                                            (formData.deliveryDays as DayId[]).includes(day.id as DayId)
                                                ? "border-green-600 bg-green-50"
                                                : "border-gray-200 hover:border-green-300"
                                        }`}
                                    >
                                        <Checkbox
                                            id={day.id}
                                            checked={formData.deliveryDays.includes(day.id as DayId)}
                                            onCheckedChange={(checked: boolean) => handleDeliveryDayChange(day.id as DayId, checked)}
                                            className='absolute top-4 right-4 -translate-y-2 translate-x-2 '
                                        />
                                        <div className='text-center'>
                                            <div className= 'text-sm font-medium'>{day.short}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className = 'text-lg font-semibold mb-4'>Alergi</h4>
                            <p className = 'text-sm text-gray-600 mb-4'>Jika anda memiliki alergi terhadap beberapa bahan makanan, silahkan isi di bawah ini</p>
                            <Textarea
                                placeholder = 'Masukan alergi anda'
                                value = {formData.allergies}
                                onChange = {(e : React.ChangeEvent<HTMLTextAreaElement>) => setFormData((prev) => ({...prev, allergies : e.target.value}))}
                            />
                        </div>
                    </div>
                )
                case 4:
                    const selectedPlan = plans.find((p) => p.id === formData.plan)
                    const totalPrice = calculatePrice()
            
                    return (
                      <div className="space-y-6">
                        <div className="text-center mb-6">
                          <CreditCard className="h-12 w-12 text-green-600 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-gray-900">Review Your Order</h3>
                          <p className="text-gray-600">Please review your subscription details</p>
                        </div>
            
                        <div className="space-y-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Name:</span>
                                <span className="font-medium">{formData.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-medium">{formData.phone}</span>
                              </div>
                            </CardContent>
                          </Card>
            
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Subscription Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Selected Plan:</span>
                                <span className="font-medium">{selectedPlan?.name}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Price per meal:</span>
                                <span>Rp{selectedPlan?.price.toLocaleString("id-ID")}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Meal types:</span>
                                <span>
                                  {formData.mealTypes.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(", ")}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Delivery days:</span>
                                <span>{formData.deliveryDays.length} days/week</span>
                              </div>
                              {formData.allergies && (
                                <div className="flex justify-between items-start">
                                  <span className="text-gray-600">Allergies:</span>
                                  <span className="text-right max-w-xs">{formData.allergies}</span>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                          <Card className="border-green-200 bg-green-50">
                            <CardContent className="p-6">
                              <div className="space-y-2">
                                <div className="text-sm text-gray-600">Formula: Plan Price × Meal Types × Delivery Days × 4.3</div>
                                <div className="text-sm text-gray-600">
                                  Rp{selectedPlan?.price.toLocaleString("id-ID")} × {formData.mealTypes.length} ×{" "}
                                  {formData.deliveryDays.length} × 4.3
                                </div>
                                <div className="border-t pt-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xl font-semibold">Monthly Total:</span>
                                    <span className="text-3xl font-bold text-green-600">
                                      Rp{totalPrice.toLocaleString("id-ID")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )
            
                  default:
                return null
        }
    }


    return(
        <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50'>
            <div className = 'container mx-auto px-4'>
                <div className = 'max-w-4xl mx-auto py-20'>
                    <div className='text-center mb-12'>
                        <h1 className = 'text-4xl font-bold text-primary mb-4 '>
                            Subscribes to SEA Catering
                        </h1>
                        <p className = 'text-lg text-gray-600'>Ikuti langkah-langkah di bawah ini untuk menyesuaikan paket makanan ideal Anda.</p>
                    </div>

                    <div className = 'mb-12'>
                        <Stepper currentStep = {currentStep} steps = {steps}/>
                    </div>
                    <Card className = 'mb-8'>
                        <CardContent className = 'p-8'>{renderStep()}</CardContent>
                    </Card>

                    <div className = 'flex justify-between'>
                        <Button
                        variant = 'outline'
                        onClick = {prevStep}
                        disabled = {currentStep === 1}
                        className = 'bg-white text-primary hover:bg-gray-100'
                        >
                            <ArrowLeft className = 'w-4 h-4'/>
                            Previous
                        </Button>

                        {currentStep < steps.length ? (
                            <Button onClick = {nextStep} disabled = {!validateStep(currentStep)} className ='flex items-center gap-2 bg-emerald-700'>
                                Next
                                <ArrowRight className = 'w-4 h-4'/>
                            </Button>
                        ) : (
                            <Button onClick = {handleSubmit} disabled = {isSubmitted} className = 'flex items-center gap-2'>
                                {isSubmitted ? 'Submitting...' : 'Submit'}
                                <CheckCircle className = 'w-4 h-4'/>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}