import { Category, Item } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ItemsGridProps {
  category: Category | string;
  selectedItem: string | null;
  onItemClick: (item: Item) => void;
  customItems: Record<string, Item[]>;
}

export function ItemsGrid({ category, selectedItem, onItemClick, customItems }: ItemsGridProps) {
  const getItems = (): Item[] => {
    let defaultItems: Item[] = [];
    
    switch (category) {
      case 'family':
        defaultItems = [
          { id: 'mae', name: 'Sharlene', image: '' },
          { id: 'padrasto', name: 'Eraldo', image: '' },
          { id: 'irmao', name: 'Micael', image: '' },
          { id: 'irma', name: 'Raiane', image: ''},
          { id: 'vovo', name: 'Gezilda', image: '' },
          { id: 'cunhada-um', name: 'Leticia', image: '' },
          { id: 'cunhada-dois', name: 'Lara', image: '' },
          { id: 'tio', name: 'Marinho', image: '' },
          { id: 'tia', name: 'Socorro', image: '' },
          { id: 'pai', name: 'Geoston', image: '' },
          { id: 'vizinho-um', name: 'Karina', image: '' },
          { id: 'vizinho-dois', name: 'Alice', image: '' },
          { id: 'vizinho-tres', name: 'Ruanderson', image: '' },
          { id: 'meia-irma', name: 'Nicole', image: '' },
        ];
        break;
      case 'animals':
        defaultItems = [
          { id: 'gato-um', name: 'Uai', image: '' },
          { id: 'gato-dois', name: 'Quenga', image: '' },
          { id: 'gato-tres', name: 'Aire', image: '' },
          { id: 'gato-quatro', name: 'Cielo', image: '' },
          { id: 'cachorro-um', name: 'Bolinha', image: '' },
          { id: 'cachorro-dois', name: 'Bebê', image: '' },
          { id: 'cachorro-tres', name: 'Di', image: '' },
          { id: 'cachorro-quatro', name: 'Alfa', image: '' },
          { id: 'cachorro-cinco', name: 'Bibite', image: '' },
          { id: 'cachorro-seis', name: 'Freedom', image: '' },
          { id: 'tartaruga', name: 'Tortuga', image: '' },
        ];
        break;
      case 'colors':
        defaultItems = [
          { id: 'vermelho', name: 'Vermelho', image: '', color: '#EF4444' },
          { id: 'azul', name: 'Azul', image: '', color: '#3B82F6' },
          { id: 'verde', name: 'Verde', image: '', color: '#10B981' },
          { id: 'amarelo', name: 'Amarelo', image: '', color: '#F59E0B' },
          { id: 'rosa', name: 'Rosa', image: '', color: '#EC4899' },
          { id: 'roxo', name: 'Roxo', image: '', color: '#8B5CF6' },
          { id: 'laranja', name: 'Laranja', image: '', color: '#F97316' },
          { id: 'preto', name: 'Preto', image: '', color: '#1F2937' },
          { id: 'branco', name: 'Branco', image: '', color: '#F9FAFB' },
        ];
        break;
      case 'food':
        defaultItems = [
          { id: 'agua', name: 'Água', image: '' },
          { id: 'mingau', name: 'Mingau', image: '' },
          { id: 'pao', name: 'Pão', image: '' },
          { id: 'macarrao', name: 'Macarrão', image: '' },
          { id: 'pudim', name: 'Pudim', image: '' },
          { id: 'refrigerante', name: 'Coca-Cola', image: '' },
          { id: 'biscoito', name: 'Biscoito', image: '' },
          { id: 'salgadinho', name: 'Salgadinho', image: '' },
          { id: 'bolo', name: 'Bolo', image: '' },
          { id: 'chocolate', name: 'Chocolate', image: '' },
          { id: 'carne', name: 'Carne', image: '' },
          { id: 'pure', name: 'Purê', image: '' },
          { id: 'feijao', name: 'Feijão', image: '' },
          { id: 'ovo', name: 'Ovo', image: '' },
        ];
        break;
      case 'bathroom':
        defaultItems = [
          { id: 'xixi', name: 'Xixi',  image: '', color: '#ffff00' },
          { id: 'coco', name: 'Cocô', image: '', color: '#964b00'},
          { id: 'lavar-maos', name: 'Lavar as mãos', image: '' },
          { id: 'tomar-banho', name: 'Tomar banho', image: '' },
          { id: 'escovar-dentes', name: 'Escovar os dentes', image: '' },
        ];
        break;
      case 'feelings':
        defaultItems = [
          { id: 'feliz', name: 'Feliz', image: '' },
          { id: 'triste', name: 'Triste', image: '' },
          { id: 'estressado', name: 'Estressado', image: '' },
          { id: 'asma', name: 'Bombinha de asma', image: '' },
          { id: 'com-medo', name: 'Com medo', image: '' },
          { id: 'cansado', name: 'Cansado', image: '' },
          { id: 'saudades', name: 'Saudades', image: '' },
        ];
        break;
      default:
        // Se for uma categoria personalizada, pegar do customItems
        return customItems[category] || [];
    }
    
    // Para categorias padrão, mesclar com customItems (que sobrescreve)
    const categoryCustomItems = customItems[category] || [];
    const mergedItems = [...defaultItems];
    
    categoryCustomItems.forEach(customItem => {
      const index = mergedItems.findIndex(item => item.id === customItem.id);
      if (index !== -1) {
        // Substituir item padrão por personalizado
        mergedItems[index] = customItem;
      } else {
        // Adicionar novo item personalizado
        mergedItems.push(customItem);
      }
    });
    
    return mergedItems;
  };

  const items = getItems();
  const categoryNames: Record<Category, string> = {
    home: 'Início',
    family: 'Família',
    animals: 'Animais',
    colors: 'Cores',
    food: 'Comidas',
    bathroom: 'Banheiro',
    feelings: 'Sentimentos',
  };

  // Procurar nome da categoria personalizada se não for padrão
  const getCategoryName = () => {
    if (category in categoryNames) {
      return categoryNames[category as Category];
    }
    // Buscar no customItems ou retornar a própria string
    return category;
  };

  return (
    <div>
      <h2 className="text-center text-blue-600 mb-4 md:mb-6">
        {getCategoryName()}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className={`bg-white rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-lg hover:shadow-2xl transition-all duration-200 active:scale-95 md:hover:scale-105 min-h-[140px] md:min-h-auto ${
              selectedItem === item.id ? 'ring-4 md:ring-8 ring-blue-500 scale-95 md:scale-105' : ''
            }`}
          >
            <div className="aspect-square rounded-xl overflow-hidden mb-2 md:mb-3 bg-gray-100 flex items-center justify-center">
              {item.color ? (
                <div
                  className="w-full h-full border-2 md:border-4 border-gray-300 rounded-xl"
                  style={{ backgroundColor: item.color }}
                />
              ) : (
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <p className="text-center text-gray-800 text-base md:text-lg">{item.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}