# TheySaid Backend (GraphQL + NestJS + Nx)

This project is a simple blog backend built with NestJS using GraphQL and TypeORM, managed in an Nx monorepo. It supports full CRUD operations and real-time subscriptions for blog posts.

---

## 🚀 Features

- ✅ CRUD operations for blog posts
- ✅ GraphQL API using `@nestjs/graphql` (code-first)
- ✅ Real-time subscriptions via `graphql-subscriptions`
- ✅ PostgreSQL integration via TypeORM
- ✅ Nx monorepo structure
- ✅ Centralized logging and error handling
- ✅ Docker support for containerized development
- ✅ Sample queries and mutations

---

## 📁 Folder Structure

- `apps/api`: The main NestJS application
- `libs/`: Reserved for shared code if needed later

---

## 🛠️ Setup Instructions

### ✅ Without Docker

1. Install dependencies:

```bash
npm install
```

2. Set up a PostgreSQL database and update `.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=theysaid
```

3. Run the app:

```bash
npx nx serve api
```

4. Access GraphQL playground at:

```
http://localhost:3000/graphql
```

---

### ✅ With Docker

1. Make sure Docker is installed and running.
2. Run the stack:

```bash
docker-compose up --build
```

This starts both the NestJS API and a PostgreSQL container.

---

## 🧪 Sample GraphQL Queries

### ✅ Create a Post

```graphql
mutation {
  createPost(title: "Test Post", content: "This is a test.") {
    id
    title
    content
  }
}
```

### ✅ Get All Posts

```graphql
query {
  posts {
    id
    title
    content
  }
}
```

### ✅ Subscription (new post)

```graphql
subscription {
  postCreated {
    id
    title
    content
  }
}
```

### 🧨 Trigger Error

Use this to simulate a GraphQL error for demo purposes:

```graphql
query {
  errorTrigger
}
```

---

## 🧰 Technical Details

### ✅ Logging

Logging is handled using `Logger` from `@nestjs/common` and is applied across the app globally.

### ✅ Error Handling

A global `GraphQLExceptionFilter` ensures consistent GraphQL errors using `ApolloError`, `UserInputError`, and proper exception transformation.

### ✅ Dataloader

Dataloader is not implemented in this version because the app only uses a single entity (`Post`), so there’s no N+1 problem.

---

## 🐳 Docker Notes

- `Dockerfile`: Used to build the app image.
- `docker-compose.yml`: Used to run both the API and the database.

---

## 📌 Known Limitations

- **Nx and NestJS** integration via `@nx/nest` has unresolved issues:
  👉 https://github.com/nrwl/nx/issues/30188

- Also noticed that the `@nx/nest` generator didn't place the app in `/apps/`, which is recommended:
  👉 https://nx.dev/concepts/decisions/folder-structure

---

## 🧪 Testing

Use the included `seed.ts` script to populate sample data:

```bash
npx ts-node apps/api/scripts/seed.ts
```

---



## 🙌 Author github.com/shahab0105

Built with ❤️ using NestJS + Nx.
