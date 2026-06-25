import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ShoppingBag, Settings, LogOut, Package } from 'lucide-react';
import { Button } from '@mui/material';

export function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(currentUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Building2 className="w-8 h-8 text-slate-900" />
              <div>
                <h1 className="text-xl font-semibold text-slate-900">{user.entityName}</h1>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outlined"
                startIcon={<Settings />}
                sx={{
                  color: '#475569',
                  borderColor: '#e2e8f0',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#cbd5e1',
                    bgcolor: '#f8fafc',
                  }
                }}
              >
                Configurações
              </Button>
              <Button
                variant="text"
                startIcon={<LogOut />}
                onClick={handleLogout}
                sx={{
                  color: '#ef4444',
                  textTransform: 'none',
                }}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 mb-2">
            Bem-vindo ao painel de gestão
          </h2>
          <p className="text-gray-600">
            Gerencie seus módulos e configure sua plataforma
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-blue-100 mb-2">Módulos ativos</p>
                <p className="text-5xl font-bold">{user.modules?.length || 0}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <Package className="w-8 h-8" />
              </div>
            </div>
            <p className="text-blue-100">
              {user.modules?.length > 0
                ? 'Seus módulos estão funcionando perfeitamente'
                : 'Comece adquirindo módulos no marketplace'}
            </p>
          </div>

          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-500 transition-colors cursor-pointer"
            onClick={() => navigate('/marketplace')}
          >
            <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Explorar Marketplace
            </h3>
            <p className="text-gray-600 mb-6">
              Adicione novos módulos para expandir as funcionalidades da sua plataforma
            </p>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#0F172A',
                textTransform: 'none',
                px: 4,
                py: 1.5,
                borderRadius: '12px',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#1e293b',
                  boxShadow: 'none',
                }
              }}
            >
              Ir para marketplace
            </Button>
          </div>
        </div>

        {user.modules?.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Meus módulos
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {user.modules.map((module: any) => (
                <div key={module.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{module.name}</h4>
                      <p className="text-xs text-gray-500">Ativo desde {new Date(module.purchasedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      textTransform: 'none',
                      borderColor: '#e2e8f0',
                      color: '#475569',
                      '&:hover': {
                        borderColor: '#cbd5e1',
                        bgcolor: '#f8fafc',
                      }
                    }}
                  >
                    Acessar módulo
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
