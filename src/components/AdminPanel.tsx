import { useState } from 'react';
import { X, Plus, Trash2, Save, Upload, Edit2 } from 'lucide-react';
import { AppData, CustomCategory, Item } from '../App';

interface AdminPanelProps {
  appData: AppData;
  onSave: (data: AppData) => void;
  onClose: () => void;
}

export function AdminPanel({ appData, onSave, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'categories' | 'items'>('categories');
  const [editingCategory, setEditingCategory] = useState<Partial<CustomCategory>>({});
  const [editingItem, setEditingItem] = useState<Partial<Item>>({});
  const [selectedCategoryForItems, setSelectedCategoryForItems] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isEditingCategory, setIsEditingCategory] = useState<string | null>(null);
  const [isEditingItem, setIsEditingItem] = useState<{categoryId: string, itemId: string} | null>(null);

  // Categorias padrão do sistema
  const defaultCategories = [
    { id: 'family', name: 'Família', icon: '👨‍👩‍👧‍👦', color: 'bg-pink-500' },
    { id: 'animals', name: 'Animais', icon: '🐕', color: 'bg-green-500' },
    { id: 'colors', name: 'Cores', icon: '🎨', color: 'bg-purple-500' },
    { id: 'food', name: 'Comidas', icon: '🍕', color: 'bg-orange-500' },
    { id: 'bathroom', name: 'Banheiro', icon: '🚽', color: 'bg-blue-500' },
    { id: 'feelings', name: 'Sentimentos', icon: '😊', color: 'bg-yellow-500' },
  ];

  // Itens padrão por categoria
  const getDefaultItems = (categoryId: string): Item[] => {
    switch (categoryId) {
      case 'family':
        return [
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
      case 'animals':
        return [
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
      case 'colors':
        return [
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
      case 'food':
        return [
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
      case 'bathroom':
        return [
          { id: 'xixi', name: 'Xixi',  image: '', color: '#ffff00' },
          { id: 'coco', name: 'Cocô', image: '', color: '#964b00'},
          { id: 'lavar-maos', name: 'Lavar as mãos', image: '' },
          { id: 'tomar-banho', name: 'Tomar banho', image: '' },
          { id: 'escovar-dentes', name: 'Escovar os dentes', image: '' },
        ];
      case 'feelings':
        return [
          { id: 'feliz', name: 'Feliz', image: '' },
          { id: 'triste', name: 'Triste', image: '' },
          { id: 'estressado', name: 'Estressado', image: '' },
          { id: 'asma', name: 'Bombinha de asma', image: '' },
          { id: 'com-medo', name: 'Com medo', image: '' },
          { id: 'cansado', name: 'Cansado', image: '' },
          { id: 'saudades', name: 'Saudades', image: '' },
        ];
      default:
        return [];
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Verificar se é uma imagem
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    // Verificar tamanho (máx 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('A imagem é muito grande. Por favor, use uma imagem menor que 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setEditingItem({ ...editingItem, image: base64String, color: undefined });
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleAddCategory = () => {
    if (!editingCategory.name || !editingCategory.icon || !editingCategory.color) {
      alert('Preencha todos os campos da categoria');
      return;
    }

    if (isEditingCategory) {
      // Editar categoria existente
      const updatedCategories = appData.customCategories.map(cat =>
        cat.id === isEditingCategory
          ? { ...cat, name: editingCategory.name!, icon: editingCategory.icon!, color: editingCategory.color! }
          : cat
      );

      onSave({
        ...appData,
        customCategories: updatedCategories,
      });
      setIsEditingCategory(null);
      setEditingCategory({});
      alert('Categoria atualizada com sucesso!');
    } else {
      // Adicionar nova categoria
      const newCategory: CustomCategory = {
        id: editingCategory.id || `custom-${Date.now()}`,
        name: editingCategory.name,
        icon: editingCategory.icon,
        color: editingCategory.color,
      };

      const updatedData = {
        ...appData,
        customCategories: [...appData.customCategories, newCategory],
        customItems: {
          ...appData.customItems,
          [newCategory.id]: appData.customItems[newCategory.id] || [],
        },
      };

      onSave(updatedData);
      setEditingCategory({});
      alert('Categoria adicionada com sucesso!');
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;

    const updatedCategories = appData.customCategories.filter(c => c.id !== categoryId);
    const updatedItems = { ...appData.customItems };
    delete updatedItems[categoryId];

    onSave({
      customCategories: updatedCategories,
      customItems: updatedItems,
    });
  };

  const handleEditCategory = (category: CustomCategory) => {
    setEditingCategory(category);
    setIsEditingCategory(category.id);
  };

  const handleCancelEditCategory = () => {
    setEditingCategory({});
    setIsEditingCategory(null);
  };

  const handleAddItem = () => {
    if (!selectedCategoryForItems) {
      alert('Selecione uma categoria primeiro');
      return;
    }
    if (!editingItem.name) {
      alert('Digite o nome do item');
      return;
    }
    if (!editingItem.image && !editingItem.color) {
      alert('Adicione uma imagem ou escolha uma cor');
      return;
    }

    if (isEditingItem) {
      // Editar item existente
      const updatedItems = (appData.customItems[isEditingItem.categoryId] || []).map(item =>
        item.id === isEditingItem.itemId
          ? { ...item, name: editingItem.name!, image: editingItem.image || '', color: editingItem.color }
          : item
      );

      onSave({
        ...appData,
        customItems: {
          ...appData.customItems,
          [isEditingItem.categoryId]: updatedItems,
        },
      });
      setIsEditingItem(null);
      setEditingItem({});
      setImagePreview('');
      alert('Item atualizado com sucesso!');
    } else {
      // Adicionar novo item
      const newItem: Item = {
        id: editingItem.id || `item-${Date.now()}`,
        name: editingItem.name,
        image: editingItem.image || '',
        color: editingItem.color,
      };

      const currentItems = appData.customItems[selectedCategoryForItems] || [];
      const updatedData = {
        ...appData,
        customItems: {
          ...appData.customItems,
          [selectedCategoryForItems]: [...currentItems, newItem],
        },
      };

      onSave(updatedData);
      setEditingItem({});
      setImagePreview('');
      alert('Item adicionado com sucesso!');
    }
  };

  const handleDeleteItem = (categoryId: string, itemId: string) => {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;

    const updatedItems = (appData.customItems[categoryId] || []).filter(i => i.id !== itemId);
    onSave({
      ...appData,
      customItems: {
        ...appData.customItems,
        [categoryId]: updatedItems,
      },
    });
  };

  const handleEditItem = (categoryId: string, item: Item) => {
    setEditingItem(item);
    setSelectedCategoryForItems(categoryId);
    setIsEditingItem({ categoryId, itemId: item.id });
    setImagePreview(item.image || '');
  };

  const handleCancelEditItem = () => {
    setEditingItem({});
    setIsEditingItem(null);
    setImagePreview('');
  };

  const allCategories = [
    ...defaultCategories,
    ...appData.customCategories,
  ];

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-blue-600">Painel Administrativo</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 md:gap-4 mb-4 md:mb-6 border-b">
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-3 px-3 md:px-4 transition-colors text-sm md:text-base ${
            activeTab === 'categories'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Categorias
        </button>
        <button
          onClick={() => setActiveTab('items')}
          className={`pb-3 px-3 md:px-4 transition-colors text-sm md:text-base ${
            activeTab === 'items'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Items
        </button>
      </div>

      {/* Categorias Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="mb-4">{isEditingCategory ? 'Editar Categoria' : 'Adicionar Nova Categoria'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Nome da Categoria</label>
                <input
                  type="text"
                  value={editingCategory.name || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  placeholder="Ex: Lugares"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Emoji do Ícone</label>
                <input
                  type="text"
                  value={editingCategory.icon || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                  placeholder="Ex: 🏠"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-2xl"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Cor de Fundo</label>
                <select
                  value={editingCategory.color || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                >
                  <option value="">Escolha uma cor</option>
                  <option value="bg-pink-500">Rosa</option>
                  <option value="bg-green-500">Verde</option>
                  <option value="bg-purple-500">Roxo</option>
                  <option value="bg-orange-500">Laranja</option>
                  <option value="bg-blue-500">Azul</option>
                  <option value="bg-yellow-500">Amarelo</option>
                  <option value="bg-red-500">Vermelho</option>
                  <option value="bg-indigo-500">Índigo</option>
                  <option value="bg-teal-500">Azul-esverdeado</option>
                </select>
              </div>
              <button
                onClick={handleAddCategory}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                {isEditingCategory ? <Save size={20} /> : <Plus size={20} />}
                {isEditingCategory ? 'Salvar Alterações' : 'Adicionar Categoria'}
              </button>
              {isEditingCategory && (
                <button
                  onClick={handleCancelEditCategory}
                  className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>

          {/* Lista de Categorias Personalizadas */}
          <div>
            <h3 className="mb-4">Categorias Personalizadas</h3>
            {appData.customCategories.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhuma categoria personalizada ainda</p>
            ) : (
              <div className="space-y-2">
                {appData.customCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <span>{category.name}</span>
                      <span className={`px-3 py-1 rounded text-white text-sm ${category.color}`}>
                        Cor
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Items Tab */}
      {activeTab === 'items' && (
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="mb-4">{isEditingItem ? 'Editar Item' : 'Adicionar Novo Item'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Categoria</label>
                <select
                  value={selectedCategoryForItems}
                  onChange={(e) => setSelectedCategoryForItems(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                >
                  <option value="">Selecione uma categoria</option>
                  {allCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Nome do Item</label>
                <input
                  type="text"
                  value={editingItem.name || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="Ex: Vovó Maria"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">URL da Imagem</label>
                <input
                  type="text"
                  value={editingItem.image || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value, color: undefined })}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                />
              </div>
              <div className="text-center text-sm text-gray-500">OU</div>
              <div>
                <label className="block text-sm mb-2">Cor (para itens de cor)</label>
                <input
                  type="color"
                  value={editingItem.color || '#3B82F6'}
                  onChange={(e) => setEditingItem({ ...editingItem, color: e.target.value, image: '' })}
                  className="w-full h-12 rounded-lg border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Upload de Imagem</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <button
                onClick={handleAddItem}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                {isEditingItem ? <Save size={20} /> : <Plus size={20} />}
                {isEditingItem ? 'Salvar Alterações' : 'Adicionar Item'}
              </button>
              {isEditingItem && (
                <button
                  onClick={handleCancelEditItem}
                  className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>

          {/* Lista de Items por Categoria */}
          <div>
            <h3 className="mb-4">Todos os Items</h3>
            <div className="space-y-6">
              {allCategories.map((category) => {
                // Pegar itens padrão
                const defaultItems = getDefaultItems(category.id);
                // Pegar itens personalizados (sobrescrevem os padrão)
                const customItems = appData.customItems[category.id] || [];
                
                // Mesclar: itens personalizados sobrescrevem os padrão pelo id
                const allItems = [...defaultItems];
                customItems.forEach(customItem => {
                  const index = allItems.findIndex(item => item.id === customItem.id);
                  if (index !== -1) {
                    // Substituir item padrão por personalizado
                    allItems[index] = customItem;
                  } else {
                    // Adicionar novo item personalizado
                    allItems.push(customItem);
                  }
                });
                
                if (allItems.length === 0) return null;
                
                return (
                  <div key={category.id}>
                    <h4 className="mb-3">{category.name}</h4>
                    <div className="space-y-2">
                      {allItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {item.color ? (
                              <div
                                className="w-8 h-8 rounded border-2 border-gray-300"
                                style={{ backgroundColor: item.color }}
                              />
                            ) : item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-8 h-8 rounded object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-gray-200 rounded" />
                            )}
                            <span>{item.name}</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditItem(category.id, item)}
                              className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(category.id, item.id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}