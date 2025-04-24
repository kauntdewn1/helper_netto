#!/bin/bash

# Script para configuração de certificados SSL usando Let's Encrypt
# Este script deve ser executado no servidor de produção

# Definir cores para saída
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Iniciando configuração de certificados SSL para ia-assistente-flowoff.com...${NC}"

# Verificar se o certbot está instalado
if ! [ -x "$(command -v certbot)" ]; then
  echo -e "${YELLOW}Certbot não encontrado. Instalando...${NC}"
  sudo apt-get update
  sudo apt-get install -y certbot python3-certbot-nginx
fi

# Obter certificados SSL
echo -e "${YELLOW}Obtendo certificados SSL via Let's Encrypt...${NC}"
sudo certbot --nginx -d ia-assistente-flowoff.com -d www.ia-assistente-flowoff.com --non-interactive --agree-tos --email netto@flowoff.xyz

# Verificar se a obtenção de certificados foi bem-sucedida
if [ $? -ne 0 ]; then
  echo -e "${RED}Falha ao obter certificados SSL. Verifique os logs para mais detalhes.${NC}"
  exit 1
fi

# Configurar renovação automática de certificados
echo -e "${YELLOW}Configurando renovação automática de certificados...${NC}"
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

echo -e "${GREEN}Configuração de certificados SSL concluída com sucesso!${NC}"
echo -e "${YELLOW}Os certificados serão renovados automaticamente antes de expirarem.${NC}"

exit 0
