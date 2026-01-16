### 📋 Checklist de Entrega

Antes de enviar, certifique-se de que:

- [x] O código está no **seu repositório pessoal** do GitHub
- [x] O repositório está configurado como **público** (não privado)
- [x] A branch `main` contém o projeto original
- [x] A branch `release` contém todas as suas modificações
- [ ] Existe um Pull Request da `release` para a `main` **no seu repositório**
- [x] O README está atualizado com suas modificações
- [x] O projeto está funcionando corretamente
- [x] As credenciais de teste estão documentadas

> **🎯 LEMBRE-SE**: O link que você enviará deve ser do formato:
> `https://github.com/SEU-USUARIO/TestTecVix`

---

## 🏗️ Arquitetura do Projeto

O projeto está dividido em três partes principais:

```
TestTecVix/
├── backend-node-vix-test/    # API REST em Node.js + Express + Prisma
├── frontend-react-vix-test/  # Interface em React + TypeScript + Material-UI
├── screenshots/              # Imagens de referência para as telas
└── README.md                 # Este arquivo
```

---


## 🛠️ Stack Tecnológica

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM (Object-Relational Mapping)
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação via tokens
- **TypeScript** - Superset JavaScript tipado
- **Jest** - Framework de testes

### Frontend
- **React** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Material-UI (MUI)** - Biblioteca de componentes
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Zustand** - Gerenciamento de estado
- **i18next** - Internacionalização
- **Vitest** - Framework de testes

---

## ⚙️ Configuração e Instalação

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd TestTecVix
```

### 2. Configuração do Backend

#### 2.1. Navegue até a pasta do backend

```bash
cd backend-node-vix-test
```

#### 2.2. Instale as dependências

```bash
npm install
```

#### 2.3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com as seguintes configurações:

```env
# URL de conexão com o banco de dados
DATABASE_URL=mysql://root:password@localhost:3312/test-cloud-db

# Configurações do MySQL
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=test-cloud-db
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_HOST=localhost

# Secret para geração de tokens JWT
JWT_SECRET=seu_secret_super_seguro_aqui
```

> **Nota**: A porta do banco de dados é **3312** (não confundir com a porta padrão 3306 do MySQL).

#### 2.4. Suba o banco de dados

```bash
npm run db:up
```

Este comando irá:
- Subir um container Docker com MySQL
- Utilizar o arquivo `docker-compose-db.yml`
- Expor o banco na porta **3312**

#### 2.5. Configure o Prisma e popule o banco

```bash
# Gera o Prisma Client
npx prisma generate

# Executa as migrations e popula o banco com dados de teste
npx prisma migrate reset
```

Ou, alternativamente:

```bash
npx prisma migrate deploy && npx prisma db seed
```

> **Importante**: O comando `migrate reset` irá **apagar todos os dados** e recriar o banco. Use com cuidado!

### 3. Configuração do Frontend

#### 3.1. Navegue até a pasta do frontend

```bash
cd ../frontend-react-vix-test
```

#### 3.2. Instale as dependências

```bash
npm install
```

#### 3.3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.exemple`:

```bash
cp .env.exemple .env
```

Edite o arquivo `.env`:

```env
# URL base da API
VITE_BASE_URL=http://localhost:3001/api/v1
```

---

## 🚀 Como Executar o Projeto

### Modo Desenvolvimento

#### Backend (API)

```bash
cd backend-node-vix-test
npm run dev
```

A API estará disponível em: **http://localhost:3001**

#### Frontend

```bash
cd frontend-react-vix-test
npm run dev
```

O frontend estará disponível em: **http://localhost:3000**

---

### Modo Produção (Docker)

#### Backend

```bash
cd backend-node-vix-test

# Build da aplicação
npm run build

# Sobe o container Docker
npm run dc:up
```

#### Frontend

```bash
cd frontend-react-vix-test

# Sobe o container Docker (já faz o build automaticamente)
npm run dc:up
```

---

## 🔌 Estrutura de Portas

| Serviço  | Porta |
|----------|-------|
| Frontend | 3000  |
| Backend  | 3001  |
| MySQL    | 3312  |

---

## 📖 Conceitos Importantes

### MSP vs BrandMaster

- **Internamente** e a nível de arquitetura, temos a entidade `brandMaster` (que representa empresas dentro do sistema)
- **Comercialmente** e em muitos lugares no projeto, aparece o termo `MSP`
- Para todos os efeitos, **MSP = BrandMaster** (são a mesma entidade)

### Tipos de Usuários

#### Usuário Vituax
- Usuário **sem** `idBrandMaster` associado
- Considerado um usuário da própria Vituax

#### Usuário com BrandMaster
- Usuário **com** `idBrandMaster` associado
- Pertence a uma empresa/MSP específica

---

## 🔐 Permissões de Usuários

O sistema possui três níveis de permissão:

| Tipo      | Leitura | Criação | Edição | Exclusão |
|-----------|---------|---------|--------|----------|
| `member`  | ✅      | ❌      | ❌     | ❌       |
| `manager` | ✅      | ✅      | ✅     | ❌       |
| `admin`   | ✅      | ✅      | ✅     | ✅       |

