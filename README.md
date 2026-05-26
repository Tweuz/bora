# Sistema de Gestão Paroquial — Projeto Acadêmico

Aplicativo React Native (Expo) da **Paróquia Maria Imaculada**, com Firebase, React Navigation (Stack + Drawer), hook customizado `useFetchData` e API pública **Liturgia Diária**.

---

## Relatório técnico — atendimento aos requisitos obrigatórios

Este documento serve como **relatório** para entrega no GitHub, mapeando cada exigência do professor ao código do projeto.

### 1. Hooks (React Hooks)

| Exigência | Status | Onde está no projeto |
|-----------|--------|----------------------|
| `useState` | ✅ | Todas as telas em `src/screens/` (ex.: `LoginScreen.js`, `DashboardScreen.js`, `CampanhasScreen.js`) |
| `useEffect` | ✅ | `useFetchData.js`, `HomeScreen.js`, `DetailsScreen.js`, `AuthContext.js`, `ChurchContext.js`, `NotificacaoTopo.js`, etc. |
| Hook customizado | ✅ | `src/hooks/useFetchData.js` — busca API, controla `loading` e `error` com `useState` + `useEffect` |
| Sem classes | ✅ | Apenas componentes funcionais (`export default function ...`). Não há `class` em `src/` |

**Como demonstrar na apresentação:** abrir `src/hooks/useFetchData.js` e `src/screens/DashboardScreen.js` (usa o hook).

---

### 2. Navegação (React Navigation)

| Exigência | Status | Onde está no projeto |
|-----------|--------|----------------------|
| React Navigation | ✅ | `@react-navigation/native`, `native-stack`, `drawer` no `package.json` |
| Mínimo 3 telas principais | ✅ | Login, Dashboard, Detalhes, Home Paróquia, Perfil, Configurações (+ missas, campanhas, etc.) |
| Stack Navigation | ✅ | `src/navigation/AuthNavigator.js` (Login → Cadastro → Recuperar) e `src/navigation/MainStackNavigator.js` (Dashboard → Detalhes → …) |
| Drawer Navigation | ✅ | `src/navigation/DrawerNavigator.js` |
| Fluxo geral | ✅ | `src/navigation/RootNavigator.js` — sem login mostra Auth; com login mostra Drawer |

**Fluxo Stack (exemplo para o professor):**  
`Login` → (após autenticar) → `Drawer` → menu **Liturgia da Semana** → `Dashboard` → toque em um dia → `Detalhes`

**Arquivos:** `src/navigation/AuthNavigator.js`, `MainStackNavigator.js`, `DrawerNavigator.js`, `RootNavigator.js`

---

### 3. Loading (estado de carregamento)

| Exigência | Status | Onde está no projeto |
|-----------|--------|----------------------|
| `ActivityIndicator` | ✅ | API: `DashboardScreen.js` · Firebase login: `LoginScreen.js` · sessão: `RootNavigator.js` · salvar perfil: `ProfileScreen.js` |
| Controle com `useState` | ✅ | `useFetchData.js` → `const [loading, setLoading] = useState(false)` · `LoginScreen.js` → `const [loading, setLoading] = useState(false)` · `AuthContext.js` → `loading` na checagem de sessão |

**Como demonstrar:** abrir **Liturgia da Semana** (spinner ao carregar API) ou fazer login (spinner “Autenticando no Firebase…”).

---

### 4. Telas de navegação obrigatórias

| Tela exigida | Status | Arquivo |
|--------------|--------|---------|
| Login / Registro | ✅ | `src/screens/auth/LoginScreen.js`, `RegisterScreen.js` (+ `RecoverPasswordScreen.js`) |
| Principal (Dashboard) | ✅ | `src/screens/DashboardScreen.js` — lista da API (liturgia da semana) |
| Detalhes | ✅ | `src/screens/DetailsScreen.js` — orações e leituras do dia selecionado |
| Perfil ou Configurações | ✅ | `src/screens/ProfileScreen.js` e `src/screens/SettingsScreen.js` |

**Extra (tema paróquia):** `HomeScreen.js` (Início), Missas, Confissões, Campanhas, Pastorais, Contato.

---

### 5. Integração com API pública

