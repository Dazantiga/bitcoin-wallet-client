# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [0.0.6] - 2024-03-19

### Segurança
- Migração do `react-scripts` para o Vite para resolver vulnerabilidades de dependências
- Atualização de todas as dependências para as versões mais recentes e seguras

### Alterado
- Configuração do projeto para usar Vite como bundler
- Atualização do sistema de build para melhor performance
- Modernização da estrutura do projeto

### Removido
- Dependência do `react-scripts` e suas configurações
- Arquivos de configuração legados

### Adicionado
- Arquivo de configuração `vite.config.js`
- Variáveis de ambiente para Vite no arquivo `.env`
- Suporte a TypeScript nativo através do Vite

### Correções
- Resolução de vulnerabilidades em dependências transitivas
- Otimização do processo de build

## [0.0.5] - 2024-03-19
- Versão inicial do projeto 