'use strict';

/**
 * Dados completos da palestra "A Era dos Agentes de IA" (ETEC de Embu, 17/11/2026)
 * e do perfil profissional de Matheus Duarte.
 * Estrutura congelada (Object.freeze) para integridade em runtime.
 */
(function (global) {
  const presentation = {
    title: 'A Era dos Agentes de IA',
    subtitle: 'Como o Google Antigravity e o Claude Code estão redefinindo a autonomia em software.',
    event: 'Semana Técnica ETEC de Embu — Dia 2',
    courses: 'Redes de Computadores, Informática e Desenvolvimento de Sistemas',
    dateLabel: '17 de novembro de 2026',
    isoDate: '2026-11-17',
    host: 'Professor Marcão (SENAC Taboão da Serra & ETEC de Embu)',
    timeWindow: '03:10 até 1:10:00',
    youtubeId: 'uT9OUVIsDXA',
    youtubeStartSeconds: 190,
    youtubeEndSeconds: 4200,
    youtubeWatchUrl: 'https://www.youtube.com/watch?v=uT9OUVIsDXA&t=190s',
    youtubeChannelUrl: 'https://www.youtube.com/@etecdeembu7121',
    youtubeChannelName: 'Etec de Embu',
    otherSpeakers: [
      'Jairton Gomes — Docker',
      'Guilherme Andrade — MVC',
      'Matheus Duarte — Workshop e Agentes de IA (03:10–1:10:00)',
      'Lucas Luz — Seu futuro é global'
    ]
  };

  const slides = [
    {
      id: 1,
      number: '01',
      eyebrow: 'Abertura • 06:45',
      title: 'A Era dos Agentes de IA',
      subtitle: 'Como o Antigravity e o Claude Code estão redefinindo a autonomia em software.',
      timestamp: '06:45',
      seconds: 405,
      layout: 'cover',
      badge: 'Workshop Agentes de IA • ETEC de Embu',
      speakerSummary:
        'Logo após o Prof. Marcão me apresentar (cheguei direto do trabalho na Refrio, até de bota pelo trânsito, mas animado por ser meu primeiro grande auditório!), contei quem eu sou: 26 anos, atuação em Infraestrutura de TI na Refrio em Taboão da Serra, aluno de Técnico em Informática no SENAC Taboão da Serra e estudante de Inglês Intermediário — essencial porque o mundo de tecnologia pede o inglês.',
      keyPoints: [
        'Por que escolhi focar no Google Antigravity e comparar com o Claude Code.',
        'Dica prática para estudantes: o Google oferece planos e descontos estudantis muito acessíveis para usar IA e agentes na prática.',
        'O curso Técnico em Informática (Infra, Desenvolvimento e Banco de Dados juntos) funciona como um norte para descobrir qual área você mais curte.'
      ]
    },
    {
      id: 2,
      number: '02',
      eyebrow: 'Conceito-Chave • 07:25',
      title: 'O Fim do "Chat" e a Era dos Agentes de IA',
      subtitle: 'A transição de assistentes conversacionais passivos para executores autônomos.',
      timestamp: '07:25',
      seconds: 445,
      layout: 'comparison',
      cards: [
        {
          kicker: 'IA PASSIVA',
          title: 'Assistentes Conversacionais',
          highlight: false,
          bullets: [
            'Reativa: limita-se a responder perguntas e gerar texto em caixas de diálogo.',
            'Depende 100% da ação e validação manual do usuário para aplicar soluções.',
            'Sem acesso direto a ferramentas, terminal ou execução de software.'
          ]
        },
        {
          kicker: 'IA ATIVA • AGENTES',
          title: 'Executores Autônomos',
          highlight: true,
          bullets: [
            'De assistentes passivos a executores autônomos em fluxos de trabalho reais.',
            'O que muda quando a IA ganha "mãos": opera arquivos, roda testes e altera código.',
            'Capacidade end-to-end de diagnosticar, interagir com sistemas e resolver problemas.'
          ]
        }
      ],
      speakerSummary:
        'Expliquei que quase todo mundo já conhece assistentes convencionais (ChatGPT, Gemini, Claude, ou até modelos baixados localmente em máquinas potentes), onde você pergunta, copia e cola na mão. O salto do Agente de IA é que, em vez de só responder, ele age: você dá um comando e ele cria os arquivos, escreve o código e executa direto no seu projeto.',
      keyPoints: [
        'Chat convencional = responder perguntas para você copiar e colar.',
        'Agente de IA = ganhar "mãos" para criar diretórios, editar código e rodar validações.',
        'Modelos locais exigem hardware forte; na nuvem ou em IDEs agênticas, a barreira cai.'
      ]
    },
    {
      id: 3,
      number: '03',
      eyebrow: 'Arquitetura • 09:07',
      title: 'O que exatamente é um Agente de IA?',
      subtitle: 'A arquitetura fundamental que permite transformar intenção em ação autônoma.',
      timestamp: '09:07',
      seconds: 547,
      layout: 'orbital',
      pillars: [
        {
          kicker: '01 • NÚCLEO',
          title: 'Cérebro (LLM)',
          text: 'Modelos de Linguagem para raciocínio, planejamento e decisão.'
        },
        {
          kicker: '02 • CAPACIDADE',
          title: 'Autonomia',
          text: 'Busca constante de um objetivo sem supervisão a cada passo.'
        },
        {
          kicker: '03 • EXECUÇÃO',
          title: 'Ação Prática',
          text: 'Uso de ferramentas reais (APIs, terminal e arquivos).'
        }
      ],
      satellites: ['Navegador Web', 'Terminal / Shell', 'Sistema de Arquivos'],
      speakerSummary:
        'Mostrei os três pilares que tiram a IA da caixa de texto: o Cérebro (LLM — Large Language Model), a Autonomia para perseguir a meta e a Ação Prática usando três braços principais: Navegador Web, Terminal/Shell e Sistema de Arquivos (sempre dentro do limite que você estipular). Também destaquei o uso de APIs para acelerar projetos — como a API do ViaCEP, que o professor sempre cita em aula.',
      keyPoints: [
        'Controle integrado de Navegador Web, Terminal Shell e Sistema de Arquivos.',
        'Inclusão prática de APIs externas (exemplo citado ao vivo: ViaCEP para todos os CEPs do Brasil).',
        'A base de conhecimento treinada no LLM alimenta decisões técnicas contextualizadas.'
      ]
    },
    {
      id: 4,
      number: '04',
      eyebrow: 'Execução Iterativa • 10:19',
      title: 'O Loop de Raciocínio (Agentic Loop)',
      subtitle: 'A arquitetura iterativa que orienta a tomada de decisão autônoma.',
      timestamp: '10:19',
      seconds: 619,
      layout: 'loop',
      cards: [
        {
          kicker: 'FLUXO CONTÍNUO',
          title: 'Ciclo de Execução Autônoma',
          text: 'Processo iterativo em quatro etapas que transforma dados de entrada em resultados precisos.'
        },
        {
          kicker: 'RESILIÊNCIA',
          title: 'Reação a Falhas e Auto-correção',
          text: 'A capacidade de reavaliar erros de execução, ajustar estratégias e tentar novamente sem parar.'
        }
      ],
      steps: ['Planejar (Plan)', 'Agir (Act)', 'Observar (Observe)', 'Repetir (Repeat)'],
      speakerSummary:
        'Detalhei que a IA não simplesmente "sai fazendo". Ela segue um ciclo contínuo: Planejar → Agir → Observar → Repetir. Ela executa, testa automaticamente, observa se algo falhou e repete o ajuste até atingir êxito com a menor taxa de falhas possível no comando solicitado.',
      keyPoints: [
        'Planejar: decompor o pedido em passos e arquivos concretos.',
        'Agir: rodar comandos, ler ou gravar arquivos e consultar APIs.',
        'Observar e Repetir: validar a saída e corrigir erros antes de entregar ao humano.'
      ]
    },
    {
      id: 5,
      number: '05',
      eyebrow: 'Protocolo & Ferramentas • 11:03',
      title: 'A Ponte para o Mundo Físico',
      subtitle: 'Function Calling e Model Context Protocol (MCP)',
      timestamp: '11:03',
      seconds: 663,
      layout: 'mcp',
      cards: [
        {
          kicker: 'TRADUÇÃO DE INTENÇÃO',
          title: 'Function Calling',
          text: 'A tradução estruturada de texto em linguagem natural para ações sistêmicas precisas.'
        },
        {
          kicker: 'PADRONIZAÇÃO ABERTA',
          title: 'MCP (Model Context Protocol)',
          text: 'O padrão aberto para conectar modelos de IA a fontes de dados e ferramentas externas com segurança.'
        }
      ],
      promptSample: '"Leia o arquivo de configuração app.js para analisar as rotas."',
      payloadSample: '{\n  "action": "read_file",\n  "path": "app.js"\n}',
      speakerSummary:
        'Dei um exemplo direto do que acontece por trás de um comando simples como "Leia o arquivo de configuração app.js para analisar as rotas". Quando você envia esse pedido, o agente cria um caminho lógico via Function Calling, gera um payload JSON estruturado e envia via protocolo MCP para abrir e inspecionar o arquivo no sistema com segurança.',
      keyPoints: [
        'Por trás dos panos, toda ação é traduzida em chamadas estruturadas de sistema.',
        'Function Calling transforma texto humano em intenção tipada.',
        'MCP padroniza a conexão segura entre o modelo e o sistema de arquivos ou servidores externos.'
      ]
    },
    {
      id: 6,
      number: '06',
      eyebrow: 'Memória & Contexto • 11:53',
      title: 'Contexto e Memória de Longo Prazo',
      subtitle: 'Como a IA gerencia grandes volumes de dados mantendo a relevância e eficiência.',
      timestamp: '11:53',
      seconds: 713,
      layout: 'funnel',
      cards: [
        {
          kicker: 'RETENÇÃO TEMPORÁRIA',
          title: 'Memória de Trabalho',
          text: 'Janelas de contexto amplas para processamento imediato e direto das instruções ativas.'
        },
        {
          kicker: 'OTIMIZAÇÃO CONTÍNUA',
          title: 'Compactação Automática',
          text: 'Compressão de dados e síntese de histórico para sustentabilidade em tarefas longas.'
        }
      ],
      funnelSteps: [
        { title: 'ENTRADA MASSIVA', desc: 'Documentos, Prompts e Logs de Código' },
        { title: 'FILTRAGEM E SÍNTESE', desc: 'Remoção de redundâncias e resumos' },
        { title: 'VETORIZAÇÃO', desc: 'Indexação semântica e embeddings' },
        { title: 'MEMÓRIA ESSENCIAL', desc: 'Contexto limpo e pronto para decisão' }
      ],
      speakerSummary:
        'Expliquei o problema clássico da alucinação: se você manda mil pedidos seguidos num chat comum ("gere foto de um cachorro, agora gere..."), uma hora ela junta tudo e "gera um zoológico inteiro". Agentes filtram documentos, links e APIs com memória de longo prazo e compactação automática. E dei um conselho prático (16:15): crie também um arquivo .md de memória como "bloco de notas" onde o agente registra cada erro cometido para não repetir depois — e, se um chat começar a alucinar muito, abra uma conversa limpa!',
      keyPoints: [
        'Alucinação acontece quando o contexto infla sem filtro e o modelo perde o foco.',
        'Compactação e vetorização mantêm só o contexto essencial ativo.',
        'Técnica prática: arquivo Markdown de memória persistente para registrar erros e regras.'
      ]
    },
    {
      id: 7,
      number: '07',
      eyebrow: 'Ecossistema • 12:45 & 22:20',
      title: 'Google Antigravity: O Ecossistema "Agent-First"',
      subtitle: 'Arquitetura autônoma para execução paralela e segura de agentes inteligentes.',
      timestamp: '12:45',
      seconds: 765,
      layout: 'antigravity',
      cards: [
        {
          kicker: 'NÚCLEO DE INTELIGÊNCIA',
          title: 'Modelos Gemini',
          text: 'Plataforma autônoma nativamente construída e otimizada sobre os modelos Gemini.'
        },
        {
          kicker: 'ISOLAMENTO SEGURO',
          title: 'Ambientes Sandbox',
          text: 'Execução segura e isolada em contêineres Linux para proteção total do sistema.'
        },
        {
          kicker: 'ORQUESTRAÇÃO PARALELA',
          title: 'Delegação (v2.0)',
          text: 'Múltiplos agentes especializados trabalhando em paralelo em segundo plano.'
        }
      ],
      speakerSummary:
        'Apresentei os modelos que mostrei ao vivo dentro do Google Antigravity: Hydrogen (substituto do Gemini Flash — excelente e econômico em tokens, passei uma semana inteira codando a Pokédex sem estourar o limite!), Argon (substituto acima do Gemini Pro), Carbon (nível alto que bate de frente com o Claude) e o Orchestrator (pensa no Hydrogen e chama o Argon só na hora crítica para poupar cota semanal). Também mostrei os níveis de raciocínio (Low, Medium, High, Extra) e o modo Remote conectado ao Google Drive ou GitHub.',
      keyPoints: [
        'Interface gráfica acolhedora para quem está começando com agentes autônomos.',
        'Confissão sincera: no primeiro teste achei que não funcionaria, mas ele criou todos os arquivos e só precisei fazer os ajustes finais.',
        'Execução local (pasta dedicada) ou Remote via GitHub / Google Drive.'
      ]
    },
    {
      id: 8,
      number: '08',
      eyebrow: 'Terminal & Contexto • 14:21',
      title: 'Claude Code: O Agente Profundo do Terminal',
      subtitle: 'Ferramenta de linha de comando para raciocínio e execução direta sobre o código-fonte.',
      timestamp: '14:21',
      seconds: 861,
      layout: 'terminal',
      cards: [
        {
          kicker: 'CLI DA ANTHROPIC',
          title: 'Linha de Comando',
          text: 'Ferramenta de linha de comando (CLI) baseada nos modelos avançados da Anthropic.'
        },
        {
          kicker: 'EDIÇÃO PROFUNDA',
          title: 'Base de Código',
          text: 'Leitura, compreensão e edição profunda de repositórios inteiros de forma autônoma.'
        },
        {
          kicker: 'CONFIGURAÇÃO LOCAL',
          title: 'Arquivo CLAUDE.md',
          text: 'Contexto customizado e instruções de projeto personalizadas via arquivo CLAUDE.md.'
        }
      ],
      terminalTitle: 'bash — claude-code — 80x24',
      terminalLines: [
        '~/projects/app (main) $ claude',
        'Claude Code v1.0.0 (Anthropic)',
        'Carregando contexto de CLAUDE.md... Concluído.',
        '> Refatore as rotas em src/api.js e crie um commit git',
        '● Analisando a estrutura de diretórios...',
        '● Lendo src/api.js e CLAUDE.md',
        '● Aplicando alterações em src/api.js...',
        '● Executando comando: git commit -m "refactor: api routes"',
        '✔ Sucesso! 1 arquivo modificado, 1 commit criado no ramo main.'
      ],
      speakerSummary:
        'Comparei o Claude Code (focado em CLI — linha de comando sem interface gráfica — e fortíssimo em programação e animações) com a GUI do Antigravity. Aqui fiz uma pergunta para a plateia sobre o arquivo CLAUDE.md (MD = Markdown, arquivo de texto simples): ele é o arquivo mais importante de um agente porque define o contexto permanente de como trabalhar ("seja um dev Python focado em automações"), sem você precisar repetir a mesma instrução no chat toda vez.',
      keyPoints: [
        'CLI (sem interface gráfica) vs. GUI interativa do Antigravity.',
        'CLAUDE.md padroniza stack, regras, estilo de código e limites do projeto.',
        'Também citei o fenômeno dos vídeos 3D virais automatizados com Claude (19:46): roteiro + assets 3D + animações pré-setadas gerando narração, corte e legenda de forma autônoma.'
      ]
    },
    {
      id: 9,
      number: '09',
      eyebrow: 'Governança & Segurança • 17:22',
      title: 'O Segredo do Sucesso: Controle e Segurança',
      subtitle: 'Garantindo a confiabilidade de agentes autônomos no ambiente de produção.',
      timestamp: '17:22',
      seconds: 1042,
      layout: 'security',
      cards: [
        {
          kicker: 'MITIGAÇÃO DE RISCO',
          title: 'Alucinação Ativa',
          text: 'Prevenção contra ações autônomas baseadas em interpretações incorretas do modelo.'
        },
        {
          kicker: 'INTEGRIDADE DE DADOS',
          title: 'Dados de Validação',
          text: 'Verificação rigorosa de inputs e outputs para garantir conformidade técnica.'
        },
        {
          kicker: 'GOVERNANÇA & SUPERVISÃO',
          title: 'Strict Mode & HITL',
          text: 'Modo estrito de execução combinado com aprovação humana (Human-in-the-loop).'
        }
      ],
      terminalTitle: 'strict-mode-policy.json — 80x24',
      terminalLines: [
        '// Configuração de Segurança e Validação',
        '{',
        '  "strict_mode": true,',
        '  "validation_rules": ["schema_check", "type_safe"],',
        '  "human_in_the_loop": {',
        '    "require_approval": true,',
        '    "action_threshold": "CRITICAL"',
        '  },',
        '  "active_hallucination_guard": "ACTIVE"',
        '}'
      ],
      speakerSummary:
        'Esse é o ponto que separa sucesso de acidente: no modo Default (cadeadinho / HITL — Human-in-the-Loop), o agente pergunta antes de baixar dependências ou alterar arquivos sensíveis (como ao pedir para baixar um vídeo do YouTube e converter em MP3). Já o modo Turbo sai executando sem perguntar nada. Regra de ouro que reforcei: NUNCA ligue o Turbo sem antes definir regras claras e travar o agente numa pasta específica — senão, num erro ou alucinação, ele pode mexer em outras pastas do computador.',
      keyPoints: [
        'Default / Strict Mode (HITL): aprovação humana em ações críticas e instalações.',
        'Modo Turbo: velocidade máxima, mas exige escopo fechado de pasta e regras em Markdown.',
        'Risco real de deixar agentes sem limites: alucinação ativa em arquivos fora do projeto.'
      ]
    },
    {
      id: 10,
      number: '10',
      eyebrow: 'Carreira & Futuro • 25:01 & 1:07:21',
      title: 'Conclusão: O Futuro do Trabalho Técnico',
      subtitle: 'A evolução do papel dos desenvolvedores na era dos agentes autônomos.',
      timestamp: '25:01',
      seconds: 1501,
      layout: 'conclusion',
      cards: [
        {
          kicker: 'EVOLUÇÃO DO PAPEL',
          title: 'Supervisores & Arquitetos',
          text: 'De criadores manuais de código a supervisores de alto nível e arquitetos de processos complexos.'
        },
        {
          kicker: 'NOVO PARADIGMA DE TRABALHO',
          title: 'Execução Assíncrona',
          text: 'Workflow contínuo: delegue tarefas complexas para executarem em segundo plano durante a noite.'
        },
        {
          kicker: 'FOCO ESTRATÉGICO',
          title: 'Lógica de Negócios',
          text: 'Redirecionamento do esforço intelectual para resolver problemas de negócio, não para sintaxe.'
        }
      ],
      speakerSummary:
        'Fechei os slides mostrando a curva de transição: estamos migrando do esforço manual de sintaxe para a arquitetura, lógica de negócios e revisão. E no encerramento final (1:07:21), o Prof. Marcão deixou uma metáfora perfeita da "Caixa de Ferramentas": assim como vieram a internet, a orientação a objetos e os frameworks, a IA é mais uma ferramenta para ganhar um tempo absurdo — mas o profissional de mercado precisa dominar a ferramenta, e não depender dela.',
      keyPoints: [
        'IA não é o futuro distante — já é o presente (carros autônomos, robótica, automação).',
        'Assim como na Revolução Industrial, quem evolui com as ferramentas se destaca.',
        'Você é o orquestrador: base técnica é obrigatória para saber quando a IA errou.'
      ]
    }
  ];

  const simulatorScenarios = [
    {
      id: 'routes',
      label: 'Analisar app.js (MCP)',
      timestamp: '11:03',
      seconds: 663,
      prompt: 'Leia o arquivo de configuração app.js para analisar as rotas e detectar gargalos.',
      workspace: 'C:\\Users\\Matheus\\Projects\\api-rotas',
      actionCommand: 'mcp.read_file({ path: "src/app.js", check_routes: true })',
      planText: 'Mapear estrutura do projeto, localizar app.js e preparar chamada MCP de leitura.',
      actText: 'Disparar Function Calling payload.json -> servidor MCP para abrir src/app.js.',
      observeText: 'Rotas validadas: /api/v1/auth sem rate-limit detectado; sugerir middleware de proteção.',
      repeatText: 'Registrar ajuste no histórico e validar integridade de todas as rotas restantes.',
      logs: [
        { type: 'cmd', text: '[USER] "Leia o arquivo de configuração app.js para analisar as rotas."' },
        { type: 'muted', text: '[PLAN] Traduzindo intenção natural via Function Calling...' },
        { type: 'cmd', text: '[MCP] payload.json -> {"action": "read_file", "path": "src/app.js"}' },
        { type: 'warn', text: '[OBSERVE] 12 rotas mapeadas; rota POST /login sem validação de schema.' },
        { type: 'ok', text: '[REPEAT -> DONE] Relatório de rotas concluído e patch seguro sugerido.' }
      ]
    },
    {
      id: 'pulsefit',
      label: 'Criar App PulseFit',
      timestamp: '29:30',
      seconds: 1770,
      prompt: 'Crie um aplicativo web em HTML, CSS e JS mobile first de academia com tela de login e esquecer a senha.',
      workspace: 'C:\\Users\\Matheus\\Desktop\\html',
      actionCommand: 'Test-Path "C:\\Users\\Matheus\\Desktop\\html" && write(index.html, styles.css, data.js, storage.js)',
      planText: 'Definir arquitetura Mobile-First (393x852), login multiperfil e persistência localStorage.',
      actText: 'Criar index.html semântico, styles.css dark-neon, data.js e storage.js com hash.',
      observeText: 'Adicionar cronômetro de treino, checklist de séries e validar em viewport mobile.',
      repeatText: 'Revisar 4 arquivos sem erros de console e liberar aplicativo PulseFit funcional.',
      logs: [
        { type: 'cmd', text: '[PROMPT] C:\\Users\\Matheus\\Desktop\\html Crie um app web HTML/CSS/JS mobile first de academia...' },
        { type: 'muted', text: '[THINKING] Gemini 4 Hydrogen (Extra) • Estruturando layout 393x852 (iPhone 16)' },
        { type: 'cmd', text: '[ACTION] Created index.html • styles.css • data.js • storage.js' },
        { type: 'warn', text: '[OBSERVE] Verificando persistência offline e fluxo "Esqueci a senha" + cronômetro.' },
        { type: 'ok', text: '[DONE] PulseFit finalizado: 4 arquivos integrados e validados.' }
      ]
    },
    {
      id: 'mp3',
      label: 'Organizar MP3 do Pai',
      timestamp: '46:10',
      seconds: 2770,
      prompt: 'Olhe esta pasta inteira de músicas, detecte artista, nome e gênero de cada faixa e organize tudo para o pen drive.',
      workspace: 'D:\\Pendrive-Pai\\Musicas-Baguncadas',
      actionCommand: 'scan_audio_metadata("./") -> rename_and_group_by_genre()',
      planText: 'Listar arquivos MP3 com nomes despadronizados e extrair metadados ID3 / assinaturas.',
      actText: 'Renomear faixas no padrão "Artista - Música.mp3" e criar subpastas por gênero.',
      observeText: 'Checar caracteres inválidos para som automotivo e remover duplicatas.',
      repeatText: 'Revalidar 100% da árvore de diretórios para uso simples sem conhecimento técnico.',
      logs: [
        { type: 'cmd', text: '[PROMPT] "Detecte todas as músicas, veja artista/gênero e organize perfeitamente."' },
        { type: 'muted', text: '[PLAN] Varrendo pasta local em busca de faixas sem identificação...' },
        { type: 'cmd', text: '[ACTION] Padronizando 148 arquivos MP3 -> Artista - Titulo.mp3' },
        { type: 'warn', text: '[OBSERVE] 3 faixas duplicadas detectadas e movidas para revisão.' },
        { type: 'ok', text: '[DONE] Pen drive pronto e organizado para uso imediato!' }
      ]
    },
    {
      id: 'security',
      label: 'Auditoria App & APK',
      timestamp: '1:00:18',
      seconds: 3618,
      prompt: 'Teste a confiabilidade deste app e desta pasta de downloads: tente burlar as regras e explique cada vulnerabilidade.',
      workspace: 'C:\\Users\\Matheus\\Sandbox\\SecurityAudit',
      actionCommand: 'audit_inputs_and_permissions("./app-teste", scan_downloads=true)',
      planText: 'Clonar base de teste isolada (nunca produção!) e mapear vetores de entrada e arquivos .apk.',
      actText: 'Simular payload malicioso contra validações e inspecionar binários suspeitos na pasta.',
      observeText: 'Identificar falha de validação client-side ou script oculto que antivírus comum ignorou.',
      repeatText: 'Gerar explicação didática da brecha e aplicar correção antes de publicar.',
      logs: [
        { type: 'cmd', text: '[PROMPT] "Tente burlar a regra de acesso neste software de teste e me explique como fez."' },
        { type: 'muted', text: '[PLAN] Isolando ambiente em Sandbox Linux sem contato com dados reais.' },
        { type: 'cmd', text: '[ACTION] Executando checklist OWASP + inspeção de arquivos suspeitos na pasta.' },
        { type: 'warn', text: '[OBSERVE] Alerta: entrada sem sanitização permitiu injeção de parâmetro.' },
        { type: 'ok', text: '[DONE] Brecha explicada passo a passo e corrigida com validação estrita.' }
      ]
    }
  ];

  const mdPresets = [
    {
      id: 'claude-web',
      filename: 'CLAUDE.md (Web Mobile-First)',
      subtitle: 'Como configurar o arquivo mais importante do agente para projetos front-end.',
      code:
        '# CLAUDE.md — Regras do Projeto Web\n' +
        '## Papel\n' +
        'Atue como Engenheiro Front-end Sênior focado em HTML5 semântico, CSS3 modular e JS OOP.\n\n' +
        '## Arquitetura & UI\n' +
        '- Abordagem Mobile-First (393px -> 768px -> 1200px).\n' +
        '- Zero estilos inline e criação segura de nós DOM (sem injeção HTML).\n' +
        '- Separação estrita: index.html / css/ / js/.\n\n' +
        '## Limites de Segurança\n' +
        '- Trabalhe EXCLUSIVAMENTE dentro desta pasta do projeto.\n' +
        '- Nunca altere pastas do sistema ou credenciais externas.'
    },
    {
      id: 'claude-python',
      filename: 'CLAUDE.md (Automações Python)',
      subtitle: 'Exemplo exato citado aos 15:40 da palestra para manter o agente focado.',
      code:
        '# CLAUDE.md — Automação e Infraestrutura\n' +
        '## Diretriz Principal\n' +
        'Seja um desenvolvedor focado estritamente em Python para automações corporativas.\n\n' +
        '## Boas Práticas\n' +
        '- Validar existência de diretórios antes de mover ou renomear arquivos.\n' +
        '- Gerar logs claros de tudo o que foi alterado para revisão humana.\n' +
        '- Em modo Default (HITL), solicitar confirmação antes de instalar pacotes externos.'
    },
    {
      id: 'memory-md',
      filename: 'MEMORY.md (Bloco de Notas de Erros)',
      subtitle: 'Técnica mostrada aos 16:15: fazer o agente evoluir evitando erros repetidos.',
      code:
        '# MEMORY.md — Histórico de Aprendizado do Agente\n' +
        '## Regra de Ouro\n' +
        'Sempre que ocorrer uma falha de execução ou alucinação, registre aqui causa e solução.\n\n' +
        '## Lições Registradas\n' +
        '- [ERRO CORRIGIDO] Nunca usar ES Modules quando o usuário precisar abrir index.html via file://.\n' +
        '- [ERRO CORRIGIDO] Manter escopo estrito na pasta selecionada; não ler diretórios vizinhos.\n' +
        '- [PREFERÊNCIA] Usar Gemini 4 Hydrogen (Extra) para prototipação contínua sem estourar tokens.'
    }
  ];

  const demos = [
    {
      id: 'maxfit',
      theme: 'theme-maxfit',
      badge: 'Demo Pré-Construída • 26:03',
      title: 'MAXFIT — Área do Aluno & Portal Institucional',
      timestamp: '26:03',
      seconds: 1563,
      stack: ['HTML5 Semântico', 'CSS3 Dark SaaS', 'JavaScript', 'Figma → Antigravity'],
      whatIShowed:
        'Abri no navegador um sistema completo de academia que construí com auxílio do Antigravity — mesmo minha base forte sendo Java/back-end. Mostrei no F12 do Chrome o layout responsivo para celular, 3 perfis de login (Aluno: lucas@maxfit.com, Instrutor e Admin), o Portal Institucional de planos, a lista interativa de treino (supino reto, crucifixo, tríceps pulley) e o painel do instrutor.',
      keyTakeaway:
        'Dica para o mercado de trabalho: se o chefe pedir um protótipo "para ontem", desenhe primeiro o esqueleto (mockup) no Figma e traga para o agente estruturar e acelerar a entrega.'
    },
    {
      id: 'pulsefit',
      theme: 'theme-pulsefit',
      badge: 'Criado Ao Vivo do Zero • 29:00',
      title: 'PULSEFIT — Academia & Alta Performance',
      timestamp: '29:00',
      seconds: 1740,
      stack: ['Gemini 4 Hydrogen (Extra)', 'Mobile-First 393×852', 'localStorage', 'Default → Turbo'],
      whatIShowed:
        'Criei uma pasta vazia na Área de Trabalho e digitei um prompt simples pedindo um app web HTML/CSS/JS mobile-first de academia com login e "esquecer a senha". Mostrei na prática o modo Default (cadeadinho) pedindo permissão no PowerShell, depois mudei para Turbo, e em minutos o agente batizou o app de PulseFit e gerou index.html, styles.css, data.js e storage.js — incluindo até um cronômetro de treino, calculadora de IMC e check-in por QR Code que eu nem havia pedido!',
      keyTakeaway:
        'Mesmo com prompt básico o agente entrega muito, mas criar um roteiro em Markdown antes garante consistência em projetos de vários dias.'
    },
    {
      id: 'dexke',
      theme: 'theme-dexke',
      badge: 'Projeto API Real • 34:21',
      title: 'DexKe — Pokédex & Team Builder',
      timestamp: '34:21',
      seconds: 2061,
      stack: ['PokéAPI', 'API Tradução PT-BR/EN', 'Modelos 3D & Shiny', '1 Semana em Hydrogen'],
      whatIShowed:
        'Mostrei meu projeto pessoal de Pokédex completa consumindo a PokéAPI junto de uma API de tradução dinâmica (trocando todo o site entre PT-BR e inglês com um clique). No modal do #002 Ivysaur, exibi tipo (Grass/Poison), dados básicos (1.0m, 13.0kg), habilidades (Overgrow/Chlorophyll), barras de Base Stats, formas Shiny e modelos 3D.',
      keyTakeaway:
        'Prova real de economia de cota: trabalhei uma semana inteira ajustando essa Pokédex usando o modelo Hydrogen sem esgotar o plano gratuito.'
    },
    {
      id: 'mp3-organizer',
      theme: 'theme-mp3',
      badge: 'Automação Cotidiana • 46:10',
      title: 'Organizador Autônomo de MP3 (Pen Drive do Pai)',
      timestamp: '46:10',
      seconds: 2770,
      stack: ['Sistema de Arquivos', 'Identificação de Faixas', 'Antigravity Local'],
      whatIShowed:
        'Meu pai pediu um pen drive cheio de músicas para o carro, mas os arquivos baixados estavam todos bagunçados, sem nome de artista ou gênero. Apontei a pasta para o Antigravity e pedi para identificar cada música, artista e gênero e organizar tudo perfeitamente — resolvendo um problema real de quem não é da tecnologia.',
      keyTakeaway:
        'Agentes não servem só para programar apps: automatizam tarefas manuais chatas no computador em segundos.'
    },
    {
      id: 'viral-3d',
      theme: 'theme-3d',
      badge: 'Estudo de Caso • 19:46',
      title: 'Pipeline de Vídeos 3D Virais Autônomos',
      timestamp: '19:46',
      seconds: 1186,
      stack: ['Claude Code / Agentes', 'Assets 3D + Animações', 'Narração & Legenda IA'],
      whatIShowed:
        'Analisei aqueles vídeos virais de Reels, TikTok e Shorts com bonequinhos 3D explicando temas como "como construir um prédio". Mostrei que a pessoa só precisa preparar os modelos 3D e animações pré-setadas (parado, acenando, construindo): o agente lê o roteiro, escolhe qual animação entra em cada cena, gera narração, edita e legenda sozinho.',
      keyTakeaway:
        'Oportunidade enorme para quem modela em 3D ou quer criar canais sem precisar mostrar o rosto.'
    },
    {
      id: 'notebooklm',
      theme: 'theme-notebooklm',
      badge: 'Demonstração de Estudo • 56:25',
      title: 'Gemini vs. NotebookLM (Gemini LM) — Projeto Revidatec',
      timestamp: '56:25',
      seconds: 3385,
      stack: ['NotebookLM / Gemini LM', 'PDFs & Links YouTube', 'Slides, Vídeo & Mapa Mental'],
      whatIShowed:
        'Durante as perguntas, abri ao vivo o meu NotebookLM com o projeto "Revidatec", onde subi o PDF com todas as regras do trabalho acadêmico. Mostrei que ele cria um banco de dados fechado apenas com suas fontes confiáveis e gera Resumo em Vídeo, Apresentação de Slides e Mapa Mental — perfeito para mim, que sou péssimo lendo textos longos e aprendo muito melhor de forma visual.',
      keyTakeaway:
        'Gemini = chat geral; NotebookLM = sua base pessoal de estudo sem achismos; Agente de IA = quem coloca a mão na massa e executa.'
    }
  ];

  const qaItems = [
    {
      id: 'qa-1',
      timestamp: '37:19',
      seconds: 2239,
      category: 'Carreira',
      question: 'Como um desenvolvedor júnior evita ficar dependente da IA sem aprender a base?',
      audienceContext: 'Pergunta da plateia sobre odiar ler documentação e acabar terceirizando tudo para a IA.',
      answer:
        'Muita gente acha que usar agente é "trabalho de vagabundo", mas não é! Tarefas repetitivas simples (tipo converter um PDF) você realmente pode delegar. Porém, para construir software de verdade, você é o orquestrador: se eu não tivesse minha base de programação, não teria feito metade do que fiz. Sem entender lógica, você não consegue revisar o código e nem perceber quando a IA inventou algo errado.'
    },
    {
      id: 'qa-2',
      timestamp: '40:04',
      seconds: 2404,
      category: 'Segurança',
      question: 'Se eu ligar o modo Turbo, o agente pode mexer em outras pastas e fazer besteira?',
      audienceContext: 'Pergunta sobre autonomia excessiva, riscos no sistema e notícias de IAs invadindo sistemas.',
      answer:
        'Sim, é exatamente por isso que você SEMPRE deve travar o agente na pasta do projeto antes de usar o Turbo! Contei um caso real meu: deixei um agente rodando sem delimitar direito e ele começou a alucinar e xeretar projetos nada a ver na minha máquina. Sem barreiras de permissão e validação, você cria um "Ultron" dentro do seu computador.'
    },
    {
      id: 'qa-3',
      timestamp: '41:58',
      seconds: 2518,
      category: 'Segurança',
      question: 'O que é Prompt Injection / Jailbreak e por que falam tanto disso com agentes?',
      audienceContext: 'Discussão técnica com a plateia sobre quebrar travas e chegar até código de baixo nível.',
      answer:
        'Expliquei que a IA conhece as travas de segurança, mas com técnicas de jailbreak — principalmente em modelos locais sem censura, já que na nuvem há bloqueios — há quem force a IA a contornar restrições. Isso vai desde recompilar jogos de Nintendo/PS5 para PC até descer para Assembly (a linguagem de máquina mais baixa), onde sem controles você abre brechas críticas.'
    },
    {
      id: 'qa-4',
      timestamp: '47:29',
      seconds: 2849,
      category: 'Carreira',
      question: 'Como foi sua trajetória saindo da Logística e Edição de Vídeo até entrar em TI na Refrio?',
      audienceContext: 'Aluno perguntou sobre rotina no SENAC, transição de carreira e papel da IA nessa virada.',
      answer:
        'Comecei em Logística (Raia Drogasil, Total Química, Tag Mensageria), depois mergulhei em edição de vídeo por 5 anos no YouTube e com clientes grandes (Geraldo Luís, Paris 6, Mercado Livre, comerciais de carro). Fui demitido com 3 meses de uma vaga que exigia Motion Graphics avançado e certificado — e voltei para a logística me sentindo perdido. Minha mãe lembrou que eu desmontava carrinhos de controle remoto quando criança e disse: "Vira TI!". Entrei no Técnico em Informática no SENAC Taboão da Serra, me apaixonei por manutenção, redes e Arduino (criei até um jogo dentro do Arduino!), entrei na Refrio como Assistente de Qualidade e, quando meu professor avisou de uma vaga interna de TI em Itapecerica, fui no RH e conquistei meu espaço em Infraestrutura.'
    },
    {
      id: 'qa-5',
      timestamp: '54:19',
      seconds: 3259,
      category: 'Segurança',
      question: 'Até que ponto poderemos confiar em agentes e robôs sem supervisão humana?',
      audienceContext: 'Reflexão sobre futuro da automação autônoma, ética e limites de confiança.',
      answer:
        'Acredito que no futuro teremos robôs tão parecidos com humanos no cotidiano que vamos debater até "direitos dos robôs" — lembrando o filme Eu, Robô (Will Smith). A chave não é confiança cega, e sim construir sistemas rígidos de segurança e governança (guardrails) para garantir que a IA nunca fuja do padrão programado.'
    },
    {
      id: 'qa-6',
      timestamp: '56:25',
      seconds: 3385,
      category: 'Arquitetura & Ferramentas',
      question: 'Qual a diferença prática entre o Gemini comum, o NotebookLM (Gemini LM) e um Agente de IA?',
      audienceContext: 'Dúvida sobre qual ferramenta do ecossistema Google escolher para estudar e programar.',
      answer:
        'Separei em três papéis claros (com demo ao vivo do meu caderno Revidatec): 1) Gemini Chatbot serve para perguntas e respostas gerais; 2) NotebookLM cria um banco de dados fechado com SEUS PDFs, livros e vídeos do YouTube — gerando slides, mapa mental e resumo em vídeo (ótimo para quem aprende visualmente como eu); 3) Agente de IA é quem executa tarefas reais no seu código e arquivos.'
    },
    {
      id: 'qa-7',
      timestamp: '1:00:18',
      seconds: 3618,
      category: 'Segurança',
      question: 'Como posso fazer testes de segurança para saber se um app feito por IA é confiável?',
      audienceContext: 'Pergunta de aluno sobre validar vulnerabilidades antes de colocar em empresa.',
      answer:
        'Crie um ambiente de teste ou um clone isolado do banco de dados da empresa (nunca teste direto em produção!) e peça para a própria IA agir como auditora: "Tente fazer nesta aplicação algo que não deveria ser permitido". Se ela conseguir burlar, peça: "Me explique passo a passo como você invadiu". Com isso você entende a falha e corrige na raiz.'
    },
    {
      id: 'qa-8',
      timestamp: '1:01:50',
      seconds: 3710,
      category: 'Arquitetura & Ferramentas',
      question: 'Vale a pena o plano gratuito do Antigravity ou é melhor rodar uma IA open source local?',
      audienceContext: 'Comparação sobre limite de tokens, plataformas open source e IA rodando no próprio PC.',
      answer:
        'No Antigravity, o modelo Hydrogen rende muito: passei uma semana inteira desenvolvendo a Pokédex sem esgotar a cota gratuita que renova semanalmente. Se você quiser rodar 100% local e offline, existe a diferença entre Motor (ex.: Ollama) e Modelo: é possível baixar de graça, mas modelos pesados exigem placa de vídeo e hardware forte — senão "o PC vai fritar".'
    },
    {
      id: 'qa-9',
      timestamp: '1:04:02',
      seconds: 3842,
      category: 'Segurança',
      question: 'Consigo usar agentes de IA para checar se um arquivo .apk ou .exe tem vírus antes de instalar?',
      audienceContext: 'Dúvida prática sobre baixar aplicativos fora da Play Store (como Snaptube).',
      answer:
        'Sim! Em vez de instalar direto no celular, baixe o .apk ou executável em uma pasta isolada no computador e peça para o agente inspecionar a estrutura de arquivos e permissões suspeitas. Eu mesmo já pedi para o agente limpar minha pasta de Downloads e ele encontrou arquivos perigosos que o antivírus comum tinha deixado passar.'
    }
  ];

  const videoChapters = [
    { time: '03:10', seconds: 190, title: 'Apresentação pelo Prof. Marcão', desc: 'Abertura na Semana Técnica da ETEC de Embu e introdução do Matheus.' },
    { time: '05:24', seconds: 324, title: 'Quem sou eu & Origem na TI', desc: '26 anos, Refrio Taboão da Serra, SENAC Técnico em Informática e inglês.' },
    { time: '06:45', seconds: 405, title: 'A Era dos Agentes de IA', desc: 'Google Antigravity, Claude e planos/descontos estudantis do Google.' },
    { time: '07:25', seconds: 445, title: 'Fim do Chat vs. Executores Autônomos', desc: 'Diferença entre responder texto e ganhar "mãos" para agir em projetos.' },
    { time: '09:07', seconds: 547, title: 'Arquitetura: LLM, Ferramentas & APIs', desc: 'Navegador, Shell, Sistema de Arquivos e uso prático da API ViaCEP.' },
    { time: '10:19', seconds: 619, title: 'Loop de Raciocínio & MCP (app.js)', desc: 'Planejar → Agir → Observar → Repetir + Function Calling.' },
    { time: '11:53', seconds: 713, title: 'Memória, Alucinação & Modelos Gemini', desc: 'Analogia do "zoológico inteiro", Hydrogen, Argon e Carbon.' },
    { time: '14:21', seconds: 861, title: 'Claude Code, CLAUDE.md e Bloco .md', desc: 'CLI vs. GUI, Markdown de instruções e memória persistente de erros.' },
    { time: '17:22', seconds: 1042, title: 'Strict Mode (HITL), Turbo & Vídeos 3D', desc: 'Governança, cadeadinho de segurança e automação 3D sem mostrar o rosto.' },
    { time: '22:20', seconds: 1340, title: 'Tour na IDE Google Antigravity', desc: 'Projetos locais vs. Remote (Drive/GitHub), Orchestrator e nível Extra.' },
    { time: '26:03', seconds: 1563, title: 'Demos MAXFIT, DexKe Pokédex & PulseFit', desc: 'Figma mockup, F12 mobile-first, PokéAPI + tradução e app criado ao vivo.' },
    { time: '37:19', seconds: 2239, title: 'Q&A Parte 1: Júnior, Turbo & Jailbreak', desc: 'Dependência de IA, limites de pasta, Prompt Injection e Assembly.' },
    { time: '46:10', seconds: 2770, title: 'Pen Drive do Pai & Minha História', desc: 'Organização de MP3s, Logística → Edição de Vídeo → SENAC → Refrio TI.' },
    { time: '54:19', seconds: 3259, title: 'Q&A Parte 2: NotebookLM, Segurança, Ollama & Encerramento', desc: 'Revidatec ao vivo, testes de invasão, .apk, e a Caixa de Ferramentas (1:07:21).' }
  ];

  const profile = {
    fullName: 'Matheus Duarte',
    pronouns: 'Ele/Dele',
    headline: 'Suporte Técnico TI Trainee / Refrio Armazéns Gerais LTDA',
    location: 'Taboão da Serra, São Paulo, Brasil',
    currentCompany: 'Refrio Armazéns Gerais S.A.',
    currentSchool: 'Senac Brasil',
    networkLabel: '81 conexões • 85 seguidores',
    linkedinUrl: 'https://www.linkedin.com/in/matheus-duarte-0367b2176/',
    instagramUrl: 'https://www.instagram.com/matheusduar1/',
    credlyUrl: 'https://www.credly.com/badges/ff56993a-4038-4bd3-aacb-1f6ab5baaca3/linked_in_profile',
    bannerTechs: ['Java', 'Python', 'Arduino IDE', 'Edição de Vídeo', 'Desenvolvimento de Jogos'],
    about:
      'Suporte Técnico Trainee | Estudante de TI | Infraestrutura, Redes & Atendimento ao Usuário | Vivência em Logística e Audiovisual',
    servicesOverview:
      'Suporte Técnico Trainee em Infraestrutura de TI com experiência prática em montagem, manutenção e diagnóstico de hardware e software corporativo. Experiência em desenvolvimento com Python, Java e Arduino IDE, voltada à resolução de problemas e automações. Background multimídia como Videomaker na criação e edição de conteúdo audiovisual via Adobe Premiere Pro, After Effects, Photoshop e CapCut, somando perfil analítico, organização e comunicação assertiva.',
    servicesList: ['Edição de vídeo', 'Produção de vídeo', 'Conserto de computadores'],
    availability: 'Remota ou presencialmente (Taboão da Serra, SP)',
    languages: [{ name: 'Inglês', level: 'Nível básico a intermediário (em evolução no Senac)' }],
    experiences: [
      {
        role: 'Suporte Técnico TI Trainee Infraestrutura',
        company: 'Refrio Armazéns Gerais S.A.',
        type: 'Tempo integral • Presencial',
        period: 'mai. de 2026 – o momento (7 meses)',
        location: 'Taboão da Serra / Itapecerica, SP',
        current: true,
        description:
          'Transição interna conquistada após indicação de professor e aprovação pelo RH para a unidade de Itapecerica. Atuação direta com infraestrutura de TI, diagnóstico de hardware e software corporativo, redes e suporte ao usuário.'
      },
      {
        role: 'Assistente de qualidade',
        company: 'Refrio Armazéns Gerais S.A.',
        type: 'Tempo integral',
        period: 'mar. de 2025 – mai. de 2026 (1 ano 3 meses)',
        location: 'Taboão da Serra, SP',
        current: false,
        description: 'Aferir temperaturas, garantir a qualidade do produto e controle de planilhas e e-mails.'
      },
      {
        role: 'Videomaker',
        company: 'Oemed Farmacêutica Digital',
        type: 'Tempo integral',
        period: 'mai. de 2024 – dez. de 2025 (1 ano 8 meses)',
        location: 'Brasil',
        current: false,
        description: 'Atuo na parte geral de vídeos, desde a gravação até a edição através do Adobe Premiere, After Effects e CapCut.',
        skills: ['Adobe Premiere Pro', 'Adobe After Effects', 'Adobe Photoshop', 'Capcut', 'Câmeras Canon']
      },
      {
        role: 'Editor de Vídeos',
        company: 'Room filmes',
        type: 'Remoto',
        period: 'jul. de 2023 – dez. de 2025 (2 anos 6 meses)',
        location: 'Remoto',
        current: false,
        description: 'Edição audiovisual profissional em fluxo remoto — trajetória que incluiu trabalhos para clientes como Geraldo Luís, Paris 6, Mercado Livre e comerciais automotivos.'
      },
      {
        role: 'Auxiliar de Escritório em Geral',
        company: 'Tag Mensageria Transportes E Servicos',
        type: 'Terceirizado • No local',
        period: 'out. de 2021 – jul. de 2023 (1 ano 10 meses)',
        location: 'Embu das Artes, São Paulo, Brasil',
        current: false,
        description: 'Atuação na parte administrativa, realizando impressão de pedidos conforme demanda diária, uso de Excel e transferências via sistema.',
        skills: ['Microsoft Excel', 'WMS', 'Microsoft Outlook', 'Microsoft Teams']
      },
      {
        role: 'Editor de vídeo',
        company: 'Lume Visual',
        type: 'Audiovisual',
        period: 'out. de 2020 – out. de 2021 (1 ano 1 mês)',
        location: 'São Paulo',
        current: false,
        description: 'Edição de vídeos e pós-produção iniciada após aprendizado autodidata via YouTube.'
      },
      {
        role: 'Assistente de operações',
        company: 'Total Química Oficial',
        type: 'Tempo integral • No local',
        period: 'mar. de 2020 – nov. de 2020 (9 meses)',
        location: 'Embu das Artes, São Paulo, Brasil',
        current: false,
        description: 'Operações logísticas com foco em logística reversa, logística de distribuição, separação de pedidos e armazenagem.',
        skills: ['Logística Reversa', 'Logística de distribuição', 'Separação de pedidos', 'Armazenagem']
      },
      {
        role: 'Auxiliar de Reposição Logística',
        company: 'Raia Drogasil S.A.',
        type: 'Tempo integral • No local',
        period: 'jul. de 2019 – jan. de 2020 (7 meses)',
        location: 'São Paulo, Brasil',
        current: false,
        description: 'Porta de entrada no mercado de trabalho atuando em logística de distribuição, logística reversa e armazenagem.'
      }
    ],
    education: [
      {
        school: 'Senac Brasil',
        course: 'Ensino Técnico — Técnico em Informática',
        period: 'ago. de 2025 – abr. de 2027',
        description: 'Curso voltado à parte de Infraestrutura, Desenvolvimento e Banco de Dados da área de TI (incluindo manutenção de computadores, redes, Java, Python e Arduino).'
      },
      {
        school: 'Senac Brasil',
        course: 'Curso Livre — Inglês Intermediário Níveis 1, 2 e 3',
        period: 'out. de 2026 – out. de 2027',
        description: 'Curso de inglês de nível intermediário voltado à evolução técnica e comunicação profissional.'
      },
      {
        school: 'ETEC - Escola Técnica Estadual de São Paulo',
        course: 'Curso Profissionalizante — Excel Aplicado à Área Administrativa',
        period: 'ago. de 2021 – dez. de 2021',
        description: 'Curso de Excel Básico/Intermediário voltado a rotinas administrativas, Macros e Administração.'
      },
      {
        school: 'Senac Brasil',
        course: 'Auxiliar de escritório',
        period: '2019',
        description: 'Atividades e grupos: Projeto "Todos temos um talento, qual o seu?"'
      },
      {
        school: 'E.E Laert de Almeida São Bernardo',
        course: 'Ensino Médio',
        period: '2011 – 2017',
        description: 'Formação básica concluída.'
      }
    ],
    certification: {
      name: 'Digital Safety and Security Awareness',
      issuer: 'Cisco',
      issued: 'Emitida em out. de 2026',
      skill: 'Cibersegurança',
      url: 'https://www.credly.com/badges/ff56993a-4038-4bd3-aacb-1f6ab5baaca3/linked_in_profile'
    },
    activities: [
      'Palestrante convidado — Semana Técnica ETEC de Embu das Artes (Workshop e Agentes de IA)',
      'Participação no AWS Summit São Paulo 2026 e visita ao Centro Universitário Senac',
      'Palestra de Cibersegurança da Prodesp no Senac São Paulo',
      'Certificações concluídas no Senac: Redes e Assistente de Suporte e Manutenção de Computadores'
    ],
    skills: [
      { name: 'Edição de vídeo', category: 'audiovisual', top: true },
      { name: 'Microsoft Excel', category: 'gestao', top: true },
      { name: 'Manutenção de computadores', category: 'ti', top: true },
      { name: 'Arduino', category: 'dev', top: true },
      { name: 'Python', category: 'dev', top: true },
      { name: 'Infraestrutura de rede', category: 'ti', top: false },
      { name: 'Tecnologia da informação', category: 'ti', top: false },
      { name: 'Cibersegurança', category: 'ti', top: false },
      { name: 'Android', category: 'ti', top: false },
      { name: 'Desenvolvimento de software', category: 'dev', top: false },
      { name: 'Banco de dados', category: 'dev', top: false },
      { name: 'Macro', category: 'dev', top: false },
      { name: 'Adobe Premiere Pro', category: 'audiovisual', top: false },
      { name: 'Adobe After Effects', category: 'audiovisual', top: false },
      { name: 'Adobe Photoshop', category: 'audiovisual', top: false },
      { name: 'Capcut', category: 'audiovisual', top: false },
      { name: 'Câmeras Canon', category: 'audiovisual', top: false },
      { name: 'YouTube', category: 'audiovisual', top: false },
      { name: 'Vídeo', category: 'audiovisual', top: false },
      { name: 'Locução', category: 'audiovisual', top: false },
      { name: 'Criação de roteiros', category: 'audiovisual', top: false },
      { name: 'Palestras motivacionais', category: 'gestao', top: false },
      { name: 'Liderança', category: 'gestao', top: false },
      { name: 'Atendimento ao Cliente', category: 'gestao', top: false },
      { name: 'Administração', category: 'gestao', top: false },
      { name: 'Inglês', category: 'gestao', top: false },
      { name: 'Microsoft Office', category: 'gestao', top: false },
      { name: 'Microsoft Outlook', category: 'gestao', top: false },
      { name: 'Microsoft Teams', category: 'gestao', top: false },
      { name: 'Microsoft Word', category: 'gestao', top: false },
      { name: 'Microsoft PowerPoint', category: 'gestao', top: false },
      { name: 'Sistemas de gerenciamento de armazéns (WMS)', category: 'gestao', top: false },
      { name: 'Armazenagem', category: 'gestao', top: false },
      { name: 'Logística de distribuição', category: 'gestao', top: false },
      { name: 'Logística Reversa', category: 'gestao', top: false },
      { name: 'Separação de pedidos', category: 'gestao', top: false }
    ]
  };

  function deepFreeze(obj) {
    if (obj && typeof obj === 'object') {
      Object.freeze(obj);
      Object.keys(obj).forEach(function (key) {
        deepFreeze(obj[key]);
      });
    }
    return obj;
  }

  global.MDPortfolioData = deepFreeze({
    presentation: presentation,
    slides: slides,
    simulatorScenarios: simulatorScenarios,
    mdPresets: mdPresets,
    demos: demos,
    qaItems: qaItems,
    videoChapters: videoChapters,
    profile: profile
  });
})(window);
