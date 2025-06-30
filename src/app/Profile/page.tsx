'use client'
import { useSession } from "next-auth/react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, X, Edit, Camera, Save, Building, Globe, Bell, Calendar } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
    const { data: session, status }  = useSession();
    const router = useRouter();

    // Profile data state
    const [profileData, setProfileData] = useState({
        fullName: session?.user?.fullname,
        email: session?.user?.email,
        phone: '+62 812-3456-7890',
        address: 'Jl. Sudirman No. 123, Jakarta Pusat',
        company: 'SEA Catering',
        position: 'Member',
        website: 'www.seacatering.com',
        bio: 'Admin dashboard untuk mengelola bisnis catering SEA Catering dengan fokus pada pelayanan pelanggan yang berkualitas.',
        joinDate: '2024-01-15'
    });

    // Settings state
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: true,
        twoFactorAuth: false,
        darkMode: false,
        language: 'id'
    });



    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Handle profile data changes
    const handleProfileChange = (field: string, value: string) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle settings changes
    const handleSettingChange = (field: string, value: boolean | string) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

 

    // Save profile changes
    const handleSaveProfile = async () => {

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsEditing(false);
        setIsLoading(false);
    };

    useEffect(() =>{
        if (status === 'unauthenticated' && !session) {
            router.push('/Auth/Login');
        }
        
    
    }, [router, status, session])

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat profil...</p>
                </div>
            </div>
        );
    }

    

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil Pengguna</h1>
                    <p className="text-gray-600">Kelola informasi profil dan pengaturan akun Anda</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="h-5 w-5 text-emerald-600" />
                                            Informasi Profil
                                        </CardTitle>
                                        <CardDescription>
                                            Perbarui informasi profil Anda
                                        </CardDescription>
                                    </div>
                                    <Button
                                        variant={isEditing ? "outline" : "default"}
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="flex items-center gap-2"
                                    >
                                        {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                                        {isEditing ? 'Batal' : 'Edit'}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Profile Picture */}
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <User className="h-10 w-10 text-emerald-600" />
                                        </div>
                                        {isEditing && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0"
                                            >
                                                <Camera className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg"> {session?.user?.fullname}</h3>
                                        <p className="text-sm text-gray-600">{session?.user?.role}</p>
                                        <Badge variant="outline" className="mt-1">
                                            {profileData.company}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Nama Lengkap</Label>
                                        <Input
                                            id="fullName"
                                            value={profileData.fullName}
                                            onChange={(e) => handleProfileChange('fullName', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => handleProfileChange('email', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Masukkan email"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Nomor Telepon</Label>
                                        <Input
                                            id="phone"
                                            value={profileData.phone}
                                            onChange={(e) => handleProfileChange('phone', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Masukkan nomor telepon"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="company">Perusahaan</Label>
                                        <Input
                                            id="company"
                                            value={profileData.company}
                                            onChange={(e) => handleProfileChange('company', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Masukkan nama perusahaan"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="position">Jabatan</Label>
                                        <Input
                                            id="position"
                                            value={profileData.position}
                                            onChange={(e) => handleProfileChange('position', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Masukkan jabatan"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="website">Website</Label>
                                        <Input
                                            id="website"
                                            value={profileData.website}
                                            onChange={(e) => handleProfileChange('website', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Masukkan website"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="address">Alamat</Label>
                                        <Input
                                            id="address"
                                            value={profileData.address}
                                            onChange={(e) => handleProfileChange('address', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Masukkan alamat lengkap"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            value={profileData.bio}
                                            onChange={(e) => handleProfileChange('bio', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="Ceritakan tentang diri Anda"
                                            rows={3}
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex justify-end gap-2 pt-4 border-t">
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            onClick={handleSaveProfile}
                                            disabled={isLoading}
                                            className="flex items-center gap-2"
                                        >
                                            {isLoading ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            ) : (
                                                <Save className="h-4 w-4" />
                                            )}
                                            Simpan Perubahan
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                       
                    </div>

                    {/* Settings Sidebar */}
                    <div className="space-y-6">
                        {/* Account Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-emerald-600" />
                                    Informasi Akun
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Bergabung Sejak</p>
                                        <p className="text-sm text-gray-600">{profileData.joinDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Building className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Perusahaan</p>
                                        <p className="text-sm text-gray-600">{profileData.company}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Website</p>
                                        <p className="text-sm text-gray-600">{profileData.website}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notification Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-emerald-600" />
                                    Pengaturan Notifikasi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="emailNotifications"
                                        checked={settings.emailNotifications}
                                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked as boolean)}
                                    />
                                    <Label htmlFor="emailNotifications" className="text-sm">
                                        Notifikasi Email
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="smsNotifications"
                                        checked={settings.smsNotifications}
                                        onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked as boolean)}
                                    />
                                    <Label htmlFor="smsNotifications" className="text-sm">
                                        Notifikasi SMS
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="marketingEmails"
                                        checked={settings.marketingEmails}
                                        onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked as boolean)}
                                    />
                                    <Label htmlFor="marketingEmails" className="text-sm">
                                        Email Marketing
                                    </Label>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
} 
