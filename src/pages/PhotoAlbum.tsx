import Layout from "@/components/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ChevronLeft, ChevronRight, Camera, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHeading } from "@/components/seo/SEOHeading";

interface PhotoItem {
  id: number;
  thumbnail: string;
  fullSize: string;
  caption: string;
  description: string;
  hashtags: string;
  location: string;
  category: string;
  date: string;
}

const fullPhotoGallery: PhotoItem[] = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop",
    caption: "Rafting at Wang Yai Park",
    description: "Experience the thrill of bamboo rafting through crystal-clear waters surrounded by lush tropical vegetation.",
    hashtags: "#tourderwang",
    location: "Wang Yai Park",
    category: "Adventure",
    date: "2024"
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    caption: "Cultural festival at Phasuk Temple",
    description: "Annual temple festival featuring traditional Issan music, dance, and colorful ceremonial decorations.",
    hashtags: "#ที่นี่วังสามหมอ",
    location: "Phasuk Temple",
    category: "Culture",
    date: "2024"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    caption: "Mystical Tham Sumontana Cave",
    description: "Ancient limestone cave system with stunning stalactites and spiritual significance for local Buddhist practices.",
    hashtags: "#วังสามหมอ",
    location: "Tham Sumontana Cave",
    category: "Nature",
    date: "2024"
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    caption: "Relax at Bua Daeng Homestay",
    description: "Traditional Thai homestay offering authentic accommodation with beautiful garden views and local hospitality.",
    hashtags: "#ทัวร์เดอวัง",
    location: "Bua Daeng Homestay",
    category: "Accommodation",
    date: "2024"
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1587334474613-c1226d65cd4e?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1587334474613-c1226d65cd4e?w=800&h=600&fit=crop",
    caption: "Shop local pickled vegetables",
    description: "Famous Wang Sam Mo pickled vegetables made using traditional fermentation techniques passed down through generations.",
    hashtags: "#วังสามหมอ",
    location: "Local Market",
    category: "Food",
    date: "2024"
  },
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    caption: "Handwoven crafts by local artisans",
    description: "Traditional Issan textiles and handicrafts created by skilled local artisans using time-honored techniques.",
    hashtags: "#tourderwang",
    location: "Craft Workshop",
    category: "Handicrafts",
    date: "2024"
  },
  {
    id: 7,
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    caption: "Sunrise over Phu Phan Mountains",
    description: "Breathtaking sunrise view from the hills overlooking Wang Sam Mo district and the surrounding countryside.",
    hashtags: "#ที่นี่วังสามหมอ",
    location: "Phu Phan Mountains",
    category: "Nature",
    date: "2024"
  },
  {
    id: 8,
    thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
    caption: "Traditional mor lam performance",
    description: "Local musicians performing traditional Issan mor lam music during community celebrations.",
    hashtags: "#ทัวร��เดอวัง",
    location: "Community Center",
    category: "Culture",
    date: "2024"
  },
  {
    id: 9,
    thumbnail: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop",
    caption: "Rice paddies during harvest season",
    description: "Golden rice fields during harvest time, showcasing the agricultural heritage of Wang Sam Mo.",
    hashtags: "#วังสามหมอ",
    location: "Agricultural Areas",
    category: "Agriculture",
    date: "2024"
  },
  {
    id: 10,
    thumbnail: "https://images.unsplash.com/photo-1534274867514-d5b47a7b1bb5?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1534274867514-d5b47a7b1bb5?w=800&h=600&fit=crop",
    caption: "Local street food vendors",
    description: "Authentic Issan street food being prepared by local vendors at the weekly night market.",
    hashtags: "#tourderwang",
    location: "Night Market",
    category: "Food",
    date: "2024"
  },
  {
    id: 11,
    thumbnail: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
    caption: "Children learning traditional dance",
    description: "Young students practicing traditional Issan dance moves at the local cultural center.",
    hashtags: "#ที่นี่วังสามหมอ",
    location: "Cultural Center",
    category: "Culture",
    date: "2024"
  },
  {
    id: 12,
    thumbnail: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
    caption: "Peaceful meditation at temple",
    description: "Serene moments of meditation and prayer at Phasuk Temple during early morning hours.",
    hashtags: "#ทัวร์เดอวัง",
    location: "Phasuk Temple",
    category: "Spirituality",
    date: "2024"
  }
];

const categories = ["All", "Nature", "Culture", "Food", "Adventure", "Accommodation", "Handicrafts", "Agriculture", "Spirituality"];

const PhotoAlbum = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPhotos = selectedCategory === "All" 
    ? fullPhotoGallery 
    : fullPhotoGallery.filter(photo => photo.category === selectedCategory);

  const openModal = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    } else {
      newIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-50 via-green-50 to-amber-50 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800')",
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              keywords={["Wang Sam Mo", "photo album", "วังสามหมอ", "gallery"]}
            >
              Wang Sam Mo Photo Album
            </SEOHeading>
            <p className="text-xl text-gray-600 mb-6">อัลบั้มภาพวังสามหมอ - Capturing the Beauty and Culture</p>
            
            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>{fullPhotoGallery.length} Photos</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Multiple Locations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>2024 Collection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-amber-600 hover:bg-amber-700" 
                  : "border-amber-600 text-amber-700 hover:bg-amber-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-4">
            Showing {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''} 
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div 
                key={photo.id}
                className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white"
                onClick={() => openModal(photo)}
              >
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-block px-2 py-1 bg-black/70 text-white text-xs rounded-full font-medium">
                    {photo.category}
                  </span>
                </div>
                
                <div className="aspect-square relative">
                  <img 
                    src={photo.thumbnail}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                  
                  {/* Camera Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Camera className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                {/* Photo Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {photo.caption}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {photo.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {photo.location}
                    </span>
                    <span className="font-medium text-amber-600">
                      {photo.hashtags}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hashtags Section */}
          <div className="text-center mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Wang Sam Mo Experience</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                #ที่นี่วังสามหมอ
              </span>
              <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                #ทัวร์เดอวัง
              </span>
              <span className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                #tourderwang
              </span>
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                #วังสามหมอ
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-5xl w-full p-0 bg-black/95 border-none">
          {selectedPhoto && (
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={() => navigatePhoto('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={() => navigatePhoto('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Image */}
              <div className="relative">
                <img 
                  src={selectedPhoto.fullSize}
                  alt={selectedPhoto.caption}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
              
              {/* Photo Details */}
              <div className="p-6 bg-white">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                        {selectedPhoto.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {filteredPhotos.findIndex(p => p.id === selectedPhoto.id) + 1} of {filteredPhotos.length}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {selectedPhoto.caption}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {selectedPhoto.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2 text-amber-600" />
                      <span>{selectedPhoto.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2 text-amber-600" />
                      <span>{selectedPhoto.date}</span>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {selectedPhoto.hashtags}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default PhotoAlbum;
