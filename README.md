# Fleet Management System

A Fleet Management System to collect, store, and process data from field sensors installed on vehicles.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Running the Project Locally](#running-the-project-locally)
- [CI/CD Pipeline Setup with GitHub Actions](#cicd-pipeline-setup-with-github-actions)
- [Running the CI/CD Pipeline](#running-the-cicd-pipeline)
- [Infrastructure Setup with Terraform](#infrastructure-setup-with-terraform)
- [Running the Infrastructure Setup](#running-the-infrastructure-setup)
- [Documentation](#documentation)
  - [API Endpoints](#api-endpoints)
    - [Insert Sensor Data](#insert-sensor-data)
    - [Get Sensor Data](#get-sensor-data)
  - [Cloud Infrastructure Setup](#cloud-infrastructure-setup)

## Introduction

This document provides setup instructions for running the Fleet Management System locally, setting up a CI/CD pipeline using GitHub Actions, and deploying the infrastructure using Terraform.

## Prerequisites

- Node.js (v16.x or later)
- npm (v7.x or later)
- PostgreSQL database
- GitHub account
- AWS account
- Terraform (v1.0 or later)

## Local Setup

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/yourusername/fleet-management-system.git
   cd fleet-management-system
   ```

2. **Install Dependencies:**

```sh
  npm install
```

3. **Create Environment Variables File:**

Create a .env file in the root directory and add the following environment variables:

```env
NODE_ENV=development
LOCAL_DB_USERNAME=your_local_db_username
LOCAL_DB_PASSWORD=your_local_db_password
LOCAL_DB_NAME=your_local_db_name
LOCAL_DB_HOST=your_local_db_host
PORT=3000
```

## Running the Project Locally

1. **Start the Server:**

```sh
npm start
```

2. **Access the Application:**

Open your browser and navigate to http://localhost:3000

## CI/CD Pipeline Setup with GitHub Actions

1. **Create GitHub Secrets:**

Go to your repository on GitHub, navigate to `Settings` > `Secrets` > `Actions`, and add the following secrets:

- `AWS_ACCESS_KEY`: Your AWS access key.
- `AWS_SECRET_KEY`: Your AWS secret key.
- `EC2_SSH_KEY`: Your EC2 SSH private key.
- `EC2_USER`: Your EC2 username.
- `EC2_HOST`: Your EC2 host.
- `NODE_ENV`: production
- `DB_USERNAME`: Your production database username.
- `DB_PASSWORD`: Your production database password.
- `DB_NAME`: Your production database name.
- `DB_HOST`: Your production database host.
- `PORT`: 3000

## Running the CI/CD Pipeline

1. **Trigger Workflow:**

Push changes to the `master` branch or open a pull request against the `master` branch to trigger the workflow.

## Infrastructure Setup with Terraform

1. **Install Terraform:**

Follow the official [Terraform installation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) guide to install Terraform on your local machine.

2. **Create Variables File:**

Create a terraform.tfvars file with your AWS credentials:

```hcl
aws_access_key = "your_aws_access_key"
aws_secret_key = "your_aws_secret_key"
db_name = "your_aws_db_name"
db_username = "your_aws_db_username"
db_password = "your_aws_db_password"
db_identifier = "your_aws_db_identifier"
```

Initialize Terraform:

```sh
terraform init
```

Plan and Apply Infrastructure:

```sh
terraform plan
terraform apply
```

Confirm the apply step by typing yes when prompted.

## Running the Infrastructure Setup

1. **Deploy Infrastructure:**

Follow the instructions above to initialize, plan, and apply the Terraform configuration.

2. **Verify Deployment:**

Verify that the EC2 instance is up and running in the AWS Management Console under the specified region.

## Documentation

### API Endpoints

Insert Sensor Data

- Endpoint: `POST /api/v1/sensor-data`
- Description: Inserts new sensor data.
- Request Body:

```json
{
  "vehicle_id": "vehicle123",
  "timestamp": "2024-08-04T12:00:00Z",
  "sensor_type": "temperature",
  "sensor_value": 25.5
}
```

- Response:

  - 201 Created

    ```text
    Data inserted successfully
    ```

  - 400 Bad Request

  ```text
  Validation error: <error_message>
  ```

  - 500 Internal Server Error

  ```text
  Internal server error
  ```

Get Sensor Data

- Endpoint: `GET /api/v1/sensor-data`
- Description: Retrieves sensor data based on query parameters.
- Query Parameters:

  - `vehicle_id` (optional)
  - `sensor_type` (optional)
  - start_time` (optional)
  - `end_time` (optional)

- Example Request:

```sh
GET /api/v1/sensor-data?vehicle_id=vehicle123
```

- Response:

  - 200 OK

  ```json
  [
    {
      "vehicle_id": "vehicle123",
      "timestamp": "2024-08-04T12:00:00Z",
      "sensor_type": "temperature",
      "sensor_value": 25.5
    }
  ]
  ```
