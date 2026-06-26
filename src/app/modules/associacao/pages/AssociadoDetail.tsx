import { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, GraduationCap, Award, Trophy, DollarSign, Wallet, Clock, X, FileText, Shield, Edit, BookOpen, ChevronRight } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

const maskCPF = (cpf: string) =>
  cpf.replace(/^(\d{3})\.\d{3}\.\d{3}-(\d{2})$/, '$1.***.***-$2');

const maskEmail = (email: string) => {
  const [user, domain] = email.split('@');
  if (!domain) return '***@***.***';
  const domParts = domain.split('.');
  return `${user[0]}***@${domParts[0][0]}***.${domParts.slice(1).join('.')}`;
};

const maskPhone = (phone: string) =>
  phone.replace(/(\(\d{2}\))\s[\d-]+(\d{4})$/, '$1 *****-$2');

const maskAddress = (address: string) => {
  const parts = address.split(',');
  if (parts.length < 2) return address;
  return `***, ${parts[parts.length - 2].trim()}, ${parts[parts.length - 1].trim()}`;
};

const initials = (name: string) => {
  const parts = name.split(' ');
  return parts.length >= 3 ? `${parts[1][0]}${parts[2][0]}` : parts.slice(1).map(p => p[0]).join('');
};

const pointsData = [
  { month: 'Jan', points: 120 }, { month: 'Fev', points: 180 },
  { month: 'Mar', points: 240 }, { month: 'Abr', points: 320 },
  { month: 'Mai', points: 450 }, { month: 'Jun', points: 580 },
];

const accessData = [
  { date: '01/06', accesses: 5 }, { date: '08/06', accesses: 8 },
  { date: '15/06', accesses: 12 }, { date: '22/06', accesses: 7 },
  { date: '29/06', accesses: 10 },
];

const payments = [
  { mes: 'Jun/2026', data: '25/06/2026', valor: 'R$ 150,00' },
  { mes: 'Mai/2026', data: '25/05/2026', valor: 'R$ 150,00' },
  { mes: 'Abr/2026', data: '25/04/2026', valor: 'R$ 150,00' },
  { mes: 'Mar/2026', data: '25/03/2026', valor: 'R$ 150,00' },
  { mes: 'Fev/2026', data: '25/02/2026', valor: 'R$ 150,00' },
  { mes: 'Jan/2026', data: '25/01/2026', valor: 'R$ 150,00' },
];

const eventsData = [
  { name: 'Congresso Brasileiro de Cardiologia 2025', local: 'Brasília, DF', date: '15–18 Abr 2025', role: 'Palestrante', roleColor: 'bg-blue-500/10 text-blue-600' },
  { name: 'Simpósio de Cardiologia Intervencionista 2024', local: 'São Paulo, SP', date: '10–12 Set 2024', role: 'Avaliador', roleColor: 'bg-purple-500/10 text-purple-600' },
  { name: 'Workshop de Ecocardiografia 2024', local: 'Rio de Janeiro, RJ', date: '5–7 Mar 2024', role: 'Congressista', roleColor: 'bg-green-500/10 text-green-600' },
  { name: 'Curso de Arritmias Avançadas 2023', local: 'Online', date: '10 Nov 2023', role: 'Aluno', roleColor: 'bg-orange-500/10 text-orange-600' },
];

const academicHistory = [
  { type: 'Graduação', course: 'Medicina', institution: 'Universidade de São Paulo (USP)', period: '2010 – 2015', status: 'Concluído' },
  { type: 'Residência', course: 'Cardiologia', institution: 'Hospital das Clínicas — FMUSP', period: '2016 – 2018', status: 'Concluído' },
  { type: 'Especialização', course: 'Cardiologia Clínica', institution: 'SBC', period: '2019', status: 'Concluído' },
  { type: 'Especialização', course: 'Ecocardiografia', institution: 'DIC/SBC', period: '2020', status: 'Concluído' },
];

