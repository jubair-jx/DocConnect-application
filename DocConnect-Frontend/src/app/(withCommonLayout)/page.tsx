import { HeroSection } from "@/components/ui/HomePage/HeroSection";
import { Speacialist } from "@/components/ui/HomePage/Speacialist";
import { TopRatedDoctor } from "@/components/ui/HomePage/TopRatedDoctor";
import WhyUs from "@/components/ui/HomePage/WhyUs";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Speacialist />
      <TopRatedDoctor />
      <WhyUs />
    </>
  );
}
