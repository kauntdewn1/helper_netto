#!/bin/bash

# Script para executar testes de desempenho e segurança no site da IA Assistente FlowOFF
# Este script deve ser executado após a implantação da versão de teste

# Definir cores para saída
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Iniciando testes de desempenho e segurança para o site da IA Assistente FlowOFF...${NC}"

# Diretório para armazenar resultados dos testes
RESULTS_DIR="/home/ubuntu/ia-assistente-flowoff/test_results"
mkdir -p $RESULTS_DIR

# Data e hora para identificação dos relatórios
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# URL do site para testes
SITE_URL="https://ia-assistente-flowoff.com"

# Verificar se o Lighthouse está instalado
if ! [ -x "$(command -v lighthouse)" ]; then
  echo -e "${YELLOW}Lighthouse não encontrado. Instalando...${NC}"
  npm install -g lighthouse
fi

# Verificar se o OWASP ZAP está instalado
if ! [ -x "$(command -v zap-cli)" ]; then
  echo -e "${YELLOW}OWASP ZAP CLI não encontrado. Instalando...${NC}"
  pip install --upgrade zapcli
fi

# Teste de desempenho com Lighthouse
echo -e "${YELLOW}Executando teste de desempenho com Lighthouse...${NC}"
lighthouse $SITE_URL --output=html --output-path=$RESULTS_DIR/lighthouse_report_$TIMESTAMP.html --chrome-flags="--headless --no-sandbox"

# Verificar se o teste de desempenho foi bem-sucedido
if [ $? -ne 0 ]; then
  echo -e "${RED}Falha ao executar teste de desempenho. Verifique os logs para mais detalhes.${NC}"
else
  echo -e "${GREEN}Teste de desempenho concluído. Relatório salvo em: $RESULTS_DIR/lighthouse_report_$TIMESTAMP.html${NC}"
fi

# Teste de segurança básico com OWASP ZAP
echo -e "${YELLOW}Executando teste de segurança básico com OWASP ZAP...${NC}"
zap-cli quick-scan --self-contained --start-options "-config api.disablekey=true" $SITE_URL -o $RESULTS_DIR/zap_report_$TIMESTAMP.html

# Verificar se o teste de segurança foi bem-sucedido
if [ $? -ne 0 ]; then
  echo -e "${RED}Falha ao executar teste de segurança. Verifique os logs para mais detalhes.${NC}"
else
  echo -e "${GREEN}Teste de segurança concluído. Relatório salvo em: $RESULTS_DIR/zap_report_$TIMESTAMP.html${NC}"
fi

# Teste de carga básico com Apache Benchmark
echo -e "${YELLOW}Executando teste de carga básico com Apache Benchmark...${NC}"
ab -n 100 -c 10 -g $RESULTS_DIR/ab_results_$TIMESTAMP.tsv $SITE_URL/ > $RESULTS_DIR/ab_report_$TIMESTAMP.txt

# Verificar se o teste de carga foi bem-sucedido
if [ $? -ne 0 ]; then
  echo -e "${RED}Falha ao executar teste de carga. Verifique os logs para mais detalhes.${NC}"
else
  echo -e "${GREEN}Teste de carga concluído. Relatório salvo em: $RESULTS_DIR/ab_report_$TIMESTAMP.txt${NC}"
fi

echo -e "${GREEN}Todos os testes foram concluídos. Verifique os relatórios em: $RESULTS_DIR${NC}"
echo -e "${YELLOW}Após analisar os resultados, você pode prosseguir com a implantação em produção.${NC}"

exit 0
