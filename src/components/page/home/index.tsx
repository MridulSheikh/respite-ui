import BeVolentiarSection from "./BeVolentiarSection";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import OurArcticleSection from "./OurArcticleSection";
import SupplieItemSection from "./SupplieItemSection";
import TopDonatorSection from "./TopDonatorSection";
import WhatWeDoSection from "./WhatWeDoSection";

const Home = () => {
  return (
    <div className="bg-[#f4f5f6] dark:bg-black">
      <HeroSection />
      <SupplieItemSection />
      <TopDonatorSection />
      <GallerySection />
      <WhatWeDoSection />
      <BeVolentiarSection />
      <OurArcticleSection />
    </div>
  );
};

export default Home;
