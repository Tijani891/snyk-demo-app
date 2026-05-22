# snyk-demo-app
Demo application for Snyk PR Scanning integration.
Contains intentional vulnerabilities for testing:
- Outdated npm dependencies (lodash, axios, express)
- Insecure code patterns (eval, command injection)
- Vulnerable base Docker image (node:14-alpine)
- Misconfigured Kubernetes manifest (privileged container, root user)