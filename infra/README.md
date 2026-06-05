# Infrastructure

Terraform configuration for the static website infrastructure.

## Scope

This folder creates the S3 bucket that will store the exported Next.js files from `out/` and the CloudFront distribution that serves the static site publicly.

## Bucket Configuration

- Region: `eu-central-1`
- Bucket name: generated from `var.bucket_name_prefix` plus a Terraform-managed random suffix
- Access strategy: private S3 bucket with all public access blocked
- CloudFront strategy: use the bucket regional domain name as the CloudFront origin and grant access later with CloudFront Origin Access Control (OAC)

The bucket is not configured as a public S3 website endpoint. Static files should be served through CloudFront.

## CloudFront Configuration

- Public entry point: CloudFront distribution
- Distribution ID: available from `terraform output cloudfront_distribution_id`
- Distribution domain: available from `terraform output cloudfront_domain_name`
- Distribution URL: available from `terraform output cloudfront_url`
- Origin: private S3 bucket regional domain name
- S3 access: CloudFront Origin Access Control (OAC)
- Default root object: `index.html`
- Basic error behavior: S3 `403` and `404` responses map to `/404.html`
- Custom domain, Route 53, ACM certificate, advanced cache policies, and deployment automation are out of scope.

## Bucket Policy

The S3 bucket policy grants read access only to the CloudFront service principal for this distribution. The policy allows `s3:GetObject` on objects in the static site bucket and restricts access with an `AWS:SourceArn` condition that matches the CloudFront distribution ARN.

Direct public S3 access should remain blocked. Website traffic should go through CloudFront.

## Usage

Create a local variables file:

```bash
cp terraform.tfvars.example terraform.tfvars
```

Update `terraform.tfvars` with the desired bucket name prefix, then run:

```bash
terraform init
terraform plan
terraform apply
```

Useful output for the future CloudFront task:

- `bucket_name`
- `bucket_arn`
- `bucket_regional_domain_name`
- `cloudfront_distribution_id`
- `cloudfront_domain_name`
- `cloudfront_url`

## Static Hosting Notes

Upload the contents of the Next.js `out/` directory to the bucket after running `npm run build`. The bucket should remain private; public traffic should go through CloudFront.

## Deployment Workflow

The GitHub Actions deployment workflow builds the static site and syncs `out/` to S3 on pushes to `main`.

Required GitHub secrets:

- `AWS_ROLE_TO_ASSUME`: IAM role ARN from `terraform output github_actions_deploy_role_arn`.
- `AWS_REGION`: AWS region for deployment.
- `S3_BUCKET_NAME`: target bucket name from `terraform output bucket_name`.
- `CLOUDFRONT_DISTRIBUTION_ID`: distribution ID from `terraform output cloudfront_distribution_id`.

The workflow uses `aws s3 sync out s3://$S3_BUCKET_NAME --delete` so removed files are deleted from S3 during deployment. After a successful sync, it runs `aws cloudfront create-invalidation --paths "/*"` so visitors receive the latest static files.

## GitHub OIDC

Terraform creates an IAM OIDC provider for `token.actions.githubusercontent.com` and a deployment role that can only be assumed by this repository's `main` branch:

- Repository: `replakcan/alper-dev`
- Branch: `main`
- Role output: `github_actions_deploy_role_arn`

The role allows only the permissions needed by the deployment workflow: list the static site bucket, get, put, or delete objects in it, and create invalidations for the configured CloudFront distribution.
