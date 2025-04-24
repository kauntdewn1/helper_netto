# Guia de Desenvolvimento - IA Assistente FlowOFF

Este documento fornece informações técnicas detalhadas para desenvolvedores que desejam estender ou modificar a IA Assistente FlowOFF.

## Arquitetura do Sistema

### Visão Geral

A IA Assistente FlowOFF segue uma arquitetura modular baseada em serviços, com os seguintes componentes principais:

```
ia-assistente-flowoff/
├── backend/               # Servidor Node.js
│   ├── src/
│   │   ├── controllers/   # Controladores de rotas
│   │   ├── models/        # Modelos de dados
│   │   ├── services/      # Serviços de negócios
│   │   ├── integrations/  # Integrações com APIs externas
│   │   └── utils/         # Utilitários
│   ├── config/            # Configurações
│   └── tests/             # Testes
├── ai-core/               # Núcleo de IA e processamento
├── integrations/          # Módulos de integração
└── docs/                  # Documentação
```

### Fluxo de Dados

1. **Entrada de Mensagens**:
   - Mensagens recebidas via webhooks (Telegram, WhatsApp)
   - Requisições HTTP para a API REST

2. **Processamento**:
   - Roteamento para controladores apropriados
   - Processamento de intenções pela IA
   - Execução de ações baseadas nas intenções identificadas

3. **Integrações Externas**:
   - Comunicação com APIs de terceiros (Notion, Google Calendar)
   - Envio de respostas para plataformas de mensagens

4. **Persistência**:
   - Armazenamento de dados no MongoDB
   - Caching para otimização de desempenho

## Modelos de Dados

### User

