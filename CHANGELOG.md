# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não publicado]

### Segurança
- Atualização do `axios` para versão 1.6.7 para corrigir vulnerabilidades
- Atualização de todas as dependências do FontAwesome para versão 6.5.1
- Atualização do `bootstrap` para versão 5.3.3
- Atualização de bibliotecas de teste (@testing-library) para versões mais recentes

### Alterado
- Migração do Chartist para Recharts (biblioteca de gráficos moderna)
- Atualização do React e dependências relacionadas para versão 18
- Atualização do React Router para versão 6
- Substituição do `node-sass` por `sass` moderno

### Removido
- Remoção do `chartist` e `chartist-plugin-tooltips-updated`
- Remoção do `react-chartist`
- Remoção dos arquivos de estilo do Chartist

### Adicionado
- Adição do Recharts versão 2.12.1 para visualização de dados
- Adição de plugins modernos do Babel como devDependencies
- Implementação de novos componentes de gráfico usando Recharts:
  - SalesValueChart
  - SalesValueChartphone
  - CircleChart
  - BarChart

### Correções
- Correção de dependências ausentes (peer dependencies)
- Adição do @popperjs/core necessário para o Bootstrap
- Adição do @testing-library/dom necessário para testes

## [0.0.5] - 2024-03-19
- Versão inicial do projeto 