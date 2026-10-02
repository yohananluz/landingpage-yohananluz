---
trigger: model_decision
description: Este workflow guia guia o agente na criação de uma nova pagina ou seção do zero, garantindo consistência tecnica e visual 
---

## Passo 1: Definição de Escopo
Pergunte ao usuário qual o objetivo da página e quais os 3 elementos principais que não podem faltar (ex: Hero, Galeria, FAQ).

## Passo 2: Estrutura Semântica
Crie o arquivo HTML (ou a nova seção) focando exclusivamente em HTML5 semântico.
- Use `<main>`, `<section>`, `<article>` e `<header>` conforme apropriado.
- Adicione IDs claros para cada bloco de conteúdo.

## Passo 3: Aplicação de Estilo (Consistência)
Aplique as classes Tailwind CSS.
- IMPORTANTE: Consulte o arquivo `@global-dev-standards.md` para garantir que as cores, espaçamentos e efeitos de hover sigam o padrão do projeto.

## Passo 4: Implementação de Lógica
Se a página exigir interação (botões, filtros, modais), crie as funções necessárias no `app.js`.
- Utilize o padrão de "Funções Puras" e comente cada bloco de código.

## Passo 5: Check de Qualidade
Finalize fazendo uma auto-revisão:
1. O contraste de cores está acessível?
2. O layout é responsivo (Mobile-first)?
3. Existem tags `alt` nas imagens e `aria-labels` nos botões?

## Passo 6: Entrega
Apresente o resultado ao usuário e pergunte: "Deseja que eu refine algum componente específico ou adicione uma Skill de SEO agora?"
