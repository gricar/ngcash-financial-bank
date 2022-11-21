# Bem-vindo a API de contratos de serviços financeiros da NG.CASH !

### Descrição
> É uma aplicação que possibilita que usuários da NG consigam realizar transferências bancárias internas entre si.


<details>
  <summary><strong>Principais funcionalidades ✨</strong></summary>

  > As principais responsabilidade desta API estão relacionadas a integração com o banco de dados, seguindo os princípios do REST, com as requisições feitas baseados nos *endpoints*:
  
  | Caminho | Responsabilidade |
  |---|---|
  | `/login` | Realizar *login* na aplicação para gerar o token de autenticação |
  | `/users` | Listar todos clientes cadastrados na aplicação |
  | `/users/:id` | Listar o cliente e seu saldo disponível na conta |
  | `/users/register` | Cadastrar novo cliente |
  | `/profile` | Listar o cliente e seu saldo disponível na conta baseado no `id` do token JWT |
  | `/profile/money-transfer` | Efetuar a transferência de dinheiro (`cash-out`) para outro cliente NG |
  | `/profile/transactions` | Listar todas transferências de dinheiro do cliente logado (`cash-out` e `cash-in`) |

  
</details>

<details>
  <summary><strong>Tecnologias utilizadas 👨‍💻</strong></summary>

  - [`TypeScript`](https://www.typescriptlang.org)
  - [`Node.js`](https://nodejs.org/)
  - [`Express`](https://expressjs.com/)
  - [`Docker`](https://www.docker.com/)
  - [`Typeorm`](https://typeorm.io/)
  - [`PostgreSQL`](https://www.postgresql.org/)
  - [`ESLint`](https://eslint.org/)
</details>

<details>
  <summary><strong>Executando o projeto 🌐</strong></summary>

  - É necessário ter o `Docker` e o [`Docker Compose`](https://docs.docker.com/compose) instalado em sua máquina.

  - Clone o projeto: `git clone git@github.com:gricar/ngcash-financial-bank.git`.

  - Entre na pasta do projeto: `cd ngcash-financial-bank/app`.
  
  - Execute o **script** no terminal para iniciar o Docker Compose: `docker-compose up -d --build`.
  
  - Entre na pasta do projeto: `cd backend`.

  - Instale as dependências: `npm install`.

  - Os contêineres estarão prontos e você poderá acessar o projeto em: http://localhost:3999

  - Para desligar os containers, utilize o script: `docker-compose down`
</details>
