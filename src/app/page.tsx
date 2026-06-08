import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import FeaturedBanner from '@/components/home/FeaturedBanner';
import BestSellers from '@/components/home/BestSellers';
import BrandStatement from '@/components/home/BrandStatement';
import Collections from '@/components/home/Collections';
import AsSeenOn from '@/components/home/AsSeenOn';
import EditorialStory from '@/components/home/EditorialStory';
import Testimonials from '@/components/home/Testimonials';
import InstagramGrid from '@/components/home/InstagramGrid';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <FeaturedBanner />
      <BestSellers />
      <BrandStatement />
      <Collections />
      <AsSeenOn />
      <EditorialStory />
      <Testimonials />
      <InstagramGrid />
      <Newsletter />
    </>
  );
}
