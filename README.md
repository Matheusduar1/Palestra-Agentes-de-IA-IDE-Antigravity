# A Era dos Agentes de IA — Apresentação & Portfólio

Site oficial e portfólio interativo de **Matheus Duarte** documentando na íntegra a palestra **"A Era dos Agentes de IA: Como o Google Antigravity e o Claude Code estão redefinindo a autonomia em software"**, apresentada na **Semana Técnica da ETEC de Embu das Artes (Dia 2 — 17/11/2026)**.

## Funcionalidades (6 Abas)
- **Apresentação**: Visão geral, comparação *IA Passiva vs. Executores Autônomos*, pilares (`LLM`, `Agentic Loop`, `MCP`) e simulador interativo com alternância entre **Default / Strict (HITL)** e **Turbo Autônomo**.
- **Slides (10)**: Deck completo (`MATHEUS DUARTE | 2026`), diagramas vetoriais, modal de ampliação e notas do palestrante sincronizadas com o vídeo.
- **Demos & Lab (6)**: Inspetor de arquivos `CLAUDE.md` / `MEMORY.md` e cases apresentados (**MAXFIT**, **PULSEFIT**, **DexKe Pokédex**, **Organizador de MP3**, **Vídeos 3D Virais** e **NotebookLM / Revidatec**).
- **Perguntas Q&A (9)**: Busca em tempo real e filtro por categoria com todas as perguntas respondidas ao vivo (`37:19`–`1:09:35`).
- **Vídeo**: Player `youtube-nocookie.com` iniciando em `03:10` com 14 capítulos sincronizados e link direto para a transmissão original.
- **Sobre Matheus**: Trajetória profissional, experiências, formação, certificação **Cisco** e filtro das **36 competências** do LinkedIn.

## Stack & Segurança
- **HTML5 Semântico + WAI-ARIA Tabs** com metatags de autoria (`author`, Open Graph, Twitter Card, Schema.org JSON-LD).
- **CSS3 Modular Mobile-First** (`variables.css`, `layout.css`, `components.css`) com alternância entre **Tema Slides (claro)** e **Tema Broadcast (escuro)**.
- **JavaScript ES6+ OOP Orientado a Eventos** (`EventBus`, `SafeDOM`, `StorageService` e controladores modulares), zero dependências externas e zero scripts/estilos inline.
- **Content Security Policy (CSP)** estrita no `index.html`, `_headers` (Cloudflare Pages / Netlify) e `vercel.json` (Vercel), sem exposição de e-mail pessoal ou links externos temporários.

## Estrutura
```text
├── index.html          # Página principal semântica HTML5
├── css/                # Tokens de tema, layout responsivo e componentes
├── js/                 # Dados (Object.freeze), núcleo OOP/eventos e controladores
├── assets/             # Imagens e ícones locais (retrato, QR Code, arte neural, SVGs)
├── _headers            # Cabeçalhos HTTP de segurança (Cloudflare Pages / Netlify)
├── vercel.json         # Cabeçalhos HTTP de segurança (Vercel)
└── robots.txt
```

## Autor & Links
- **Matheus Duarte** — Suporte Técnico TI Trainee | Técnico em Informática (SENAC)
- [LinkedIn](https://www.linkedin.com/in/matheus-duarte-0367b2176/) • [Vídeo Original da Palestra (YouTube)](https://www.youtube.com/watch?v=uT9OUVIsDXA&t=190s)
