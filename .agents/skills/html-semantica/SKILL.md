---
name: html-semantica
description: Audita a semântica de HTML (marcação, hierarquia de títulos, landmarks, listas, tabelas, formulários, imagens, links e ARIA) e propõe correções. Use sempre que o usuário pedir para revisar, validar, auditar ou melhorar a semântica, a acessibilidade estrutural ou a qualidade da marcação de um arquivo HTML, componente ou trecho de código, mesmo que não use a palavra "semântica".
---

# Verificação de semântica em HTML

## Objetivo
Avaliar se o HTML usa os elementos certos para o significado do conteúdo (e não apenas para a aparência), e entregar um relatório objetivo com problemas priorizados e correções prontas.

## Entrada
- Arquivo HTML, trecho colado ou componente (JSX/Vue/Svelte/templates: avalie a marcação resultante).
- Se o contexto não estiver claro (página inteira vs. fragmento), assuma o que for mais provável e declare a suposição no relatório. Em fragmentos, não cobre `<html>`, `<head>` ou landmarks globais.

## Processo
1. Leia todo o código antes de apontar problemas.
2. Mapeie a estrutura: landmarks, outline de títulos, listas, tabelas, formulários, mídia.
3. Execute o checklist abaixo, em ordem.
4. Classifique cada achado por severidade.
5. Gere o relatório no formato especificado, com o trecho corrigido.

## Checklist

### 1. Documento
- `<!DOCTYPE html>`, `<html lang="...">` com idioma correto, `<meta charset>`, `<meta name="viewport">`, `<title>` único e descritivo.

### 2. Landmarks e estrutura
- Uso adequado de `<header>`, `<nav>`, `<main>` (apenas um e visível), `<footer>`, `<aside>`, `<section>`, `<article>`.
- `<section>` só com título associado; `<article>` só para conteúdo autônomo e redistribuível.
- Múltiplos `<nav>` ou `<aside>` devem ter `aria-label` distinto.
- Evitar "div soup": `<div>`/`<span>` onde existe elemento semântico equivalente.

### 3. Títulos
- Um `<h1>` por página (ou por contexto claro).
- Sem saltos de nível (h2 → h4).
- Títulos usados pelo significado, não pelo tamanho visual; nunca usar `<b>`, `<p>` ou `<div>` estilizado como título.

### 4. Texto e conteúdo em linha
- Parágrafos em `<p>`, sem `<br>` para espaçamento ou separação de blocos.
- `<strong>`/`<em>` para ênfase com significado; `<b>`/`<i>` apenas sem ênfase semântica.
- Elementos corretos: `<blockquote>`/`<q>`/``, `<abbr>`, `<time datetime>`, `<code>`, `<pre>`, `<kbd>`, `<mark>`, `<address>`.

### 5. Listas
- Itens relacionados em `<ul>`/`<ol>`/`<dl>`; `<li>` apenas filho direto de lista.
- Menus de navegação como lista dentro de `<nav>`.
- Não simular listas com `<br>` ou `<div>`.

### 6. Links e botões
- `<a href>` para navegação; `<button type="...">` para ações.
- Sem `<div onclick>` ou `<a href="#">` / `href="javascript:..."` como botão.
- Texto de link descritivo (evitar "clique aqui", "saiba mais" isolados).
- Links com `target="_blank"` devem ter `rel="noopener"` e indicar abertura em nova aba.

### 7. Imagens e mídia
- `<img>` com `alt` adequado: descritivo se informativa, `alt=""` se decorativa.
- `<figure>` + `<figcaption>` quando houver legenda.
- `<picture>`/`srcset` quando relevante; `<video>`/`<audio>` com legendas, transcrição ou alternativa.
- SVG informativo com `<title>`/`role="img"` e `aria-label`; SVG decorativo com `aria-hidden="true"`.

### 8. Tabelas
- Usar tabela apenas para dados tabulares, nunca para layout.
- `<caption>`, `<thead>`/`<tbody>`/`<tfoot>`, `<th scope="col|row">`; `headers`/`id` em tabelas complexas.

### 9. Formulários
- Todo controle com `<label for>` (ou rótulo envolvente) visível; `placeholder` não substitui label.
- `<fieldset>` + `<legend>` para grupos de radio/checkbox.
- Tipos de `input` corretos (`email`, `tel`, `url`, `number`, `date`), `name`, `autocomplete`, `required`.
- Mensagens de erro associadas via `aria-describedby`; `aria-invalid` quando aplicável.
- Botão de envio com `type="submit"`.

### 10. Elementos interativos nativos
- Preferir `<details>/<summary>`, `<dialog>`, `<button>`, `<select>` a reimplementações customizadas.

### 11. ARIA (uso mínimo e correto)
- Primeira regra: se existe elemento nativo, não use ARIA.
- Sem `role` redundante (ex.: `<button role="button">`, `<nav role="navigation">`).
- `aria-*` válidos e coerentes; `aria-hidden` nunca em elementos focáveis.
- `aria-label`/`aria-labelledby` apontando para ids existentes.
- Widgets com `role` customizado exigem estados, teclado e foco gerenciados.

### 12. Qualidade geral da marcação
- `id` únicos; tags bem aninhadas e fechadas; sem atributos obsoletos (`align`, `bgcolor`, `<center>`, `<font>`).
- Sem estilo inline usado para transmitir significado.
- Ordem do DOM coerente com a ordem de leitura; `tabindex` positivo é erro.

## Severidade
- **Crítico**: impede ou prejudica seriamente o uso por tecnologia assistiva ou quebra a estrutura (ex.: formulário sem labels, botão feito com `div`, ausência de `lang`).
- **Importante**: degrada a semântica ou SEO (ex.: saltos de título, listas simuladas, `alt` ausente).
- **Sugestão**: melhoria de boas práticas (ex.: usar `<time>`, `<figure>`).

## Formato de saída

**Resumo**: 2–3 frases com avaliação geral e nota de 0 a 10.

**Achados** (do mais grave ao menos grave), cada um com:
- Severidade e título curto
- Localização (linha, seletor ou trecho)
- Por que é um problema (1–2 frases)
- Correção: trecho "antes" e "depois"

**Pontos positivos**: o que já está bem feito (breve).

**HTML corrigido**: versão completa ou diff, quando o usuário pedir ou quando o código for curto.

## Regras
- Seja específico: cite o trecho exato, nunca generalidades.
- Não invente problemas; se o trecho está correto, diga isso.
- Distinga erro objetivo de preferência de estilo, e sinalize incertezas quando o contexto (ex.: CSS ou JS não fornecido) puder mudar o veredito.
- Não altere comportamento, estilos ou conteúdo além do necessário para corrigir a semântica; avise se uma correção puder afetar o CSS existente.
- Responda no idioma do usuário.
- Se o código estiver ausente ou ilegível, peça-o antes de avaliar.
