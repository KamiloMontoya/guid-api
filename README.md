# Development Test API

Rest API for a development test, implementing CRUD operations for GUIDs with expiration dates and metadata, using:
- NestJS
- PostgreSQL
- Mikro ORM
- Docker and docker compose

## Features
- **Create, update, delete, and list GUIDs**, with automatic expiration handling.
- **Automatic GUID generation** if not provided.
- **Expiration management**, defaulting to 30 days if no expiration date is set.
- **Swagger documentation** for easy API exploration.
- **Testing with Jest**, including unit tests.

## Prerequisites

Make sure you have the following installed:
- Node.js >= 20.2.0
- yarn >= 1.22.22
- Docker

## Installation

Install the dependencies using Yarn:

```bash
$ yarn install
```

## Setting up the Development Environment

1. **Start the PostgreSQL database** using Docker Compose:
    ```bash
    $ docker compose up
    ```
   Verify that the database is running in Docker Desktop.

2. **Configure environment variables**:
   Duplicate `.env.example` and rename the copy to `.env`. Make sure to set the correct database username and password in the `.env` file.

3. **Start the development server**:
   ```bash
   $ yarn run start:dev
   ```

   The server should now be running on `http://localhost:3000`.
   The documentation should now be running on `http://localhost:3000/docs`.

## API Documentation

The API is documented using Swagger, making it easy to explore and test the endpoints. The Swagger documentation is available at:

```
http://localhost:3800/docs
```

![image](https://github.com/user-attachments/assets/3b195ee2-7915-43f1-8b52-99682ea7247b)


## Running the Application

```bash
# Development mode
$ yarn start

# Production mode
$ yarn start:prod
```

## Running Tests

Run the tests to ensure the application works as expected:

```bash
# Unit tests
$ yarn test

# Test coverage
$ yarn test:cov
```

## Database Seeding

The application runs the seeders automatically on startup, ensuring the database is always populated with initial data. It is not necessary to run the seeders manually.

To create a new seed, use:

```bash
# Create a new seed
$ npx mikro-orm seeder:create SeedName
```

The new seed file will be placed in the `./seeders` folder. Make sure to register the new seed in `./seeders/DatabaseSeeder.ts` to include it in the seed run.

If you need to run the seeders manually use:

```bash
# Run all seeds
$ npx mikro-orm seeder:run
```

## Code Quality and Linting

To check code quality and enforce consistent coding style, run the linter:

```bash
$ yarn lint
```

## Contribution Guidelines

1. **Fork the repository** and create your feature branch.
2. **Commit your changes** and push to the branch.
3. **Create a pull request** and describe your changes.

## License

This project is licensed under the MIT License.
