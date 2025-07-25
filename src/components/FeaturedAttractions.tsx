import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedAttractions = () => {
  const attractions = [
    {
      id: 1,
      name: "Wang Yai Park",
      nameThai: "สวนวังใหญ่",
      description: "A beautiful traditional Thai park with ancient trees, lotus ponds, and peaceful pavilions perfect for relaxation and photography.",
      descriptionThai: "สวนแบบไทยที่สวยงามพร้อมต้นไม้โบราณ บึงบัว และศาลาที่เงียบสงบ เหมาะสำหรับพักผ่อนและถ่ายรูป",
      image: "/api/placeholder/400/250",
      rating: 4.8,
      duration: "2-3 hours",
      category: "Park"
    },
    {
      id: 2,
      name: "Phasuk Temple",
      nameThai: "วัดผาสุก",
      description: "Ancient Buddhist temple featuring traditional Lanna architecture and stunning golden Buddha statues.",
      descriptionThai: "วัดพุทธโบราณที่มีสถาปัตยกรรมล้านนาแบบดั้งเดิมและพระพุทธรูปทองคำที่สวยงาม",
      image: "/api/placeholder/400/250",
      rating: 4.9,
      duration: "1-2 hours",
      category: "Temple"
    },
    {
      id: 3,
      name: "Nong Kung Thap Ma Market",
      nameThai: "ตลาดหนองกุงทับมา",
      description: "Traditional local market offering authentic Thai street food and handmade crafts from local artisans.",
      descriptionThai: "ตลาดท้องถิ่นแบบดั้งเดิมที่เสนออาหารริมทางไทยแท้และงานฝีมือจากช่างฝีมือท้องถิ่น",
      image: "/api/placeholder/400/250",
      rating: 4.7,
      duration: "1-2 hours",
      category: "Market"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Featured Attractions
          </h2>
          <h3 className="text-xl lg:text-2xl text-muted-foreground mb-4">
            สถานที่ท่องเที่ยวแนะนำ
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the most beautiful and culturally significant places in Wang Sam Mo. 
            Each location offers a unique glimpse into Thai heritage and natural beauty.
          </p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {attractions.map((attraction) => (
            <Card key={attraction.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 bg-card shadow-md">
              <div className="relative overflow-hidden">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {attraction.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{attraction.rating}</span>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl mb-1">{attraction.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground font-medium">
                  {attraction.nameThai}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {attraction.description}
                </p>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2 opacity-80">
                  {attraction.descriptionThai}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{attraction.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Wang Sam Mo</span>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  Learn More / เรียนรู้เพิ่มเติม
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/attractions">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              View All Attractions / ดูสถานที่ท่องเที่ยวทั้งหมด
              <MapPin className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAttractions;