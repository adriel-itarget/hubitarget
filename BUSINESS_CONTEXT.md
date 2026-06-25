# iTarget Hub — Contexto do Projeto

## Visão do Produto

A iTarget é uma plataforma SaaS projetada para **entidades médicas** (associações, sociedades científicas, conselhos de classe) com dois objetivos centrais:

1. **Independência técnica total do gestor** — a administração da entidade gerencia tudo sem depender de equipe de TI. Cadastros, relatórios, financeiro, eventos, comunicação: tudo por interface visual, sem código.

2. **Gestão 360° da carreira do médico** — a plataforma acompanha o profissional desde a fase de estudante, passando por residência, especializações, certificações, participação em eventos científicos, produção acadêmica, até a maturidade profissional e aposentadoria honorária.

A proposta de valor é **agregar valor à experiência de ser associado**: o médico não paga anuidade apenas por pertencer a uma entidade — ele recebe benefícios concretos como cashback, acesso a educação de qualidade, participação em eventos científicos de alto nível, certificações reconhecidas e uma carteira digital com recompensas.

---

## Princípios de Design

| Princípio | Significado |
|---|---|
| **Independência do gestor** | Nenhuma operação requer conhecimento técnico. Interface autoexplicativa. |
| **Visibilidade total** | O gestor vê tudo: cada associado, cada centavo, cada evento, cada certificação. Sem surpresas. |
| **Jornada do profissional** | A plataforma acompanha o médico ao longo de toda a carreira, não apenas em momentos isolados. |
| **Valor percebido** | Cada interação com a plataforma deve reforçar que ser associado compensa. |
| **Dados protegidos** | LGPD é nativa, não um adendo. Dados pessoais sempre mascarados. |

---

## Ciclo de Vida do Associado (Jornada 360°)

A plataforma modela a carreira médica como uma jornada contínua:

```
Estudante de Medicina
    │
    ▼
Recém-formado (Aspirante)
    │
    ▼
Especialização / Residência
    │
    ▼
Profissional Titular (especialista certificado)
    │
    ▼
Maturidade Profissional (docência, mentoria, diretoria)
    │
    ▼
Sênior / Honorário (título vitalício de reconhecimento)
```

Em cada fase, a plataforma oferece recursos relevantes:

| Fase | Recursos da Plataforma |
|---|---|
| **Estudante** | Cursos introdutórios, banco de questões, acesso a eventos com desconto, cashback por participação |
| **Aspirante** | Inscrição em provas de título, mentoria com titulares, trilhas de especialização |
| **Titular** | Gestão de certificações, submissão de trabalhos científicos, participação como avaliador, cashback por fidelidade |
| **Maturidade** | Carga docente, banca de examinadores, comissões, cargos na diretoria |
| **Honorário** | Reconhecimento vitalício, isenção de anuidade (Remido), acesso vitalício a eventos e cursos |

---

## Estrutura Organizacional da Entidade

A entidade médica é composta por:

- **Diretoria** — conselho de administração com cargos (Presidente, Vice-Presidente, Tesoureiro, Secretário, etc.)
- **Comissões** — grupos temáticos de trabalho (ex: Comissão de Ética, Comissão de Eventos)
- **Departamentos** — unidades operacionais responsáveis por cada área de atuação
- **Regionais** — filiais regionais com municípios vinculados e regras de repasse de valores
- **Cargos e Tipos de Órgãos** — estrutura formal de governança

A entidade configura sua própria identidade visual, textos institucionais e regras de associação diretamente pela plataforma.

---

## Departamentos

A plataforma é organizada em departamentos, cada um responsável por uma área de atuação da entidade. Todos os departamentos possuem operações financeiras básicas (baixa de pagamentos, tesouraria parcial) que convergem para o **Financeiro Geral (Tesouraria Central)**.

### 1. Associação

Departamento central de gestão de membros e regras institucionais.

