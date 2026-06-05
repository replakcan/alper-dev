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

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID for CI/CD usage."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_distribution_arn" {
  description = "ARN of the CloudFront distribution."
  value       = aws_cloudfront_distribution.site.arn
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name that serves the static website."
  value       = aws_cloudfront_distribution.site.domain_name
}

output "cloudfront_url" {
  description = "CloudFront URL for the static website."
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}
