import { MessageSquare } from 'lucide-react';
import { ConfigPage } from './ConfigPage';

export function CfgNotificacoes() {
  return <ConfigPage title="Notificações" description="Configurar alertas e notificações" icon={MessageSquare} color="#34d399" />;
}