**Responsabilidades:**
- Gestão do cadastro de associados (Pessoa Física e Pessoa Jurídica)
- Configuração e aplicação de **anuidades** com valores por categoria
- Definição de **categorias de associação** (Titular, Aspirante, Honorário, Estudante)
- Gestão de **regras de associação** (critérios de admissão, permanência, desligamento)
- Administração da **diretoria**, **comissões** e **departamentos** da instituição
- Gestão de **regionais** e **regras de repasse de valores** entre matriz e filiais
- Configuração de **modelos de e-mail** referentes a comunicação associativa
- **Financeiro do departamento (tesouraria da associação):** gestão de pagamentos de anuidades, contas a pagar e receber específicas do departamento associativo

**Status do associado:**

| Status | Significado |
|---|---|
| Adimplente | Anuidades em dia |
| Em débito | Inadimplente com anuidades |
| Pendente | Aguardando aprovação de cadastro |
| Inativo | Não participa mais |
| Remido | Isento de anuidades (título honorário) |

**Fluxo de aprovação de novo associado:**
1. Cadastro com documentos (Diploma de Medicina, RG, CPF, Comprovante de Residência)
2. Status fica **Pendente**
3. Administrador revisa e Aprova ou Reprova
4. Se aprovado → **Adimplente** | Se reprovado → **Inativo**

**Dados profissionais rastreados:**
- Graduação e faculdade
- Especialização e áreas de atuação
- Títulos e certificações obtidas
- Participação em eventos (como ouvinte, autor, avaliador)
- Produção científica (trabalhos submetidos e publicados)
- Histórico de anuidades e pagamentos
- Nível de gamificação e cashback acumulado

**Dados protegidos por LGPD:** CPF, e-mail, telefone e endereço ficam mascarados por padrão, visíveis apenas no detalhe.

---

### 2. Financeiro (Tesouraria Geral)

Departamento central que consolida todas as movimentações financeiras de todos os demais departamentos. Funciona como a **tesouraria geral** da entidade.

**Responsabilidades:**
- Consolidação de receitas e despesas de todos os departamentos
- Gestão por **centro de custo** — cada centro representa um departamento, evento, curso ou meio de arrecadação distinto
- Configuração dos **meios de pagamento** da entidade: lista de integrações disponíveis para "instalar" (Rede, Cielo, PagSeguro, MercadoPago, Pagar.me, Banco do Brasil, etc.)
- Para cada integração, seleção dos **meios de pagamento** disponíveis: PIX, boleto, cartão de crédito, cartão de débito, outros
- Elaboração do **demonstrativo financeiro completo** da entidade
- Vinculação de cada operação financeira a um **plano de contas** para mensurar gastos e receitas

**Centros de custo:**

| Centro | Tipo |
|---|---|
| Associação | Departamento (anuidades, custos fixos) |
| Eventos | Por evento específico (inscrições, patrocínios) |
| Cursos | Por curso ou atividade educacional |
| Exames | Por processo de prova |
| Cashback | Saídas de recompensas |
| Serviços/Residência | Custos operacionais do programa |

**Fluxo financeiro:**
```
Departamento (lançamento local)
    │
    ▼
Plano de Contas (classificação contábil)
    │
    ▼
Centro de Custo (rateio)
    │
    ▼
Tesouraria Geral (consolidação + demonstrativo)
```

**Meios de pagamento integrados:**

| Provedor | Meios Disponíveis |
|---|---|
| Banco do Brasil | Boleto, PIX |
| Cielo | Cartão de Crédito, Cartão de Débito |
| Rede | Cartão de Crédito, Cartão de Débito |
| PagSeguro | Cartão, Boleto, PIX |
| MercadoPago | Cartão, Boleto, PIX |
| Pagar.me | Cartão, Boleto, PIX |
| Vindi | Cartão, Boleto, PIX (recorrente) |

**Status de lançamento:** Confirmado ou Pendente

---

### 3. Exames

Departamento responsável pelos processos de certificação e prova de título de especialista.

