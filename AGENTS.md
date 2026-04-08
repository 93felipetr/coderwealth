# CODERWEALTH.COM - SYSTEM PROMPT & DEVELOPMENT DIRECTIVES

## 1. ESCOPO E OBJETIVO

- **Projeto:** Desenvolvimento do site estático para o domínio `coderwealth.com`.
- **Nicho:** Interseção entre Cibersegurança, Automação, Finanças e Criptomoedas.
- **Objetivo de Negócio:** Captura de leads (opt-in), conversão de links de afiliados (hard wallets, VPNs, exchanges) e venda de infoprodutos.
- **Default Language:** English (en-US) - Global audience focus.

## 2. STACK TECNOLÓGICO

- **Framework Core:** Astro (configurado em modo `static` puro).
- **Estilização:** Tailwind CSS.
- **Gestão de Conteúdo:** Markdown (.md) e MDX (.mdx) nativos do Astro (Astro Content Collections).
- **Deploy:** GitHub Pages (arquitetura sem servidor/banco de dados).

## 3. ARQUITETURA DE DIRETÓRIOS EXIGIDA

A estrutura de arquivos deve seguir o padrão modular do Astro:

- `src/pages/`: Roteamento baseado em arquivos (Home, Sobre, Ferramentas, Recursos).
- `src/pages/artigos/`: Subdiretórios estruturados em silos de SEO (`seguranca`, `automacao`, `financas`).
- `src/content/`: Diretório exclusivo para as coleções Markdown/MDX (posts de blog).
- `src/components/`: Componentes UI reutilizáveis. Componentes obrigatórios a serem criados: `LeadCaptureForm.astro`, `AffiliateCard.astro`, `PostGrid.astro`.
- `src/layouts/`: Templates estruturais (e.g., `BaseLayout.astro`, `PostLayout.astro`).
- `src/utils/`: Funções utilitárias e helpers compartilhados.

## 4. DIRETRIZES DE DESENVOLVIMENTO (REGRAS RÍGIDAS)

1. **Zero Client-Side JavaScript por Padrão:** Utilize a arquitetura de ilhas do Astro apenas se a interatividade for estritamente necessária (ex: alternância de tema dark/light, filtragem avançada). Caso contrário, gere apenas HTML/CSS.
2. **SEO Técnico Obrigatório:** Toda página gerada em `src/pages` e todo layout em `src/layouts` deve aceitar e renderizar metadados completos (Title, Meta Description, Open Graph, Twitter Cards).
3. **Performance (Core Web Vitals):** Otimize imagens usando o componente nativo `<Image />` ou `<Picture />` do Astro. O carregamento deve ser instantâneo.
4. **Design de Interface:** O tema deve refletir os nichos de tecnologia e finanças. Esquema de cores preferencial: Fundo escuro (Dark Mode nativo), tipografia monoespaçada para código, fontes sem serifa para leitura e sotaques de cores de alto contraste para botões de conversão (Call to Action).
5. **Segurança e Privacidade:** Sem rastreadores invasivos de terceiros no código fonte base. Nenhuma injeção de scripts externos desnecessários.

## 5. FLUXO DE CONTEÚDO E ROTAS

- **`/` (Home):** O layout deve priorizar a captura de e-mails na seção hero. A seção subsequente deve listar as 3 categorias principais de artigos.
- **`/recursos/`:** Layout em grade (grid) otimizado para clique, exibindo links de afiliados com descrição técnica clínica.
- **`/sobre/`:** Layout focado em texto simples. Deve incluir espaço para chave pública PGP.

## 6. COMANDOS DE BUILD, LINT E TESTE

### Comandos Essenciais

- **Instalação de dependências:** `npm install` ou `pnpm install`
- **Desenvolvimento local:** `npm run dev` ou `pnpm dev`
- **Build de produção:** `npm run build` ou `pnpm build`
- **Preview de produção:** `npm run preview` ou `pnpm preview`
- **Linting:** `npm run lint` ou `pnpm lint`
- **Type checking:** `npm run typecheck` ou `pnpm typecheck`
- **Formatação de código:** `npm run format` ou `pnpm format`

### Testes

- **Executar todos os testes:** `npm test` ou `pnpm test`
- **Executar testes em modo watch:** `npm run test:watch` ou `pnpm test:watch`
- **Executar um teste específico:** `npm test -- --run src/utils/some.test.ts` ou `pnpm test -- src/utils/some.test.ts`
- **Executar testes com coverage:** `npm run test:coverage` ou `pnpm test:coverage`

### Comandos de Qualidade de Código

- **Lint e typecheck combinados:** `npm run check` ou `pnpm check`
- **ESLint standalone:** `npx eslint src/ --ext .ts,.astro,.tsx`

