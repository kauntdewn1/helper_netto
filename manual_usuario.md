# Documentação da IA Assistente FlowOFF

## Visão Geral

A IA Assistente FlowOFF é um sistema projetado para atuar como um assessor executivo estratégico digital para Netto Mello, CEO e Head da FlowOFF. O sistema integra-se com múltiplas plataformas (Telegram, WhatsApp, Google Calendar, Notion) para oferecer uma experiência unificada de gestão de tarefas, agenda, mensagens e geração de conteúdo.

## Arquitetura do Sistema

O sistema é composto por:

1. **Backend Node.js**: Servidor Express que gerencia todas as operações e integrações
2. **Banco de Dados**: MongoDB para armazenamento de dados (usuários, mensagens, tarefas, eventos)
3. **Integrações**: Conectores para Telegram, WhatsApp, Google Calendar e Notion
4. **Núcleo de IA**: Sistema de processamento de linguagem natural baseado em Ollama

## Funcionalidades Principais

### Gestão de Tarefas e Agenda
- Organização de compromissos via Google Calendar
- Gerenciamento de tarefas com priorização
- Lembretes proativos
- Sincronização com Notion

### Comunicação e Mensagens
- Filtragem e priorização de mensagens
- Atendimento via Telegram e WhatsApp
- Respostas automatizadas para perguntas frequentes
- Detecção de sentimento e urgência

### Geração de Conteúdo
- Criação estratégica multicanal (Flow 360)
- Redação de posts, campanhas e microplanejamentos
- Sugestão de hashtags e palavras-chave

### Apoio à Decisão
- Análise de dados e contexto
- Memória contextual para retomar assuntos
- Recomendações baseadas em dados históricos

## Guia de Instalação

### Requisitos do Sistema
- Node.js 14+
- MongoDB
- Ollama (opcional, para processamento local de IA)
- Contas nas plataformas de integração (Telegram, WhatsApp Business, Google, Notion)

### Passos para Instalação

1. Clone o repositório:
```bash
git clone https://github.com/flowoff/ia-assistente.git
cd ia-assistente-flowoff
```

2. Instale as dependências:
```bash
cd backend
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha com suas credenciais e tokens

4. Inicie o servidor:
```bash
./start_server.sh
```

## Configuração das Integrações

### Telegram
1. Crie um bot no BotFather e obtenha o token
2. Configure o webhook: `https://api.telegram.org/bot{SEU_TOKEN}/setWebhook?url={SUA_URL}/api/telegram/webhook`
3. Adicione o token ao arquivo `.env`

### WhatsApp
1. Configure uma conta no Ultramsg
2. Configure o webhook para apontar para `{SUA_URL}/api/whatsapp/webhook`
3. Adicione as credenciais ao arquivo `.env`

### Google Calendar
1. Crie um projeto no Google Cloud Console
2. Ative a API do Google Calendar
3. Configure as credenciais OAuth2
4. Adicione as credenciais ao arquivo `.env`

### Notion
1. Crie uma integração no Notion
2. Obtenha o token de acesso
3. Compartilhe as bases de dados necessárias com a integração
4. Adicione o token ao arquivo `.env`

## Uso do Sistema

### Comandos Básicos (Telegram/WhatsApp)
- `/ajuda` - Exibe a lista de comandos disponíveis
- `/tarefa [título]` - Cria uma nova tarefa
- `/evento [título] [data] [hora]` - Cria um novo evento
- `/listar tarefas` - Lista as tarefas pendentes
- `/listar eventos` - Lista os próximos eventos
- `/gerar [tipo] [tema]` - Gera conteúdo (post, email, etc.)

### Exemplos de Uso
- "Crie uma tarefa para revisar a estratégia de marketing até sexta-feira"
- "Agende uma reunião com a equipe de design amanhã às 14h"
- "Quais são minhas prioridades para hoje?"
- "Gere um post para Instagram sobre marketing digital"

## Manutenção e Atualização

### Backup de Dados
- Configure backups regulares do MongoDB
- Exporte periodicamente as configurações e tokens

### Atualizações
- Verifique regularmente por atualizações no repositório
- Atualize as dependências com `npm update`
- Teste as novas versões em ambiente de desenvolvimento antes de atualizar em produção

### Monitoramento
- Verifique os logs em `logs/combined.log` e `logs/error.log`
- Configure alertas para erros críticos

## Solução de Problemas

### Problemas Comuns
- **Webhook não recebe mensagens**: Verifique a configuração do webhook e certifique-se de que a URL está acessível publicamente
- **Erros de autenticação**: Verifique se os tokens estão corretos e não expiraram
- **Respostas lentas**: Verifique a conexão com o servidor de IA e considere otimizar as consultas ao banco de dados

### Contato para Suporte
- Email: suporte@flowoff.xyz
- Telegram: @flowoff_suporte

## Roadmap de Desenvolvimento Futuro

### Próximas Funcionalidades
- Dashboard visual para métricas e desempenho
- Integração com mais plataformas (LinkedIn, Twitter)
- Sistema avançado de análise de sentimento
- Personalização de respostas por cliente

### Melhorias Planejadas
- Otimização de desempenho
- Interface administrativa web
- Suporte a múltiplos idiomas
- Análise preditiva para sugestões proativas
