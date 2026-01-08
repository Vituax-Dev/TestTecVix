# Plataforma de Gerenciamento de Nuvem Vituax - Documentação Completa

## Sumário

1. [Público-Alvo](#público-alvo)
2. [Visão Geral da Plataforma](#visão-geral-da-plataforma)
3. [Instalação e Configuração](#instalação-e-configuração)
4. [Arquitetura do Sistema](#arquitetura-do-sistema)
5. [Funcionalidades Principais](#funcionalidades-principais)
6. [Interface do Usuário (UI)](#interface-do-usuário-ui)
7. [APIs e Integrações](#apis-e-integrações)
8. [Banco de Dados](#banco-de-dados)
9. [Segurança e Controle de Acesso](#segurança-e-controle-de-acesso)
10. [CD | CI](#cd--ci)
11. [Deploy](#deploy)
12. [Boas Práticas de Desenvolvimento](#boas-práticas-de-desenvolvimento)

---

## 1. Público-Alvo

Este documento foi desenvolvido para diferentes perfis de usuários:

- **Desenvolvedores**: Profissionais que trabalharão diretamente com o código, integrando, ajustando e melhorando a plataforma.
- **Administradores de TI**: Responsáveis pela manutenção e monitoramento da infraestrutura.
- **MSPs - Managed Service Providers (Provedores de Serviços Gerenciados)**: Empresas ou profissionais que gerenciam e assumem a responsabilidade por uma variedade de serviços de tecnologia para seus clientes, como infraestrutura de TI, segurança, redes e serviços em nuvem. Eles geralmente fornecem suporte contínuo e proativo, permitindo que os clientes se concentrem em suas atividades principais enquanto os MSPs cuidam das operações técnicas.
- **Clientes Finais (Companies)**: Usuários que acessam as funcionalidades de monitoramento e gestão de VMs oferecidas pelas marcas parceiras (BrandMasters).

---

## 2. Visão Geral da Plataforma

A Vituax é uma plataforma de gerenciamento de nuvem que permite o controle e monitoramento de VMs, além de fornecer uma camada intermediária para que outras marcas (BrandMasters, MSPs) ofereçam seus próprios serviços de nuvem personalizados às empresas finais (Companies). A plataforma inclui:

- **Gestão de VMs**: Criação, atualização, monitoramento e deleção de máquinas virtuais.
- **Segurança e Conformidade**: Controle de acesso com permissões, autenticação JWT e auditoria de logs.
- **Notificações em Tempo Real**: Alertas para uso excessivo de recursos, atualizações de status e sugestões de melhorias.
- **Integração API**: Conexão com APIs de cloud e ferramentas de monitoramento.
- **Pay-as-you-go**: Permite que os usuários paguem apenas pelos recursos efetivamente utilizados, ajustando-se às demandas de cada empresa. Com monitoramento de custos em tempo real, os usuários podem visualizar seus gastos instantaneamente, o que facilita o controle financeiro e promove decisões mais informadas.
- **Suporte por IA**: Para orientar os clientes nas configurações ideais de acordo com as necessidades de cada negócio. Por meio de um prompt, os usuários podem solicitar recomendações de configuração específicas para suas demandas, e a IA, integrada ao Grok e Regex, otimiza as sugestões com base em análises detalhadas e padrões de uso. Isso proporciona uma experiência personalizada.
- **Versão Mobile**: Oferecendo aos usuários acesso às principais funcionalidades diretamente pelo celular. Essa versão permite monitoramento de custos, ajustes de configurações e suporte por IA, tudo de forma prática e otimizada para dispositivos móveis, garantindo uma experiência completa e conveniente onde quer que o usuário esteja.

---

## 3. Instalação e Configuração

### 3.1 Pré-requisitos

#### Acesso ao Repositório GitLab

- Verifique se você possui as permissões necessárias para acessar o repositório no GitLab. Clone o repositório utilizando SSH ou HTTPS.
- [Repositório GitLab](https://gitlab.com/vituax1)

#### Ambiente de Execução

- **VM**: O deploy inicial (POC) está configurado para execução em uma máquina virtual dentro da Upix.
- **Docker e Docker Compose**: A aplicação está dockerizada, com orquestração via Docker Compose.

#### Passos de Instalação

- **Clonando o Repositório**:
  ```bash
  git clone <URL_DO_REPOSITORIO_GITLAB>
  cd <NOME_DO_DIRETORIO>
  Exemplo para API em Node.js:
  git clone git@gitlab.com:vituax1/backend-node-api.git
  ```

### Configuração das Variáveis de Ambiente

Certifique-se de configurar todas as variáveis de ambiente necessárias no arquivo `.env`. As variáveis incluem:

- Credenciais para o banco de dados MySQL.
- Configurações para autenticação e autorização (JWT).
- Configurações específicas para o acesso à API de IA e à API de orquestração de VMs.

#### Construção e Inicialização com Docker Compose

Execute o comando abaixo para construir e inicializar os containers:

docker-compose up --

Esse comando realiza o build de todas as imagens necessárias e inicia a aplicação na VM.

#### Acesso à Aplicação

- **API Front-end**: Acesse o front-end através do endereço da VM, configurado na porta específica definida no `docker-compose.yaml`.
- **API Back-end e API de IA**: Certifique-se de que as portas definidas no Docker Compose estão disponíveis e configuradas para acesso externo, se necessário para a POC.

#### 3.2 Manutenção e Monitoramento

- Utilize o Docker Compose para monitorar e controlar os containers da aplicação:

  ```bash
  docker-compose ps        # Verificar o status dos containers
  docker-compose logs -f   # Ver logs em tempo real
  docker-compose down      # Parar os containers
  ```

**Comandos de Scripts**

| Script           | Descrição                                                                              |
| ---------------- | -------------------------------------------------------------------------------------- |
| `npm test`       | Executa testes com cobertura usando o Jest.                                            |
| `npm run build`  | Compila o código TypeScript para a pasta `dist`.                                       |
| `npm start`      | Inicia a API a partir do código compilado, lendo as variáveis do arquivo `.env`.       |
| `npm run dev`    | Inicia a API em ambiente de desenvolvimento com `ts-node-dev`.                         |
| `npm run lint`   | Verifica o código com ESLint.                                                          |
| `npm run format` | Formata o código usando Prettier.                                                      |
| `npm run dc:up`  | Sobe o ambiente Docker configurado no `docker-compose.yml`.                            |
| `npm run db:up`  | Sobe apenas o banco de dados Docker, conforme configuração em `docker-compose-db.yml`. |

**3.3 Estrutura das Dependências**

-**Dependências de Produção**

| Pacote           | Versão  | Descrição                                                              |
| ---------------- | ------- | ---------------------------------------------------------------------- |
| `@prisma/client` | ^5.21.1 | Cliente Prisma para interação com o banco de dados.                    |
| `express`        | ^4.21.1 | Framework de roteamento e middleware para construir APIs em Node.js.   |
| `jsonwebtoken`   | ^9.0.2  | Implementa autenticação com tokens JWT.                                |
| `axios`          | ^1.7.7  | Cliente HTTP para requisições externas.                                |
| `bcrypt`         | ^5.1.1  | Biblioteca de hashing para senhas.                                     |
| `cors`           | ^2.8.5  | Middleware para habilitar CORS.                                        |
| `dotenv`         | ^16.4.5 | Gerencia variáveis de ambiente.                                        |
| `swagger-jsdoc`  | ^6.2.8  | Gera documentação de API em Swagger a partir de comentários de código. |

-\*\*Dependências de Desenvolvimento:
| Pacote | Versão | Descrição |
|------------------|----------|---------------------------------------------------------------|
| `@types/express` | ^5.0.0 | Tipos para o Express.js. |
| `typescript` | ^5.6.3 | Superset de JavaScript com tipagem estática. |
| `jest` | ^29.7.0 | Framework de testes JavaScript. |
| `eslint` | ^9.13.0 | Ferramenta de linting para manter a qualidade do código. |
| `prettier` | ^3.3.3 | Formatação de código automática. |

## 4. Arquitetura da Cloud Vituax

### Visão Geral

A arquitetura da Cloud Vituax é monolítica, estruturada para permitir modularidade e baixo acoplamento entre suas partes. A aplicação utiliza uma abordagem em camadas que promove organização e separação de responsabilidades, além de simplificar a manutenção e extensão de funcionalidades. Sua principal estrutura segue o padrão Model-View-Controller (MVC), organizada em três camadas: **Model**, **Service** e **Controller**.

### Componentes Principais

#### APIs

- **API Front-end**: Desenvolvida em React com TypeScript, essa API fornece a interface de usuário e integra-se ao back-end para acessar dados e realizar operações. Está configurada para suportar diferentes idiomas e modos (dark e light), promovendo uma experiência personalizada ao usuário.
- **API Back-end em Node.js**: Responsável pelo gerenciamento de dados e serviços internos da plataforma. Essa API serve de integração para o front-end, além de se conectar ao banco de dados MySQL para CRUD e autenticação.
- **API de Automação (LXD)**: Desenvolvida em Python, essa API realiza a orquestração e o gerenciamento de máquinas virtuais utilizando o LXD, que permite a criação, configuração e destruição de VMs conforme as necessidades do sistema.
- **API de Inteligência Artificial (IA)**: Focada em consumir um serviço externo de IA (em fase de testes), essa API ajuda na configuração personalizada de máquinas virtuais com base em demandas do usuário. Integra-se com o Hugging Face para utilizar o modelo GPT-2, auxiliado pelo Grok para análise de logs e recomendações baseadas em regex avançado.

### Modelo em Camadas

- **Model**: Utiliza o Prisma ORM para definir a estrutura e interagir com o banco de dados MySQL. O Prisma facilita a criação e manipulação de dados com tipagem forte e permite integrações com o Workbench para visualização e administração de dados.
- **Service**: Implementa a lógica de negócios e validações, isolando a lógica do aplicativo das operações de entrada e saída de dados. Essa camada coordena o comportamento do sistema, garantindo o baixo acoplamento entre as camadas e promovendo a reutilização de código.
- **Controller**: Responsável pelo gerenciamento das requisições HTTP e pela interação com a camada de Service. Os Controllers servem como intermediários entre a interface de usuário (front-end) e as operações de dados e lógica.

### Banco de Dados

A aplicação é conectada a um banco de dados MySQL, que armazena todos os dados essenciais da plataforma. O banco é gerenciado através do Prisma, que permite operações eficientes e seguras de leitura e escrita. O Workbench é utilizado para facilitar a visualização e manipulação de dados durante o desenvolvimento e manutenção.

### Acoplamento e Componentização

A arquitetura foi projetada com baixo acoplamento, permitindo que cada API e camada funcione de maneira relativamente independente. A componentização da aplicação facilita a manutenção e permite a introdução de novas funcionalidades sem afetar as demais áreas da aplicação.

### Tecnologias e Ferramentas de Suporte

- **Orquestração e Contêineres**: A aplicação é inteiramente dockerizada, utilizando o Docker Compose para orquestração e fácil configuração dos ambientes.
- **Documentação e Manutenção**: Os endpoints das APIs são documentados com Swagger, e o controle de código fonte é realizado no GitLab.
- **CI/CD**: O pipeline de CI/CD no GitLab é configurado para realizar testes automatizados e deploys simplificados.

### 5 Funcionalidades Principais

A Cloud Vituax oferece um conjunto robusto de funcionalidades projetadas para facilitar o gerenciamento de recursos de cloud computing. Abaixo estão as principais funcionalidades:

- **Gerenciamento de Usuários**:

  - Cadastro e autenticação segura via JWT.
  - Permissões definidas por roles (Admin, Manager e Membro), permitindo controle granular sobre as ações dos usuários.
  - Funcionalidades de recuperação de senha e atualização de perfil.

- **Configuração de Máquinas Virtuais (VMs)**:

  - Assistente baseado em IA que interpreta as necessidades do usuário e sugere configurações de máquinas virtuais personalizadas, considerando requisitos como CPU, memória, armazenamento e rede.
  - Ferramentas de automação com LXD para criação, atualização e exclusão de VMs diretamente na plataforma.
  - Configurações de recursos críticos (vCPU, armazenamento, sistema operacional) com opções de alteração e confirmação para garantir precisão.

- **Monitoramento em Tempo Real**:

  - Dashboard de monitoramento com alertas e indicadores de desempenho das VMs.
  - Exibição de custos em tempo real, permitindo que o usuário acompanhe o consumo financeiro.
  - Opções de notificações e alertas para eventos importantes e limites de recursos.

- **Suporte Integrado**:
  - Sistema de ajuda com sugestões automáticas baseadas em IA, integrando respostas rápidas para as dúvidas mais comuns dos usuários.
  - Links rápidos para canais de suporte e redes sociais da empresa, incluindo LinkedIn e Instagram.

### 6. Interface do Usuário (UI/UX)

A interface da Cloud Vituax foi projetada com foco na usabilidade e acessibilidade, proporcionando uma experiência fluida para o usuário. Abaixo estão os elementos principais da interface:

- **Tela Principal (Home)**:

  - Barra de pesquisa rápida no topo para acesso imediato a informações de VMs e configurações.
  - Notificações no header para alertar sobre atualizações de recursos e novos eventos.
  - Menu de usuário com acesso a perfil, configurações e logout.
  - Dashboard central com widgets personalizáveis para monitoramento das VMs e custos em tempo real.

- **Painel Lateral (Sidebar)**:

  - **Gerenciamento de VMs**: Acesso direto ao painel de configurações das VMs, permitindo iniciar, parar, atualizar e deletar máquinas virtuais.
  - **Dashboard**: Exibe métricas e gráficos para análise de performance e utilização.
  - **Relatórios**: Ferramenta de geração de relatórios customizados sobre uso de recursos, segurança e custos.
  - **Segurança**: Acesso a configurações e alertas de segurança da plataforma.
  - **Suporte**: Link para o sistema de suporte e ajuda.

- **Footpage**:
  - Links rápidos para redes sociais da empresa e suporte.
  - Informações sobre a versão do software e acesso a configurações de idioma e tema (modos claro e escuro).

## Interface do Usuário (UI)

![Diagrama da Interface do Usuário](imagens/interface.png "Visão geral da interface do usuário")
**Figura 1.** UX/UI Design: Fluxo do usuário (login | cadastro | recuperação de senha | tela home)  
[Link para o diagrama no Miro](https://miro.com/welcomeonboard/dVRmM3pWNVYxa09XNlluQjB3WWhqNWRmSGhhQ1dZYXdrbFdpTXZmY21LaE8yNzdyY3RjOWI2eldieldjdWhHV3wzNDU4NzY0NjA0NDY3NjMxNTEzfDI=?share_link_id=628376790691)

## 7. APIs

### Visão Geral

A Cloud Vituax é uma plataforma de gerenciamento de nuvem que integra quatro APIs principais para fornecer funcionalidades completas para seus usuários. Cada API possui uma responsabilidade distinta, garantindo modularidade e facilidade de manutenção. Abaixo estão as especificações iniciais de cada uma.

### 7.1 API de Front-end

- **Descrição**: Interface de usuário para interação com a plataforma Vituax, desenvolvida em React com TypeScript, visando acessibilidade e uma experiência fluida.
- **Principais Funções**:
  - Gerenciamento de usuários e autenticação.
  - Painel de controle para monitoramento em tempo real das configurações e custo da nuvem.
  - Interface de configuração de máquinas virtuais baseada em linguagem natural.
- **Tecnologias**:
  - **Linguagens**: TypeScript, React.
  - **UI Libraries**: MUI, Shadcn.
  - **Ambiente**: Docker, integrado com a API Back-end para consumo de dados.
  - **Testes**: snapshot e jest (Cobertura superior a 70%)

### 7.2 API Back-end em Node.js

- **Descrição**: Responsável pelo gerenciamento de dados e operações de usuários, integrando-se ao front-end e à API de orquestração das máquinas. Implementa autenticação, autorização e permissões de acordo com as roles dos usuários.
- **Principais Funções**:
  - Gerenciamento de autenticação e autorização usando JWT.
  - API RESTful com endpoints para CRUD de usuários e configurações de máquinas.
  - Conexão ao banco de dados MySQL com ORM Prisma para segurança e consistência.
  - Documentação de endpoints com Swagger.
- **Tecnologias**:
  - **Linguagens**: Node.js, TypeScript.
  - **Banco de Dados**: MySQL.
  - **Segurança**: Criptografia de senha com bcrypt.
  - **Ambiente**: Docker, com ESLint e Prettier para padronização de código.
  - **Testes**: snapshot e jest (Cobertura superior a 70%)

### 7.3 API Cloud para IA

- **Descrição**: API dedicada à inteligência artificial, utilizada para guiar os usuários na configuração de máquinas virtuais com base em suas necessidades. A IA interpreta descrições e demanda de configuração, fornecendo recomendações personalizadas.
- **Principais Funções**:
  - Interpretação de prompt em linguagem natural para configuração de VMs.
  - Integração com o modelo GPT-2 via Hugging Face para análise de necessidades.
  - Uso de regex avançado e Grok para análise de logs e otimização.
- **Tecnologias**:
  - **IA**: GPT-2 via Hugging Face.
  - **Análise de Logs**: Grok para regex avançado.
  - **Ambiente**: Docker.
  - **Testes**: snapshot e jest (Cobertura superior a 70%)

### 7.4 API Cloud integrada ao LXD para orquestração das máquinas

- **Descrição**: API responsável pela criação, configuração e gerenciamento de máquinas virtuais utilizando o LXD. Atua como um controlador que implementa e coordena as VMs com base nas recomendações geradas pela API de IA.
- **Principais Funções**:
  - Orquestração de máquinas virtuais com base nas configurações sugeridas.
  - Suporte para operações de criação, alteração e exclusão de VMs.
  - Integração com Python para comunicação e operações com o LXD.
- **Tecnologias**:
  - **Orquestração**: LXD para gerenciamento de containers.
  - **Linguagens**: Python.
  - **Ambiente**: Docker, com async e await para otimização de requisições.

---

## 8. Banco de Dados

### Visão Geral

O banco de dados da Cloud Vituax foi projetado para armazenar e gerenciar informações de usuários, empresas, marcas, máquinas virtuais (VMs) e atividades de log detalhadas. A estrutura foi cuidadosamente planejada para garantir a rastreabilidade de ações e mudanças no sistema, proporcionando uma base robusta e segura para o funcionamento da plataforma.

Abaixo está a descrição completa das principais tabelas, incluindo campos, tipos de dados, relacionamentos e enumerações utilizadas no banco de dados.

**Tabelas Principais**

## 1. brandTheme

Armazena as configurações de temas visuais (claro ou escuro) aplicáveis às marcas dentro da plataforma.

- **Campos**:
  - `idBrandTheme (Int)`: Identificador único do tema.
  - `mode (EModeTheme)`: Enum indicando o modo do tema (light ou dark).
  - `themeLight (Json)`: Configuração para o tema claro.
  - `themeDark (Json)`: Configuração para o tema escuro.
  - `themeName (String)`: Nome do tema.
  - `createdAt (DateTime)`: Data de criação do tema.
  - `updatedAt (DateTime)`: Data de última atualização do tema.
  - `deletedAt (DateTime)`: Data de exclusão do tema, se aplicável.
- **Relacionamentos**:
  - `logBrandTheme`: Histórico de alterações feitas no tema.

## 2. brandMaster

Contém as informações principais de cada marca registrada na plataforma.

- **Campos**:
  - `idBrandMaster (Int)`: Identificador único da marca.
  - `brandName (String)`: Nome da marca.
  - `idBrandTheme (Int)`: Identificador do tema associado à marca.
  - `isActive (Boolean)`: Indica se a marca está ativa.
  - `brandLogo (String)`: URL para o logotipo da marca.
  - `createdAt, updatedAt, deletedAt (DateTime)`: Datas de criação, atualização e exclusão da marca.
- **Relacionamentos**:
  - `brandTheme`: Tema associado à marca.
  - `logBrandMaster`: Histórico de alterações feitas na marca.
  - `company`: Empresas associadas à marca.

## 3. company

Representa as empresas que fazem parte do sistema e estão associadas a uma marca.

- **Campos**:
  - `idCompany (Int)`: Identificador único da empresa.
  - `idBrandMaster (Int)`: Identificador da marca associada.
  - `companyName (String)`: Nome da empresa.
  - `companyLogo (String)`: URL para o logotipo da empresa.
  - `isActive (Boolean)`: Estado de atividade da empresa.
  - `createdAt, updatedAt, deletedAt (DateTime)`: Datas de criação, atualização e exclusão da empresa.
- **Relacionamentos**:
  - `brandMaster`: Marca associada à empresa.
  - `logCompany`: Histórico de alterações feitas na empresa.
  - `vM`: Máquinas virtuais associadas à empresa.
  - `user`: Usuários associados à empresa.

## 4. vM

Gerencia as máquinas virtuais (VMs) e suas configurações.

- **Campos**:
  - `idVM (Int)`: Identificador único da VM.
  - `vmName (String)`: Nome da VM.
  - `vCPU (Int)`: Quantidade de CPUs virtuais alocadas.
  - `ram (Int)`: Quantidade de memória RAM alocada.
  - `disk (Int)`: Capacidade de armazenamento em disco.
  - `hasBackup (Boolean)`: Indica se a VM possui backup configurado.
  - `idCompany (Int)`: Identificador da empresa à qual a VM pertence.
  - `idBrandMaster (Int)`: Identificador da marca principal associada.
  - `status (EVMStatus)`: Enum indicando o status atual da VM (RUNNING, STOPPED, PAUSED).
  - `os (String)`: Sistema operacional da VM.
  - `user` e `pass (String)`: Credenciais de acesso (armazenadas de forma segura).
  - `ipv4Addr`, `ipv4Gw`, `ipv6Addr`, `ipv6Gw (String)`: Endereços IP e gateways.
  - `createdAt, updatedAt, deletedAt (DateTime)`: Datas de criação, atualização e exclusão da VM.
- **Relacionamentos**:
  - `company`: Empresa à qual a VM pertence.
  - `logVM`: Histórico de alterações feitas na VM.
  - `task`: Tarefas executadas na VM.

## 5. user

Armazena informações dos usuários que interagem com a plataforma.

- **Campos**:
  - `idUser (Int)`: Identificador único do usuário.
  - `username (String)`: Nome de usuário.
  - `password (String)`: Senha criptografada.
  - `email (String)`: Email de contato do usuário.
  - `profileImgUrl (String)`: URL da imagem de perfil.
  - `role (ERole)`: Enum indicando a função do usuário (admin, manager, member).
  - `idCompany (Int)`: Identificador da empresa associada ao usuário.
  - `idBrandMaster (Int)`: Identificador da marca principal associada.
  - `isActive (Boolean)`: Estado de atividade do usuário.
  - `createdAt, updatedAt, deletedAt (DateTime)`: Datas de criação, atualização e exclusão do usuário.
- **Relacionamentos**:
  - `company`: Empresa associada ao usuário.
  - `logUser`: Histórico de ações do usuário.

## 6. userVituax

Similar à tabela `user`, mas especificamente para usuários internos ou administrativos da plataforma Vituax.

- **Campos**:
  - `idUserVituax (Int)`: Identificador único do usuário Vituax.
  - `username (String)`: Nome de usuário.
  - `password (String)`: Senha criptografada.
  - `email (String)`: Email de contato do usuário.
  - `profileImgUrl (String)`: URL da imagem de perfil.
  - `role (ERole)`: Enum indicando a função do usuário (admin, manager, member).
  - `isActive (Boolean)`: Estado de atividade do usuário.
  - `createdAt, updatedAt, deletedAt (DateTime)`: Datas de criação, atualização e exclusão do usuário.
- **Relacionamentos**:
  - `logUserVituax`: Histórico de ações realizadas por esses usuários.

## 7. task

Registra as tarefas relacionadas às máquinas virtuais, como criação, exclusão e outras operações.

- **Campos**:
  - `idTask (Int)`: Identificador único da tarefa.
  - `idVM (Int)`: Identificador da VM à qual a tarefa está associada.
  - `task (ETask)`: Enum da tarefa executada (create, delete, operation).
  - `server`, `hostname (String)`: Detalhes do servidor e hostname associados.
  - `action (ECloudTaskStatus)`: Status da tarefa (pending, started, finished, rejected).
  - `operation (EOperation)`: Tipo de operação realizada (start, reboot, shutdown, hard).
  - `createdAt, updatedAt, deletedAt (DateTime)`: Datas de criação, atualização e exclusão da tarefa.
- **Relacionamentos**:
  - `vM`: VM associada à tarefa.
  - `logTask`: Histórico de alterações da tarefa.

## Tabelas de Log

As tabelas de log (`logBrandTheme`, `logBrandMaster`, `logCompany`, `logVM`, `logUser`, `logUserVituax`, `logTask`) registram o histórico detalhado de alterações e interações em cada entidade. Esses logs incluem:

- **Campos Comuns**:
  - `idLog`: Identificador único do log.
  - `logDate (DateTime)`: Data e hora do log.
  - `interaction (EInteraction)`: Tipo de ação registrada (`CREATE`, `UPDATE`, `DELETE`).
  - `idWhoDidVituax` e `idWhoDid`: Identificadores dos usuários que realizaram a ação.
  - `oldValues` e `newValues (Json)`: Armazena os valores antigos e novos dos dados alterados.

Cada tabela de log está associada a uma tabela principal, armazenando o histórico de mudanças para auditoria e rastreabilidade.

## Enumerações (Enums)

1. **EModeTheme**: Define os modos de tema disponíveis.

   - `light`: Modo claro.
   - `dark`: Modo escuro.

2. **EInteraction**: Define os tipos de interação registradas nos logs.

   - `CREATE`: Criação de um novo registro.
   - `UPDATE`: Atualização de um registro existente.
   - `DELETE`: Exclusão de um registro.

3. **EVMStatus**: Define o status operacional das máquinas virtuais.

   - `RUNNING`: VM em execução.
   - `STOPPED`: VM parada.
   - `PAUSED`: VM pausada.

4. **ERole**: Define os níveis de permissão dos usuários.

   - `admin`: Administrador com acesso total.
   - `manager`: Gerente com permissões intermediárias.
   - `member`: Membro com permissões limitadas.

5. **ETask**: Define os tipos de tarefas realizadas nas VMs.

   - `create`: Criação de VM.
   - `delete`: Exclusão de VM.
   - `operation`: Operação em uma VM existente.

6. **EOperation**: Define as operações que podem ser realizadas nas VMs.

   - `start`: Iniciar a VM.
   - `reboot`: Reiniciar a VM.
   - `shutdown`: Desligar a VM.
   - `hard`: Desligamento forçado.

7. **ECloudTaskStatus**: Define o status das tarefas de cloud.
   - `pending`: Tarefa pendente.
   - `started`: Tarefa iniciada.
   - `finished`: Tarefa concluída.
   - `rejected`: Tarefa rejeitada.

A Vituax funciona como a administradora da plataforma, oferecendo a infraestrutura de nuvem que outras marcas (BrandMasters), vulgo MSPs, utilizam para fornecer seus próprios serviços de nuvem.

## Estrutura de Relacionamento

**BrandMaster (MSPs)** representa as marcas parceiras que contratam a infraestrutura da Vituax para oferecer nuvens personalizadas a empresas associadas a elas, chamadas **Companies**. Cada BrandMaster é como um cliente empresarial que personaliza e revende os serviços de nuvem da Vituax para seus próprios clientes (Companies).

**Companies** são empresas que realmente utilizam a nuvem para rodar suas operações. Elas são clientes diretos do BrandMaster e acessam os recursos de nuvem que a marca fornece, mas não têm um relacionamento direto com a Vituax. É como se elas vissem apenas a marca de seu fornecedor (BrandMaster) e usassem a nuvem de forma independente, sem saber que a infraestrutura é gerenciada pela Vituax.

**userVituax** representa os usuários internos da Vituax, que têm permissões para acessar e gerenciar o sistema e garantir que os serviços estejam sendo fornecidos conforme esperado para os BrandMasters. Esses usuários têm acesso a informações de alto nível sobre as marcas, mas não aos detalhes operacionais das Companies individuais.

### Em resumo:

- **Vituax** fornece a infraestrutura e gerencia os BrandMasters.
- **BrandMasters** utilizam a infraestrutura da Vituax para fornecer serviços de nuvem às suas Companies.
- **Companies** usam a nuvem via BrandMaster e são invisíveis para a Vituax.
- **userVituax** são usuários administrativos que garantem o funcionamento da plataforma e acessam os BrandMasters, mas não as Companies.

Essas relações permitem que a Vituax controle a infraestrutura e monitore as marcas (BrandMasters) enquanto mantém uma camada de separação, onde cada BrandMaster pode atender suas Companies sem interferência direta da Vituax.

---

## Atualização automática do Banco de Dados da API

1. Acesse o repositório e execute o comando localmente:

   ```bash
   npx prisma generate

   ```

2. Após isso, na pasta prisma/dbml, você encontrará um arquivo .dbml com as tabelas do banco de dados.

3. Para visualizar o diagrama, vá até [dbdiagram.io](https://dbdiagram.io) Copie o conteúdo do arquivo schema.dbml e cole na plataforma.

O dbdiagram.io é uma ferramenta prática e gratuita que permite criar diagramas de relacionamento de banco de dados de forma rápida e fácil, usando apenas o teclado.

# 9. Segurança e Controle de Acessos

## 1. Autenticação e Autorização

- **Autenticação baseada em JWT**:

  - Todos os usuários precisam se autenticar para acessar a plataforma. Utilizamos JSON Web Tokens (JWT) para autenticação segura, onde cada token é gerado no momento do login e possui um tempo de expiração configurado para evitar acessos prolongados não autorizados.
  - Os tokens JWT são assinados e verificados em cada requisição para garantir que o usuário é quem diz ser.

- **Controle de Acesso por Role**:
  - O sistema implementa um modelo de controle de acesso baseado em papéis (roles), onde cada usuário possui uma role específica (admin, manager, member) definida na plataforma.
  - Cada role tem permissões e restrições específicas, garantindo que os usuários tenham acesso somente às funcionalidades relevantes ao seu nível de autorização.
  - A role é verificada em cada endpoint para limitar o acesso e proteger dados sensíveis.

## 2. Controle de IPs e DNS

- **Verificação de IP e DNS**:
  - A plataforma implementa uma camada adicional de segurança exigindo que o cliente utilize o IP e o DNS registrados no banco de dados da Vituax. Se o login for feito de um IP diferente daquele armazenado, o acesso não será permitido.
  - Essa medida protege contra acessos não autorizados de fontes desconhecidas e garante que apenas dispositivos autorizados possam realizar login na plataforma.

## 3. Criptografia de Dados

- **Criptografia de Senhas**:

  - As senhas dos usuários são armazenadas no banco de dados de forma criptografada utilizando bcrypt, que aplica uma função de hashing com salt. Isso garante que as senhas sejam seguras e não possam ser acessadas diretamente mesmo em caso de comprometimento do banco de dados.

- **Comunicação Segura**:
  - Todas as comunicações entre o cliente e o servidor são protegidas por HTTPS, garantindo que os dados trafegados estejam criptografados e protegidos contra interceptação e ataques de intermediários (MITM).

## 4. Monitoramento e Registro de Atividades

- **Logs de Atividades**:

  - A plataforma registra logs detalhados de todas as ações relevantes no sistema, incluindo alterações de configuração, criação e exclusão de VMs, e operações críticas de usuário.
  - Cada log contém informações sobre a ação realizada, o usuário que a executou e o horário da atividade, permitindo auditoria e rastreamento de todas as operações.

- **Logs de Segurança**:
  - São registrados logs específicos para atividades relacionadas à segurança, como tentativas de login, falhas de autenticação e alterações de permissões de usuário.
  - Esses logs são armazenados e monitorados para identificar possíveis tentativas de acesso não autorizado ou comportamentos suspeitos.

## 5. Gerenciamento de Sessões

- **Expiração de Sessão**:

  - Para reduzir o risco de uso não autorizado, as sessões de usuário possuem uma expiração automática. Usuários inativos por um período prolongado são desconectados automaticamente, forçando uma nova autenticação.

- **Revogação de Tokens**:
  - Em caso de atividades suspeitas ou revogação de acesso, os tokens JWT podem ser invalidados, garantindo que o usuário precise se autenticar novamente.

## 6. Conformidade com Políticas de Privacidade e Segurança

- **Política de Mínimo Privilégio**:

  - Acesso a dados e funcionalidades é concedido apenas conforme necessário para o desempenho das funções de cada usuário, minimizando o risco de acessos não autorizados.

- **GDPR e LGPD**:
  - A plataforma segue as normas de proteção de dados pessoais (GDPR e LGPD), garantindo que os dados de usuários sejam tratados com respeito à privacidade e com medidas adequadas de segurança.

## 7. Gestão de Vulnerabilidades e Atualizações de Segurança

- **Atualizações e Patches**:

  - O ambiente da aplicação é atualizado regularmente com patches de segurança para corrigir vulnerabilidades conhecidas e manter a integridade da plataforma.

- **Varreduras de Segurança**:
  - São realizadas verificações periódicas de segurança para identificar possíveis vulnerabilidades, tanto no código quanto na infraestrutura.

# 10. CI/CD (Integração Contínua e Entrega Contínua)

A Cloud Vituax utiliza uma pipeline de CI/CD configurada no GitLab para automatizar e otimizar o processo de desenvolvimento, teste e deploy. Essa prática garante que as novas funcionalidades e correções sejam integradas de forma contínua e segura ao código base, minimizando riscos e acelerando o ciclo de desenvolvimento.

## 10.1 Integração Contínua (CI)

- **Pipeline de Build e Testes Automatizados**:

  - Toda vez que um novo código é commitado ou um merge request é criado, o pipeline é acionado automaticamente no GitLab.
  - O processo de CI inclui etapas de build e execução de testes automatizados (unitários e de integração) para verificar a integridade e a qualidade do código.
  - O objetivo é alcançar uma cobertura de testes de 70%, com foco em testes de unidade e snapshots, garantindo que a maior parte das funcionalidades seja testada antes de qualquer entrega.

- **Padronização de Código**:

  - O pipeline inclui validações de estilo e formatação de código usando ESLint e Prettier, para manter a consistência e a legibilidade do código em toda a base.
  - Erros de linting ou formatação são capturados automaticamente, e o commit falha se o código não atender aos padrões estabelecidos.

- **Verificação de Segurança**:
  - São realizadas verificações de segurança automatizadas para identificar vulnerabilidades em dependências ou no código customizado. Isso ajuda a evitar que falhas de segurança cheguem ao ambiente de produção.

## 10.2 Entrega Contínua (CD)

- **Build Dockerizado e Docker Compose**:

  - A aplicação é containerizada usando Docker e Docker Compose, permitindo que o mesmo ambiente seja replicado em desenvolvimento, homologação e produção.
  - Ao final da integração, se todos os testes forem aprovados, a aplicação é empacotada em imagens Docker, prontas para deploy.

- **Deploy Automatizado para a VM de POC**:
  - No final do processo de CD, a aplicação é automaticamente deployada em uma máquina virtual (VM) configurada para POC (Proof of Concept).
  - Essa VM serve como ambiente de homologação, onde a equipe realiza testes finais e validações antes de mover para produção, se necessário.

# 11. Deploy da Cloud Vituax

## 11.1 Ambiente de Deploy

- **Tipo de Ambiente**: Homologação (VM para POC)
- **Configuração da VM**:
  - CPU: 4 vCPUs
  - Memória: 8GB RAM
  - Sistema Operacional: Ubuntu 20.04 LTS

## 11.2 Pré-requisitos

- **Dependências**: Docker, Docker Compose, GitLab Runner.
- **Variáveis de Ambiente**:
  - `DATABASE_URL`, `JWT_SECRET`, `API_KEY_HUGGING_FACE`, etc.
- **Acesso**: SSH com credenciais para a equipe de TI.

## 11.3 Processo de Deploy

- **Pipeline Automatizado no GitLab**:
  - Build de imagens Docker a partir do branch main.
  - Execução do Docker Compose para iniciar os containers.
  - Verificação dos logs e validação dos endpoints de saúde.

## 11.4 Monitoramento Pós-Deploy

- **Verificação de Saúde**:

  - Acessar `/health` para confirmar se os serviços estão funcionando.

- **Logs**:
  - Usar `docker-compose logs -f` para monitorar os containers em tempo real.

## 11.5 Rollback e Recuperação

- **Rollback**:

  - Reverter para a imagem Docker anterior ou restaurar um snapshot da VM, conforme necessário.

- **Recuperação**:
  - Verificar logs, identificar o erro e realizar o rollback caso o problema persista.

## 11.6 Documentação de Configuração

- **Arquivo `docker-compose.yaml`**: Define os containers do front-end, back-end, banco de dados, etc.
- **Scripts de Deploy**: Scripts adicionais podem ser executados para configurar variáveis ou ajustar permissões.

# 12. Boas Práticas de Desenvolvimento

Esta seção descreve algumas boas práticas para manter a qualidade do código, organização do projeto e garantir uma entrega consistente e escalável.

## 12.1 Estrutura de Branches

Para uma organização clara e eficiente no controle de versão, recomenda-se utilizar a seguinte estrutura de branches:

- **main**: A branch principal que representa a versão estável do código em produção. Nenhuma mudança deve ser feita diretamente na `main`; todas as alterações devem ser integradas a partir de branches de `release` ou `hotfix`.

- **release**: Essa branch é criada a partir da `main` para preparar uma nova versão de produção. Inclui novas features e correções de bugs que foram testadas e estão prontas para o lançamento. Após a revisão, a `release` é mesclada na `main` e na `develop` (caso exista uma).

- **feature**: Branches de feature são criadas a partir da `main` ou de uma branch de `release` para desenvolvimento de novas funcionalidades. Cada nova funcionalidade ou mudança significativa deve ter sua própria branch de feature, o que facilita a revisão e a organização do código.

  - **Nomenclatura Sugerida**: `feature/nome-da-funcionalidade` ou `feat/nome-da-feature`.

- **hotfix**: Branch criada a partir da `main` para corrigir problemas críticos em produção. Após a conclusão, a `hotfix` é mesclada na `main` e também na `release` e `develop` (se existir), para que o problema não se repita em futuras versões.

  - **Nomenclatura Sugerida**: `hotfix/nome-do-problema` ou `bugfix/nome-do-bug`.

## 12.2 Boas Práticas de Commits

- **Commits Frequentes e Pequenos**: Faça commits pequenos e frequentes ao invés de grandes e esporádicos. Isso ajuda a rastrear mudanças específicas e torna o processo de revisão mais simples e eficiente.

- **Mensagens de Commit Descritivas**:

  - Escreva mensagens claras e descritivas para cada commit, com o seguinte formato: `Tipo: Descrição da Mudança`.
  - Exemplos de tipos de commit:

    - `feat`: Adição de nova funcionalidade.
    - `fix`: Correção de bug.
    - `docs`: Mudanças na documentação.
    - `style`: Mudanças de formatação (espaços, ponto e vírgula, etc.) que não alteram a lógica do código.
    - `refactor`: Alterações no código que não adicionam funcionalidades nem corrigem bugs (ex. melhoria de performance).
    - `test`: Adição ou modificação de testes.
    - `chore`: Outras mudanças que não se encaixam nas categorias acima (ex. atualização de dependências).

  - **Exemplo**: `feat: adiciona funcionalidade de autenticação com JWT`

- **Um Commit por Funcionalidade**: Tente encapsular cada funcionalidade ou correção em um commit separado. Isso facilita a reversão de mudanças específicas, caso necessário.

- **Commits Relacionados a Bugs**: Ao corrigir um bug, prefira descrever o problema e a solução na mensagem do commit, incluindo o número do ticket, se houver.

## 12.3 Outras Boas Práticas

- **Revisão de Código (Code Review)**:

  - Encoraje revisões de código para manter a qualidade e consistência do projeto. As revisões podem detectar problemas de arquitetura, otimização e lógica antes que cheguem ao ambiente de produção.

- **Documentação de Código**:

  - Adicione comentários explicativos onde necessário, especialmente em trechos de lógica complexa.
  - Para funções e métodos, utilize uma descrição breve da funcionalidade e detalhes sobre parâmetros e retornos.

- **Padronização de Código**:

  - Mantenha o código formatado conforme os padrões da equipe. Utilize ferramentas como ESLint e Prettier para garantir consistência.
  - Utilize padrões de nomenclatura consistentes para variáveis, funções e classes.

- **Testes Automatizados**:

  - Adicione testes para cada nova funcionalidade. Mantenha uma cobertura de testes mínima (ex: 70%) para garantir a integridade do sistema.
  - Use `snapshot` para interfaces e `jest` para lógica de negócio e manipulação de dados.

- **Refatoração Contínua**:

  - Refatore partes do código para melhorar a legibilidade e a eficiência, mas sem alterar a lógica. Isso ajuda a manter o código mais limpo e fácil de manter.

- **Separação de Preocupações**:
  - Evite que uma única função ou módulo tenha múltiplas responsabilidades. Divida o código em funções e classes que tenham uma única responsabilidade, seguindo o princípio SRP (Single Responsibility Principle).

## 12.4 Fluxo de Integração e Deploy

- **Feature Branches**: Quando a implementação de uma feature estiver completa, faça um pull request (PR) para revisão antes de mesclar na branch de `release`.
- **Testes em Todas as Etapas**: Configure o pipeline de CI para rodar testes automatizados em cada PR para detectar problemas antes de integração.
- **Documentação e Notas de Release**: Documente as alterações em um arquivo de `CHANGELOG.md` e adicione notas de release para cada nova versão.

Seguir essas boas práticas ajudará a garantir que o desenvolvimento do projeto se mantenha organizado, escalável e seguro, facilitando a manutenção e a colaboração entre os desenvolvedores.
