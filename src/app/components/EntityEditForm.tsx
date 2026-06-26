import { X } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface Entity {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  [key: string]: any;
}

interface EntityEditFormProps {
  entity: Entity;
  entityType: string;
  onClose: () => void;
  onSave: (entity: Entity) => void;
}

export function EntityEditForm({ entity, entityType, onClose, onSave }: EntityEditFormProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState<Entity>(entity);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const renderGeneralTab = () => {
    if (entityType === 'associados') {
      return (
        <div className="space-y-4">
          <div>
            <Label className="mb-2">Nome Completo</Label>
            <Input
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Digite o nome completo"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-2">CPF</Label>
              <Input
                value={formData.cpf || ''}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                placeholder="000.000.000-00"
              />
            </div>
            <div>
              <Label className="mb-2">Data de Nascimento</Label>
              <Input
                type="date"
                value={formData.birthDate || ''}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label className="mb-2">Tipo de Associado</Label>
            <select
              value={formData.type || 'Titular'}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="Titular">Titular</option>
              <option value="Dependente">Dependente</option>
              <option value="Colaborador">Colaborador</option>
            </select>
          </div>
        </div>
      );
    }

    if (entityType === 'eventos') {
      return (
        <div className="space-y-4">
          <div>
            <Label className="mb-2">Nome do Evento</Label>
            <Input
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Digite o nome do evento"
            />
          </div>
          <div>
            <Label className="mb-2">Tipo de Evento</Label>
            <select
              value={formData.type || 'Evento Social'}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="Evento Social">Evento Social</option>
              <option value="Assembleia">Assembleia</option>
              <option value="Reunião">Reunião</option>
              <option value="Esportivo">Esportivo</option>
            </select>
          </div>
          <div>
            <Label className="mb-2">Descrição</Label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o evento"
              rows={4}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-2">Data</Label>
              <Input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <Label className="mb-2">Horário</Label>
              <Input
                type="time"
                value={formData.time || ''}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>
        </div>
      );
    }

    if (entityType === 'categorias') {
      return (
        <div className="space-y-4">
          <div>
            <Label className="mb-2">Nome da Categoria</Label>
            <Input
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Digite o nome da categoria"
            />
          </div>
          <div>
            <Label className="mb-2">Tipo</Label>
            <select
              value={formData.type || 'Receita'}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="Receita">Receita</option>
              <option value="Despesa">Despesa</option>
            </select>
          </div>
          <div>
            <Label className="mb-2">Descrição</Label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva a categoria"
              rows={3}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  const renderContactTab = () => {
    if (entityType === 'associados') {
      return (
        <div className="space-y-4">
          <div>
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@exemplo.com"
            />
          </div>
          <div>
            <Label className="mb-2">Telefone</Label>
            <Input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(00) 00000-0000"
            />
          </div>
          <div>
            <Label className="mb-2">Endereço</Label>
            <Textarea
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Rua, número, bairro, cidade"
              rows={3}
            />
          </div>
          <div>
            <Label className="mb-2">CEP</Label>
            <Input
              value={formData.cep || ''}
              onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
              placeholder="00000-000"
            />
          </div>
        </div>
      );
    }

    if (entityType === 'eventos') {
      return (
        <div className="space-y-4">
          <div>
            <Label className="mb-2">Local</Label>
            <Input
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Endereço ou nome do local"
            />
          </div>
          <div>
            <Label className="mb-2">Link do Evento</Label>
            <Input
              type="url"
              value={formData.eventLink || ''}
              onChange={(e) => setFormData({ ...formData, eventLink: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div>
            <Label className="mb-2">Responsável</Label>
            <Input
              value={formData.responsible || ''}
              onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
              placeholder="Nome do responsável"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  const renderSettingsTab = () => {
    if (entityType === 'associados') {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium">Cadastro ativo</p>
              <p className="text-sm text-muted-foreground">Associado pode acessar o sistema</p>
            </div>
            <Switch
              checked={formData.status === 'active'}
              onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'active' : 'inactive' })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium">Receber notificações</p>
              <p className="text-sm text-muted-foreground">Enviar emails sobre eventos e novidades</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium">Acesso ao aplicativo</p>
              <p className="text-sm text-muted-foreground">Permitir login no app móvel</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium">Administrador</p>
              <p className="text-sm text-muted-foreground">Acesso completo ao sistema</p>
            </div>
            <Switch />
          </div>
        </div>
      );
    }

    if (entityType === 'eventos') {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium">Evento ativo</p>
              <p className="text-sm text-muted-foreground">Visível para os associados</p>
            </div>
            <Switch
              checked={formData.status === 'active'}
              onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'active' : 'inactive' })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium">Permitir inscrições</p>
              <p className="text-sm text-muted-foreground">Associados podem se inscrever</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium">Enviar notificações</p>
              <p className="text-sm text-muted-foreground">Avisar associados sobre o evento</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div>
            <Label className="mb-2">Limite de participantes</Label>
            <Input
              type="number"
              value={formData.maxParticipants || ''}
              onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
              placeholder="0 = sem limite"
            />
          </div>
        </div>
      );
    }

    if (entityType === 'categorias') {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium">Categoria ativa</p>
              <p className="text-sm text-muted-foreground">Disponível para uso</p>
            </div>
            <Switch
              checked={formData.status === 'active'}
              onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'active' : 'inactive' })}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium">Exibir em relatórios</p>
              <p className="text-sm text-muted-foreground">Incluir nos relatórios financeiros</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium">Categoria padrão</p>
              <p className="text-sm text-muted-foreground">Selecionar automaticamente</p>
            </div>
            <Switch />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
          <div>
            <h3 className="text-xl font-semibold">Editar: {entity.name}</h3>
            <p className="text-sm text-muted-foreground">
              Atualize as informações abaixo
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
          <TabsList className="w-full">
            <TabsTrigger value="general" className="flex-1">Geral</TabsTrigger>
            {(entityType === 'associados' || entityType === 'eventos') && (
              <TabsTrigger value="contact" className="flex-1">
                {entityType === 'associados' ? 'Contato' : 'Detalhes'}
              </TabsTrigger>
            )}
            <TabsTrigger value="settings" className="flex-1">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            {renderGeneralTab()}
          </TabsContent>

          {(entityType === 'associados' || entityType === 'eventos') && (
            <TabsContent value="contact" className="mt-6">
              {renderContactTab()}
            </TabsContent>
          )}

          <TabsContent value="settings" className="mt-6">
            {renderSettingsTab()}
          </TabsContent>
        </Tabs>

        <div className="p-6 border-t border-border flex justify-end gap-3 sticky bottom-0 bg-card">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </div>
      </div>
    </div>
  );
}
