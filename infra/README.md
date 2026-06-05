# Infrastructure

Terraform configuration for the static website infrastructure.

## Scope

This folder creates the S3 bucket that will store the exported Next.js files from `out/` and the CloudFront distribution that serves the static site publicly.

## Bucket Configuration

- Region: `eu-central-1`
- Bucket name: generated from `var.bucket_name_prefix` plus a Terraform-managed random suffix
- Current bucket name: `alper-dev-cc4edc59`
- Access strategy: private S3 bucket with all public access blocked
- CloudFront strategy: use the bucket regional domain name as the CloudFront origin and grant access later with CloudFront Origin Access Control (OAC)

The bucket is not configured as a public S3 website endpoint. Static files should be served through CloudFront.

## CloudFront Configuration

- Public entry point: CloudFront distribution
- Distribution ID: `E2M2CTUFRRX4GS`
- Distribution domain: `d1fmmfkzwx4n74.cloudfront.net`
- Distribution URL: `https://d1fmmfkzwx4n74.cloudfront.net`
- Origin: private S3 bucket regional domain name
- S3 access: CloudFront Origin Access Control (OAC)
- Default root object: `index.html`
- Basic error behavior: S3 `403` and `404` responses map to `/404.html`
- Custom domain, Route 53, ACM certificate, advanced cache policies, and deployment automation are out of scope.

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
