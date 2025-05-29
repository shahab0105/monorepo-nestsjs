import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from './../../apps/api/src/app/posts/post.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'theysaid',
  entities: [Post],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  const postRepo = dataSource.getRepository(Post);

  const posts = [
    { title: 'How to Build a Blog API with NestJS and GraphQL', content: 'This guide walks through building a blog backend using NestJS, TypeORM, and GraphQL.' },
    { title: 'Getting Started with PostgreSQL in Node.js Projects', content: 'Learn how to integrate PostgreSQL with your Node.js apps using TypeORM for ORM functionality.' },
    { title: 'Top 10 NestJS Best Practices for Scalable Backends', content: 'Explore patterns and techniques to write clean, maintainable, and scalable NestJS applications.' },
    { title: 'GraphQL vs REST: Which API Style Should You Choose?', content: 'A deep dive comparing GraphQL and REST in modern web development.' },
    { title: 'Understanding Dependency Injection in NestJS', content: 'NestJS uses a powerful dependency injection system — here’s how it works and why it matters.' },
    { title: 'Setting Up Subscriptions in Apollo Server with NestJS', content: 'Enable real-time updates in your GraphQL API using Apollo subscriptions and NestJS.' },
    { title: 'How to Use DTOs and Validation in NestJS', content: 'Learn how to structure data and enforce input rules using Data Transfer Objects and class-validator.' },
    { title: 'Creating Reusable GraphQL Modules in a Monorepo', content: 'Tips for organizing GraphQL resolvers, schemas, and services in an Nx-powered workspace.' },
    { title: 'Seed Your Database with TypeORM for Dev and Testing', content: 'Generate dummy data for your database using TypeORM’s connection and entity features.' },
    { title: 'Debugging NestJS Projects with VS Code', content: 'Step-by-step guide to attach a debugger and inspect NestJS server code efficiently.' },
    { title: 'Deploying NestJS Apps to Heroku with PostgreSQL', content: 'Deploy your NestJS app with a PostgreSQL addon and setup config variables on Heroku.' },
    { title: 'A Beginner’s Guide to GraphQL Schemas and Types', content: 'Understand how to design a schema-first or code-first GraphQL API with NestJS.' },
    { title: 'How to Write Unit Tests for NestJS Services', content: 'Learn to write isolated tests for NestJS services using Jest and mock dependencies.' },
    { title: 'Performance Tips for GraphQL APIs on Node.js', content: 'Improve the responsiveness of your GraphQL API by batching, caching, and efficient queries.' },
    { title: 'Using Environment Variables in NestJS the Right Way', content: 'Protect secrets and support multiple environments with ConfigModule and .env files.' },
    { title: 'Build a Real-Time Comment System with GraphQL Subscriptions', content: 'Use Apollo PubSub to build a basic but functional real-time commenting feature.' },
    { title: 'Handling Errors in GraphQL: A Practical Approach', content: 'Return meaningful errors to clients and log issues effectively in your NestJS GraphQL server.' },
    { title: 'Generate a GraphQL Schema Automatically in NestJS', content: 'Use the code-first approach to generate your schema.gql file automatically from decorators.' },
    { title: 'Working with UUIDs Instead of Incremental IDs in TypeORM', content: 'Store and retrieve entities with UUIDs and learn how to configure your database accordingly.' },
    { title: 'Understanding GraphQL Resolvers, Queries, and Mutations', content: 'Master the core concepts of resolvers to build feature-rich APIs with NestJS and Apollo.' },
  ];
  

  await postRepo.save(posts);
  console.log(' Seed complete');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error(' Error during seeding:', err);
});
