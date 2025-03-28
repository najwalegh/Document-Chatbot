# NestJs Project Starter for Document Chatbot

## Overview
This repository is developed with NestJs, MongoDB/Mongoose, and GraphQL Apollo.

## Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB instance accessible either locally or remotely

### Installation

Clone/Fork the repository and install dependencies:
```bash
npm install
```

### Configuration

Set up your environment variables:
```bash
cp .env.example .env
# Edit .env to include your MongoDB URI, PINECONE_ENVIRONMENT, PINECONE_API_KEY, OPENAI_API_KEY, PINECONE_INDEX_NAME
```

### Running the Project

Start the application with the following command:
```bash
npm start
```

The application should now be running and connected to your MongoDB instance.

### GraphQL Playground

Access the GraphQL Playground by navigating to `http://localhost:3000/graphql` in your web browser (assuming the default port is used). You can interact with the GraphQL API and execute queries and mutations from here.

### Project Structure

- `app.resolver.ts` contains a sample `getHello` query for initial testing. You can remove or replace this with your own queries and mutations as you develop your project.
- The `shared` module includes shared configurations and services that are commonly used across the application. This helps maintain a clean and modular codebase.

### Using BaseModel and BaseRepository

The backend project includes a `BaseModel` and `BaseRepository` which are designed to provide a consistent structure and common functionality for our models and repositories.

#### BaseModel

The `BaseModel` class is an abstract class that defines standard fields and methods that should be present in our your models.

#### BaseRepository

The `BaseRepository` class provides a generic repository with common CRUD operations.