# Frontend - GitHub Actions Workflow

This workflow automatically builds and pushes the frontend Docker image to Docker Hub.

## 🎯 What It Does

- ✅ Builds Docker image for `genai-user-mgmt-frontend`
- ✅ Builds production Vite bundle
- ✅ Creates optimized Nginx container
- ✅ Pushes to Docker Hub
- ✅ Multi-platform support (amd64, arm64)
- ✅ Security scanning with Trivy
- ✅ Smart tagging strategy

## 🚀 Triggers

- Push to `main` or `develop` branches (when frontend files change)
- Pull requests to `main` or `develop`
- Manual trigger via GitHub Actions UI

## 🔐 Required Secrets

Set these in GitHub repository settings:

- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Your Docker Hub access token
- `VITE_API_URL` - Backend API URL (optional, for build-time injection)

## 📦 Docker Image

After workflow runs, image will be available at:

```
docker pull <your-username>/genai-user-mgmt-frontend:latest
```

## 📖 Full Documentation

See [GITHUB_ACTIONS_GUIDE.md](../../GITHUB_ACTIONS_GUIDE.md) for complete setup instructions.
