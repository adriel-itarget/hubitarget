import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sun, Moon, ChevronLeft, ChevronRight, Check, X, AlertCircle, Info, CheckCircle, AlertTriangle,
  Plus, Pencil, Trash2, Eye, EyeOff, Lock, Mail, User, Users, Calendar, DollarSign,
  Gift, BookOpen, ClipboardList, LayoutGrid, Star, Download, Search, Home, Settings,
  Package, Wallet, Trophy, Zap, Loader2, ExternalLink, Copy, ArrowUpRight, Bell,
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useAppTheme } from '../components/AppThemeContext';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Checkbox } from '@/app/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Progress } from '@/app/components/ui/progress';
import { Separator } from '@/app/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';

// ── Syntax Highlighter ────────────────────────────────────────────────────────
function esc(s: string) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
const w = (c: string) => (s: string) => `<span style="color:${c}">${s}</span>`;
const kw = w('#cba6f7'); const st = w('#a6e3a1'); const nu = w('#fab387');
const cm = w('#6c7086'); const co = w('#89b4fa'); const at = w('#89dceb');
const ln = (n: number) => `<span style="color:#45475a;user-select:none;display:inline-block;width:2rem;text-align:right;margin-right:1rem">${n+1}</span>`;

function highlight(raw: string): string {
  const KWS = 'import|export|from|const|let|var|function|return|type|interface|default|extends|new|true|false|null|undefined|typeof|if|else|async|await';
  return raw.split('\n').map((line, i) => {
    const tr = line.trimStart();
    if (tr.startsWith('//')) return ln(i) + cm(esc(line));
    const slots: string[] = [];
    let out = esc(line).replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)/g, m => {
      slots.push(st(m)); return `꧁${slots.length-1}꧂`;
    });
    out = out.replace(/(&lt;\/?)(([A-Z][a-zA-Z]*))/g, (_, lt, name) => lt + co(name));
    out = out.replace(new RegExp(`\\b(${KWS})\\b`,'g'), m => kw(m));
    out = out.replace(/\b(\d+(?:\.\d+)?)\b(?![a-zA-Z-])/g, m => nu(m));
    out = out.replace(/꧁(\d+)꧂/g, (_,idx) => slots[+idx]);
    return ln(i) + out;
  }).join('\n');
}