| Exigência | Status | Implementação |
|-----------|--------|----------------|
| API pública | ✅ | [Liturgia Diária](https://liturgia.up.railway.app/v2/) — `src/constants/index.js` → `API_LITURGIA_URL` |
| Lista na interface | ✅ | `DashboardScreen.js` — 7 dias de liturgia |
| Interação: detalhes | ✅ | Toque no card → `navigation.navigate('Detalhes', { item })` |
| Interação: filtrar | ✅ | `TextInput` + `useMemo` filtra por data, festa ou cor litúrgica |
| Serviço HTTP | ✅ | `src/services/api.js` + hook `useFetchData` |

*Obs.: o enunciado cita JSONPlaceholder/OpenWeather como exemplos; qualquer API pública válida atende — aqui foi usada API católica em português, alinhada ao tema paroquial.*

---

### 6. Firebase

| Exigência | Status | Implementação |
|-----------|--------|----------------|
| Firebase Authentication | ✅ | E-mail e senha em `LoginScreen.js` / `RegisterScreen.js` — `firebase/auth` |
| Firestore — dados do usuário | ✅ | Coleção `usuarios`: perfil, `favoritos`, `temaDark`, etc. — `src/services/userService.js` |
| Persistência remota funcional | ✅ | Login grava/lê Firestore; favoritos e perfil sincronizam; `ChurchContext` usa `onSnapshot` em `igreja/informacoes` |
| Configuração | ✅ | `firebaseConfig.js` na raiz |

**Como demonstrar favoritos:** Liturgia da Semana → Detalhes → **Salvar nos favoritos** → Perfil (lista no Firestore).

---

### 7. Drawer Navigation

| Item do menu | Ícone | Ação |
|--------------|-------|------|
| Início | `home-outline` | Tela da paróquia (`HomeParoquia`) |
| Liturgia da Semana | `book-cross` | Dashboard (API) |
| Perfil | `account-outline` | `ProfileScreen` |
| Configurações | `cog-outline` | `SettingsScreen` |
| Sair | `logout` | `signOut` + confirmação |

Arquivo: `src/navigation/DrawerNavigator.js` — ícones `MaterialCommunityIcons`, rótulos em português.

---

### 8. Estrutura de pastas (obrigatória)

```
Códigos/
  App.js
  firebaseConfig.js
  index.js
  src/
    components/     ← ModalEdicao, LoadingOverlay, ScreenHeader, NotificacaoTopo
    screens/      ← auth/, Dashboard, Details, Profile, Settings, Home, …
    navigation/   ← AuthNavigator, MainStackNavigator, DrawerNavigator, RootNavigator
    services/     ← api.js, userService.js, churchService.js
    hooks/        ← useFetchData.js
    context/      ← Auth, Theme, Church (organização extra)
    constants/
    styles/
```

---

## Instalação e execução

```bash
cd Códigos
npm install
npx expo start -c
```

Escaneie o QR Code no **Expo Go** (mesma rede Wi‑Fi).

### Dependências principais

- `expo`, `firebase`
- `@react-navigation/native`, `native-stack`, `drawer`
- `react-native-reanimated`, `react-native-gesture-handler`, `react-native-screens`, `react-native-safe-area-context`
- `babel-preset-expo`

---

## Fluxo resumido para avaliação

1. **Login** com e-mail/senha (Firebase Auth + leitura do perfil no Firestore).
2. **Drawer → Liturgia da Semana** — lista da API com filtro e loading.
3. **Toque em um dia** — tela de **Detalhes**; opcional: salvar **favorito** no Firestore.
4. **Drawer → Início** — funcionalidades da paróquia (missas, campanha, Firestore em tempo real).
5. **Drawer → Perfil / Configurações** — editar perfil, tema, sair.
6. Conta **admin**: e-mail contendo `admin` → pode editar missas e campanha.

---

## Firebase (estrutura no Firestore)

- `usuarios/{uid}` — `nome`, `email`, `tipo`, `favoritos[]`, `temaDark`, …
- `igreja/informacoes` — `oracao`, `listaMissas`, `listaConfissoes`, `listaDoacoes`

---

## Entrega no GitHub

1. Subir a pasta `Códigos` (ou o repositório completo) no GitHub.
2. Colar o **link do repositório** na atividade.
3. Este `README.md` funciona como **instruções + relatório técnico**.
4. (Opcional) Anexar prints: Login, Dashboard, Detalhes, Drawer, Perfil com favoritos.

### Link do APK (build anterior)

https://expo.dev/accounts/mateus_onival/projects/Appzinho/builds/3336cce3-200d-4fc9-85e8-2776a32f3ea3

---

*Projeto: disciplina de Desenvolvimento Mobile — Paróquia Maria Imaculada.*
