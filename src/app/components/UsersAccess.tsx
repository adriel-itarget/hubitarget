import { Users, Shield, Mail, MoreVertical, Plus, X, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

const users = [
  {
    id: 1,
    name: 'Ana Paula Costa',
    email: 'ana.costa@assoc.com',
    role: 'Administrador',
    status: 'active',
    avatar: 'AP',
  },
  {
    id: 2,
    name: 'Carlos Eduardo Silva',
    email: 'carlos.silva@assoc.com',
    role: 'Gestor',
    status: 'active',
    avatar: 'CE',
  },
  {
    id: 3,
    name: 'Maria Fernanda Lima',
    email: 'maria.lima@assoc.com',
    role: 'Editor',
    status: 'active',
    avatar: 'MF',
  },
  {
    id: 4,
    name: 'Roberto Alves',
    email: 'roberto.alves@assoc.com',
    role: 'Visualizador',
    status: 'pending',
    avatar: 'RA',
  },
];

const roles = [
  {
    name: 'Administrador',
    description: 'Acesso completo a todas as funcionalidades',
    users: 1,
    color: 'bg-red-500',
  },
  {
    name: 'Gestor',
    description: 'Gerencia recursos e visualiza relatórios',
    users: 1,
    color: 'bg-orange-500',
  },
  {
    name: 'Editor',
    description: 'Edita conteúdo e configurações básicas',
    users: 1,
    color: 'bg-blue-500',
  },
  {
    name: 'Visualizador',
    description: 'Apenas visualização de dados',
    users: 1,
    color: 'bg-gray-500',
  },
];

export function UsersAccess() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleSaveUser = () => {
    alert('Usuário adicionado com sucesso! Um convite foi enviado por email.');
    setShowAddUserModal(false);
  };

  const handleEditUser = (userId: number) => {
    setSelectedUser(userId);
    alert(`Editar usuário ${users.find(u => u.id === userId)?.name}`);
  };

  const handleDeleteUser = (userId: number, userName: string) => {
    if (confirm(`Tem certeza que deseja remover "${userName}" do sistema?`)) {
      alert('Usuário removido com sucesso!');
    }
  };

  const handleManagePermissions = () => {
    setShowPermissionsModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Usuários e Níveis de Acesso</h1>
              <p className="text-muted-foreground">
                Gerencie permissões e controle de acesso ao sistema
              </p>
            </div>
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Adicionar Usuário
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {roles.map((role) => (
              <div key={role.name} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full ${role.color}`} />
                  <h3 className="font-semibold text-sm">{role.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{role.description}</p>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{role.users} usuário{role.users > 1 ? 's' : ''}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="font-semibold">Usuários do Sistema</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Usuário
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Nível de Acesso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">{user.avatar}</span>
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{user.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.status === 'active' ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-600 font-medium">
                            Ativo
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-orange-500/10 text-orange-600 font-medium">
                            Pendente
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditUser(user.id)}
                            className="p-2 hover:bg-accent rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                            title="Remover"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl p-6 border border-primary/20">
              <Shield className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Configurar Permissões</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Personalize o que cada nível de acesso pode fazer no sistema
              </p>
              <button
                onClick={handleManagePermissions}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Gerenciar Permissões
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20">
              <Users className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="font-semibold mb-2">Convites Pendentes</h3>
              <p className="text-sm text-muted-foreground mb-4">
                1 usuário aguardando confirmação de cadastro
              </p>
              <button
                onClick={() => alert('Visualizar convites pendentes')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Ver Convites
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-md w-full">
            <div className="border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Adicionar Novo Usuário</h2>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo</label>
                  <input
                    type="text"
                    placeholder="João Silva"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="joao@email.com"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nível de Acesso</label>
                  <select className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                    <option>Visualizador</option>
                    <option>Editor</option>
                    <option>Gestor</option>
                    <option>Administrador</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveUser}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Enviar Convite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPermissionsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Gerenciar Permissões</h2>
              <button
                onClick={() => setShowPermissionsModal(false)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {roles.map((role) => (
                <div key={role.name} className="mb-6 pb-6 border-b border-border last:border-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full ${role.color}`} />
                    <h3 className="font-semibold">{role.name}</h3>
                  </div>

                  <div className="space-y-2 ml-6">
                    {['Visualizar dashboard', 'Editar recursos', 'Gerenciar usuários', 'Configurações avançadas'].map((permission, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={role.name === 'Administrador' || (idx < 2 && role.name !== 'Visualizador')}
                          className="w-4 h-4 rounded border-border"
                        />
                        <span className="text-sm">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  alert('Permissões atualizadas com sucesso!');
                  setShowPermissionsModal(false);
                }}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Salvar Permissões
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