### Detalhamento

- **Member (Membro)**: Somente leitura. Não pode criar, editar ou deletar nenhum recurso.
- **Manager (Gerente)**: Pode ler, criar e editar recursos, mas **não pode deletar**.
- **Admin (Administrador)**: Acesso total. Pode ler, criar, editar e deletar recursos.

---

## Usuários para Teste

Admin:
  Email: admin@vituax.com
  Senha: Admin@123

Manager:
  Email: manager@vituax.com
  Senha: Manager@123

Member:
  Email: member@vituax.com
  Senha: Member@123

---

## ✅ Tarefas do Desafio

### 📋 Configuração Inicial

- [x] Criar arquivo `.env` baseado no `.env.example` (backend)
- [x] Criar arquivo `.env` baseado no `.env.exemple` (frontend)
- [x] Corrigir configuração de ambiente para prevenir erros de inicialização

---

### 🔐 Autenticação e Autorização

- [x] Implementar as rotas de CRUD para usuários
- [x] Implementar rota de login do usuário
- [x] Implementar tela de login `/login`
- [x] Implementar rota de register do usuário
- [x] Implementar tela de register `/register`
- [x] Implementar autenticação com token JWT
- [x] Proteger as rotas da aplicação (exceto login e register) para que somente usuários logados possam acessar
- [x] Implementar proteção de telas com componente PrivatePage
- [x] Simplificar verificações de autenticação no componente PrivatePage
- [x] Refatorar URL de `/user/token/:idUser` para `/auth/token/:idUser`
- [x] Criar path `token/:idUser` na rota de autenticação
- [x] Sanitizar corpo das requisições nos logs middleware para ocultar informações sensíveis
- [x] Adicionar credenciais de usuários de teste no README e/ou `.env.example`

---

### 🗄️ Updates no Banco de Dados

- [x] Adicionar coluna `pass` na tabela `VM` (senha da VM, respeitando regras de segurança)
- [x] Adicionar coluna `location` do tipo `ETaskLocation` na tabela `VM`
- [x] Adicionar coluna `hasBackup` na tabela `VM`
- [x] Adicionar colunas na tabela `users`: fullName, userPhoneNumber, field, department e hiringDate
- [x] Adicionar novas propriedades ao schema JSON dos usuários
- [x] Alterar tipo do idUser de number para string em interfaces e funções relacionadas

---

### 🏠 Funcionalidades da Home Page

**Roteamento:**

- [x] Adicionar HomeRouter para roteamento principal da aplicação

**VM Card List:**

- [x] Implementar a função de **start** da VM
- [x] Implementar a função de **pause** da VM
- [x] Implementar os gráficos (mocados) de **Uso de CPU**
- [x] Implementar os gráficos (mocados) de **Uso de Memória**
- [x] Criar mock para gráficos de VMs

---

### ➕ Criação de VM

- [x] Implementar a lista dropdown dos **sistemas operacionais**
- [x] Implementar corretamente a **criação de uma VM**
- [x] Possibilitar a aceitação de **configurações dos cards de sugestão**

---

### 💾 Gerenciamento de VMs (My VMs)

**Filtros:**

- [x] Implementar filtro de **pesquisa** (busca por nome)
- [x] Implementar filtro por **status da VM**
- [x] Implementar filtro por **MSP/BrandMaster**
- [x] Implementar filtro **"Apenas minhas VMs"** (VMs exclusivas da mesma BrandMaster do usuário logado)

**Ações:**

- [x] Possibilitar **stop/start** da VM pela tabela
- [x] Possibilitar **stop/start** da VM pelo modal de edição
- [x] Adicionar "pausada" (singular) para exibição correta na tabela myVMs

**Modal de Edição:**

- [x] Trazer corretamente as **informações da VM** no modal
- [x] Possibilitar editar: **senha da VM**
- [x] Possibilitar editar: **nome da VM**
- [x] Possibilitar editar: **vCPU**
- [x] Possibilitar editar: **Memória**
- [x] Possibilitar editar: **Disco**
- [x] Possibilitar editar: **habilitar/desabilitar backup**
- [x] Implementar modal de edição funcionando para edição e exclusão de VMs

**Exclusão:**

- [x] Possibilitar **deletar VM** (somente usuários tipo `admin` podem deletar)

---

### 🏢 Cadastro de MSP

- [x] Implementar componente para **cadastro de MSP em 2 etapas**
- [x] Implementar fluxo de registro MSP com estados desabilitados
- [x] Implementar formulário multi-etapas
- [x] Possibilitar **criar um novo MSP**
- [x] Possibilitar **editar um MSP já existente**
- [x] Adicionar campos de **endereço** (ou puxar pelo CEP e/ou CNPJ)
- [x] Implementar filtros de **search**
- [x] Implementar flag de **"Mostrar somente os que estão em POC"**
- [x] Implementar suporte a internacionalização (i18n)
- [x] Corrigir máscaras de telefone

