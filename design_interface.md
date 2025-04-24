# Design da Interface Web - IA Assistente FlowOFF

## Estrutura de Navegação

A interface web da IA Assistente FlowOFF será organizada com a seguinte estrutura de navegação:

### Barra Lateral (Sidebar)
- Logo FlowOFF
- Menu principal:
  - Dashboard
  - Chat com IA
  - Tarefas
  - Calendário
  - Geração de Conteúdo
  - Configurações
- Informações do usuário
- Botão de logout

### Cabeçalho (Header)
- Título da página atual
- Barra de pesquisa
- Notificações
- Menu de perfil do usuário

### Área de Conteúdo Principal
- Conteúdo dinâmico baseado na seção selecionada
- Breadcrumbs para navegação
- Botões de ação contextual

## Wireframes das Páginas Principais

### Página de Login/Registro
- Formulário de login centralizado
- Opções para registro e recuperação de senha
- Autenticação de dois fatores (opcional)
- Logo e elementos de branding

### Dashboard
- Widgets de resumo (tarefas pendentes, próximos eventos)
- Gráficos de atividade recente
- Acesso rápido às funcionalidades mais usadas
- Feed de atualizações e notificações

### Chat com IA
- Interface de chat em tela cheia
- Histórico de mensagens à esquerda
- Área de conversa principal
- Campo de entrada de texto com opções de mídia
- Botões de ação rápida para criar tarefas/eventos

### Tarefas
- Visualização em lista e em quadro Kanban
- Filtros e opções de ordenação
- Formulário de criação/edição de tarefas
- Indicadores visuais de prioridade e status
- Integração com Notion visível

### Calendário
- Visualização mensal, semanal e diária
- Eventos coloridos por categoria
- Modal para criação/edição de eventos
- Opções para convidar participantes
- Integração com Google Calendar visível

### Geração de Conteúdo
- Seleção de tipo de conteúdo (post, email, etc.)
- Formulário para parâmetros de geração
- Visualização de conteúdo gerado
- Editor para ajustes
- Opções de exportação e compartilhamento

### Configurações
- Perfil do usuário
- Preferências de notificação
- Configuração de integrações
- Personalização da IA
- Gerenciamento de conta

## Paleta de Cores

Baseada na identidade visual da FlowOFF:

- **Cor Primária**: #FF0066 (Rosa neon)
- **Cor Secundária**: #1A1A1A (Preto)
- **Cor de Fundo**: #0D0D0D (Preto profundo)
- **Cor de Destaque**: #00FFCC (Turquesa neon)
- **Cor de Texto Principal**: #FFFFFF (Branco)
- **Cor de Texto Secundário**: #CCCCCC (Cinza claro)
- **Cores de Status**:
  - Sucesso: #00CC66 (Verde)
  - Alerta: #FFCC00 (Amarelo)
  - Erro: #FF3333 (Vermelho)
  - Informação: #3399FF (Azul)

## Tipografia

- **Fonte Principal**: Montserrat (Sans-serif)
  - Títulos: Montserrat Bold
  - Subtítulos: Montserrat SemiBold
  - Corpo: Montserrat Regular
  - Botões: Montserrat Medium

- **Fonte Secundária**: Roboto (Sans-serif)
  - Corpo de texto longo
  - Elementos de interface menores

## Componentes de UI

### Botões
- **Botão Primário**: Fundo rosa neon (#FF0066), texto branco, cantos arredondados
- **Botão Secundário**: Contorno rosa neon, texto rosa neon, fundo transparente
- **Botão Terciário**: Texto rosa neon, sem contorno ou fundo
- **Botão de Ação Flutuante**: Círculo rosa neon com ícone branco

### Campos de Formulário
- Fundo escuro (#1A1A1A)
- Borda fina cinza (#333333)
- Texto branco
- Destaque rosa neon quando em foco
- Ícones de apoio em cinza claro

### Cards
- Fundo ligeiramente mais claro que o fundo principal (#1A1A1A)
- Sombra sutil
- Cantos arredondados
- Cabeçalho com título em destaque
- Conteúdo com espaçamento adequado

### Tabelas
- Cabeçalho em fundo mais escuro
- Linhas alternadas com diferença sutil de cor
- Hover com destaque em rosa neon
- Paginação na parte inferior

### Modais
- Sobreposição escura semi-transparente
- Conteúdo em card centralizado
- Botão de fechar no canto superior direito
- Botões de ação na parte inferior

## Design Responsivo

### Desktop (1200px+)
- Layout completo com sidebar sempre visível
- Múltiplas colunas de conteúdo
- Visualização detalhada de dados

### Tablet (768px - 1199px)
- Sidebar colapsável
- Layout adaptado para menos colunas
- Alguns elementos secundários ocultos ou reduzidos

### Mobile (320px - 767px)
- Sidebar substituída por menu hambúrguer
- Layout de coluna única
- Elementos simplificados
- Navegação adaptada para toque
- Modais em tela cheia

## Microinterações e Feedback

- Animações sutis para transições entre páginas
- Feedback visual para ações (sucesso, erro, carregamento)
- Tooltips para elementos de interface não óbvios
- Indicadores de progresso para operações longas
- Notificações toast para alertas e confirmações

## Acessibilidade

- Contraste adequado entre texto e fundo
- Tamanhos de fonte ajustáveis
- Suporte a navegação por teclado
- Textos alternativos para imagens
- Estrutura semântica de HTML
- Compatibilidade com leitores de tela

## Protótipos de Telas Principais

Para a próxima fase, serão desenvolvidos protótipos detalhados das seguintes telas:

1. Página de Login/Registro
2. Dashboard principal
3. Interface de Chat com IA
4. Gerenciamento de Tarefas
5. Visualização de Calendário
6. Interface de Geração de Conteúdo
7. Tela de Configurações

Estes protótipos servirão como base para o desenvolvimento frontend e garantirão consistência visual em toda a aplicação.
