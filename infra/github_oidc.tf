data "aws_iam_policy_document" "github_actions_assume_role" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repository}:ref:refs/heads/main"]
    }
  }
}

data "aws_iam_policy_document" "github_actions_deploy" {
  statement {
    sid = "ListStaticSiteBucket"

    actions = ["s3:ListBucket"]

    resources = [
      aws_s3_bucket.site.arn,
    ]
  }

  statement {
    sid = "SyncStaticSiteObjects"

    actions = [
      "s3:DeleteObject",
      "s3:GetObject",
      "s3:PutObject",
    ]

    resources = [
      "${aws_s3_bucket.site.arn}/*",
    ]
  }

  statement {
    sid = "InvalidateCloudFrontDistribution"

    actions = ["cloudfront:CreateInvalidation"]

    resources = [
      aws_cloudfront_distribution.site.arn,
    ]
  }
}

resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com",
  ]
}

resource "aws_iam_role" "github_actions_deploy" {
  name               = "${var.project_name}-${var.environment}-github-actions-deploy"
  assume_role_policy = data.aws_iam_policy_document.github_actions_assume_role.json

  tags = {
    Name        = "${var.project_name}-${var.environment}-github-actions-deploy"
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}

resource "aws_iam_role_policy" "github_actions_deploy" {
  name   = "${var.project_name}-${var.environment}-s3-deploy"
  role   = aws_iam_role.github_actions_deploy.id
  policy = data.aws_iam_policy_document.github_actions_deploy.json
}
