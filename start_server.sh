#!/bin/bash

# Script para iniciar o servidor da IA Assistente FlowOFF

# Navega para o diretório do backend
cd /home/ubuntu/ia-assistente-flowoff/backend

# Cria diretório de logs se não existir
mkdir -p logs

# Configura variáveis de ambiente adicionais para Ultramsg (WhatsApp)
export ULTRAMSG_INSTANCE="instance123456"
export ULTRAMSG_TOKEN="abcdef123456"

# Inicia o servidor usando nodemon para desenvolvimento
echo "Iniciando servidor da IA Assistente FlowOFF..."
npx nodemon src/server.js
