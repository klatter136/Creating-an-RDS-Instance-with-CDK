Creating an RDS Instance with CDK

Objective

Create an RDS (Relational Database Service) instance in the database subnet of your VPC using AWS CDK. Can find the documentation and properties here: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_rds.DatabaseInstance.html

Exercise Steps

Step 1: Create the RDS Stack File





Create a new file in your lib folder called rds-stack.ts



Add the following imports:

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';

Step 2: Define the Stack Props Interface

Create an interface to accept the VPC from our VPC stack:

interface RDSStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

Step 3: Create the RDS Stack Class

Set up the basic stack structure:

export class RDSStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: RDSStackProps) {
    super(scope, id, props);
    
    // RDS configuration will go here
  }
}

Step 4: Configure the RDS Instance

Inside your constructor, create an RDS instance with these configurations:





Use your VPC and place it in the isolated subnet



Set up MySQL 8.0 as the database engine



Use t3.micro for the instance type



Configure storage settings



Add appropriate tags

Try to implement this yourself before looking at the solution!

Step 5: Add Output for the Database Endpoint

Add a CloudFormation output to display the RDS endpoint.

Step 6: Update the App File

Update your main app file (bin/your-app-name.ts) to include the RDS stack.

Requirements

Your RDS instance should:





Be placed in the private isolated subnet



Use MySQL 8.0



Have initial storage of 20GB



Be able to scale up to 30GB



Have deletion protection disabled (for this exercise only)



Include tags for easy identification



Output the endpoint information

Hints





Remember to specify the subnet type as PRIVATE_ISOLATED



Consider using the onePerAz option for high availability



Don't forget to handle removal policies for clean up

Solution Review Checklist





Imports are correct



Props interface is defined



RDS instance is properly configured



Subnet placement is correct



Storage settings are appropriate



Tags are added



Endpoint output is configured



App file is updated

Challenge (Optional)

Try to:





Add a different database engine (PostgreSQL)



Configure backup settings



Add custom parameter groups

Testing Your Implementation





Deploy your stack:

cdk deploy --all





Verify in AWS Console:





Check RDS dashboard



Confirm subnet placement



Verify engine version



Check endpoint information

Clean Up

Remember to destroy your stack when done:

cdk destroy --all
