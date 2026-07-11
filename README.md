# SwiftList API – Vanilla Node.js REST Backend

A REST API for a todo-list management application built entirely with Node.js core modules. 

The goal of this project is to understand how common backend features work under the hood by avoiding frameworks such as Express.js. Request handling, routing, session management, and database communication were implemented manually using Node.js core functionality.

## Tech Stack

* **Runtime:** Node.js Core HTTP Module
* **Database:** MariaDB / MySQL
* **Session Store:** Redis
* **Authentification:** bcrypt
* **Security Utilities:** crypto

## Features

* **User registration and login**
* **Session-based authentication using Redis**
* **Session Store:** Redis
* **CRUD operations for task management**,
* **Role-based authorization**
* **Secure cookie handling (HttpOnly, SameSite=Lax)**
* **Automatic session expiration through Redis TTL**
* **Strict resource ownership validation**


## Implementation Details

### Custom HTTP Server

Instead of using Express.js or another web framework, the API uses Node.js core modules for: 

* **Request handling**
* **URL routing**
* **Request body parsing**
* **Stream processing**
* **Response generation**


### Session Management

* **Redis Storage:** Sessions are stored in Redis.
* **Session Expiration:** Each session has a configurable Time-To-Live (TTL).
* **Role Caching:** User roles are saved directly in the session to reduce MySQL queries.
* **User-Agent Validation**

### Security

* **Password Hashing:** Passwords are hashed using bcrypt.
* **Session IDs:** Generated using the native Node.js crypto module.
* **Payload Limits:** Incoming request payloads are limited to 16 KB.
* **Secure Cookies:** Attributes like HttpOnly and SameSite are enabled.

### Database & Data Modeling

* **Optimized Database IDs:**  UUID v7 stored as BINARY(16) for performant, time-sortable primary keys.
* **Binary Storage:** UUIDs are stored as BINARY(16) in the database for maximum query performance and minimal storage footprint, and are parsed back to strings for API responses.

## Upcoming Features

* **Improved Error Handling:** Ensuring that all exceptions are caught properly so users only see friendly error messages instead of raw database errors or stack traces.
* **Application Logging:** Setting up a logging mechanism for better debugging and server monitoring.
* **Role-based authorization**
* **Login Security:** Mitigation of timing-based information leaks during authentication.

## Running Locally

### Prerequisites

* **Node.js 20+**
* **MariaDB 10.4+ (or MySQL 8.0+)**
* **Redis**

## Current Learning Goals

This project is currently being used to deepen my understanding of:

* **HTTP request/response handling**
* **Custom routing**
* **Session-based authentication**
* **Redis integration**
* **Backend security fundamentals**