**Responsabilidades:**
- Gestão de **inscrições em exames** para especialista
- Cada edição possui **edital próprio** com regras específicas
- **Submissão de documentos** obrigatórios pelo candidato
- **Aprovação cadastral** e documental do candidato
- **Pagamento de inscrição** via meios de pagamento configurados
- **Liberação dos locais de prova** após confirmação
- **Aplicação da prova** e registro de resultados
- **Exibição dos resultados** aos candidatos
- **Abertura de recurso** e apelação do resultado

**Etapas do processo (workflow completo):**
1. Edital publicado (regras, datas, locais)
2. Inscrições abertas (com pagamento)
3. Análise documental (aprovação/reprovação cadastral)
4. Locais de prova liberados
5. Aplicação da prova
6. Resultado publicado
7. Período de recurso/apelação
8. Resultado final

**Modalidades de prova:** Escrita, Oral, Prática, Análise de Currículo, Entrevista

**Categorias de candidatos:** Titular, Aspirante, Estudante, Recertificação, Internacional

**Documentos exigidos:** Diploma de Medicina, Currículo Lattes, Certidão de Ética, Comprovante de Especialização, Foto 3x4, Comprovante de Pagamento

**Financeiro do departamento:** cada inscrição gera um lançamento vinculado ao centro de custo "Exames" e ao plano de contas correspondente.

---

### 4. Cursos / EAD (LMS)

Módulo de educação médica continuada — plataforma LMS completa integrada ao ecossistema da entidade.

**Responsabilidades:**
- Gestão de **cursos online, presenciais e híbridos**
- Organização do conteúdo em **módulos e submódulos** (ou trilha simples)
- **Aulas ao vivo ou gravadas** com controle de acesso
- Aplicação de **quizzes e enquetes** ao longo do curso
- Configuração de **regras de aprovação**: nota ou média mínima para emissão de certificado
- **Emissão de certificado** automático ao atender critérios
- Acompanhamento de desempenho do aluno por curso e trilha

**Tipos de atividade:** Curso Online, Presencial, Híbrido, Workshop

**Categorias:** Cardiologia Intervencionista, Ecocardiografia, Eletrofisiologia, Insuficiência Cardíaca, Prevenção Cardiovascular

**Banco de questões:** Questões de múltipla escolha organizadas por eixo temático (Fisiopatologia, Diagnóstico, Tratamento, Prevenção, Hemodinâmica, Eletrofisiologia) e nível de dificuldade (Fácil, Médio, Difícil).

**Estrutura de um curso:**
```
Curso
├── Módulo 1 (ex: Fundamentos)
│   ├── Aula 1 (vídeo ao vivo ou gravado)
│   ├── Aula 2
│   └── Quiz (aprovatório ou apenas avaliação)
├── Módulo 2 (ex: Aplicação Clínica)
│   ├── Aula 3
│   ├── Enquete
│   └── Aula 4
└── Avaliação Final
    ├── Quiz final (nota mínima para certificado)
    └── Certificado emitido (se aprovado)
```

**Financeiro do departamento:** cada inscrição em curso gera receita vinculada ao centro de custo "Cursos" e ao plano de contas correspondente.

---

### 5. Serviços e Residência

Departamento que acompanha o acadêmico em fase de residência médica, registrando sua jornada de formação.

**Responsabilidades:**
- Acompanhamento do **residente** ao longo do programa
- Computação de **atendimentos (log book)** realizados
- Registro de **desempenho** no processo de residência médica
- Relatórios de progresso para a entidade e para o residente
- Vinculação com o cadastro profissional do associado

**Dados rastreados por residente:**
- Período do programa
- Serviço/rotação atual
- Número de atendimentos realizados (log book)
- Procedimentos assistidos ou executados
- Avaliações de desempenho
- Situação no programa (ativo, afastado, concluído)

**Financeiro do departamento:** custos operacionais do programa de residência, eventualmente com descontos ou bolsas vinculadas ao associado residente.

---

### 6. Eventos

