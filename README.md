# Pura-Docker

![Build and Deploy](https://github.com/hoyah0424/purasalsa/actions/workflows/pura-docker-cicd.yml/badge.svg)
![Cleanup Docker Tags](https://github.com/hoyah0424/purasalsa/actions/workflows/cleanup-docker-tags.yml/badge.svg)

## 🚀 Project Overview

**Pura-Docker** is a Dockerized web application designed to streamline deployments and ensure consistent environments across development, staging, and production. Leveraging GitHub Actions for CI/CD, this project automates the build, push, and deployment processes, enhancing productivity and reliability.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
    - [1. Docker Hub Configuration](#1-docker-hub-configuration)
    - [2. EC2 Instance Configuration](#2-ec2-instance-configuration)
    - [3. GitHub Repository Secrets](#3-github-repository-secrets)
3. [CI/CD Pipeline Workflows](#cicd-pipeline-workflows)
    - [1. Build and Deploy Workflow](#1-build-and-deploy-workflow)
    - [2. Cleanup Old Docker Tags Workflow](#2-cleanup-old-docker-tags-workflow)
4. [Deployment Steps](#deployment-steps)
5. [Monitoring and Logging](#monitoring-and-logging)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

---

## Prerequisites

Before proceeding with the deployment, ensure you have the following:

- **Docker Hub Account:** To store and manage your Docker images.
- **AWS EC2 Instance:** Running a compatible operating system (e.g., Amazon Linux 2) with Docker installed.
- **GitHub Repository:** Hosting your project's source code and GitHub Actions workflows.
- **Basic Knowledge of Git and Docker:** Familiarity with version control and containerization concepts.

---

## Setup

### 1. Docker Hub Configuration

1. **Create a Docker Hub Repository:**
   - Log in to [Docker Hub](https://hub.docker.com/) and create a new repository named `myapp`.
   - **Visibility:** Choose between public or private based on your project's requirements.

2. **Generate a Docker Hub Access Token:**
   - Navigate to your Docker Hub account settings.
   - Under **Security**, create a new access token. This token will be used in GitHub Secrets for authentication.

### 2. EC2 Instance Configuration

1. **Launch an EC2 Instance:**
   - Use the AWS Management Console to launch a new EC2 instance.
   - **Recommended AMI:** Amazon Linux 2 or Ubuntu.
   - **Instance Type:** Choose based on your application's resource requirements (e.g., `t2.micro` for testing).

2. **Install Docker on EC2:**
   - **For Amazon Linux 2:**
     ```bash
     sudo yum update -y
     sudo amazon-linux-extras install docker
     sudo service docker start
     sudo usermod -a -G docker ec2-user
     ```
   - **For Ubuntu:**
     ```bash
     sudo apt update
     sudo apt install -y docker.io
     sudo systemctl start docker
     sudo usermod -aG docker ubuntu
     ```
   - **Note:** After adding the user to the `docker` group, you may need to log out and log back in for changes to take effect.

3. **Configure Security Groups:**
   - Ensure that the EC2 instance's security group allows inbound traffic on port `80` (HTTP) and `22` (SSH).
   - **Example Rules:**
     - **SSH:** TCP, Port 22, Source: Your IP or a trusted range.
     - **HTTP:** TCP, Port 80, Source: `0.0.0.0/0` (or restrict as needed).

4. **Set Up SSH Key Pair:**
   - Generate an SSH key pair or use an existing one.
   - Add the **public key** to the EC2 instance's `~/.ssh/authorized_keys`.
   - **Private Key:** Store securely; you'll reference it in GitHub Secrets.

### 3. GitHub Repository Secrets

To securely manage sensitive information, store the following secrets in your GitHub repository:

1. **Access GitHub Secrets:**
   - Navigate to your repository on GitHub.
   - Go to **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.

2. **Add the Following Secrets:**

   | Secret Name               | Description                                                  |
   |---------------------------|--------------------------------------------------------------|
   | `DOCKER_USERNAME`         | Your Docker Hub username                                     |
   | `DOCKER_PASSWORD`         | Your Docker Hub access token                                 |
   | `MONGO_URI`               | Connection string for your MongoDB instance                 |
   | `AWS_REGION`              | AWS region where your resources are located                  |
   | `AWS_ACCESS_KEY_ID`       | AWS access key ID with necessary permissions                |
   | `AWS_SECRET_ACCESS_KEY`   | AWS secret access key corresponding to the access key ID     |
   | `NEXT_PUBLIC_S3_BUCKET`   | Your AWS S3 bucket name for public assets                    |
   | `NEXT_PUBLIC_S3_BASE_URL` | Base URL for accessing your S3 bucket                        |
   | `EC2_HOST`                | Public DNS or IP address of your EC2 instance               |
   | `EC2_KEY`                 | Private SSH key for authenticating with your EC2 instance    |

   **_Security Tip:_** Never expose your secrets in code or logs. GitHub Secrets are encrypted and only available to GitHub Actions workflows.

---

## CI/CD Pipeline Workflows

Our CI/CD pipeline consists of two main GitHub Actions workflows:

1. **Build and Deploy Workflow:** Handles building the Docker image, pushing it to Docker Hub, and deploying it to the EC2 instance upon code changes.
2. **Cleanup Old Docker Tags Workflow:** Scheduled to run weekly to remove outdated Docker image tags, ensuring efficient storage management.

### 1. Build and Deploy Workflow

**File Path:** `.github/workflows/pura-docker-cicd.yml`

This workflow automates the process of building your Docker image, pushing it to Docker Hub with appropriate tags, and deploying the latest version to your EC2 instance.

```yaml
name: Pura-Docker CI/CD 

on:
  # Trigger on push to main branch
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      # Checkout code
      - name: Checkout code
        uses: actions/checkout@v3

      # Log in to Docker Hub
      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      # Determine version
      - name: Determine Version
        id: vars
        run: |
          if git describe --tags --abbrev=0 > /dev/null 2>&1; then
            VERSION=$(git describe --tags --abbrev=0)
          else
            VERSION=latest
          fi
          echo "VERSION=$VERSION" >> $GITHUB_OUTPUT

      # Build Docker image
      - name: Build Docker image
        run: |
          docker build \
            --build-arg MONGO_URI=${{ secrets.MONGO_URI }} \
            --build-arg AWS_REGION=${{ secrets.AWS_REGION }} \
            --build-arg AWS_ACCESS_KEY_ID=${{ secrets.AWS_ACCESS_KEY_ID }} \
            --build-arg AWS_SECRET_ACCESS_KEY=${{ secrets.AWS_SECRET_ACCESS_KEY }} \
            --build-arg NEXT_PUBLIC_S3_BUCKET=${{ secrets.NEXT_PUBLIC_S3_BUCKET }} \
            --build-arg NEXT_PUBLIC_S3_BASE_URL=${{ secrets.NEXT_PUBLIC_S3_BASE_URL }} \
            -t hoyah0424/myapp:${{ steps.vars.outputs.VERSION }} \
            -t hoyah0424/myapp:latest \
            .

      # Push Docker images to Docker Hub
      - name: Push Docker images
        run: |
          docker push hoyah0424/myapp:${{ steps.vars.outputs.VERSION }}
          docker push hoyah0424/myapp:latest

      # SSH into EC2 and deploy
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ec2-user
          key: ${{ secrets.EC2_KEY }}
          script: |
            docker pull hoyah0424/myapp:${{ steps.vars.outputs.VERSION }}
            docker stop myapp || true
            docker rm myapp || true
            docker run -d --name myapp -p 80:3000 --env-file /home/ec2-user/purasalsasite/.env hoyah0424/myapp:${{ steps.vars.outputs.VERSION }}
            # Optional: Log container status and logs
            docker ps
            docker logs myapp
