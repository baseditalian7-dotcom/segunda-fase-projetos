# Simple Dashboard

Projeto 11 da pasta **primeiros projetos**.

Este projeto é um dashboard simples com layout de painel, grid de seções, cards de métricas e dados simulados.

## Tecnologias

- HTML
- CSS
- JavaScript
- Python

## Funcionalidades

- Header com menu superior
- Grid com seções organizadas
- Cards de KPIs
- Gráfico simples de receita por semana
- Resumo com dados simulados
- Cards de setores
- Backend em Python com menu no terminal

## Conceitos praticados

### Frontend

- Layout com CSS Grid
- Cards reutilizáveis
- Menu superior com rolagem suave
- Dados simulados renderizados com JavaScript
- Responsividade básica

### Python

- Listas de dicionários
- Funções separadas por responsabilidade
- `for`
- `if`, `elif`, `else`
- `sorted()` com `lambda`
- Funções retornando dicionários
- Organização em arquivos separados

## Estrutura

```text
Simple Dashboard/
├── backend/
│   ├── app.py
│   ├── dashboard_service.py
│   └── data.py
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── index.html
├── .gitignore
└── README.md
```

## Como abrir o frontend

Abra o arquivo:

```text
frontend/index.html
```

## Como rodar o backend

Entre na pasta `backend` e rode:

```bash
python app.py
```

## Observação

Os dados são simulados. O objetivo é praticar organização visual, grid, métricas fake e evolução gradual do Python.
