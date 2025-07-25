import { memo } from "react";
import heroImage from "@/assets/wang-yai-park-hero.jpg";
import OptimizedImage from "@/components/ui/optimized-image";
import { HeroCTAButtons } from "./hero/hero-cta-buttons";
import { HeroStats } from "./hero/hero-stats";
import { ScrollIndicator } from "./hero/scroll-indicator";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={heroImage}
          alt="Wang Yai Park - Beautiful natural landscape in Udon Thani"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          lazy={false}
          placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo="
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 backdrop-blur-[1px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto container-mobile text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4">
              Discover Wang Sam Mo
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-2">
                Nature, Culture & Adventure
              </span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-4">
              #ที่นี่วังสามหมอ #ทัวร์เดอวัง #tourderwang
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
              Experience rafting at Wang Yai Park, explore ancient temples, and taste authentic Issan cuisine.
              Your gateway to unforgettable moments in Udon Thani's cultural heart.
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <HeroCTAButtons />

          {/* Stats */}
          <HeroStats />
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
