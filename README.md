# DevOps Platform

A microservices-based backend platform built to practice real-world DevOps and backend engineering patterns.

## Current Architecture

* Auth Service (FastAPI)
* Product Service (FastAPI)
* PostgreSQL
* Docker Compose

## Features Implemented

### Auth Service

* User registration
* Password hashing with bcrypt
* Login verification
* JWT token issuance
* Health endpoint
* Metrics endpoint

### Product Service

* Product creation
* Product listing
* JWT-protected product creation
* Health endpoint
* Metrics endpoint

## Infrastructure

* Dockerized services
* Shared PostgreSQL database
* Docker Compose orchestration
* Internal container networking

## Security

* JWT authentication
* Password hashing
* Authorization header validation

## Run Locally

```bash
docker compose up --build -d
```

## Available Services

### Auth Service

http://localhost:8000/docs

### Product Service

http://localhost:8001/docs

## Example Flow

1. Register user in Auth Service
2. Login to obtain JWT token
3. Use JWT token to create products in Product Service

## Project Structure

```text
devops-platform/
├── docker-compose.yml
├── README.md
├── .gitignore
├── services/
│   ├── auth-service/
│   └── product-service/
```

## Next Planned Improvements

* Prometheus monitoring - added
* Grafana dashboards - added
* Kubernetes deployment
* CI/CD pipeline
