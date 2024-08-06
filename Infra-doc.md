## The Cloud Infrastructure Setup for Application Deployment on AWS

1. Provider Configuration
   The Terraform script is configured to use the specified version of the AWS provider. It also ensures that the Terraform version used is compatible.

2. Variables
   All sensitive information and configuration details such as AWS access keys, region, database credentials, and other parameters are stored in variables. These variables are marked as sensitive to ensure they are handled securely. This variables are defined in the `terraform.tfvars` file

3. AWS Provider Block
   The AWS provider is configured using the variables defined earlier in the `terraform.tfvars` file. This block of code sets up the necessary credentials and region settings for Terraform to interact with AWS services.

4. Virtual Private Cloud (VPC)
   A VPC is created with a specified CIDR block (10.0.0.0/16). The VPC is configured to support DNS resolution and hostnames, essential for internal communication and external access.

5. Internet Gateway
   An Internet Gateway is attached to the VPC to enable internet access. This is crucial and neccessary for allowing the instances within the VPC to communicate with computers outside the VPC.

6. Subnets
   Two subnets are created within the VPC, each in a different availability zone to ensure high availability. The subnets are defined with distinct CIDR blocks within the VPC range.

7. Route Table
   A route table is created to manage network traffic within the VPC. This table routes all traffic (0.0.0.0/0) to the Internet Gateway, ensuring that instances within the subnets can reach the internet.

8. Security Group
   I created a security group which defines the inbound and outbound rules for network traffic. It allows inbound traffic on ports 22 (SSH), 80 (HTTP), 443 (HTTPS), and 3000 (application port). All outbound traffic is allowed so that the instances can communicate freely with the internet.

9. EC2 Key Pair
   A TLS private key is generated and used to create an EC2 key pair. This key pair allows secure SSH access to the EC2 instances. The private key is stored locally in the directory where the script is run, for secure access.

   > Please ensure a a key exist in the `~/.ssh/` directly, or run `ssh-keygen` to generate a new key, before running the script.

10. EC2 Instance
    The scipt creates an EC2 instance is using the specified AMI and instance type. The instance is then associated with the previously created subnet and security group.

11. RDS PostgreSQL Instance
    PostgreSQL RDS instance is created with specified configuration details such as allocated storage, engine version, instance class, database name, username, and password. The instance is publicly accessible and associated with the security group and subnet group.

12. DB Subnet Group
    Th DB subnet group is created to specify the subnets where the RDS instance can be deployed.
