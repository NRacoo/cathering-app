import Contact from '@/components/section/Contact';
import Features from '@/components/section/Features';
import Hero from '@/components/section/Hero';
import Stats from '@/components/section/Stats'
import Testimonial from '@/components/section/Testimonial';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero/>
      <Features/>
      <Stats/>
      <Testimonial/> 
      <Contact/>
    </div>
  );
}
