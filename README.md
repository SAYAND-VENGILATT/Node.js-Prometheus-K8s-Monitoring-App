# Node.js Prometheus-K8s Monitoring App
This project is a simple Node.js microservice instrumented with Prometheus for monitoring, containerized using Docker, and deployed on a Kubernetes cluster. It exposes application metrics on a `/metrics` endpoint which are scraped by Prometheus for observability.

## 🚀 Architecture Overview

---
## 🚀 Features
- Express-based Node.js web server
- Exposes `/` route and `/metrics` endpoint for Prometheus
- Custom and default Prometheus metrics using `prom-client`
- Dockerized for easy container deployment
- Kubernetes manifests for:
  - App deployment & service
  - Prometheus deployment & configuration
- Metrics visualization ready (Grafana integration possible)

---
## 🛠️ Prerequisites
- Docker installed
- Kubernetes cluster (e.g., Minikube or EKS)
- `kubectl` configured

## 🔨 Build & Push Docker Image
```bash
docker build -t your-dockerhub-username/node-prometheus-app .
docker push your-dockerhub-username/node-prometheus-app
```
---
## ☸️ Deploy to Kubernetes
```bash
kubectl apply -f k8s/
```

## 📈 Access Prometheus Dashboard
```bash
kubectl port-forward deployment/prometheus-deployment 9090:9090
```
Open in browser: [http://localhost:9090](http://localhost:9090)

## 🔍 Test the App
```bash
kubectl port-forward service/node-service 8080:80
```
Open in browser: [http://localhost:8080](http://localhost:8080) — Home route
Open in browser: [http://localhost:8080/metrics](http://localhost:8080/metrics) — Metrics endpoint

---
## 📄 License
MIT

---
## ✍️ Author
SAYAND VENGILATT

LinkedIn-  www.linkedin.com/in/sayand-vengilatt-7a4b5a30a 
