import { X } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface ConfigSection {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

interface EntityConfigFormProps {
  section: ConfigSection;
  onClose: () => void;
}

export function EntityConfigForm({ section, onClose }: EntityConfigFormProps) {
  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSave = () => {
    alert('Configurações salvas com sucesso!');
    onClose();
  };

  const renderInfoTab = () => {
    switch (section.id) {
      case 'general':
        return (
          <div className="space-y-4">
            <div>
              <Label className="mb-2">Nome da Entidade</Label>
              <Input
                value={formData.entityName || ''}
                onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
                placeholder="Nome oficial da entidade"
              />
            </div>
            <div>
              <Label className="mb-2">Nome Fantasia</Label>
              <Input
                value={formData.fantasyName || ''}
                onChange={(e) => setFormData({ ...formData, fantasyName: e.target.value })}
                placeholder="Como a entidade é conhecida"
              />
            </div>
            <div>
              <Label className="mb-2">Descrição</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva a missão e objetivos da entidade"
                rows={4}
              />
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2">CNPJ</Label>
                <Input
                  value={formData.cnpj || ''}
                  onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                  placeholder="00.000.000/0000-00"
                />
              </div>
              <div>
                <Label className="mb-2">Inscrição Estadual</Label>
                <Input
                  value={formData.stateRegistration || ''}
                  onChange={(e) => setFormData({ ...formData, stateRegistration: e.target.value })}
                  placeholder="000.000.000.000"
                />
              </div>
            </div>
            <div>
              <Label className="mb-2">Endereço</Label>
              <Input
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Rua, número, complemento"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="mb-2">CEP</Label>
                <Input
                  value={formData.cep || ''}
                  onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                  placeholder="00000-000"
                />
              </div>
              <div>
                <Label className="mb-2">Cidade</Label>
                <Input
                  value={formData.city || ''}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Cidade"
                />
              </div>
              <div>
                <Label className="mb-2">Estado</Label>
                <Input
                  value={formData.state || ''}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="UF"
                />
              </div>
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="space-y-4">
            <div>
              <Label className="mb-2">Logo da Entidade</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <p className="text-sm text-muted-foreground mb-2">Clique para fazer upload ou arraste aqui</p>
                <p className="text-xs text-muted-foreground">PNG, JPG ou SVG (máx. 2MB)</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2">Cor Primária</Label>
                <Input
                  type="color"
                  value={formData.primaryColor || '#3B82F6'}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="h-12 px-2 cursor-pointer"
                />
              </div>
              <div>
                <Label className="mb-2">Cor Secundária</Label>
                <Input
                  type="color"
                  value={formData.secondaryColor || '#8B5CF6'}
                  onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                  className="h-12 px-2 cursor-pointer"
                />
              </div>
            </div>
          </div>
        );

      case 'legal':
        return (
          <div className="space-y-4">
            <div>
              <Label className="mb-2">Termos de Uso</Label>
              <Textarea
                value={formData.terms || ''}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                placeholder="Digite os termos de uso da plataforma..."
                rows={6}
              />
            </div>
            <div>
              <Label className="mb-2">Política de Privacidade</Label>
              <Textarea
                value={formData.privacy || ''}
                onChange={(e) => setFormData({ ...formData, privacy: e.target.value })}
                placeholder="Digite a política de privacidade..."
                rows={6}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <Label className="mb-2">Campo de Configuração</Label>
              <Input placeholder="Digite aqui..." />
            </div>
            <div>
              <Label className="mb-2">Descrição</Label>
              <Textarea rows={4} placeholder="Digite uma descrição..." />
            </div>
          </div>
        );
    }
  };

  const renderContactTab = () => {
    return (
      <div className="space-y-4">
        <div>
          <Label className="mb-2">Email Principal</Label>
          <Input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="contato@entidade.com"
          />
        </div>
        <div>
          <Label className="mb-2">Email Secundário</Label>
          <Input
            type="email"
            value={formData.secondaryEmail || ''}
            onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value })}
            placeholder="suporte@entidade.com"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-2">Telefone</Label>
            <Input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(00) 0000-0000"
            />
          </div>
          <div>
            <Label className="mb-2">WhatsApp</Label>
            <Input
              type="tel"
              value={formData.whatsapp || ''}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>
        <div>
          <Label className="mb-2">Website</Label>
          <Input
            type="url"
            value={formData.website || ''}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="https://www.entidade.com"
          />
        </div>
      </div>
    );
  };

  const renderSettingsTab = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div>
            <p className="font-medium">Manter histórico</p>
            <p className="text-sm text-muted-foreground">Armazenar todas as alterações feitas</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div>
            <p className="font-medium">Notificações por email</p>
            <p className="text-sm text-muted-foreground">Receber avisos sobre alterações importantes</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div>
            <p className="font-medium">Modo público</p>
            <p className="text-sm text-muted-foreground">Permitir visualização pública de informações básicas</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div>
            <p className="font-medium">Verificação de duas etapas</p>
            <p className="text-sm text-muted-foreground">Aumentar a segurança das configurações</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div>
            <p className="font-medium">Backup automático</p>
            <p className="text-sm text-muted-foreground">Fazer backup semanal das configurações</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    );
  };

  const Icon = section.icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${section.color} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
          <TabsList className="w-full">
            <TabsTrigger value="info" className="flex-1">Informações</TabsTrigger>
            <TabsTrigger value="contact" className="flex-1">Contato</TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-6">
            {renderInfoTab()}
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            {renderContactTab()}
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            {renderSettingsTab()}
          </TabsContent>
        </Tabs>

        <div className="p-6 border-t border-border flex justify-end gap-3 sticky bottom-0 bg-card">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar Configurações</Button>
        </div>
      </div>
    </div>
  );
}
