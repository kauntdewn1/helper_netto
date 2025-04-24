# Guia de Instalação e Configuração - IA Assistente FlowOFF

Este guia fornece instruções detalhadas para instalar, configurar e manter a IA Assistente FlowOFF.

## Requisitos de Sistema

- **Sistema Operacional**: Linux, macOS ou Windows com WSL
- **Node.js**: Versão 14.0.0 ou superior
- **MongoDB**: Versão 4.4 ou superior
- **Ollama**: Instalado localmente para processamento de IA (opcional)
- **Conexão com Internet**: Necessária para integrações com APIs externas

## Instalação

### 1. Preparação do Ambiente

```bash
# Instalar Node.js (se ainda não estiver instalado)
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar MongoDB (se ainda não estiver instalado)
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. Obtenção do Código

```bash
# Clonar o repositório
git clone https://github.com/flowoff/ia-assistente.git
cd ia-assistente-flowoff
```

### 3. Instalação de Dependências

```bash
# Instalar dependências do backend
cd backend
npm install
```

### 4. Configuração de Variáveis de Ambiente

Crie um arquivo `.env` no diretório `backend` com as seguintes variáveis:

```
# Servidor
PORT=3000
NODE_ENV=production

# Banco de Dados
MONGODB_URI=mongodb://localhost:27017/ia-assistente-flowoff

# APIs
TELEGRAM_TOKEN=seu_token_do_telegram
NOTION_TOKEN=seu_token_do_notion
ULTRAMSG_INSTANCE=sua_instancia_ultramsg
ULTRAMSG_TOKEN=seu_token_ultramsg

# Configurações de IA
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama3

# Segurança
JWT_SECRET=seu_jwt_secret_aqui
```

## Configuração das Integrações

### Telegram

1. Crie um bot no Telegram usando o BotFather:
   - Abra o Telegram e busque por "@BotFather"
   - Envie o comando `/newbot`
   - Siga as instruções para criar o bot
   - Copie o token fornecido

2. Configure o webhook para receber mensagens:
   ```
   curl -F "url=https://seu-dominio.com/api/telegram/webhook" https://api.telegram.org/bot{SEU_TOKEN}/setWebhook
   ```

3. Adicione o token ao arquivo `.env`

### WhatsApp (via Ultramsg)

1. Crie uma conta no [Ultramsg](https://ultramsg.com/)
2. Configure um dispositivo e obtenha o token e ID da instância
3. Configure o webhook para apontar para `https://seu-dominio.com/api/whatsapp/webhook`
4. Adicione as credenciais ao arquivo `.env`

### Notion

1. Acesse [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Clique em "New integration"
3. Dê um nome à integração (ex: "IA Assistente FlowOFF")
4. Selecione o workspace onde a integração será usada
5. Clique em "Submit"
6. Copie o "Internal Integration Token"
7. Compartilhe as bases de dados necessárias com a integração:
   - Abra a base de dados no Notion
   - Clique em "Share" no canto superior direito
   - Adicione a integração que você acabou de criar

8. Adicione o token ao arquivo `.env`

### Google Calendar

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative a API do Google Calendar
4. Configure as credenciais OAuth2:
   - Crie um ID de cliente OAuth
   - Configure as URIs de redirecionamento autorizadas
   - Baixe o arquivo JSON de credenciais

5. Siga o fluxo de autenticação OAuth2 para obter um token de acesso
6. Armazene o token e as credenciais em um local seguro

## Inicialização do Sistema

### Iniciar o Servidor

```bash
# Usando o script de inicialização
cd /caminho/para/ia-assistente-flowoff
chmod +x start_server.sh
./start_server.sh

# Ou manualmente
cd /caminho/para/ia-assistente-flowoff/backend
node src/server.js
```

### Configurar como Serviço (Systemd)

Para garantir que o servidor seja executado automaticamente na inicialização do sistema e seja reiniciado em caso de falha, você pode configurá-lo como um serviço systemd:

1. Crie um arquivo de serviço:

```bash
sudo nano /etc/systemd/system/ia-assistente.service
```

2. Adicione o seguinte conteúdo:

```
[Unit]
Description=IA Assistente FlowOFF
After=network.target mongodb.service

[Service]
Type=simple
User=seu_usuario
WorkingDirectory=/caminho/para/ia-assistente-flowoff
ExecStart=/bin/bash /caminho/para/ia-assistente-flowoff/start_server.sh
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=ia-assistente

[Install]
WantedBy=multi-user.target
```

3. Ative e inicie o serviço:

```bash
sudo systemctl enable ia-assistente
sudo systemctl start ia-assistente
```

4. Verifique o status:

```bash
sudo systemctl status ia-assistente
```

## Manutenção

### Backup do Banco de Dados

Configure backups regulares do MongoDB:

```bash
# Criar diretório para backups
mkdir -p /caminho/para/backups

# Script de backup
mongodump --db ia-assistente-flowoff --out /caminho/para/backups/$(date +%Y-%m-%d)
```

Adicione este script a um cron job para execução automática:

```bash
# Editar crontab
crontab -e

# Adicionar linha para backup diário às 2h da manhã
0 2 * * * mongodump --db ia-assistente-flowoff --out /caminho/para/backups/$(date +%Y-%m-%d)
```

### Atualização do Sistema

Para atualizar o sistema:

```bash
# Parar o serviço
sudo systemctl stop ia-assistente

# Fazer backup do banco de dados
mongodump --db ia-assistente-flowoff --out /caminho/para/backups/pre-update-$(date +%Y-%m-%d)

# Atualizar o código
cd /caminho/para/ia-assistente-flowoff
git pull

# Atualizar dependências
cd backend
npm install

# Reiniciar o serviço
sudo systemctl start ia-assistente
```

### Monitoramento de Logs

Os logs do sistema são armazenados em:

- `/caminho/para/ia-assistente-flowoff/logs/combined.log` - Todos os logs
- `/caminho/para/ia-assistente-flowoff/logs/error.log` - Apenas erros

Para monitorar os logs em tempo real:

```bash
tail -f /caminho/para/ia-assistente-flowoff/logs/combined.log
```

Para monitorar apenas erros:

```bash
tail -f /caminho/para/ia-assistente-flowoff/logs/error.log
```

## Solução de Problemas

### Servidor não inicia

1. Verifique os logs de erro:
   ```bash
   cat /caminho/para/ia-assistente-flowoff/logs/error.log
   ```

2. Verifique se o MongoDB está em execução:
   ```bash
   sudo systemctl status mongod
   ```

3. Verifique se as variáveis de ambiente estão configuradas corretamente:
   ```bash
   cat /caminho/para/ia-assistente-flowoff/backend/.env
   ```

### Webhooks não recebem mensagens

1. Verifique se o servidor está acessível publicamente
2. Confirme se os webhooks estão configurados corretamente:
   - Telegram: `https://api.telegram.org/bot{SEU_TOKEN}/getWebhookInfo`
   - WhatsApp: Verifique no painel do Ultramsg

3. Verifique os logs para erros relacionados aos webhooks

### Problemas de autenticação com APIs externas

1. Verifique se os tokens não expiraram
2. Confirme se as permissões estão configuradas corretamente
3. Renove os tokens se necessário

## Contato para Suporte

Se você encontrar problemas que não consegue resolver, entre em contato:

- Email: suporte@flowoff.xyz
- Telegram: @flowoff_suporte
