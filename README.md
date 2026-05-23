# Snyk Demo App — Security Runbook

## Overview
This repo demonstrates end-to-end Snyk PR scanning integration 
with GitHub. Every pull request is automatically scanned for 
security vulnerabilities and blocked from merging if issues 
are found.

## Snyk Org/Project Structure
- **Org:** ahmedtijani1792
- **Projects:**
  - `package.json` — Open Source (SCA) scan
  - `app.js` — Code (SAST) scan
  - `Dockerfile` — Container scan
  - `.k8s/deployment.yaml` — IaC scan

## Threshold Configuration
| Severity | Action |
|----------|--------|
| Critical | Block merge |
| High | Block merge |
| Medium | Warning only |
| Low | Warning only |

## How to Onboard a New Repo
1. Go to app.snyk.io → Projects → Add project
2. Select GitHub and choose the repo
3. Snyk will automatically create projects for each scan type
4. Go to GitHub repo → Settings → Branches
5. Add branch protection rule on main
6. Add Snyk checks as required status checks
7. Add `.github/workflows/snyk.yml` pipeline file

## PR Scanning — How It Works
- Developer opens a PR into main
- Snyk automatically scans for:
  - Vulnerable dependencies (SCA)
  - Insecure code patterns (SAST)
  - Vulnerable container base images
  - Kubernetes misconfigurations (IaC)
- Results are posted as PR comments and status checks
- PRs with High/Critical issues are blocked from merging

## Triage Workflow
1. Developer opens PR
2. Snyk scans automatically
3. If checks fail:
   - Review the Snyk comment on the PR
   - Check the CVE severity and exploitability
   - Either fix the issue or justify ignoring it
4. If checks pass:
   - PR is approved and merged normally

## Ignore/Exception Process
To ignore a vulnerability with justification:
1. Go to app.snyk.io → Projects
2. Click on the affected project
3. Find the vulnerability
4. Click **Ignore**
5. Select reason and expiry date
6. Snyk will no longer block the PR for that issue

Or add to `.snyk` file:
```yaml
version: v1.25.0
ignore:
  VULNERABILITY-ID:
    - '*':
        reason: Reason for ignoring
        expires: '2026-12-31T00:00:00.000Z'
```

## Demo PRs
| PR | Branch | Result |
|----|--------|--------|
| Buggy PR | feature/buggy-pr | ❌ Blocked by Snyk |
| Clean PR | feature/clean-pr | ✅ Passed all checks |

## Tech Stack
- **Snyk** — Open Source, Code, Container, IaC
- **GitHub** — Source control and PR management
- **GitHub Actions** — Pipeline for Container and IaC scans
- **Node.js** — Application runtime
- **Kubernetes** — Target deployment environment