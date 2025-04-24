# Documentação Técnica - IA Assistente FlowOFF

## Visão Geral da Arquitetura

A IA Assistente FlowOFF é uma aplicação web moderna construída com uma arquitetura de camadas que separa claramente o frontend do backend, permitindo escalabilidade e manutenção simplificada.

### Arquitetura Geral

```
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
|  Cliente (Web)   | <-> |  Backend Node.js | <-> |  Serviços de IA  |
|                  |     |                  |     |                  |
+------------------+     +------------------+     +------------------+
                               |
                               v
                         +------------------+
                         |                  |
                         |   MongoDB        |
                         |   (Banco de      |
                         |    Dados)        |
                         |                  |
                         +------------------+
```

## Frontend

### Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface de usuário
- **Material-UI**: Framework de componentes React para design consistente
- **React Router**: Gerenciamento de rotas e navegação
- **Axios**: Cliente HTTP para comunicação com o backend
- **Socket.IO Client**: Comunicação em tempo real
- **Webpack**: Empacotamento e otimização de assets

### Estrutura de Diretórios

```
frontend/
├── public/               # Arquivos estáticos
├── src/                  # Código-fonte
│   ├── components/       # Componentes reutilizáveis
│   ├── contexts/         # Contextos React para gerenciamento de estado
│   ├── pages/            # Componentes de página
│   ├── services/         # Serviços de API e integrações
│   ├── utils/            # Utilitários e funções auxiliares
│   ├── App.js            # Componente principal
│   ├── AppProviders.js   # Provedores de contexto
│   ├── index.js          # Ponto de entrada
│   └── theme.js          # Configuração de tema
├── webpack.config.js     # Configuração de desenvolvimento
└── webpack.prod.js       # Configuração de produção
```

### Contextos

O frontend utiliza o Context API do React para gerenciamento de estado:

- **AuthContext**: Gerencia autenticação e sessão do usuário
- **MessageContext**: Gerencia conversas e mensagens
- **TaskContext**: Gerencia tarefas e atividades
- **EventContext**: Gerencia eventos do calendário
- **ContentContext**: Gerencia geração de conteúdo
- **RealTimeContext**: Gerencia comunicação em tempo real

## Backend

### Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web para Node.js
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **Socket.IO**: Comunicação em tempo real
- **JWT**: Autenticação baseada em tokens
- **Winston**: Logging

### Estrutura de Diretórios

```
backend/
├── src/
│   ├── controllers/      # Controladores de rotas
│   ├── models/           # Modelos de dados (Mongoose)
│   ├── routes.js         # Definição de rotas
│   ├── server.js         # Configuração do servidor
│   ├── services/         # Serviços de negócio
│   └── utils/            # Utilitários
├── .env                  # Variáveis de ambiente
└── package.json          # Dependências
```

### Modelos de Dados

- **User**: Informações do usuário e autenticação
- **Message**: Mensagens e conversas
- **Task**: Tarefas e atividades
- **Event**: Eventos do calendário

### Serviços

- **AIService**: Integração com modelos de IA
- **TelegramService**: Integração com Telegram
- **WhatsAppService**: Integração com WhatsApp
- **NotionService**: Integração com Notion
- **GoogleCalendarService**: Integração com Google Calendar

## Implantação

### Ambiente de Produção

- **Frontend**: Hospedado como site estático
- **Backend**: Servidor Node.js
- **URL de Produção**: https://urpzovvu.manus.space

### Configuração de Servidor

O servidor web utiliza Nginx com as seguintes configurações:

- Redirecionamento HTTP para HTTPS
- Certificados SSL via Let's Encrypt
- Compressão de arquivos estáticos
- Cache para recursos estáticos
- Proxy reverso para API e Socket.IO

### Scripts de Implantação

- **build_deploy.sh**: Compila o frontend e prepara para implantação
- **deploy_test_version.sh**: Implanta versão de teste
- **setup_ssl.sh**: Configura certificados SSL
- **run_tests.sh**: Executa testes de desempenho e segurança

## Segurança

### Medidas Implementadas

- Autenticação JWT com tokens de acesso e refresh
- Senhas armazenadas com hash e salt
- HTTPS para todas as comunicações
- Proteção contra CSRF
- Validação de entrada em todas as APIs
- Rate limiting para prevenção de ataques de força bruta
- Headers de segurança (HSTS, X-Content-Type-Options, etc.)

## Monitoramento e Logs

- Logs estruturados via Winston
- Monitoramento de erros
- Rastreamento de atividades do usuário
- Métricas de desempenho

## Manutenção e Atualizações

### Procedimento para Atualizações

1. Desenvolver e testar mudanças em ambiente local
2. Implantar em ambiente de teste
3. Executar testes automatizados
4. Implantar em produção
5. Monitorar logs e métricas após implantação

### Backup

- Backup diário do banco de dados
- Backup semanal completo da aplicação
- Retenção de backups por 30 dias

## Extensibilidade

A arquitetura foi projetada para facilitar extensões futuras:

- Novos serviços podem ser adicionados como módulos independentes
- Novas integrações podem ser implementadas através da interface de serviços
- Frontend modular permite adição de novas funcionalidades sem afetar as existentes

---

Desenvolvido por FlowOFF - 2025
