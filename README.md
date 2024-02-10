# Northcoders News API


BE-NC-News

Welcome to the BE-NC-News repository! This repository contains the back-end codebase for NC News, a news aggregation and discussion platform. This readme file serves as a guide to help you understand the structure of the project and how to get started.

Getting Started

To get started with this project, follow these instructions:

Prerequisites

    Node.js and npm installed on your machine
    PostgreSQL installed and running locally

Installation

    Clone this repository to your local machine:
    git clone https://github.com/your-username/your-repo.git
    Navigate to the project directory:
    cd your-repo
    Install the dependencies:
    npm install
    Set up your local PostgreSQL database and configure the connection string in the db/connection.js file.
    Seed the database with initial data:
    npm run seed

Usage

    Start the server:
    npm start
    This command will start the server, and it will be accessible at http://localhost:3000.


Access the API endpoints using a REST client or integrate them into your front-end application.
Available Endpoints

    GET /api: Returns information about all available endpoints.
    GET /api/topics: Get all available topics.
    GET /api/articles: Get all articles. Optionally filter by topic.
    GET /api/articles/:article_id: Get an article by its ID.
    PATCH /api/articles/:article_id: Update an article's vote count by ID.
    GET /api/articles/:article_id/comments: Get all comments for a specific article.
    POST /api/articles/:article_id/comments: Add a new comment to an article.
    GET /api/comments: Get all comments.
    PATCH /api/comments/:comment_id: Update a comment's vote count by ID.
    DELETE /api/comments/:comment_id: Delete a comment by ID.
    GET /api/users: Get all users.

Testing
This project uses Jest and Supertest for testing. To run the tests, use the following command:
npm test

Error Handling
The API handles various types of errors:
    PSQL errors.
    Custom errors.
    Bad requests.
    Internal server errors.

Dependencies
The project relies on the following dependencies:

    Express: Web application framework for Node.js.
    Cors: Middleware for enabling Cross-Origin Resource Sharing.
    Dotenv: Loads environment variables from a .env file.
    pg: PostgreSQL client for Node.js.
    Supertest: HTTP assertion library.
    Jest: Testing framework.
    Jest-extended: Additional matchers for Jest.
    Jest-sorted: Sorting matchers for Jest.
    pg-format: PostgreSQL data formatting library.
    Husky: Git hooks manager.

Scripts

    setup-dbs: Sets up the necessary databases by running the setup.sql script.
    seed: Seeds the database with initial data.
    test: Runs the Jest test suite.
    start: Starts the server.
    seed-prod: Seeds the production database environment.

Additional Files

    index.js: Contains functions for handling various types of errors and exporting them for use in the application.
    setup.sql: SQL script for setting up the necessary databases.
    connection.js: Module for establishing a connection to the PostgreSQL database.
    utils.js: Utility functions for converting timestamps, formatting comments, and checking article and topic existence in the database.
    seed.js: Script for seeding the database with initial data.
    run-seed.js: Executes the seed script with development data and ends the database connection afterward.
    model.js: Database queries module containing functions to interact with the database tables and fetch data.

Additional Test Files

utils.test.js: Contains unit tests for utility functions used in the application.


Acknowledgements
Special thanks to Northcoders Team.

