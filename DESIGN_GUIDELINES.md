# Conexão Forragem — Design Spec & Implementation Guide

> Este documento é a referência técnica para implementar ou atualizar o design do site no stack existente (Next.js / Tailwind ou similar).  
> A landing page HTML de referência completa está em `Landing Page.html`.

---

## 1. Paleta de Cores

```css
/* CSS Custom Properties */
:root {
  --bg:        #060F09;   /* Fundo principal — verde-noite profundo */
  --bg2:       #0B1A10;   /* Fundo de seções alternadas */
  --bg3:       #0F2116;   /* Cards, inputs, painéis */
  --lime:      #78D44A;   /* Verde destaque — cor primária de ação */
  --lime-dim:  #4A8A2E;   /* Verde escurecido — estados hover sutis */
  --amber:     #E5A820;   /* Âmbar — datas, alertas de atenção */
  --red:       #E05440;   /* Vermelho — urgência, ocupado */
  --text:      #EDE9DE;   /* Texto principal — creme quente */
  --muted:     #8A9B88;   /* Texto secundário / placeholders */
  --border:    rgba(120,212,74,0.15); /* Bordas sutis com tom verde */
  --card:      rgba(255,255,255,0.03); /* Fundo de card ultra-transparente */
}
```

**Se usar Tailwind**, adicione ao `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      bg:       '#060F09',
      bg2:      '#0B1A10',
      bg3:      '#0F2116',
      lime:     '#78D44A',
      'lime-dim': '#4A8A2E',
      amber:    '#E5A820',
      danger:   '#E05440',
      cream:    '#EDE9DE',
      muted:    '#8A9B88',
    }
  }
}
```

---

## 2. Tipografia

| Papel | Fonte | Peso | Google Fonts |
|---|---|---|---|
| Headlines / Display | **Syne** | 700, 800 | `Syne:wght@700;800` |
| Subtítulos | **Syne** | 600 | `Syne:wght@600` |
| Corpo / UI | **Space Grotesk** | 300, 400, 500, 600 | `Space+Grotesk:wght@300;400;500;600` |

**Import URL:**
```
https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap
```

**Tamanhos de Display (Headlines grandes):**
```css
.display {
  font-size: clamp(3.2rem, 8vw, 7.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 0.95;
}
```

**Regra:** nunca use menos que `16px` em corpo e `14px` em labels/badges.

---

## 3. Espaçamento e Raios

```css
/* Raios de borda */
--radius-sm:   8px;
--radius-md:   12px;
--radius-lg:   16px;
--radius-xl:   20px;
--radius-pill: 100px;

/* Padding de seções */
section { padding: 6rem 0; }   /* desktop */
section { padding: 4rem 0; }   /* mobile */

/* Container */
.container { max-width: 1240px; margin: 0 auto; padding: 0 2rem; }
```

---

## 4. Componentes Principais

### 4.1 Botão Primário
```css
.btn-primary {
  background: #78D44A;
  color: #060F09;
  font-weight: 600;
  padding: 0.65rem 1.4rem;
  border-radius: 8px;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover {
  background: #8EE25A;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(120,212,74,0.35);
}
```

### 4.2 Botão Outline
```css
.btn-outline {
  background: transparent;
  color: #EDE9DE;
  border: 1px solid rgba(120,212,74,0.15);
}
.btn-outline:hover {
  border-color: #78D44A;
  color: #78D44A;
}
```

### 4.3 Badge / Pill
```css
.badge {
  background: rgba(120,212,74,0.10);
  border: 1px solid rgba(120,212,74,0.30);
  border-radius: 100px;
  padding: 0.3rem 0.9rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #78D44A;
  letter-spacing: 0.05em;
}
```

### 4.4 Card de Notificação (WhatsApp-style)
Ver estrutura HTML completa no arquivo `Landing Page.html`, componente `.notif-card`.

### 4.5 Agenda Semáforo (calendário)
Três estados de dia:

