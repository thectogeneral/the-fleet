# Fleet Management System

A Fleet Management System to collect, store, and process data from field sensors installed on vehicles.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Running the Project Locally](#running-the-project-locally)
- [Documentation](#documentation)
- [Infrastructure Setup with Terraform](#infrastructure-setup-with-terraform)
- [Running the Infrastructure Setup](#running-the-infrastructure-setup)
- [CI/CD Pipeline Setup with GitHub Actions](#cicd-pipeline-setup-with-github-actions)
- [Running the CI/CD Pipeline](#running-the-cicd-pipeline)


## Introduction

This readme file provides the basic setup of this repository Fleet Management System locally, deploying an infrastructure to run the project using Terraform and setting up a  pipeline using GitHub Actions for Continuous Integration and Deployment to the deploy Terraform Infrastructure.

## Prerequisites

- Node.js (v22.x or later)
- npm (v10.x or later)
- GitHub account
- AWS account
- Terraform (v1.0 or later)

## Local Setup

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/thectogeneral/fleet-management-system.git
   cd fleet-management-system
   ```

2. **Install Dependencies:**

    ```sh
      npm install
    ```

3. **Create Environment Variables File:**

Create a .env file in the root directory from the .env.example file provided in the root directory:

    ```env
    NODE_ENV=
    
    // for local environment
    LOCAL_DB_USERNAME=
    LOCAL_DB_PASSWORD=
    LOCAL_DB_NAME=
    LOCAL_DB_HOST=
    
    // for production environment
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    DB_HOST=
    PORT=3000
    ```

## Running the Project Locally

1. **Start the Server:**

Complete the `.env` file by inputting the necessary value for each variable


    ```sh
    npm start
    ```

OR

    ```sh
    npm test
    ```

...to run test files

2. **Access the Application:**

Open your browser and navigate to `http://localhost:3000`

## Documentation

### API Endpoints

Insert Sensor Data

- Endpoint: `POST /sensor-data`
- Description: This inserts new sensor data.
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

- Endpoint: `GET /sensor-data`
- Description: This retrieves sensor data based on query parameters.
- Query Parameters:

  - `vehicle_id` (optional)
  - `sensor_type` (optional)
  - `start_time` (optional)
  - `end_time` (optional)

- Example Request:

  ```sh
  GET /sensor-data?vehicle_id=vehicle123
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

## Infrastructure Setup with Terraform

1. **Install Terraform:**

Follow the official [Terraform installation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) guide to install Terraform on your local machine.

2. **Create Variables File:**

Navigate to the `infra-setup/vm-setup` directory 

    ```sh
    cd infra-setup/vm-setup
    ```

Create a `terraform.tfvars` file with your AWS credentials:

    ```hcl
    aws_access_key = "your_aws_access_key"
    aws_secret_key = "your_aws_secret_key"
    aws_region = "your_aws_region"  //us-east-1
    db_name = "your_aws_db_name"  //mydb
    db_username = "your_aws_db_username"  //mydbadmin
    db_password = "your_aws_db_password"  //mypassword
    db_identifier = "your_aws_db_identifier"  //mydb
    ```

Initialize Terraform:

    ```sh
    terraform init
    ```
> Make sure you have an SSH public key file (`~/.ssh/id_rsa.pub`) on your local machine or generate one using `ssh-keygen` before running the next commands

Plan and Apply Infrastructure:

    ```sh
    terraform plan
    terraform apply
    ```

Confirm the apply step by typing yes when prompted.

## Running the Infrastructure Setup

1. **Deploy and Verify Deploymen:**

After following the instructions above to initialize, plan, and apply the Terraform configuration, Verify that the EC2 instance is up and running in the AWS Management Console under the specified region.

> Note that a key will be downloaded to the `infra-setup/vm-setup` folder. This will be used to access your ec2 instance


## CI/CD Pipeline Setup with GitHub Actions

1. **Create GitHub Secrets:**

To setup your project pipeline with GitHub actions, go to your repository on GitHub(you must have pushed this code to a GitHub repo), navigate to `Settings` > `Secrets` > `Actions`, and add the following secrets:

- `AWS_ACCESS_KEY`: Your AWS access key.
- `AWS_SECRET_KEY`: Your AWS secret key.
- `EC2_SSH_KEY`: Your EC2 SSH private key.
- `EC2_USER`: Your EC2 username.
- `EC2_HOST`: Your EC2 host.
- `NODE_ENV`: // this should be production
- `DB_USERNAME`: Your production database username.
- `DB_PASSWORD`: Your production database password.
- `DB_NAME`: Your production database name.
- `DB_HOST`: Your production database host.
- `PORT`: 3000

## Running the CI/CD Pipeline

1. **Trigger Workflow:**

Push changes to the `master` branch or open a pull request against the `master` branch to trigger the workflow. You can also trigger the workflow manually in the GitHub actions tab.