const achievements = [
  { name: 'Participante Ativo', desc: '5+ eventos participados', color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
  { name: 'Pontualidade', desc: '6 meses em dia', color: 'text-green-600', bg: 'bg-green-500/10' },
  { name: 'Educação Continuada', desc: '4 cursos concluídos', color: 'text-blue-600', bg: 'bg-blue-500/10' },
  { name: 'Colaborador', desc: 'Indicou 2 novos membros', color: 'text-purple-600', bg: 'bg-purple-500/10' },
];

const activityLog = [
  { date: '03/06/2026 14:32', action: 'Acesso ao aplicativo móvel', device: 'iPhone 13' },
  { date: '03/06/2026 10:15', action: 'Acesso ao portal web', device: 'Chrome – Windows' },
  { date: '02/06/2026 09:15', action: 'Participação em webinar', device: 'Chrome – Windows' },
  { date: '01/06/2026 16:48', action: 'Visualização de documento', device: 'Chrome – Windows' },
  { date: '31/05/2026 11:22', action: 'Acesso ao portal web', device: 'Safari – macOS' },
  { date: '30/05/2026 14:00', action: 'Download de certificado', device: 'Chrome – Windows' },
];

type ModalType = 'financial' | 'events' | 'academic' | 'achievements' | 'activity' | null;

interface AssociadoDetailProps {
  associate: any;
  onBack: () => void;
  onEdit: () => void;
}

const statusColor = (s: string) => {
  if (s === 'Adimplente') return { text: 'text-green-600', border: 'border-green-500/20', bg: 'bg-green-500/10', dot: 'bg-green-500', variant: 'default' as const };
  if (s === 'Em débito') return { text: 'text-red-600', border: 'border-red-500/20', bg: 'bg-red-500/10', dot: 'bg-red-500', variant: 'destructive' as const };
  if (s === 'Pendente') return { text: 'text-yellow-600', border: 'border-yellow-500/20', bg: 'bg-yellow-500/10', dot: 'bg-yellow-500', variant: 'outline' as const };
  if (s === 'Inativo') return { text: 'text-gray-500', border: 'border-gray-500/20', bg: 'bg-gray-500/10', dot: 'bg-gray-400', variant: 'secondary' as const };
  return { text: 'text-blue-600', border: 'border-blue-500/20', bg: 'bg-blue-500/10', dot: 'bg-blue-500', variant: 'default' as const };
};

export function AssociadoDetail({ associate, onBack, onEdit }: AssociadoDetailProps) {
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const sc = statusColor(associate.status);

  const SectionBtn = ({ onClick, label }: { onClick: () => void; label: string }) => (
    <Button variant="ghost" size="sm" onClick={onClick} className="text-sm text-primary hover:text-primary/80 gap-1">
      {label} <ChevronRight className="w-3.5 h-3.5" />
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/12 via-primary/4 to-transparent pb-24 pt-7">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/6 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-1/2 w-40 h-40 bg-primary/4 rounded-full blur-2xl pointer-events-none" />

        <div className="px-8 max-w-7xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="gap-2 text-muted-foreground hover:text-foreground mb-7 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm">Voltar para lista</span>
          </Button>

          <div className="flex items-start gap-5 flex-wrap md:flex-nowrap">
            <div className="relative flex-shrink-0">
              {associate.photo ? (
                <img src={associate.photo} alt={associate.name} className="w-28 h-28 rounded-2xl object-cover ring-4 ring-background shadow-2xl" />
              ) : (
                <div className="w-28 h-28 rounded-2xl bg-primary/15 flex items-center justify-center ring-4 ring-background shadow-2xl">
                  <span className="text-3xl font-semibold text-primary">{initials(associate.name)}</span>
                </div>
              )}
              <div className={`absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-2 border-background ${sc.dot}`} title={associate.status} />
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-3xl mb-2.5 truncate">{associate.name}</h1>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={sc.variant} className={`${sc.bg} ${sc.text} ${sc.border}`}>
                  {associate.status}
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border border-blue-500/20">
                  {associate.category}
                </Badge>
                <span className="text-xs text-muted-foreground">· Membro desde {associate.joinDate}</span>
                <span className="text-xs text-muted-foreground">· CRM SP 12{associate.id}456</span>
              </div>
            </div>

            <Button onClick={onEdit} className="flex-shrink-0">
              <Edit className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          </div>
        </div>
      </div>

      {/* ── KPI Row ── */}
      <div className="px-8 -mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Trophy, bg: 'bg-yellow-500/10', color: 'text-yellow-600', label: 'Pontos', value: '580', sub: 'Nível Ouro' },
              { icon: Wallet, bg: 'bg-green-500/10', color: 'text-green-600', label: 'Cashback', value: 'R$ 234', sub: 'Disponível' },
              { icon: BookOpen, bg: 'bg-purple-500/10', color: 'text-purple-600', label: 'Cursos', value: '4', sub: 'Concluídos' },
              { icon: Calendar, bg: 'bg-blue-500/10', color: 'text-blue-600', label: 'Eventos', value: '8', sub: 'Participações' },
            ].map(kpi => {
              const Icon = kpi.icon;
              return (
                <Card key={kpi.label} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${kpi.color}`} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{kpi.label}</p>
                        <p className="text-lg font-semibold leading-tight">{kpi.value}</p>
                        <p className="text-xs text-muted-foreground">{kpi.sub}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Dashboard Grid ── */}
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Financial */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" /> Financeiro
                  </h3>
                  <SectionBtn onClick={() => setOpenModal('financial')} label="Ver histórico" />
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-green-500/8 rounded-xl p-3.5 border border-green-500/15">
                    <p className="text-xs text-muted-foreground mb-0.5">Total pago 2026</p>
                    <p className="text-xl font-semibold text-green-600">R$ 900</p>
                  </div>
                  <div className="bg-blue-500/8 rounded-xl p-3.5 border border-blue-500/15">
                    <p className="text-xs text-muted-foreground mb-0.5">Próximo venc.</p>
                    <p className="text-xl font-semibold text-blue-600">15/07</p>
                  </div>
                  <div className="bg-muted/40 rounded-xl p-3.5">
                    <p className="text-xs text-muted-foreground mb-0.5">Cashback acum.</p>
                    <p className="text-xl font-semibold">R$ 234</p>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {payments.slice(0, 3).map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5">
                      <div>
                        <p className="text-sm font-medium">Anuidade {p.mes}</p>
                        <p className="text-xs text-muted-foreground">Pago em {p.data}</p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <p className="text-sm font-semibold text-green-600">{p.valor}</p>
                        <Badge variant="secondary" className="bg-green-500/10 text-green-600">Pago</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Events */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" /> Eventos
                  </h3>
                  <SectionBtn onClick={() => setOpenModal('events')} label="Ver todos" />
                </div>
                <div className="space-y-3">
                  {eventsData.slice(0, 3).map((e, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-primary">
                        #{i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{e.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{e.local} · {e.date}</p>
                      </div>
                      <Badge variant="secondary" className={`flex-shrink-0 ${e.roleColor}`}>{e.role}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Academic */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-600" /> Formação Acadêmica
                  </h3>
                  <SectionBtn onClick={() => setOpenModal('academic')} label="Ver completa" />
                </div>
                <div className="space-y-4">
                  {academicHistory.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <p className="text-sm font-medium">{item.course}</p>
                          <span className="text-xs text-muted-foreground">({item.type})</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.institution} · {item.period}</p>
                      </div>
                      <Badge variant="secondary" className={`flex-shrink-0 ${
                        item.status === 'Concluído' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'
                      }`}>{item.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-5">

            {/* Contact */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm">Contato</h3>
                  <Button variant="ghost" size="sm" onClick={onEdit} className="text-xs text-primary hover:underline gap-1">
                    <Edit className="w-3 h-3" /> Editar
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Mail className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-xs break-all">{associate.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs">{associate.phone}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-xs">{associate.address}</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground mb-0.5">CPF</p>
                    <p className="font-mono font-medium">{associate.cpf}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5">Anuidade</p>
                    <p className="font-medium">{associate.annuity}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-green-600 bg-green-500/5 border border-green-500/15 rounded-lg px-2.5 py-2">
                  <Shield className="w-3 h-3 text-green-500 flex-shrink-0" />
                  <span>Perfil individual · dados completos</span>
                </div>
              </CardContent>
            </Card>

            {/* Gamification */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm">Gamificação</h3>
                  <SectionBtn onClick={() => setOpenModal('achievements')} label="Ver conquistas" />
                </div>
                <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/5 rounded-xl p-3.5 mb-4 border border-yellow-500/15">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-semibold">Nível Ouro</span>
                    <span className="text-xs text-muted-foreground ml-auto">580 pts</span>
                  </div>
                  <div className="w-full bg-yellow-500/20 rounded-full h-1.5 mb-1">
                    <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '72.5%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground">220 pts para Platina (800)</p>
                </div>
                <div className="space-y-2.5">
                  {achievements.slice(0, 3).map((a, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0`}>
                        <Award className={`w-3.5 h-3.5 ${a.color}`} />
                      </div>
                      <div>
                        <p className="text-xs font-medium">{a.name}</p>
                        <p className="text-xs text-muted-foreground">{a.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm">Atividade Recente</h3>
                  <SectionBtn onClick={() => setOpenModal('activity')} label="Ver tudo" />
                </div>
                <div className="space-y-3">
                  {activityLog.slice(0, 4).map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium leading-tight">{item.action}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.date.split(' ')[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[88vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-shrink-0">
              <h3 className="font-semibold text-lg">
                {openModal === 'financial' && 'Histórico Financeiro'}
                {openModal === 'events' && 'Participação em Eventos'}
                {openModal === 'academic' && 'Formação Acadêmica Completa'}
                {openModal === 'achievements' && 'Conquistas e Gamificação'}
                {openModal === 'activity' && 'Histórico de Atividades'}
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setOpenModal(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-6 overflow-y-auto">

              {openModal === 'financial' && (
                <div>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-green-500/10 rounded-xl p-3 border border-green-500/15 text-center">
                      <p className="text-xs text-muted-foreground">Total 2026</p>
                      <p className="text-xl font-semibold text-green-600">R$ 900</p>
                    </div>
                    <div className="bg-blue-500/10 rounded-xl p-3 border border-blue-500/15 text-center">
                      <p className="text-xs text-muted-foreground">Meses em Dia</p>
                      <p className="text-xl font-semibold text-blue-600">6</p>
                    </div>
                    <div className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/15 text-center">
                      <p className="text-xs text-muted-foreground">Cashback</p>
                      <p className="text-xl font-semibold text-purple-600">R$ 234</p>
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold mb-3">Evolução de Pontos</h4>
                  <div className="bg-muted/20 rounded-xl p-4 mb-5">
                    <ResponsiveContainer width="100%" height={150}>
                      <AreaChart data={pointsData}>
                        <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} /><stop offset="95%" stopColor="#22c55e" stopOpacity={0} /></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="points" stroke="#22c55e" strokeWidth={2} fill="url(#pg)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <h4 className="text-sm font-semibold mb-3">Pagamentos</h4>
                  <div className="space-y-2">
                    {payments.map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                        <div>
                          <p className="text-sm font-medium">Anuidade {p.mes}</p>
                          <p className="text-xs text-muted-foreground">Pago em {p.data}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-600">{p.valor}</p>
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600">Pago</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {openModal === 'events' && (
                <div className="space-y-3">
                  {eventsData.map((e, i) => (
                    <div key={i} className="p-4 bg-muted/30 rounded-xl">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-sm">{e.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{e.local} · {e.date}</p>
                        </div>
                        <Badge variant="secondary" className={`flex-shrink-0 ${e.roleColor}`}>{e.role}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {openModal === 'academic' && (
                <div>
                  <div className="space-y-4 mb-6">
                    {academicHistory.map((item, i) => (
                      <div key={i} className="border-l-2 border-primary pl-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <p className="font-medium text-sm">{item.course}</p>
                          <Badge variant="secondary" className={`${
                            item.status === 'Concluído' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'
                          }`}>{item.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.type} · {item.institution}</p>
                        <p className="text-xs text-muted-foreground">{item.period}</p>
                      </div>
                    ))}
                  </div>
                  <h4 className="text-sm font-semibold mb-3">Documentos Acadêmicos</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['Diploma de Graduação', 'Cert. de Residência', 'Cert. Especialização', 'Título SBC'].map((doc, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-3 bg-muted/30 rounded-xl">
                        <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium">{doc}</p>
                          <p className="text-xs text-muted-foreground">PDF · Verificado</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {openModal === 'achievements' && (
                <div>
                  <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/5 rounded-xl p-4 border border-yellow-500/15 mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold">Nível Ouro · 580 pts</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Próx: Platina (800)</span>
                    </div>
                    <div className="w-full bg-yellow-500/20 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '72.5%' }} />
                    </div>
                  </div>
                  <div className="bg-muted/20 rounded-xl p-4 mb-5">
                    <ResponsiveContainer width="100%" height={130}>
                      <AreaChart data={pointsData}>
                        <defs><linearGradient id="pg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#eab308" stopOpacity={0.3} /><stop offset="95%" stopColor="#eab308" stopOpacity={0} /></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="points" stroke="#eab308" strokeWidth={2} fill="url(#pg2)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <h4 className="text-sm font-semibold mb-3">Conquistas desbloqueadas</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {achievements.map((a, i) => (
                      <div key={i} className={`p-3.5 rounded-xl ${a.bg}`}>
                        <Award className={`w-5 h-5 ${a.color} mb-2`} />
                        <p className="text-sm font-medium">{a.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {openModal === 'activity' && (
                <div>
                  <div className="bg-muted/20 rounded-xl p-4 mb-5">
                    <p className="text-xs font-medium text-muted-foreground mb-3">Acessos – últimos 30 dias</p>
                    <ResponsiveContainer width="100%" height={130}>
                      <LineChart data={accessData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="date" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="accesses" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb', r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    {activityLog.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-xl">
                        <Clock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">{item.action}</p>
                          <p className="text-xs text-muted-foreground">{item.date} · {item.device}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