// ── ComponentBlock ─────────────────────────────────────────────────────────────
interface ComponentBlockProps {
  title: string; description?: string; code: string;
  children: React.ReactNode; centered?: boolean; noPad?: boolean;
}
function ComponentBlock({ title, description, code, children, centered, noPad }: ComponentBlockProps) {
  const [view, setView] = useState<'preview'|'code'>('preview');
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/60 border-b border-border">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold truncate">{title}</span>
          {description && <span className="text-xs text-muted-foreground hidden sm:inline truncate">{description}</span>}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
          {(['preview','code'] as const).map(v => (
            <button key={v} onClick={()=>setView(v)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${view===v ? 'bg-background text-foreground shadow-sm border border-border' : 'text-muted-foreground hover:text-foreground'}`}>
              {v === 'preview' ? 'Preview' : 'Código'}
            </button>
          ))}
        </div>
      </div>
      {view === 'preview' && (
        <div className={`bg-background ${noPad ? '' : 'p-6'} ${centered ? 'flex items-center justify-center min-h-[120px]' : ''}`}>
          {children}
        </div>
      )}
      {view === 'code' && (
        <div className="relative">
          <button onClick={copy} className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg transition-colors"
            style={{ background:'rgba(255,255,255,0.08)', color: copied ? '#a6e3a1' : '#cdd6f4' }}>
            {copied ? <Check className="w-3.5 h-3.5"/> : <Copy className="w-3.5 h-3.5"/>}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
          <pre className="overflow-x-auto text-xs leading-6 p-4 pt-5"
            style={{ background:'#1e1e2e', color:'#cdd6f4', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', minHeight: 80 }}>
            <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
          </pre>
        </div>
      )}
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
const NAV = [
  {id:'cores',label:'Cores'},{id:'tipografia',label:'Tipografia'},
  {id:'espacamento',label:'Espaçamento'},{id:'icones',label:'Ícones'},
  {id:'componentes',label:'Componentes'},
];
function SectionTitle({id,children}:{id:string;children:React.ReactNode}){
  return <h2 id={id} className="text-2xl font-semibold mb-1 scroll-mt-20">{children}</h2>;
}
function SubTitle({children}:{children:React.ReactNode}){
  return <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 mt-8">{children}</h3>;
}
function Code({children}:{children:React.ReactNode}){
  return <span className="font-mono text-[11px] bg-muted px-1.5 py-0.5 rounded border border-border">{children}</span>;
}

// ── Chart data ─────────────────────────────────────────────────────────────────
const chartData = [
  {n:'Jan',a:40,b:24},{n:'Fev',a:55,b:38},{n:'Mar',a:48,b:42},
  {n:'Abr',a:70,b:50},{n:'Mai',a:62,b:55},{n:'Jun',a:80,b:60},
];
const pieData = [
  {name:'Ativos',value:524,color:'#22c55e'},{name:'Inativos',value:183,color:'#94a3b8'},
  {name:'Aviso',value:89,color:'#f59e0b'},{name:'Erro',value:42,color:'#ef4444'},
];
const STATUS = [
  {label:'Sucesso',bg:'bg-green-500/10',border:'border-green-500/30',text:'text-green-600',Icon:CheckCircle},
  {label:'Informação',bg:'bg-blue-500/10',border:'border-blue-500/30',text:'text-blue-600',Icon:Info},
  {label:'Aviso',bg:'bg-amber-500/10',border:'border-amber-500/30',text:'text-amber-600',Icon:AlertTriangle},
  {label:'Erro',bg:'bg-red-500/10',border:'border-red-500/30',text:'text-red-600',Icon:AlertCircle},
];
const MODULE_COLORS = [
  {label:'Associação',color:'#60a5fa',Icon:Users},{label:'Financeiro',color:'#34d399',Icon:DollarSign},
  {label:'Exames',color:'#818cf8',Icon:ClipboardList},{label:'Cursos',color:'#a78bfa',Icon:BookOpen},
  {label:'Cashback',color:'#fbbf24',Icon:Gift},{label:'Eventos',color:'#fb7185',Icon:Calendar},
  {label:'Hub',color:'#94a3b8',Icon:LayoutGrid},
];
const GAMIFICATION = [
  {label:'Bronze',color:'#92400e',bg:'#fef3c7'},{label:'Prata',color:'#475569',bg:'#f1f5f9'},
  {label:'Ouro',color:'#b45309',bg:'#fffbeb'},{label:'Platina',color:'#0e7490',bg:'#ecfeff'},
  {label:'Diamante',color:'#6d28d9',bg:'#f5f3ff'},
];

// ── Code snippets (shadcn/ui) ─────────────────────────────────────────────────
const CODES: Record<string, string> = {
button: `import { Button } from '@/app/components/ui/button';

// Primário
<Button>Primário</Button>

// Variantes
<Button variant="secondary">Secundário</Button>
<Button variant="destructive">Destrutivo</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button disabled>Desativado</Button>

// Tamanhos
<Button size="sm">Pequeno</Button>
<Button size="default">Padrão</Button>
<Button size="lg">Grande</Button>
<Button size="icon"><Plus className="w-4 h-4" /></Button>

// Com ícone
<Button><Plus className="w-4 h-4 mr-2" /> Adicionar</Button>`,

input: `import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

// Campo padrão
<Input placeholder="Digite algo..." />

// Com label
<Label>Nome</Label>
<Input placeholder="Nome completo" />

// Senha com toggle
<Input type="password" placeholder="••••••••" />

// Desativado
<Input disabled value="Valor fixo" />`,

textarea: `import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';

<Label>Observações</Label>
<Textarea placeholder="Digite suas observações..." rows={4} />`,

select: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
  from '@/app/components/ui/select';

<Select>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Selecione..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="sp">São Paulo</SelectItem>
    <SelectItem value="rj">Rio de Janeiro</SelectItem>
    <SelectItem value="mg">Minas Gerais</SelectItem>
  </SelectContent>
</Select>`,

card: `import { Card, CardContent, CardHeader, CardTitle }
  from '@/app/components/ui/card';

// Card básico
<Card>
  <CardContent className="p-6">
    <h4>Título do Card</h4>
    <p className="text-sm text-muted-foreground">
      Descrição do conteúdo.
    </p>
  </CardContent>
</Card>

// Card com header
<Card>
  <CardHeader>
    <CardTitle>Métricas</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-2xl font-semibold">1.284</p>
    <p className="text-sm text-muted-foreground">Total</p>
  </CardContent>
</Card>`,

badge: `import { Badge } from '@/app/components/ui/badge';

// Variantes
<Badge>Padrão</Badge>
<Badge variant="secondary">Secundário</Badge>
<Badge variant="destructive">Destrutivo</Badge>
<Badge variant="outline">Outline</Badge>

// Status (uso comum)
<Badge variant="default">Inscrições Abertas</Badge>
<Badge variant="secondary">Em Andamento</Badge>
<Badge variant="outline">Planejamento</Badge>`,

avatar: `import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';

// Avatar com iniciais
<Avatar className="w-10 h-10">
  <AvatarFallback>CE</AvatarFallback>
</Avatar>

// Avatar grande
<Avatar className="w-14 h-14">
  <AvatarFallback className="text-lg">RM</AvatarFallback>
</Avatar>`,

table: `import { Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow } from '@/app/components/ui/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Ação</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Dr. Carlos</TableCell>
      <TableCell><Badge>Ativo</Badge></TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm">Editar</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`,

dialog: `import { Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título do Modal</DialogTitle>
    </DialogHeader>
    <p className="text-sm text-muted-foreground">
      Conteúdo do modal aqui.
    </p>
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancelar
      </Button>
      <Button onClick={() => setOpen(false)}>
        Confirmar
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,

formControls: `import { Checkbox } from '@/app/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';

// Checkbox
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Aceito os termos</Label>
</div>

// Radio Group
<RadioGroup defaultValue="option-a">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-a" id="r1" />
    <Label htmlFor="r1">Opção A</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-b" id="r2" />
    <Label htmlFor="r2">Opção B</Label>
  </div>
</RadioGroup>`,

progress: `import { Progress } from '@/app/components/ui/progress';

// Barra de progresso
<Progress value={68} className="h-2" />

// Com valor explícito
<div className="space-y-1">
  <div className="flex justify-between text-xs">
    <span>Progresso</span><span>68%</span>
  </div>
  <Progress value={68} className="h-2" />
</div>`,

tabs: `import { Tabs, TabsContent, TabsList, TabsTrigger }
  from '@/app/components/ui/tabs';

<Tabs defaultValue="dashboard">
  <TabsList>
    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
    <TabsTrigger value="associados">Associados</TabsTrigger>
    <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
  </TabsList>
  <TabsContent value="dashboard">
    Conteúdo do dashboard
  </TabsContent>
  <TabsContent value="associados">
    Conteúdo de associados
  </TabsContent>
</Tabs>`,

sheet: `import { Sheet, SheetContent, SheetHeader,
  SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { Button } from '@/app/components/ui/button';

<Sheet>
  <SheetTrigger asChild>
    <Button>Abrir Painel</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Título do Painel</SheetTitle>
    </SheetHeader>
    <div className="py-4">
      Conteúdo do painel lateral
    </div>
  </SheetContent>
</Sheet>`,

separator: `import { Separator } from '@/app/components/ui/separator';

<Separator />

// Vertical
<div className="flex h-4 items-center">
  <Separator orientation="vertical" className="h-4" />
</div>`,

search: `import { Input } from '@/app/components/ui/input';
import { Search } from 'lucide-react';

// Barra de busca com ícone
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2
    w-4 h-4 text-muted-foreground" />
  <Input placeholder="Buscar associados..." className="pl-9" />
</div>`,

charts: `import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

// BarChart
<ResponsiveContainer width="100%" height={200}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
    <XAxis dataKey="n" tick={{ fontSize: 12 }} />
    <YAxis tick={{ fontSize: 11 }} />
    <Tooltip />
    <Bar dataKey="a" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
  </BarChart>
</ResponsiveContainer>

// AreaChart / LineChart / PieChart
// (mesma estrutura, trocar o componente raiz)`,

moduleIcon: `// Badge de módulo — usado nas abas e cards do sistema
const color = '#60a5fa';

// Badge pill
<span className="inline-flex items-center gap-1.5 px-2.5 py-1
  rounded-lg text-xs font-medium"
  style={{ backgroundColor: \`\${color}18\`,
    border: \`1px solid \${color}33\`, color }}>
  <Users className="w-3 h-3" /> Associação
</span>`,

gamification: `// Nível de gamificação — Cashback
import { Trophy } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';

// Badge de nível
<Badge variant="outline"
  className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
  <Trophy className="w-3 h-3 mr-1" /> Nível Ouro
</Badge>

// Barra de progresso de nível
<Progress value={72} className="h-2" />`,

emptyState: `import { Package, Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

<div className="flex flex-col items-center py-12 text-center">
  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center
    justify-center mb-3">
    <Package className="w-6 h-6 text-muted-foreground" />
  </div>
  <p className="text-sm font-medium mb-1">Nenhum resultado</p>
  <p className="text-xs text-muted-foreground max-w-[200px]">
    Tente ajustar os filtros.
  </p>
  <Button size="sm" className="mt-3">
    <Plus className="w-3.5 h-3.5 mr-1.5" /> Criar novo
  </Button>
</div>`,

breadcrumb: `import { ChevronRight } from 'lucide-react';

const crumbs = ['Hub', 'Associação', 'Associados'];

<nav className="flex items-center gap-1.5 text-sm">
  {crumbs.map((c, i) => (
    <div key={c} className="flex items-center gap-1.5">
      {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
      <span className={i === crumbs.length - 1
        ? 'text-foreground font-medium'
        : 'text-muted-foreground hover:text-foreground cursor-pointer'}>
        {c}
      </span>
    </div>
  ))}
</nav>`,

pagination: `import { Button } from '@/app/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

<Button variant="outline" size="icon" className="h-8 w-8">«</Button>
<Button variant="outline" size="sm">
  <ChevronLeft className="w-3 h-3 mr-1" /> Anterior
</Button>
<Button variant="default" size="icon" className="h-8 w-8">1</Button>
<Button variant="outline" size="icon" className="h-8 w-8">2</Button>
<Button variant="outline" size="sm">
  Próxima <ChevronRight className="w-3 h-3 ml-1" />
</Button>`,

kpi: `import { Card, CardContent } from '@/app/components/ui/card';
import { Users } from 'lucide-react';

<Card>
  <CardContent className="p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-full bg-blue-500/10
        flex items-center justify-center">
        <Users className="w-6 h-6 text-blue-500" />
      </div>
      <Badge variant="default">+18%</Badge>
    </div>
    <h3 className="text-2xl font-semibold mb-1">1.284</h3>
    <p className="text-sm text-muted-foreground">Total de Associados</p>
  </CardContent>
</Card>`,
};

// ── Main ──────────────────────────────────────────────────────────────────────
export function DesignSystemPage() {
  const { isDark, toggleDark } = useAppTheme();
  const [page, setPage] = useState(2);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link to="/login" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ChevronRight className="w-3.5 h-3.5 rotate-180" /> Login
            </Link>
            <nav className="hidden md:flex items-center gap-0.5">
              {NAV.map(s => (
                <a key={s.id} href={`#${s.id}`}
                  className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-xs bg-muted px-2 py-1 rounded border border-border">v1.0</span>
            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-accent transition-colors">
              {isDark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-24">

        {/* Hero */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-4 border border-primary/20">
            <Zap className="w-3 h-3" /> Design System
          </div>
          <h1 className="mb-3">iTARGET Hub</h1>
          <p className="text-muted-foreground max-w-xl text-sm">
            Documentação visual e de código de todos os tokens, estilos e componentes <strong>shadcn/ui</strong> utilizados no sistema.
          </p>
          <div className="flex gap-2 mt-4 flex-wrap">
            {['React 18','Tailwind CSS v4','shadcn/ui','Lucide React','Recharts','React Router v7'].map(t=>(
              <Code key={t}>{t}</Code>
            ))}
          </div>
        </div>

        {/* ═══════════ CORES ═══════════ */}
        <section id="cores" className="scroll-mt-20">
          <SectionTitle id="cores">Cores</SectionTitle>
          <p className="text-sm text-muted-foreground mb-6">Tokens CSS em <Code>src/styles/theme.css</Code>, sobrescritos pelo <Code>AppThemeContext</Code> via JS para suporte a temas de cor.</p>

          <SubTitle>Fundos</SubTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {name:'--background', light:'#fafafa',dark:'#13151e',label:'Página'},
              {name:'--card',       light:'#ffffff',dark:'#1b1e2c',label:'Cartão'},
              {name:'--muted',      light:'#f5f5f5',dark:'#1e2130',label:'Suave'},
              {name:'--popover',    light:'#ffffff',dark:'#1e2130',label:'Popover'},
            ].map(c=>(
              <div key={c.name} className="rounded-xl border border-border overflow-hidden">
                <div className="h-14" style={{backgroundColor:`var(${c.name})`}}/>
                <div className="p-2.5 bg-card">
                  <p className="text-xs font-semibold">{c.label}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    <span className="font-mono">{c.light}</span> / <span className="font-mono">{c.dark}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <SubTitle>Textos</SubTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {name:'--foreground',      light:'#171717',dark:'#e4e6f0',label:'Primário'},
              {name:'--muted-foreground',light:'#737373',dark:'#8e94ad',label:'Secundário / Sutil'},
              {name:'--primary',         light:'#2563eb',dark:'#60a5fa',label:'Ação / Link'},
            ].map(c=>(
              <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
                <div className="w-8 h-8 rounded-lg border border-border flex-shrink-0" style={{backgroundColor:`var(${c.name})`}}/>
                <div>
                  <p className="text-xs font-semibold">{c.label}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{c.light} / {c.dark}</p>
                </div>
              </div>
            ))}
          </div>

          <SubTitle>Bordas</SubTitle>
          <div className="grid grid-cols-2 gap-3">
            {[
              {name:'--border',light:'#e5e5e5',dark:'#2b2f45',label:'Padrão',thick:1},
              {name:'--ring',  light:'#2563eb',dark:'#60a5fa',label:'Foco / Ring',thick:2},
            ].map(c=>(
              <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-lg flex-shrink-0" style={{border:`${c.thick}px solid var(${c.name})`}}/>
                <div>
                  <p className="text-xs font-semibold">{c.label}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{c.light} / {c.dark}</p>
                </div>
              </div>
            ))}
          </div>

          <SubTitle>Status</SubTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STATUS.map(s=>(
              <div key={s.label} className={`p-4 rounded-xl border ${s.border} ${s.bg}`}>
                <div className="flex items-center gap-2 mb-2">
                  <s.Icon className={`w-4 h-4 ${s.text}`}/>
                  <span className={`text-sm font-semibold ${s.text}`}>{s.label}</span>
                </div>
                <div className={`text-[11px] space-y-0.5 ${s.text} opacity-80`}>
                  <p>Texto: <Code>{s.text}</Code></p>
                  <p>Fundo: <Code>{s.bg}</Code></p>
                  <p>Borda: <Code>{s.border}</Code></p>
                </div>
              </div>
            ))}
          </div>

          <SubTitle>Paleta de Gráficos (CSS vars)</SubTitle>
          <div className="flex gap-3 flex-wrap">
            {[{v:'--chart-1',l:'#2563eb',d:'#60a5fa'},{v:'--chart-2',l:'#10b981',d:'#34d399'},
              {v:'--chart-3',l:'#f59e0b',d:'#fbbf24'},{v:'--chart-4',l:'#ec4899',d:'#c084fc'},
              {v:'--chart-5',l:'#8b5cf6',d:'#fb7185'}].map((c,i)=>(
              <div key={c.v} className="text-center">
                <div className="w-10 h-10 rounded-xl mb-1" style={{backgroundColor:`var(${c.v})`}}/>
                <p className="font-mono text-[10px] text-muted-foreground">chart-{i+1}</p>
                <p className="font-mono text-[9px] text-muted-foreground">{c.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ TIPOGRAFIA ═══════════ */}
        <section id="tipografia" className="scroll-mt-20">
          <SectionTitle id="tipografia">Tipografia</SectionTitle>
          <p className="text-sm text-muted-foreground mb-6">Fonte base: <strong>Inter / System UI</strong>. Definida em <Code>theme.css → @layer base</Code>.</p>
          <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
            {[
              {tag:'H1 / Título 1',size:'2rem',weight:'600',lh:'1.2',ls:'-0.02em',sample:'Gestão Inteligente'},
              {tag:'H2 / Título 2',size:'1.5rem',weight:'600',lh:'1.3',ls:'-0.015em',sample:'Módulos do Hub'},
              {tag:'H3 / Título 3',size:'1.25rem',weight:'600',lh:'1.35',ls:'-0.01em',sample:'Configurações Gerais'},
              {tag:'H4 / Título 4',size:'1.125rem',weight:'500',lh:'1.4',ls:'0',sample:'Dados da Entidade'},
              {tag:'Body',size:'1rem',weight:'400',lh:'1.5',ls:'0',sample:'Plataforma completa para associações, sociedades médicas e entidades de classe.'},
              {tag:'Small / 14px',size:'0.875rem',weight:'400',lh:'1.5',ls:'0',sample:'Texto complementar de contexto e suporte.'},
              {tag:'Caption / Legenda',size:'0.75rem',weight:'400',lh:'1.5',ls:'0',sample:'Label, metadado, legenda de campo.'},
              {tag:'Label / Form',size:'0.875rem',weight:'500',lh:'1.5',ls:'0',sample:'Nome do Campo'},
            ].map(t=>(
              <div key={t.tag} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 items-center">
                <div>
                  <p className="text-xs text-muted-foreground mb-1 font-mono">{t.tag}</p>
                  <div className="flex flex-wrap gap-x-3 text-[11px] text-muted-foreground">
                    <span>size: <Code>{t.size}</Code></span>
                    <span>weight: <Code>{t.weight}</Code></span>
                    <span>lh: <Code>{t.lh}</Code></span>
                    {t.ls!=='0' && <span>ls: <Code>{t.ls}</Code></span>}
                  </div>
                </div>
                <div style={{fontSize:t.size,fontWeight:parseInt(t.weight),lineHeight:t.lh,letterSpacing:t.ls}}>
                  {t.sample}
                </div>
              </div>
            ))}
            <div className="p-5">
              <p className="text-xs text-muted-foreground mb-2 font-mono">Mono / Código</p>
              <pre className="text-xs bg-muted rounded-lg px-3 py-2 border border-border font-mono">
                {`const token = 'var(--primary)'; // #2563eb`}
              </pre>
            </div>
          </div>
        </section>

        {/* ═══════════ ESPAÇAMENTO ═══════════ */}
        <section id="espacamento" className="scroll-mt-20">
          <SectionTitle id="espacamento">Espaçamento e Raio</SectionTitle>

          <SubTitle>Raio de Borda — base: <Code>--radius: 0.75rem (12px)</Code></SubTitle>
          <div className="flex gap-5 flex-wrap items-end">
            {[
              {label:'sm',val:'8px',cls:'rounded-lg'},{label:'md',val:'10px',cls:'rounded-xl'},
              {label:'lg',val:'12px',cls:'rounded-2xl'},{label:'xl',val:'16px',cls:'rounded-3xl'},
              {label:'pill',val:'9999px',cls:'rounded-full'},
            ].map(r=>(
              <div key={r.label} className="text-center">
                <div className={`w-14 h-14 bg-primary/15 border-2 border-primary/40 mb-2 ${r.cls}`}/>
                <p className="text-xs font-semibold">{r.label}</p>
                <p className="text-[10px] font-mono text-muted-foreground">{r.val}</p>
                <Code>{r.cls}</Code>
              </div>
            ))}
          </div>

          <SubTitle>Escala de Espaçamento (4px base)</SubTitle>
          <div className="flex items-end gap-2 flex-wrap">
            {[{px:4,tw:'p-1'},{px:8,tw:'p-2'},{px:12,tw:'p-3'},{px:16,tw:'p-4'},
              {px:20,tw:'p-5'},{px:24,tw:'p-6'},{px:32,tw:'p-8'},{px:40,tw:'p-10'},
              {px:48,tw:'p-12'},{px:64,tw:'p-16'}].map(s=>(
              <div key={s.px} className="text-center">
                <div className="bg-primary/20 border border-primary/30 rounded" style={{width:s.px,height:s.px}}/>
                <p className="text-[10px] font-mono text-muted-foreground mt-1">{s.px}px</p>
                <Code>{s.tw}</Code>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ ÍCONES ═══════════ */}
        <section id="icones" className="scroll-mt-20">
          <SectionTitle id="icones">Ícones</SectionTitle>
          <p className="text-sm text-muted-foreground mb-2">Biblioteca: <strong>Lucide React</strong> — ícones SVG de linha fina, tree-shakeable.</p>
          <div className="flex items-center gap-3 mb-6">
            <Code>lucide-react</Code>
            <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
              lucide.dev <ExternalLink className="w-3 h-3"/>
            </a>
          </div>

          <SubTitle>Escala de Tamanhos</SubTitle>
          <div className="bg-card border border-border rounded-2xl p-6 flex items-end gap-8 flex-wrap">
            {[
              {cls:'w-3 h-3',px:'12px',label:'xs',uso:'Badges, inline'},
              {cls:'w-4 h-4',px:'16px',label:'sm',uso:'Botões, inputs'},
              {cls:'w-5 h-5',px:'20px',label:'md',uso:'Nav, cards'},
              {cls:'w-6 h-6',px:'24px',label:'lg',uso:'Headers'},
              {cls:'w-8 h-8',px:'32px',label:'xl',uso:'Avatares, destaque'},
            ].map(s=>(
              <div key={s.label} className="flex flex-col items-center gap-2">
                <Settings className={s.cls}/>
                <div className="text-center">
                  <p className="text-xs font-semibold">{s.label}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{s.px}</p>
                  <Code>{s.cls}</Code>
                  <p className="text-[10px] text-muted-foreground mt-1">{s.uso}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">Importar: <Code>{`import { IconName } from 'lucide-react';`}</Code></p>

          <SubTitle>Mais usados no sistema</SubTitle>
          <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {[
              [Home,'Home'],[Search,'Search'],[Bell,'Bell'],[Settings,'Settings'],
              [Users,'Users'],[Calendar,'Calendar'],[DollarSign,'DollarSign'],[Gift,'Gift'],
              [BookOpen,'BookOpen'],[ClipboardList,'ClipboardList'],[LayoutGrid,'LayoutGrid'],[Package,'Package'],
              [Star,'Star'],[Download,'Download'],[Check,'Check'],[X,'X'],
              [Plus,'Plus'],[Pencil,'Pencil'],[Trash2,'Trash2'],[Eye,'Eye'],
              [Lock,'Lock'],[Mail,'Mail'],[Wallet,'Wallet'],[Trophy,'Trophy'],
              [User,'User'],[Info,'Info'],[AlertCircle,'AlertCircle'],[CheckCircle,'CheckCircle'],
              [ArrowUpRight,'Arrow↗'],[ChevronRight,'ChevronRight'],
            ].map(([Icon,name],i)=>{
              const I = Icon as React.ComponentType<{className?:string}>;
              return (
                <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent transition-colors">
                  <I className="w-4 h-4"/>
                  <span className="text-[9px] text-muted-foreground text-center leading-tight">{name as string}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════ COMPONENTES (shadcn/ui) ═══════════ */}
        <section id="componentes" className="scroll-mt-20">
          <SectionTitle id="componentes">Componentes</SectionTitle>
          <p className="text-sm text-muted-foreground mb-2">
            Todos os componentes abaixo são do <strong>shadcn/ui</strong> (<Code>@/app/components/ui/</Code>).
          </p>
          <p className="text-xs text-muted-foreground mb-8">
            Clique em <strong>Código</strong> para ver imports e implementação. Variantes e tamanhos disponíveis em cada componente.
          </p>

          <div className="space-y-6">

            {/* ── Button ── */}
            <ComponentBlock title="Button" description="default · secondary · destructive · outline · ghost · link" code={CODES.button}>
              <div className="flex flex-wrap gap-3 items-center">
                <Button>Primário</Button>
                <Button variant="secondary">Secundário</Button>
                <Button variant="destructive">Destrutivo</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button disabled>Desativado</Button>
              </div>
              <div className="flex flex-wrap gap-3 items-center mt-4 pt-4 border-t border-border">
                <Button size="sm">Pequeno</Button>
                <Button size="default">Padrão</Button>
                <Button size="lg">Grande</Button>
                <Button size="icon"><Plus className="w-4 h-4"/></Button>
                <Button><Plus className="w-4 h-4 mr-2"/> Adicionar</Button>
                <Button variant="outline"><Download className="w-4 h-4 mr-2"/> Exportar</Button>
              </div>
            </ComponentBlock>

            {/* ── Input ── */}
            <ComponentBlock title="Input" description="Padrão · Desativado" code={CODES.input}>
              <div className="w-full max-w-sm space-y-3">
                <div>
                  <Label>Nome completo</Label>
                  <Input placeholder="Digite algo..." />
                </div>
                <div>
                  <Label>E-mail</Label>
                  <Input type="email" placeholder="seu@email.com" />
                </div>
                <div>
                  <Label>Senha</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label>Desativado</Label>
                  <Input disabled value="Valor fixo" />
                </div>
              </div>
            </ComponentBlock>

            {/* ── Textarea ── */}
            <ComponentBlock title="Textarea" description="Campo de texto longo" code={CODES.textarea}>
              <div className="w-full max-w-sm">
                <Label>Observações</Label>
                <Textarea placeholder="Digite suas observações..." rows={4} />
              </div>
            </ComponentBlock>

            {/* ── Select ── */}
            <ComponentBlock title="Select" description="Dropdown de seleção" code={CODES.select} centered>
              <div className="w-full max-w-xs">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um estado..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sp">São Paulo</SelectItem>
                    <SelectItem value="rj">Rio de Janeiro</SelectItem>
                    <SelectItem value="mg">Minas Gerais</SelectItem>
                    <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </ComponentBlock>

            {/* ── Card ── */}
            <ComponentBlock title="Card" description="Básico · Com header · KPI" code={CODES.card}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <Card>
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Package className="w-5 h-5 text-primary"/></div>
                    <h4 className="mb-1">Título do Card</h4>
                    <p className="text-sm text-muted-foreground">Descrição breve do conteúdo.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Métricas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-semibold mb-1">1.284</p>
                    <p className="text-sm text-muted-foreground">Total de Associados</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center"><ArrowUpRight className="w-5 h-5 text-green-500"/></div>
                      <Badge variant="default">+18%</Badge>
                    </div>
                    <p className="text-2xl font-semibold mb-1">R$ 84k</p>
                    <p className="text-sm text-muted-foreground">Receita Mensal</p>
                  </CardContent>
                </Card>
              </div>
            </ComponentBlock>

            {/* ── Badge ── */}
            <ComponentBlock title="Badge" description="default · secondary · destructive · outline" code={CODES.badge}>
              <div className="space-y-3 w-full">
                <div className="flex flex-wrap gap-2">
                  <Badge>Padrão</Badge>
                  <Badge variant="secondary">Secundário</Badge>
                  <Badge variant="destructive">Destrutivo</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  <Badge variant="default">Inscrições Abertas</Badge>
                  <Badge variant="secondary">Em Andamento</Badge>
                  <Badge variant="outline">Planejamento</Badge>
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 border">Adimplente</Badge>
                  <Badge className="bg-red-500/10 text-red-600 border-red-500/20 border">Em débito</Badge>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  {MODULE_COLORS.map(m=>(
                    <Badge key={m.label} variant="outline"
                      style={{backgroundColor:`${m.color}18`,borderColor:`${m.color}33`,color:m.color}}>
                      <m.Icon className="w-3 h-3 mr-1"/>{m.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </ComponentBlock>

            {/* ── Avatar ── */}
            <ComponentBlock title="Avatar" description="Iniciais e tamanhos" code={CODES.avatar}>
              <div className="flex items-end gap-4">
                {[{s:'w-7 h-7 text-xs',l:'xs'},{s:'w-9 h-9 text-sm',l:'sm'},{s:'w-10 h-10 text-sm',l:'md'},{s:'w-12 h-12 text-base',l:'lg'},{s:'w-14 h-14 text-lg',l:'xl'}].map(a=>(
                  <div key={a.l} className="flex flex-col items-center gap-1">
                    <Avatar className={a.s}>
                      <AvatarFallback>CE</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] text-muted-foreground">{a.l}</span>
                  </div>
                ))}
              </div>
            </ComponentBlock>

            {/* ── Table ── */}
            <ComponentBlock title="Table" description="Tabela com cabeçalho e linhas" code={CODES.table} noPad>
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {n:'Dr. Carlos Eduardo Silva',e:'carlos@sbcardio.org.br',s:'Ativo',av:'CE'},
                      {n:'Dra. Ana Paula Ferreira',e:'ana@sbcardio.org.br',s:'Inativo',av:'AP'},
                      {n:'Dr. Roberto Mendes Costa',e:'roberto@sbcardio.org.br',s:'Ativo',av:'RM'},
                    ].map((r,i)=>(
                      <TableRow key={i}>
                        <TableCell className="font-medium">{r.n}</TableCell>
                        <TableCell className="text-muted-foreground">{r.e}</TableCell>
                        <TableCell>
                          <Badge variant={r.s==='Ativo'?'default':'secondary'}>{r.s}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3.5 h-3.5"/></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Pencil className="w-3.5 h-3.5"/></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="w-3.5 h-3.5 text-red-500"/></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ComponentBlock>

            {/* ── Dialog ── */}
            <ComponentBlock title="Dialog" description="Modal de confirmação" code={CODES.dialog}>
              <DialogDemo />
            </ComponentBlock>

            {/* ── Form Controls ── */}
            <ComponentBlock title="Checkbox & RadioGroup" description="Controles de formulário" code={CODES.formControls}>
              <div className="space-y-4 w-full max-w-xs">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="terms" defaultChecked />
                    <Label htmlFor="terms">Aceito os termos</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="news" />
                    <Label htmlFor="news">Receber novidades</Label>
                  </div>
                </div>
                <Separator />
                <RadioGroup defaultValue="option-a">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-a" id="r1" />
                    <Label htmlFor="r1">Opção A</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-b" id="r2" />
                    <Label htmlFor="r2">Opção B</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-c" id="r3" />
                    <Label htmlFor="r3">Opção C</Label>
                  </div>
                </RadioGroup>
              </div>
            </ComponentBlock>

            {/* ── Progress ── */}
            <ComponentBlock title="Progress" description="Barra de progresso" code={CODES.progress}>
              <div className="space-y-4 w-full max-w-sm">
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5"><span>Progresso</span><span>68%</span></div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5"><span>Nível Ouro</span><span>72%</span></div>
                  <Progress value={72} className="h-2" />
                </div>
              </div>
            </ComponentBlock>

            {/* ── Tabs ── */}
            <ComponentBlock title="Tabs" description="Navegação por abas" code={CODES.tabs}>
              <div className="w-full">
                <Tabs defaultValue="dashboard">
                  <TabsList>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="associados">Associados</TabsTrigger>
                    <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
                  </TabsList>
                  <TabsContent value="dashboard" className="pt-4 text-sm text-muted-foreground">
                    Conteúdo do <strong>Dashboard</strong> com métricas e gráficos.
                  </TabsContent>
                  <TabsContent value="associados" className="pt-4 text-sm text-muted-foreground">
                    Lista de <strong>Associados</strong> com filtros e paginação.
                  </TabsContent>
                  <TabsContent value="financeiro" className="pt-4 text-sm text-muted-foreground">
                    Gestão <strong>Financeira</strong> com anuidades e relatórios.
                  </TabsContent>
                </Tabs>
              </div>
            </ComponentBlock>

            {/* ── Sheet ── */}
            <ComponentBlock title="Sheet" description="Painel lateral (drawer)" code={CODES.sheet}>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Abrir Painel</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div>
                      <Label>Buscar</Label>
                      <Input placeholder="Nome ou CPF..." className="mt-1" />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="adimplente">Adimplente</SelectItem>
                          <SelectItem value="inadimplente">Inadimplente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Aplicar Filtros</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </ComponentBlock>

            {/* ── Separator ── */}
            <ComponentBlock title="Separator" description="Divisor visual" code={CODES.separator} centered>
              <div className="w-full max-w-sm space-y-4">
                <p className="text-sm text-muted-foreground">Conteúdo acima</p>
                <Separator />
                <p className="text-sm text-muted-foreground">Conteúdo abaixo</p>
              </div>
            </ComponentBlock>

            {/* ── Charts ── */}
            <ComponentBlock title="Gráficos (Recharts)" description="Bar · Area · Line · Pie/Donut" code={CODES.charts}>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">BarChart</p>
                  <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={chartData} margin={{top:0,right:0,left:-20,bottom:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                      <XAxis dataKey="n" tick={{fontSize:10,fill:'var(--muted-foreground)'}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fontSize:10,fill:'var(--muted-foreground)'}} axisLine={false} tickLine={false}/>
                      <Tooltip contentStyle={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,fontSize:11}}/>
                      <Bar dataKey="a" fill="var(--chart-1)" radius={[4,4,0,0]}/>
                      <Bar dataKey="b" fill="var(--chart-2)" radius={[4,4,0,0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">AreaChart</p>
                  <ResponsiveContainer width="100%" height={120}>
                    <AreaChart data={chartData} margin={{top:0,right:0,left:-20,bottom:0}}>
                      <defs><linearGradient id="ga2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.2}/><stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                      <XAxis dataKey="n" tick={{fontSize:10,fill:'var(--muted-foreground)'}} axisLine={false}/>
                      <YAxis tick={{fontSize:10,fill:'var(--muted-foreground)'}} axisLine={false}/>
                      <Tooltip contentStyle={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,fontSize:11}}/>
                      <Area type="monotone" dataKey="a" stroke="var(--chart-1)" strokeWidth={2} fill="url(#ga2)"/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">LineChart</p>
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={chartData} margin={{top:0,right:0,left:-20,bottom:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                      <XAxis dataKey="n" tick={{fontSize:10,fill:'var(--muted-foreground)'}} axisLine={false}/>
                      <YAxis tick={{fontSize:10,fill:'var(--muted-foreground)'}} axisLine={false}/>
                      <Tooltip contentStyle={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,fontSize:11}}/>
                      <Line type="monotone" dataKey="a" stroke="var(--chart-1)" strokeWidth={2} dot={false}/>
                      <Line type="monotone" dataKey="b" stroke="var(--chart-2)" strokeWidth={2} dot={false}/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">PieChart (Donut)</p>
                  <div className="flex items-center gap-3">
                    <ResponsiveContainer width={110} height={110}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={28} outerRadius={48} paddingAngle={3} dataKey="value">
                          {pieData.map(e=><Cell key={e.name} fill={e.color}/>)}
                        </Pie>
                        <Tooltip contentStyle={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,fontSize:11}}/>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-1">
                      {pieData.map(d=>(
                        <div key={d.name} className="flex items-center gap-1.5 text-xs">
                          <div className="w-2 h-2 rounded-full" style={{backgroundColor:d.color}}/>
                          <span className="text-muted-foreground">{d.name}</span>
                          <span className="font-medium">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ComponentBlock>

            {/* ── KPI Card ── */}
            <ComponentBlock title="KPI Card" description="Indicador de métrica" code={CODES.kpi}>
              <div className="grid grid-cols-2 gap-3 w-full">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center"><Users className="w-6 h-6 text-blue-500"/></div>
                      <Badge variant="default">+18%</Badge>
                    </div>
                    <h3 className="text-2xl font-semibold mb-1">1.284</h3>
                    <p className="text-sm text-muted-foreground">Total de Associados</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center"><DollarSign className="w-6 h-6 text-green-500"/></div>
                      <Badge variant="secondary">+8%</Badge>
                    </div>
                    <h3 className="text-2xl font-semibold mb-1">R$ 84k</h3>
                    <p className="text-sm text-muted-foreground">Receita Mensal</p>
                  </CardContent>
                </Card>
              </div>
            </ComponentBlock>

            {/* ── Search ── */}
            <ComponentBlock title="Barra de Busca" description="Input com ícone" code={CODES.search} centered>
              <div className="w-full max-w-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <Input placeholder="Buscar associados..." className="pl-9" />
                </div>
              </div>
            </ComponentBlock>

            {/* ── Empty State ── */}
            <ComponentBlock title="Estado Vazio" description="Ícone · Mensagem · Ação" code={CODES.emptyState} centered>
              <div className="flex flex-col items-center py-8 text-center">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-3"><Package className="w-6 h-6 text-muted-foreground"/></div>
                <p className="text-sm font-medium mb-1">Nenhum resultado encontrado</p>
                <p className="text-xs text-muted-foreground max-w-[180px]">Tente ajustar os filtros ou realize uma nova busca.</p>
                <Button size="sm" className="mt-3">
                  <Plus className="w-3.5 h-3.5 mr-1.5"/> Criar novo
                </Button>
              </div>
            </ComponentBlock>

            {/* ── Breadcrumb ── */}
            <ComponentBlock title="Breadcrumb" description="Caminho de navegação" code={CODES.breadcrumb} centered>
              <nav className="flex items-center gap-1.5 text-sm">
                {['Hub','Associação','Associados'].map((c,i,arr)=>(
                  <div key={c} className="flex items-center gap-1.5">
                    {i>0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground"/>}
                    <span className={i===arr.length-1?'text-foreground font-medium':'text-muted-foreground hover:text-foreground transition-colors cursor-pointer'}>{c}</span>
                  </div>
                ))}
              </nav>
            </ComponentBlock>

            {/* ── Pagination ── */}
            <ComponentBlock title="Paginação" description="Navegação de páginas" code={CODES.pagination} centered>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={()=>setPage(p=>Math.max(1,p-1))}>«</Button>
                <Button variant="outline" size="sm" className="h-8" onClick={()=>setPage(p=>Math.max(1,p-1))}>
                  <ChevronLeft className="w-3 h-3 mr-1"/> Anterior
                </Button>
                {[1,2,3,'…',12].map((p,i)=>(
                  <Button key={i} variant={p===page?'default':'outline'} size="icon" className="h-8 w-8 text-xs"
                    onClick={()=>typeof p==='number'&&setPage(p)}>
                    {p}
                  </Button>
                ))}
                <Button variant="outline" size="sm" className="h-8" onClick={()=>setPage(p=>Math.min(12,p+1))}>
                  Próxima <ChevronRight className="w-3 h-3 ml-1"/>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={()=>setPage(p=>Math.min(12,p+1))}>»</Button>
              </div>
            </ComponentBlock>

            {/* ── Module Icon ── */}
            <ComponentBlock title="Ícone de Módulo" description="Badge colorido por módulo" code={CODES.moduleIcon}>
              <div className="space-y-4 w-full">
                <div className="flex flex-wrap gap-3 items-center">
                  {MODULE_COLORS.map(m=>(
                    <div key={m.label} className="flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{backgroundColor:`${m.color}18`,border:`1px solid ${m.color}33`}}>
                        <m.Icon className="w-5 h-5" style={{color:m.color}}/>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{m.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                  {MODULE_COLORS.map(m=>(
                    <Badge key={m.label} variant="outline"
                      style={{backgroundColor:`${m.color}18`,borderColor:`${m.color}33`,color:m.color}}>
                      <m.Icon className="w-3 h-3 mr-1"/>{m.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </ComponentBlock>

            {/* ── Gamification ── */}
            <ComponentBlock title="Gamificação" description="Níveis — Bronze · Prata · Ouro · Platina · Diamante" code={CODES.gamification}>
              <div className="space-y-4 w-full">
                <div className="flex flex-wrap gap-2">
                  {GAMIFICATION.map(g=>(
                    <Badge key={g.label} variant="outline"
                      style={{color:g.color,backgroundColor:g.bg,borderColor:`${g.color}33`}}>
                      <Trophy className="w-3 h-3 mr-1"/>{g.label}
                    </Badge>
                  ))}
                </div>
                <div className="space-y-2 max-w-xs">
                  {GAMIFICATION.map((g,i)=>{
                    const pct = [30,55,72,45,88][i];
                    return (
                      <div key={g.label}>
                        <div className="flex justify-between text-[11px] text-muted-foreground mb-1"><span>{g.label}</span><span>{pct}%</span></div>
                        <Progress value={pct} className="h-1.5" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </ComponentBlock>

          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-8 pb-12 text-center text-xs text-muted-foreground">
          <p>iTARGET Hub Design System · <Code>React 18 + Tailwind CSS v4 + shadcn/ui + Lucide React + Recharts</Code></p>
          <p className="mt-2">© 2026 Itarget · Todos os direitos reservados</p>
        </footer>

      </div>
    </div>
  );
}

// ── Dialog Demo ───────────────────────────────────────────────────────────────
function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Abrir Modal</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Ação</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja realizar esta ação? Esta operação não pode ser desfeita.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
