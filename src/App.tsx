import { useState, useEffect } from 'react';
import { Home, Heart, Palette, Utensils, Bath, Smile } from 'lucide-react';
import { CategoryMenu } from './components/CategoryMenu';
import { ItemsGrid } from './components/ItemsGrid';
import { AdminPanel } from './components/AdminPanel';
import { PasswordModal } from './components/PasswordModal';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import logoImage from 'figma:asset/41e17c45d53f377efefb03083da59c63dd1f43c1.png';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

export type Category = 'home' | 'family' | 'animals' | 'colors' | 'food' | 'bathroom' | 'feelings';

export interface Item {
  id: string;
  name: string;
  image: string;
  color?: string;
}

export interface CustomCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface AppData {
  customCategories: CustomCategory[];
  customItems: Record<string, Item[]>;
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [appData, setAppData] = useState<AppData>({
    customCategories: [],
    customItems: {},
  });

  // Carregar dados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('communicator-data');
    if (saved) {
      try {
        setAppData(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar dados:', e);
      }
    }
  }, []);

  // Salvar dados no localStorage
  const saveData = (data: AppData) => {
    setAppData(data);
    localStorage.setItem('communicator-data', JSON.stringify(data));
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleItemClick = (item: Item) => {
    setSelectedItem(item.id);
    falar(item.name);
    
    setTimeout(() => {
      setSelectedItem(null);
    }, 2000);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedItem(null);
  };

  const handleLogoClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSuccess = () => {
    setShowPasswordModal(false);
    setIsAdminMode(true);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-white p-3 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Logo - botão para admin */}
        <div className="flex justify-center mb-4 md:mb-8">
          <button
            onClick={handleLogoClick}
            className="group relative"
            title="Clique para modo administrador"
          >
            <img
              src={logoImage}
              alt="T-On Logo"
              className="h-24 md:h-24 w-auto transition-all group-hover:scale-110"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              ⚙️
            </div>
          </button>
        </div>

        {showPasswordModal && (
          <PasswordModal
            onSuccess={handlePasswordSuccess}
            onCancel={() => setShowPasswordModal(false)}
          />
        )}

        {isAdminMode ? (
          <AdminPanel 
            appData={appData}
            onSave={saveData}
            onClose={() => setIsAdminMode(false)}
          />
        ) : !selectedCategory ? (
          <>
            <CategoryMenu 
              onSelectCategory={setSelectedCategory}
              customCategories={appData.customCategories}
            />
          </>
        ) : (
          <>
            <div className="mb-4 md:mb-6">
              <button
                onClick={handleBack}
                className="bg-white px-6 py-4 md:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
              >
                ← Voltar
              </button>
            </div>
            <ItemsGrid
              category={selectedCategory}
              selectedItem={selectedItem}
              onItemClick={handleItemClick}
              customItems={appData.customItems}
            />
          </>
        )}
      </div>
    </div>
  );
  async function falar(text: string) {
    await TextToSpeech.speak({
      text,
      lang: 'pt-BR',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
    });
  }
}