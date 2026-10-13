<h1 align="center">Streama</h1>
<h3 align="center">Sistema de Compartilhamento de Telas</h3>
<img src="https://raw.githubusercontent.com/jdamonew/streama/refs/heads/main/src/assets/banner.png"/>


Streama é uma plataforma de compartilhamento de tela em tempo real: você cria uma sessão, recebe um código, e quem ingressar com ele já pode transmitir e assistir telas ao vivo, com qualidade configurável.

---

## Sobre o projeto

Este projeto é uma aplicação web que utiliza **WebRTC** para comunicação entre participantes e **Firebase** para autenticação, persistência de dados e sincronização em tempo real.

O frontend foi desenvolvido com React e TypeScript, utilizando um Design System próprio para garantir consistência visual, tipagem, reutilização de componentes e facilidade de manutenção.

A aplicação também implementa regras de gerenciamento de sessões, permitindo regenerar códigos de acesso, invalidar códigos anteriores e encerrar sessões ativas para os demais participantes em tempo real.

## Funcionalidades

- **Comunicação com WebRTC:** comunicação em tempo real entre participantes.
- **Autenticação:** gerenciamento de autenticação utilizando Firebase Authentication.
- **Sincronização em tempo real:** atualização do estado das sessões utilizando Cloud Firestore.
- **Gerenciamento de sessões:** regeneração de códigos de acesso e invalidação dos códigos anteriores.
- **Encerramento sincronizado:** encerramento de sessões para os participantes conectados quando um código é invalidado.
- **Design System próprio:** componentes reutilizáveis, tokens de design e tema tipado.
- **Interface tipada:** desenvolvimento com TypeScript para maior consistência e segurança de tipos.

## Tecnologias

| Tecnologia | Utilização |
|---|---|
| [React](https://react.dev/) | Construção da interface e composição de componentes |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática e organização do código |
| [WebRTC](https://webrtc.org/) | Comunicação em tempo real entre participantes |
| [Firebase Authentication](https://firebase.google.com/docs/auth) | Autenticação de usuários |
| [Cloud Firestore](https://firebase.google.com/docs/firestore) | Persistência e sincronização de dados em tempo real |
| [Styled Components](https://styled-components.com/) | Estilização de componentes e integração com temas |
| [Sass](https://sass-lang.com/) | Recursos adicionais de estilização CSS |

## Arquitetura do frontend

O frontend foi estruturado com foco em reutilização, consistência visual e manutenção.

### Design System

O projeto possui um Design System próprio, composto por:

- **Design tokens:** centralização de cores, espaçamentos e demais valores visuais.
- **Tema tipado:** integração dos tokens com TypeScript para melhorar a segurança de tipos.
- **Componentes reutilizáveis:** componentes compartilhados para manter consistência entre as telas.
- **Estilização modular:** utilização de Styled Components e Sass conforme as necessidades da interface.

Essa abordagem reduz a duplicação de estilos, facilita a evolução visual e torna a interface mais consistente.

## Gerenciamento de sessões

O gerenciamento de sessões possui regras específicas para manter os participantes sincronizados.

1. Um código de sessão pode ser regenerado.
2. Ao regenerar o código, o código anterior é invalidado.
3. Os participantes conectados recebem a atualização em tempo real.
4. A sessão anterior é encerrada para os demais participantes.

O Firebase é utilizado para propagar as alterações de estado, enquanto a aplicação trata as consequências dessas mudanças na sessão e na interface.

## Executando localmente

### Pré-requisitos

- Node.js
- Yarn
- Um projeto Firebase configurado
- Configurações de autenticação e Firestore necessárias para a aplicação

### Instalação

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Entre na pasta do projeto

```bash
cd NOME_DO_PROJETO
```

### 3. Instale as dependências

```bash
yarn install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e preencha as variáveis necessárias:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_MEASUREMENT_ID=
```

Preencha os valores de acordo com a configuração dos serviços. Nunca inclua credenciais privadas ou senhas administrativas no frontend.

### 5. Inicie o ambiente de desenvolvimento

```bash
yarn dev
```

### 6. Gere o build de produção

```bash
yarn build
```

Inicie o ambiente de desenvolvimento:

```bash
yarn dev
```

Para gerar o build de produção:

```bash
yarn build
```

## Segurança

- As regras de segurança do Firestore devem restringir o acesso aos dados de acordo com as permissões de cada usuário.
- A invalidação de códigos e o encerramento de sessões devem ser validados por regras de negócio confiáveis, sem depender exclusivamente da interface.
- Credenciais privadas não devem ser incluídas no código do frontend.
- Arquivos `.env` com configurações locais não devem ser versionados.

## Licença

Consulte o arquivo `LICENSE` para obter informações sobre a licença de uso deste projeto.
