# Infrastructure

Terraform configuration for the static website infrastructure.

## Scope

This folder creates the S3 bucket that will store the exported Next.js files from `out/`. CloudFront distribution creation and deployment automation are intentionally out of scope for this task.

## Bucket Configuration

- Region: `eu-central-1`
- Bucket name: generated from `var.bucket_name_prefix` plus a Terraform-managed random suffix
- Current bucket name: `alper-dev-cc4edc59`
- Access strategy: private S3 bucket with all public access blocked
- CloudFront strategy: use the bucket regional domain name as the CloudFront origin and grant access later with CloudFront Origin Access Control (OAC)

The bucket is not configured as a public S3 website endpoint. Static files should be served through CloudFront.

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

## Static Hosting Notes

Upload the contents of the Next.js `out/` directory to the bucket after running `npm run build`. The bucket should remain private; public traffic should go through CloudFront.
