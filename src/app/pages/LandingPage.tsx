import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { FeaturesSection } from '../components/FeaturesSection';
import { ProductsSection } from '../components/ProductsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturesSection />
      <ProductsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
