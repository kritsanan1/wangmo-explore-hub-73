import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, MapPin, Users, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHeading from "@/components/seo/SEOHeading";

const History = () => {
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Discover the rich history of Wang Sam Mo #ที่นี่วังสามหมอ #ทัวร์เดอวัง");
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  };

  const shareOnInstagram = () => {
    // Copy to clipboard for Instagram sharing
    const text = "Discover the rich history of Wang Sam Mo #ที่นี่วังสามหมอ #ทัวร์เดอวัง\n\n" + window.location.href;
    navigator.clipboard.writeText(text);
    alert("Link copied to clipboard! You can now paste it in your Instagram post.");
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="relative py-16 bg-gradient-to-br from-amber-50 via-green-50 to-red-50 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800')",
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Homepage
              </Button>
            </Link>
          </div>

          {/* Page Title */}
          <div className="text-center mb-12">
            <SEOHeading 
              level={1} 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              keywords={["Wang Sam Mo", "history", "วังสามหมอ", "Udon Thani"]}
            >
              The Complete History of Wang Sam Mo
            </SEOHeading>
            <p className="text-xl text-gray-600 mb-6">#วังสามหมอ - A Journey Through Time</p>
            
            {/* Quick Facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-white/60 rounded-lg border border-amber-200">
                <Calendar className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">Established</p>
                <p className="text-xs text-gray-600">1972</p>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-lg border border-green-200">
                <MapPin className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">Province</p>
                <p className="text-xs text-gray-600">Udon Thani</p>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-lg border border-red-200">
                <Users className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">Villages</p>
                <p className="text-xs text-gray-600">Three United</p>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-lg border border-blue-200">
                <Star className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">Heritage</p>
                <p className="text-xs text-gray-600">Issan Culture</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <SEOHeading level={2} className="text-3xl font-bold text-gray-900 mb-6">
                The Birth of Wang Sam Mo
              </SEOHeading>
              
              <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Wang Sam Mo, meaning "Three Doctor Ponds," is a district in Udon Thani Province that was officially established in 1972. 
                    The name reflects the historical unity of three neighboring villages that came together to form this distinctive community 
                    nestled in the heart of Northeast Thailand's Issan region.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Located amidst the rolling Phu Phan Mountains, Wang Sam Mo has evolved from a collection of small agricultural 
                    settlements into a thriving district known for its natural beauty, cultural heritage, and warm hospitality that 
                    embodies the spirit of #ที่นี่วังสามหมอ.
                  </p>
                </div>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop" 
                    alt="Historic Phasuk Temple in Wang Sam Mo representing the district's spiritual heritage"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 text-white p-2 rounded">
                    <p className="text-sm font-medium">Phasuk Temple - Spiritual Heart of Wang Sam Mo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cultural Heritage Section */}
            <div className="mb-12">
              <SEOHeading level={2} className="text-3xl font-bold text-gray-900 mb-6">
                Rich Issan Cultural Heritage
              </SEOHeading>
              
              <div className="bg-gradient-to-r from-amber-50 to-green-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The district's cultural identity is deeply rooted in traditional Issan customs and Buddhist practices. 
                  Phasuk Temple serves as the spiritual center of the community, hosting vibrant festivals throughout the year 
                  that celebrate both religious traditions and local heritage. These festivals, known locally as "boon" celebrations, 
                  bring together residents and visitors in colorful displays of traditional dance, music, and cuisine.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The temple's annual festivals include the Songkran water festival, Visakha Bucha Day, and the unique local 
                  celebration of the rice harvest season. During these times, the entire district comes alive with the sounds 
                  of traditional mor lam music, the aroma of authentic Issan dishes, and the sight of elaborate processions 
                  that have been passed down through generations.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <img 
                  src="https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop" 
                  alt="Traditional Issan festival celebration at Phasuk Temple in Wang Sam Mo"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop" 
                  alt="Local artisans creating traditional Issan handicrafts in Wang Sam Mo"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Natural Wonders Section */}
            <div className="mb-12">
              <SEOHeading level={2} className="text-3xl font-bold text-gray-900 mb-6">
                Natural Attractions and Ecological Treasures
              </SEOHeading>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Wang Sam Mo's landscape is blessed with diverse natural attractions that have become the cornerstone of its 
                growing tourism industry. Wang Yai Park, the district's most famous destination, offers visitors the unique 
                experience of river rafting through pristine waters surrounded by lush tropical vegetation and limestone formations.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Tham Sumontana Cave</h4>
                <p className="text-gray-700 leading-relaxed">
                  The mystical Tham Sumontana Cave represents one of the region's most significant geological and spiritual sites. 
                  This limestone cave system, formed over millions of years, features stunning stalactites and stalagmites, 
                  underground streams, and chambers that have been used for meditation by Buddhist monks for centuries. 
                  Local folklore speaks of the cave as a place where ancient spirits dwell, making it both a natural wonder 
                  and a site of cultural significance for the #ทัวร์เดอวัง experience.
                </p>
              </div>
            </div>

            {/* Economic Development */}
            <div className="mb-12">
              <SEOHeading level={2} className="text-3xl font-bold text-gray-900 mb-6">
                Traditional Crafts and Local Economy
              </SEOHeading>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                The economic foundation of Wang Sam Mo rests on a harmonious blend of traditional agriculture and artisanal crafts 
                that have been perfected over generations. The district is renowned throughout Northeast Thailand for its exceptional 
                pickled vegetables, particularly the famous "pak dong" that combines locally grown vegetables with traditional 
                fermentation techniques passed down through families.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Agricultural Heritage</h4>
                  <p className="text-sm text-green-700">Rice farming, vegetable cultivation, and sustainable agriculture practices</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-2">Artisanal Crafts</h4>
                  <p className="text-sm text-amber-700">Handwoven textiles, bamboo products, and traditional pottery</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Culinary Traditions</h4>
                  <p className="text-sm text-red-700">Pickled vegetables, fermented fish sauce, and Issan specialties</p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                The handwoven textile industry represents another pillar of the local economy, with skilled artisans creating 
                beautiful silk and cotton fabrics using traditional looms. These textiles, featuring intricate patterns that 
                tell stories of local legends and natural beauty, have gained recognition both nationally and internationally, 
                contributing to the district's reputation as a center of authentic Thai craftsmanship.
              </p>
            </div>

            {/* Modern Development */}
            <div className="mb-12">
              <SEOHeading level={2} className="text-3xl font-bold text-gray-900 mb-6">
                Modern Wang Sam Mo and Tourism Growth
              </SEOHeading>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                In recent decades, Wang Sam Mo has embraced sustainable tourism development while carefully preserving its 
                cultural identity and natural environment. The district has become a model for community-based tourism in 
                Northeast Thailand, offering visitors authentic experiences through homestays, cultural workshops, and 
                eco-friendly activities that directly benefit local communities.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Today, Wang Sam Mo stands as a testament to the successful balance between tradition and progress. The district 
                continues to honor its roots while welcoming visitors from around the world who seek authentic cultural experiences, 
                natural beauty, and the genuine warmth of Issan hospitality. The growing recognition of Wang Sam Mo as a must-visit 
                destination in Udon Thani Province ensures that its rich heritage will continue to thrive for future generations, 
                truly embodying the spirit of #tourderwang and #วังสามหมอ.
              </p>
            </div>

            {/* Social Sharing */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Wang Sam Mo's Story</h3>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={shareOnFacebook}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Share on Facebook
                </Button>
                <Button 
                  onClick={shareOnInstagram}
                  variant="outline"
                  className="border-pink-500 text-pink-600 hover:bg-pink-50"
                >
                  Share on Instagram
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
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
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default History;
