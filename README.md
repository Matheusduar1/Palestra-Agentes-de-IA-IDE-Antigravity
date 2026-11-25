# Matheus Duarte | A Era dos Agentes de IA — Portfólio & Apresentação

Site estático em **HTML5 semântico**, **CSS3 modular** e **JavaScript OOP orientado a eventos**, documentando a palestra ministrada por **Matheus Duarte** na *Semana Técnica da ETEC de Embu das Artes (Dia 2 — 17/11/2026)* e integrando seu perfil profissional do LinkedIn.

## Estrutura de Arquivos
- `index.html`: Documento HTML5 semântico com metadados completos de autoria (`author`, Open Graph, Twitter Card, Schema.org) e Content Security Policy (CSP).
- `css/`: Tokens de design (`variables.css`), layout responsivo (`layout.css`) e componentes/diagramas (`components.css`) com alternância entre **Tema Slides (claro)** e **Tema Broadcast ETEC (escuro)**.
- `js/`: Dados congelados (`data.js`), núcleo OOP/eventos seguro (`core.js` com `EventBus`, `SafeDOM` e `StorageService`), controladores da interface (`components.js`) e inicializador (`app.js`).
- `assets/`: Imagens locais otimizadas (`matheus-duarte.png`, `linkedin-qr.png`, `ai-core-neural.jpg`, `favicon.svg`, `og-cover.svg`), sem links externos temporários.
- `_headers` e `vercel.json`: Cabeçalhos HTTP prontos para publicação segura em domínio web (Cloudflare Pages, Netlify, Vercel).

## Segurança Aplicada
1. **Content Security Policy (CSP)** estrita sem `unsafe-inline` nem `unsafe-eval`, zero estilos inline e zero `innerHTML`/`eval`.
2. Links externos com `target="_blank"` protegidos por `rel="noopener noreferrer"` e validação de URL em runtime (`SafeDOM.sanitizeUrl`).
3. Dados pessoais privados (e-mail pessoal) omitidos de arquivos públicos para proteção contra scrapers e spam.
4. Compatível tanto via servidor HTTPS quanto aberto localmente (`file://` ou `python -m http.server`).

## Como Publicar em Domínio Web
- **Cloudflare Pages / Netlify**: Faça upload da pasta raiz; o arquivo `_headers` aplica automaticamente os cabeçalhos HTTP de segurança.
- **Vercel**: Faça deploy da pasta raiz; o arquivo `vercel.json` configura os cabeçalhos HTTP de segurança.
- **Nginx / Apache**: Copie as diretivas de `_headers` para a configuração do VirtualHost HTTPS do seu domínio.
