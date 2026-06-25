import {
  Search, Plus, Filter, Mail, Phone, MapPin, Calendar, Shield,
  Grid3x3, List, ChevronRight, ChevronLeft, X, Check, FileText,
  Edit, UserPlus, Tag, MessageSquare, Activity, HelpCircle,
  ExternalLink, RefreshCw, Key, MoreVertical
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { AssociadoDetail } from './AssociadoDetail';
import { AssociadoForm } from './AssociadoForm';

// ── LGPD mask helpers ──────────────────────────────────────────────────────────
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
// ──────────────────────────────────────────────────────────────────────────────

type StatusType = 'Em débito' | 'Adimplente' | 'Inativo' | 'Remido' | 'Pendente';
type ViewMode = 'grid' | 'list';
type ViewState = 'list' | 'detail' | 'form';

interface Associate {
  id: number;
  name: string;
  email: string;
  cpf: string;
  category: string;
  status: StatusType;
  annuity: string;
  phone: string;
  address: string;
  state: string;
  joinDate: string;
  photo?: string;
}

interface ApprovalModalData {
  associate: Associate;
  documents: { name: string; type: string }[];
}

interface ContextMenuState {
  x: number;
  y: number;
  associate: Associate;
}

const profilePhotos = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop',
];

const names = ['Ana Silva','Carlos Souza','Maria Santos','João Oliveira','Paula Costa','Roberto Lima','Juliana Alves','Fernando Rocha','Beatriz Martins','Lucas Pereira','Camila Dias','Rafael Cardoso','Fernanda Costa','Ricardo Mendes','Patricia Gomes','André Santos','Mariana Dias','Felipe Ramos','Gabriela Lima','Bruno Ferreira','Larissa Moura','Diego Castro','Vanessa Barros','Rodrigo Pinto','Carla Neves','Eduardo Faria','Simone Teixeira','Marcos Vieira','Isabela Cunha','Thiago Moreira','Amanda Freitas','Gustavo Reis','Natalia Prado','Henrique Barros','Leticia Lopes','Daniel Nascimento','Renata Coelho','Sergio Melo','Patricia Aguiar','Claudio Ribeiro','Viviane Monteiro','Leonardo Costa','Claudia Sampaio','Rodrigo Alves','Cristina Borges','Fabio Queiroz'];
const streets = ['Rua das Palmeiras','Av. Paulista','Rua do Ouvidor','Av. Brasil','Rua XV de Novembro','Av. Atlântica','Rua da Consolação'];
const cities = ['São Paulo','Rio de Janeiro','Belo Horizonte','Porto Alegre','Curitiba','Recife','Salvador','Brasília'];
const states = ['SP','RJ','MG','RS','PR','PE','BA','DF'];
const statuses: StatusType[] = ['Adimplente','Em débito','Pendente','Inativo','Remido'];
const categories = ['Titular','Aspirante','Honorário','Estudante'];

const mockAssociates: Associate[] = Array.from({ length: 46 }, (_, i) => ({
  id: i + 1,
  name: `Dr. ${names[i % names.length]}`,
  email: `${names[i % names.length].split(' ')[0].toLowerCase()}${i + 1}@medmail.com.br`,
  cpf: `${String(100 + i).padStart(3, '0')}.${String(200 + i).padStart(3, '0')}.${String(300 + i).padStart(3, '0')}-${String(i % 100).padStart(2, '0')}`,
  category: categories[i % categories.length],
  status: statuses[i % statuses.length],
  annuity: 'R$ 150/mês',
  phone: `(${10 + (i % 80)}) 9${String(8000 + i * 37).slice(0, 4)}-${String(1000 + i * 73).slice(0, 4)}`,
  address: `${streets[i % streets.length]}, ${100 + i * 7}, ${cities[i % cities.length]}, ${states[i % states.length]}`,
  state: states[i % states.length],
  joinDate: `${String((i % 28) + 1).padStart(2, '0')}/0${(i % 6) + 1}/202${i % 2 === 0 ? '4' : '5'}`,
  photo: i % 3 !== 0 ? profilePhotos[i % profilePhotos.length] : undefined,
}));

const PAGE_SIZE = 15;
const GRID_BATCH = 8;

const initials = (name: string) => {
  const parts = name.split(' ');
  return parts.length >= 3 ? `${parts[1][0]}${parts[2][0]}` : parts.slice(1).map(p => p[0]).join('');
};

