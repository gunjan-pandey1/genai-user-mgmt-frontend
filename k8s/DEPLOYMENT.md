# GenAI User Mgmt Frontend Kubernetes Deployment

This folder contains Kubernetes manifests for deploying the frontend on a Hostinger VPS Kubernetes cluster.

## Resources

- Namespace: `namespace.yaml`
- ConfigMap: `configmap.yaml`
- Deployment: `deployment.yaml`
- Service: `service.yaml`
- Ingress: `ingress.yaml`

## Prerequisites

- Docker image for the frontend pushed to a registry accessible from the cluster.
- `kubectl` configured to point to the Hostinger cluster.
- An ingress controller installed in the cluster.

## Configure Image And Backend URL

1. Set the image in `deployment.yaml` to the built image name and tag.
2. Update `VITE_API_URL` in `configmap.yaml` to point to the backend service or external backend URL.

Example internal URL:

- `http://genai-backend-service.genai-backend.svc.cluster.local:8000`

## Apply Manifests With Dry Run Validation

From the `k8s` directory:

```bash
kubectl apply -f namespace.yaml --dry-run=client
kubectl apply -f configmap.yaml --dry-run=client
kubectl apply -f deployment.yaml --dry-run=client
kubectl apply -f service.yaml --dry-run=client
kubectl apply -f ingress.yaml --dry-run=client
```

If all validations pass:

```bash
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
```

## CI/CD Integration Points

Typical steps in a pipeline:

1. Build and push image:

```bash
docker build -t your-registry/genai-frontend:${GIT_SHA} .
docker push your-registry/genai-frontend:${GIT_SHA}
```

2. Update the image in `deployment.yaml` or use:

```bash
kubectl set image deployment/genai-frontend-deployment \
  genai-frontend=your-registry/genai-frontend:${GIT_SHA} \
  -n genai-frontend
```

3. Validate and apply manifests as shown above.

## Verification

1. Check pods:

```bash
kubectl get pods -n genai-frontend
```

2. Check service:

```bash
kubectl get svc -n genai-frontend
```

3. Check ingress:

```bash
kubectl get ingress -n genai-frontend
```

4. Test from a client:

```bash
curl https://frontend.example.com/health
```

