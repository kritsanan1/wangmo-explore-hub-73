import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface MiniCartProps {
  onClose: () => void;
}

const MiniCart = ({ onClose }: MiniCartProps) => {
  const { state, removeItem, updateQuantity } = useCart();
  const { t } = useLanguage();
  const { items, total } = state;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <ShoppingBag className="h-5 w-5 mr-2" />
          {t('cart.title')}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-1 hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">{t('cart.empty')}</p>
          <Button asChild variant="outline" onClick={onClose}>
            <Link to="/services">{t('cart.continue')}</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="max-h-64 overflow-y-auto space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {item.name_thai}
                  </p>
                  <p className="text-sm font-semibold text-amber-600">
                    {item.price.toLocaleString()} {t('currency')}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="h-6 w-6 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-gray-900">
                {t('cart.total')}:
              </span>
              <span className="text-lg font-bold text-amber-600">
                {total.toLocaleString()} {t('currency')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button asChild variant="outline" size="sm" onClick={onClose}>
                <Link to="/services">{t('cart.continue')}</Link>
              </Button>
              <Button asChild size="sm" className="bg-amber-600 hover:bg-amber-700" onClick={onClose}>
                <Link to="/cart">{t('cart.proceed')}</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MiniCart;