Departamento de gestão de eventos científicos, feiras, simpósios, workshops e demais atividades promovidas pela entidade. Este é o módulo mais complexo da plataforma, pois envolve múltiplos atores (organizadores, palestrantes, avaliadores, participantes) e fluxos paralelos.

**Responsabilidades gerais:**
- Criação e configuração de **eventos** (congressos, simpósios, workshops, jornadas, seminários)
- Gestão de **inscrições** com **preços diferenciados** (associado em dia recebe desconto)
- Cada evento é um **centro de custo distinto** (pode ter regras e categorias de participação próprias)
- Controle de **vagas, lotes de inscrição** e prazos

**Status de um evento:**
`Planejamento` → `Inscrições Abertas` → `Em Andamento` → `Encerrado`

---

#### 6.1 Programação Científica

Gerenciamento completo da grade de atividades científicas do evento.

**Estrutura da programação:**
```
Evento
├── Tema / Eixo Temático (ex: Cardiologia Clínica, Intervencionismo)
│   ├── Sessão 1 (ex: Mesa Redonda)
│   │   ├── Palestra A (horário, sala, palestrante)
│   │   ├── Palestra B
│   │   └── Debate
│   ├── Sessão 2 (ex: Workshop Prático)
│   │   ├── Aula Teórica
│   │   └── Simulação
│   └── Sessão 3 (ex: Apresentação de Trabalhos)
│       ├── Trabalho 1 (apresentador)
│       ├── Trabalho 2
│       └── Discussão
```

**Entidades da programação:**
- **Tema/Eixo Temático** — categoria científica que agrupa sessões relacionadas
- **Sessão** — bloco de atividades em um horário e local específicos (Mesa Redonda, Workshop, Simpósio, Apresentação de Trabalhos, Palestra Magna, etc.)
- **Palestra** — apresentação individual dentro de uma sessão, vinculada a um palestrante
- **Horário e Local** — sala, data, horário de início e fim

**Operações do organizador:**
- Criar e editar temas eixos temáticos do evento
- Criar sessões dentro de cada tema
- Definir horários, salas e capacidade de cada sessão
- Vincular palestras às sessões
- Convidar palestrantes para cada palestra
- Reorganizar a grade (arrastar e soltar, conflitos de horário)
- Publicar ou ocultar a programação

---

#### 6.2 Palestrantes

Gestão do ciclo de vida dos palestrantes, desde o convite até a apresentação.

**Fluxo do palestrante:**
```
Convite enviado
    │
    ▼
Pendente de resposta
    │
    ├── Aceitou → Confirmado → Apresentou → Avaliado
    │
    └── Recusou → Encerrado
```

**Dados do palestrante (perfil público):**
- Nome, titulação e afiliação institucional
- Biografia e currículo resumido
- Foto e links (Lattes, LinkedIn, etc.)
- Áreas de atuação e especialidades
- Histórico de palestras em eventos anteriores da entidade

**Espaço do palestrante (portal próprio):**
- Edição do perfil e currículo
- Visualização das palestras vinculadas
- Upload de materiais (apresentações, abstracts)
- Confirmação ou recusa de convites
- Comunicação com o organizador

**Status do convite:**

| Status | Significado |
|---|---|
| Enviado | Convite disparado, aguardando resposta |
| Aceito | Palestrante confirmou participação |
| Recusado | Palestrante recusou o convite |
| Confirmado | Detalhes finais alinhados (horário, sala, tema) |
| Apresentado | Palestra realizada |
| Avaliado | Recebeu avaliação dos participantes |

---

#### 6.3 Avaliadores (Revisores)

Cadastro e gestão dos profissionais que avaliam trabalhos científicos submetidos ao evento.

**Dados do avaliador:**
- Vínculo com o cadastro de associado (ou convidado externo)
- Áreas de especialização (para匹配 com trabalhos)
- Carga máxima de trabalhos por evento
- Histórico de avaliações e notas atribuídas

**Operações do organizador:**
- Cadastrar avaliadores para o evento
- Definir área de atuação e carga máxima
- Distribuir trabalhos submetidos entre os avaliadores disponíveis
- Acompanhar o progresso das avaliações
- Resolver conflitos (reavaliar, redistribuir)

