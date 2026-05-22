# Snyk PR Scanning Integration — Runbook
## Architecture
- **SCM:** GitHub (Tijani891/snyk-demo-app)
- **Snyk Org:** ahmedtijani1792
- **Target Runtime:** Kubernetes
- **Scan Types:** Snyk Open Source (SCA), Snyk Code (SAST), Snyk Container, Snyk IaC
## Snyk Org & Project Structure
| Project | Type | Manifest |
|---|---|---|
| snyk-demo-app | Open Source | package.json + package-lock.json |
| snyk-demo-app | Code (SAST) | app.js, db.js |
| snyk-demo-app | Container | Dockerfile |
| snyk-demo-app | IaC | deployment.yaml |
## Threshold Configuration
| Scan Type | Block on Severity | Notes |
|---|---|---|
| Open Source | High / Critical | Fails only if PR introduces new issues |
| Code (SAST) | High | Flags new insecure code patterns |
| Container | High / Critical | Flags vulnerable base images |
| IaC | Medium+ | Flags K8s misconfigurations |
## Branch Protection (GitHub Ruleset)
- **Target branch:** `main`
- **Restrictions:** Restrict updates + deletions
- **Require PR:** Yes (0 required approvals — Snyk is the gate)
- **Required status checks:** Require branches up to date before merging
- **Status checks enforced:** Snyk Open Source, Snyk Code, Snyk Container, Snyk IaC
## Onboarding a New Repo
1. In Snyk → Projects → Add Project → select GitHub → pick repo
2. Enable PR Checks per product in Project Settings
3. Add status checks to GitHub branch protection ruleset
4. Push a test PR to validate checks appear
## Triage Workflow
1. Developer opens PR → Snyk runs all 4 scans automatically
2. If thresholds are exceeded → check is marked **failing** → merge blocked
3. Developer reviews inline comments on the PR diff
4. Developer fixes issues → pushes new commits → Snyk re-scans
5. All checks pass → PR is unblocked and mergeable
## Ignore / Exception Process
- In Snyk UI → Project → Issue → **Ignore** button
- Required fields: reason / justification, ignore duration
- Auditable — all ignores are logged with timestamp and user
- Alternative: add a `.snyk` policy file in the repo root for patch/ignore rules