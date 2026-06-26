export interface CostCenter {
  id: string;
  name: string;
  category: string;
}

export const COST_CENTERS: CostCenter[] = [
  // Eventos Científicos
  { id: 'cc-1', name: 'Congresso Brasileiro de Cardiologia 2025', category: 'Eventos Científicos' },
  { id: 'cc-2', name: 'Simpósio Internacional de Medicina Interna', category: 'Eventos Científicos' },
  { id: 'cc-3', name: 'Jornada Científica Anual da Entidade', category: 'Eventos Científicos' },
  { id: 'cc-4', name: 'Workshop de Atualização em Procedimentos', category: 'Eventos Científicos' },

  // Educação e EAD
  { id: 'cc-5', name: 'Plataforma EAD - Cursos Online', category: 'Educação' },
  { id: 'cc-6', name: 'Programa de Educação Médica Continuada', category: 'Educação' },
  { id: 'cc-7', name: 'Residência Médica e Especializações', category: 'Educação' },
  { id: 'cc-8', name: 'Bolsas de Estudo e Iniciação Científica', category: 'Educação' },

  // Associação e Anuidades
  { id: 'cc-9', name: 'Anuidades de Associados - Pessoa Física', category: 'Associação' },
  { id: 'cc-10', name: 'Anuidades de Associados - Pessoa Jurídica', category: 'Associação' },
  { id: 'cc-11', name: 'Taxas de Registro e Habilitação Profissional', category: 'Associação' },
  { id: 'cc-12', name: 'Certidões e Documentações Oficiais', category: 'Associação' },

  // Publicações e Comunicação
  { id: 'cc-13', name: 'Revista Científica e Publicações Periódicas', category: 'Publicações' },
  { id: 'cc-14', name: 'Portal Institucional e Comunicação Digital', category: 'Publicações' },
  { id: 'cc-15', name: 'Marketing de Eventos e Captação de Patrocínio', category: 'Publicações' },

  // Pesquisa e Inovação
  { id: 'cc-16', name: 'Projetos de Pesquisa Clínica', category: 'Pesquisa' },
  { id: 'cc-17', name: 'Núcleo de Tecnologia e Inovação', category: 'Pesquisa' },
  { id: 'cc-18', name: 'Registro de Estudos e Protocolos Clínicos', category: 'Pesquisa' },

  // Infraestrutura Operacional
  { id: 'cc-19', name: 'Sede Administrativa da Entidade', category: 'Infraestrutura' },
  { id: 'cc-20', name: 'Núcleo de Atendimento ao Associado', category: 'Infraestrutura' },
  { id: 'cc-21', name: 'Assessoria Jurídica e Contencioso', category: 'Infraestrutura' },
  { id: 'cc-22', name: 'Departamento Financeiro e Fiscal', category: 'Infraestrutura' },
];

export const COST_CENTER_CATEGORIES = [
  'Eventos Científicos',
  'Educação',
  'Associação',
  'Publicações',
  'Pesquisa',
  'Infraestrutura',
];
