import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { useState } from 'react';
import { EntityWizard } from './EntityWizard';
import { EntityEditForm } from './EntityEditForm';
import { PaginatedTable } from './PaginatedTable';

interface Entity {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  createdAt: string;
  [key: string]: any;
}

interface EntityCRUDProps {
  title: string;
  description: string;
  entityType: string;
  icon: React.ReactNode;
  color: string;
}

// Dados mockados para demonstração
const mockEntities: Record<string, Entity[]> = {
  associados: [
    { id: '1', name: 'João Silva', type: 'Titular', status: 'active', createdAt: '2024-01-15', email: 'joao@email.com', cpf: '123.456.789-00' },
    { id: '2', name: 'Maria Santos', type: 'Dependente', status: 'active', createdAt: '2024-02-20', email: 'maria@email.com', cpf: '987.654.321-00' },
    { id: '3', name: 'Pedro Costa', type: 'Titular', status: 'inactive', createdAt: '2024-03-10', email: 'pedro@email.com', cpf: '456.789.123-00' },
  ],
  eventos: [
    { id: '1', name: 'Assembleia Geral 2024', type: 'Assembleia', status: 'active', createdAt: '2024-04-15', date: '2024-05-20' },
    { id: '2', name: 'Festa Junina', type: 'Evento Social', status: 'active', createdAt: '2024-05-10', date: '2024-06-24' },
  ],
  categorias: [
    { id: '1', name: 'Mensalidade', type: 'Receita', status: 'active', createdAt: '2024-01-01' },
    { id: '2', name: 'Taxa de Inscrição', type: 'Receita', status: 'active', createdAt: '2024-01-01' },
  ],
};

export function EntityCRUD({ title, description, entityType, icon, color }: EntityCRUDProps) {
  const [entities, setEntities] = useState<Entity[]>(mockEntities[entityType] || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const filteredEntities = entities.filter(entity =>
    entity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setShowWizard(true);
  };

  const handleEdit = (entity: Entity) => {
    setSelectedEntity(entity);
    setShowEditForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      setEntities(entities.filter(e => e.id !== id));
    }
  };

  const handleCloseWizard = () => {
    setShowWizard(false);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedEntity(null);
  };

  const handleSaveEntity = (entity: Entity) => {
    if (selectedEntity) {
      setEntities(entities.map(e => e.id === entity.id ? entity : e));
    } else {
      setEntities([...entities, { ...entity, id: Date.now().toString(), createdAt: new Date().toISOString() }]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl ${color} flex items-center justify-center`}>
                {icon}
              </div>
              <div>
                <h1 className="text-3xl mb-2">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
              </div>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Adicionar Novo
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          <PaginatedTable
            data={filteredEntities}
            columns={[
              {
                key: 'name',
                label: 'Nome',
                render: (entity) => <div className="font-medium">{entity.name}</div>
              },
              {
                key: 'type',
                label: 'Tipo',
                render: (entity) => <span className="text-sm text-muted-foreground">{entity.type}</span>
              },
              {
                key: 'status',
                label: 'Status',
                render: (entity) => (
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    entity.status === 'active'
                      ? 'bg-green-500/10 text-green-600'
                      : 'bg-gray-500/10 text-gray-600'
                  }`}>
                    {entity.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                )
              },
              {
                key: 'createdAt',
                label: 'Criado em',
                render: (entity) => (
                  <span className="text-sm text-muted-foreground">
                    {new Date(entity.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                )
              },
              {
                key: 'actions',
                label: 'Ações',
                render: (entity) => (
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(entity);
                      }}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(entity.id);
                      }}
                      className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )
              }
            ]}
            emptyMessage={searchTerm ? 'Nenhum resultado encontrado' : 'Nenhum item cadastrado'}
          />
        </div>
      </div>

      {showWizard && (
        <EntityWizard
          entityType={entityType}
          onClose={handleCloseWizard}
          onSave={handleSaveEntity}
        />
      )}

      {showEditForm && selectedEntity && (
        <EntityEditForm
          entity={selectedEntity}
          entityType={entityType}
          onClose={handleCloseEditForm}
          onSave={handleSaveEntity}
        />
      )}
    </div>
  );
}