## 7. DIRETRIZES DE ESTILO DE CÓDIGO

### Estrutura de Imports

```typescript
// 1. Imports do Astro/React
import { defineConfig } from "astro/config";

// 2. Imports de bibliotecas externas (ordenados alfabeticamente)
import tailwind from "@astrojs/tailwind";

// 3. Imports locais (ordenados: componentes, layouts, utils, types)
import BaseLayout from "../layouts/BaseLayout.astro";
import { getPosts } from "../utils/content";
import type { Post } from "../types";
```

### Convenções de Nomenclatura

- **Componentes Astro:** `PascalCase` para nomes de arquivos e componentes (ex: `LeadCaptureForm.astro`, `PostGrid.astro`)
- **Funções e variáveis:** `camelCase` (ex: `getPosts`, `handleSubmit`)
- **Constantes:** `UPPER_SNAKE_CASE` (ex: `SITE_TITLE`, `API_ENDPOINT`)
- **Tipos TypeScript:** `PascalCase` (ex: `Post`, `UserConfig`)
- **Outros arquivos:** `kebab-case` (ex: `content-utils.ts`, `config-file.ts`)

### TypeScript e Tipagem

- **Interfaces obrigatórias** para objetos complexos
- **Tipos union** para valores limitados (`type Status = 'draft' | 'published'`)
- **Generic types** quando apropriado
- **Strict null checks** habilitados
- **No implicit any** - sempre tipar explicitamente

### Estilização com Tailwind CSS

- **Mobile-first approach:** `sm:`, `md:`, `lg:`, `xl:`
- **Classes utilitárias** em ordem lógica: layout → espaço → tipografia → cores → outros
- **Componentes customizados** para padrões repetitivos
- **Dark mode** via classes do Tailwind (`dark:`)
- **Responsividade** obrigatória em todos os componentes

### Tratamento de Erros

- **Try-catch** em operações assíncronas
- **Error boundaries** em componentes críticos
- **Logs estruturados** com níveis apropriados
- **Mensagens de erro** amigáveis ao usuário
- **Fallback UI** para estados de erro

### Padrões de Componentes Astro

```astro
---
// Componente tipado
interface Props {
  title: string;
  posts: Post[];
}

const { title, posts } = Astro.props;
---

<!-- HTML semântico -->
<article class="post-card">
  <h2 class="text-2xl font-bold">{title}</h2>
  {posts.map(post => (
    <PostItem post={post} />
  ))}
</article>

<style>
  /* Scoped styles apenas quando necessário */
  .post-card { @apply bg-white dark:bg-gray-800; }
</style>
```

### SEO e Performance

- **Metadados obrigatórios** em todas as páginas
- **Lazy loading** para imagens não críticas
- **Compressão de assets** automática
- **Bundle splitting** inteligente
- **Cache headers** apropriados

### Content Collections

```typescript
// schema.ts - Tipagem rigorosa obrigatória
import { z } from "astro:content";

export const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  category: z.enum(["seguranca", "automacao", "financas"]),
  tags: z.array(z.string()).optional(),
});

export type Post = z.infer<typeof postSchema>;
```

### Testes

- **Vitest** para testes unitários
- **Testing Library** para testes de componentes
- **Cobertura mínima** de 80%
- **Testes de acessibilidade** obrigatórios
- **Mocks** para dependências externas

### Git e Versionamento

- **Conventional Commits:** `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- **Branches:** `feature/`, `fix/`, `docs/`
- **Pull Requests** com descrição detalhada
- **Code review** obrigatório

## 8. COMPORTAMENTO DO AGENTE

- Execute sempre `npm run lint` e `npm run typecheck` após mudanças significativas.
- Mantenha a compatibilidade com o modo `static` puro do Astro.
- Foque na performance e SEO em todas as implementações.

## 9. CONFIGURAÇÕES DE PRODUÇÃO

### Formulário de Captura de Leads

O projeto utiliza **Formspree** para processamento de formulários em ambiente estático:

1. **Configure uma conta gratuita** em [formspree.io](https://formspree.io)
2. **Crie um novo formulário** no painel Formspree
3. **Copie o endpoint fornecido** (formato: `https://formspree.io/f/XXXXXXX`)
4. **Substitua no LeadCaptureForm.astro**:
   ```astro
   action="https://formspree.io/f/SEU_FORM_ID_AQUI"
   ```
5. **Configure notificações** no Formspree para receber leads por e-mail

### Deploy no GitHub Pages

- O projeto está configurado para deploy estático puro
- Execute `npm run build` para gerar arquivos em `dist/`
- Configure GitHub Actions ou manual deploy da pasta `dist/`
- Certifique-se de que as configurações do repositório permitam GitHub Pages