---

#### 6.4 Trabalhos Científicos (Submissão e Avaliação)

Fluxo completo de submissão de trabalhos científicos com suporte a **múltiplas fases**, dependendo da regra de cada evento.

**Atributos de um trabalho:**
- Título e resumo (abstract)
- Autor principal e coautores
- Tema/eixo temático de enquadramento
- Modalidade de apresentação (Pôster, Oral, Virtual)
- Arquivo do manuscrito (PDF)
- Status atual e fase corrente

**Status de um trabalho:**

| Status | Significado |
|---|---|
| Rascunho | Trabalho em criação, ainda não submetido |
| Submetido | Enviado, aguardando distribuição |
| Em Avaliação | Designado para um avaliador |
| Avaliado | Nota atribuída por um avaliador |
| Em Revisão | Devolvido ao autor para correções (fase de revisão) |
| Re-submetido | Autor reenviou após correções |
| Aceito | Trabalho aceito para apresentação |
| Rejeitado | Trabalho recusado |
| Desclassificado | Não atendeu aos critérios em alguma fase |

**Fluxo de avaliação com múltiplas fases:**
```
Fase 1: Submissão
    │  (autor envia trabalho)
    ▼
Fase 2: Triagem Inicial
    │  (organizador verifica completude e enquadramento)
    │  → Desclassificado (incompleto / fora do escopo)
    ▼
Fase 3: Avaliação por Pares
    │  (1-3 avaliadores atribuem nota)
    │  → Média calculada
    ▼
Fase 4: Revisão (opcional, depende da regra do evento)
    │  (trabalho devolvido ao autor com observações)
    │  → Autor corrige e re-submete
    ▼
Fase 5: Avaliação Final
    │  (re-avaliação após revisão, se houve)
    │  → Nota final definida
    ▼
Fase 6: Decisão
    │  (organizador aceita ou rejeita com base na nota e critérios)
    ▼
Apresentação → Certificado
```

**Regras configuráveis por evento:**
- Número de fases de avaliação (1, 2 ou mais)
- Quantidade de avaliadores por trabalho (1, 2 ou 3)
- Nota mínima para aprovação
- Se há fase de revisão (sim/não)
- Se o autor pode responder ao avaliador
- Prazo máximo por fase
- Critério de desempate

**Distribuição de trabalhos:**
- Automática (sistema distribui por área de especialização do avaliador)
- Manual (organizador designa avaliador por trabalho)
- Híbrida (automática com ajuste manual)

---

**Regra de precificação:** Associados adimplentes acessam lotes e valores com desconto. A diferença de preço é um dos principais incentivos à manutenção da adimplência.

**Financeiro do departamento:** cada inscrição em evento gera receita vinculada ao centro de custo específico daquele evento. Patrocínios e apoiamentos também são registrados como receita do evento.

---

## Modelo Financeiro Unificado

Todos os departamentos possuem operações financeiras básicas que convergem para o **Financeiro Geral**:

### Princípio

```
┌─────────────────────────────────────────────────────────┐
│                    TESOURARIA GERAL                      │
│              (consolidação + demonstrativo)              │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│ Associação│ Eventos  │ Cursos   │ Exames   │ Residência  │
│ (anuidades)│ (inscrições)│ (cursos)│ (provas)│ (programa)  │
└──────────┴──────────┴──────────┴──────────┴─────────────┘
         ▲            ▲          ▲          ▲            ▲
         │            │          │          │            │
    Lançamentos locais de cada departamento
    (baixa de pagamento + tesouraria básica)
```

### Plano de Contas

Cada operação financeira (receita ou despesa) é vinculada a um **plano de contas** que permite:
- Mensurar receitas e despesas por natureza
- Elaborar o demonstrativo financeiro completo
- Gerar relatórios por centro de custo, período, categoria ou combinação

**Exemplos de categorias do plano de contas:**

