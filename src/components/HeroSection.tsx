import heroImage from "@/assets/wang-yai-park-hero.jpg";
import { HeroCTAButtons } from "./hero/hero-cta-buttons";
import { HeroStats } from "./hero/hero-stats";
import { ScrollIndicator } from "./hero/scroll-indicator";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Wang Yai Park"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Discover Wang Sam Mo
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Nature, Culture & Adventure
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-light">
              #ที่นี่วังสามหมอ #ทัวร์เดอวัง #tourderwang
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
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