```javascript
{
  name: String,
  email: String,
  phone: String,
  preferences: {
    language: String,
    notifications: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Message

```javascript
{
  user: ObjectId,
  platform: String, // 'telegram', 'whatsapp', 'web'
  direction: String, // 'incoming', 'outgoing'
  content: String,
  metadata: {
    messageId: String,
    chatId: String,
    contactName: String,
    contactPhone: String,
    priority: String,
    category: String
  },
  createdAt: Date
}
```

### Task

```javascript
{
  user: ObjectId,
  title: String,
  description: String,
  status: String, // 'pending', 'in_progress', 'completed', 'cancelled'
  priority: String, // 'low', 'medium', 'high', 'urgent'
  dueDate: Date,
  category: String,
  notionId: String,
  reminderSet: Boolean,
  reminderTime: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Event

```javascript
{
  user: ObjectId,
  title: String,
  description: String,
  startTime: Date,
  endTime: Date,
  location: String,
  participants: [{
    name: String,
    email: String,
    confirmed: Boolean
  }],
  googleCalendarId: String,
  reminderSet: Boolean,
  reminderTime: Date,
  category: String,
  priority: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Serviços Principais

### AIService

Responsável pelo processamento de linguagem natural e geração de respostas.

Métodos principais:
- `processMessage(message, user)`: Processa uma mensagem e gera uma resposta
- `identifyIntent(message)`: Identifica a intenção do usuário
- `generateResponse(message, history)`: Gera uma resposta usando o modelo de IA

### TelegramService

Gerencia a comunicação com a API do Telegram.

Métodos principais:
- `sendMessage(chatId, text, options)`: Envia uma mensagem para um chat
- `setWebhook(url)`: Configura o webhook para receber atualizações
- `processUpdate(update)`: Processa uma atualização recebida do Telegram

### WhatsAppService

Gerencia a comunicação com a API do WhatsApp via Ultramsg.

Métodos principais:
- `sendMessage(phone, message)`: Envia uma mensagem para um número
- `sendMedia(phone, mediaUrl, caption, mediaType)`: Envia uma mídia
- `processUpdate(update)`: Processa uma atualização recebida do webhook

### NotionService

Gerencia a integração com a API do Notion.

Métodos principais:
- `getPage(pageId)`: Busca uma página pelo ID
- `queryDatabase(databaseId, filter, sorts)`: Consulta itens em uma base de dados
- `createPage(properties, parentId, parentType)`: Cria uma página
- `updatePage(pageId, properties)`: Atualiza uma página

### GoogleCalendarService

Gerencia a integração com a API do Google Calendar.

Métodos principais:
- `setupAuth(credentials, token)`: Configura a autenticação
- `listEvents(timeMin, timeMax, maxResults)`: Lista eventos do calendário
- `createEvent(eventData)`: Cria um evento
- `updateEvent(eventId, eventData)`: Atualiza um evento
- `deleteEvent(eventId)`: Remove um evento

## API REST

### Endpoints

#### Mensagens
- `POST /api/telegram/webhook`: Webhook para mensagens do Telegram
- `POST /api/whatsapp/webhook`: Webhook para mensagens do WhatsApp
- `GET /api/messages`: Lista mensagens de um usuário

#### Tarefas
- `POST /api/tasks`: Cria uma nova tarefa
- `GET /api/tasks`: Lista tarefas de um usuário
- `PUT /api/tasks/:taskId`: Atualiza uma tarefa
- `DELETE /api/tasks/:taskId`: Remove uma tarefa

#### Eventos
- `POST /api/events`: Cria um novo evento
- `GET /api/events`: Lista eventos de um usuário
- `PUT /api/events/:eventId`: Atualiza um evento
- `DELETE /api/events/:eventId`: Remove um evento

## Processamento de Linguagem Natural

### Identificação de Intenções

O sistema identifica as seguintes intenções:
- `task_creation`: Criação de tarefas
- `event_creation`: Criação de eventos
- `question`: Perguntas gerais
- `content_generation`: Geração de conteúdo
- `general`: Mensagens gerais

### Contexto e Memória

O sistema mantém um contexto para cada usuário, armazenando:
- Histórico de conversas recentes
- Timestamp da última interação
- Preferências do usuário

## Extensão do Sistema

### Adicionando Novas Integrações

1. Crie um novo serviço em `src/services/`
2. Implemente os métodos necessários para comunicação com a API externa
3. Adicione as configurações necessárias ao arquivo `.env`
4. Atualize os controladores para utilizar o novo serviço

### Adicionando Novas Funcionalidades

1. Identifique o componente que precisa ser modificado
2. Implemente a nova funcionalidade no serviço apropriado
3. Atualize os controladores e rotas conforme necessário
4. Adicione testes para a nova funcionalidade

### Personalização do Modelo de IA

O sistema utiliza Ollama como base para processamento de linguagem natural. Para personalizar:

1. Modifique o prompt do sistema em `src/services/AIService.js`
2. Ajuste os parâmetros de geração conforme necessário
3. Treine o modelo com exemplos específicos do domínio

## Testes

### Testes Unitários

Execute os testes unitários com:

```bash
cd backend
npm test
```

### Testes de Integração

Execute os testes de integração com:

```bash
cd backend
npm run test:integration
```

### Testes Manuais

Use os scripts de teste fornecidos:

```bash
./test_basic.sh
./test_integrations.sh
```

## Boas Práticas de Desenvolvimento

1. **Versionamento**: Use Git para controle de versão e siga o fluxo de trabalho GitFlow
2. **Documentação**: Documente todas as funções e classes com JSDoc
3. **Testes**: Escreva testes para todas as novas funcionalidades
4. **Segurança**: Nunca armazene tokens ou credenciais no código
5. **Logging**: Use o sistema de logging para registrar eventos importantes
6. **Tratamento de Erros**: Implemente tratamento adequado de erros em todas as operações
7. **Código Limpo**: Siga as convenções de estilo e mantenha o código limpo e legível

## Recursos Adicionais

- [Documentação do Node.js](https://nodejs.org/docs/latest-v16.x/api/)
- [Documentação do Express](https://expressjs.com/en/4x/api.html)
- [Documentação do MongoDB](https://docs.mongodb.com/manual/)
- [Documentação da API do Telegram](https://core.telegram.org/bots/api)
- [Documentação da API do Notion](https://developers.notion.com/)
- [Documentação da API do Google Calendar](https://developers.google.com/calendar/api/guides/overview)
