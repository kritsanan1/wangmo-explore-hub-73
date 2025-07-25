import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Sparkles } from "lucide-react";

const CulturalHighlights = () => {
  const culturalItems = [
    {
      id: 1,
      title: "Wang Sam Mo Folklore",
      titleThai: "นิทานพื้นบ้านวังสามหมอ",
      description: "Discover the ancient legends and stories that have been passed down through generations in Wang Sam Mo. These tales speak of mystical healers, brave warriors, and the deep connection between the land and its people.",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&h=400&fit=crop",
      category: "Folklore",
      icon: <Sparkles className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Traditional Festivals",
      titleThai: "งานประเพณีท้องถิ่น",
      description: "Experience vibrant local festivals that celebrate the harvest seasons, honor ancestors, and bring communities together. These colorful celebrations feature traditional music, dance, and authentic local cuisine.",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=600&h=400&fit=crop",
      category: "Festivals",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      id: 3,
      title: "Community Traditions",
      titleThai: "ประเพณีชุมชน",
      description: "Learn about the daily customs and practices that define life in Wang Sam Mo. From morning alms-giving to evening temple visits, these traditions connect past and present.",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=600&h=400&fit=crop",
      category: "Traditions",
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 4,
      title: "Phasuk Temple Heritage",
      titleThai: "มรดกวัดภาสุข",
      description: "Explore the rich history of Phasuk Temple, one of the most significant spiritual centers in the region. Its architecture and artifacts tell stories of centuries of devotion and craftsmanship.",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=400&fit=crop",
      category: "Heritage",
      icon: <Sparkles className="h-5 w-5" />
    },
    {
      id: 5,
      title: "Nong Kung Thap Ma Culture",
      titleThai: "วัฒนธรรมหนองกุงทับม้า",
      description: "Discover the unique cultural identity of Nong Kung Thap Ma, where traditional farming practices meet modern life. Experience authentic rural Thai culture at its finest.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&h=400&fit=crop",
      category: "Rural Culture",
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 6,
      title: "Local Craftsmanship",
      titleThai: "งานฝีมือท้องถิ่น",
      description: "Witness the incredible skills of local artisans who create beautiful handicrafts, textiles, and pottery using techniques passed down through generations.",
      image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=600&h=400&fit=crop",
      category: "Crafts",
      icon: <Sparkles className="h-5 w-5" />
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Folklore: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Festivals: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      Traditions: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Heritage: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Rural Culture": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      Crafts: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Cultural Highlights</h2>
        <h3 className="text-xl text-muted-foreground mb-6">จุดเด่นทางวัฒนธรรม</h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Immerse yourself in the rich cultural tapestry of Wang Sam Mo. Discover traditions, 
          folklore, and customs that have shaped this unique community for generations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {culturalItems.map((item) => (
          <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <Badge className={`absolute top-4 left-4 ${getCategoryColor(item.category)}`}>
                <span className="flex items-center gap-1">
                  {item.icon}
                  {item.category}
                </span>
              </Badge>
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {item.titleThai}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-4">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-card p-8 rounded-lg border">
        <h3 className="text-2xl font-semibold mb-4 text-center">Experience Local Culture</h3>
        <p className="text-muted-foreground text-center mb-6">
          Join our cultural tours and workshops to experience these traditions firsthand. 
          Connect with local communities and learn about their way of life.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="outline" className="px-4 py-2">Cultural Tours</Badge>
          <Badge variant="outline" className="px-4 py-2">Traditional Workshops</Badge>
          <Badge variant="outline" className="px-4 py-2">Community Visits</Badge>
          <Badge variant="outline" className="px-4 py-2">Festival Participation</Badge>
        </div>
      </div>
    </div>
  );
};

export default CulturalHighlights;