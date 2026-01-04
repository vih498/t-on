import { useState } from 'react';
import { Lock, X, Eye, EyeOff } from 'lucide-react';

interface PasswordModalProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function PasswordModal({ onSuccess, onCancel }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'login' | 'setup' | 'reset'>(() => {
    const savedPassword = localStorage.getItem('admin-password');
    return savedPassword ? 'login' : 'setup';
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [resetAnswer, setResetAnswer] = useState('');

  const handleLogin = () => {
    const savedPassword = localStorage.getItem('admin-password');
    if (password === savedPassword) {
      onSuccess();
    } else {
      setError('Senha incorreta');
      setPassword('');
    }
  };

  const handleSetup = () => {
    if (!newPassword || newPassword.length < 4) {
      setError('A senha deve ter pelo menos 4 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    if (!securityQuestion || !securityAnswer) {
      setError('Preencha a pergunta e resposta de segurança');
      return;
    }

    localStorage.setItem('admin-password', newPassword);
    localStorage.setItem('security-question', securityQuestion);
    localStorage.setItem('security-answer', securityAnswer.toLowerCase());
    alert('Senha cadastrada com sucesso!');
    onSuccess();
  };

  const handleReset = () => {
    const savedAnswer = localStorage.getItem('security-answer');
    if (resetAnswer.toLowerCase() === savedAnswer) {
      setMode('setup');
      setError('');
      setResetAnswer('');
    } else {
      setError('Resposta incorreta');
      setResetAnswer('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Lock className="text-blue-600" size={24} />
            </div>
            <h2 className="text-blue-600">
              {mode === 'login' ? 'Acesso Administrativo' : mode === 'setup' ? 'Configurar Senha' : 'Recuperar Senha'}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {mode === 'login' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Digite a senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                  className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 outline-none text-lg"
                  placeholder="••••••"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white py-4 rounded-xl hover:bg-blue-600 transition-colors text-lg"
            >
              Entrar
            </button>
            <button
              onClick={() => {
                setMode('reset');
                setError('');
                setPassword('');
              }}
              className="w-full text-blue-500 py-2 text-sm hover:underline"
            >
              Esqueci minha senha
            </button>
          </div>
        )}

        {mode === 'setup' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Nova Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 outline-none text-lg"
                  placeholder="Mínimo 4 caracteres"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Confirmar Senha</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 outline-none text-lg"
                placeholder="Digite novamente"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Pergunta de Segurança</label>
              <select
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 outline-none text-lg"
              >
                <option value="">Escolha uma pergunta</option>
                <option value="Qual o nome do seu animal de estimação?">Qual o nome do seu animal de estimação?</option>
                <option value="Qual sua cor favorita?">Qual sua cor favorita?</option>
                <option value="Em que cidade você nasceu?">Em que cidade você nasceu?</option>
                <option value="Qual o nome da sua mãe?">Qual o nome da sua mãe?</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Resposta</label>
              <input
                type="text"
                value={securityAnswer}
                onChange={(e) => {
                  setSecurityAnswer(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 outline-none text-lg"
                placeholder="Sua resposta"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleSetup}
              className="w-full bg-green-500 text-white py-4 rounded-xl hover:bg-green-600 transition-colors text-lg"
            >
              Salvar Senha
            </button>
          </div>
        )}

        {mode === 'reset' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Pergunta de Segurança</label>
              <div className="bg-blue-50 p-4 rounded-xl mb-3">
                <p className="text-sm">{localStorage.getItem('security-question')}</p>
              </div>
              <input
                type="text"
                value={resetAnswer}
                onChange={(e) => {
                  setResetAnswer(e.target.value);
                  setError('');
                }}
                onKeyPress={(e) => handleKeyPress(e, handleReset)}
                className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 outline-none text-lg"
                placeholder="Sua resposta"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleReset}
              className="w-full bg-blue-500 text-white py-4 rounded-xl hover:bg-blue-600 transition-colors text-lg"
            >
              Verificar
            </button>
            <button
              onClick={() => {
                setMode('login');
                setError('');
                setResetAnswer('');
              }}
              className="w-full text-blue-500 py-2 text-sm hover:underline"
            >
              Voltar para o login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
