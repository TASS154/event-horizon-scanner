# Event Horizon Scanner

Projeto da Sprint 3 de Web Development (FIAP): conversão do protótipo HTML da Sprint 2 para uma aplicação React.

## Tecnologias utilizadas

- React (componentes funcionais, JSX e props)
- Hook `useState` para estado e troca de páginas
- CSS (visual do protótipo original)
- `localStorage` para persistir login, capturas, histórico e lixeira
- Objeto `Math` (`Math.random`, `Math.round` e `Math.ceil`) na simulação de OCR
- Vite para desenvolvimento e build

## Como instalar as dependências

No terminal, dentro da pasta do projeto:

```bash
npm install
```

## Como executar o projeto

Ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite mostra no terminal o endereço local (em geral `http://localhost:5173`).

Build de produção:

```bash
npm run build
npm run preview
```

## Central de conteúdo

A página **Central** foi feita para cobrir as sugestões do enunciado da Sprint 3. Nela o usuário vê os itens capturados em um só lugar, com busca e destaque do mais recente, álbuns/pastas, histórico de adições e alterações, estatísticas de uso, alerta de validade, visibilidade pública ou privada e lixeira para recuperar o que foi removido.

## Usuários de teste

O login é uma simulação acadêmica. Os dados ficam no `localStorage` do navegador.

| E-mail | Senha | Nome |
| --- | --- | --- |
| aluno@fiap.com.br | fiap123 | Aluno FIAP |
| admin@scanner.com | admin123 | Administrador |

## Uso de Inteligência Artificial

A Inteligência Artificial foi usada apenas para revisar e otimizar algumas decisões tecnicamente ruins. O restante do projeto (estrutura em React, conteúdo das páginas, regras de negócio e a maior parte do código) ficou por conta do grupo. Nos trechos que passaram por essa revisão há anotações no próprio código, comparando a versão anterior com a atual e explicando o motivo da mudança.

## Deploy

Link do Vercel: https://event-horizon-scanner.vercel.app

Link do GitHub: https://github.com/TASS154/event-horizon-scanner

## Integrantes

- Augusto Mota Torin - 571119
- Felipe Anderson Silva Peres - 573654
- Thiago Alexandre Santos Silva - 571342
- Fabricio Mendoza - 571571
