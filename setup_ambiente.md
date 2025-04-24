# Configuração do Ambiente de Desenvolvimento

Este documento descreve a configuração do ambiente de desenvolvimento para a IA Assistente da FlowOFF.

## Requisitos do Sistema

- Node.js (para o backend principal)
- Python (para processamento de dados e integrações)
- MongoDB (para armazenamento de dados)
- APIs de integração (Telegram, WhatsApp, Google Calendar, Notion)

## Estrutura de Diretórios

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
│   ├── models/            # Modelos de IA
│   ├── memory/            # Sistema de memória contextual
│   ├── processors/        # Processadores de linguagem natural
│   └── generators/        # Geradores de conteúdo
├── integrations/          # Módulos de integração
│   ├── telegram/          # Integração com Telegram
│   ├── whatsapp/          # Integração com WhatsApp
│   ├── calendar/          # Integração com Google Calendar
│   └── notion/            # Integração com Notion
└── docs/                  # Documentação
```

## Configuração do Backend

### Instalação de Dependências

```bash
# Inicializar projeto Node.js
mkdir -p ia-assistente-flowoff/backend
cd ia-assistente-flowoff/backend
npm init -y

# Instalar dependências principais
npm install express mongoose dotenv cors helmet winston axios

# Dependências de desenvolvimento
npm install --save-dev nodemon jest supertest
```

### Configuração do Servidor Express

Criar arquivo `app.js` com a configuração básica do servidor Express.

### Configuração do Banco de Dados

Configurar conexão com MongoDB para armazenamento de dados.

## Configuração do Núcleo de IA

### Instalação de Dependências Python

```bash
# Criar ambiente virtual Python
python -m venv ia-assistente-flowoff/ai-core/venv
source ia-assistente-flowoff/ai-core/venv/bin/activate

# Instalar dependências
pip install requests numpy pandas scikit-learn nltk transformers
```

### Integração com Ollama

Configurar integração com Ollama para processamento de linguagem natural.

## Configuração das Integrações

### Telegram

Configurar bot do Telegram usando o token fornecido: 7907372134:XXXXX_oJ6CVOU0ywjdC5dQUkGAuLSeVw

### WhatsApp

Configurar integração com WhatsApp Business API via Ultramsg, utilizando o webhook: https://botzap_flowhub.replit.app/webhook

### Notion

Configurar integração com Notion usando o token: ntn_2222700071XXXXXWGNY8SXuAARkC8FkuEE3fra

### Google Calendar

Configurar integração com Google Calendar para gerenciamento de compromissos.

## Variáveis de Ambiente

Criar arquivo `.env` para armazenar variáveis de ambiente sensíveis:

```
# Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados
MONGODB_URI=mongodb://localhost:27017/ia-assistente-flowoff

# APIs
TELEGRAM_TOKEN=7907372134:XXXXX_oJ6CVOU0ywjdC5dQUkGAuLSeVw
NOTION_TOKEN=ntn_2222700071XXXXXWGNY8SXuAARkC8FkuEE3fra
WHATSAPP_WEBHOOK=https://botzap_flowhub.replit.app/webhook

# Segurança
JWT_SECRET=seu_jwt_secret_aqui
```

## Scripts de Inicialização

Adicionar scripts ao `package.json` para facilitar o desenvolvimento:

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "test": "jest"
}
```

## Próximos Passos

1. Implementar estrutura básica do servidor
2. Configurar conexão com banco de dados
3. Implementar integração com Telegram (prioridade 2)
4. Implementar integração com WhatsApp (prioridade 1)
5. Implementar integração com Notion e Google Calendar
6. Desenvolver núcleo de IA para processamento de mensagens