| Tipo | Categoria | Departamento de Origem |
|---|---|---|
| Receita | Anuidades | Associação |
| Receita | Inscrições em Eventos | Eventos |
| Receita | Cursos e Certificações | Cursos |
| Receita | Inscrições em Exames | Exames |
| Receita | Patrocínios | Eventos |
| Receita | Assinaturas SaaS | Plataforma |
| Despesa | Custos Fixos (aluguel, limpeza) | Associação |
| Despesa | Tecnologia (licenças, infra) | Plataforma |
| Despesa | Material Didático | Cursos |
| Despesa | Pagamento de Palestrantes | Eventos |
| Despesa | Cashback (saídas) | Cashback |
| Despesa | Bolsas e Residência | Residência |

### Demonstrativo Financeiro

O demonstrativo consolida todas as movimentações e permite ao gestor visualizar:
- **Receita total** por período, centro de custo e categoria
- **Despesa total** por período, centro de custo e categoria
- **Saldo (lucro/prejuízo)** consolidado e por departamento
- **Fluxo de caixa** (entradas vs. saídas)
- **Inadimplência** (valores a receber vs. recebidos)
- **Projeções** com base no histórico

---

## Cashback e Gamificação

Sistema de recompensas que transforma a associação em uma experiência com valor tangível.

**Moedas duais:**
- **Cash (R$)** — valor monetário resgatável via PIX
- **Pontos (pts)** — determinam o nível de gamificação

**Níveis de gamificação:**

| Nível | Pontos | Benefício |
|---|---|---|
| Bronze | 0 – 500 | Acesso básico |
| Prata | 501 – 1.500 | Descontos em eventos |
| Ouro | 1.501 – 3.000 | Descontos em cursos + cashback aumentado |
| Platina | 3.001 – 5.000 | Acesso prioritário + bônus exclusivos |
| Diamante | 5.001+ | Todos os benefícios + reconhecimento público |

**Tipos de campanha:** Anuidade, Evento, Educação, Indicação, Fidelidade

**Configuração por produto:** tipo de pontuação (cash/pontos), valor (% ou fixo), expiração, carência, recorrência (única vez, diário, mensal, anual, indeterminado).

**Lógica de engajamento:** Quanto mais o associado participa (paga anuidade, vai a eventos, faz cursos, indica colegas), mais acumula em cash e pontos. O nível sobe automaticamente, destravando novos benefícios.

---

## Assinaturas da Plataforma (SaaS)

A entidade paga por módulos contratados:

| Produto | Preço | Status |
|---|---|---|
| Gestão de Membros | R$ 99/mês | Ativo |
| Portal Financeiro | R$ 149/mês | Ativo |
| Analytics Avançado | R$ 129/mês | Teste |

**Meios de pagamento aceitos:** Boleto, PIX, Cartão de Crédito/Débito (via integrações configuradas no módulo Financeiro).

---

## Controle de Acesso (RBAC)

| Perfil | Permissões |
|---|---|
| Administrador | Total (visualizar, editar, gerenciar usuários, configurações) |
| Gestor | Visualizar + Editar |
| Editor | Visualizar + Editar (limitado) |
| Visualizador | Somente visualização |

**Fluxo de convite:** Admin convida → e-mail enviado → status "Pendente" → usuário aceita → status "Ativo".

---

## Regras de Negócio Importantes

1. **Preço diferenciado** — Associados adimplentes pagam menos em eventos e cursos (vantagem concreta de ser membro)
2. **Inscrições automáticas** — Associados qualificados são inscritos automaticamente em eventos relevantes
3. **Multi-fase em exames** — Provas de título têm fase escrita + fase prática, cada uma com edital próprio
4. **Revisão por pares** — Trabalhos científicos são avaliados por avaliadores designados
5. **Cashback como engajamento** — Recompensas por anuidade em dia, participação em eventos, conclusão de cursos
6. **LGPD obrigatória** — Dados pessoais sempre mascarados, visíveis apenas no detalhe
7. **Gestão documental** — Associados e candidatos devem enviar documentos obrigatórios para aprovação
8. **Jornada contínua** — A plataforma nunca "reseta" o associado; todo histórico é preservado e acumula ao longo da carreira
9. **Centro de custo por evento** — Cada evento é um centro de custo independente com suas regras financeiras
10. **Plano de contas obrigatório** — Toda operação financeira deve ser classificada no plano de contas para demonstrativo completo
11. **Convergência financeira** — O financeiro de cada departamento converge para a tesouraria geral, que consolida tudo

