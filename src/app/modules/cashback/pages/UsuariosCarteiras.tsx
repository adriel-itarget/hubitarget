import { useState } from 'react';
import { Search, Wallet, Star, Trophy, ArrowUpRight, ArrowDownLeft, Gift } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/app/components/ui/sheet';
import { Progress } from '@/app/components/ui/progress';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';

type Nivel = 'bronze' | 'prata' | 'ouro' | 'platina' | 'diamante';

interface NivelConfig { label: string; color: string; bgColor: string; borderColor: string; pontosMin: number; pontosMax: number }

const NIVEL: Record<Nivel, NivelConfig> = {
  bronze:   { label: 'Bronze',   color: '#92400e', bgColor: '#fef3c7', borderColor: '#fbbf2433', pontosMin: 0,    pontosMax: 500   },
  prata:    { label: 'Prata',    color: '#475569', bgColor: '#f1f5f9', borderColor: '#94a3b833', pontosMin: 501,  pontosMax: 1500  },
  ouro:     { label: 'Ouro',     color: '#b45309', bgColor: '#fffbeb', borderColor: '#fcd34d33', pontosMin: 1501, pontosMax: 3000  },
  platina:  { label: 'Platina',  color: '#0e7490', bgColor: '#ecfeff', borderColor: '#22d3ee33', pontosMin: 3001, pontosMax: 5000  },
  diamante: { label: 'Diamante', color: '#6d28d9', bgColor: '#f5f3ff', borderColor: '#a78bfa33', pontosMin: 5001, pontosMax: 99999 },
};
const NIVEL_ORDER: Nivel[] = ['bronze', 'prata', 'ouro', 'platina', 'diamante'];

function getNivel(pontos: number): Nivel {
  if (pontos >= 5001) return 'diamante';
  if (pontos >= 3001) return 'platina';
  if (pontos >= 1501) return 'ouro';
  if (pontos >= 501)  return 'prata';
  return 'bronze';
}
function getProgresso(pontos: number, nivel: Nivel): number {
  const cfg = NIVEL[nivel];
  if (nivel === 'diamante') return 100;
  return Math.min(100, Math.max(0, Math.round(((pontos - cfg.pontosMin) / (cfg.pontosMax - cfg.pontosMin)) * 100)));
}

interface Usuario {
  id: number; nome: string; email: string; avatar: string;
  saldoCash: number; saldoPontos: number; campanhasAtivas: number;
  ultimaMovimentacao: string; status: 'ativo' | 'inativo';
}

