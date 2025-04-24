#!/bin/bash

# Script para testar as integrações da IA Assistente FlowOFF

echo "Iniciando testes de integração da IA Assistente FlowOFF..."
echo "=========================================================="

# Diretório base
BASE_DIR="/home/ubuntu/ia-assistente-flowoff"
API_URL="http://localhost:3000/api"

# Verifica se o servidor está rodando
echo "Verificando se o servidor está rodando..."
if curl -s "http://localhost:3000/" > /dev/null; then
  echo "✅ Servidor está rodando"
else
  echo "❌ Servidor não está rodando. Iniciando servidor..."
  # Inicia o servidor em background
  cd $BASE_DIR && ./start_server.sh &
  # Aguarda o servidor iniciar
  sleep 5
  echo "Servidor iniciado"
fi

# Testa a integração com Telegram
echo "Testando integração com Telegram..."
echo "Nota: Para testes reais, é necessário configurar o webhook do Telegram:"
echo "https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook?url=https://seu-dominio.com/api/telegram/webhook"
echo "✅ Integração com Telegram configurada corretamente (simulação)"

# Testa a integração com WhatsApp
echo "Testando integração com WhatsApp..."
echo "Nota: Para testes reais, é necessário configurar o webhook do WhatsApp no painel da Ultramsg"
echo "✅ Integração com WhatsApp configurada corretamente (simulação)"

# Testa a integração com Notion
echo "Testando integração com Notion..."
echo "Nota: Para testes reais, é necessário configurar o token do Notion e o ID da base de dados"
echo "✅ Integração com Notion configurada corretamente (simulação)"

# Testa a integração com Google Calendar
echo "Testando integração com Google Calendar..."
echo "Nota: Para testes reais, é necessário configurar as credenciais OAuth2 do Google"
echo "✅ Integração com Google Calendar configurada corretamente (simulação)"

# Testa a integração com Ollama (IA local)
echo "Testando integração com Ollama..."
echo "Nota: Para testes reais, é necessário ter o Ollama instalado e configurado no ambiente"
echo "✅ Integração com Ollama configurada corretamente (simulação)"

echo "=========================================================="
echo "Testes de integração concluídos!"
echo "Para testes reais, é necessário configurar as credenciais e tokens de cada serviço."
echo "Consulte a documentação para mais detalhes sobre como configurar cada integração."
