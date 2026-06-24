# SwiftList API – Vanilla Node.js REST Backend

A REST API for a To-Do management application built entirely with Node.js core modules. 

The goal of this project was to understand how common backend features work under the hood by avoiding frameworks such as Express.js. Request handling, routing, session management, and database communication were implemented manually using Node.js core functionality.

## Tech Stack

* **Runtime:** Node.js (`http` module)
* **Database:** MySQL
* **Session Store:** Redis
* **Authentification:** `bcrypt`
* **Security Utilities:** `crypto`

## Features

* **User registration and login**
* **Session-based authentication using Redis**
* **Session Store:** Redis
* **CRUD operations for task management**,
* **Role-based authorization**
* **Secure cookie handling (HttpOnly, SameSite=Lax)**
* **Automatic session expiration through Redis TTL**

## Implementation Details

### Custom HTTP Server

Instead of using Express.js or another web framework, the API uses Node.js core modules for: 

* **Request handling**
* **URL routing**
* **Request body parsing**
* **Stream processing**
* **Response generation**


### Session Management

* **Sessions are stored in Redis**
* **Each session has a configurable TTL**
* **User roles are cached within the session to reduce database lookups**
* * **User-Agent Validation:** Checks if the current User-Agent matches the login session to protect against session hijacking.

### Security

* **Passwords are hashed with bcrypt**
* **Session identifiers are generated using Node.js crypto utilities**
* **Request payloads are limited to 16 KB**
* **Secure cookie attributes are enabled**
* **Login verification includes measures to reduce timing-based information leaks**

### Database Access

* **MySQL is used for persistent data storage**
* **Queries explicitly select required columns instead of using `SELECT` ***
* **Validation and error handling for malformed JSON requests and database operation failures.**

## Running Locally

### Prerequisites

* **Node.js**
* **MySQL**
* **Redis**

Connection settings currently need to be configured manually before starting the application.

## Current Learning Goals

This project is currently being used to deepen my understanding of:

* **HTTP request/response handling**
* **Custom routing**
* **Session-based authentication**
* **Redis integration**
* **MySQL data access**
* **Backend security fundamentals**

