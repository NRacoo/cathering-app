import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { Users, Heart, Star } from 'lucide-react';

const About = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Tentang Kami</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">SEA Catering</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            SEA Catering adalah solusi katering sehat terdepan di Indonesia. Kami berkomitmen untuk menyediakan makanan lezat, bergizi, dan praktis untuk mendukung gaya hidup sehat Anda.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <SpotlightCard spotlightColor="rgba(137, 243, 54, 0.2)">
            <div className="flex flex-col items-center text-center">
              <Heart className="h-8 w-8 mb-2 text-emerald-600" />
              <h2 className="font-semibold text-xl mb-1">Misi Kami</h2>
              <p className="text-gray-600">Membantu masyarakat Indonesia hidup lebih sehat melalui makanan berkualitas dan pelayanan terbaik.</p>
            </div>
          </SpotlightCard>
          <SpotlightCard spotlightColor="rgba(137, 243, 54, 0.2)">
            <div className="flex flex-col items-center text-center">
              <Star className="h-8 w-8 mb-2 text-yellow-500" />
              <h2 className="font-semibold text-xl mb-1">Nilai Utama</h2>
              <p className="text-gray-600">Kualitas, inovasi, dan kepuasan pelanggan adalah prioritas utama kami dalam setiap layanan.</p>
            </div>
          </SpotlightCard>
          <SpotlightCard spotlightColor="rgba(137, 243, 54, 0.2)">
            <div className="flex flex-col items-center text-center">
              <Users className="h-8 w-8 mb-2 text-blue-500" />
              <h2 className="font-semibold text-xl mb-1">Tim Kami</h2>
              <p className="text-gray-600">SEA Catering didukung oleh tim profesional yang berpengalaman di bidang kuliner dan nutrisi.</p>
            </div>
          </SpotlightCard>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Kenapa Memilih SEA Catering?</CardTitle>
            <CardDescription>
              Kami percaya makanan sehat harus mudah diakses, lezat, dan terjangkau untuk semua orang.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Menu variatif dan dapat disesuaikan dengan kebutuhan diet Anda</li>
              <li>Pengiriman cepat dan aman ke seluruh Indonesia</li>
              <li>Informasi nutrisi lengkap di setiap hidangan</li>
              <li>Bahan-bahan segar dan berkualitas premium</li>
              <li>Layanan pelanggan yang responsif dan profesional</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About; 