const mockUsuarios: Usuario[] = [
  { id: 1,  nome: 'Dr. Carlos Eduardo Silva',   email: 'carlos.silva@sbcardio.org.br',    avatar: 'CE', saldoCash: 245.50,  saldoPontos: 1840, campanhasAtivas: 2, ultimaMovimentacao: '03/06/2026', status: 'ativo'   },
  { id: 2,  nome: 'Dra. Ana Paula Ferreira',     email: 'ana.ferreira@sbcardio.org.br',    avatar: 'AP', saldoCash: 89.20,   saldoPontos: 620,  campanhasAtivas: 1, ultimaMovimentacao: '01/06/2026', status: 'ativo'   },
  { id: 3,  nome: 'Dr. Roberto Mendes Costa',    email: 'roberto.costa@sbcardio.org.br',   avatar: 'RM', saldoCash: 512.80,  saldoPontos: 3250, campanhasAtivas: 3, ultimaMovimentacao: '04/06/2026', status: 'ativo'   },
  { id: 4,  nome: 'Dra. Mariana Oliveira',       email: 'mariana.oliveira@sbcardio.org.br',avatar: 'MO', saldoCash: 0,       saldoPontos: 150,  campanhasAtivas: 0, ultimaMovimentacao: '15/05/2026', status: 'inativo' },
  { id: 5,  nome: 'Dr. Fernando Lima Santos',    email: 'fernando.santos@sbcardio.org.br', avatar: 'FL', saldoCash: 1200.00, saldoPontos: 5620, campanhasAtivas: 3, ultimaMovimentacao: '05/06/2026', status: 'ativo'   },
  { id: 6,  nome: 'Dra. Juliana Pereira',        email: 'juliana.pereira@sbcardio.org.br', avatar: 'JP', saldoCash: 75.00,   saldoPontos: 890,  campanhasAtivas: 1, ultimaMovimentacao: '02/06/2026', status: 'ativo'   },
  { id: 7,  nome: 'Dr. Paulo Rodrigues',         email: 'paulo.rodrigues@sbcardio.org.br', avatar: 'PR', saldoCash: 320.50,  saldoPontos: 2100, campanhasAtivas: 2, ultimaMovimentacao: '31/05/2026', status: 'ativo'   },
  { id: 8,  nome: 'Dra. Beatriz Almeida',        email: 'beatriz.almeida@sbcardio.org.br', avatar: 'BA', saldoCash: 45.00,   saldoPontos: 310,  campanhasAtivas: 1, ultimaMovimentacao: '28/05/2026', status: 'ativo'   },
  { id: 9,  nome: 'Dr. Marcelo Teixeira',        email: 'marcelo.teixeira@sbcardio.org.br',avatar: 'MT', saldoCash: 680.00,  saldoPontos: 4100, campanhasAtivas: 3, ultimaMovimentacao: '04/06/2026', status: 'ativo'   },
  { id: 10, nome: 'Dra. Renata Carvalho',        email: 'renata.carvalho@sbcardio.org.br', avatar: 'RC', saldoCash: 130.00,  saldoPontos: 1100, campanhasAtivas: 2, ultimaMovimentacao: '03/06/2026', status: 'ativo'   },
];

const mockTransacoes: Record<number, { data: string; desc: string; tipo: 'credito' | 'debito'; valor: string; moeda: 'cash' | 'pontos' }[]> = {
  1: [
    { data: '03/06', desc: 'Cashback Anuidade 2026', tipo: 'credito', valor: '+R$ 45,00',  moeda: 'cash'   },
    { data: '01/06', desc: 'Resgate via PIX',         tipo: 'debito',  valor: '-R$ 100,00', moeda: 'cash'   },
    { data: '15/05', desc: 'Bônus Congresso',         tipo: 'credito', valor: '+320 pts',   moeda: 'pontos' },
    { data: '01/05', desc: 'Cashback Curso Online',   tipo: 'credito', valor: '+R$ 18,50',  moeda: 'cash'   },
  ],
  3: [
    { data: '04/06', desc: 'Cashback Anuidade 2026', tipo: 'credito', valor: '+R$ 45,00',  moeda: 'cash'   },
    { data: '02/06', desc: 'Cashback Congresso',      tipo: 'credito', valor: '+R$ 200,00', moeda: 'cash'   },
    { data: '01/06', desc: 'Acúmulo Cursos',          tipo: 'credito', valor: '+250 pts',   moeda: 'pontos' },
  ],
  5: [
    { data: '05/06', desc: 'Cashback Anuidade 2026', tipo: 'credito', valor: '+R$ 45,00',  moeda: 'cash'   },
    { data: '03/06', desc: 'Bônus Nível Diamante',    tipo: 'credito', valor: '+R$ 200,00', moeda: 'cash'   },
    { data: '01/06', desc: 'Cashback Congresso',      tipo: 'credito', valor: '+R$ 500,00', moeda: 'cash'   },
    { data: '28/05', desc: 'Resgate PIX',             tipo: 'debito',  valor: '-R$ 300,00', moeda: 'cash'   },
  ],
  9: [
    { data: '04/06', desc: 'Cashback Anuidade',      tipo: 'credito', valor: '+R$ 45,00',  moeda: 'cash'   },
    { data: '03/06', desc: 'Bônus Platinum Boost',   tipo: 'credito', valor: '+R$ 380,00', moeda: 'cash'   },
    { data: '01/06', desc: 'Acúmulo Eventos',        tipo: 'credito', valor: '+950 pts',   moeda: 'pontos' },
  ],
};

