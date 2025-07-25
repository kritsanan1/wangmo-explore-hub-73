import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import SectionHeader from "./SectionHeader";

const HistorySection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-50/80 via-green-50/60 to-red-50/40 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800')",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title="Discover the Story of Wang Sam Mo"
          titleThai="#วังสามหมอ"
          subtitle="Uncover the rich heritage and cultural traditions of our beautiful district"
          linkTo="/history"
          linkText="Read Full History"
          className="text-center mb-12"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-6">
            {/* Story Introduction */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Wang Sam Mo, a serene district in Udon Thani, is nestled amidst the Phu Phan Mountains and lush greenery. 
                Established as a district in 1972, its name reflects the unity of three villages. Known for its natural beauty, 
                including Wang Yai Park and Tham Sumontana Cave, Wang Sam Mo has a rich Issan cultural heritage.
              </p>
              
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Local traditions, such as the Phasuk Temple festivals and river rafting, draw visitors seeking authentic experiences. 
                The community thrives on agriculture and artisanal crafts, producing unique pickled vegetables and handwoven textiles. 
                Wang Sam Mo's warm hospitality and tranquil landscapes make it a hidden gem in Northeast Thailand. #ทัวร์เดอวัง
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid sm:grid-cols-2 gap-4 my-8">
              <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg border border-amber-200">
                <Clock className="h-6 w-6 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Established</p>
                  <p className="text-sm text-gray-600">1972</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg border border-green-200">
                <MapPin className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Location</p>
                  <p className="text-sm text-gray-600">Udon Thani Province</p>
                </div>
              </div>
            </div>

            {/* Social Hashtags */}
            <div className="flex flex-wrap gap-2 my-6">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                #ที่นี่วังสามหมอ
              </span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                #ทัวร์เดอวัง
              </span>
              <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                #tourderwang
              </span>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                #วังสามหมอ
              </span>
            </div>

            {/* Call to Action */}
            <div className="pt-4">
              <Link to="/history">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-600 to-green-600 hover:from-amber-700 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Read More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Column */}
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop" 
                alt="Phasuk Temple in Wang Sam Mo with traditional Thai architecture"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold text-lg">Phasuk Temple</p>
                <p className="text-white/90 text-sm">Heart of Wang Sam Mo's spiritual heritage</p>
              </div>
            </div>
            
            {/* Additional small images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=200&fit=crop" 
                  alt="Wang Yai Park rafting activities"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <p className="text-white text-sm font-medium">Wang Yai Park</p>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1587334474613-c1226d65cd4e?w=300&h=200&fit=crop" 
                  alt="Traditional Issan handicrafts and local products"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <p className="text-white text-sm font-medium">Local Crafts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
