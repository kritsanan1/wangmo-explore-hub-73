import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Camera, ExternalLink } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface PhotoItem {
  id: number;
  thumbnail: string;
  fullSize: string;
  caption: string;
  hashtags: string;
  location: string;
}

const photoGallery: PhotoItem[] = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop",
    caption: "Rafting at Wang Yai Park",
    hashtags: "#tourderwang",
    location: "Wang Yai Park"
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    caption: "Cultural festival at Phasuk Temple",
    hashtags: "#ที่นี่วังสามหมอ",
    location: "Phasuk Temple"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    caption: "Mystical Tham Sumontana Cave",
    hashtags: "#วังสามหมอ",
    location: "Tham Sumontana Cave"
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    caption: "Relax at Bua Daeng Homestay",
    hashtags: "#ทัวร์เดอวัง",
    location: "Bua Daeng Homestay"
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1587334474613-c1226d65cd4e?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1587334474613-c1226d65cd4e?w=800&h=600&fit=crop",
    caption: "Shop local pickled vegetables",
    hashtags: "#วังสามหมอ",
    location: "Local Market"
  },
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    fullSize: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    caption: "Handwoven crafts by local artisans",
    hashtags: "#tourderwang",
    location: "Craft Workshop"
  }
];

const PhotoAlbumSection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    
    const currentIndex = photoGallery.findIndex(p => p.id === selectedPhoto.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : photoGallery.length - 1;
    } else {
      newIndex = currentIndex < photoGallery.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(photoGallery[newIndex]);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50/60 via-blue-50/40 to-amber-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Wang Sam Mo Photo Album"
          titleThai="อัลบั้มภาพวังสามหมอ"
          subtitle="Explore the beauty and culture of our district through stunning photography"
          linkTo="/photo-album"
          linkText="View Full Album"
          className="text-center mb-12"
        />

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {photoGallery.map((photo) => (
            <div 
              key={photo.id}
              className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => openModal(photo)}
            >
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
                  <Camera className="h-8 w-8 text-white" />
                </div>
                
                {/* Bottom Gradient */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-xs font-medium truncate">
                    {photo.caption}
                  </p>
                </div>
              </div>
              
              {/* Thai Border Decoration */}
              <div className="absolute top-2 right-2 w-6 h-6 border-2 border-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Hashtags Display */}
        <div className="text-center mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              #ที่นี่วังสา���หมอ
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

        {/* Call to Action */}
        <div className="text-center">
          <Link to="/photo-album">
            <Button 
              variant="outline" 
              size="lg"
              className="border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-3 font-semibold transition-all duration-300"
            >
              View Full Album
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Photo Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none">
          {selectedPhoto && (
            <div className="relative">
              {/* Close button is handled by Dialog */}
              
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
              
              {/* Caption */}
              <div className="p-6 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedPhoto.caption}
                    </h3>
                    <p className="text-gray-600 mb-2">📍 {selectedPhoto.location}</p>
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      {selectedPhoto.hashtags}
                    </span>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <p className="text-sm text-gray-500">
                      {photoGallery.findIndex(p => p.id === selectedPhoto.id) + 1} of {photoGallery.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PhotoAlbumSection;
