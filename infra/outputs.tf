output "bucket_name" {
  description = "Name of the S3 bucket."
  value       = aws_s3_bucket.site.bucket
}

output "bucket_arn" {
  description = "ARN of the S3 bucket."
  value       = aws_s3_bucket.site.arn
}

output "bucket_region" {
  description = "AWS region selected for the S3 bucket."
  value       = var.aws_region
}

output "bucket_regional_domain_name" {
  description = "S3 regional domain name to use as a CloudFront origin."
  value       = aws_s3_bucket.site.bucket_regional_domain_name
}

output "public_access_strategy" {
  description = "Public access strategy for the bucket."
  value       = "private bucket; public access blocked; intended access through CloudFront OAC"
}
