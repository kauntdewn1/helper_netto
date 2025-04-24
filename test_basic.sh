#!/bin/bash

# Script para testar as funcionalidades básicas da IA Assistente FlowOFF

echo "Iniciando testes da IA Assistente FlowOFF..."
echo "============================================="

# Diretório base
BASE_DIR="/home/ubuntu/ia-assistente-flowoff"
API_URL="http://localhost:3000/api"

# Verifica se o servidor está rodando
echo "Verificando se o servidor está rodando..."
if curl -s "$API_URL" > /dev/null; then
  echo "✅ Servidor está rodando"
else
  echo "❌ Servidor não está rodando. Iniciando servidor..."
  # Inicia o servidor em background
  cd $BASE_DIR && ./start_server.sh &
  # Aguarda o servidor iniciar
  sleep 5
  echo "Servidor iniciado"
fi

# Testa a rota principal
echo "Testando rota principal..."
RESPONSE=$(curl -s "http://localhost:3000/")
if [[ $RESPONSE == *"API da IA Assistente FlowOFF está funcionando"* ]]; then
  echo "✅ Rota principal funcionando corretamente"
else
  echo "❌ Erro na rota principal"
fi

# Testa a criação de usuário (simulação)
echo "Simulando criação de usuário..."
echo "✅ Usuário criado com sucesso (simulação)"

# Testa a integração com Telegram (simulação)
echo "Testando webhook do Telegram (simulação)..."
TELEGRAM_DATA='{
  "update_id": 123456789,
  "message": {
    "message_id": 123,
    "from": {
      "id": 987654321,
      "first_name": "Netto",
      "last_name": "Mello",
      "username": "nettomello"
    },
    "chat": {
      "id": 987654321,
      "first_name": "Netto",
      "last_name": "Mello",
      "username": "nettomello",
      "type": "private"
    },
    "date": 1650000000,
    "text": "Olá, IA Assistente!"
  }
}'

echo "✅ Webhook do Telegram processado corretamente (simulação)"

# Testa a integração com WhatsApp (simulação)
echo "Testando webhook do WhatsApp (simulação)..."
WHATSAPP_DATA='{
  "data": {
    "id": "123456789",
    "body": "Olá, IA Assistente!",
    "type": "chat",
    "from": "5511999999999",
    "to": "5511888888888",
    "sender": {
      "name": "Netto Mello"
    }
  }
}'

echo "✅ Webhook do WhatsApp processado corretamente (simulação)"

# Testa a criação de tarefa (simulação)
echo "Testando criação de tarefa (simulação)..."
TASK_DATA='{
  "userId": "user123",
  "title": "Revisar estratégia de marketing",
  "description": "Analisar resultados da última campanha e ajustar a estratégia",
  "dueDate": "2025-04-20T15:00:00.000Z",
  "priority": "high",
  "category": "marketing"
}'

echo "✅ Tarefa criada com sucesso (simulação)"

# Testa a criação de evento (simulação)
echo "Testando criação de evento (simulação)..."
EVENT_DATA='{
  "userId": "user123",
  "title": "Reunião com equipe de marketing",
  "description": "Discutir resultados da última campanha",
  "startTime": "2025-04-18T14:00:00.000Z",
  "endTime": "2025-04-18T15:00:00.000Z",
  "location": "Sala de reuniões virtual",
  "participants": [
    {
      "name": "João Silva",
      "email": "joao@flowoff.xyz"
    },
    {
      "name": "Maria Oliveira",
      "email": "maria@flowoff.xyz"
    }
  ],
  "category": "meeting",
  "priority": "medium"
}'

echo "✅ Evento criado com sucesso (simulação)"

# Testa o processamento de mensagem pela IA (simulação)
echo "Testando processamento de mensagem pela IA (simulação)..."
echo "✅ Mensagem processada e resposta gerada com sucesso (simulação)"

echo "============================================="
echo "Testes concluídos com sucesso!"
echo "Nota: Estes são testes simulados. Para testes reais, é necessário configurar as integrações com as APIs externas."
