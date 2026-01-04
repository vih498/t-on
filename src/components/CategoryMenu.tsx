import { Users, Dog, Palette, Utensils, Bath, Smile } from 'lucide-react';
import { Category, CustomCategory } from '../App';

interface CategoryMenuProps {
  onSelectCategory: (category: Category | string) => void;
  customCategories: CustomCategory[];
}

export function CategoryMenu({ onSelectCategory, customCategories }: CategoryMenuProps) {
  const categories = [
    { id: 'family' as Category, name: 'Família', icon: Users, color: 'bg-pink-500' },
    { id: 'animals' as Category, name: 'Animais', icon: Dog, color: 'bg-green-500' },
    { id: 'colors' as Category, name: 'Cores', icon: Palette, color: 'bg-purple-500' },
    { id: 'food' as Category, name: 'Comidas', icon: Utensils, color: 'bg-orange-500' },
    { id: 'bathroom' as Category, name: 'Banheiro', icon: Bath, color: 'bg-blue-500' },
    { id: 'feelings' as Category, name: 'Sentimentos', icon: Smile, color: 'bg-yellow-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`${category.color} text-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl hover:shadow-2xl active:scale-95 md:hover:scale-105 transition-all duration-200 flex flex-col items-center justify-center gap-3 md:gap-4 min-h-[140px] md:min-h-auto`}
          >
            <Icon size={48} strokeWidth={2} className="md:w-16 md:h-16" />
            <span className="text-lg md:text-2xl">{category.name}</span>
          </button>
        );
      })}
      
      {/* Categorias personalizadas */}
      {customCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`${category.color} text-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl hover:shadow-2xl active:scale-95 md:hover:scale-105 transition-all duration-200 flex flex-col items-center justify-center gap-3 md:gap-4 min-h-[140px] md:min-h-auto`}
        >
          <span className="text-5xl md:text-6xl">{category.icon}</span>
          <span className="text-lg md:text-2xl">{category.name}</span>
        </button>
      ))}
    </div>
  );
}