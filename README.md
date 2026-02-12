# My Micro App - Frontend de Notificações

Aplicação frontend em React para consumo de uma API de notificações. O foco atual é validar o ciclo básico de integração com backend: **healthcheck**, **listagem** e **criação de notificações**.

## Visão geral

Hoje a aplicação entrega, na prática:

- Indicador de conectividade com o backend (`/health`) no topo da interface.
- Tela para listar notificações vindas da API (`GET /notifications`).
- Tela para criar uma nova notificação (`POST /notifications`).
- Feedback visual de estados de carregamento, sucesso e erro.

## Stack

- React 19
- Vite 7
- TypeScript (tipagem em hooks, services e types)
- React Router DOM 7
- Axios
- Tailwind CSS 4
- ESLint 9

## Como a aplicação funciona hoje

### 1) Healthcheck no carregamento

- Ao iniciar o app, `src/App.jsx` chama `checkHealth()` via `useHealth`.
- O hook `src/hooks/useHealth.ts` consulta `GET /health` através de `src/services/health.service.ts`.
- Resultado esperado da API:

```json
{ "status": "ok" }
```

- Se `status === "ok"`, o header mostra `Serviço OK` com indicador verde.
- Em erro de rede/API, o status fica como `error` e o header exibe `Desconectado`.
- Existe botão manual `Verificar` para nova checagem.

### 2) Listagem de notificações

- A rota `/` renderiza `src/pages/ListNotifications.tsx`.
- No `useEffect`, a página chama `fetchNotifications()` do hook `src/hooks/useNotification.ts`.
- O service `src/services/notification.service.ts` busca dados em `GET /notifications`.
- Cada item é exibido com:
  - `title`
  - `message`
  - `status` (`sent`, `pending`, `failed`)
  - `createdAt` formatado com `toLocaleString()`
- Cores por status:
  - `sent`: verde
  - `pending`: amarelo
  - `failed`: vermelho

### 3) Criação de notificação

- A rota `/create` renderiza `src/pages/CreateNotification.tsx`.
- O formulário usa `src/hooks/useCreateForm.ts`.
- Regras atuais:
  - `title` e `message` são obrigatórios (validação simples com `trim`).
  - Se faltar campo, exibe `alert("Preencha todos os campos")`.
- No envio, chama `createNotification()` do `useNotification`, que executa `POST /notifications`.
- Payload esperado:

```json
{
  "title": "Título da notificação",
  "message": "Mensagem da notificação"
}
```

- Em sucesso:
  - exibe mensagem `Notificação criada com sucesso!`
  - limpa os campos
  - remove o feedback após 3 segundos
- Em falha:
  - exibe mensagem de erro na própria tela

## Contratos de dados

Arquivo: `src/types/notification.types.ts`

```ts
export interface NotificationPostRequest {
  title: string;
  message: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  status: "sent" | "pending" | "failed";
  createdAt: string;
}
```

## Estrutura principal

```txt
src/
  hooks/
    useHealth.ts
    useNotification.ts
    useCreateForm.ts
  pages/
    ListNotifications.tsx
    CreateNotification.tsx
  services/
    api.ts
    health.service.ts
    notification.service.ts
  types/
    notification.types.ts
    env.d.ts
```

## Configuração de ambiente

A aplicação depende da variável `VITE_API_URL`.

Arquivo `.env` atual:

```env
VITE_API_URL=http://localhost:3001
VITE_APP_ENV=development
```

Se `VITE_API_URL` não estiver definida, o app falha ao iniciar (erro lançado em `src/services/api.ts`).

## Executar localmente

### Pré-requisitos

- Node.js 20+
- npm
- API backend disponível (por padrão em `http://localhost:3001`)

### Passos

```bash
npm install
npm run dev
```

App disponível em `http://localhost:5173` (porta padrão do Vite, salvo configuração diferente).

## Scripts

```bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run preview  # preview da build
npm run lint     # lint do projeto
```

## Pontos de atenção (estado atual)

- Não há suíte de testes automatizados no repositório neste momento.
- Tratamento de erro está funcional, porém ainda genérico (mensagens vindas de exceções do Axios/JS).
- Logs de debug (`console.log`) ainda existem em hooks/services.
- O estado de notificações não é global; cada página instancia seu próprio hook (comportamento suficiente para o fluxo atual).

## Perfil técnico do projeto (para recrutadores)

Este projeto demonstra:

- Estrutura modular por responsabilidade (pages/hooks/services/types).
- Consumo de API REST com Axios e tipagem explícita.
- Gerenciamento de estado local com hooks customizados.
- Roteamento de aplicação SPA com React Router.
- Construção de interface com Tailwind e feedback de UX para estados assíncronos.
