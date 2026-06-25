import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sun, Moon, ChevronRight, Check, X, AlertCircle, Info, CheckCircle, AlertTriangle,
  Plus, Pencil, Trash2, Eye, EyeOff, Lock, Mail, User, Users, Calendar, DollarSign,
  Gift, BookOpen, ClipboardList, LayoutGrid, Star, Download, Search, Home, Settings,
  Package, Wallet, Trophy, Zap, Loader2, ExternalLink, Copy, ArrowUpRight, Bell,
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useAppTheme } from '../components/AppThemeContext';

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

// ── Code snippets ─────────────────────────────────────────────────────────────
const CODES: Record<string, string> = {
button: `import { Plus, Download } from 'lucide-react';

// Primário
<button className="px-4 py-2 bg-primary text-primary-foreground
  rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
  Primário
</button>

// Secundário (outline)
<button className="px-4 py-2 border border-border rounded-xl
  text-sm font-medium hover:bg-accent transition-colors">
  Secundário
</button>

// Ghost
<button className="px-4 py-2 text-primary text-sm font-medium
  hover:bg-primary/10 rounded-xl transition-colors">
  Ghost
</button>

// Destrutivo
<button className="px-4 py-2 bg-destructive text-destructive-foreground
  rounded-xl text-sm font-medium hover:bg-destructive/90 transition-colors">
  Destrutivo
</button>

// Desativado
<button disabled className="px-4 py-2 bg-muted text-muted-foreground
  rounded-xl text-sm font-medium cursor-not-allowed opacity-50">
  Desativado
</button>

// Com ícone
<button className="flex items-center gap-2 px-4 py-2 bg-primary
  text-primary-foreground rounded-xl text-sm font-medium
  hover:bg-primary/90 transition-colors">
  <Plus className="w-4 h-4" /> Adicionar
</button>`,

input: `import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useState } from 'react';

// Campo padrão
<input
  placeholder="Digite algo..."
  className="w-full px-3 py-2.5 bg-background border border-border
    rounded-xl text-sm focus:ring-2 focus:ring-primary/30
    focus:border-primary outline-none transition-all"
/>

// Com ícone à esquerda
<div className="relative">
  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
  <input
    placeholder="seu@email.com"
    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border
      rounded-xl text-sm focus:ring-2 focus:ring-primary/30 outline-none"
  />
</div>

// Senha com toggle
const [show, setShow] = useState(false);
<div className="relative">
  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
  <input
    type={show ? 'text' : 'password'}
    className="w-full pl-10 pr-10 py-2.5 bg-background border border-border
      rounded-xl text-sm focus:ring-2 focus:ring-primary/30 outline-none"
  />
  <button onClick={() => setShow(s => !s)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
  </button>
</div>

// Estado de erro
<input
  className="w-full px-3 py-2.5 bg-background border border-red-500/50
    rounded-xl text-sm ring-2 ring-red-500/20 outline-none"
/>
<p className="text-xs text-red-500 mt-1 flex items-center gap-1">
  <AlertCircle className="w-3 h-3" /> Campo obrigatório
</p>`,

select: `// Select nativo
<select
  className="w-full px-3 py-2.5 bg-background border border-border
    rounded-xl text-sm focus:ring-2 focus:ring-primary/30
    outline-none transition-all cursor-pointer">
  <option>Opção A</option>
  <option>Opção B</option>
  <option>Opção C</option>
</select>`,

card: `import { Package, ChevronRight, ArrowUpRight, Star } from 'lucide-react';

// Card básico
<div className="bg-card border border-border rounded-2xl p-5">
  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
    <Package className="w-5 h-5 text-primary" />
  </div>
  <h4 className="mb-1">Título do Card</h4>
  <p className="text-sm text-muted-foreground">
    Descrição breve do conteúdo presente neste cartão.
  </p>
  <button className="mt-4 text-sm text-primary hover:underline flex items-center gap-1">
    Ver detalhes <ChevronRight className="w-3.5 h-3.5" />
  </button>
</div>

// Card KPI
<div className="bg-card border border-border rounded-2xl p-5">
  <div className="flex items-center justify-between mb-4">
    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
      <ArrowUpRight className="w-5 h-5 text-green-500" />
    </div>
    <span className="text-xs text-green-600 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">
      +18%
    </span>
  </div>
  <p className="text-2xl font-semibold mb-1">1.284</p>
  <p className="text-sm text-muted-foreground">Total de Associados</p>
</div>`,

badge: `import { CheckCircle, Info, AlertTriangle, AlertCircle } from 'lucide-react';

// Sucesso
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
  text-xs font-medium bg-green-500/10 border border-green-500/30 text-green-600">
  <CheckCircle className="w-3 h-3" /> Sucesso
</span>

// Informação
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
  text-xs font-medium bg-blue-500/10 border border-blue-500/30 text-blue-600">
  <Info className="w-3 h-3" /> Informação
</span>

// Aviso
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
  text-xs font-medium bg-amber-500/10 border border-amber-500/30 text-amber-600">
  <AlertTriangle className="w-3 h-3" /> Aviso
</span>

// Erro
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full
  text-xs font-medium bg-red-500/10 border border-red-500/30 text-red-600">
  <AlertCircle className="w-3 h-3" /> Erro
</span>

// Neutro
<span className="inline-flex items-center px-2.5 py-1 rounded-full
  text-xs font-medium bg-muted text-muted-foreground border border-border">
  Neutro
</span>

// Primário sólido
<span className="inline-flex items-center px-2.5 py-1 rounded-full
  text-xs font-medium bg-primary text-primary-foreground">
  Primário
</span>

// Badge de módulo (com cor customizada)
const color = '#60a5fa';
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
  style={{ backgroundColor: \`\${color}18\`, border: \`1px solid \${color}33\`, color }}>
  <Users className="w-3 h-3" /> Associação
</span>`,

avatar: `// Avatar com iniciais — tamanhos
<div className="w-7 h-7 rounded-xl bg-primary/20 text-primary
  flex items-center justify-center text-xs font-bold">CE</div>  // xs

<div className="w-10 h-10 rounded-xl bg-primary/20 text-primary
  flex items-center justify-center text-sm font-bold">CE</div>  // md

<div className="w-14 h-14 rounded-xl bg-primary/20 text-primary
  flex items-center justify-center text-lg font-bold">CE</div>  // xl

// Avatar com cor customizada
<div className="w-10 h-10 rounded-xl flex items-center justify-center
  text-sm font-bold text-white" style={{ backgroundColor: '#60a5fa' }}>
  CE
</div>

// Avatar em grupo (stack)
<div className="flex -space-x-2">
  {['#60a5fa','#34d399','#fbbf24'].map((color, i) => (
    <div key={i} className="w-8 h-8 rounded-full border-2 border-background
      flex items-center justify-center text-xs font-bold text-white"
      style={{ backgroundColor: color }}>
      {String.fromCharCode(65 + i)}
    </div>
  ))}
</div>`,

table: `import { Eye, Pencil, Trash2 } from 'lucide-react';

<div className="bg-card border border-border rounded-2xl overflow-hidden">
  <table className="w-full text-sm">
    <thead>
      <tr className="border-b border-border bg-muted/50">
        {['Nome', 'E-mail', 'Status', 'Ação'].map(h => (
          <th key={h} className="text-left px-4 py-3 text-xs font-semibold
            text-muted-foreground uppercase tracking-wider">
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="divide-y divide-border">
      {rows.map((row, i) => (
        <tr key={i} className="hover:bg-muted/30 transition-colors">
          <td className="px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary
                flex items-center justify-center text-xs font-bold">
                {row.initials}
              </div>
              {row.name}
            </div>
          </td>
          <td className="px-4 py-3 text-muted-foreground">{row.email}</td>
          <td className="px-4 py-3">
            <span className={\`text-xs px-2 py-0.5 rounded-full font-medium \${
              row.status === 'Ativo'
                ? 'bg-green-500/10 text-green-600'
                : 'bg-muted text-muted-foreground'
            }\`}>
              {row.status}
            </span>
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-accent rounded-lg transition-colors">
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 hover:bg-accent rounded-lg transition-colors">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 hover:bg-red-500/10 hover:text-red-500
                rounded-lg transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>`,

charts: `import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

const data = [
  { n: 'Jan', a: 40, b: 24 },
  { n: 'Fev', a: 55, b: 38 },
  { n: 'Mar', a: 48, b: 42 },
];

// BarChart
<ResponsiveContainer width="100%" height={200}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
    <XAxis dataKey="n" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
      axisLine={false} tickLine={false} />
    <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
      axisLine={false} tickLine={false} />
    <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8 }} />
    <Bar dataKey="a" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
    <Bar dataKey="b" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
  </BarChart>
</ResponsiveContainer>

// AreaChart
<ResponsiveContainer width="100%" height={200}>
  <AreaChart data={data}>
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%"  stopColor="var(--chart-1)" stopOpacity={0.2} />
        <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}   />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
    <XAxis dataKey="n" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} />
    <Area type="monotone" dataKey="a" stroke="var(--chart-1)"
      strokeWidth={2} fill="url(#grad)" />
  </AreaChart>
</ResponsiveContainer>

// PieChart / Donut
const pieData = [
  { name: 'Ativos',  value: 524, color: '#22c55e' },
  { name: 'Pausados',value: 183, color: '#94a3b8' },
];
<ResponsiveContainer width="100%" height={200}>
  <PieChart>
    <Pie data={pieData} cx="50%" cy="50%"
      innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
      {pieData.map(e => <Cell key={e.name} fill={e.color} />)}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>`,

tabs: `import { useState } from 'react';

const tabs = ['Dashboard', 'Associados', 'Financeiro'];
const [active, setActive] = useState(0);

<div className="flex border-b border-border">
  {tabs.map((t, i) => (
    <button key={t} onClick={() => setActive(i)}
      className={\`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap \${
        active === i
          ? 'border-primary text-primary'
          : 'border-transparent text-muted-foreground hover:text-foreground'
      }\`}>
      {t}
    </button>
  ))}
</div>
<div className="pt-4 text-sm text-muted-foreground">
  Conteúdo da aba: <strong className="text-foreground">{tabs[active]}</strong>
</div>`,

formControls: `import { useState } from 'react';

// Checkbox
const [checked, setChecked] = useState(true);
<label className="flex items-center gap-2.5 cursor-pointer">
  <input type="checkbox" checked={checked}
    onChange={e => setChecked(e.target.checked)}
    className="w-4 h-4 accent-primary rounded" />
  <span className="text-sm">Aceito os termos</span>
</label>

// Radio group
const [radio, setRadio] = useState('a');
{['Opção A', 'Opção B', 'Opção C'].map(opt => (
  <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
    <input type="radio" value={opt} checked={radio === opt}
      onChange={() => setRadio(opt)}
      className="w-4 h-4 accent-primary" />
    <span className="text-sm">{opt}</span>
  </label>
))}

// Toggle / Switch customizado
const [on, setOn] = useState(false);
<button onClick={() => setOn(t => !t)}
  className={\`relative w-10 h-5 rounded-full transition-colors \${
    on ? 'bg-primary' : 'bg-muted border border-border'
  }\`}>
  <span className={\`absolute top-0.5 left-0.5 w-4 h-4 rounded-full
    bg-white shadow transition-transform \${on ? 'translate-x-5' : ''}\`} />
</button>`,

progress: `import { Loader2 } from 'lucide-react';

// Barra de progresso
const progress = 68;
<div>
  <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
    <span>Progresso</span>
    <span>{progress}%</span>
  </div>
  <div className="h-2 bg-muted rounded-full overflow-hidden">
    <div className="h-full bg-primary rounded-full transition-all"
      style={{ width: \`\${progress}%\` }} />
  </div>
</div>

// Barra com cor customizada (nível gamificação)
<div className="h-2 bg-muted rounded-full overflow-hidden">
  <div className="h-full rounded-full transition-all"
    style={{ width: '72%', backgroundColor: '#b45309' }} />
</div>

// Spinner
<Loader2 className="w-5 h-5 animate-spin text-primary" />
<Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />`,

alert: `import { CheckCircle, Info, AlertTriangle, AlertCircle } from 'lucide-react';

// Sucesso
<div className="flex items-start gap-2.5 p-3 rounded-xl
  border bg-green-500/10 border-green-500/30">
  <CheckCircle className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
  <p className="text-xs text-green-600">
    <strong>Sucesso:</strong> Operação realizada com êxito.
  </p>
</div>

// Informação
<div className="flex items-start gap-2.5 p-3 rounded-xl
  border bg-blue-500/10 border-blue-500/30">
  <Info className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
  <p className="text-xs text-blue-600">
    <strong>Info:</strong> Esta ação afetará todos os registros.
  </p>
</div>

// Aviso
<div className="flex items-start gap-2.5 p-3 rounded-xl
  border bg-amber-500/10 border-amber-500/30">
  <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-600 flex-shrink-0" />
  <p className="text-xs text-amber-600">
    <strong>Atenção:</strong> Verifique os dados antes de continuar.
  </p>
</div>

// Erro
<div className="flex items-start gap-2.5 p-3 rounded-xl
  border bg-red-500/10 border-red-500/30">
  <AlertCircle className="w-4 h-4 mt-0.5 text-red-600 flex-shrink-0" />
  <p className="text-xs text-red-600">
    <strong>Erro:</strong> Não foi possível salvar as alterações.
  </p>
</div>`,

search: `import { Search } from 'lucide-react';

// Variante padrão (bordas arredondadas)
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2
    w-4 h-4 text-muted-foreground" />
  <input
    placeholder="Buscar associados..."
    className="w-full pl-9 pr-4 py-2.5 bg-card border border-border
      rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
  />
</div>

// Variante compacta (fundo muted — usada em popovers)
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2
    w-4 h-4 text-muted-foreground" />
  <input
    placeholder="Pesquisar..."
    className="w-full pl-9 pr-4 py-2 bg-muted border border-border
      rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
  />
</div>`,

kpi: `import { Users, DollarSign, ArrowUpRight } from 'lucide-react';

<div className="bg-card border border-border rounded-2xl p-5">
  <div className="flex items-center justify-between mb-4">
    <div className="w-10 h-10 rounded-full bg-blue-500/10
      flex items-center justify-center">
      <Users className="w-5 h-5 text-blue-500" />
    </div>
    <span className="text-xs text-green-600 font-medium
      bg-green-500/10 px-2 py-0.5 rounded-full">
      +18%
    </span>
  </div>
  <p className="text-2xl font-semibold mb-1">1.284</p>
  <p className="text-sm text-muted-foreground">Total de Associados</p>
</div>`,

emptyState: `import { Package, Plus } from 'lucide-react';

<div className="flex flex-col items-center py-12 text-center">
  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center
    justify-center mb-3">
    <Package className="w-6 h-6 text-muted-foreground" />
  </div>
  <p className="text-sm font-medium mb-1">Nenhum resultado encontrado</p>
  <p className="text-xs text-muted-foreground max-w-[200px]">
    Tente ajustar os filtros ou realize uma nova busca.
  </p>
  <button className="mt-3 flex items-center gap-1.5 px-3 py-1.5
    text-xs bg-primary text-primary-foreground rounded-lg
    hover:bg-primary/90 transition-colors">
    <Plus className="w-3.5 h-3.5" /> Criar novo
  </button>
</div>`,

breadcrumb: `import { ChevronRight } from 'lucide-react';

const crumbs = ['Hub', 'Associação', 'Associados'];

<nav className="flex items-center gap-1.5 text-sm">
  {crumbs.map((c, i) => (
    <div key={c} className="flex items-center gap-1.5">
      {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
      <span className={
        i === crumbs.length - 1
          ? 'text-foreground font-medium'
          : 'text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
      }>
        {c}
      </span>
    </div>
  ))}
</nav>`,

pagination: `const [page, setPage] = useState(1);
const total = 12;

<div className="flex items-center gap-1">
  <button onClick={() => setPage(p => Math.max(1, p - 1))}
    className="w-8 h-8 rounded-lg text-sm hover:bg-accent
      text-muted-foreground hover:text-foreground transition-colors">
    ‹
  </button>
  {Array.from({ length: total }, (_, i) => i + 1)
    .filter(p => p === 1 || p === total || Math.abs(p - page) <= 1)
    .reduce((acc: (number|string)[], p, i, arr) => {
      if (i > 0 && (p as number) - (arr[i-1] as number) > 1) acc.push('…');
      acc.push(p);
      return acc;
    }, [])
    .map((p, i) => (
      <button key={i}
        onClick={() => typeof p === 'number' && setPage(p)}
        className={\`w-8 h-8 rounded-lg text-sm transition-colors \${
          p === page
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-accent text-muted-foreground hover:text-foreground'
        }\`}>
        {p}
      </button>
    ))}
  <button onClick={() => setPage(p => Math.min(total, p + 1))}
    className="w-8 h-8 rounded-lg text-sm hover:bg-accent
      text-muted-foreground hover:text-foreground transition-colors">
    ›
  </button>
</div>`,

moduleIcon: `// Badge de módulo — usado nas abas e cards do sistema
const color = '#60a5fa'; // cor do módulo

// Versão ícone (dentro de tabs)
<div className="w-5 h-5 rounded flex items-center justify-center"
  style={{ backgroundColor: \`\${color}22\`, border: \`1px solid \${color}44\` }}>
  <Users className="w-3 h-3" style={{ color }} />
</div>

// Versão card (no hub de módulos)
<div className="w-10 h-10 rounded-xl flex items-center justify-center"
  style={{ backgroundColor: \`\${color}18\`, border: \`1px solid \${color}33\` }}>
  <Users className="w-5 h-5" style={{ color }} />
</div>

// Badge completo (pill com nome)
<span className="inline-flex items-center gap-1.5 px-2.5 py-1
  rounded-lg text-xs font-medium"
  style={{ backgroundColor: \`\${color}18\`, border: \`1px solid \${color}33\`, color }}>
  <Users className="w-3 h-3" /> Associação
</span>

// Mapeamento de módulos do sistema
const MODULE_META = {
  associacao: { Icon: Users,         color: '#60a5fa' },
  financeiro: { Icon: DollarSign,    color: '#34d399' },
  exames:     { Icon: ClipboardList, color: '#818cf8' },
  cursos:     { Icon: BookOpen,      color: '#a78bfa' },
  cashback:   { Icon: Gift,          color: '#fbbf24' },
  eventos:    { Icon: Calendar,      color: '#fb7185' },
  hub:        { Icon: LayoutGrid,    color: '#94a3b8' },
};`,

gamification: `// Nível de gamificação — usado em Cashback / Usuários e Carteiras
import { Trophy } from 'lucide-react';

type Nivel = 'bronze' | 'prata' | 'ouro' | 'platina' | 'diamante';

const NIVEL = {
  bronze:   { label: 'Bronze',   color: '#92400e', bg: '#fef3c7', min: 0    },
  prata:    { label: 'Prata',    color: '#475569', bg: '#f1f5f9', min: 501  },
  ouro:     { label: 'Ouro',     color: '#b45309', bg: '#fffbeb', min: 1501 },
  platina:  { label: 'Platina',  color: '#0e7490', bg: '#ecfeff', min: 3001 },
  diamante: { label: 'Diamante', color: '#6d28d9', bg: '#f5f3ff', min: 5001 },
};

function getNivel(pontos: number): Nivel {
  if (pontos >= 5001) return 'diamante';
  if (pontos >= 3001) return 'platina';
  if (pontos >= 1501) return 'ouro';
  if (pontos >= 501)  return 'prata';
  return 'bronze';
}

// Componente badge de nível
function NivelBadge({ pontos }: { pontos: number }) {
  const nivel = getNivel(pontos);
  const cfg = NIVEL[nivel];
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5
      rounded-full text-xs font-semibold"
      style={{ color: cfg.color, backgroundColor: cfg.bg,
        border: \`1px solid \${cfg.color}33\` }}>
      <Trophy className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

// Barra de progresso de nível
function NivelProgress({ pontos }: { pontos: number }) {
  const nivel = getNivel(pontos);
  const cfg = NIVEL[nivel];
  const progress = Math.min(100, ((pontos - cfg.min) / (cfg.min * 2)) * 100);
  return (
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all"
        style={{ width: \`\${progress}%\`, backgroundColor: cfg.color }} />
    </div>
  );
}`,
};

