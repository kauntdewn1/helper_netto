#!/bin/bash

# Script de build e implantação para o site da IA Assistente FlowOFF
# Este script compila o frontend e prepara os arquivos para implantação permanente

# Definir cores para saída
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Iniciando processo de build para implantação...${NC}"

# Navegar para o diretório do frontend
cd /home/ubuntu/ia-assistente-flowoff/frontend

# Instalar dependências
echo -e "${YELLOW}Instalando dependências...${NC}"
npm install --production=false

# Verificar se a instalação foi bem-sucedida
if [ $? -ne 0 ]; then
  echo -e "${RED}Falha ao instalar dependências. Abortando.${NC}"
  exit 1
fi

# Executar build de produção
echo -e "${YELLOW}Executando build de produção...${NC}"
npm run build

# Verificar se o build foi bem-sucedido
if [ $? -ne 0 ]; then
  echo -e "${RED}Falha ao executar build. Abortando.${NC}"
  exit 1
fi

# Criar diretório de implantação se não existir
mkdir -p /home/ubuntu/ia-assistente-flowoff/deployment

# Copiar arquivos de build para diretório de implantação
echo -e "${YELLOW}Copiando arquivos para diretório de implantação...${NC}"
cp -r /home/ubuntu/ia-assistente-flowoff/frontend/build/* /home/ubuntu/ia-assistente-flowoff/deployment/

# Verificar se a cópia foi bem-sucedida
if [ $? -ne 0 ]; then
  echo -e "${RED}Falha ao copiar arquivos. Abortando.${NC}"
  exit 1
fi

echo -e "${GREEN}Build concluído com sucesso!${NC}"
echo -e "${GREEN}Arquivos prontos para implantação em: /home/ubuntu/ia-assistente-flowoff/deployment/${NC}"
echo -e "${YELLOW}Para implantar o site, execute o comando:${NC}"
echo -e "  deploy_apply_deployment --type static --local_dir /home/ubuntu/ia-assistente-flowoff/deployment"

exit 0
