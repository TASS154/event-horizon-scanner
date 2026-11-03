# Event Horizon Scanner

Projeto da **Sprint 4** de Web Development + Front-End Design (FIAP). É a evolução direta do
projeto entregue na Sprint 3: a mesma solução da Challenge (aplicativo que escaneia documentos,
lê o texto com OCR, trata com IA e gera resumo, PDF ou áudio), agora com roteamento, hooks
customizados, Tailwind CSS e consumo de API.

## Tecnologias utilizadas

- **React 19** — componentes funcionais, JSX e comunicação por props
- **React Router DOM 7** — rotas públicas e rota privada
- **Hooks nativos** — `useState`, `useEffect`, `useLocation`, `useNavigate`
- **Hooks customizados** — `useAuth`, `useDocumentos`, `useHistorico` e `useDocumentosComunidade`,
  separando a lógica de negócio dos componentes visuais
- **Tailwind CSS 4** — toda a estilização e a responsividade (Desktop, Tablet e Mobile)
- **FakerJS (`@faker-js/faker`, locale pt-BR)** — API mockada consumida na página Central
- **localStorage** — persistência de login, capturas, histórico e lixeira
- **Objeto `Math`** (`Math.random`, `Math.round`, `Math.ceil`) — simulação de OCR
- **Vite 8** — servidor de desenvolvimento e build de produção

## Como instalar as dependências

Pré-requisito: **Node.js 22.12.0 ou superior** instalado (compatível com os requisitos do Vite 8 e do plugin React utilizado neste projeto).

No terminal, dentro da pasta do projeto:

```bash
npm install
```

## Como executar o projeto

Ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite mostra no terminal o endereço local (em geral `http://localhost:5173`). Abra esse endereço
no navegador.

Build de produção:

```bash
npm run build
npm run preview
```

Não é necessário nenhum passo extra para o Tailwind: ele roda como plugin do Vite
(`@tailwindcss/vite`), já configurado em `vite.config.js`.

## Como executar os servidores (Back-end)

**Este projeto não possui back-end próprio.** É uma aplicação 100% front-end. O requisito de
consumo de API é atendido por uma **API mockada com FakerJS**, implementada em
`src/servicos/apiComunidade.js`: ela expõe a função assíncrona `buscarDocumentosComunidade()`,
que devolve uma `Promise` com documentos fictícios em português e um atraso de rede simulado —
exatamente o mesmo contrato de uma API real, consumida pelo hook `useDocumentosComunidade` com
`useEffect` e estados de carregamento e erro. Nenhum servidor local precisa ser iniciado além do
próprio `npm run dev`, e a aplicação funciona inclusive sem internet.

## Rotas da aplicação

| Rota | Página | Tipo |
| --- | --- | --- |
| `/` | Início (landing com o simulador de captura) | Pública |
| `/funcionamento` | Como funciona (passo a passo do usuário) | Pública |
| `/tecnico` | Técnico (pipeline, bibliotecas e detalhes do código) | Pública |
| `/sobre` | Sobre (documentação do projeto e login de demonstração) | Pública |
| `/central` | Central de conteúdo | **Privada** |
| Demais endereços | Página não encontrada (404) | Pública |

A rota `/central` é protegida pelo componente `RotaPrivada`: sem usuário autenticado, o acesso é
redirecionado para `/sobre` com um aviso pedindo o login. Após autenticar, o usuário retorna à rota
que tentou acessar. Depois de sair da conta, a proteção volta a valer. Endereços inexistentes exibem
a página de erro 404.

## Central de conteúdo

A página **Central** reúne os itens capturados em um só lugar, com busca e destaque do mais
recente, álbuns/pastas, histórico de adições e alterações, estatísticas de uso, alerta de
validade, visibilidade pública ou privada, lixeira para recuperar o que foi removido e a seção
**Comunidade**, que carrega os documentos públicos vindos da API mockada (com estado de
carregamento, tratamento de erro e botão para tentar novamente).

## Usuários de teste

O login é uma simulação acadêmica. Os dados ficam no `localStorage` do navegador.

| E-mail | Senha | Nome |
| --- | --- | --- |
| aluno@fiap.com.br | fiap123 | Aluno FIAP |
| admin@scanner.com | admin123 | Administrador |

Faça login em **Sobre → Login de demonstração** para liberar o acesso à rota privada `/central`.

## Uso de Inteligência Artificial

Na **Sprint 3**, a Inteligência Artificial foi usada apenas para revisar e otimizar algumas
decisões tecnicamente ruins. O restante daquela entrega (estrutura em React, conteúdo das
páginas, regras de negócio e a maior parte do código) ficou por conta do grupo. Nos trechos que
passaram por essa revisão há anotações no próprio código, comparando a versão anterior com a
atual e explicando o motivo da mudança. Na **Sprint 4**, a IA (Claude Code) foi usada pelo grupo
como apoio na evolução técnica exigida pelo enunciado: a definição das rotas públicas e da rota
privada com React Router, a extração da lógica de negócio do `App.jsx` para os hooks customizados
em `src/hooks/`, a migração do CSS próprio para Tailwind CSS mantendo a identidade visual e a
responsividade, e a integração do consumo da API mockada na página Central. A proposta da
Challenge, o conteúdo das páginas e as regras de negócio continuam sendo os mesmos definidos pelo
grupo nas sprints anteriores.

## Estrutura do projeto

```
src/
  App.jsx                  # compõe os hooks e monta o layout
  main.jsx                 # ponto de entrada + BrowserRouter
  armazenamento.js         # utilitários de localStorage e cálculos do OCR simulado
  dados.js                 # dados estáticos (slides, usuários de teste, textos)
  index.css                # Tailwind + tokens de cor da marca
  hooks/
    useAuth.js             # login, logout e usuário autenticado
    useDocumentos.js       # capturas, lixeira e ações sobre os documentos
    useHistorico.js        # registro de ações
    useDocumentosComunidade.js  # consumo da API mockada (useEffect + Promise)
  servicos/
    apiComunidade.js       # API mockada com FakerJS (dados fictícios + atraso simulado)
  components/
    RotaPrivada.jsx        # proteção da rota /central
    PaginaNaoEncontrada.jsx # página 404
    DocumentosComunidade.jsx    # seção alimentada pela API
    Pagina*.jsx            # as cinco páginas
    ...                    # componentes reutilizáveis (Cartao, Passo, Simulador, etc.)
```

## Deploy

Link do Vercel: https://event-horizon-scanner-sprint4.vercel.app

Link do GitHub: https://github.com/TASS154/event-horizon-scanner

## Integrantes

- Augusto Mota Torin - RM571119
- Felipe Anderson Silva Peres - RM573654
- Thiago Alexandre Santos Silva - RM571342
- Fabricio Mendoza - RM571571
- Guilherme Zeferino Gonçalves - RM572075
