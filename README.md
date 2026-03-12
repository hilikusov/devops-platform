# DevOps Platform → Mental Health Journal App

This project started as a hands-on DevOps learning platform and evolved into a real full-stack web application.

It began as a microservices-based backend platform built to practice real-world DevOps and backend engineering patterns:
- FastAPI microservices
- PostgreSQL
- Docker Compose
- Kubernetes
- Prometheus
- Grafana
- GitHub Actions CI

It is now being expanded into a production-minded web application: a **Mental Health Journal App**, where users can:
- register and log in securely
- create private journal entries
- track mood and emotional state
- review personal history over time
- use a modern and minimalistic UI

## Project Evolution

### Phase 1 — DevOps Platform Foundation
Built a platform to practice:
- containerization with Docker
- local orchestration with Docker Compose
- Kubernetes deployments with k3d
- monitoring with Prometheus and Grafana
- CI with GitHub Actions
- service health checks and metrics
- JWT-based authentication
- Kubernetes ConfigMaps, Secrets, namespaces, and ingress

### Phase 2 — Productization into a Real App
The platform is being transformed into a real application:
- `auth-service` for registration and login
- `journal-service` for user-owned journal entries and mood tracking
- `frontend` for a complete user-facing web application
- real hosting on a server
- production-minded architecture and observability

## Current Architecture

### Backend Services
- Auth Service (FastAPI)
- Product Service / transitional service (to be replaced by Journal Service)
- PostgreSQL

### Platform / DevOps
- Docker Compose
- Kubernetes (k3d)
- Prometheus
- Grafana
- GitHub Actions

## Implemented Features So Far

### Auth Service
- User registration
- Password hashing with bcrypt
- Login verification
- JWT token issuance
- Health endpoint
- Metrics endpoint

### Product Service (current transitional service)
- Resource creation and listing
- JWT-protected creation endpoint
- Health endpoint
- Metrics endpoint

### DevOps / Platform
- Dockerized services
- Shared PostgreSQL database
- Docker Compose orchestration
- Kubernetes manifests
- Kubernetes namespace, ConfigMap, and Secret support
- Kubernetes ingress
- Prometheus monitoring
- Grafana dashboards
- GitHub Actions CI pipeline

## Planned Product Features

### Mental Health Journal App
- secure user accounts
- private journal entries
- mood tracking (score + label)
- entry history and filtering
- dashboard with mood trends
- polished frontend experience
- real deployment on a live server

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT authentication

### Frontend
- React
- Vite
- modern UI styling
- charts and animations

### DevOps
- Docker
- Docker Compose
- Kubernetes / k3d
- Prometheus
- Grafana
- GitHub Actions

## Repository Structure

```text
devops-platform/
├── docker-compose.yml
├── README.md
├── .gitignore
├── .github/
├── k8s/
├── monitoring/
└── services/