#!/bin/bash

# Script para implantar a versão de teste do site da IA Assistente FlowOFF
# Este script executa o build e implanta o site para testes

# Definir cores para saída
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Iniciando implantação da versão de teste do site da IA Assistente FlowOFF...${NC}"

# Diretório do projeto
PROJECT_DIR="/home/ubuntu/ia-assistente-flowoff"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BUILD_DIR="$FRONTEND_DIR/build"

# Navegar para o diretório do frontend
cd $FRONTEND_DIR

# Instalar dependências
echo -e "${YELLOW}Instalando dependências...${NC}"
npm install

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

echo -e "${GREEN}Build concluído com sucesso!${NC}"
echo -e "${YELLOW}Preparando para implantação da versão de teste...${NC}"

# Criar diretório para implantação de teste se não existir
mkdir -p $PROJECT_DIR/test_deployment

# Copiar arquivos de build para diretório de implantação de teste
echo -e "${YELLOW}Copiando arquivos para diretório de implantação de teste...${NC}"
cp -r $BUILD_DIR/* $PROJECT_DIR/test_deployment/

# Verificar se a cópia foi bem-sucedida
if [ $? -ne 0 ]; then
  echo -e "${RED}Falha ao copiar arquivos. Abortando.${NC}"
  exit 1
fi

echo -e "${GREEN}Arquivos copiados com sucesso!${NC}"
echo -e "${YELLOW}Implantando versão de teste...${NC}"

# Usar a ferramenta de implantação para criar um site estático temporário
echo -e "${YELLOW}Implantando site para testes...${NC}"

# Comando para implantar o site usando a ferramenta deploy_apply_deployment
echo -e "${GREEN}Versão de teste pronta para implantação!${NC}"
echo -e "${YELLOW}Para implantar o site de teste, execute o comando:${NC}"
echo -e "  deploy_apply_deployment --type static --local_dir $PROJECT_DIR/test_deployment"

exit 0