---

## Mapa de Entidades (Resumo)

```
Entidade Médica
├── Dados da Entidade (perfil, identidade visual, regras)
├── Diretoria / Comissões / Departamentos
│
├── [DEPARTAMENTO] Associação
│   ├── Associados (PF/PJ) + Categoria + Status
│   ├── Anuidades e Regras de Associação
│   ├── Cadastro Profissional (especialidade, faculdade, áreas)
│   ├── Regionais + Regras de Repasse
│   ├── Modelos de E-mail
│   └── Tesouraria Parcial (anuidades, contas a pagar/receber)
│
├── [DEPARTAMENTO] Financeiro (Tesouraria Geral)
│   ├── Centros de Custo (por departamento/evento/curso)
│   ├── Plano de Contas
│   ├── Meios de Pagamento (integrações instaláveis)
│   ├── Demonstretivo Financeiro Completo
│   └── Consolidação de Todos os Departamentos
│
├── [DEPARTAMENTO] Exames
│   ├── Processos de Prova (multi-fase)
│   ├── Editais com Regras Próprias
│   ├── Candidatos → Documentos → Aprovação → Pagamento
│   ├── Locais de Prova
│   ├── Resultados + Recursos + Apelações
│   └── Tesouraria Parcial (inscrições)
│
├── [DEPARTAMENTO] Cursos / EAD (LMS)
│   ├── Cursos (online, presencial, híbrido)
│   ├── Módulos / Submódulos / Trilhas
│   ├── Aulas (ao vivo ou gravadas)
│   ├── Quizzes e Enquetes
│   ├── Regras de Aprovação → Certificado
│   ├── Banco de Questões
│   └── Tesouraria Parcial (inscrições)
│
├── [DEPARTAMENTO] Serviços e Residência
│   ├── Programa de Residência
│   ├── Log Book (atendimentos)
│   ├── Desempenho do Residente
│   └── Tesouraria Parcial (custos do programa)
│
├── [DEPARTAMENTO] Eventos
│   ├── Eventos Científicos (congressos, simpósios, etc.)
│   ├── Inscrições (preço diferenciado para associados)
│   ├── Programação Científica
│   │   ├── Temas / Eixos Temáticos
│   │   ├── Sessões (Mesa Redonda, Workshop, Simpósio, etc.)
│   │   ├── Palestras (horário, sala, vinculação)
│   │   └── Grade horária completa
│   ├── Palestrantes
│   │   ├── Convite → Aceite/Recusa → Confirmação
│   │   ├── Perfil público (bio, foto, currículo)
│   │   └── Portal do palestrante (edição de perfil, materiais)
│   ├── Avaliadores (Revisores)
│   │   ├── Cadastro por área de especialização
│   │   ├── Carga máxima por evento
│   │   └── Distribuição de trabalhos
│   ├── Trabalhos Científicos
│   │   ├── Submissão (título, resumo, autores, arquivo)
│   │   ├── Triagem inicial
│   │   ├── Avaliação por pares (1-3 avaliadores)
│   │   ├── Fase de revisão (opcional, configurável)
│   │   ├── Re-submissão
│   │   ├── Decisão final (aceito/rejeitado)
│   │   └── Regras configuráveis por evento (fases, prazos, critérios)
│   ├── Cada evento = centro de custo distinto
│   └── Tesouraria Parcial (inscrições + patrocínios)
│
└── Cashback e Gamificação
    ├── Campanhas (por tipo)
    └── Carteiras de usuários (cash + pontos + nível)
```