function NivelBadge({ nivel }: { nivel: Nivel }) {
  const cfg = NIVEL[nivel];
  return (
    <Badge variant="outline" className="text-xs font-semibold"
      style={{ color: cfg.color, backgroundColor: cfg.bgColor, borderColor: cfg.borderColor }}>
      <Trophy className="w-3 h-3 mr-1" />
      {cfg.label}
    </Badge>
  );
}

function MiniProfile({ usuario, open, onClose }: { usuario: Usuario; open: boolean; onClose: () => void }) {
  const nivel = getNivel(usuario.saldoPontos);
  const progresso = getProgresso(usuario.saldoPontos, nivel);
  const nivelIdx = NIVEL_ORDER.indexOf(nivel);
  const proximoNivel = nivelIdx < NIVEL_ORDER.length - 1 ? NIVEL_ORDER[nivelIdx + 1] : null;
  const transacoes = mockTransacoes[usuario.id] || [];
  const nivelCfg = NIVEL[nivel];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[380px] sm:max-w-[380px] p-0">
        <SheetHeader className="p-5 border-b border-border">
          <SheetTitle>Perfil da Carteira</SheetTitle>
        </SheetHeader>

        <div className="p-5 border-b border-border">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-lg font-bold text-white" style={{ backgroundColor: nivelCfg.color }}>
                {usuario.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{usuario.nome}</p>
              <p className="text-sm text-muted-foreground truncate">{usuario.email}</p>
              <div className="mt-1.5"><NivelBadge nivel={nivel} /></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>{nivelCfg.label}</span>
              {proximoNivel
                ? <span>Próximo: {NIVEL[proximoNivel].label} ({NIVEL[proximoNivel].pontosMin} pts)</span>
                : <span>Nível máximo</span>}
            </div>
            <Progress value={progresso} className="h-2" style={{ '--progress-color': nivelCfg.color } as React.CSSProperties} />
            <p className="text-xs text-muted-foreground mt-1">{usuario.saldoPontos.toLocaleString()} pts acumulados · {progresso}% para o próximo nível</p>
          </div>
        </div>

        <div className="p-5 border-b border-border grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-xl p-3 border border-border">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Wallet className="w-3.5 h-3.5" /><span className="text-xs">Saldo Cash</span>
            </div>
            <p className="font-semibold text-green-600">
              {usuario.saldoCash.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 border border-border">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Star className="w-3.5 h-3.5" /><span className="text-xs">Saldo Pontos</span>
            </div>
            <p className="font-semibold text-violet-600">{usuario.saldoPontos.toLocaleString()} pts</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-3 border border-border col-span-2">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Gift className="w-3.5 h-3.5" /><span className="text-xs">Campanhas Ativas</span>
            </div>
            <p className="font-semibold">{usuario.campanhasAtivas} campanha{usuario.campanhasAtivas !== 1 ? 's' : ''}</p>
            <p className="text-xs text-muted-foreground">Última movimentação: {usuario.ultimaMovimentacao}</p>
          </div>
        </div>

        <div className="p-5 flex-1">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Últimas Movimentações</h4>
          {transacoes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">Nenhuma movimentação registrada</p>
          ) : (
            <div className="space-y-1">
              {transacoes.map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    t.tipo === 'credito' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    {t.tipo === 'credito'
                      ? <ArrowUpRight className="w-4 h-4 text-green-600" />
                      : <ArrowDownLeft className="w-4 h-4 text-red-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{t.desc}</p>
                    <p className="text-xs text-muted-foreground">{t.data}</p>
                  </div>
                  <span className={`text-sm font-semibold flex-shrink-0 ${t.tipo === 'credito' ? 'text-green-600' : 'text-red-500'}`}>
                    {t.valor}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function UsuariosCarteiras() {
  const [search, setSearch] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [filtroNivel, setFiltroNivel] = useState<string>('todos');
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  const filtered = mockUsuarios.filter(u => {
    const matchSearch = !search || u.nome.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filtroStatus === 'todos' || u.status === filtroStatus;
    const matchNivel = filtroNivel === 'todos' || getNivel(u.saldoPontos) === filtroNivel;
    return matchSearch && matchStatus && matchNivel;
  });

  const totalCash = mockUsuarios.reduce((a, u) => a + u.saldoCash, 0);
  const totalPontos = mockUsuarios.reduce((a, u) => a + u.saldoPontos, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Usuários e Carteiras</h1>
              <p className="text-muted-foreground">Saldos, pontuação e níveis de gamificação</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground mb-1">Total de Usuários</p>
                <p className="text-2xl font-semibold">{mockUsuarios.length}</p>
                <p className="text-xs text-muted-foreground">{mockUsuarios.filter(u => u.status === 'ativo').length} ativos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1"><Wallet className="w-3.5 h-3.5" /><p className="text-xs">Total em Cash</p></div>
                <p className="text-2xl font-semibold text-green-600">
                  {totalCash.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1"><Star className="w-3.5 h-3.5" /><p className="text-xs">Total em Pontos</p></div>
                <p className="text-2xl font-semibold text-violet-600">{totalPontos.toLocaleString()} pts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1"><Trophy className="w-3.5 h-3.5" /><p className="text-xs">Por Nível</p></div>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {NIVEL_ORDER.map(n => {
                    const count = mockUsuarios.filter(u => getNivel(u.saldoPontos) === n).length;
                    if (!count) return null;
                    return (
                      <Badge key={n} variant="outline" className="text-xs font-semibold"
                        style={{ color: NIVEL[n].color, backgroundColor: NIVEL[n].bgColor }}>
                        {NIVEL[n].label[0]}{count}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3 mb-5 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar usuário..."
                className="pl-9" />
            </div>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroNivel} onValueChange={setFiltroNivel}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os níveis</SelectItem>
                {NIVEL_ORDER.map(n => (
                  <SelectItem key={n} value={n}>{NIVEL[n].label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground text-sm">Nenhum usuário encontrado</div>
              ) : (
                <div className="divide-y divide-border">
                  {filtered.map(u => {
                    const nivel = getNivel(u.saldoPontos);
                    const progresso = getProgresso(u.saldoPontos, nivel);
                    const nivelCfg = NIVEL[nivel];
                    return (
                      <div key={u.id} onClick={() => setSelectedUser(u)}
                        className="flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors cursor-pointer group">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="text-sm font-bold text-white" style={{ backgroundColor: nivelCfg.color }}>
                            {u.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">{u.nome}</p>
                          <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                        </div>
                        <div className="hidden md:flex flex-col items-end gap-1 w-32 flex-shrink-0">
                          <NivelBadge nivel={nivel} />
                          <Progress value={progresso} className="h-1 w-full" />
                        </div>
                        <div className="hidden lg:block text-right w-28 flex-shrink-0">
                          <div className="flex items-center justify-end gap-1 text-muted-foreground mb-0.5">
                            <Wallet className="w-3 h-3" /><span className="text-xs">Cash</span>
                          </div>
                          <p className="text-sm font-semibold text-green-600">
                            {u.saldoCash.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </p>
                        </div>
                        <div className="text-right w-28 flex-shrink-0">
                          <div className="flex items-center justify-end gap-1 text-muted-foreground mb-0.5">
                            <Star className="w-3 h-3" /><span className="text-xs">Pontos</span>
                          </div>
                          <p className="text-sm font-semibold text-violet-600">{u.saldoPontos.toLocaleString()} pts</p>
                        </div>
                        <div className="flex-shrink-0">
                          <Badge variant={u.status === 'ativo' ? 'default' : 'secondary'}>
                            {u.status === 'ativo' ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {selectedUser && <MiniProfile usuario={selectedUser} open={!!selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
}
