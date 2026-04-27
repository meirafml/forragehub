# Conexão Forragem

## 1. Visão Geral do Projeto
O **Conexão Forragem** é uma plataforma (Marketplace / Plataforma de Conexão) focada no agronegócio, especificamente desenvolvida para conectar **pecuaristas** que necessitam de serviços de colheita e processamento de forragem (silagem, feno e pré-secado) a **prestadores de serviço** (donos de máquinas) que possuem a estrutura e o maquinário necessários para a operação. O grande diferencial é ser um canal sem burocracia, onde as partes negociam diretamente entre si.

## 2. Arquitetura e Tecnologias
O projeto utiliza um stack moderno focado em performance, tipagem estática e facilidade de deploy (Serverless).

### Frontend
- **Framework:** React 19 + TypeScript.
- **Build Tool:** Vite (rápido e otimizado).
- **Roteamento:** React Router DOM v7 (Navegação SPA).
- **Estilização:** CSS puro (via `index.css`) utilizando variáveis globais (Design System), focado em um UI Premium Dark Mode, com efeitos "Glassmorphism", sombras de brilho (glow) e tipografia moderna (Inter).
- **Ícones:** Lucide React.

### Backend & API
- **Framework:** Node.js com Express.js (configurado no diretório `/api/index.ts`).
- **Arquitetura Serverless:** O backend foi estruturado para ser rodado como funções serverless na Vercel (via `vercel.json` rewrites).
- **ORM:** Prisma ORM.

### Banco de Dados
- **Banco:** PostgreSQL (configurado pelas variáveis `POSTGRES_PRISMA_URL` e `POSTGRES_URL_NON_POOLING`).
- **Schema:** Definido no arquivo `prisma/schema.prisma`.

## 3. Fluxo Principal da Plataforma (Como Funciona)

A plataforma opera num fluxo de 3 etapas principais:

1. **Cadastro de Demanda (Pecuarista):** 
   - O pecuarista acessa `/cadastrar-demanda`.
   - Informa detalhes cruciais da lavoura: cultura (Milho, Sorgo, Capiaçu, Aveia, etc.), área (hectares), relevo (plano, acidentado), acesso à propriedade, previsão de colheita e preferência de máquina (Autopropelida ou Trator).
   - A demanda fica registrada com o status "ABERTA".

2. **Cadastro do Prestador (Dono de Máquina):**
   - O prestador acessa `/cadastrar-prestador`.
   - Informa sua região de atendimento, etapas do serviço que realiza (corte, transporte, compactação, vedação) e cadastra detalhadamente sua frota (marca, modelo, tipo de plataforma).
   - O prestador visualiza as opções de planos (assinatura) para ter acesso liberado aos leads.

3. **Oportunidades de Negócio (Match):**
   - O prestador acessa a página `/oportunidades`.
   - Visualiza um painel com todas as demandas de pecuaristas, podendo filtrar por Estado e Cultura.
   - O prestador analisa as condições operacionais descritas e, tendo interesse, acessa o contato do pecuarista para fechar o negócio sem intermediação ou comissão da plataforma.

## 4. Estrutura do Banco de Dados (Entidades)

- **`Demanda`**: Tabela central que guarda os leads (pecuaristas). Armazena as informações agronômicas e de localização.
- **`Prestador`**: Tabela que armazena os dados das empresas de prestação de serviço, região de cobertura e se possuem plano ativo.
- **`Maquina`**: Tabela relacionada ao prestador (relação 1:N) que guarda o inventário de máquinas do prestador.

## 5. Estrutura de Diretórios
```text
/
├── api/                  # Lógica do Backend / Rotas da API REST
│   └── index.ts          # Endpoints do Express (/api/demandas, /api/prestadores)
├── prisma/               # Configurações do Banco de Dados
│   └── schema.prisma     # Modelagem das tabelas do banco PostgreSQL
├── public/               # Assets estáticos
├── src/                  # Código-fonte do Frontend (React)
│   ├── pages/            # Telas da aplicação (Home, Login, CadastrarDemanda, etc.)
│   ├── App.tsx           # Componente principal com as rotas
│   ├── index.css         # Design System e variáveis de estilo globais
│   └── main.tsx          # Ponto de entrada do React
├── vercel.json           # Configuração de rotas para deploy serverless na Vercel
├── package.json          # Dependências do projeto e scripts (dev, build, lint)
└── tsconfig.json         # Configurações do TypeScript
```

## 6. Scripts Disponíveis
- `npm run dev`: Inicia o servidor de desenvolvimento Vite.
- `npm run build`: Sincroniza o banco de dados (Prisma push), checa tipagem e realiza o build de produção do frontend.
- `npm run lint`: Executa a verificação de qualidade de código (ESLint).
