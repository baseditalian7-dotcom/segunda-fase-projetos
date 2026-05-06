# Customer List CRUD

Projeto 13 da segunda fase de aprendizado.

Este projeto é uma lista de clientes com CRUD básico: cadastrar, editar, remover e listar clientes dinamicamente na tela.

## Tecnologias

- HTML
- CSS
- JavaScript
- Python

## Funcionalidades

- Cadastro de clientes
- Edição de clientes
- Remoção de clientes
- Lista dinâmica na tela
- Busca por nome, e-mail ou empresa
- Contadores de clientes
- Persistência no navegador com `localStorage`
- Backend Python com CRUD no terminal

## Conceitos praticados

### Frontend

- Formulários
- Eventos de `submit` e `click`
- Manipulação de lista no DOM
- Modo de edição
- `localStorage`
- Busca dinâmica
- Cards de resumo

### Python

- Lista de dicionários
- Funções de CRUD
- Busca por ID
- `append`
- `pop`
- `for`
- `try/except`
- Validação simples

## Estrutura

```text
Customer List CRUD/
├── backend/
│   ├── app.py
│   ├── customer_service.py
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