| Estado | BG | Border | Text |
|---|---|---|---|
| Livre | `rgba(120,212,74,0.15)` | `rgba(120,212,74,0.3)` | `#78D44A` |
| Ocupado | `rgba(229,93,64,0.15)` | `rgba(229,93,64,0.3)` | `#E05440` |
| Negociando | `rgba(229,168,32,0.15)` | `rgba(229,168,32,0.3)` | `#E5A820` |

---

## 5. Efeitos Visuais

### Gradiente radial de fundo (Hero)
```css
background: radial-gradient(circle at 70% 30%, rgba(120,212,74,0.07) 0%, transparent 65%);
```

### Glow no botão primário (hover)
```css
box-shadow: 0 8px 24px rgba(120,212,74,0.35);
```

### Animação de entrada (scroll)
```css
.fade-up {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.fade-up.visible { opacity: 1; transform: translateY(0); }
```
Ativar com `IntersectionObserver` quando o elemento entra na viewport.

### Dot pulsante (status ao vivo)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.7); }
}
```

---

## 6. Estrutura de Seções (Ordem Recomendada)

```
/
├── <nav>            — Logo + links âncora + CTA "Entrar na lista"
├── #hero            — Headline, sub, CTA duplo, stats, cards notificação
├── #problema        — Grid 2 colunas: Pecuarista vs Prestador
├── #como-funciona   — 3 steps + Agenda Semáforo preview
├── #prestadores     — Features grid + pricing strip
├── #pecuaristas     — Split: texto + card simulado de demanda
├── #cta             — Form inline (nome + WhatsApp) + disclaimer
└── <footer>         — Brand + links + botão WhatsApp
```

---

## 7. Breakpoints

```css
/* Desktop first */
@media (max-width: 900px) {
  /* hero: 1 coluna, ocultar visual */
  /* grids: 1 coluna */
  /* nav: ocultar links, manter logo + CTA */
}
```

---

## 8. Integração de Formulário / Lista de Espera

O CTA final tem dois campos (`nome` + `WhatsApp`) e um botão.  
**Recomendação de implementação:**

1. **Simples (já no HTML):** Abre WhatsApp com mensagem pré-formatada via `wa.me`.
2. **Ideal:** Integrar com CRM/Notion API ou Mailchimp capturando nome + telefone + perfil (prestador/produtor).
3. Adicionar campo oculto `perfil: "prestador" | "produtor"` para segmentar a lista.

---

## 9. SEO e Meta Tags Recomendadas

```html
<meta name="description" content="Conexão Forragem — a plataforma que conecta prestadores de serviço de colheita com pecuaristas. Sem comissão. Leads qualificados. Agenda Semáforo. Feito para quem não pode esperar.">
<meta property="og:title" content="Conexão Forragem — O Match que sua Colhedora Merece">
<meta property="og:description" content="CRM logístico para prestadores de silagem, feno e pré-secado. 1º ano gratuito.">
<meta property="og:image" content="/og-image.png"> <!-- 1200x630 -->
<meta name="theme-color" content="#060F09">
```

---

## 10. Tokens de Design em Formato JSON (para uso em Design System / Tokens)

```json
{
  "color": {
    "bg":       { "value": "#060F09" },
    "bg2":      { "value": "#0B1A10" },
    "bg3":      { "value": "#0F2116" },
    "lime":     { "value": "#78D44A" },
    "amber":    { "value": "#E5A820" },
    "danger":   { "value": "#E05440" },
    "text":     { "value": "#EDE9DE" },
    "muted":    { "value": "#8A9B88" }
  },
  "font": {
    "display":  { "value": "'Syne', sans-serif" },
    "body":     { "value": "'Space Grotesk', sans-serif" }
  },
  "radius": {
    "sm":       { "value": "8px" },
    "md":       { "value": "12px" },
    "lg":       { "value": "16px" },
    "xl":       { "value": "20px" },
    "pill":     { "value": "100px" }
  }
}
```
