import { Settings } from 'lucide-react';
import { ConfigPage } from './ConfigPage';

export function CfgConfig() {
  return <ConfigPage title="Configurações" description="Configurações gerais do sistema" icon={Settings} color="#34d399" />;
}
