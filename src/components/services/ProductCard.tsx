import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Share2, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type ProductType = {
  id: string;
  name: string;
  name_thai: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  images?: string[];
  vendor: string;
  rating?: number;
  featured?: boolean;
  in_stock: boolean;
  ingredients?: string[];
  origin?: string;
};

type ProductCardProps = {
  product: ProductType;
  onAddToCart: (product: ProductType, quantity: number) => void;
};

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const defaultImage = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop";
  const imageUrl = product.images?.[0] || defaultImage;

  const getCategoryColor = (category: string) => {
    const colors = {
      food: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      handicraft: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      souvenir: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      textile: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const shareProduct = () => {
    const url = window.location.href;
    const text = `Check out ${product.name} from Wang Sam Mo!`;
    
    if (navigator.share) {
      navigator.share({ title: product.name, text, url });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Product link has been copied to your clipboard.",
      });
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const updateQuantity = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        {!product.in_stock && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Out of Stock
          </Badge>
        )}
        {product.rating && (
          <div className="absolute top-2 right-2 bg-background/90 rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
          </div>
        )}
        
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={shareProduct}
          >
            <Share2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {product.name_thai}
            </CardDescription>
          </div>
          <Badge variant="secondary" className={getCategoryColor(product.category)}>
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Vendor */}
        <div className="text-sm">
          <span className="font-medium">Vendor:</span>
          <span className="text-muted-foreground ml-1">{product.vendor}</span>
        </div>

        {/* Origin */}
        {product.origin && (
          <div className="text-sm">
            <span className="font-medium">Origin:</span>
            <span className="text-muted-foreground ml-1">{product.origin}</span>
          </div>
        )}

        {/* Ingredients */}
        {product.ingredients && product.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <span className="text-xs font-medium">Ingredients:</span>
            {product.ingredients.slice(0, 3).map((ingredient, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {ingredient}
              </Badge>
            ))}
            {product.ingredients.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{product.ingredients.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-primary">
            {product.price} {product.currency === 'THB' ? '฿' : '$'}
          </div>
          {product.in_stock && (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => updateQuantity(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium w-8 text-center">{quantity}</span>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => updateQuantity(1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
          disabled={!product.in_stock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;