export function PessoasAssociados() {
  const [viewState, setViewState] = useState<ViewState>('list');
  const [selectedAssociate, setSelectedAssociate] = useState<Associate | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<StatusType[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [approvalModal, setApprovalModal] = useState<ApprovalModalData | null>(null);
  const [hoveredAssociate, setHoveredAssociate] = useState<Associate | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [gridItemsShown, setGridItemsShown] = useState(GRID_BATCH);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  const tableRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const filteredAssociates = mockAssociates.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) || a.cpf.includes(searchTerm);
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(a.status);
    const matchesState = selectedStates.length === 0 || selectedStates.includes(a.state);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(a.category);
    return matchesSearch && matchesStatus && matchesState && matchesCategory;
  });

  const totalPages = Math.ceil(filteredAssociates.length / PAGE_SIZE);
  const paginatedAssociates = filteredAssociates.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => { setCurrentPage(1); setGridItemsShown(GRID_BATCH); }, [searchTerm, selectedStatuses, selectedStates, selectedCategories]);

  useEffect(() => {
    if (viewMode !== 'grid') return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && gridItemsShown < filteredAssociates.length)
        setGridItemsShown(prev => Math.min(prev + GRID_BATCH, filteredAssociates.length));
    }, { threshold: 0.1 });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [viewMode, gridItemsShown, filteredAssociates.length]);

  useEffect(() => {
    const update = () => {
      if (tableRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tableRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };
    const el = tableRef.current;
    if (el) {
      update();
      el.addEventListener('scroll', update);
      window.addEventListener('resize', update);
      return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
    }
  }, [paginatedAssociates.length]);

  // Close context menu on click/escape
  useEffect(() => {
    if (!contextMenu) return;
    const close = () => setContextMenu(null);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('click', close);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('click', close); window.removeEventListener('keydown', onKey); };
  }, [contextMenu]);

  const scrollTable = (dir: 'left' | 'right') =>
    tableRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });

  // ── Tooltip with hover bridge ─────────────────────────────────────────────
  const showTooltip = (associate: Associate, e: React.MouseEvent) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
    setHoveredAssociate(associate);
  };
  const startHideTooltip = () => {
    hoverTimeout.current = setTimeout(() => setHoveredAssociate(null), 120);
  };
  const cancelHideTooltip = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  };

  // ── Context menu ──────────────────────────────────────────────────────────
  const handleContextMenu = (e: React.MouseEvent, associate: Associate) => {
    e.preventDefault();
    e.stopPropagation();
    const w = 224, h = 390;
    const x = Math.min(e.clientX, window.innerWidth - w - 8);
    const y = Math.min(e.clientY, window.innerHeight - h - 8);
    setContextMenu({ x, y, associate });
  };

  const ctxMenuActions = [
    { label: 'Editar dados', icon: Edit, fn: (a: Associate) => { setSelectedAssociate(a); setViewState('form'); } },
    { label: 'Inscrever', icon: UserPlus, fn: () => {} },
    { label: 'Hist. Eventos', icon: Calendar, fn: () => {} },
    { label: 'Gerar Etiqueta', icon: Tag, fn: () => {} },
    { label: 'Adicionar anotação', icon: MessageSquare, fn: () => {} },
    { label: 'Rastrear', icon: Activity, fn: () => {} },
    { label: 'Perguntas', icon: HelpCircle, fn: () => {} },
  ];

  const ctxMenuAccess = [
    { label: 'Acessar área do associado', icon: ExternalLink, fn: (a: Associate) => openDetail(a) },
    { label: 'Redefinir senha', icon: RefreshCw, fn: () => {} },
    { label: 'Redefinir senha manual', icon: Key, fn: () => {} },
    { label: 'Exibir Atividades', icon: Activity, fn: (a: Associate) => openDetail(a) },
  ];

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'Adimplente': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Em débito':  return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'Pendente':   return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Inativo':    return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      case 'Remido':     return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    }
  };

  const toggleFilter = <T,>(value: T, selected: T[], setSelected: (v: T[]) => void) =>
    setSelected(selected.includes(value) ? selected.filter(v => v !== value) : [...selected, value]);

  const clearAllFilters = () => { setSelectedStatuses([]); setSelectedStates([]); setSelectedCategories([]); setSearchTerm(''); };
  const activeFiltersCount = selectedStatuses.length + selectedStates.length + selectedCategories.length;

  const handleApproveAssociate = (associate: Associate) => {
    setApprovalModal({
      associate,
      documents: [
        { name: 'Diploma de Medicina', type: 'PDF' },
        { name: 'RG', type: 'PDF' },
        { name: 'CPF', type: 'PDF' },
        { name: 'Comprovante de Residência', type: 'PDF' },
      ],
    });
  };

  const openDetail = (associate: Associate) => { setSelectedAssociate(associate); setViewState('detail'); };
  const openNewForm = () => { setSelectedAssociate(null); setViewState('form'); };

  if (viewState === 'detail' && selectedAssociate)
    return <AssociadoDetail associate={selectedAssociate} onBack={() => setViewState('list')} onEdit={() => setViewState('form')} />;

  if (viewState === 'form')
    return <AssociadoForm associate={selectedAssociate} onBack={() => setViewState(selectedAssociate ? 'detail' : 'list')} onSave={() => setViewState(selectedAssociate ? 'detail' : 'list')} />;

  // ── Floating arrow component ───────────────────────────────────────────────
  const FloatingArrow = ({ dir, can }: { dir: 'left' | 'right'; can: boolean }) => (
    <div className="absolute inset-y-0 z-20 pointer-events-none" style={{ [dir]: 0, width: 40 }}>
      <button
        onClick={() => scrollTable(dir)}
        disabled={!can}
        className={`pointer-events-auto w-9 h-9 rounded-full shadow-xl border flex items-center justify-center transition-all duration-200 ${
          can ? 'bg-background/95 backdrop-blur-sm border-border hover:bg-accent hover:border-primary hover:scale-105' : 'opacity-0 pointer-events-none'
        }`}
        style={{ position: 'sticky', top: 'calc(50vh - 18px)' }}
      >
        {dir === 'left' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  );

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl mb-2">Pessoas e Associados</h1>
              <p className="text-muted-foreground">Gerencie pessoas físicas, jurídicas e categorias</p>
            </div>
            <button onClick={openNewForm} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-sm">
              <Plus className="w-5 h-5" /> Novo Associado
            </button>
          </div>

          {/* Search + filters */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Buscar por nome, CPF, email..." value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm" />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm ${showFilters ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-accent'}`}>
                  <Filter className="w-4 h-4" />
                  Filtros
                  {activeFiltersCount > 0 && <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">{activeFiltersCount}</span>}
                </button>
                <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}><List className="w-4 h-4" /></button>
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}><Grid3x3 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <div className="space-y-2">
                      {statuses.map(s => (
                        <label key={s} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={selectedStatuses.includes(s)} onChange={() => toggleFilter(s, selectedStatuses, setSelectedStatuses)} className="rounded border-border" />
                          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(s)}`}>{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Estado</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {states.map(st => (
                        <label key={st} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={selectedStates.includes(st)} onChange={() => toggleFilter(st, selectedStates, setSelectedStates)} className="rounded border-border" />
                          <span className="text-sm">{st}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Categoria</label>
                    <div className="space-y-2">
                      {categories.map(c => (
                        <label key={c} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={selectedCategories.includes(c)} onChange={() => toggleFilter(c, selectedCategories, setSelectedCategories)} className="rounded border-border" />
                          <span className="text-sm">{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                {activeFiltersCount > 0 && (
                  <button onClick={clearAllFilters} className="mt-4 text-sm text-primary hover:underline">Limpar todos os filtros</button>
                )}
              </div>
            )}
          </div>

          {/* ── List view ── */}
          {viewMode === 'list' ? (
            <div className="relative">
              <FloatingArrow dir="left" can={canScrollLeft} />
              <FloatingArrow dir="right" can={canScrollRight} />

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Info bar */}
                <div className="px-6 py-3 bg-muted/20 border-b border-border flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {filteredAssociates.length === 0
                      ? 'Nenhum resultado'
                      : `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filteredAssociates.length)} de ${filteredAssociates.length} registros`}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                    <Shield className="w-3 h-3 text-blue-500" /> LGPD
                  </div>
                  <span className="text-xs text-muted-foreground ml-auto hidden sm:block opacity-50">
                    Clique com botão direito para ações
                  </span>
                </div>

                {/* Table */}
                <div ref={tableRef} className="overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Associado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap hidden md:table-cell">CPF</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">E-mail</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">Localidade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap hidden xl:table-cell">Anuidade</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paginatedAssociates.map(associate => (
                        <tr
                          key={associate.id}
                          className="hover:bg-muted/30 transition-colors group"
                          onContextMenu={e => handleContextMenu(e, associate)}
                        >
                          {/* ── Associado column: avatar + name + status + category ── */}
                          <td className="px-6 py-3.5 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              {/* Avatar — tooltip trigger */}
                              <div
                                className="flex-shrink-0 cursor-pointer"
                                onMouseEnter={e => showTooltip(associate, e)}
                                onMouseLeave={startHideTooltip}
                              >
                                {associate.photo ? (
                                  <img src={associate.photo} alt={associate.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-border group-hover:ring-primary/30 transition-all" />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-border group-hover:ring-primary/30 transition-all">
                                    <span className="text-xs font-semibold text-primary">{initials(associate.name)}</span>
                                  </div>
                                )}
                              </div>
                              {/* Name + status + category */}
                              <div>
                                <p className="font-medium text-sm">{associate.name}</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <span className={`text-xs px-1.5 py-0.5 rounded-full border leading-none ${getStatusColor(associate.status)}`}>
                                    {associate.status}
                                  </span>
                                  <span className="text-xs text-muted-foreground">{associate.category}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-3.5 whitespace-nowrap text-sm font-mono hidden md:table-cell text-muted-foreground">
                            {maskCPF(associate.cpf)}
                          </td>
                          <td className="px-6 py-3.5 whitespace-nowrap text-sm font-mono hidden lg:table-cell text-muted-foreground">
                            {maskEmail(associate.email)}
                          </td>
                          <td className="px-6 py-3.5 whitespace-nowrap text-sm hidden lg:table-cell text-muted-foreground">
                            {maskAddress(associate.address)}
                          </td>
                          <td className="px-6 py-3.5 whitespace-nowrap text-sm hidden xl:table-cell text-muted-foreground">
                            {associate.annuity}
                          </td>

                          {/* ── Actions column ── */}
                          <td className="px-4 py-3.5 whitespace-nowrap text-right">
                            {associate.status === 'Pendente' ? (
                              <button onClick={() => handleApproveAssociate(associate)}
                                className="text-xs px-2.5 py-1 bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition-colors">
                                Revisar
                              </button>
                            ) : (
                              <button
                                onClick={e => handleContextMenu(e, associate)}
                                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                                title="Ações"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-muted/20">
                    <span className="text-sm text-muted-foreground">Página {currentPage} de {totalPages}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
                        className="px-2 py-1 text-xs rounded-lg border border-border hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed">«</button>
                      <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed">
                        <ChevronLeft className="w-3 h-3" /> Anterior
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                        return (
                          <button key={page} onClick={() => setCurrentPage(page)}
                            className={`w-8 h-7 text-xs rounded-lg border transition-colors ${page === currentPage ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'}`}>
                            {page}
                          </button>
                        );
                      })}
                      <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed">
                        Próxima <ChevronRight className="w-3 h-3" />
                      </button>
                      <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}
                        className="px-2 py-1 text-xs rounded-lg border border-border hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed">»</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          ) : (
            // ── Grid view ──
            <div>
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <span>Exibindo {Math.min(gridItemsShown, filteredAssociates.length)} de {filteredAssociates.length} registros</span>
                <div className="flex items-center gap-1 text-xs bg-muted/50 px-2 py-0.5 rounded">
                  <Shield className="w-3 h-3 text-blue-500" /> LGPD
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredAssociates.slice(0, gridItemsShown).map(associate => (
                  <div key={associate.id} className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer hover:border-primary/30"
                    onClick={() => associate.status === 'Pendente' ? handleApproveAssociate(associate) : openDetail(associate)}>
                    <div className="flex flex-col items-center text-center mb-4">
                      <div onMouseEnter={e => showTooltip(associate, e)} onMouseLeave={startHideTooltip}>
                        {associate.photo ? (
                          <img src={associate.photo} alt={associate.name} className="w-20 h-20 rounded-full object-cover mb-3" />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                            <span className="text-xl font-semibold text-primary">{initials(associate.name)}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{associate.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono mb-2">{maskEmail(associate.email)}</p>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(associate.status)}`}>{associate.status}</span>
                        <span className="text-xs text-muted-foreground">{associate.category}</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-sm border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-xs">CPF</span>
                        <span className="font-medium font-mono text-xs">{maskCPF(associate.cpf)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-xs">Anuidade</span>
                        <span className="font-medium text-xs">{associate.annuity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div ref={sentinelRef} className="py-6 flex justify-center">
                {gridItemsShown < filteredAssociates.length && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    Carregando mais...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Context menu ── */}
      {contextMenu && (
        <div
          className="fixed z-[60] bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
          style={{ left: contextMenu.x, top: contextMenu.y, width: 224 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-3.5 py-2.5 bg-muted/60 border-b border-border">
            <p className="text-xs font-semibold truncate">{contextMenu.associate.name}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-xs px-1.5 py-0.5 rounded-full border leading-none ${getStatusColor(contextMenu.associate.status)}`}>
                {contextMenu.associate.status}
              </span>
              <span className="text-xs text-muted-foreground">· {contextMenu.associate.category}</span>
            </div>
          </div>

          {/* Ações */}
          <div className="py-1">
            <p className="px-3.5 pt-1.5 pb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Ações</p>
            {ctxMenuActions.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => { item.fn(contextMenu.associate); setContextMenu(null); }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-sm hover:bg-accent transition-colors text-left"
                >
                  <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Acessos */}
          <div className="border-t border-border py-1">
            <p className="px-3.5 pt-1.5 pb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Acessos</p>
            {ctxMenuAccess.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => { item.fn(contextMenu.associate); setContextMenu(null); }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-sm hover:bg-accent transition-colors text-left"
                >
                  <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Approval modal ── */}
      {approvalModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card">
              <div>
                <h3 className="text-xl font-semibold">Revisar Associado</h3>
                <p className="text-sm text-muted-foreground">{approvalModal.associate.name}</p>
              </div>
              <button onClick={() => setApprovalModal(null)} className="p-2 hover:bg-muted rounded-xl transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 p-4 bg-muted/30 rounded-xl">
                {approvalModal.associate.photo ? (
                  <img src={approvalModal.associate.photo} alt={approvalModal.associate.name} className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">{initials(approvalModal.associate.name)}</span>
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{approvalModal.associate.name}</h4>
                  <p className="text-sm text-muted-foreground">{approvalModal.associate.email}</p>
                  <p className="text-sm text-muted-foreground">CPF: {approvalModal.associate.cpf}</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Documentos enviados</h4>
                <div className="space-y-2">
                  {approvalModal.documents.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><FileText className="w-4 h-4 text-primary" /></div>
                        <div><p className="font-medium text-sm">{doc.name}</p><p className="text-xs text-muted-foreground">{doc.type}</p></div>
                      </div>
                      <button className="text-sm text-primary hover:underline">Visualizar</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setApprovalModal(null)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-600 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors">
                  <X className="w-4 h-4" /> Reprovar
                </button>
                <button onClick={() => setApprovalModal(null)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                  <Check className="w-4 h-4" /> Aprovar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Hover profile card ── */}
      {hoveredAssociate && (
        <div
          className="fixed z-50"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y - 10}px`, transform: 'translate(-50%, -100%)' }}
          onMouseEnter={cancelHideTooltip}
          onMouseLeave={() => setHoveredAssociate(null)}
        >
          <div className="bg-card border border-border rounded-2xl shadow-2xl p-4 w-72">
            {/* Profile */}
            <div className="flex items-start gap-3 mb-3">
              {hoveredAssociate.photo ? (
                <img src={hoveredAssociate.photo} alt={hoveredAssociate.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-base font-semibold text-primary">{initials(hoveredAssociate.name)}</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{hoveredAssociate.name}</h4>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className={`text-xs px-1.5 py-0.5 rounded-full border ${getStatusColor(hoveredAssociate.status)}`}>{hoveredAssociate.status}</span>
                  <span className="text-xs text-muted-foreground">{hoveredAssociate.category}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">desde {hoveredAssociate.joinDate}</p>
              </div>
            </div>

            {/* Masked contact data */}
            <div className="space-y-1.5 text-xs border-t border-border pt-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="truncate font-mono">{maskEmail(hoveredAssociate.email)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-3 h-3 flex-shrink-0" />
                <span className="font-mono">{maskPhone(hoveredAssociate.phone)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span>{maskAddress(hoveredAssociate.address)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-3 h-3 flex-shrink-0" />
                <span>Associado desde {hoveredAssociate.joinDate}</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2.5 border-t border-border grid grid-cols-2 gap-2 text-xs">
              <div><p className="text-muted-foreground">CPF</p><p className="font-mono font-medium">{maskCPF(hoveredAssociate.cpf)}</p></div>
              <div><p className="text-muted-foreground">Anuidade</p><p className="font-medium">{hoveredAssociate.annuity}</p></div>
            </div>

            {/* LGPD + Ver detalhes */}
            <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground pb-3 border-b border-border">
              <Shield className="w-3 h-3 text-blue-500 flex-shrink-0" />
              <span>Dados protegidos pela LGPD</span>
            </div>
            <button
              onClick={() => { openDetail(hoveredAssociate); setHoveredAssociate(null); }}
              className="mt-3 w-full py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              Ver detalhes completos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