// ── Main ──────────────────────────────────────────────────────────────────────
export function DesignSystemPage() {
  const { isDark, toggleDark } = useAppTheme();
  const [inputVal, setInputVal] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState('a');
  const [toggled, setToggled] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
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
          <p className="text-muted-foreground max-w-xl text-sm">Documentação visual e de código de todos os tokens, estilos e componentes utilizados no sistema.</p>
          <div className="flex gap-2 mt-4 flex-wrap">
            {['React 18','Tailwind CSS v4','Lucide React','Recharts','React Router v7'].map(t=>(
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

        {/* ═══════════ COMPONENTES ═══════════ */}
        <section id="componentes" className="scroll-mt-20">
          <SectionTitle id="componentes">Componentes</SectionTitle>
          <p className="text-sm text-muted-foreground mb-8">Todos construídos com <strong>Tailwind CSS v4</strong>. Clique em <strong>Código</strong> para ver imports e implementação.</p>

          <div className="space-y-6">

            {/* Botões */}
            <ComponentBlock title="Botão" description="Primário · Secundário · Ghost · Destrutivo · Ícone" code={CODES.button}>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">Primário</button>
                <button className="px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-accent transition-colors">Secundário</button>
                <button className="px-4 py-2 text-primary text-sm font-medium hover:bg-primary/10 rounded-xl transition-colors">Ghost</button>
                <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-xl text-sm font-medium hover:bg-destructive/90 transition-colors">Destrutivo</button>
                <button disabled className="px-4 py-2 bg-muted text-muted-foreground rounded-xl text-sm font-medium cursor-not-allowed opacity-50">Desativado</button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                  <Plus className="w-4 h-4"/> Adicionar
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-accent transition-colors">
                  <Download className="w-4 h-4"/> Exportar
                </button>
              </div>
            </ComponentBlock>

            {/* Input */}
            <ComponentBlock title="Entrada (Input)" description="Padrão · Com ícone · Senha · Erro" code={CODES.input}>
              <div className="w-full max-w-sm space-y-3">
                <input value={inputVal} onChange={e=>setInputVal(e.target.value)} placeholder="Digite algo..."
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"/>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <input placeholder="seu@email.com" className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/30 outline-none"/>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <input type={showPwd?'text':'password'} placeholder="••••••••" className="w-full pl-10 pr-10 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/30 outline-none"/>
                  <button onClick={()=>setShowPwd(s=>!s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPwd?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
                  </button>
                </div>
                <div>
                  <input defaultValue="email-inválido" className="w-full px-3 py-2.5 bg-background border border-red-500/50 rounded-xl text-sm ring-2 ring-red-500/20 outline-none"/>
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>Campo obrigatório</p>
                </div>
              </div>
            </ComponentBlock>

            {/* Select */}
            <ComponentBlock title="Select" description="Nativo estilizado" code={CODES.select} centered>
              <select className="w-full max-w-xs px-3 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/30 outline-none cursor-pointer">
                <option>Opção A</option><option>Opção B</option><option>Opção C</option>
              </select>
            </ComponentBlock>

            {/* Card */}
            <ComponentBlock title="Cartão (Card)" description="Básico · KPI · Interativo" code={CODES.card}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Package className="w-5 h-5 text-primary"/></div>
                  <h4 className="mb-1">Título do Card</h4>
                  <p className="text-sm text-muted-foreground">Descrição breve do conteúdo.</p>
                  <button className="mt-4 text-sm text-primary hover:underline flex items-center gap-1">Ver detalhes<ChevronRight className="w-3.5 h-3.5"/></button>
                </div>
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center"><ArrowUpRight className="w-5 h-5 text-green-500"/></div>
                    <span className="text-xs text-green-600 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">+18%</span>
                  </div>
                  <p className="text-2xl font-semibold mb-1">1.284</p>
                  <p className="text-sm text-muted-foreground">Total de Associados</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center"><Star className="w-5 h-5 text-violet-500"/></div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"/>
                  </div>
                  <h4 className="mt-4 mb-1 group-hover:text-primary transition-colors">Card Interativo</h4>
                  <p className="text-sm text-muted-foreground">Hover com sombra e transição de cor.</p>
                </div>
              </div>
            </ComponentBlock>

            {/* Badge */}
            <ComponentBlock title="Crachá / Etiqueta (Badge)" description="Sucesso · Info · Aviso · Erro · Neutro · Módulo" code={CODES.badge}>
              <div className="space-y-3 w-full">
                <div className="flex flex-wrap gap-2">
                  {STATUS.map(s=>(
                    <span key={s.label} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${s.bg} ${s.border} ${s.text}`}>
                      <s.Icon className="w-3 h-3"/>{s.label}
                    </span>
                  ))}
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">Neutro</span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">Primário</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  {MODULE_COLORS.map(m=>(
                    <span key={m.label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{backgroundColor:`${m.color}18`,border:`1px solid ${m.color}33`,color:m.color}}>
                      <m.Icon className="w-3 h-3"/>{m.label}
                    </span>
                  ))}
                </div>
              </div>
            </ComponentBlock>

            {/* Avatar */}
            <ComponentBlock title="Avatar" description="Tamanhos e paleta de cores" code={CODES.avatar}>
              <div className="space-y-4 w-full">
                <div className="flex items-end gap-4">
                  {[{s:'w-7 h-7 text-xs',l:'xs'},{s:'w-9 h-9 text-sm',l:'sm'},{s:'w-10 h-10 text-sm',l:'md'},{s:'w-12 h-12 text-base',l:'lg'},{s:'w-14 h-14 text-lg',l:'xl'}].map(a=>(
                    <div key={a.l} className="flex flex-col items-center gap-1">
                      <div className={`${a.s} rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold`}>CE</div>
                      <span className="text-[10px] text-muted-foreground">{a.l}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['#60a5fa','#34d399','#818cf8','#a78bfa','#fbbf24','#fb7185','#f97316','#22d3ee','#92400e','#475569','#b45309','#0e7490'].map(color=>(
                    <div key={color} className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{backgroundColor:color}}>
                      {color[1].toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            </ComponentBlock>

            {/* Table */}
            <ComponentBlock title="Tabela" description="Cabeçalho + linhas com ações" code={CODES.table} noPad>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border bg-muted/50">
                    {['Nome','E-mail','Status','Ação'].map(h=>(
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody className="divide-y divide-border">
                    {[
                      {n:'Dr. Carlos Eduardo Silva',e:'carlos@sbcardio.org.br',s:'Ativo',av:'CE'},
                      {n:'Dra. Ana Paula Ferreira',e:'ana@sbcardio.org.br',s:'Inativo',av:'AP'},
                      {n:'Dr. Roberto Mendes Costa',e:'roberto@sbcardio.org.br',s:'Ativo',av:'RM'},
                    ].map((r,i)=>(
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">{r.av}</div>
                            {r.n}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{r.e}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.s==='Ativo'?'bg-green-500/10 text-green-600':'bg-muted text-muted-foreground'}`}>{r.s}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 hover:bg-accent rounded-lg transition-colors"><Eye className="w-3.5 h-3.5"/></button>
                            <button className="p-1.5 hover:bg-accent rounded-lg transition-colors"><Pencil className="w-3.5 h-3.5"/></button>
                            <button className="p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ComponentBlock>

            {/* Charts */}
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
                      <XAxis dataKey="n" tick={{fontSize:10,fill:'var(--muted-foreground)'}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fontSize:10,fill:'var(--muted-foreground)'}} axisLine={false} tickLine={false}/>
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
                      <XAxis dataKey="n" tick={{fontSize:10,fill:'var(--muted-foreground)'}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fontSize:10,fill:'var(--muted-foreground)'}} axisLine={false} tickLine={false}/>
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

            {/* Tabs */}
            <ComponentBlock title="Abas (Tab Navigation)" description="Com indicador de borda inferior" code={CODES.tabs}>
              <div className="w-full">
                <div className="flex border-b border-border">
                  {['Dashboard','Associados','Financeiro'].map((t,i)=>(
                    <button key={t} onClick={()=>setActiveTab(i)}
                      className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab===i?'border-primary text-primary':'border-transparent text-muted-foreground hover:text-foreground'}`}>
                      {t}
                    </button>
                  ))}
                </div>
                <div className="pt-4 text-sm text-muted-foreground">
                  Conteúdo da aba: <strong className="text-foreground">{['Dashboard','Associados','Financeiro'][activeTab]}</strong>
                </div>
              </div>
            </ComponentBlock>

            {/* Form Controls */}
            <ComponentBlock title="Controles de Formulário" description="Checkbox · Radio · Switch/Toggle" code={CODES.formControls}>
              <div className="space-y-3 w-full max-w-xs">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)} className="w-4 h-4 accent-primary rounded"/>
                  <span className="text-sm">Checkbox ativo</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-primary rounded"/>
                  <span className="text-sm">Checkbox inativo</span>
                </label>
                {['Opção A','Opção B'].map(o=>(
                  <label key={o} className="flex items-center gap-2.5 cursor-pointer">
                    <input type="radio" value={o} checked={radio===o} onChange={()=>setRadio(o)} className="w-4 h-4 accent-primary"/>
                    <span className="text-sm">{o}</span>
                  </label>
                ))}
                <div className="flex items-center gap-2.5">
                  <button onClick={()=>setToggled(t=>!t)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${toggled?'bg-primary':'bg-muted border border-border'}`}>
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${toggled?'translate-x-5':''}`}/>
                  </button>
                  <span className="text-sm">Toggle {toggled?'ligado':'desligado'}</span>
                </div>
              </div>
            </ComponentBlock>

            {/* Progress + Spinner */}
            <ComponentBlock title="Progresso e Spinner" description="Barra de progresso · Loading" code={CODES.progress}>
              <div className="space-y-4 w-full max-w-sm">
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5"><span>Progresso</span><span>68%</span></div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{width:'68%'}}/></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5"><span>Nível Ouro</span><span>72%</span></div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full rounded-full" style={{width:'72%',backgroundColor:'#b45309'}}/></div>
                </div>
                <div className="flex items-center gap-4">
                  <Loader2 className="w-5 h-5 animate-spin text-primary"/>
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground"/>
                  <Loader2 className="w-6 h-6 animate-spin text-green-500"/>
                  <span className="text-sm text-muted-foreground">Carregando...</span>
                </div>
              </div>
            </ComponentBlock>

            {/* Alertas */}
            <ComponentBlock title="Alertas / Banners" description="Sucesso · Info · Aviso · Erro" code={CODES.alert}>
              <div className="space-y-2 w-full">
                {STATUS.map(s=>(
                  <div key={s.label} className={`flex items-start gap-2.5 p-3 rounded-xl border ${s.bg} ${s.border}`}>
                    <s.Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${s.text}`}/>
                    <p className={`text-xs ${s.text}`}><strong>{s.label}:</strong> Mensagem de feedback para o usuário.</p>
                  </div>
                ))}
              </div>
            </ComponentBlock>

            {/* Search */}
            <ComponentBlock title="Barra de Busca" description="Padrão e compacta" code={CODES.search} centered>
              <div className="w-full max-w-sm space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <input placeholder="Buscar associados..." className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"/>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <input placeholder="Pesquisar..." className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"/>
                </div>
              </div>
            </ComponentBlock>

            {/* KPI */}
            <ComponentBlock title="Card KPI" description="Indicador de métrica com badge de variação" code={CODES.kpi}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {label:'Associados',value:'1.284',badge:'+18%',Icon:Users,bg:'bg-blue-500/10',ic:'text-blue-500'},
                  {label:'Receita',value:'R$ 84k',badge:'+8%',Icon:DollarSign,bg:'bg-green-500/10',ic:'text-green-500'},
                ].map(k=>(
                  <div key={k.label} className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-full ${k.bg} flex items-center justify-center`}><k.Icon className={`w-5 h-5 ${k.ic}`}/></div>
                      <span className="text-xs text-green-600 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">{k.badge}</span>
                    </div>
                    <p className="text-2xl font-semibold mb-1">{k.value}</p>
                    <p className="text-sm text-muted-foreground">{k.label}</p>
                  </div>
                ))}
              </div>
            </ComponentBlock>

            {/* Empty State */}
            <ComponentBlock title="Estado Vazio (Empty State)" description="Ícone · Mensagem · Ação" code={CODES.emptyState} centered>
              <div className="flex flex-col items-center py-8 text-center">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-3"><Package className="w-6 h-6 text-muted-foreground"/></div>
                <p className="text-sm font-medium mb-1">Nenhum resultado encontrado</p>
                <p className="text-xs text-muted-foreground max-w-[180px]">Tente ajustar os filtros ou realize uma nova busca.</p>
                <button className="mt-3 flex items-center gap-1.5 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  <Plus className="w-3.5 h-3.5"/> Criar novo
                </button>
              </div>
            </ComponentBlock>

            {/* Breadcrumb */}
            <ComponentBlock title="Breadcrumb" description="Caminho de navegação hierárquica" code={CODES.breadcrumb} centered>
              <nav className="flex items-center gap-1.5 text-sm">
                {['Hub','Associação','Associados'].map((c,i,arr)=>(
                  <div key={c} className="flex items-center gap-1.5">
                    {i>0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground"/>}
                    <span className={i===arr.length-1?'text-foreground font-medium':'text-muted-foreground hover:text-foreground transition-colors cursor-pointer'}>{c}</span>
                  </div>
                ))}
              </nav>
            </ComponentBlock>

            {/* Pagination */}
            <ComponentBlock title="Paginação" description="Páginas com ellipsis e navegação" code={CODES.pagination} centered>
              <div className="flex items-center gap-1">
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="w-8 h-8 rounded-lg text-sm hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">‹</button>
                {[1,2,3,'…',12].map((p,i)=>(
                  <button key={i} onClick={()=>typeof p==='number'&&setPage(p)}
                    className={`w-8 h-8 rounded-lg text-sm transition-colors ${p===page?'bg-primary text-primary-foreground':'hover:bg-accent text-muted-foreground hover:text-foreground'}`}>
                    {p}
                  </button>
                ))}
                <button onClick={()=>setPage(p=>Math.min(12,p+1))} className="w-8 h-8 rounded-lg text-sm hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">›</button>
              </div>
            </ComponentBlock>

            {/* Module Icon */}
            <ComponentBlock title="Ícone de Módulo" description="Badge colorido por módulo — tabs, cards, menus" code={CODES.moduleIcon}>
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
                    <span key={m.label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{backgroundColor:`${m.color}18`,border:`1px solid ${m.color}33`,color:m.color}}>
                      <m.Icon className="w-3 h-3"/>{m.label}
                    </span>
                  ))}
                </div>
              </div>
            </ComponentBlock>

            {/* Gamification */}
            <ComponentBlock title="Níveis de Gamificação" description="Cashback — Bronze · Prata · Ouro · Platina · Diamante" code={CODES.gamification}>
              <div className="space-y-4 w-full">
                <div className="flex flex-wrap gap-2">
                  {GAMIFICATION.map(g=>(
                    <span key={g.label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{color:g.color,backgroundColor:g.bg,border:`1px solid ${g.color}33`}}>
                      <Trophy className="w-3 h-3"/>{g.label}
                    </span>
                  ))}
                </div>
                <div className="space-y-2 max-w-xs">
                  {GAMIFICATION.map((g,i)=>{
                    const pct = [30,55,72,45,88][i];
                    return (
                      <div key={g.label}>
                        <div className="flex justify-between text-[11px] text-muted-foreground mb-1"><span>{g.label}</span><span>{pct}%</span></div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full rounded-full" style={{width:`${pct}%`,backgroundColor:g.color}}/></div>
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
          <p>iTARGET Hub Design System · <Code>React 18 + Tailwind CSS v4 + Lucide React + Recharts</Code></p>
          <p className="mt-2">© 2026 Itarget · Todos os direitos reservados</p>
        </footer>

      </div>
    </div>
  );
}
