variable "aws_region" {
  description = "AWS region where the S3 bucket will be created."
  type        = string
  default     = "eu-central-1"
}

variable "bucket_name_prefix" {
  description = "Prefix used to generate the globally unique S3 bucket name."
  type        = string
  default     = "alper-dev"

  validation {
    condition     = length(var.bucket_name_prefix) >= 3 && length(var.bucket_name_prefix) <= 54 && can(regex("^[a-z0-9][a-z0-9-]*[a-z0-9]$", var.bucket_name_prefix))
    error_message = "bucket_name_prefix must be 3-54 characters, lowercase, and contain only letters, numbers, or hyphens."
  }
}

variable "environment" {
  description = "Deployment environment name used for tagging."
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Project name used for tagging."
  type        = string
  default     = "alper-dev"
}