---

### 👥 Cadastro de Funcionários

- [x] Inserir novas colunas na **tabela "users"**: fullName, userPhoneNumber, field, department e hiringDate
- [x] Implementar a tela de **cadastro de funcionários** seguindo a imagem de referência
- [x] Implementar tela/página de criação de novos usuários
- [x] Implementar tabela de listagem de usuários com paginação
- [x] Implementar filtros: MSP/Brandmaster, status (ativo/inativo) e Role (Member, Manager ou Admin)
- [x] Implementar hook customizado para paginação de usuários com integração à API
- [x] Atentar para a **responsividade**
- [x] Considerar as **traduções** (i18n)

---

### 🎨 Configuração White Label

- [x] Permitir que a **logo da empresa** do usuário seja alterada
- [x] Somente usuários **admin** podem realizar essa alteração
- [x] Aprimorar tratamento de logo e gerenciamento de estado nos componentes LeftCardDomain e LeftCardLogo
- [x] Implementar regra que bloqueia as abas White Label e Contrato e Faturamento (conforme regras de negócio)

---

### 🏢 Gerenciamento de Marcas (Brands)

- [x] Aprimorar método getSelf para retornar detalhes da marca para usuários autenticados

---

### 👤 Configuração de Perfil e Notificações

- [x] Permitir a edição das **informações de contato**
- [x] Implementar funcionalidade de atualização de informações do usuário (userinfo)
- [x] Permitir a edição da **senha**
- [x] Implementar validação de senha atual obrigatória para alteração de senha
- [x] Aprimorar funcionalidade de atualização para exigir senha atual nas mudanças de senha
- [x] Corrigir validação de senha atual no UserService (enforce current password validation)
- [x] Permitir a edição da **imagem de perfil** do usuário logado
- [x] Atualizar definição de tipo do multer e corrigir URL do endpoint de upload

---

### 📚 Documentação

- [x] Criar README.md do projeto
- [x] Atualizar README com informações completas
- [x] Fazer a **documentação Swagger da API**
- [x] Implementar documentação Swagger para: autenticação, usuários, MSPs/BrandMaster e VMs
- [x] Verificar a rota `/docs` na API para visualizar a documentação

---

### 🔧 Melhorias Técnicas e Refatorações

- [x] Implementar sanitização de logs para proteção de dados sensíveis

---

**Total de funcionalidades implementadas: 90+**

---

## 📝 Comandos Úteis

### Backend

```bash
# Desenvolvimento
npm run dev                 # Inicia servidor em modo desenvolvimento
npm run build              # Compila o projeto TypeScript
npm run start              # Inicia servidor em modo produção
npm run test               # Executa testes com cobertura
npm run test:dev           # Executa testes em modo watch

# Docker
npm run db:up              # Sobe o banco de dados MySQL
npm run db:down            # Para o banco de dados
npm run dc:up              # Sobe a API em container Docker
npm run dc:down            # Para a API

# Prisma
npx prisma generate        # Gera o Prisma Client
npx prisma migrate dev     # Cria e aplica migrations
npx prisma migrate reset   # Reseta o banco e aplica seeds
npx prisma studio          # Abre interface visual do banco

# Qualidade de código
npm run lint               # Verifica problemas no código
npm run lint:fix           # Corrige problemas automaticamente
npm run format             # Formata código com Prettier
```

### Frontend

```bash
# Desenvolvimento
npm run dev                # Inicia servidor de desenvolvimento
npm run build              # Compila para produção
npm run preview            # Preview da build de produção

# Docker
npm run dc:up              # Sobe o frontend em container Docker
npm run dc:down            # Para o frontend

# Testes
npm run test               # Executa testes em modo watch
npm run test:coverage      # Executa testes com cobertura

# Qualidade de código
npm run lint               # Verifica problemas no código
npm run format             # Formata código com Prettier
```

---

## 🤝 Boas Práticas

1. **Commits semânticos**: Use prefixos como `feat:`, `fix:`, `refactor:`, `docs:`, etc.
2. **Code review**: Revise seu próprio código antes de fazer o commit
3. **Testes**: Sempre que possível, adicione testes para suas funcionalidades
4. **Documentação**: Mantenha o README atualizado com suas modificações
5. **Clean code**: Siga os padrões de código já estabelecidos no projeto

---

## 📚 Recursos Adicionais

- [Documentação do Prisma](https://www.prisma.io/docs)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do React](https://react.dev/)
- [Documentação do Material-UI](https://mui.com/)
- [JWT.io](https://jwt.io/) - Para entender tokens JWT

---

## 🎯 Lembrete Final

### Não se esqueça de:

1. ✅ **Fazer o fork** deste repositório para sua conta do GitHub
2. ✅ **Trabalhar no seu repositório** (não no repositório original)
3. ✅ **Atualizar este README** com suas modificações e soluções
4. ✅ **Enviar o link do SEU repositório** no GitHub para a equipe da Vituax

---