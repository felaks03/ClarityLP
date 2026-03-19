#!/bin/bash

# Clarity Landing Page - Development Server
# Este script instala dependencias e inicia el servidor de desarrollo

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Clarity Landing Page${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install --legacy-peer-deps
    echo -e "${GREEN}✓ Dependencies installed${NC}"
    echo ""
else
    echo -e "${GREEN}✓ Dependencies already installed${NC}"
    echo ""
fi

# Run npm audit fix silently if needed
if npm audit 2>&1 | grep -q "vulnerabilities"; then
    echo -e "${YELLOW}🔒 Fixing security vulnerabilities...${NC}"
    npm audit fix --legacy-peer-deps 2>/dev/null || true
    echo -e "${GREEN}✓ Security check complete${NC}"
    echo ""
fi

echo -e "${YELLOW}🚀 Starting development server...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

npm start
